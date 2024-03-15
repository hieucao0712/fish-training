import gfBaseConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';

export default class Config2024 extends gfBaseConfig {
    public static instance: Config2024 = null;

    constructor() {
        super();
        Config2024.instance = this;
        this.GameId = '2024';
        this.GameVersion = '0.0.1';
        this.IPMasterName = 'IPMaster2'
        this.RoomVersion = '10';
        this.SceneName.Lobby = 'ktfLobby2024';
        this.SceneName.Game1 = 'ktfGame2024';
    }

    destroy() {
        super.destroy();
        Config2024.instance = null;
    }
}
