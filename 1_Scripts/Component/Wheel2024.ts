import { _decorator, Component, Node } from 'cc';
import { gfWheel } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Effects/gfWheel';
const { ccclass, property } = _decorator;
@ccclass('SkinConfig2024')
export class SkinConfig2024 {
    @property
    win: string = 'Thang';
    @property
    bigWin: string = 'Thang Lon';
    @property
    superWin: string = 'Thang Sieu Lon';
    @property
    megaWin: string = 'Thang Cuc Lon';
}

@ccclass('AnimConfig2024')
export class AnimConfig2024 {
    @property
    appear: string = 'AllAppear';
    @property
    idle: string = 'AllIdle';
    @property
    hide: string = 'AllDisappear';
    @property
    ribbonAppear: string = 'RibbonAppear';
    @property
    SpinnerAppear: string = 'SpinnerAppear';
    @property
    SpinnerIdle: string = 'SpinnerIdle';
}
@ccclass('Wheel2024')
export class Wheel2024 extends gfWheel {
    
    protected skinName: SkinConfig2024 = new SkinConfig2024();
    protected animName: AnimConfig2024 = new AnimConfig2024();

    protected setupAnimSpine() {
        this.animName.appear = "AllAppear";
        this.animName.idle = "AllIdle";
        this.animName.hide = "AllDisappear";
        this.animName.ribbonAppear = "RibbonAppear";
        this.animName.SpinnerAppear = "SpinnerAppear";
        this.animName.SpinnerIdle = "SpinnerIdle";
    }

    protected setupSkinSpine() {
        this.skinName.win = "Thang";
        this.skinName.bigWin = "Thang Lon";
        this.skinName.superWin = "Thang Sieu Lon";
        this.skinName.megaWin = "Thang Cuc Lon";
    }
}

