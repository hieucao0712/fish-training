import { v3 } from 'cc';
import gfBaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';

export default class Config2024 extends gfBaseConfig {
    public static instance: Config2024 = null;
    BOSS_PREFAB_NAME = {
        DRAGON: 'Dragon2024',
    };

    SOUND_BACKGROUND_CONFIG_2024 = {
        GODZILLA: "GODZILLA",
    };

    constructor() {
        super();
        Config2024.instance = this;
        this.GameId = '1990';
        this.GameVersion = '0.0.2';
        this.IPMasterName = 'IPMaster7';
        this.RoomVersion = '10';
        this.RoomKind.VIP = '3';
        this.SceneName.Lobby = 'ktfLobby2024';
        this.SceneName.Game1 = 'ktfGame2024';
        this.SceneName.Game3 = 'ktfDragon2024';

        // this.NOTIFY_JACKPOT.array_type_notify_jackpot = [];
        this.NOTIFY_MESSAGE.position = {
            [this.SceneName.Lobby]: v3(0, 320),
            [this.SceneName.Game1]: v3(0, 320),
            [this.SceneName.Game3]: v3(0, 320),
        };

        this.SOUND_SLIDER = true;

        this.FISH_KIND = {
            LASER_CRAB: 27,
            KING_LOBSTER: 34,
            LANTERN: 36,
            BOMB: 43,
            BOMB_M: 44,
            DRILL: 46,
            DRILL_M: 47,
            FIRE_STORM: 49,
            KING_CRAB: 50,
            DRAGON: 45,
        };
    }

    destroy() {
        super.destroy();
        Config2024.instance = null;
    }
}
