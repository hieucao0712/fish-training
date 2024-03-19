import { _decorator, Component, Node } from 'cc';
import { gfEffectLockFish } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfEffectLockFish';

const { ccclass, property } = _decorator;
@ccclass('EffectLockFish2024')
export class EffectLockFish2024 extends gfEffectLockFish {
    start() {

    }

    update() {
        super.update();
        this._canPlayEffect = false;
    }
}

