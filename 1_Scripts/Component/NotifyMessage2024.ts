import { _decorator, director, tween, Tween, Vec3 } from 'cc';
import gfDataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import gfBaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';
import { GfNotifyMessage } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfNotifyMessage';
const { ccclass, property } = _decorator;

@ccclass('NotifyMessage2024')
export class NotifyMessage2024 extends GfNotifyMessage {

    public onBeforeSceneChange() {
        this._lstMessage = [];
        this.hide();
        super.onBeforeSceneChange();
    }

    protected onStackMessage() {
        const position = gfBaseConfig.instance.NOTIFY_MESSAGE.position[gfDataStore.instance.getCurrentSceneName()];
        this.node.setPosition(position.x, position.y);
        super.onStackMessage();
    }
}

