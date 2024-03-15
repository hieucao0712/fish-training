import { _decorator } from 'cc';
const { ccclass } = _decorator;

import { gfLoadingScene } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfLoadingScene';
import GameConfig from '../Config/Config2024';

@ccclass('LoadingScene2024')
export class LoadingScene2024 extends gfLoadingScene {
    initGameConfig() {
        if (!GameConfig.instance) {
            new GameConfig();
        }
    }

    setGameAndLobbyPrefab(gameNormalPrefab: any, gameVIPPrefab: any, lobbyPrefab: any, persistNodePrefab: any) {
        this.initGameConfig();
        GameConfig.instance.ScenePrefabs[GameConfig.instance.SceneName.Game1] = gameNormalPrefab;
        GameConfig.instance.ScenePrefabs[GameConfig.instance.SceneName.Lobby] = lobbyPrefab;
        this.persistNodePrefab = persistNodePrefab;
        this.isLoadByPrefab = true;
    }
}
