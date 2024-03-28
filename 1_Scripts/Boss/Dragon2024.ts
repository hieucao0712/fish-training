import { BoxCollider2D, Color, Node, ParticleSystem2D, Skeleton, UITransform,sp, _decorator, color, macro, sys, tween, v2, v3, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import { gfDragon } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import EventCode from '../Common/EventsCode2024';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';

@ccclass('Dragon2024')
export class Dragon2024 extends gfDragon {
    @property(ParticleSystem2D)
    arrDust: ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrSmoke: ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrElectro: ParticleSystem2D[] = [];

    @property(Node)
    box: Node[] = [];
    @property(Node)
    nodeDust: Node[] = [];
    @property(Node)
    nodeSmoke: Node[] = [];
    @property(Node)
    nodeElectro: Node[] = [];

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
        // this.playDropBall();
        console.warn(this.listBox[0])
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
        const {TypeWin, WinAmount, GodzillaState, BulletMultiple, DeskStation, ListFish} = data;

        switch(TypeWin) {
            case 0:
                console.warn('ON_CASE_0')
                break;
            case 1:
                console.warn('ON_CASE_1')
                this.playDropBall(data);
                break;
            case 2:
                console.warn('ON_CASE_2')
                this.playEffectDie();
                break;
            case 3:
                console.warn('ON_CASE_3')
                // Play plasma
                break;
        }
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

        const worldPos = this.node.convertToWorldSpaceAR(this.listBox[0].offset);
        console.warn(worldPos)
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        Emitter.instance.emit(EventCode.DRAGON.DROP_BALL);
        Emitter.instance.emit(EventCode.GODZILLA.GODZILLA_DROP_CRYSTAL, {
            data: dataInput,
            worldPos,
            player,
            GoldReward: WinAmount
        });
    }
}


