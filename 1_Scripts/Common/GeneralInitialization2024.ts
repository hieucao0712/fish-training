import { _decorator } from 'cc';
import { gfAutoFireController } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfAutoFireController';
import DataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import EventEmitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';
import { gfGeneralInitialization } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfGeneralInitialization';
import Localize from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfLocalize';
import MainFSM from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfMainFSM';
import ReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import NetworkParser from '../../../../cc-common/cc30-fishbase/Scripts/Network/gfNetworkParser';
import GameConfig from '../Config/Config2024';
import FishManager from './FishManager2024';
import MainController from './MainController2024';
import NodePoolConfig from './NodePoolConfig2024';
import PoolManager from './PoolManager2024';
const { ccclass } = _decorator;

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

        new gfAutoFireController();
    }

    loginGame() {
        MainController.instance.initToken();
        DataStore.instance.setDataStore({ currentSceneName: GameConfig.instance.SceneName.Lobby });
    }
}
