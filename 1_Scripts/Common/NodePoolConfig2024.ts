import { _decorator, Rect, v2 } from 'cc';
import gfNodePoolConfig from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfNodePoolConfig';

export default class NodePoolConfig2024 extends gfNodePoolConfig {
    public static instance: NodePoolConfig2024 = null;

    constructor(listAssets) {
        super(listAssets);
        NodePoolConfig2024.instance = this;
    }

    initDefaultConfig(): void {
        this.FISH_CONFIG = {
            '0' :  { speed: 100,   FishMultiple: -1,     zIndex: 499, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 42, 38), haveWounded: true, visibleSize: v2(42, 42) },
            '1' :  { speed: 100,   FishMultiple: -1,     zIndex: 498, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 42, 45), haveWounded: true, visibleSize: v2(41, 49) },
            '2' :  { speed: 80,    FishMultiple: -1,     zIndex: 497, AnimationName: ['animation'],    BoxCollider: new Rect(10, 3, 50, 17), targetPoint: v2(15, 3), haveWounded: true, visibleSize: v2(55, 28) },
            '3' :  { speed: 80,    FishMultiple: -1,     zIndex: 496, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 70, 25), targetPoint: v2(11, 0), haveWounded: true, visibleSize: v2(71, 38) },
            '4' :  { speed: 80,    FishMultiple: -1,     zIndex: 495, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 65, 30), haveWounded: true, visibleSize: v2(74, 48) },
            '5' :  { speed: 80,    FishMultiple: -1,     zIndex: 494, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 82, 28), targetPoint: v2(14, 0), haveWounded: true, visibleSize: v2(80, 67) },
            '6' :  { speed: 40,    FishMultiple: -1,     zIndex: 1  , AnimationName: ['animation'],    BoxCollider: new Rect(5, 0, 60, 31), targetPoint: v2(9, 0), haveWounded: true, visibleSize: v2(89, 45) },
            '7' :  { speed: 60,    FishMultiple: -1,     zIndex: 493, AnimationName: ['animation'],    BoxCollider: new Rect(4.5, 0, 65, 25), haveWounded: true, visibleSize: v2(89, 55) },
            '8' :  { speed: 60,    FishMultiple: -1,     zIndex: 100, AnimationName: ['animation'],    BoxCollider: new Rect(0, 3, 70, 30), haveWounded: true, visibleSize: v2(101.83, 57.44) },
            '9' :  { speed: 60,    FishMultiple: -1,     zIndex: 109, AnimationName: ['animation'],    BoxCollider: new Rect(0, 0, 55, 56), haveWounded: true, visibleSize: v2(76, 81) },
            '10' : { speed: 60,    FishMultiple: -1,     zIndex: 108, AnimationName: ['animation'],    BoxCollider: new Rect(1, 0, 65, 30), haveWounded: true, visibleSize: v2(96, 79) },
            '11' : { speed: 60,    FishMultiple: -1,     zIndex: 107, AnimationName: ['animation'],    BoxCollider: new Rect(16, 3, 51, 31), targetPoint: v2(15, 0), haveWounded: true, visibleSize: v2(90, 84) },
            '12' : { speed: 60,    FishMultiple: -1,     zIndex: 106, AnimationName: ['animation'],    BoxCollider: new Rect(8, 1, 70, 65), targetPoint: v2(8, 0), haveWounded: true, visibleSize: v2(88, 79) },
            '13' : { speed: 40,    FishMultiple: -1,     zIndex: 492, AnimationName: ['animation'],    BoxCollider: [new Rect(10, 0, 100, 20), new Rect(30, 0.9, 27, 80)], targetPoint: v2(9, 0), haveWounded: true, visibleSize: v2(105, 82) },
            '14' : { speed: 40,    FishMultiple: -1,     zIndex: 200, AnimationName: ['animation'],    BoxCollider: new Rect(1, 9, 73, 57), haveWounded: true, visibleSize: v2(88.71, 74.96) },
            '15' : { speed: 40,    FishMultiple: -1,     zIndex: 201, AnimationName: ['animation'],    BoxCollider: [new Rect(-2.5, 0, 83, 39), new Rect(-10, 0, 50, 117)], haveWounded: true, visibleSize: v2(155, 134.76) },
            '16' : { speed: 20,    FishMultiple: -1,     zIndex: 202, AnimationName: ['animation'],    BoxCollider: new Rect(-22, 0, 86, 32), targetPoint: v2(-15, 0), haveWounded: true, visibleSize: v2(104.9, 67.96) },
            '17' : { speed: 40,    FishMultiple: -1,     zIndex: 203, AnimationName: ['animation'],    BoxCollider: new Rect(2.5, 0, 100, 90), targetPoint: v2(22, 0), haveWounded: true, visibleSize: v2(147.92, 126.25) },
            '18' : { speed: 40,    FishMultiple: -1,     zIndex: 204, AnimationName: ['animation'],    BoxCollider: new Rect(-7, 0, 52, 94), targetPoint: v2(-5, 0), haveWounded: true, visibleSize: v2(138.52, 175.51) },
            '19' : { speed: 40,    FishMultiple: -1,     zIndex: 205, AnimationName: ['animation'],    BoxCollider: new Rect(7, 5, 70, 70), targetPoint: v2(10, 0), haveWounded: true, visibleSize: v2(121.95, 107.34) },
            '20' : { speed: 40,    FishMultiple: -1,     zIndex: 206, AnimationName: ['animation'],    BoxCollider: [new Rect(0, 0, 280, 60), new Rect(-165, 0, 80, 20)], haveWounded: true, visibleSize: v2(372.3, 131.78) },
            '21' : { speed: 40,    FishMultiple: -1,     zIndex: 207, AnimationName: ['animation'],    BoxCollider: new Rect(14, 0, 110, 66), targetPoint: v2(10, 0), haveWounded: true, visibleSize: v2(136.23, 131.29) },
            '22' : { speed: 20,    FishMultiple: -1,     zIndex: 208, AnimationName: ['animation'],    BoxCollider: [new Rect(11.2, 0, 242.4, 13), new Rect(60.9, 0, 77.5, 150)], targetPoint: v2(70, 0), haveWounded: true, visibleSize: v2(265.85, 222.67) },
            '23' : { speed: 20,    FishMultiple: -1,     zIndex: 209, AnimationName: ['animation'],    BoxCollider: [new Rect(-70, 0, 220, 53), new Rect(50, 0, 30, 120)], targetPoint: v2(-30, 0), haveWounded: true, visibleSize: v2(466.92, 174.09) },
            '24' : { speed: 20,    FishMultiple: -1,     zIndex: 210, AnimationName: ['animation'],    BoxCollider: [new Rect(40, 0, 140, 150), new Rect(-90, 0, 120, 20)], targetPoint: v2(40, 0), haveWounded: false, visibleSize: v2(307.77, 221.84) },
            '25' : { speed: 20,    FishMultiple: -1,     zIndex: 211, AnimationName: ['animation'],    BoxCollider: [new Rect(-70, 0, 220, 53), new Rect(50, 0, 30, 120)], targetPoint: v2(-30, 0), haveWounded: true, visibleSize: v2(484.4, 180.09) },
            '27' : { speed: 20,    FishMultiple: -1,     zIndex: 2  , AnimationName: ['animation'],    BoxCollider: [new Rect(12.5, 0, 80, 77), new Rect(-55, 0, 55, 34)], haveWounded: true, visibleSize: v2(218.36, 167.14) },
            '30' : { speed: 20,    FishMultiple: -1,     zIndex: 491, AnimationName: ['animation'],    BoxCollider: new Rect(-23, 0, 345, 100), targetPoint: v2(35, 0), haveWounded: true, visibleSize: v2(346.34, 350.84) },
            '34' : { speed: 20,    FishMultiple: -1,     zIndex: 490, AnimationName: ['animation'],    BoxCollider: [new Rect(25, 5, 160, 100), new Rect(76, 16, 42, 48)], targetPoint: v2(35, 5), haveWounded: false, visibleSize: v2(222, 126.56) },
            '35' : { speed: 20,    FishMultiple: -1,     zIndex: 490, AnimationName: ['animation'],    BoxCollider: [new Rect(-4, 10, 180, 60), new Rect(27, -36, 42, 32)], targetPoint: v2(25, 10), haveWounded: false, visibleSize: v2(236.76, 121.48) },
            '36' : { speed: 20,    FishMultiple: -1,     zIndex: 490, AnimationName: ['animation'],    BoxCollider: new Rect(1, 0, 120, 60), targetPoint: v2(17, 0), haveWounded: false, visibleSize: v2(159.68, 99.68) },
            '37' : { speed: 20,    FishMultiple: -1,     zIndex: 490, AnimationName: ['animation'],    BoxCollider: new Rect(1, 0, 120, 60), targetPoint: v2(17, 0), haveWounded: false, visibleSize: v2(194.52, 131.1) },
            '43' : { speed: 20,    FishMultiple: -1,     zIndex: 105, AnimationName: ['idle'],    BoxCollider: new Rect(2, 0, 86, 91), targetPoint: v2(5, 0), haveWounded: true,  visibleSize: v2(305.92, 164.91) },
        };

        this.SPRITE_FISH_KIND = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13];
        this.BULLET_CONFIG = {
            '0' : { BoxCollider: new Rect(5, 0, 20, 20) },
            '1' : { BoxCollider: new Rect(5, 0, 20, 22) },
            '2' : { BoxCollider: new Rect(5, 0, 20, 20) },
            '3' : { BoxCollider: new Rect(5, 0, 22, 60) },
            '4' : { BoxCollider: new Rect(5, 0, 20, 65) },
            '5' : { BoxCollider: new Rect(0, 0, 20, 65) },
            '6' : { BoxCollider: new Rect(30, 0, 20, 30) },
            '7' : { BoxCollider: new Rect(0, 0, 20, 36) },
            '8' : { BoxCollider: new Rect(0, 0, 20, 77) },
            '9' : { BoxCollider: new Rect(0, 0, 20, 101) }
        };
    }
}
