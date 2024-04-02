import { _decorator, Component, isValid } from 'cc';
import { gfGunSkillController } from '../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfGunSkillController';
import ReferenceManager from './ReferenceManager2024';
import DataStore from './DataStore2024';
const { ccclass, property } = _decorator;

@ccclass('GunSkillController2024')
export class GunSkillController2024 extends gfGunSkillController {
    initEvents() {
        super.initEvents();
    }

    catchFishBySkill(data) {
        const myDeskStation = DataStore.instance.getSelfDeskStation();
        const player = ReferenceManager.instance.getPlayerByDeskStation(myDeskStation);
        if (player) {
            if (player.index > 1) {
                data.Angle += 180;
            }
            const gunSkillNode = this.getGunSkillNodeActiveByDeskStation(data.DeskStation);
            this.reduceGunSkillData(data.DeskStation, data.SkillID);
            gunSkillNode && gunSkillNode.onFireSkill(data);
        }
    }
}

