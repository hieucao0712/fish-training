import { math, Node, tween, v2, v3, Vec2 } from 'cc';
import FishGroupData from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupData';
import FishGroupHelper from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishGroupHelper';
import { FISH_ACTION, FishMoveActions } from '../../../../cc-common/cc30-fishbase/Modules/FishGroup/gfFishMoveActions';
import GameConfig from '../Config/Config2024';

export class FishGroup4Extend2024 {
    static create() {
        const width = GameConfig.instance.AppSize.Width / 2;
        const height = GameConfig.instance.AppSize.Height / 2;
        const offsetX = 480 * 0.67 * FishGroupData.flipCoord;
        const radismain = 360 * 0.67;

        this.heartCallback(20, v2(width, height), radismain, 16, 720);
        this.heartCallback(20, v2(width, height), radismain - 36, 18, 720 + 90);
        this.heartCallback(18, v2(width, height), radismain - 36 - 56, 20, 720 + 90);
    }

    static heartCallback(index, center, radius, fishDuration, angle) {
        const { AppSize } = GameConfig.instance;
        const angleStep = 360 / index;
        const angleOffset = FishGroupData.isFlipped() ? 180 : 0;
        for (let i = 0; i < index; ++i) {
            const data = FishGroupData.getNextFishData();
            if (!data) continue;
            const startAngle = math.toRadian(i * angleStep + angleOffset);
            const { x, y } = this.heartFunction(center, radius, startAngle);
            const timeSpent = FishGroupData.timeSkipped - data.TimeFreeze;
            const speed = 180;
            data.moveAction = new FishMoveActions(
                v2(x, y),
                math.toDegree(Math.atan2(y - center.y, x - center.x)),
                timeSpent
            );
            FishGroup4Extend2024.appendHeartBy(data.moveAction, { time: fishDuration, center, radius, angle });
            data.moveAction.appendAction(FISH_ACTION.MoveByDistance, {
                time: AppSize.Width / speed,
                distance: AppSize.Width,
            });
            data.skipFlipY = true;
            FishGroupHelper.createFishWithDelay(data);
        }
    }

    static normalizeAngle(angle) {
        angle %= 2 * Math.PI;
        if (angle < 0) {
            return angle + 2 * Math.PI;
        }
        return angle;
    }

    static heartFunction(center, radius, angle) {
        angle = FishGroup4Extend2024.normalizeAngle(angle);
        const c = Math.sqrt(2) / 2;
        const a = 5 * c;
        const b = 3 * c;
        const d = Math.sqrt(a * a + b * b);
        const x = center.x + ((a * Math.cos(angle) - b * Math.sin(angle)) / d) * radius * FishGroupData.flipCoord;
        const alpha = Math.atan2(a, b);
        let y = 0;
        if (angle > alpha && angle < alpha + Math.PI) {
            angle = 2 * alpha + Math.PI - angle;
            y = center.y - ((a * Math.cos(angle) + b * Math.sin(angle)) / d) * radius * FishGroupData.flipCoord;
        } else {
            y = center.y + ((a * Math.cos(angle) + b * Math.sin(angle)) / d) * radius * FishGroupData.flipCoord;
        }
        return { x, y };
    }

    static appendHeartBy(action, prop) {
        const { time, center, radius, angle } = prop;
        if (action.timeSkipped && action.timeSkipped >= time) {
            action.timeSkipped -= time;
            const baseAngle = Math.atan2(action.startPosition.y - center.y, action.startPosition.x - center.x);
            const radian = baseAngle + math.toRadian(angle);
            const { x, y } = this.heartFunction(center, radius, radian);
            action.startPosition = v2(x, y);
            action.startAngle += math.toDegree(radian);
        } else {
            action.moveAction.push(
                FishGroup4Extend2024.heartBy(time - action.timeSkipped, center, radius, angle, action.timeSkipped)
            );
            action.timeSkipped = 0;
        }
    }

    static heartBy(duration: number, center: Vec2, radius: number, angle: number, timeSkipped: number) {
        let startPos = v3();
        let baseAngle = 0;
        return tween().to(duration, null, {
            onStart: (target) => {
                const node = target as Node;
                startPos = node.getPosition();
                baseAngle = Math.atan2(startPos.y - center.y, startPos.x - center.x);
            },
            onUpdate: (target, ratio) => {
                const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
                const radian = baseAngle + math.toRadian(angle) * dt;
                const { x, y } = this.heartFunction(center, radius, radian);
                (target as Node).setPosition(x, y, startPos.z);
            },
        });
    }
}
