import { v2 } from 'cc';
import gfMainController from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfMainController';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import NetworkParser from '../../../../cc-common/cc30-fishbase/Scripts/Network/gfNetworkParser';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import EventCode from './EventsCode2024';

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

    initEvents() {
        super.initEvents();
        NetworkParser.instance.registerEvent(2060, this.onHitGodzilla.bind(this));
    }

    onHitGodzilla(data){
        const {WinAmount, DeskStation, Wallet} = data;
        if(!WinAmount){
            const wlData = {
                DeskStation,
                Wallet
            };
            // Emitter.instance.emit(EventCode.PLAYER_LAYER.GAME_UPDATE_WALLET, wlData);
        }

        Emitter.instance.emit(EventCode.GODZILLA.ON_HIT_GODZILLA, data);
    }
}
