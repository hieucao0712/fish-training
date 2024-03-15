
import { _decorator, EventKeyboard, KeyCode, input, Input, UITransform, tween, Node } from 'cc';
import { gfLobbyLayer } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfLobbyLayer';
// import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { formatMoney, loadAvatarFacebook, setOpacity } from '../../../../cc-common/cc-share/common/utils';
import {formatUserName, registerEvent} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import EventsCode from '../Common/EventsCode2024';
import {fadeIn, scaleTo, v3f } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';
// import { IntroEvent1998 } from '../../8_EventEuro24/Scripts/IntroEvent1998';
import { gfWallet } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfWallet';
import DataStore2024 from '../Common/DataStore2024';
const { ccclass, property } = _decorator;

@ccclass('LobbyLayer1998')
export class LobbyLayer2024 extends gfLobbyLayer {
    @property(gfWallet) wallet: gfWallet = null;

    @property(Node)
    fadeNode: Node;
    @property(Node)
    normalNode: Node;
    @property(Node)
    bgNode: Node;

    onLoad() {
        super.onLoad();
        DataStore2024.instance.setLobbyWallet(this.wallet);
    }

    // initEvents(){
    //     super.initEvents();
    //     input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    // }

    onKeyDown(event : EventKeyboard){
        if (event.keyCode == KeyCode.BACKSPACE) {
            if (this.node && this.node.active === true) {
                this.onBtnBackClick();
            }
        }
    }

    onUpdateInfo() {
        const selfInfo = DataStore2024.instance.getSelfInfo();
        this.txtUserName.string = formatUserName(selfInfo.Username);
        if(this.wallet) {
            this.wallet.forceUpdateWallet(selfInfo.Wallet);
        } else {
            this.txtWallet.string = formatMoney(selfInfo.Wallet);
        }
        if (this.avatarAtlas && loadAvatarFacebook) {
            if (selfInfo.Avatar && selfInfo.Avatar.indexOf('Avatar') === 0) {
                selfInfo.Avatar = selfInfo.Avatar.replace('Avatar', '');
            }
            loadAvatarFacebook(this.avatarSprite, selfInfo.Avatar, this.avatarAtlas, 'avatar_', 2);
        }
    }

    getPositionByWorldSpace() {
        return this.node.getComponent(UITransform).convertToWorldSpaceAR(this.avatarSprite.node.parent.position);
    }

    getButtonBack(){
        return this.btnBack;
    };

    onUpdateLobbyWallet(data) {
        if(this.wallet) {
            this.wallet.updateWallet(data);
        } else {
            super.onUpdateLobbyWallet(data);
        }
    }

}
