import { _decorator, Animation, sp, Tween, tween } from 'cc';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import FishManager from '../Common/FishManager2024';
import { gfLaserGun } from '../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfLaserGun';
import { getPostionInOtherNode } from '../../../../cc-common/cc-share/common/utils';
import EventsCode from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import EventsCode2024 from '../Common/EventsCode2024';
import GameConfig from '../Config/Config2024';
import gfGameScheduler from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGameScheduler';
import { SetZIndex } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import { stopAllActions } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';

const { ccclass, property } = _decorator;
@ccclass('Tesla')
export class Tesla extends gfLaserGun {

    onLoad(): void {
        super.onLoad();
        this.node['endEffectLighting'] = this.endEffectLighting.bind(this);
    }
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
            ListFish: listCatchLaser.length > 0 ? listCatchLaser : [-1],
            SkillID: this._skillID,
            TargetFish: idTargetFish,
        };
        DataStore.instance.setLockGun(true);
        Emitter.instance.emit(EventsCode.GUN_SKILL.ON_SEND_FIRE_ONE_SHOT_GUN_SKILL, data);
        this.hideNodeCountDown();
    }

    gunFire(data: any, callback: any): void {
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        if (!player) return;
        if (player.index > 1) {
            data.Angle += 180;
        }
        if (this._isMe) {
            DataStore.instance.setSelfInfo({ isLockGun: true, skillLock: false });
            player.effectIsMe.active = false;
        } else {
            this._nodeParent.angle = data.Angle ? data.Angle : 0;
        }

        Emitter.instance.emit(EventsCode.SOUND.FIRE_LASER);
        Emitter.instance.emit(EventsCode.GUN_SKILL.CLEAR_EFFECT_RECEIVE_GUN_SKILL, data.DeskStation);
        this.gun.getComponent(Animation).play();

        this.nodeEffect.active = true;
        this.hideNodeCountDown();
        Tween.stopAllByTarget(this.nodeEffect);

        data.mainPoint = getPostionInOtherNode(ReferenceManager.instance.getNodeFishLayer(), player.gun);
        data.isSkill = true;
        Emitter.instance.emit(EventsCode2024.FISH_LAYER.CATCH_FISH_BY_SKILL, data, 0.15);

        const effectSpine = this.nodeEffect.getComponent(sp.Skeleton);
        effectSpine.setAnimation(0, 'lazer_shoot', false);
        effectSpine.setCompleteListener(() => {
            DataStore.instance.setDataStore({ lisCatchLaser: [] });
            this.onAfterGunFire(callback);
        });
    }


    endEffectLighting(infoReward) {
        const myDeskStation = DataStore.instance.getSelfDeskStation();
        const selfInfo = DataStore.instance.getSelfInfo();
        const player = ReferenceManager.instance.getPlayerByDeskStation(myDeskStation);
        if(selfInfo.DeskStation === myDeskStation){
            this.nodeEffect.active = false;
            DataStore.instance.setSelfInfo({"isLockGun": false});
            Emitter.instance.emit(EventsCode.EFFECT_LAYER.HIDE_NOTIFY_LOCK_FISH);
            DataStore.instance.setDataStore({
                targetState: GameConfig.instance.TARGET_LOCK.NONE,
                currentTargetState: GameConfig.instance.TARGET_LOCK.NONE
            });
            Emitter.instance.emit(EventsCode.GAME_LAYER.INTERACTABLE_HUD, true);
            Emitter.instance.emit(EventsCode.GAME_LAYER.RESUME_OLD_TARGET);
        }
        Emitter.instance.emit(EventsCode.PLAYER_LAYER.CHECK_NEXT_GUN_SKILL, myDeskStation);
        if(player){
            player.hideIsMe && player.hideIsMe();
        }
    }
}
