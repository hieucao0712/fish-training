
import gfReferenceManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager';
import { _decorator } from 'cc';
const { ccclass } = _decorator;

@ccclass('ReferenceManager2024')
export default class ReferenceManager2024 extends gfReferenceManager {
    public static instance: ReferenceManager2024 = null;
  
    constructor () {
        super();
        ReferenceManager2024.instance = this;
     
    }
    destroy(){
        ReferenceManager2024.instance = null;
    }
}
