import { v2 } from 'cc';
import gfMainController from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfMainController';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';

export default class MainController2024 extends gfMainController {
    onUpdateEventTray(data: any): void {
        const { DeskStation, skillInfo } = data;
        if (DataStore.instance.getSelfDeskStation() === DeskStation && skillInfo?.SkillID) {
            this.sendFireOneShotGunSkill({
                Angle: 0,
                SkillID: skillInfo.SkillID,
                ListFish: [],
                pos: v2(),
            });
        }
    }
}
