import {Node, ParticleSystem2D, _decorator } from 'cc';
const {ccclass, property } = _decorator;

import { gfDragon } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon';

@ccclass('Dragon2024')
export class Dragon2024 extends gfDragon {
    @property(ParticleSystem2D)
    arrDust : ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrSmoke : ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrElectro : ParticleSystem2D[] = [];
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

    playPlasmaEffect () {
        
    }

    
}


