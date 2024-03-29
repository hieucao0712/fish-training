import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import gfFishManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfFishManager';
import gfGameScheduler from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGameScheduler';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import { Dragon2024 } from '../Boss/Dragon2024';
import GameConfig from '../Config/Config2024';
import EventCode from './EventsCode2024';
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';

export default class FishManager2024 extends gfFishManager {
    public static instance: FishManager2024 = null;
    public listFishArr = [];
    constructor() {
        super();
        FishManager2024.instance = this;
    }

    protected initEvent(): void {
        super.initEvent();
        registerEvent(EventCode.FISH_LAYER.CATCH_FISH_BY_SKILL, this.catchFishSkill, this);
        registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_LIGHTING, this.catchFishByLightingChain, this);
        registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_PLASMA, this.onPlasmaSkill, this);        
        // registerEvent(gfBaseEvents.GAME_LAYER.CREATE_FISH, this.createListFish, this);
    }

    public destroy(): void {
        super.destroy();
        FishManager2024.instance = null;
    }

    onPlasmaSkill(data) {
        const listFish = data.ListFish;
        console.warn('lis', listFish);
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

    catchFishSkill(data, minDuration = 0) {
        const { ListFish } = data;
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        if (player.isMe) {
            player.addGoldReward(data.TotalReward);
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

        gfGameScheduler.scheduleOnce(() => {
            Emitter.instance.emit(EventCode.LIGHTING_CHAIN.START_EFFECT, data);
        }, minDuration);
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

    protected createListFish(data): void {
       super.createListFish(data);
       for(let i = 0; i < data.length; i++){
            if(data[i].FishID != 450000) {
                let isSame = false
                for(let j = 0; j < this.listFishArr.length; j++){
                    if(this.listFishArr[j].FishID == data[i].FishID){
                        isSame = true;
                        break;
                    }
                }
                if(!isSame) {
                    this.listFishArr.push(data[i]);
                }
            }
       }
    }
}
