
import gfBaseEvents from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import { mergeTwoObject } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';

let EventsCode2024 = {
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
    }
};

EventsCode2024 = mergeTwoObject(gfBaseEvents, EventsCode2024);
export default EventsCode2024;
