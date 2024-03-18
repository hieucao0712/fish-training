
import gfDataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataStore2024')
export default class DataStore2024 extends gfDataStore {
    public static instance: DataStore2024 = null;
    constructor () {
        super();
        DataStore2024.instance = this;

    }
}
