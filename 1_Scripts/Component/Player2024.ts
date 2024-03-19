import { _decorator, SpriteFrame, Sprite, tween, v3, Button, Tween} from 'cc';
import { gfPlayer } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfPlayer';
import { loadAvatarFacebook, formatMoney, setOpacity } from '../../../../cc-common/cc-share/common/utils';
import { stopAllActions, delay, call, scaleTo} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import gfDataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
const { ccclass, property } = _decorator;

@ccclass('Player2024')
export class Player2024 extends gfPlayer {
    @property(SpriteFrame)
    backgroundGunFrame: SpriteFrame [] = [];
    @property(Sprite)
    backgroundGun: Sprite = null;

    initObj(data) {
        super.initObj(data);

        if(this.backgroundGun){
            const index = this.isMe ? 1 : 0;
            this.backgroundGun.spriteFrame = this.backgroundGunFrame[index];
            this.backgroundGun.node.setPosition(this.backgroundGun.node.position.x, this.isMe ? 0 : -2, 1);
        }
        if(this.isMe){
            this.effectIsMe.setPosition(this.node.getPosition());
        }
    }
 

    _updateGun() {
        if (this.btnMinus) {
            this.btnMinus.getComponent(Button).interactable = !(this.getGunIndex() === 0);
            this.btnMinus.getComponent(Sprite).grayscale = !this.btnMinus.getComponent(Button).interactable;
        }
        if (this.btnPlus) {
            this.btnPlus.getComponent(Button).interactable = !(this.getGunIndex() === gfDataStore.instance.getTotalGun() - 1);
            this.btnPlus.getComponent(Sprite).grayscale = !this.btnPlus.getComponent(Button).interactable;
        }
        this._gunValue = gfDataStore.instance.getGunValue()[this.getGunIndex()];
        this.txtBet.string = formatMoney(this._gunValue);
        this._playEffectChangeGun();
        if (this.isMe && (gfDataStore.instance.getSelfInfo().skillLock)) {
            if (this.btnPlus) {
                this.btnPlus.getComponent(Button).interactable = false;
                this.btnPlus.getComponent(Sprite).grayscale = true;
            }
            if (this.btnMinus) {
                this.btnMinus.getComponent(Button).interactable = false;
                this.btnMinus.getComponent(Sprite).grayscale = true;
            }

        }
        console.warn('MEOMEO',gfDataStore.instance.getTotalGun())
    }


    lockBet(isLock = false) {
        if (isLock) {
            if (this.btnPlus) {
                this.btnPlus.getComponent(Button).interactable = false;
                this.btnPlus.getComponent(Sprite).grayscale = true;
            }
            if (this.btnMinus) {
                this.btnMinus.getComponent(Button).interactable = false;
                this.btnMinus.getComponent(Sprite).grayscale = true;
            }
        } else {
            this._updateGun();
        }
    }
    updateAvatar(data){
        if(this.avatarAtlas){            
            if(this.avatarAtlas && loadAvatarFacebook){
                if (data.Avatar && data.Avatar.indexOf('Avatar') === 0) {
                    data.Avatar = data.Avatar.replace('Avatar', '');
                }
                loadAvatarFacebook(this.avatar, data.Avatar, this.avatarAtlas, 'avatar_', 2);
            }
        }
    }
 
    playerEffectScale() {
        this.wallet.node.setScale(1,1,1);
        stopAllActions(this.wallet.node);
        tween(this.wallet.node)
        .to(0.02, {scale: v3(1.1, 1.1, 1.1)})
        .to(0.02, {scale: v3(1,1,1)})
        .start();

    }
}

