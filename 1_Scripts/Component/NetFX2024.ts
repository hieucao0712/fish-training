import { _decorator } from 'cc';
import { gfNetFX } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfNetFX';
const { ccclass } = _decorator;

@ccclass('NetFX2024')
export class NetFX2024 extends gfNetFX {
    playSpineAnim(config: any) {
        this._animationName = config.MyUser ? config.MyUser : this._animationName;
        super.playSpineAnim(config);
    }
}
