import { _decorator, Vec3, Tween, tween, TweenEasing, UIOpacity, screen } from "cc";
import { GfSideMenu } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfSideMenu';
const { ccclass, property } = _decorator;

@ccclass('SideMenu2024')
export class SideMenu2024 extends GfSideMenu {
    hideSideBar() {
        if (!this.isActionDone)
            return;
        this.unschedule(this.scheduleHide);
        this.isActionDone = false;
        let pos = new Vec3(-this.frameWidth, 0, 1);
        this.isHide = !this.isHide;
        this.iconHide.setScale(-this.iconHide.scale.x, this.iconHide.scale.y);
        if (this.isHide) {
            pos = new Vec3(0, 0, 1);
            this.node.getComponent(UIOpacity).opacity = 255;
        } else {
            this.node.getComponent(UIOpacity).opacity = 255;
            this.scheduleOnce(this.scheduleHide, 3);
        }
        let baseEasing:TweenEasing = this.isHide ? "sineIn" : "sineOut";
        Tween.stopAllByTarget(this.nodeMove);
        tween(this.nodeMove)
            .to(0.3, {position: pos}, {easing: baseEasing})
            .call(()=>{
                this.isActionDone = true;
            })
            .start();
    }
 
    resetSideMenu() {
        super.resetSideMenu();
        this.iconHide.setScale(new Vec3(1, 1, 1));
        this.node.getComponent(UIOpacity).opacity = 255;
    }
}

