import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import gfFishManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfFishManager';
import GameScheduler from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGameScheduler';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import GameConfig from '../Config/Config2024';
import EventCode from './EventsCode2024';

export default class FishManager2024 extends gfFishManager {
    public static instance: FishManager2024 = null;
    constructor() {
        super();
        FishManager2024.instance = this;
    }

    protected initEvent(): void {
        super.initEvent();
        registerEvent(EventCode.FISH_LAYER.CATCH_FISH_BY_SKILL, this.catchFishSkill, this);
        registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_LIGHTING, this.catchFishByLightingChain, this);
        registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_PLASMA, this.onPlasmaSkill, this);        
    }

    public destroy(): void {
        super.destroy();
        FishManager2024.instance = null;
    }

    onPlasmaSkill(data) {
        const listFish = data.ListFish;
        let fish = null;
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        for (let i = 0; i < listFish.length; i++) {
            const fishInfo = listFish[i];
            const infoDetail = {
                DeskStation: data.DeskStation,
                FishID: fishInfo.FishID,
                GoldReward: fishInfo.GoldReward,
                BulletMultiple: data.BulletMultiple,
                isSkill: true,
                skipUpdateWallet: true,
            };
            fish = this.getFishById(infoDetail.FishID);

            if (fish) {
                fish.onCatch(infoDetail);
            } else if (player.isMe) {
                Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_REWARD_EFFECT, {
                    data: infoDetail,
                    fishKind: infoDetail['fishKind'],
                });
            }
        }
    }

    onHitDragon(data) {
        // if(!this.currentBoss) return;
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        if(player.isMe){
            player.addGoldReward(data.WinAmount);
        }else{
            Emitter.instance.emit(EventCode.GAME_LAYER.UPDATE_WALLET_OTHER_USER, data);
        }

        this.currentBoss.onHitState(data);
    }

    catchFishSkill(data, minDuration = 0) {
        const { ListFish } = data;
        if (data.SkillID && data.SkillID === GameConfig.instance.SKILL_CONFIG.ONE_SHOT_GUN.SkillID) {
            const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
            if (player.isMe) {
                // player.addGoldReward(data.TotalReward);
            } else if (data.Wallet || data.Wallet === 0) {
                player.updateWallet(data.Wallet);
            }
            let fish = null;
            for (let i = 0; i < ListFish.length; i++) {
                fish = this.getFishById(ListFish[i].FishID);
                if (fish && ListFish[i].GoldReward > 0) {
                    fish.setDie(true);
                }
            }
            
            GameScheduler.scheduleOnce(() => {
                Emitter.instance.emit(EventCode.LIGHTING_CHAIN.START_EFFECT, data);
            }, minDuration);

            GameScheduler.scheduleOnce(()=>{
                Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_EFFECT_CATCH_LIST_FISH, data);
            }, 2)
        }
    }

    catchFishByLightingChain(data) {
        const listFish = data.ListFish;
        let fish = null;
        const skipUpdateWallet = true;
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        for (let i = 0; i < listFish.length; i++) {
            const fishInfo = listFish[i];
            const infoDetail = {
                DeskStation: data.DeskStation,
                FishID: fishInfo.FishID,
                GoldReward: fishInfo.GoldReward,
                BulletMultiple: data.BulletMultiple,
                isSkill: true,
                skipUpdateWallet,
            };
            fish = this.getFishById(infoDetail.FishID);
            if (fish) {
                fish.onCatch(infoDetail);
            } else if (player.isMe) {
                Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_REWARD_EFFECT, {
                    data: infoDetail,
                    fishKind: infoDetail['fishKind'],
                });
            }
        }
    }
}
