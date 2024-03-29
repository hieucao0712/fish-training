import { Node, ParticleSystem2D, UITransform, _decorator, color, tween, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { gfDragon } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import EventCode from '../Common/EventsCode2024';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import gfDragonEvent from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';
import { call } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';

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
]
@ccclass('Dragon2024')

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

    onLoad(): void {
        super.onLoad();
        registerEvent(EventCode.GODZILLA.ON_HIT_GODZILLA, this.onHitGodzilla, this);
    }
    ANIMATION = {
        In: "Swim In",
        Loop: "Swim Loop",
        Out: "Swim Out",
        In_L: "Swim In",
        In_R: "Swim In"
    }

    
    update(dt: any): void {
        this.updateSmokePos();
        this.updateElectroPos();
    }

    updateSmokePos(){
        for(let i = 0; i < this.nodeSmoke.length; i++){
            this.nodeSmoke[i].setPosition(this.box[i].position);
        }
    }

    updateElectroPos(){
        for(let i = 0; i < this.nodeElectro.length; i++){
            this.nodeElectro[i].setPosition(this.box[i].position);
        }
    }

    onHitGodzilla(data){
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        if(player.isMe){
            player.addGoldReward(data.WinAmount);
        }else{
            Emitter.instance.emit(EventCode.GAME_LAYER.UPDATE_WALLET_OTHER_USER, data);
        }

        this.onHitState(data);
    }

    onHitState(data){
        var {TypeWin, WinAmount, GodzillaState, BulletMultiple, DeskStation, ListFish} = data;
        this._oldState = this._state;
        this._state = GodzillaState;
        switch(TypeWin){
            case 0: //normal hit
                if(this._oldState !== GodzillaState){
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
                break;
            case 3: //Plasma
            let callback = ()=>{
                const dataReward = {
                    ListFish,
                    WinAmount,
                    DeskStation,
                    BulletMultiple,
                }
                Emitter.instance.emit(EventCode.GODZILLA.GODZILLA_PLASMA_EFFECT, dataReward);
                Emitter.instance.emit(EventCode.SOUND.GODZILLA_PLASMA);
            }
            this.playPlasmaEffect(data, callback);
        }
        // this.playDropBall(data);
    }

    changeColor(){
        for(let i = 0; i < this.nodeSmoke.length; i++){
            this.nodeSmoke[i].getComponent(ParticleSystem2D).startColor = smokeColor[this._state-1];
        }

        for(let i = 0; i < this.nodeElectro.length; i++){
            this.nodeElectro[i].children.forEach(element => {
                element.children.forEach(element => {
                    element.getComponent(ParticleSystem2D).startColor = electroColor[this._state-1];
                });
            });
        }
    }

    playPlasmaEffect(data, callback: Function){
        let plasma = instantiate(this.plasmaExplosion);
        plasma.parent = this.node;
        plasma.position = this.box[0].position;
        const dataInput = {
            DeskStation: data.DeskStation,
            BulletMultiple: data.BulletMultiple,
            ListFish: data.ListFish,
            skillID: 99
        };
        tween(this.node)
        .delay(1)
        .call(()=>{
            Emitter.instance.emit(EventCode.GAME_LAYER.CATCH_FISH_BY_PLASMA, dataInput);
            callback();
        })
        .start()
    }

    playDropBall (data) {
        const {DeskStation, WinAmount, Wallet, BulletMultiple} = data;
        const dataInput = {
            BulletMultiple,
            DeskStation: DeskStation,
            FishID: this._FishID,
            GoldRewrad: WinAmount,
            Wallet: Wallet
        };

        // const worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(this.listBox[0].offset.x, this.listBox[0].offset.y, 0));
        const worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.listBox[0].node.position);
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        // Emitter.instance.emit(DragonEvent.DRAGON.ON_BALL_DROPPED);
        Emitter.instance.emit(EventCode.GODZILLA.GODZILLA_DROP_CRYSTAL, {
            data: dataInput,
            worldPos,
            player,
            GoldReward: WinAmount
        });
    }
}

