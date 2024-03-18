import { GfPopupPrompt } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupPrompt';
import { checkTablet } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities'
import { _decorator, Component, Node, sys, Vec3 } from 'cc';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';

const { ccclass } = _decorator;
@ccclass('PopupPrompt2024')
export class PopupPrompt2024 extends GfPopupPrompt {

    _delaySoundClick = 0.1;

    showWithEffect() {
        super.showWithEffect();
        let scalePopup = new Vec3(1,1,1);
        if(checkTablet() || sys.platform === sys.Platform.DESKTOP_BROWSER) {
            scalePopup = new Vec3(0.7,0.7,1);
        }
        this.contents.setScale(scalePopup);
    }

    show(data?: any) {
        super.show(data)
        if(this['btnYes'].active === false || this['layoutBtn'].active === false) return;
        this['txtMessage'].node.setPosition(0, 34.8);

    }

    onConfirmClick(){
        Emitter.instance.emit(gfBaseEvents.SOUND.CLICK);
        this.onClose();
        this.scheduleOnce(() => {
            if(this._dataCallback && this._dataCallback.confirmCallback){
                this._dataCallback.confirmCallback();
            }
        }, this._delaySoundClick);
        this._currData = null;
    }
}


