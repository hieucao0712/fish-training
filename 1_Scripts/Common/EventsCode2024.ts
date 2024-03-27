
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import { mergeTwoObject } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';

let EventsCode2024 = {
    EFFECT_LAYER: {
        SHOW_POPUP_WIN_JACKPOT      :       "SHOW_POPUP_WIN_JACKPOT"
    },
    SOUND:{
        ACTIVE_FREEZE               : "ACTIVE_FREEZE",
        ADD_ITEM                    : "ADD_ITEM",
        EVENT_BUTTON_CLICK          : "EVENT_BUTTON_CLICK",
        EVENT_NOTICE                : "EVENT_NOTICE",
        EVENT_DROP_ITEM             : "EVENT_DROP_ITEM",
        EVENT_BIG_WIN               : "EVENT_BIG_WIN",
        RESUME_BACKGROUND_SOUND_EVENT:"RESUME_BACKGROUND_SOUND_EVENT",
        EVENT_UNLOCK_MEDAL          : "EVENT_UNLOCK_MEDAL",
        EVENT_EXCHANGE_REWARD       : "EVENT_EXCHANGE_REWARD",
        EVENT_PROGRESS_BAR          : "EVENT_PROGRESS_BAR",
        JACKPOT_HIT                 : "JACKPOT_HIT",
        SIDE_NOTIFY_EVENT           : "SIDE_NOTIFY_EVENT",

        PLAY_SOUND_BACKGROUND: "PLAY_SOUND_BACKGROUND",
        GODZILLA_IN                 :       "GODZILLA_IN",
        GODZILLA_OUT                :       "GODZILLA_OUT",
        GODZILLA_PLASMA             :       "GODZILLA_PLASMA_SOUND",

        DRAGON_DIE: "DRAGON_DIE",
    },

    EVENT:{
        SEND_GET_BAG                : "SEND_GET_BAG",
        SEND_EXCHANGE_REWARD        : "SEND_EXCHANGE_REWARD",
        ON_GET_BAG                  : "ON_GET_BAG",
        ON_EXCHANGE_REWARD          : "ON_EXCHANGE_REWARD",
        UPDATE_PROGRESS_BAR         : "UPDATE_PROGRESS_BAR",
        ON_SHOW_TAB_REWARD          : "ON_SHOW_TAB_REWARD",
        UPDATE_EVENT_DATA           : "UPDATE_EVENT_DATA",
        UPDATE_LIST_ITEM_EVENT      : "UPDATE_LIST_ITEM_EVENT",
        ON_DROP_NEW_MEDAL           : "ON_DROP_NEW_MEDAL",
        SHOW_INTRO_EVENT            : "SHOW_INTRO_EVENT"
    },

    LIGHTING_CHAIN :{
        START_EFFECT                : "START_EFFECT",
        START_EFFECT_ONE_FOR_ALL    : "START_EFFECT_ONE_FOR_ALL",
        END_EFFECT                  : "END_EFFECT",
        EFFECT_DIE                  : "EFFECT_DIE"
    },
    DRAGON: {
        DROP_BALL: "GAME_DRAGON_DROP_BALL",
        SMALL_EXPLOSION: "DRAGON_DIE_SMALL_EXPLOSION",
    },
    GODZILLA: {
        WARNING                     :       "WARNING",
        ON_HIT_GODZILLA             :       "ON_HIT_GODZILLA",
        GODZILLA_DROP_CRYSTAL       :       "GODZILLA_DROP_CRYSTAL",
        GODZILLA_PLASMA_EFFECT      :       "GODZILLA_PLASMA_EFFECT",
        STATE_GODZILLA              :       "STATE_GODZILLA",
        GODZILLA_SCREAM             :       "GODZILLA_SCREAM"
    },

    FISH_LAYER: {
        CATCH_FISH_BY_SKILL: "FISH_LAYER_CATCH_FISH_BY_SKILL",
        BOSS_ON_GAME: "FISH_LAYER_BOSS_ON_GAME",
    },

    GAME_LAYER: {
        REMOVE_FISH: "REMOVE_FISH",
        CATCH_FISH_BY_LIGHTING: "CATCH_FISH_BY_LIGHTING",
    }
};

EventsCode2024 = mergeTwoObject(gfBaseEvents, EventsCode2024);
export default EventsCode2024;
