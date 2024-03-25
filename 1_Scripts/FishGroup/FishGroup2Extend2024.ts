import { _decorator, Component, v2 } from "cc";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
import FishGroupData from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";
const { ccclass, property } = _decorator;

@ccclass("FishGroup2Extend2024")
export class FishGroup2Extend2024 extends Component {
    static create() {
        const { AppSize } = GameConfig.instance;
        const fishCount = [50, 50, 50, 2, 1, 3, 1];
        const Y1 = 220;
        const space = 100;
        const speed = 120;
        this.createFishLine(fishCount[0] / 2, Y1, space, speed);
        this.createFishLine(fishCount[0] / 2, AppSize.Height - Y1, space, speed);
        FishGroupData.updateCustomZIndex(555);
    }

    static createFishLine(fishCount, yCoord, space, speed, xOffset = 0) {
        const { AppSize } = GameConfig.instance;
        let RIGHT = -200;
        let LEFT = AppSize.Width + 200;
        const flip = -FishGroupData.flipCoord;
        if (FishGroupData.isFlipped()) {
            [LEFT, RIGHT] = [RIGHT, LEFT];
            yCoord = AppSize.Height - yCoord;
        }
        const distance = Math.abs(RIGHT - LEFT) + fishCount * space - xOffset;

        for (let i = 0; i < fishCount; ++i) {
            const startX = LEFT - (i * space - xOffset) * flip;
            FishGroupHelper.createSimpleMovingFish(v2(startX, yCoord), v2(startX + distance * flip, yCoord), 0, speed);
        }
    }
}
