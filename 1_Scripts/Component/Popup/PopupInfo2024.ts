import { _decorator, Component, Node, Button, Vec3, sys, ScrollView, warn } from 'cc';
import Emitter from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import { checkTablet } from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities'
import Localize from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfLocalize';
import Config2024 from '../../Config/Config2024';
import { GfPopupInfo } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/gfPopupInfo';
import gfBaseEvents from '../../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
const { ccclass, property } = _decorator;


@ccclass('PopupInfo2024')
export class PopupInfo2024 extends GfPopupInfo {
    @property(Button)
    buttonFish: Button;
    @property(Button)
    buttonFeature: Button;
    @property(Node)
    fish: Node = null;
    @property(Node)
    feature: Node = null;

    private _currentTabId = 0;

    initLanguage() {
        this.popupTitle = Localize.instance.popupTitle.info;
    };

    show(){
        super.show();
        this.setInitialized(true);
        this.fish.getComponent(ScrollView).scrollToTop(0);
        this.onClickButton(null, 0);
    };

    onClickButton(event, data) {
        console.warn(data);
        const tabId = parseInt(data);
        if(this._currentTabId === tabId) {
            return;
        }
        Emitter.instance.emit(gfBaseEvents.SOUND.CLICK);

        this._currentTabId = tabId;
        this.hideAllButton();
        switch(tabId) {
            case 0:
                this.updateStateButton(this.buttonFeature, true);
                this.feature.active = true;
                break;
            case 1:
                this.updateStateButton(this.buttonFish, true);
                this.fish.active = true;
                this.fish.getComponent(ScrollView).scrollToTop(0);
                break;
        }

    };

    showWithEffect() {
        super.showWithEffect();
        let scalePopup = new Vec3(1,1,1);
        if(checkTablet() || sys.platform === sys.Platform.DESKTOP_BROWSER) {
            scalePopup = new Vec3(1,1,1);
        }
        this.contents.setScale(scalePopup);
    };

    hideAllButton() {
        this.updateStateButton(this.buttonFish, false);
        this.updateStateButton(this.buttonFeature, false);
        this.fish.active = false;
        this.feature.active = false;
    };

    updateStateButton(button, active) {
        button.node.getChildByName("checkmark").active = active;
    };

    onClick(){
        if(this.getInitialized){
            Emitter.instance.emit(gfBaseEvents.SOUND.CLICK);
        }
    };

    hide(animStyle = Config2024.instance.POPUP_ANIMATION.DEFAULT) {
        super.hide(animStyle);
        this.setInitialized(false);
    };

    onClose() {
        super.onClose();
    };
}

