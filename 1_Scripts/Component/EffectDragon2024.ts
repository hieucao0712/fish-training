
import { _decorator, Component, Node } from 'cc';
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import EventCode from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents";
import { gfDragonEffectLayer } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEffectLayer';
import DragonEvent from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';
const { ccclass, property } = _decorator;

@ccclass('EffectDragon2024')
export class EffectDragon2024 extends gfDragonEffectLayer {
    showJackpotWinAmountPopup() {
        Emitter.instance.emit(EventCode.CUT_SCENE.SHOW_CUT_SCENE, "JackpotWinPopup2024", this.endData);
    }

    protected onDragonBallDropped(data: any): void {
        Emitter.instance.emit(DragonEvent.SOUND.DRAGON_DROP_BALL);
        super.onDragonBallDropped(data);   
    }
}

