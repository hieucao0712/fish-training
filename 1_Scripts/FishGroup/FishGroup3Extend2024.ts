import { _decorator, Component, Node, v2 } from "cc";

import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupData from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";
import { FISH_ACTION, FishMoveActions } from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions";
const { ccclass, property } = _decorator;

const TIME_WAVE = 20;
const SPEED_WAVE = 100;
const PAD_X = 60;
const PAD_Y = 30;
@ccclass("FishGroup3Extend2024")

export class FishGroup3Extend2024 extends Component {

    static create() {
        const { AppSize } = GameConfig.instance;

        const startPosWave = v2(AppSize.Width / 2, AppSize.Height / 2 - 500);
        const startPosWaveFlip = v2(AppSize.Width / 2, AppSize.Height / 2 + 500);

        const startPosWaveHorizontal = v2(AppSize.Width / 2 - 700, AppSize.Height / 2);
        const startPosWaveFlipHorizontal = v2(AppSize.Width / 2 + 700, AppSize.Height / 2);

        const distanceWave = TIME_WAVE * SPEED_WAVE + AppSize.Height / 2;
        const distanceWaveHo = TIME_WAVE * SPEED_WAVE + AppSize.Width / 2;

        this.createFishVFormation(23, false, startPosWave, distanceWave, PAD_X, PAD_Y);
        this.createFishVFormation(23, true, startPosWaveFlip, distanceWave, PAD_X, PAD_Y);

        this.createFishVFormationHorizontal(23, false, startPosWaveHorizontal, distanceWaveHo, PAD_X, PAD_Y);
        this.createFishVFormationHorizontal(23, true, startPosWaveFlipHorizontal, distanceWaveHo, PAD_X, PAD_Y);

    }

    static createFishVFormation(fishCount, isFlip, startPos, distanceWave, spaceX, spaceY) {
        for (let i = 0; i < fishCount; ++i) {
            const fishInfo = FishGroupData.getNextFishData();
            if (!fishInfo) continue;
            let pos;
            if (i === 0) {
                pos = startPos;
            }
            else {
                const posX = (i % 2 === 0) ? startPos.x + spaceX * Math.round(i / 2) : startPos.x - spaceX * Math.round(i / 2);
                const posY = isFlip ? startPos.y + spaceY * Math.round(i / 2) : startPos.y - spaceY * Math.round(i / 2);
                pos = v2(posX, posY);
            }
            const angle = isFlip ? -90 : 90;
            this.moveFish(pos, angle, distanceWave, fishInfo);
        }
    }

    static createFishVFormationHorizontal(fishCount, isFlip, startPos, distanceWave, spaceX, spaceY) {
        for (let i = 0; i < fishCount; ++i) {
            const fishInfo = FishGroupData.getNextFishData();
            if (!fishInfo) continue;
            let pos;
            if (i === 0) {
                pos = startPos;
            }
            else {
                const posX = isFlip ? startPos.x + spaceX * Math.round(i / 2) : startPos.x - spaceX * Math.round(i / 2);
                const posY = (i % 2 === 0) ? startPos.y + spaceY * Math.round(i / 2) : startPos.y - spaceY * Math.round(i / 2);
                pos = v2(posX, posY);
            }
            const angle = isFlip ? 180 : 0;
            this.moveFish(pos, angle, distanceWave, fishInfo);
        }
    }

    static moveFish(pos, angle, distanceWave, fishInfo) {
        const moveAction = new FishMoveActions(pos, angle);
        moveAction.startAngle = angle;
        moveAction.appendAction(FISH_ACTION.MoveByDistance, {
            time: TIME_WAVE,
            angle: angle * Math.PI / 90,
            distance: distanceWave
        });
        fishInfo.moveAction = moveAction;
        FishGroupHelper.createFishWithDelay(fishInfo);
    }
}
