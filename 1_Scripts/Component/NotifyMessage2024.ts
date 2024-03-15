import { _decorator, director, tween, Tween, Vec3 } from 'cc';
import DataStore2024 from '../Common/DataStore2024';
import { GfNotifyMessage } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfNotifyMessage';
import gfBaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';

const { ccclass, property } = _decorator;

@ccclass('NotifyMessage1998')
export class NotifyMessage1998 extends GfNotifyMessage {

    public onBeforeSceneChange() {
        this._lstMessage = [];
        this.hide();
        super.onBeforeSceneChange();
    }

    protected onStackMessage() {
        const position = gfBaseConfig.instance.NOTIFY_MESSAGE.position[DataStore2024.instance.getCurrentSceneName()];
        this.node.setPosition(position.x, position.y);
        super.onStackMessage();
    }
}

