import { _decorator, instantiate, isValid, Prefab, UITransform, v3 } from "cc";
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
    @property(Prefab)
    crystal: Prefab = null;

    private _lstEffectGodzilla: any[] = [];

    initEvents(): void {
        super.initEvents();
        registerEvent(EventCode.GODZILLA.GODZILLA_DROP_CRYSTAL, this.onDropCrystal, this);
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
                data,
                fishKind: GameConfig.instance.FISH_KIND.DRAGON + "_1",
                fishPos: coinDest,
                skipUpdateWallet: true,
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
