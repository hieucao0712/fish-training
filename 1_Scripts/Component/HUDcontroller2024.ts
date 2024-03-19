import { _decorator, Button, Vec3, tween, SpriteFrame, Sprite, v3, Node } from 'cc';
import { gfHUDController } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfHUDController';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import { gfAutoFireController } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfAutoFireController';
import { stopAllActions } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';
import gfReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';

const TIME_SHOW_HIDE = 0.15;
const TARGET_STATE = {
    AUTO_FIRE : 0,
    AUTO_ONE  : 1,
    AUTO_ALL  : 2
}
const STATE = {
    NORMAL : 0,
    TARGET : 1,
}
const { ccclass, property} = _decorator;
@ccclass('HUDController2024')
export class HUDController2024 extends gfHUDController {
    @property(Node)
    private panelExpand: Node = null;
    @property(Node)
    private nodeAuto: Node = null;
    @property(Button)
    private btnAuto: Button = null;
    @property(SpriteFrame)
    private listSpriteFrame = [];
    @property(Node)
    private listNodeAuto = [];
    _isShow:boolean = false;
    private _posButton: Vec3[];

    onLoad() {
        super.onLoad();
        this._scaleFactor = 1.1;
        this._posButton = [new Vec3(-114, -230, 1), new Vec3(24, -230, 1), new Vec3(-44, -158, 1), new Vec3(-44, -307, 1)];
        this.stopTarget();
    }

    updateLockFishImg(fishKind = 0) {
        if(fishKind === 20) {
            this._scaleFactor = 0.5;
        } else {
            this._scaleFactor = 0.6
        }
        this.listNodeAuto[TARGET_STATE.AUTO_ONE].getComponents(Button)[0].getComponent(Sprite).spriteFrame = this.listSpriteFrame[STATE.TARGET];
        super.updateLockFishImg(fishKind);
    }


    onButtonAutoClick(){
        this.stopAllNodeActions();
        Emitter.instance.emit(gfBaseEvents.SOUND.CLICK);
        if(!this._isShow){
            this.btnAuto.enabled = false;
            this.onAnimShow();
        }
        else {
            this.onAnimHide();
        }
    }

    onAnimShow(){
        if(this._isShow) return;
        this._isShow = true;
        this.nodeAuto.active = true;
        this.fxActive.active = false;
        this.listNodeAuto[1].getComponents(Button)[0].getComponent(Sprite).spriteFrame = this.listSpriteFrame[STATE.NORMAL];
        this.stopAllNodeActions();
        for(let i = 0; i < this.listNodeAuto.length; ++i){
            const node = this.listNodeAuto[i];
            const button = node.getComponents(Button)[0];
            node.active = true;
            node.setScale(new Vec3(.82,.82,.82));
            tween(node)
                .call(()=>{
                    button.interactable = false;
                    this.btnAuto.getComponent(Button).interactable = false;
                })
                .to(TIME_SHOW_HIDE, {position: this._posButton[i]})
                .call(()=>{
                    button.interactable = true;
                    this.btnAuto.getComponent(Button).interactable = true;
                })
                .start();
        }
        tween(this.panelExpand)
            .to(TIME_SHOW_HIDE, {scale: v3(1,1,1)})
            .call(()=>{
                this.btnAuto.enabled = true;
            })
            .start();
    }

    onAnimHide(type = gfAutoFireController.STATE.IDLE){
        let idButton = gfAutoFireController.FIRE_TYPE_MAPPING[type];
        if(!this._isShow) return;
        this.stopAllNodeActions();
        if(idButton == gfAutoFireController.FIRE_TYPE_MAPPING.idle){
            for(let i = 0; i < this.listNodeAuto.length; ++i){
                const node = this.listNodeAuto[i];
                const button = node.getComponents(Button)[0];
                button.interactable = false;
                this.fxActive.active = false;
                node.position = this._posButton[this._posButton.length - 1];
                node.active = false;
            }
        }
        else {
            this.btnAuto.enabled = false;
            this.nodeAuto.active = false;
            this.fxActive.active = true;
            this.fxActive.setPosition(this.nodeAuto.getPosition());
            for(let i = 0; i < this.listNodeAuto.length; ++i){
                const node = this.listNodeAuto[i];
                const button = node.getComponents(Button)[0];
                const isActive = +idButton == (i + 1) ? true : false;
                button.interactable = isActive;
                node.position = this._posButton[this._posButton.length - 1];
                node.active = isActive;
                if(isActive){
                    node.setScale(new Vec3(1,1,1));
                }
            }
        }
        this._isShow = false;
        this.panelExpand.setScale(new Vec3(0,0,0));
    }

    onToggleIdle(): void {
        super.onToggleIdle();
        const player = gfReferenceManager.instance.getSelfPlayer();
        if(!player || !player.checkUpdateGunByWallet()) return;
        this.onAnimShow();
    }

    onTogglePress(toggle: any, data: any): void {
        this.fishNotifyImg.active = false;
        const toggleCheck = toggle.isChecked;
        if (toggleCheck) {
            const walletValid = this.isWalletValid();
            if(walletValid) {
                if(this._isShow) {
                    this.onAnimHide(data);
                }
                Emitter.instance.emit(gfBaseEvents.AUTO_FIRE_CONTROLLER.CHANGE_AUTO_FIRE_BY_STATE, data);
            }
        }
    }

    changeStatusGroupButton(type = gfAutoFireController.STATE.IDLE){
        Emitter.instance.emit(gfBaseEvents.AUTO_FIRE_CONTROLLER.CHANGE_AUTO_FIRE_BY_STATE, type);
    }

    stopAllNodeActions(){
        stopAllActions(this.panelExpand);
        for(let i = 0; i < this.listNodeAuto.length; i++) {
            stopAllActions(this.listNodeAuto[i]);
        }
    }

    toggleHUD(interactable = true) {
        super.toggleHUD(interactable);
        this.btnAuto.interactable = interactable;
    }

    stopTarget(){
        super.stopTarget();
        this.onResetListButton();
    }

    showFXActiveTargetOne(){
        super.showFXActiveTargetOne();
        this.playResumeBeforeFireSkill(TARGET_STATE.AUTO_ONE);
    }
    showFXActiveTargetAll(){
        super.showFXActiveTargetAll();
        this.playResumeBeforeFireSkill(TARGET_STATE.AUTO_ALL);
    }
    showFXActiveAutoFire(){
        super.showFXActiveAutoFire();
        this.playResumeBeforeFireSkill(TARGET_STATE.AUTO_FIRE);
    }

    stopLockFish(){
        super.stopLockFish();
        this.onResetListButton();
    }

    playResumeBeforeFireSkill(targetState){
        this.nodeAuto.active = false;
        this.listNodeAuto[targetState].active = true;
    }

    onResetListButton() {
        this.stopAllNodeActions();
        for (let i = 0; i < this.listNodeAuto.length; ++i) {
            stopAllActions(this.listNodeAuto[i]);
            this.listNodeAuto[i].setPosition(this._posButton[this._posButton.length - 1]);
            this.listNodeAuto[i].active = false;
        }
        this._isShow = false;
        this.nodeAuto.active = true;
        this.btnAuto.enabled = true;
        this.panelExpand.setScale(v3(1, 0, 1));
    }
}

