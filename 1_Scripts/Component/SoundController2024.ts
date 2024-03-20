import { _decorator } from "cc";
import { GfSoundController } from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfSoundController";
import { registerEvent, } from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import EventCode from "../Common/EventsCode2024";

const { ccclass } = _decorator;
@ccclass('SoundController2024')
export class SoundController2024 extends GfSoundController {
    initEvents(){
        super.initEvents();
        registerEvent(EventCode.SOUND.ADD_ITEM, this.playSfxAddItem, this);
    }

    playSfxAddItem(){
        this.playFishSFX("sfxAddItem");
    }


    playSfxRoundSwitch() { }
}
