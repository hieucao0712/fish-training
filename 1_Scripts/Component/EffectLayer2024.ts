import { _decorator, Component, Node } from 'cc';
import { gfEffectLayer } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfEffectLayer';
import { registerEvent } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import EventCode from '../Common/EventsCode2024';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import GameConfig from '../Config/Config2024';
const { ccclass, property } = _decorator;

@ccclass('EffectLayer2024')
export class EffectLayer2024 extends gfEffectLayer {
    playFXCatchFishBySkill(SkillID, fishPos) {
        // PoolManager.instance.createSmallExplosion({position: fishPos});
    }

    initEvents(): void {
        super.initEvents();
        registerEvent(EventCode.GODZILLA.GODZILLA_PLASMA_EFFECT, this.playPlasmaEffect, this);
    }

    playPlasmaEffect(data) {
        const player = ReferenceManager.instance.getPlayerByDeskStation(data.DeskStation);
        this.onPlayBigWinWheelEffect({
            player: player,
            GoldReward: data.WinAmount,
            bet: data.BulletMultiple,
            fishKind: GameConfig.instance.FISH_KIND.DRAGON,
        });
    }
}

