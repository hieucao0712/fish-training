import { _decorator, Component, Node } from 'cc';
import { gfDragonAssetsManager } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonAssetsManager';
import DragonConfig2024 from './DragonConfig2024';
const { ccclass, property } = _decorator;

@ccclass('DragonAssetManager2024')
export class DragonAssetManager2024 extends gfDragonAssetsManager {
    public mergeConfig() {
        new DragonConfig2024();
        DragonConfig2024.instance.bossKind = this.bossData.bossKind;
        DragonConfig2024.instance.mergeToBaseConfig();
    }
}

