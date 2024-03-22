
import { _decorator } from 'cc';
import gfDragonConfig from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonConfig';
const { ccclass } = _decorator;

@ccclass('DragonConfig2024')
export default class DragonConfig2024 extends gfDragonConfig {
    public static instance: DragonConfig2024 = null;

    SOUND_BACKGROUND_CONFIG: 'bgmDragon'

    ASSET_NAME: {
        BALL
    }

    POOL_TYPE_NAME = {
        DRAGON_BALL: 'DragonBall2024',
    }

    constructor() {
        super();
        DragonConfig2024.instance = this;
    }
}

DragonConfig2024.instance = null;