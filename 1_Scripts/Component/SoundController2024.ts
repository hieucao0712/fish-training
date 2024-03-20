import { _decorator } from "cc";
import { GfSoundController } from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfSoundController";
import { registerEvent, } from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import EventCode from "../Common/EventsCode2024";
import gfBaseConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";

const { ccclass } = _decorator;
@ccclass('SoundController2024')
export class SoundController2024 extends GfSoundController {
    initEvents(){
        super.initEvents();
        registerEvent(EventCode.SOUND.ACTIVE_FREEZE, this.playSfxFreeze, this);
        registerEvent(EventCode.SOUND.ADD_ITEM, this.playSfxAddItem, this);
    }

    resumeSoundBackground() {
        this.playBackGroundMusic(gfBaseConfig.instance.SOUND_BACKGROUND_CONFIG.IN_GAME);
    }

    playSfxAddItem(){
        this.playFishSFX("sfxAddItem");
    }

    playSfxFreeze() {
        this.playFishSFX("sfxFreeze");
    }

    playSfxRoundSwitch() { }
}
