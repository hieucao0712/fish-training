import { _decorator, Node, sp, Tween, tween, UITransform, v3 } from 'cc';
import { getRandomInt } from '../../../../../cc-common/cc-share/common/utils';
import DataStore from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { gfSpriteFish } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/Fishes/gfSpriteFish';
import { v2Distance } from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
const { ccclass, property } = _decorator;

const SPEED_WOUNDED = 3;
const TIME_KEEPING_STATE_WOUNDED = 0.6;

@ccclass('SpriteFish2024')
export class SpriteFish2024 extends gfSpriteFish {
    @property(sp.Skeleton)
    lightingEffect: sp.Skeleton = null;

    @property(sp.Skeleton)
    hitLightingEffect: sp.Skeleton = null;

    private _isHaveWounded: boolean = false;
    private _tweenHitAction: Tween<Node> = null;
    private _points: any = [];
    private _moveTime: number = 0;

    initAssets(config: any): void {
        super.initAssets(config);
        this._isHaveWounded = config.haveWounded;

        this.node['stop'] = this.stop.bind(this);
        this.node['onHitLighting'] = this.onHitLighting.bind(this);

        this.lightingEffect = this.node.getChildByName('Lighting').getComponent(sp.Skeleton);
        this.hitLightingEffect = this.node.getChildByName('HitLighting').getComponent(sp.Skeleton);
    }

    initFishData(data: any): void {
        if (this.hitLightingEffect) {
            this.hitLightingEffect.node.active = false;
        }
        if (this.lightingEffect) {
            this.lightingEffect.node.active = false;
        }
        super.initFishData(data);
    }

    onHit(data: any): void {
        super.onHit(data);
        if (this._isHaveWounded && !this._tweenHitAction) {
            const timeNextWounded = getRandomInt(5, 10);
            this._tweenHitAction = tween(this.node)
                .call(() => {
                    this.changeAnimationSpeed(SPEED_WOUNDED);
                })
                .delay(TIME_KEEPING_STATE_WOUNDED)
                .call(() => {
                    this.resetAnimationSpeed();
                })
                .delay(timeNextWounded);
            this._tweenHitAction.start();
        }
    }

    onCatch(data: any): void {
        if (this._tweenHitAction) {
            this._tweenHitAction.stop();
        }
        super.onCatch(data);
    }

    unuse(): void {
        super.unuse();
        if (this._tweenHitAction) {
            this._tweenHitAction.stop();
            this._tweenHitAction = null;
        }
        if (this.hitLightingEffect) {
            this.hitLightingEffect.node.active = false;
            this.hitLightingEffect.setCompleteListener(() => {});
        }
        if (this.lightingEffect) {
            this.lightingEffect.node.active = false;
        }
    }

    stop() {
        Tween.stopAllByTarget(this.node);
        this.changeAnimationSpeed(6);
    }

    bolt() {
        if (this.lightingEffect) {
            this.lightingEffect.node.setPosition(this._targetPoint.x, this._targetPoint.y);
            this.lightingEffect.node.active = true;
            const scale = Math.min(
                this.fishAnim.getComponent(UITransform).width / this.lightingEffect.getComponent(UITransform).width,
                1
            );
            this.lightingEffect.node.setScale(scale, scale);
        }
    }

    onHitLighting(angle: number) {
        if (this.hitLightingEffect) {
            this.hitLightingEffect.node.active = false;
            this.hitLightingEffect.node.active = true;
            this.hitLightingEffect.node.angle = angle;
            if (!this.hitLightingEffect['_skeletonCache']) {
                this.hitLightingEffect.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
            }

            this.hitLightingEffect.setAnimation(0, 'animation', false);
            this.hitLightingEffect.setCompleteListener(() => {
                this.bolt();
            });
        }
    }

    moveByPoints(dataPos: any, isResume: any): void {
        this._points = dataPos;
        super.moveByPoints(dataPos, isResume);
    }

    updateMoveAction() {
        if (!this._points) return;
        if (this._points.length === 2) {
            this.moveAction.stop();
            this.moveAction = tween(this.node);

            this._timeLost = Math.max(0, (DataStore.instance.getTime() - this._buildTick) / 1000);
            const currentPos = this.node.getPosition();
            const p2 = v3(this._points[1].PosX, this._points[1].PosY);
            this._moveTime = v2Distance(currentPos, p2) / this.speed;

            this.moveAction.to(this._moveTime, { position: p2 });
            this.moveAction.call(() => this.onDie());
            this.moveAction.start();
        }
    }

    onShowDown() {
        if (this.moveAction) {
            this.moveAction.setSpeed(0.5);
        }
    }
}
