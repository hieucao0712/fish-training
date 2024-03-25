import { _decorator, bezier, Component, Node, v2 } from "cc";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupData from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";
import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
import { FISH_ACTION, FishMoveActions } from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions";
const { ccclass, property } = _decorator;

@ccclass("FishGroup1Extend2024")
export class FishGroup1Extend2024 extends Component {
    static FlowerMoveData: any;

    static create() {
        const width = GameConfig.instance.AppSize.Width;
        const height = GameConfig.instance.AppSize.Height;
        const offset = 200;
        const parabolStart = v2(0 - offset * 2, 0 + offset);
        const parabolEnd = v2(width + offset * 1.5, height + offset);
        const parabolConfig = this.randomBezierFish(parabolStart, parabolEnd, 0.1);
        this._runFish(parabolConfig, 0);
    }

    static _runFish(flow, timeFlow) {
        const data = FishGroupData.getNextFishData();
        if (!data) return;
        const moveAction = new FishMoveActions(flow[0]);
        const timeLeft = Math.max(0, 15);
        moveAction.appendAction(FISH_ACTION.Delay, { time: 0 + timeFlow + 7.5 });
        moveAction.appendAction(FISH_ACTION.gfBezierBy, {
            time: timeLeft,
            points: flow,
        });
        data.moveAction = moveAction;
        FishGroupHelper.createFishWithDelay(data);
    }

    static randomBezierFish(beganPos, endPos, radio) {
        const midX = (beganPos.x + endPos.x) / 2;
        const midY = beganPos.y + (endPos.y - beganPos.y) * 0.75;
        const midPos = v2(midX, midY);
        const bezierConfig = [v2(beganPos.x, beganPos.y), midPos, endPos];
        return bezierConfig;
    }

    static calculateFlowerDiePosition(time) {
        if (!this.FlowerMoveData) return v2(780, 320);
        const delayTime = 6;
        const moveTime = 15;
        time -= FishGroupHelper.FISH_START_DELAY;
        if (time <= delayTime) return this.FlowerMoveData[0];
        time -= delayTime;
        if (time >= moveTime) return this.FlowerMoveData[3];
        const ratio = time / moveTime;
        const x = bezier(
            this.FlowerMoveData[0].x,
            this.FlowerMoveData[1].x,
            this.FlowerMoveData[2].x,
            this.FlowerMoveData[3].x,
            ratio
        );
        const y = bezier(
            this.FlowerMoveData[0].y,
            this.FlowerMoveData[1].y,
            this.FlowerMoveData[2].y,
            this.FlowerMoveData[3].y,
            ratio
        );
        return v2(x, y);
    }
}
