import { Vec3 } from "cc";

export default class gfBaseConfig {
    public static instance: gfBaseConfig = null;

    IPMasterName = "IPMasterBase";
    IPMaster = "";
    IPGame = "";
    token4Game = "";
    userToken = "";
    token4Master = "";
    RoomVersion = "11";
    ProductVersion = "";
    ProdVersion = "1";
    ClientType = "1";
    GameId = '1900';
    IsDevMode = false;
    IsNewLogin = false;
    RoomKind = {
        Normal: "1",
        VIP: "2",
    };
    GameVersion = "0.5.7";
    MiniBossSceneKind = 1;
    SceneName = {
        Lobby: 'ktfLobby1900',
        Game1: 'ktfGame1900_1',
        Game2: 'ktfGame1900_2',
    }
    LoadingSceneName = 'ktfLoading1900';

    LOCAL_STORE = {
        LOCAL_LOGIN_VAR: "ktfllv",
        NOT_SHOW_NT: "NSNT",
        MUSIC_VOLUME: "music_volume",
        EFFECT_VOLUME: "effect_volume",
        SHOW_EVENT_INFO: "SEIF"
    };
    MaxBullet = 20;
    BotState = {
        INITIALIZED: 1,
        STARTED: 2,
        STOPPED: 3,
    };
    AppSize = {
        Width: 1280,
        Height: 720,
        MaxWidth: 1604,
    };
    realSize = {
        Width: 1280,
        Height: 720,
    };
    SceneBox = {
        Left: 0,
        Bottom: 0,
        Right: 1280,
        Top: 720,
    };
    BulletSpeed = 938; // 2D speed

    gunRadius = 92;

    SKILL_ITEM = {
    };

    POPUP_TYPE = {
        Info: 'PopupInfo',
        Message: 'PopupNotify',
        Tutorial: 'PopupTutorial',
        Setting: 'PopupSetting',
        Chat: 'PopupChatMsg',
        Jackpot: 'PopupHistoryJackpot',
    };
    POPUP_ANIMATION = {
        PULSE: 'PULSE',
        BOUNCE: 'BOUNCE',
        EASE: 'EASE',
        FADE: 'FADE',
        DEFAULT: 'DEFAULT',
    };
    POPUP_PROMPT = {
        JUST_CONFIRM_BUTTON: 'JUST_CONFIRM_BUTTON',
        CONFIRM_AND_CLOSE_BUTTON: 'CONFIRM_AND_CLOSE_BUTTON',
        CONFIRM_AND_REJECT_BUTTON: 'CONFIRM_AND_REJECT_BUTTON',
        NONE_BUTTON: 'NONE_BUTTON',
    };

    CursorBase64 = "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ABv/uwAD/7oAAP+6AAD/ugAA/7oAAP+6AAD/tQAh/70ahv/tw///xEHD/8Mwc/+2ABj/ugAB/7sAAf+sACT/2HjF///////mr/H/qgCI/7IAL/+8AA3/ugAA/7oAAP+6AAD/ugAA/7sACP+wADP/z2Wz////////////3Y/S/7EASf+6AA7/ugAA/7oAAP+6AAD/ugAA/7wADf+wADT/sQCY//LQ/P//////2H7F/6sAJP+7AAL/uwAB/60ANP/RZsT////////////77f//xT+H/7EAD/+6AAD/ugAA/7oAAP+6AAD/tgAJ/7YEZ//++v//////////////////wjKM/7EAEP+7AAD/ugAA/7oAAP+6AAD/sgAP/8U+h//57P/////////////QZMT/rQA0/7sAAf+7AAL/rAAy/9Jqxf///////////+rB6P/BNXj/tAAQ/7oAAP+6AAD/ugAA/7oAAP+3AAn/tARd//jo//////////////////++KID/sgAQ/7sAAP+6AAD/ugAA/7oAAP+0ABD/wTR4/+i66P///////////9Joxf+tADL/uwAB/7sAAv+tACH/1W69//7+///io+z/pAB2/7MAJv+8AAn/ugAA/7oAAP+6AAD/ugAA/7sABv+xACr/wziW//LV+f/45v//0GW0/7AAO/+7AAz/ugAA/7oAAP+6AAD/ugAA/7wACv+xACr/qwCK/+7J/P/57f//13W9/60AIP+7AAL/ugAA/7kAFv+3EV7/yEbB/+/G+v+1AGz/uQAW/7oAAP+6AAD/ugAA/7oAAP+6AAD/ugAA/7wAEf+xACr/tQBg/7gHaf+wADT/ugAV/7sAAf+6AAD/ugAA/7oAAP+6AAD/uwAA/7QAHv/EL43/7sb//7gbqf+9GFz/uQAV/7oAAP+6AAD/vAAE/7QAGP+wAGb/9uL//8pIm/+wAB3/uwAA/7oAAP+6AAD/ugAA/7oAAP+6AAD/ugAA/7sABv+3AAr/tgAK/7oACP+6AAD/ugAA/7oAAP+6AAD/ugAA/7oAAP+8AAT/qwAp/9yMxf/swu//pwBH/7YAEf+8AAT/ugAA/7oAAP+6AAD/vAAE/6sALP/indX/6rvo/6gAPP+8AA3/ugAA/7oAAP+6AAD/ugAA/7oAAP+6AAD/ugAA/7oAAP+6AAD/ugAA/7oAAP+6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";  

    FISH_KIND = {
        LASER_CRAB: 27,
        KING_LOBSTER: 34,
        LANTERN: 36,
        BOMB: 43,
        BOMB_M: 44,
        DRILL: 46,
        DRILL_M: 47,
        FIRE_STORM: 49,
        KING_CRAB: 50,
    };

    PRIORITY_FISH = [
    ];

    NOTIFY_TYPE = {
        SYSTEM: 0,
        JACKPOT: 1,
        MESSAGE_BIG_FISH: 2,
        MESSAGE_SPECIAL_SKILL: 3,
        MESSAGE_DRAGON_BALL: 4,
        MESSAGE_KILL_MINIBOSS: 5,
        MESSAGE_DROP_ITEM_MINIBOSS: 6,
        MESSAGE_EVENT: 7,
    };
    NOTIFY_CONFIG = {
        [this.NOTIFY_TYPE.JACKPOT] : { userName: 0, goldReward: 1 },
        [this.NOTIFY_TYPE.MESSAGE_BIG_FISH] : { userName: 0, fishKind: 1, multiple: 3, goldReward: 2},
        [this.NOTIFY_TYPE.MESSAGE_SPECIAL_SKILL] : { userName: 0, subID: 1, goldReward: 2 },
        [this.NOTIFY_TYPE.MESSAGE_DRAGON_BALL]: { userName: 0, countBall: 1, goldReward: 2 },
        [this.NOTIFY_TYPE.MESSAGE_KILL_MINIBOSS]: { userName: 0, fishKind: 1, goldReward: 3, itemID: 2, multiple: 4 },
        [this.NOTIFY_TYPE.MESSAGE_DROP_ITEM_MINIBOSS]: { userName: 0, fishKind: 1, itemID: 2, goldReward: 3, multiple: 4 },
        [this.NOTIFY_TYPE.MESSAGE_EVENT] : { userName: 0, goldReward: 1},
    };
    Z_INDEX = {
        NOTIFY: 2000,
        MENU: 2099,
        POPUP: 2100,
        WAITING: 2200,
        COIN: 98,
        COIN_LABEL: 99,
        WHEEL: 100,
        BULLET: 999,
        NETFX_ICE: 91,
        NETFX: 93,
        CUT_SCENE: 1900
    };

    EXCEPTION_SOUNDS = ['sfxClick'];

    public NOTIFY_MESSAGE = {
        position: {
            [this.SceneName.Game1]: new Vec3(0, 240, 1),
            [this.SceneName.Game2]: new Vec3(0, 240, 1),
            [this.SceneName.Lobby]: new Vec3(0, 240, 1),
        },
        limited_stack_size: 10,
    };
    NOTIFY_JACKPOT = {
        array_type_notify_jackpot: [this.NOTIFY_TYPE.JACKPOT, this.NOTIFY_TYPE.MESSAGE_EVENT],
        limited_stack_size: 10,
    };

    SOUND_BACKGROUND_CONFIG = {
        LOBBY: "LOBBY",
        IN_GAME: "IN_GAME",
        FISH_GROUP: "FISH_GROUP"
    };
    DEFAULT_AVATAR = "Avatar0";
    COIN_TYPE = {
        MY_COIN: 0,
        OTHER_COIN: 1
    };
    NOTIFY_ENVIRONMENT_CONFIG = {
        ALL: 0,
        IFRAME: 1, 
        APP: 2,
    };

    ENVIRONMENT_CONFIG = {
        WEB_APP: 1,
        IFRAME: 2,
        NATIVE_APP: 3,
    };

    SHAKE_SCREEN_STYLE = {
        HORIZONTAL: 0, 
        VERTICAL: 1, 
        CROSS_1: 2, //theo hình dấu cộng
        CROSS_2: 3, //theo hình dấu nhân
        FULL: 4, //kết hợp cả 2 loại style CROSS
    };

    BIG_WIN_RATIO = {
        BIG_WIN: 80,
        MEGA_WIN: 180,
        SUPER_WIN: 301
    };
    waiting_timeout_network = 15;
    waiting_timeout_load_scene = 5;
    SOUND_SLIDER = false;
    POS_WIFI_STATUS = {
        LEFT: new Vec3(-476, -253, 1),
        RIGHT: new Vec3(445, -255, 1),
    };

    POS_EVENT = {
        LEFT: new Vec3(-565, -100, 1),
        RIGHT: new Vec3(565, -100, 1),
    };

    BOSS_PREFAB_NAME = {DRAGON : 'gfDragon'};
    TURN_ON_WIFI_STATUS = false;
    LoadGameByPrefab = false;
    BundleName  = 'bundle1900';
    ScenePrefabs = {};
    MainGameNode = null;

    LOAD_DYNAMIC_ASSET = false;

  
    BOSS_CONFIG = {
    };

    readonly LIST_SPECIAL_FISH_KIND: number[] = [27, 32, 33, 43, 44, 46, 47, 49, 50];

    SKILL_TYPE = {
        ONE_SHOT_GUN: "ONE_SHOT_GUN",
        RIFLE_GUN : "RIFLE_GUN",
        SPECIAL_FISH: "SPECIAL_FISH"
    };
    SKILL_CONFIG = {
        ONE_SHOT_GUN: {
            SkillID: 1,
            Type: this.SKILL_TYPE.ONE_SHOT_GUN,
            TIME_OUT: 30,
        },
        RIFLE_GUN: {
            SkillID: 2,
            Type: this.SKILL_TYPE.RIFLE_GUN
        },
        FISH_BOOM: {
            SkillID: 5,
            Type: this.SKILL_TYPE.SPECIAL_FISH
        }
    }

    PRIORITY_GUN_SKILL = [
        this.SKILL_CONFIG.ONE_SHOT_GUN.SkillID,
        this.SKILL_CONFIG.RIFLE_GUN.SkillID
    ];

    FISH_LOG_CONFIG = {
        FISH_GROUP: "Fish group appear"
    }

    constructor() {
        gfBaseConfig.instance = this;
    }

    parseJoinGame(data) {
        this.IPGame = data.Server;
        this.token4Game = data.Token;
    }

    destroy() {
        gfBaseConfig.instance = null;
    }

    public IsSpecialFish(fishKind:number): boolean {
        return this.LIST_SPECIAL_FISH_KIND.indexOf(fishKind) != -1;
    }

    public IsCrab (fishKind:number): boolean {
        return fishKind == this.FISH_KIND.BOMB
            || fishKind == this.FISH_KIND.BOMB_M
            || fishKind == this.FISH_KIND.LASER_CRAB
            || fishKind == this.FISH_KIND.DRILL
            || fishKind == this.FISH_KIND.DRILL_M;
    }
}
gfBaseConfig.instance = null;