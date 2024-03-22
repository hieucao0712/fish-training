
import { _decorator, Node, Animation, tween } from 'cc';
import {stopAllActions} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import EventCodeBase from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents";
import { gfJackpotDragonInfo } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfJackpotDragonInfo';
import gfDragonEvent from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';
const { ccclass, property } = _decorator;

@ccclass('JackpotInfo2024')
export class JackpotInfo2024 extends gfJackpotDragonInfo {
    @property(Node)
    waringDragon: Node;

    onBossWarning() {
        const animation = this.waringDragon.getComponent(Animation);
        stopAllActions(this.txtValue);
        tween(this.txtValue)
            .call(()=>{
                Emitter.instance.emit(gfDragonEvent.SOUND.DRAGON_APPEAR);
                Emitter.instance.emit(EventCodeBase.COMMON.SHAKE_SCREEN, { timeOneStep: 0.1, amplitude: 10 });
                this.waringDragon.active = true;
                animation.play();
            })
            .delay(2)
            .call(()=>{
                this.waringDragon.active = false;
                Emitter.instance.emit(EventCodeBase.SOUND.RESET_VOLUME);
            }).start()
    }
}
