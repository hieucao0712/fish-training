import { _decorator, Component, Node, SkeletalAnimation, Skeleton, sp, tween } from 'cc';
// import { gfLaserGun } from '../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfLaserGun';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import DataStore from '../Common/DataStore2024';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import { FishManager } from '../Common/FishManager2024';
import GameConfig from '../Config/Config2024';
import { gfBaseGunSkill } from '../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfBaseGunSkill';
import { gfLaserGun } from '../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfLaserGun';
import { getPostionInOtherNode } from '../../../../cc-common/cc-share/common/utils';
import { stopAllActions } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';
import EventCode from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';

const { ccclass, property } = _decorator;
@ccclass('Tesla')
export class Tesla extends gfLaserGun {
    sendFireGun() {
        const myDeskStation = DataStore.instance.getSelfDeskStation();
        const player = ReferenceManager.instance.getPlayerByDeskStation(myDeskStation);
        if (!player || !player.isMe) return;
        const listCatchLaser = [];
        let idTargetFish = -1;
        const mousePoint = DataStore.instance.getMousePos();
        if (mousePoint) {
            const fish = FishManager.instance.getFishByPoint(mousePoint);
            if (fish) {
                idTargetFish = fish.getId();
                listCatchLaser.push(fish.getId());
            } else {
                return;
            }
        }

        const listFish = FishManager.instance.getListFish();
        for (let i = 0; i < listFish.length; i++) {
            if (listFish[i].isAvailable() && listFish[i].getId() != idTargetFish) {
                listCatchLaser.push(listFish[i].getId());
            }
        }
        idTargetFish = listCatchLaser.length > 0 ? listCatchLaser[0] : -1;
        const data = {
            Angle: player.getGunAngle(),
            ListFish: listFish.length > 0 ? listFish : [-1],
            SkillID: this._skillID,
            Targetfish: idTargetFish
        };
        DataStore.instance.setLockGun(true);
        Emitter.instance.emit(EventCode.GUN_SKILL.ON_SEND_FIRE_ONE_SHOT_GUN_SKILL, data);
        this.hideNodeCountDown();
    }

    gunFire(data, callback) {
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        const mousePoint = DataStore.instance.getMousePos();
        const listCatchLaser = [];
        if (!player) return;
        if (player.index > 1) { data.Angle += 180 };
        if (this._isMe) {
            player.effectIsMe.active = false;
        } else {
            this._nodeParent.angle = data.Angle ? data.Angle : 0;
        }
        Emitter.instance.emit(EventCode.SOUND.FIRE_LASER);

        let idTargetFish = -1;
        let isCountingDown = this.nodeCountDown.active;
            if (mousePoint && isCountingDown) {
                const fish = FishManager.instance.getFishByPoint(mousePoint);
                if (fish) {
                    idTargetFish = fish.getId();
                    listCatchLaser.push(fish.getId());
                } else {
                    return;
                }
            }

        data.mainPoint = getPostionInOtherNode(ReferenceManager.instance.getNodeFishLayer(), player.gun);
        data.isSkill = true;
        Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_EFFECT_CATCH_LIST_FISH, data);
        this.nodeEffect.active = true;
        this.hideNodeCountDown();
        stopAllActions(this.nodeEffect);
        const spine = this.nodeEffect.getComponent(sp.Skeleton);
        spine.setAnimation(0, 'lazer_shoot', false);
        const duration = spine.findAnimation('lazer_shoot').duration;
        tween(spine)
            .delay(duration)
            .call(() => {
                this.onAfterGunFire(callback);
            })
            .start();
    }

    playAnimationShow(data, callback) {
        if (this._isMe) {
            this.nodeEffect.active = true;
            const spine = this.nodeEffect.getComponent(sp.Skeleton);
            spine.setAnimation(0, 'lazer_idle', true);
            this.showNodeTitle();
            this.showNodeCountDown();
        }
        callback();
    }

    // onAfterGunFire(infoReward) {
    //     const {DeskStation} = infoReward;
    //     const selfInfo = DataStore.instance.getSelfInfo();
    //     const player = ReferenceManager.instance.getPlayerByDeskStation(DeskStation);
    //     if(selfInfo.DeskStation === DeskStation){
    //         this.nodeEffect.active = false;
    //         DataStore.instance.setSelfInfo({"isLockGun": false});
    //         Emitter.instance.emit(EventCode.EFFECT_LAYER.HIDE_NOTIFY_LOCK_FISH);
    //         DataStore.instance.setDataStore({
    //             targetState: GameConfig.instance.TARGET_LOCK.NONE,
    //             currentTargetState: GameConfig.instance.TARGET_LOCK.NONE
    //         });
    //         Emitter.instance.emit(EventCode.GAME_LAYER.INTERACTABLE_HUD, true);
    //         Emitter.instance.emit(EventCode.GAME_LAYER.RESUME_OLD_TARGET);
    //     }
    //     Emitter.instance.emit(EventCode.PLAYER_LAYER.CHECK_NEXT_GUN_SKILL, DeskStation);
    //     if(player){
    //         player.hideEffectIsMe && player.hideEffectIsMe();
    //     }
    // }
    
}

