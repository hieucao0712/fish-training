import { Node, ParticleSystem2D, UITransform, _decorator, color, tween, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;
import { gfDragon } from "../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import EventCode from "../Common/EventsCode2024";
import { registerEvent } from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import ReferenceManager from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager";

const electroColor = [
    color(100, 200, 255),
    color(255, 245, 125),
    color(255, 50, 0),
    color(255, 50, 0),
    color(255, 50, 0),
];
const smokeColor = [
    color(0, 165, 255, 255),
    color(225, 255, 0, 255),
    color(255, 175, 0, 255),
    color(255, 90, 0, 255),
    color(255, 40, 0, 255),
];
@ccclass("Dragon2024")
export class Dragon2024 extends gfDragon {
    @property(Prefab) plasmaExplosion: Prefab = null;

    @property(Node)
    box: Node[] = [];
    @property(Node)
    nodeDust: Node[] = [];
    @property(Node)
    nodeSmoke: Node[] = [];
    @property(Node)
    nodeElectro: Node[] = [];

    private isPlasma = false;
    private _oldState: any;
    private _state = 1;

    initFishData(data: any): void {
        super.initFishData(data);
        this._state = data.GodzillaState;
        this.changeColor();
    }

    onLoad(): void {
        super.onLoad();
        registerEvent(EventCode.GODZILLA.ON_HIT_GODZILLA, this.onHitGodzilla, this);
    }
    ANIMATION = {
        In: "Swim In",
        Loop: "Swim Loop",
        Out: "Swim Out",
        In_L: "Swim In",
        In_R: "Swim In",
    };

    update(dt: any): void {
        this.updateSmokePos();
        this.updateElectroPos();
    }

    updateSmokePos() {
        this.nodeSmoke[0].setPosition(this.listBox[0].node.position);
    }

    updateElectroPos() {
        for (let i = 0; i < this.nodeElectro.length; i++) {
            this.nodeElectro[i].setPosition(this.box[i].position);
        }
    }

    onHitGodzilla(data) {
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        if (player.isMe) {
            player.addGoldReward(data.WinAmount);
        } else {
            Emitter.instance.emit(EventCode.GAME_LAYER.UPDATE_WALLET_OTHER_USER, data);
        }

        this.onHitState(data);
    }

    onHitState(data) {
        var { TypeWin, WinAmount, GodzillaState, BulletMultiple, DeskStation, ListFish, Wallet } = data;
        this._oldState = this._state;
        this._state = GodzillaState;
        switch (TypeWin) {
            case 0: //normal hit
                if (this._oldState !== GodzillaState) {
                    this.changeColor();
                }
                break;
            case 1: //drop crystal
                // if(this._oldState !== GodzillaState){
                //     this.changeColor();
                // }
                this.playDropBall(data);
                break;
            case 2: //Jackpot
                this.playEffectDie();
                const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
                const jackpotData = {
                    wonJackpot: true,
                    DeskStation: DeskStation,
                    Result: [],
                    jackpotAmount: WinAmount,
                };
                const bigWinData = {
                    TotalReward: WinAmount,
                    DeskStation: DeskStation,
                    BulletMultiple: BulletMultiple,
                    fishKind: 45,
                };
                if (player.isMe) {
                    Emitter.instance.emit(EventCode.JACKPOT.SHOW_JACKPOT, jackpotData);
                } else {
                    Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_EFFECT_CATCH_LIST_FISH, bigWinData);
                }
                break;
            case 3: //Plasma
                let callback = () => {
                    const bodyPos = this.node
                        .getComponent(UITransform)
                        .convertToWorldSpaceAR(this.listBox[0].node.position);
                    const dataReward = {
                        ListFish,
                        WinAmount,
                        Wallet,
                        DeskStation,
                        BulletMultiple,
                        bodyPos,
                    };
                    Emitter.instance.emit(EventCode.GODZILLA.GODZILLA_PLASMA_EFFECT, dataReward);
                    // Emitter.instance.emit(EventCode.SOUND.GODZILLA_PLASMA);
                };
                this.playPlasmaEffect(callback);
        }
        // this.playDropBall(data);
    }

    changeColor() {
        if (this._state < 0) {
            this._state = 0;
        }
        for (let i = 0; i < this.nodeSmoke.length; i++) {
            this.nodeSmoke[i].getComponent(ParticleSystem2D).startColor = smokeColor[this._state - 1];
        }

        for (let i = 0; i < this.nodeElectro.length; i++) {
            this.nodeElectro[i].children.forEach((element) => {
                element.children.forEach((element) => {
                    element.getComponent(ParticleSystem2D).startColor = electroColor[this._state - 1];
                });
            });
        }
    }

    playPlasmaEffect(callback: Function) {
        callback();
    }

    playDropBall(data) {
        const { DeskStation, WinAmount, Wallet, BulletMultiple } = data;
        const dataInput = {
            BulletMultiple,
            DeskStation: DeskStation,
            FishID: this._FishID,
            GoldReward: WinAmount,
            Wallet: Wallet,
        };

        // const worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(this.listBox[0].offset.x, this.listBox[0].offset.y, 0));
        const worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.listBox[0].node.position);
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        // Emitter.instance.emit(DragonEvent.DRAGON.ON_BALL_DROPPED);
        Emitter.instance.emit(EventCode.GODZILLA.GODZILLA_DROP_CRYSTAL, {
            data: dataInput,
            worldPos,
            player,
            GoldReward: WinAmount,
        });
    }
}
