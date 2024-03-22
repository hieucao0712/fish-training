import { _decorator } from 'cc';
import gfDataStore from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import GameConfig from '../../Config/Config2024'
import { GfNotifyMessage } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/gfNotifyMessage';
const { ccclass } = _decorator;

@ccclass('NotifyMessage2024')
export class NotifyMessage2024 extends GfNotifyMessage {
    protected validateData(data: any): boolean {
        return data.type !== GameConfig.instance.NOTIFY_TYPE.MESSAGE_EVENT && super.validateData(data);
    }

    public onBeforeSceneChange() {
        this._lstMessage = [];
        this.hide();
        super.onBeforeSceneChange();
    }

    protected onStackMessage() {
        const position = GameConfig.instance.NOTIFY_MESSAGE.position[gfDataStore.instance.getCurrentSceneName()];
        this.node.setPosition(position.x, position.y);
        super.onStackMessage();
    }
}
