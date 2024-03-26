import { _decorator, Component, v2 } from "cc";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
// import { FishGroupData } from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";

const { ccclass } = _decorator;

@ccclass("FishGroup1Extend2024")
export class FishGroup1Extend2024 extends Component {
    static create() {
        const fishCount = 50;
        const speed = 120;
        const parabolaPoints = this.calculateParabolaPoints(fishCount);
        this.createLine(fishCount, parabolaPoints, speed);
    }

    static createLine(fishCount, parabolaPoints, speed) {
        for (let i = 0; i < fishCount; ++i) {
            const startPoint = v2(0, 0);
            const endPoint = parabolaPoints[i];
            FishGroupHelper.createSimpleMovingFish(startPoint, endPoint, 0, speed);
        }
    }

    static calculateParabolaPoints(count: number) {
        const { AppSize } = GameConfig.instance;
        const points = [];
        const startX = 0;
        const endX = AppSize.Width;
        const a = -AppSize.Height / (endX * endX); 

        for (let i = 0; i < count; ++i) {
            const x = startX + (endX - startX) * (i / (count - 1));
            const y = a * x * x + AppSize.Height; 
            points.push(v2(x, y));
        }
        return points;
    }
}
