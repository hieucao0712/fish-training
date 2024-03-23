
import { _decorator, tween, isValid, UITransform, v3} from 'cc';
import {SetZIndex, getPositionInOtherNode} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import {setOpacity} from "../../../../cc-common/cc-share/common/utils";
import {fadeIn, fadeOut, rotateBy, scaleTo} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import { gfJackpotStarFX } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfJackpotStarFX';
import gfDragonEvent from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';

const { ccclass, property } = _decorator;

const BallStarPos = [
    v3(4, 242),
    v3(202, 139),
    v3(246, -69),
    v3(114, -234),
    v3(-105, -236),
    v3(-244, -71),
    v3(-201, 139),
];
@ccclass('JackpotStarFX2024')
export class JackpotStarFX2024 extends gfJackpotStarFX {
    onLoad() {
        SetZIndex(this.node, GameConfig.instance.Z_INDEX.POPUP);
    }

    playAnimation(ballListArr) {
        const ballList = [...ballListArr];
        const scaleTime = 1.25;
        const fadeDelay = 0.5;
        const glowDelay = 1.65;
        const scaleDelay = 0.15;
        const rotateTime = scaleTime + fadeDelay + glowDelay + scaleDelay;
        const ballFlyTime = 0.15; // fly to star
        const flyAwayTime = 0.2; // fly out of screen

        setOpacity(this.image, 0);
        ballList.forEach((ball, i) => {
            if(isValid(ball.node)) {
                const ballPost = getPositionInOtherNode(this.node, ball.node);
                if(ballPost) {
                    ball.node.position = ballPost;
                    ball.node.parent = this.node;
                    ball.moveToJackpotStar({ delay: ballFlyTime * i, position: BallStarPos[i] });
                }
            }
        });


        tween(this.node)
            .delay(1 + ballFlyTime * 7)
            .parallel(
                rotateBy(rotateTime, 720),
                tween().then(
                    tween()
                        .delay(fadeDelay)
                        .call(() => {
                            tween(this.image)
                                .then(fadeIn(0.5))
                                .start();
                        })
                        .delay(glowDelay)
                        .call(()=>{
                            ballList.forEach((ball) => {
                                if(isValid(ball.node)) {
                                    ball.playGlowEffect();
                                }
                            });
                        })
                        .delay(scaleDelay)
                        .parallel(
                            scaleTo(scaleTime, 0.4),
                            tween()
                                .delay(1)
                                .call(() => {
                                    Emitter.instance.emit(gfDragonEvent.DRAGON.BIG_EXPLOSION, this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0)));
                                })
                                .delay(0.3)
                        )
                        .call(()=>{
                            ballList.forEach((ball) => {
                                if(isValid(ball.node)) {
                                    ball.flyAway(flyAwayTime);
                                }
                            });
                            tween(this.image)
                                .then(fadeOut(0.5))
                                .start();
                        })
                        .delay(scaleDelay)
                        .call(()=>{
                            Emitter.instance.emit(gfDragonEvent.DRAGON.SHOW_JACKPOT_WINAMOUNT);
                        })
                        .delay(0.75)
                        .call(()=>{
                            Emitter.instance.emit(gfDragonEvent.DRAGON.DONE_JACKPOT_STAR);
                        })
                        .removeSelf()
                )
            )
            .start();
    }
}

