import { BoxCollider2D, Color, Node, ParticleSystem2D, Skeleton, UITransform, sp, _decorator, color, macro, sys, tween, v2, v3, UIOpacity, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { gfDragon } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import EventCode from '../Common/EventsCode2024';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import DragonEvent from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';

const electroColor = [
    color(100, 200, 255),
    color(255, 245, 125),
    color(255, 200, 100),
    color(255, 150, 100),
    color(255, 50, 50),
];
const smokeColor = [
    color(0, 165, 255, 150),
    color(225, 255, 0, 40),
    color(255, 175, 0, 45),
    color(255, 90, 0, 65),
    color(255, 40, 0, 100),
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
        registerEvent(EventCode.GODZILLA.ON_HIT_GODZILLA, this.onHitState, this);
        this.changeColor();
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

    onHitState(data){
        console.warn('onHitGodizilla', JSON.stringify(data))
        var {TypeWin, WinAmount, GodzillaState, BulletMultiple, DeskStation, ListFish} = data;
        this._oldState = this._state;
        this._state = GodzillaState;
        switch(TypeWin){
            case 0: //normal hit
                // super.onHit()
                // if(this._oldState !== GodzillaState){
                //     this.changeColor();
                // }
                break;
            case 1: //drop crystal
                if(this._oldState !== GodzillaState){
                    this.changeColor();
                }
                // this.playDropBall(data);
                break;
            case 2: //Jackpot
                this.playEffectDie();
                break;
            case 3: //Plasma
                this.playPlasmaEffect(data);
        }
                this.playDropBall(data);
    }

    changeColor(){
        for(let i = 0; i < this.nodeSmoke.length; i++){
            this.nodeSmoke[i].getComponent(ParticleSystem2D).startColor = smokeColor[this._state];
        }

        for(let i = 0; i < this.nodeElectro.length; i++){
            this.nodeElectro[i].children.forEach(element => {
                element.children.forEach(element => {
                    element.getComponent(ParticleSystem2D).startColor = electroColor[this._state];
                });
            });
        }
    }

    playPlasmaEffect(data){
        let plasma = instantiate(this.plasmaExplosion);
        plasma.parent = this.node;
        plasma.position = this.box[1].position;
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

        const worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(this.listBox[0].offset.x, this.listBox[0].offset.y, 0));
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

