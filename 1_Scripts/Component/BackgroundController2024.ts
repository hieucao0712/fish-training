import gfEventEmitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import { _decorator , tween , Sprite, Color} from 'cc';
import { GfBackgroundController } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfBackgroundController';
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import gfDataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
const { ccclass} = _decorator;

@ccclass('BackgroundController2024')
export class BackgroundController2024 extends GfBackgroundController {

    onChangeRound(data) {
        const backgroundID = data.SceneKind;
        const isFishGroupToNormal = data.isFishGroupToNormal;
        if (this._curBackgroundID == backgroundID) return;
        this._curBackgroundID = backgroundID;
        
        tween(this.background1.node)
            .delay(1)
            .to( 1.5, null, {
                onUpdate: (target, ratio) => {
                    this.background1.node.getComponent(Sprite).color = new Color(255,255,255,ratio * -255);
                },
            })
            .call(() => {
                this.background1.spriteFrame = this.arrDataBackground[this._curBackgroundID];
            })
            .to( 0, null, {
                onUpdate: (target, ratio) => {
                    this.background1.node.getComponent(Sprite).color = new Color(255,255,255,ratio * 255);
                },
            })
            .start();

        tween(this.background2.node)
            .to( 0, null, {
                onUpdate: (target, ratio) => {
                    this.background2.node.getComponent(Sprite).color = new Color(255,255,255,ratio * 0);
                },
            })
            .call(() => {
                this.background2.spriteFrame = this.arrDataBackground[this._curBackgroundID];
            })    
            .delay(1)
            .to( 1.5, null, {
                onUpdate: (target, ratio) => {
                    this.background2.node.getComponent(Sprite).color = new Color(255,255,255,ratio * 255);
                },
            })
            .start();
            
        if (!isFishGroupToNormal) {
            if (this._curBackgroundID > 2) {
                gfEventEmitter.instance.emit(gfBaseEvents.EFFECT_LAYER.PLAY_WAVE_TRANSITION);
            } else {
                gfEventEmitter.instance.emit(gfBaseEvents.EFFECT_LAYER.PLAY_FISH_GROUP_TRANSITION, !!(gfDataStore.instance.getSelfDeskStation() > 1));
            }
            gfEventEmitter.instance.emit(gfBaseEvents.GAME_LAYER.CHANGE_BUBBLE, this._curBackgroundID);
        }
    }

}
