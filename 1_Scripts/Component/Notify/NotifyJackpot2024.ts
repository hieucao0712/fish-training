import { _decorator, tween, Layout } from 'cc';
import GameConfig from '../../Config/Config2024';
import Localize from '../../../../../cc-common/cc30-fishbase/Scripts/Common/gfLocalize';
import {deepCopy, formatString , formatUserName} from '../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
import { fadeOut, gfFadeInAll, stopAllActions, gfSetOpacityAll } from "../../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfActionHelper";
import { GfNotifyJackpot } from '../../../../../cc-common/cc30-fishbase/Scripts/Components/gfNotifyJackpot';
const { ccclass } = _decorator;

@ccclass('NotifyJackpot2024')
export class NotifyJackpot2024 extends GfNotifyJackpot {
    play(dataInput) {
        const {data, type} = dataInput;
        this.node.active = true;
        stopAllActions(this.node);
        gfSetOpacityAll(this.node, 255)
        stopAllActions(this.contentNode);
        gfSetOpacityAll(this.contentNode, 0);
        this.setupSpineAnim(type);

        const { NOTIFY_CONFIG, NOTIFY_TYPE } = GameConfig.instance;
        let str = deepCopy(Localize.instance.txtJPNotify);
        const jackpotConfig = NOTIFY_CONFIG[NOTIFY_TYPE.JACKPOT];
        str = formatString(str, [formatUserName(data[jackpotConfig.userName]), data[jackpotConfig.goldReward]]);
        str = str.replace(/'/g, '"');
        const objMessage = JSON.parse(str);
        this.createNotifyMessage(objMessage);

        this.contentNode.getComponent(Layout).updateLayout();
        this.playAnimation();
    };

    playAnimation() {
        const tweenShowRichText = tween(this.contentNode).then(gfFadeInAll(0.15));
        this.mainAnim.setAnimation(0, 'animation', false);

        tween(this.node)
            .call(() => {
                gfSetOpacityAll(this.contentNode, 0);
            })
            .delay(0.8)
            .call(() => {
                tweenShowRichText.start();
            })
            .delay(3)
            .then(fadeOut(0.5))
            .call(() => {
                this.onStackMessage();
            })
            .start();
    }
}

