import { _decorator, Component, Node } from 'cc';
import gfFishGroupMgr from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupMgr';
import { FishGroup1Extend2024 } from '../FishGroup/FishGroup1Extend2024';
import { FishGroup2Extend2024 } from '../FishGroup/FishGroup2Extend2024';
import { FishGroup3Extend2024 } from '../FishGroup/FishGroup3Extend2024';
import { FishGroup4Extend2024 } from '../FishGroup/FishGroup4Extend2024';
const { ccclass, property } = _decorator;

@ccclass('FishGroup2024')
export class FishGroup2024 extends gfFishGroupMgr {
    createFishGroup1(){
        FishGroup1Extend2024.create(); // parabol
    }
    createFishGroup2(){
        FishGroup2Extend2024.create(); // 2 duong song song 
    }
    createFishGroup3(){
        FishGroup3Extend2024.create(); // 4 mui ten
    }
    createFishGroup4(){
        FishGroup4Extend2024.create(); // trai tim
    }
}

