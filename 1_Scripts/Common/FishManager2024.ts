import { _decorator, Component, Node } from 'cc';
import FishManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfFishManager';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import GameConfig from '../Config/Config2024';
import BaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';
import GameScheduler from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGameScheduler';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import EventCode from './EventsCode2024';


const { ccclass, property } = _decorator;

@ccclass('FishManager2024')
export class FishManager2024 extends FishManager {
    ctor() {
        FishManager.instance = this;
        // registerEvent(EventCode.GODZILLA.ON_HIT_GODZILLA, this.onHitGodzilla, this);
        // registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_PLASMA, this.onPlasmaSkill, this);
        // registerEvent(EventCode.GAME_LAYER.DROP_ITEM, this.onDropItem, this);
        // registerEvent(EventCode.GAME_LAYER.CATCH_FISH_BY_LIGHTING, this.catchFishByLightingChain, this);
    }


    // isBossKind(fishKind) {
    //     return fishKind == GameConfig.instance.FISH_KIND.MINIBOSS ||
    //             fishKind === GameConfig.instance.FISH_KIND.DRAGON || 
    //             fishKind === GameConfig.instance.FISH_KIND.LION_FISH;
    // },

    // isSpecialFish(fishKind){
    //     return GameConfig.instance.LIST_SPECIAL_FISH_KIND.includes(fishKind);
    // },
    // onHitGodzilla(data){
    //     if(!this.currentBoss) return;
    //     const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
    //     if(player.isMe){
    //         player.addGoldReward(data.WinAmount);
    //     }else{
    //         Emitter.instance.emit(EventCode.GAME_LAYER.UPDATE_WALLET_OTHER_USER, data);
    //     }

    //     this.currentBoss.onHitState(data);
    // },
    onPlasmaSkill(data){
        // const listFish = data.ListFish;
        // let fish = null;
        // const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        // for (let i = 0; i < listFish.length; i++) {
        //     const fishInfo = listFish[i];
        //     if (fishInfo.FishID === 0) continue;
        //     const infoDetail = {
        //         DeskStation: data.DeskStation,
        //         FishID: fishInfo.FishID,
        //         GoldReward: fishInfo.GoldReward,
        //         BulletMultiple: data.BulletMultiple,
        //         isSkill: true,
        //         skipUpdateWallet: true,
        //     };
        //     fish  = this.getFishById(infoDetail.FishID);

        //     if (fish) {
        //         fish.onCatch(infoDetail);
        //     }else if(player.isMe){
        //         Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_REWARD_EFFECT, { 
        //             data: infoDetail,
        //             fishKind: infoDetail.fishKind
        //         });
        //     }
        // }
    }

    catchFishSkill(data, minDuration = 0) {
        // const {ListFish} = data;
        // if (data.SkillID && data.SkillID !== BaseConfig.instance.SkillConfig.LASER) {
        //     this._super(data, minDuration);
        // } else {

        //     const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        //     if (player.isMe) {
        //         player.addGoldReward(data.TotalReward);
        //     } else if(data.Wallet || data.Wallet === 0){
        //         player.updateWallet(data.Wallet);
        //     }

        //     let fish = null;
        //     for (let i = 0; i < ListFish.length; i++) {
        //         fish = this.getFishById(ListFish[i].FishID);
        //         if(fish && ListFish[i].GoldReward > 0) {
        //             fish.setDie(true);
        //         }
        //     }

        //     GameScheduler.scheduleOnce(() => {
        //         Emitter.instance.emit(EventCode.LIGHTING_CHAIN.START_EFFECT, data);
        //     }, minDuration);

        // }
    }

    catchFishByLightingChain(data) {
        // const listFish = data.ListFish;
        // let fish = null;
        // const skipUpdateWallet = true;
        // const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        // for (let i = 0; i < listFish.length; i++) {
        //     const fishInfo = listFish[i];
        //     if (fishInfo.FishID === 0) continue;
        //     const infoDetail = {
        //         DeskStation: data.DeskStation,
        //         FishID: fishInfo.FishID,
        //         GoldReward: fishInfo.GoldReward,
        //         BulletMultiple: data.BulletMultiple,
        //         isSkill: true,
        //         skipUpdateWallet,
        //         itemInfo: fishInfo.itemInfo
        //     };
        //     fish  = this.getFishById(infoDetail.FishID);

        //     if (fish) {
        //         fish.onCatch(infoDetail);
        //     }else if(player.isMe){
        //         Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_REWARD_EFFECT, {
        //             data: infoDetail,
        //             fishKind: infoDetail.fishKind
        //         });
        //     }
        // }
    }

    onDropItem(data) {
       
    }
    // FishManager2024.instance = null;
    // module.exports = FishManager2024;
}

export { FishManager };

