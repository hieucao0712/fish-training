import { v3 } from 'cc';
import gfBaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';

export default class Config2024 extends gfBaseConfig {
    public static instance: Config2024 = null;
    BOSS_PREFAB_NAME = {
        DRAGON : 'Dragon2024',
    };

    constructor() {
        super();
        Config2024.instance = this;
        this.GameId = '2024';
        this.GameVersion = '0.0.1';
        this.IPMasterName = 'IPMaster2';
        this.RoomVersion = '10';
        this.RoomKind.VIP = '3';
        this.SceneName.Lobby = 'ktfLobby2024';
        this.SceneName.Game1 = 'ktfGame2024';
        this.SceneName.Game2 = 'ktfDragon2024'
        this.ClientType = "1";
        this.LoadGameByPrefab = true;
        this.IsNewLogin = false;


        this.NOTIFY_JACKPOT.array_type_notify_jackpot = [];
        this.NOTIFY_MESSAGE.position = {
            [this.SceneName.Game1]: v3(0, 320),
            [this.SceneName.Game2]: v3(0, 320),
            [this.SceneName.Lobby]: v3(0, 320),
        };

        this.SOUND_SLIDER = true;
    }

    destroy() {
        super.destroy();
        Config2024.instance = null;
    }
}
