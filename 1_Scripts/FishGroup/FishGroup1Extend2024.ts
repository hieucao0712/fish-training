import { _decorator, Component, v2 } from "cc";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
import FishGroupData from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";
import { FISH_ACTION, FishMoveActions } from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions";

const { ccclass } = _decorator;

@ccclass("FishGroup1Extend2024")
export class FishGroup1Extend2024 extends Component {
    static create() {
        const fishSpeed = 80;
        const radius = 960;
        const numberStep = 1.5;
        const fishCount = 120;
        let isFlipScreen = true;
        let right = 0;
        let left = GameConfig.instance.AppSize.Width ;
        let down = 0;
        let up = GameConfig.instance.AppSize.Height;
        if (FishGroupData.isFlipped()) {
            [right, left] = [left, right];
            [down, up] = [up, down];
            isFlipScreen = false;
        }

        this.createParabolFishGroup({
            fishCount: fishCount, startPos: v2(right, down), numberStep: numberStep, 
            distanceX: GameConfig.instance.AppSize.Width + 200, 
            speed: fishSpeed, radius: radius,
            isMoveRight: isFlipScreen, isMoveUp: isFlipScreen
        });
    }


    static createParabolFishGroup({
        fishCount, startPos, numberStep, distanceX, radius, speed , isMoveRight, isMoveUp}) {
        const dir = isMoveRight ? 1 : -1;
        const sub = isMoveUp ? 0 : 1;
        const distanceMini = distanceX * 1.25 / numberStep;
        const moveInTime = ((distanceX / speed)) / numberStep;
        const delayEach = 0.45;
        for (let i = 0; i < fishCount; ++i) {
            const data = FishGroupData.getNextFishData();
            if (!data) continue;
            const delay = i * delayEach;
            const moveAction = new FishMoveActions(startPos);
            moveAction.appendAction(FISH_ACTION.Delay, { time: delay });
            for (let j = 0; j <= numberStep; j++) {
                const y = radius * Math.pow(-1, j + sub);
                moveAction.appendAction(FISH_ACTION.gfBezierBy, {
                    time: moveInTime, points: [
                        v2(dir * distanceMini * 0.25, y),
                        v2(dir * distanceMini * 0.75, y),
                        v2(dir * 1280, 0)
                    ]
                });
            }
            data.moveAction = moveAction;
            FishGroupHelper.createFishWithDelay(data);
        }
    }
}
