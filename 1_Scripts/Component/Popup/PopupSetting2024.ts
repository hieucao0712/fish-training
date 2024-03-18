import gfEventEmitter from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import { GfPopupSetting } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupSetting';
import { GfPopupSettingSlider } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupSettingSlider';
import gfBaseEvents from '../../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import { checkTablet } from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities'
import { _decorator, Component, Node, Vec3, sys, ProgressBar, Slider, UITransform, size, Size } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('PopupSetting2024')
export class PopupSetting2024 extends GfPopupSettingSlider {

    @property(Slider) musicSlider: Slider = null;
    @property(Node) musicBar: Node = null;

    @property(Slider) soundSlider: Slider = null;
    @property(Node) soundBar: Node = null;


    protected update(dt: number): void {
        this.updateVolume(0);
        this.updateVolume(1);
    }

    public show() {
        super.show();
    }

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

    updateVolume(obj: number){
        const progress = (obj == 0)? this.soundSlider.progress:this.musicSlider.progress;
        gfEventEmitter.instance.emit(gfBaseEvents.SOUND.UPDATE_MUSIC_VOL, progress);
        const bar = (obj == 0)? this.soundBar:this.musicBar
        bar.getComponent(UITransform).setContentSize(new Size(320*progress, 35));
    }
}

