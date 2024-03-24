import {_decorator, v3, tween, UITransform, Vec3} from 'cc';
import {getRandomInt, setOpacity} from "../../../../cc-common/cc-share/common/utils";
import {fadeIn, fadeOut, moveTo, rotateBy, scaleTo} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import {autoEnum} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import { gfDragonBall } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonBall';
import EventCode from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent';

const {ccclass} = _decorator;

const STATE = autoEnum([
    "Invalid",
    "Dropping",
    "InTray",
    "InJackpotStar"
]);

@ccclass('DragonBall2024')
export class DragonBall2024 extends gfDragonBall {
    dropToPlayer(dragonPosition, playerBallHolder, deskStation) {
        const destination = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(playerBallHolder.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0)));
        setOpacity(this.ballSprite.node, 0);
        setOpacity(this.ballSpark, 0);
        setOpacity(this.hitGlow, 0);
        setOpacity(this.hitLight, 0);
        setOpacity(this.frontEff, 0);
        //@ts-ignore
        this._state = STATE.Dropping;
        const dropTime = 0.5;
        const sparkTime = 0.25;
        const zoomTime = 1;
        const stopTime = 0.5;
        const randomX = getRandomInt(-200, 200);
        const randomY = getRandomInt(-150, 150);
        const randomPos = new Vec3(randomX, randomY, 0);
        this.node.setPosition(dragonPosition);
        tween(this.ballSpark)
            .then(fadeIn(sparkTime))
            .then(fadeOut(sparkTime))
            .start();

        tween(this.node)
            .delay(sparkTime)
            .call(() => {
                this.frontEff.active = true;
                this.backEff.active = true;
                setOpacity(this.frontEff, 255);
                setOpacity(this.backEff, 255);
                this.frontEff.scale.set(v3(0, 0, 0));
                this.backEff.scale.set(v3(0, 0, 0));
                tween(this.frontEff)
                    .to(zoomTime, {scale: v3(1, 1, 1)})
                    .start();
                tween(this.frontEff)
                    .to(zoomTime, {scale: v3(1, 1, 1)})
                    .start();
                tween(this.backEff)
                    .repeatForever(rotateBy(1, 360))
                    .start();

                this.fireEfx.scale.set(v3(0, 0, 0));
                setOpacity(this.fireEfx, 255);
                this.fireEfx.active = true;

                tween(this.fireEfx)
                    .to(zoomTime, {scale: v3(2.5, 2.5, 1)})
                    .start();
                tween(this.fireEfx)
                    .repeatForever(rotateBy(1, 360))
                    .start()
            })
            .delay(zoomTime)
            .parallel(
                moveTo(stopTime, randomPos.x, randomPos.y),
                tween().call(() => {
                    tween(this.frontEff).then(fadeOut(0.1)).start();
                    tween(this.ballSprite).then(fadeIn(0.1)).start();
                })
            )
            .delay(stopTime)
            .parallel(
                moveTo(dropTime, destination.x, destination.y),
                scaleTo(dropTime, this.baseScale)
            )
            .call(() => {
                this.addToPlayer(playerBallHolder);
                //@ts-ignore
                this._state = STATE.InTray;
                Emitter.instance.emit(EventCode.DRAGON.DONE_BALL_DROP, deskStation);
            }).start()

    }
}

