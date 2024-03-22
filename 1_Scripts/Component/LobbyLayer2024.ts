import { EventKeyboard, Input, KeyCode, _decorator, input } from 'cc';
import { formatMoney, loadAvatarFacebook } from '../../../../cc-common/cc-share/common/utils';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { gfLobbyLayer } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfLobbyLayer';
import { formatUserName } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
const { ccclass } = _decorator;

@ccclass('LobbyLayer2024')
export class LobbyLayer2024 extends gfLobbyLayer {
    initEvents(){
        super.initEvents();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event : EventKeyboard){
        if (event.keyCode == KeyCode.BACKSPACE) {
            if (this.node && this.node.active === true) {
                this.onBtnBackClick();
            }
        }
    }

    onUpdateInfo() {
        const selfInfo = DataStore.instance.getSelfInfo();
        this.txtUserName.string = formatUserName(selfInfo.Username);
        this.txtWallet.string = formatMoney(selfInfo.Wallet);
        if (this.avatarAtlas && loadAvatarFacebook) {
            if (selfInfo.Avatar && selfInfo.Avatar.indexOf('Avatar') === 0) {
                selfInfo.Avatar = selfInfo.Avatar.replace('Avatar', '');
            }
            loadAvatarFacebook(this.avatarSprite, selfInfo.Avatar, this.avatarAtlas, 'avatar_', 2);
        }
    }
}
