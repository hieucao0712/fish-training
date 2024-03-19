import { _decorator , Label} from 'cc';
import { GfBaseCellHistory } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Popup/PopupHistoryJackpot/gfBaseCellHistory';
import { formatTimeStamp } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
const { ccclass, property } = _decorator;

@ccclass('JackpotCellHistory2024')
export class JackpotCellHistory2024 extends GfBaseCellHistory {
    updateData(data) {
        super.updateData(data);
        this.time.getComponent(Label).string = formatTimeStamp(data.time, " #DD#/#MM# #hhhh#:#mm#:#ss#");
    }
}

