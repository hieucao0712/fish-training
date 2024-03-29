import { _decorator, Component, Node, sp, sys, tween, UITransform, v3 } from 'cc';
import { getRandomInt } from '../../../../cc-common/cc-share/common/utils';
import { call, delay, scaleTo, stopAllActions } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper';
import { getPositionInOtherNode, getRotation, registerEvent, removeEvents, v2Distance } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import EventCode from '../Common/EventsCode2024';
import FishManager from '../Common/FishManager2024';
const { ccclass, property } = _decorator;

@ccclass('LightingChain2024')
export class LightingChain2024 extends Component {
    @property (Node)
    spine: Node = null;
    callBack = null;

    onLoad() {
        this.node["playEffectLight"] = this.playEffectLight.bind(this);
        this.node["reset"] = this.reset.bind(this);
        this.node["getTimeMove"] = this.getTimeMove.bind(this);
        registerEvent(EventCode["COMMON"].GAME_SHOW, this.reset, this);
    }

    playEffectLight(infoTargetFrom, infoTargetTo, callBack, isDie = true, isFishDead = false) {
        this.callBack = callBack;
        this.node.active = true;
        if (infoTargetFrom != null) {
            if (!FishManager.instance.getFishById(infoTargetFrom.getId())) {
                this.reset();
                if (typeof this.callBack === 'function')
                    this.callBack();
                return;
            }
            const startPoint = infoTargetFrom.getLockPositionByNodeSpace(this.node.parent);
            this.node.setPosition(startPoint);
        }

        const timeMove = this._playAnimationLightingChain(infoTargetTo, isDie, isFishDead);

        return timeMove;

    }

    _playAnimationLightingChain(infoTargetTo, isDie, isFishDead = false) {
        const data = this._calculateInfo(infoTargetTo);
        if(!data) {
            if (typeof this.callBack === 'function'){
                this.callBack();
            }
            return;
        }
        const {timeMove, angle, point, size, endPos} = data;
        this.node.angle = angle;
        this.spine.setScale(this.spine.scale.x, 0);
        if (data && point) {
            let duration = this.spine.getComponent(sp.Skeleton).findAnimation('animation').duration;
            let dt = getRandomInt(0, duration * 10) / 10;
            this.spine.getComponent(sp.Skeleton).setAnimation(0, 'animation', true);
            this.spine.getComponent(sp.Skeleton).timeScale = size;
            sys.isNative ? this.spine.getComponent(sp.Skeleton)['_updateRealtime'](dt) : this.spine.getComponent(sp.Skeleton).updateAnimation(dt);
            
            tween(this.spine).
            sequence(
                scaleTo(timeMove, 0.7, size),
                
                call(() => {
                    if (isDie && infoTargetTo && (!infoTargetTo.checkDie() || isFishDead) && infoTargetTo.stop){
                        infoTargetTo.stop();
                    }
                    if (infoTargetTo && infoTargetTo.onHitLighting){
                        infoTargetTo.onHitLighting(angle);
                    }
                    this.node.setPosition(this.node.position.x, -1);
                    this.node.setPosition(endPos);
                    tween(this.spine).sequence(
                        delay(0.4),
                        call(()=>{
                            this.spine.getComponent(sp.Skeleton).setAnimation(0, 'disappear', false);
                            let dt = getRandomInt(10, 20) * 0.1;
                            this.spine.getComponent(sp.Skeleton).timeScale = dt;

                            this.spine.getComponent(sp.Skeleton).setCompleteListener(() => {
                                this.spine.removeFromParent();
                                this.spine.destroy();

                                this.node.removeFromParent();
                                this.node.destroy();
                            });
                        })
                    ).start();
                    if (typeof this.callBack === 'function'){
                        this.callBack();
                    }
                })
            ).start();
        } else {
            if (typeof this.callBack === 'function')
                this.callBack();
        }

        return timeMove;

    }

    _calculateInfo(infoTargetTo) {
        if (this.node.parent === null || !FishManager.instance.getFishById(infoTargetTo.getId())) {
            console.log("LightingChain - invalid fish");
            this.reset();
            if (typeof this.callBack === 'function')
                this.callBack();
            return;
        }
        const endPos = infoTargetTo.getLockPositionByNodeSpace(this.node.parent);
        const startPos = this.node.getPosition();
        const distance = v2Distance(this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,0,0)), endPos);
        const point = getPositionInOtherNode(this.node.parent, infoTargetTo.node);
        const angle = getRotation(endPos, startPos) - 90;
        const size = distance / 330;

        const timeMove = distance / 3000;

        return {timeMove, angle, point, size, endPos};

    }

    getTimeMove(infoTargetFrom, infoTargetTo){
        if (infoTargetFrom != null) {
            if(!FishManager.instance.getFishById(infoTargetFrom.getId())) {
                this.reset();
                if (typeof this.callBack === 'function')
                    this.callBack();
                return;
            }
            const startPoint = infoTargetFrom.getLockPositionByNodeSpace(this.node.parent);
            this.node.setPosition(startPoint);
        }
        const data = this._calculateInfo(infoTargetTo);
        let timeMove = (data && (data.timeMove + 0.4)) || 1;
        return timeMove;

    }

    reset() {
        if (this.node) {
            stopAllActions(this.node);
            stopAllActions(this.spine);
            this.node.removeFromParent();
            this.node.destroy();
        }
    }

    onDestroy() {
        removeEvents(this);
    }
}

