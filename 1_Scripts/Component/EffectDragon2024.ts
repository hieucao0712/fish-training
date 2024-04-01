import { _decorator, instantiate, isValid, Prefab, sp, UITransform, v3 } from "cc";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import {
    getPositionInOtherNode,
    registerEvent,
} from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import EventCode from "../Common/EventsCode2024";
import GameConfig from "../Config/Config2024";
import { gfBossEffectLayer } from "../../../../cc-common/cc30-fishbase/Scripts/Components/Boss/gfBossEffectLayer";

const { ccclass, property } = _decorator;
@ccclass("EffectDragon2024")
export class EffectDragon2024 extends gfBossEffectLayer {

    @property(Prefab) plasmaExplosion: Prefab = null;

    @property(Prefab)
    crystal: Prefab = null;


    private _lstEffectGodzilla: any[] = [];

    initEvents(): void {
        super.initEvents();
        registerEvent(EventCode.GODZILLA.GODZILLA_DROP_CRYSTAL, this.onDropCrystal, this);
        registerEvent(EventCode.GODZILLA.GODZILLA_PLASMA_EFFECT, this.playPlasmaEffect, this);
    }

    playPlasmaEffect(data){
        let plasmaEffect = instantiate(this.plasmaExplosion);
        plasmaEffect.parent = this.node;
        plasmaEffect.setScale(1.5, 1.5, 1.5);
        plasmaEffect.active = true;
        plasmaEffect.position = this.node.getComponent(UITransform).convertToNodeSpaceAR(data.EffectPos);
        plasmaEffect.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        const duration = plasmaEffect.getComponent(sp.Skeleton).findAnimation('animation').duration * 0.67;
        let callback = ()=>{
            const dataInput = {
                DeskStation: data.DeskStation,
                BulletMultiple: data.BulletMultiple,
                ListFish: data.ListFish,
                skillID: 99
            };
            // Emitter.instance.emit(EventCode.FISH_LAYER.CATCH_FISH_BY_SKILL, dataInput);
            Emitter.instance.emit(EventCode.GAME_LAYER.CATCH_FISH_BY_PLASMA, dataInput);
            const index = this._lstEffectGodzilla.indexOf(plasmaEffect);
            if (index > -1) {
                this._lstEffectGodzilla.splice(index, 1);
            }
            if(isValid(plasmaEffect)) plasmaEffect.destroy();
        };
        this.scheduleOnce(callback, duration);
        this._lstEffectGodzilla.push(plasmaEffect);
    }

    onDropCrystal(dataInput) {
        const { data, worldPos, player } = dataInput;
        const gem = instantiate(this.crystal);
        gem.parent = this.node;
        gem.position = this.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        const dest = getPositionInOtherNode(this.node, player.gun);
        dest.y += 100 * (player.index > 1 ? -1 : 1);
        const coinDest = player.node
            .getComponent(UITransform)
            .convertToWorldSpaceAR(v3(0, 150 * (player.index > 1 ? -1 : 1)));
        gem.flyGemToPlayer(dest, () => {
            Emitter.instance.emit(EventCode.EFFECT_LAYER.PLAY_REWARD_EFFECT, {

                ...data,
                fishKind: GameConfig.instance.FISH_KIND.DRAGON + '_1',
                fishPos: coinDest,
                // skipUpdateWallet: true,
            });
        });
        this._lstEffectGodzilla.push(gem);
    }

    resetOnExit(): void {
        this._lstEffectGodzilla.forEach((gem) => {
            if (isValid(gem)) {
                gem.destroy();
                gem.removeFromParent();
            }
        });
        this._lstEffectGodzilla.length = 0;
    }
}
