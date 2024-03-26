import { _decorator, Component, Node, v2 } from "cc";
import GameConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import FishGroupData from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData";
import { randRange } from "../../../../cc-common/cc-share/common/utils";
import { FISH_ACTION, FishMoveActions } from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions";
import FishGroupHelper from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper";
import gfFishGroup19 from "../../../../cc-common/cc30-fishbase/Modules/FishGroup/Groups/gfFishGroup19";
const { ccclass, property } = _decorator;

@ccclass("FishGroup3Extend2024")
export class FishGroup3Extend2024 extends gfFishGroup19 {

    // static create() {
    //     const COUNT_FISH = {
    //         TOP_BOTTOM: 10,
    //         TOP_TOP: 5,
    //         TOP_TOP_SUB: 8,
    //         BOTTOM_BOTTOM_SUB: 8,
    //         BOTTOM_BOTTOM: 5,
    //         BOTTOM_TOP: 10,
    //     };
    //     const TotalTime = 35;
    //     const { AppSize } = GameConfig.instance;
    //     const flip = !FishGroupData.isFlipped();
    //     const CONFIG_LINE_FISH = [
    //         {
    //             posYStart: !flip ? -120 : (AppSize.Height + 120),
    //             posYEnd: !flip ? 150 : (AppSize.Height - 150),
    //             totalFish: COUNT_FISH.TOP_BOTTOM,
    //             totalTime: TotalTime,
    //             angle: !flip ? 90 : -90,
    //         },
    //         {
    //             posYStart: !flip ? (AppSize.Height + 120) : -120,
    //             posYEnd: !flip ? (AppSize.Height - 150) : 150,
    //             totalFish: COUNT_FISH.BOTTOM_TOP,
    //             totalTime: TotalTime,
    //             angle: !flip ? -90 : 90,
    //         },
    //         {
    //             posYStart: !flip ? -120 : (AppSize.Height + 120),
    //             posYEnd: !flip ? 100 : (AppSize.Height - 100),
    //             totalFish: COUNT_FISH.TOP_TOP,
    //             totalTime: TotalTime,
    //             angle: !flip ? 90 : -90,
    //         },
    //         {
    //             posYStart: !flip ? (AppSize.Height + 120) : -120,
    //             posYEnd: !flip ? (AppSize.Height - 100) : 100,
    //             totalFish: COUNT_FISH.BOTTOM_BOTTOM,
    //             totalTime: TotalTime,
    //             angle: !flip ? -90 : 90,
    //         },
    //         {
    //             posYStart: !flip ? -120 : (AppSize.Height + 120),
    //             posYEnd: !flip ? 100 : (AppSize.Height - 100),
    //             totalFish: COUNT_FISH.TOP_TOP_SUB,
    //             totalTime: TotalTime,
    //             angle: !flip ? 90 : -90,
    //         },
    //         {
    //             posYStart: !flip ? (AppSize.Height + 120) : -120,
    //             posYEnd: !flip ? (AppSize.Height - 100) : 100,
    //             totalFish: COUNT_FISH.BOTTOM_BOTTOM_SUB,
    //             totalTime: TotalTime,
    //             angle: !flip ? -90 : 90,
    //         },
           
    //     ];

    //     let left = -500;
    //     let right = GameConfig.instance.AppSize.Width - left;
    //     if (FishGroupData.isFlipped()) {
    //         [left, right] = [right, - right];
    //     }

    //     for (let i = 0; i < 4; i++) {
    //         const config = CONFIG_LINE_FISH[i];
    //         this.createMiniLineFishGroup(AppSize, flip, config);           
    //     }
    // }
    // static createMiniLineFishGroup(AppSize, flip, config) {
    //     const offsetX = AppSize.Width / config.totalFish;
    //     const moveInTime = 2.0;
    //     const stayTime =  config.totalTime;
    //     const moveOutTime = 3.0;
    //     for (let i = 0; i < config.totalFish; ++i) {
    //         const data = FishGroupData.getNextFishData();
    //         if (!data) continue;
    //         const random = randRange(500, -500);
    //         const endPos = (config.angle === 90) ? v2(random, 720) : v2(random, -720);
    //         let posX = flip ? ((config.totalFish - i) * offsetX - offsetX / 2) : ((i) * offsetX + offsetX / 2);
    //         let startPos = v2(posX, config.posYStart);
    //         if (moveInTime <= 0) {
    //             startPos = v2(posX, config.posYEnd);
    //         }
    //         const moveAction = new FishMoveActions(startPos, config.angle);
    //         const distanceY = config.posYEnd - startPos.y;
    //         moveAction.appendAction(FISH_ACTION.MoveBy, { time: moveInTime, x: 0, y:  distanceY});
    //         moveAction.appendAction(FISH_ACTION.Delay, { time: stayTime });
    //         const timeMove = randRange(moveOutTime * 10 - 5, moveOutTime * 10) / 10;
    //         moveAction.appendAction(FISH_ACTION.MoveBy, { time: timeMove, x: 0, y: endPos.y, motion : 'quartOut'});

    //         data.moveAction = moveAction;
    //         FishGroupHelper.createFishWithDelay(data);
    //     }
    // }
}