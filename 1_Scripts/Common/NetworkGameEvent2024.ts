import { _decorator, Component, Node } from 'cc';
import { mergeTwoObject } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import NetworkGameEvent from '../../../../cc-common/cc30-fishbase/Scripts/Network/gfNetworkGameEvent';

let NetworkGameEvent2024 = {
    GAME_ON_HIT_GODZILLA : 2060,
}
NetworkGameEvent2024 = mergeTwoObject(NetworkGameEvent, NetworkGameEvent2024);
export default  NetworkGameEvent2024;
    


