import { _decorator, Animation, Color, Sprite } from 'cc';
import { gfBaseFish } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Fishes/gfBaseFish';
const { ccclass, property } = _decorator;

@ccclass('SpriteFish2024')
export class SpriteFish2024 extends gfBaseFish {
    @property(Animation)
    protected fishAnim: Animation = null;

    protected _clipName: string;
    private _baseSpeed: number;

    initAssets(config: any) {
        if (!this.fishAnim) {
            this.fishAnim = this.node.getChildByName('mainFish').getComponent(Animation);
        }
        super.initAssets(config);

        for (let i = 0; i < this.fishAnim.clips.length; i++) {
            this.fishAnim.removeState(this.fishAnim.clips[0].name);
        }
        this.fishAnim.clips = [config.asset];
        this.fishAnim.play(config.asset.name);
        this._clipName = this.fishAnim.clips[0].name;
        this._baseSpeed = config.asset.speed;
    }

    playEffectDie() {
        this.fishAnim.getState(this._clipName).speed = this._baseSpeed * 2;
    }

    resetColor() {
        this.fishAnim.getComponent(Sprite).color = this.NORMAL_COLOR;
    }

    setColor(color: Color) {
        this.fishAnim.getComponent(Sprite).color = color;
    }

    changeAnimationSpeed(x: number = 0.5) {
        this.fishAnim.getState(this._clipName).speed *= x;
    }

    resetAnimationSpeed() {
        if (this.fishAnim.clips.length > 0) {
            this.fishAnim.getState(this._clipName).speed = this._baseSpeed;
        }
    }
}
