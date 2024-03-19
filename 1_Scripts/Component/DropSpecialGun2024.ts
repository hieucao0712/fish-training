import { _decorator, Component, tween } from "cc";
import { gfDropSpecialGunFX } from "../../../../cc-common/cc30-fishbase/Scripts/Components/Effects/gfDropSpecialGunFX";
const { ccclass, property } = _decorator;

@ccclass("DropSpecialGun2024")
export class DropSpecialGun2024 extends gfDropSpecialGunFX {
    onDrop() {
        this.node.angle = this.node.angle - 90;
        return tween().delay(0.85);
    }
    onFly() {
        return tween().to(1, { position: this.endPosition });
    }

    onFinish() {
        return tween()
            .delay(0.85)
            .call(() => {
                this.node.removeFromParent();
                this.node.destroy();
                typeof this.callBack === "function" && this.callBack(this);
            });
    }
}
