// Contain Events communicate between components
const gfBaseEvents = {
    COMMON: {
        UPDATE_PING: "UPDATE_PING",
        SHOW_WAITING: "SHOW_WAITING",
        HIDE_WAITING: "HIDE_WAITING",
        UPDATE_WAITING_PERCENT: "UPDATE_WAITING_PERCENT",
        GO_LOBBY: "GO_LOBBY",
        EXIT_GAME_ROOM: "EXIT_GAME_ROOM",
        INIT_SCENE: "COMMON_INIT_SCENE",
        REFRESH_PAGE: "REFRESH_PAGE",
        UPDATE_JACKPOT: "UPDATE_JACKPOT",
        SHOW_NOTIFY: "SHOW_NOTIFY",
        RESET_TOUCH_LISTENER: "RESET_TOUCH_LISTENER",
        RESET_TOUCH_LISTENER_NO_MONEY: "RESET_TOUCH_LISTENER_NO_MONEY",
        REMOVE_TOUCH_LISTENER: "REMOVE_TOUCH_LISTENER",
        GAME_SHOW: "GAME_SHOW",
        GAME_HIDE: "GAME_HIDE",
        SHAKE_SCREEN: "SHAKE_SCREEN",
        ON_SHOW_GAME_LAYER: "ON_SHOW_GAME_LAYER",
        SCENE_LOAD_DONE: "SCENE_LOAD_DONE",
        SEND_EXIT_GAME_SERVER: "SEND_EXIT_GAME_SERVER",
        CONNECT_MASTER: "CONNECT_MASTER",
        CONNECT_GAME: "CONNECT_GAME",
        REMOVE_PERSIST_NODE: "REMOVE_PERSIST_NODE",
        ON_SCREEN_RESIZE: "ON_SCREEN_RESIZE",
        FISH_LOG: "FISH_LOG",
        EXIT_GAME: "EXIT_GAME",
        LOADING_TRANSITION: "LOADING_TRANSITION",
        NETWORK_STATUS_INFO: "NETWORK_STATUS_INFO",
        BEFORE_LOAD_SCENE: "BEFORE_LOAD_SCENE",
        SET_REFERENCE_DATA: "SET_REFERENCE_DATA",
        AFTER_LOAD_SCENE_GAME: "AFTER_LOAD_SCENE_GAME",
        PAUSE_AUTO_FIRE : "PAUSE_AUTO_FIRE"
    },
    POPUP: {
        CLOSE_ALL: "CLOSE_ALL",
        UPDATE_BOT_SETTING: "UPDATE_BOT_SETTING",
        GET_BOT_SETTING: "GET_BOT_SETTING",
        SET_BOT_SETTING: "SET_BOT_SETTING",
        SHOW_POPUP_TUTORIAL: "SHOW_POPUP_TUTORIAL",
        SHOW_POPUP_PROMPT: "SHOW_POPUP_PROMPT",
        SHOW_POPUP_HISTORY: "SHOW_POPUP_HISTORY",
        SHOW_POPUP_INFO: "SHOW_POPUP_INFO",
        SHOW_POPUP_SETTING: "SHOW_POPUP_SETTING",
        CHECK_SHOW_POPUP_EVENT: "CHECK_SHOW_POPUP_EVENT",
        SHOW_POPUP_EVENT_INFO: "SHOW_POPUP_EVENT_INFO",
        SHOW_POPUP_AUTOBOT: "SHOW_POPUP_AUTOBOT",
        POPUP_PROMPT: "POPUP_PROMPT",
        POPUP_SETTING: "POPUP_SETTING",
        POPUP_INFO: "POPUP_INFO",
        POPUP_TUTORIAL: "POPUP_TUTORIAL",
        POPUP_JACKPOT_HISTORY: "POPUP_JACKPOT_HISTORY",
        CLOSE_TOP_POPUP: "CLOSE_TOP_POPUP",
        SHOW_POPUP_PROMOTION: "SHOW_POPUP_PROMOTION",
        ON_AFTER_OPEN : "ON_AFTER_OPEN",
        ON_BEFORE_CLOSE : "ON_BEFORE_CLOSE",
        ON_AFTER_CLOSE : "ON_AFTER_CLOSE",
        CLEAR_TIMEOUT_SHOW_POPUP_NETWORK_DIE: "CLEAR_TIMEOUT_SHOW_POPUP_NETWORK_DIE"
    },
    SOUND: {
        SOUND_EFFECT_ENABLE: "SOUND_EFFECT_ENABLE",
        SOUND_BGM_ENABLE: "SOUND_BGM_ENABLE",
        RESUME_SOUND_BACKGROUND: "RESUME_SOUND_BACKGROUND",
        PLAY_SOUND_BACKGROUND: "PLAY_SOUND_BACKGROUND",
        STOP_ALL: "STOP_ALL",
        CLICK: "CLICK",
        GUN_FIRE: "GUN_FIRE",
        EFFECT_GOLD: "EFFECT_GOLD",
        EFFECT_CATCH: "EFFECT_CATCH",
        EFFECT_CATCH_BIGFISH: "EFFECT_CATCH_BIGFISH",
        EFFECT_BOMB: "EFFECT_BOMB",
        BIG_WIN: "BIG_WIN",
        MEGA_WIN: "MEGA_WIN",
        SUPER_WIN: "SUPER_WIN",
        BOSS_BIG_WIN: "BOSS_BIG_WIN",
        FIRE_LASER: "FIRE_LASER",
        RESET_VOLUME: "RESET_VOLUME",
        UPDATE_MUSIC_VOL: "UPDATE_MUSIC_VOL",
        UPDATE_EFFECT_VOL: "UPDATE_EFFECT_VOL",
        STOP_ALL_AUDIO: "STOP_ALL_AUDIO",
        PLAY_EFFECT_JACKPOT_COIN: "PLAY_EFFECT_JACKPOT_COIN",
        STOP_EFFECT_JACKPOT_COIN: "STOP_EFFECT_JACKPOT_COIN",
        MAIN_BGM: "MAIN_BGM",
        LOBBY_BGM: "LOBBY_BGM",
        CLICK_BET: "CLICK_BET",
        EVENT_JOIN_GAME: "EVENT_JOIN_GAME",
        EFFECT_GET_ITEM_LASER : "EFFECT_GET_ITEM_LASER",
        PAUSE_OR_RESUME_SOUND_WIN: "PAUSE_OR_RESUME_SOUND_WIN",
        STOP_BIG_WIN: "STOP_SOUND_BIG_WIN",
        PLAY_SOUND_BY_NAME : "PLAY_SOUND_BY_NAME",
        PLAY_MUSIC_BY_NAME : "PLAY_MUSIC_BY_NAME",
        STOP_SOUND : "STOP_SOUND",
        STOP_ALL_EFFECT : "STOP_ALL_EFFECT",
    },
    GAME_LAYER: {
        UPDATE_TABLE_ID: "UPDATE_TABLE_ID",
        ON_ENTER_GAME_ROOM: "GAME_LAYER_ON_ENTER_GAME_ROOM",
        ON_PLAYER_FIRE: "ON_PLAYER_FIRE",
        CREATE_ONE_FISH : "CREATE_ONE_FISH",
        CREATE_FISH: "GAME_LAYER_CREATE_FISH",
        CREATE_FISH_GROUP: "GAME_LAYER_CREATE_FISH_GROUP",
        RESUME_FISH_GROUP: "GAME_LAYER_RESUME_FISH_GROUP",
        BULLET_COLLIDE_FISH: "GAME_LAYER_BULLET_COLLIDE_FISH",
        SEND_GUN_FIRE: "SEND_GUN_FIRE",
        SEND_FIRE_DRILL: "SEND_FIRE_DRILL",
        CREATE_BULLET: "GAME_LAYER_CREATE_BULLET",
        CATCH_FISH: "CATCH_FISH",
        CHOOSE_FISH_BY_POINT: "CHOOSE_FISH_BY_POINT",
        ON_SEND_FIRE: "ON_SEND_FIRE",
        REMOVE_FISH: "REMOVE_FISH",
        UPDATE_LOCK_FISH_IMAGE: "UPDATE_LOCK_FISH_IMAGE",
        UPDATE_ROOM_DATA: "GAME_LAYER_UPDATE_ROOM_DATA",
        ON_OTHER_PLAYER_FIRE: "ON_OTHER_PLAYER_FIRE",
        UPDATE_LIST_ITEM: "UPDATE_LIST_ITEM",
        GAME_CHANGE_ROUND: "GAME_CHANGE_ROUND",
        SHOW_JACKPOT_INFO: "SHOW_JACKPOT_INFO",
        INTERACTABLE_HUD: "INTERACTABLE_HUD",
        MOVE_OUT_ALL_FISHES: "MOVE_OUT_ALL_FISHES",
        OFF_ALL_TARGET: "OFF_ALL_TARGET",
        GAME_UPDATE_SKILL: "GAME_UPDATE_SKILL",
        INIT_BUBBLE: "INIT_BUBBLE",
        CHANGE_BUBBLE: "CHANGE_BUBBLE",
        RESUME_AUTO_FIRE: "RESUME_AUTO_FIRE",
        RECEIVE_LASER_GUN: "RECEIVE_LASER_GUN",
        RESUME_DRILL_GUN: "RESUME_DRILL_GUN",
        BLOCK_ALL_BUTTON_WHEN_REFRESH: "BLOCK_ALL_BUTTON_WHEN_REFRESH",
        ON_AFTER_INIT_PLAYER_LIST: "ON_AFTER_INIT_PLAYER_LIST",
        RESUME_OLD_TARGET: "RESUME_OLD_TARGET",
        UPDATE_JACKPOT_INFO: "GAME_LAYER_UPDATE_JACKPOT_INFO",
        ON_PLAY_NETFX: "ON_PLAY_NETFX",
        UPDATE_EVENT_TRAY: "UPDATE_EVENT_TRAY",
        INTERACTABLE_FREEZE_SKILL: "INTERACTABLE_FREEZE_SKILL",
        PROCESS_ITEM_SKILLS : "PROCESS_ITEM_SKILLS",
        CREATE_ONE_BULLET : "CREATE_ONE_BULLET",
        STOP_HUD_TOGGLE_TARGET: 'STOP_HUD_TOGGLE_TARGET',
        REMOVE_EXTRA_EFFECT_ON_FISH: "REMOVE_EXTRA_EFFECT_ON_FISH",
        PLAYER_CHANGE_GUN: "PLAYER_CHANGE_GUN",
    },
    FISH_LAYER: {
        BOSS_ON_GAME: "FISH_LAYER_BOSS_ON_GAME",
        SET_DIE_LIST_FISH: "SET_DIE_LIST_FISH",
        CATCH_LIST_FISH: "CATCH_LIST_FISH",
        REMOVE_BOSS: 'REMOVE_BOSS',
        CATCH_LIST_FISH_BY_SPECIAL_FISH: "CATCH_LIST_FISH_BY_SPECIAL_FISH",
    },
    LOBBY_LAYER: {
        ON_SHOW_LOBBY_LAYER: "ON_SHOW_LOBBY_LAYER",
        UPDATE_LOBBY_INFO: "UPDATE_LOBBY_INFO",
        UPDATE_LOBBY_WALLET: "UPDATE_LOBBY_WALLET",
        LOBBY_GET_ROOM_INFO: "LOBBY_GET_ROOM_INFO",
        LOBBY_UPDATE_VIP_LEVEL: "LOBBY_UPDATE_VIP_LEVEL",
        UPDATE_LOBBY_ON_SHOW : "UPDATE_LOBBY_ON_SHOW",
    },
    PLAYER_LAYER: {
        UPDATE_LIST_PLAYER: "UPDATE_LIST_PLAYER",
        PLAYER_JOIN_BOARD: "PLAYER_JOIN_BOARD",
        PLAYER_LEAVE_BOARD: "PLAYER_LEAVE_BOARD",
        STOP_LOCK_FISH: "STOP_LOCK_FISH",
        CHANGE_LOCK_FISH: "CHANGE_LOCK_FISH",
        START_LOCK_FISH: "START_LOCK_FISH",
        CHANGE_GUN_LASER: "CHANGE_GUN_LASER",
        GAME_UPDATE_WALLET: "GAME_UPDATE_WALLET",
        HIDE_IS_ME: "HIDE_IS_ME",
        SHOW_POPUP_NO_MONEY: "PLAYER_SHOW_POPUP_NO_MONEY",
        PLAYER_UPDATE_VIP_LEVEL : "PLAYER_UPDATE_VIP_LEVEL",
    },

    EVENT_TRAY_LAYER: {
        RESET_EVENT_TRAY: "RESET_EVENT_TRAY",
    },

    EFFECT_LAYER: {
        REMOVE_EVENT_EFFECT_PLAYER: "REMOVE_EVENT_EFFECT_PLAYER",
        ON_PLAY_NETFX: "ON_PLAY_NETFX",
        PLAY_BIG_WIN_EFFECT: "PLAY_BIG_WIN_EFFECT",
        PLAY_WAVE_TRANSITION: "PLAY_WAVE_TRANSITION",
        SHOW_NOTIFY_LOCK_FISH: "SHOW_NOTIFY_LOCK_FISH",
        HIDE_NOTIFY_LOCK_FISH: "HIDE_NOTIFY_LOCK_FISH",
        LUCKY_EFFECT_FISH: "LUCKY_EFFECT_FISH",
        PLAY_REWARD_EFFECT: "PLAY_REWARD_EFFECT",
        PLAY_LUCKY_EFFECT_DONE: "PLAY_LUCKY_EFFECT_DONE",
        PLAY_FISH_GROUP_TRANSITION: "PLAY_FISH_GROUP_TRANSITION",
        CHANGE_BUBBLE: "CHANGE_BUBBLE",
        DROP_GUN_LASER: "DROP_GUN_LASER",
        TRIGGER_BOMB: "TRIGGER_BOMB",
        ADD_ANIM_TO_QUEUE_ANIM:  "EFFECT_LAYER_ADD_ANIM_TO_QUEUE_ANIM",
        CHECK_QUEUE_ANIM: "EFFECT_LAYER_CHECK_QUEUE_ANIM",
        PLAY_EFFECT_EVENT_WIN: "PLAY_EFFECT_EVENT_WIN",
        PLAY_OTHER_USER_BIG_WIN_WHEEL_BOSS: "PLAY_OTHER_USER_BIG_WIN_WHEEL_BOSS",
        CREATE_ONE_NETFX : "CREATE_ONE_NETFX",
        PLAY_EFFECT_SPECIAL_FISH: "PLAY_EFFECT_SPECIAL_FISH",
        PLAY_EFFECT_CATCH_LIST_FISH: "PLAY_EFFECT_CATCH_LIST_FISH",
        PLAY_BOSS_JACKPOT : "PLAY_BOSS_JACKPOT"
    },
    WALLET: {
        ADD_TO_DISPLAY: "WALLET_ADD_TO_DISPLAY",
        ADD_GOLD_REWARD: "WALLET_ADD_GOLD_REWARD",
    },

    CUT_SCENE: {
        SHOW_CUT_SCENE: "SHOW_CUT_SCENE",
        HIDE_CUT_SCENE: "HIDE_CUT_SCENE",
        HIDE_ALL_CUT_SCENE: "HIDE_ALL_CUT_SCENE",
    },

    EVENT: {
        UPDATE_EVENT_STATUS: "UPDATE_EVENT_STATUS",
        EVENT_COMING: "EVENT_COMING",
        EVENT_PLAYING: "EVENT_PLAYING",
        EVENT_END: "EVENT_END",
        EVENT_IDLE: "EVENT_IDLE",
        SEND_GET_EVENT_INFO: "SEND_GET_EVENT_INFO"
    },

    PERSIST_ROOM: {
        ADD_GAME_LAYER_TO_GAME_SCENE: "ADD_GAME_LAYER_TO_GAME_SCENE",
        ADD_JACKPOT_INFO_TO_GAME_LAYER: "ADD_JACKPOT_INFO_TO_GAME_LAYER",
        ON_PRELOAD_SCENE: "ON_PRELOAD_SCENE",
        ON_AFTER_PRELOAD_SCENE: "ON_AFTER_PRELOAD_SCENE",
        ADD_EXTRA_SOUND: "ADD_EXTRA_SOUND",
        REMOVE_EXTRA_SOUND: "REMOVE_EXTRA_SOUND",
        ON_AFTER_ADD_GAME_LAYER: "ON_AFTER_ADD_GAME_LAYER",
        ADD_SINGLE_EXTRA_SOUND: "ADD_SINGLE_EXTRA_SOUND"
    },


    GUN_SKILL: {
        RECEIVE_SKILL: "RECEIVE_SKILL",
        PLAY_EFFECT_RECEIVE_GUN_SKILL: "PLAY_EFFECT_RECEIVE_GUN_SKILL",
        CLEAR_EFFECT_RECEIVE_GUN_SKILL: "CLEAR_EFFECT_RECEIVE_GUN_SKILL",
        COMPLETED_RECEIVE_GUN_SKILL: "COMPLETED_RECEIVE_GUN_SKILL",
        MY_PLAYER_SEND_FIRE_GUN_SKILL: "MY_PLAYER_SEND_FIRE_GUN_SKILL",
        ON_SEND_FIRE_ONE_SHOT_GUN_SKILL: "ON_SEND_FIRE_ONE_SHOT_GUN_SKILL", 
        PLAYER_FIRE_RIFLE_GUN_SKILL: "PLAYER_FIRE_RIFLE_GUN_SKILL",
        CATCH_FISH_BY_ONE_SHOT_GUN_SKILL: "CATCH_FISH_BY_ONE_SHOT_GUN_SKILL",
        PLAY_EFFECT_RECEIVE_EXTRA_BULLET_RIFLE_GUN: "PLAY_EFFECT_RECEIVE_EXTRA_BULLET_RIFLE_GUN",
        COMPLETED_RECEIVE_EXTRA_BULLET_RIFLE_GUN: "COMPLETED_RECEIVE_EXTRA_BULLET_RIFLE_GUN",
    },
    AUTO_FIRE_CONTROLLER: {
        IDLE_AUTO_FIRE: 'IDLE_AUTO_FIRE',
        LOCK_AUTO_FIRE: "LOCK_AUTO_FIRE",
        CHANGE_AUTO_FIRE_BY_STATE: 'CHANGE_AUTO_FIRE_BY_STATE',
        CHANGE_TARGET: 'CHANGE_TARGET',
        ON_AFTER_CHOOSE_FISH: 'ON_AFTER_CHOOSE_FISH',
        STOP_ALL_TARGET: "STOP_ALL_TARGET",
        GET_LOCK_FISH_BY_KIND: 'GET_LOCK_FISH_BY_KIND',
        ON_START_SCHEDULE_AUTO_FIRE: 'ON_START_SCHEDULE_AUTO_FIRE',
        UPDATE_LOCK_FISH_DATA: 'UPDATE_LOCK_FISH_DATA',
        RESET_LOCK_FISH_TARGET: 'RESET_LOCK_FISH_TARGET',
    },
    BOSS : {
        CATCH_BOSS_BY_ID: "CATCH_BOSS_BY_ID",
        CATCH_BOSS_BY_KIND: "CATCH_BOSS_BY_KIND",
        CREATE_BOSS : "CREATE_BOSS",
        DROP_ITEM   : "BOSS_DROP_ITEM",
        REMOVE_BOSS_BY_ID: "REMOVE_BOSS_BY_ID",
        JACKPOT_WIN_AMOUNT_POPUP_CLOSE: "JACKPOT_WIN_AMOUNT_POPUP_CLOSE"
    },

    HUD_CONTROLLER: {
        SHOW_FX_ACTIVE_TARGET_ONE: 'SHOW_FX_ACTIVE_TARGET_ONE',
        SHOW_FX_ACTIVE_TARGET_ALL: 'SHOW_FX_ACTIVE_TARGET_ALL',
        SHOW_FX_ACTIVE_AUTO_FIRE: 'SHOW_FX_ACTIVE_AUTO_FIRE',
    }
};

export default gfBaseEvents;