import { _decorator, Color, sp, sys, v3 } from 'cc';
import { gfBaseFish } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Fishes/gfBaseFish';
const { ccclass, property } = _decorator;

@ccclass('SpineFish2024')
export class SpineFish2024 extends gfBaseFish {
    @property(sp.Skeleton)
    protected fishAnim: sp.Skeleton = null;

    initAssets(config: any) {
        if (!this.fishAnim) {
            this.fishAnim = this.node.getChildByName('mainFish').getComponent(sp.Skeleton);
        }
        super.initAssets(config);

        if (!this.fishAnim.skeletonData || this.fishAnim.skeletonData.name != config.asset.name) {
            this.fishAnim.skeletonData = config.asset;
        }
        this.initAnimationCacheMode(config.cacheMode);
        this.fishAnim.setAnimation(0, config.AnimationName ? config.AnimationName[0] : 'animation', true);
        if (this.fishAnim && config.customAnimProp) {
            Object.assign(this.fishAnim.node, config.customAnimProp);
        }
        this.fishAnim.premultipliedAlpha = config.premiumAlphaMode;
    }

    initAnimationCacheMode(cacheMode?) {
        if (sys.isNative) {
            this.fishAnim.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME);
        } else {
            this.fishAnim.setAnimationCacheMode(cacheMode !== undefined ? cacheMode : sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
        }
    }

    playEffectDie() {
        this.fishAnim.timeScale = 2;
    }

    resetColor() {
        this.fishAnim.color = this.NORMAL_COLOR;
    }

    setColor(color: Color) {
        this.fishAnim.color = color;
    }

    changeAnimationSpeed(x: number = 0.5) {
        this.fishAnim.timeScale *= x;
    }

    resetAnimationSpeed() {
        this.fishAnim.timeScale = 1;
    }

    unuse() {
        super.unuse();
        this.fishAnim.node.angle = 0;
        this.fishAnim.node.scale = v3(1, 1);
    }
}
