import { _decorator } from 'cc';
import { formatMoney, loadAvatarFacebook } from '../../../../cc-common/cc-share/common/utils';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { gfLobbyLayer } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfLobbyLayer';
import { formatUserName } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
const { ccclass } = _decorator;

@ccclass('LobbyLayer2024')
export class LobbyLayer2024 extends gfLobbyLayer {
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
