import {_decorator, v3, tween, Button} from 'cc';
import Emitter from "../../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import {stopAllActions} from "../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import EventCode from "../../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents";
import {gf3DParticle} from "../../../../../cc-common/cc30-fishbase/Scripts/Components/gf3DParticle";
import { gfCutSceneJackpotWin } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/CutScene/gfCutSceneJackpotWin';
import gfDragonEvent from '../../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';
const {ccclass, property} = _decorator;
@ccclass('jackpotWinPopup2024')
export class JackpotWinPopup2024 extends gfCutSceneJackpotWin {
    _isSkip: boolean = false;

    start() {
        this.txtCoin.string = "0";
        this.winFrame.active = false;
        this.animNode.scale = v3(0, 0, 0);
        this._isSkip = false;
        Emitter.instance.emit(EventCode.SOUND.STOP_ALL_AUDIO);
        Emitter.instance.emit(EventCode.SOUND.BOSS_BIG_WIN);
        Emitter.instance.emit(gfDragonEvent.SOUND.PLAY_EFFECT_JACKPOT_COIN);

        this.particleCoin.active = true;
        stopAllActions(this.particleCoin);
        this.particleCoin.getComponent(gf3DParticle).startAnimation();
        this.winFrame.active = true;
        this.winFrame.scale.set(1, 0.2);
        tween(this.winFrame)
            .to(0.1, {scale: v3(1, 1, 1)})
            .start();
        tween(this.animNode)
            .to(0.25, {scale: v3(0.75, 0.75, 0.75)})
            .start();

        this.scheduleOnce(() => {
            this.blackLayer.getComponent(Button).interactable = true;
        }, 0.65);
        this._tweenCoin();
    }

    _tweenCoin() {
        const superValue = this.winValue * 0.75;
        const megaValue = this.winValue * 0.5;
        this.tweenCoin = tween(this)
            .to(this._duration / 3, null, {
                onUpdate: (target, ratio) => {
                    this.coinValue = ratio * megaValue;
                },
                easing: "sineInOut"
            })
            .to(this._duration / 3, null, {
                onUpdate: (target, ratio) => {
                    this.coinValue = megaValue + (ratio * this.winValue * 0.25);
                },
                easing: "sineInOut"
            })
            .to(this._duration / 3, null, {
                onUpdate: (target, ratio) => {
                    this.coinValue = superValue + (ratio * this.winValue * 0.25);
                },
                easing: "sineInOut"
            })
            .call(() => {
                this._isSkip = true;

            });
        this.tweenCoin.start();
    }

    quickShow() {
        if (this.coinValue === this.winValue) {
            this.blackLayer.getComponent(Button).interactable = false;
            this.hide();
            return;
        }
        if (!this._isSkip) {
            this._isSkip = true;
            this.tweenCoin.stop();
            stopAllActions(this);
            this.tweenCoin = tween(this)
                .to(1, null, {
                    onUpdate: (target, ratio) => {
                        this.coinValue = this.coinValue + (this.winValue - this.coinValue) * ratio;
                    }
                })
                .delay(1)
                .call(() => {
                    this.winValue = 0;
                    this.hide();
                })
                .start();
        }
    }

}

