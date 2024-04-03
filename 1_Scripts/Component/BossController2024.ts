import { _decorator, instantiate, Node } from 'cc';
import gfBossController from '../../../../cc-common/cc30-fishbase/Scripts/Components/Boss/gfBossController';
import { gfBaseFish } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Fishes/gfBaseFish';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
const { ccclass } = _decorator;

@ccclass('BossController2024')
export class BossController2024 extends gfBossController {
    private boss: Node = null;

    public createBoss(data: any) {
        const bossAsset = this.getBossAssetByKind(data.FishKind);
        if (bossAsset) {
            if (!this.boss) {
                this.boss = instantiate(bossAsset.bossPrefab);
                // this['listBoss'].push(this.boss.getComponent(gfBaseFish));
            }
            this.boss.setParent(ReferenceManager.instance.getNodeFishLayer());
            const fish = this.boss.getComponent(gfBaseFish);
            fish.initFishData(data);
            this['listBoss'].push(fish);
            return fish;
        }
        return null;
    }
}
