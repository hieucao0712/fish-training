import { GfPopupSettingSlider } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupSettingSlider';
import { checkTablet } from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities'
import { _decorator, Component, Node, Vec3, sys, ProgressBar, Slider, UITransform, size, Size } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PopupSetting2024')
export class PopupSetting2024 extends GfPopupSettingSlider {

    public show() {
        super.show();
    }
    
    protected initLanguage() {

    }
    showWithEffect() {
        super.showWithEffect();
        let scalePopup = new Vec3(1, 1, 1);
        if (checkTablet() || sys.platform === sys.Platform.DESKTOP_BROWSER) {
            scalePopup = new Vec3(1, 1, 1);
        }
        this.contents.setScale(scalePopup);
    }
}

