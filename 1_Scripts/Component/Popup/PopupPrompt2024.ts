import { GfPopupPrompt } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupPrompt';
import { checkTablet } from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities'
import { _decorator, Component, Node, sys, Vec3 } from 'cc';

const { ccclass } = _decorator;

 
@ccclass('PopupPrompt2024')
export class PopupPrompt2024 extends GfPopupPrompt {

    protected initLanguage() {
        
    }

    showWithEffect() {
        super.showWithEffect();
        let scalePopup = new Vec3(1,1,1);
        if(checkTablet() || sys.platform === sys.Platform.DESKTOP_BROWSER) {
            scalePopup = new Vec3(1,1,1);
        }
        this.contents.setScale(scalePopup);
    }
}
