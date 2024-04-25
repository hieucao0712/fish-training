import { v2 } from 'cc';
import FishGroupData from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData';
import FishGroupHelper from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper';
import { FISH_ACTION, FishMoveActions } from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions';
import GameConfig from '../Config/Config2024';

export class FishGroup5Extend2024 {
    static create() {
        this.createFishWave(30, 200);
    }

    static createFishWave(count: number, radius: number) {
        const delay = 0.5;
        for (let i = 0; i < count; ++i) {
            this.createFish(i * delay, radius);
        }
    }

    static createFish(delay: number, radius: number) {
        const data = FishGroupData.getNextFishData();
        if (!data) return;

        const { AppSize } = GameConfig.instance;
        const startPos = FishGroupHelper.convertFlipCoordinate(v2(AppSize.Width / 2, -100));
        const startHeart = FishGroupHelper.convertFlipCoordinate(v2(AppSize.Width / 2, AppSize.Height / 2 - radius));
        const fishSpeed = 150;
        const moveTime = Math.abs(startHeart.y - startPos.y) / fishSpeed;
        const moveHearTime = 4;

        data.moveAction = new FishMoveActions(startPos);
        data.moveAction.appendAction(FISH_ACTION.Delay, { time: delay });
        data.moveAction.appendAction(FISH_ACTION.MoveBy, {
            time: moveTime,
            x: 0,
            y: startHeart.y - startPos.y,
        });
        this.makeHalfRightHeart(data.moveAction, moveHearTime, radius);
        this.makeHalfLeftHeart(data.moveAction, moveHearTime, radius);
        data.moveAction.appendAction(FISH_ACTION.MoveBy, {
            time: moveTime,
            x: 0,
            y: startPos.y - startHeart.y,
        });

        FishGroupHelper.createFishWithDelay(data);
    }

    static makeHalfRightHeart(moveAction: FishMoveActions, moveTime: number, radius: number) {
        moveAction.appendAction(FISH_ACTION.gfBezierBy, {
            time: moveTime,
            points: [
                v2(1.5, 0.75).multiplyScalar(radius * FishGroupData.flipCoord),
                v2(1.5, 2.5).multiplyScalar(radius * FishGroupData.flipCoord),
                v2(0, 1.75).multiplyScalar(radius * FishGroupData.flipCoord),
            ],
        });
    }

    static makeHalfLeftHeart(moveAction: FishMoveActions, moveTime: number, radius: number) {
        moveAction.appendAction(FISH_ACTION.gfBezierBy, {
            time: moveTime,
            points: [
                v2(-1.5, 0.75).multiplyScalar(radius * FishGroupData.flipCoord),
                v2(-1.5, -1).multiplyScalar(radius * FishGroupData.flipCoord),
                v2(0, -1.75).multiplyScalar(radius * FishGroupData.flipCoord),
            ],
        });
    }
}
