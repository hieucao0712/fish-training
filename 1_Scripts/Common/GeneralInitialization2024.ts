import { _decorator } from 'cc';
const { ccclass } = _decorator;

import { gfGeneralInitialization } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGeneralInitialization';
import GameConfig from '../Config/Config2024';
import EventEmitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import NetworkParser from '../../../../cc-common/cc30-fishbase/Scripts/Network/gfNetworkParser';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import MainFSM from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfMainFSM';
import MainController from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfMainController';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import Localize from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfLocalize';
import FishManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfFishManager';
import PoolManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfPoolManager';
import NodePoolConfig from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfNodePoolConfig';

@ccclass('GeneralInitialization2024')
export class GeneralInitialization2024 extends gfGeneralInitialization {
    initInstances() {
        //Init Localize
        new Localize();
        Localize.instance.initLocalizeConfig(this.jsonLocalize.json);
        //Init Event Emitter
        new EventEmitter();
        //Init NetworkParser
        new NetworkParser();
        //Init GameConfig
        if (!GameConfig.instance) {
            new GameConfig();
        }
        //Init Datastore
        new DataStore();

        //Init ReferenceManager
        new ReferenceManager();

        //Init Main FSM
        new MainFSM();
        //Init Main Controller
        new MainController();
        //Init Popup Controller
        //new PopupController();

        //Init Notify Controller
        //new NotifyController();
        new FishManager();
        new PoolManager(this.gameObjectPrefabs);
        new NodePoolConfig(this.nodePoolAssetPrefab);
    }

    loginGame() {
        MainController.instance.initToken();
        DataStore.instance.setDataStore({ currentSceneName: GameConfig.instance.SceneName.Lobby });
    }
}
