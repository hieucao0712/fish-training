import { _decorator, Component, Node } from 'cc';
import { gfDragonExtraSound } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonExtraSound';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import CustomDataFishSFX from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfSoundController';
import EventCode from '../Common/EventsCode2024';
import gfEventEmitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
const { ccclass, property } = _decorator;

@ccclass('DragonExtraSound2024')
export class DragonExtraSound2024 extends gfDragonExtraSound {
    
    initExtraEvents(): void {
        super.initExtraEvents();
        registerEvent(gfBaseEvents.SOUND.PLAY_SOUND_BACKGROUND, this.unscheduleSoundDragonScream, this);
        registerEvent(gfBaseEvents.SOUND.STOP_EFFECT_JACKPOT_COIN, this.stopSfxJackpotCoin, this);
        registerEvent(gfBaseEvents.SOUND.RESUME_SOUND_BACKGROUND, this.unscheduleSoundDragonScream, this);
        registerEvent(EventCode.SOUND.GODZILLA_PLASMA, this.playSfxPlasma, this);
    }

    protected playBossBackGroundMusic(): void {
        this.schedule(this.playSfxDragonScream.bind(this), 6);
        super.playBossBackGroundMusic();
    }

    protected stopSfxJackpotCoin(): void {
        this.unscheduleAllCallbacks();
        super.stopSfxJackpotCoin();
    }

    unscheduleSoundDragonScream(soundName){
        if (soundName != "bgmDragon") {
            this.unscheduleAllCallbacks();
        }
    }

    removeExtraEvents() {
        super.removeExtraEvents();
        this.unscheduleAllCallbacks();
    }

    playSfxPlasma(){
        const data:CustomDataFishSFX = {name: "sfxPlasma"};
        gfEventEmitter.instance.emit(gfBaseEvents.SOUND.PLAY_SOUND_BY_NAME, data);
    }
}

