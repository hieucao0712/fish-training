
import gfDataStore from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore';
import { _decorator, Component, Node } from 'cc';
import { gfWallet } from '../../../../cc-common/cc30-fishbase/Scripts/Components/gfWallet';
const { ccclass, property } = _decorator;

@ccclass('DataStore2024')
export default class DataStore2024 extends gfDataStore {
    public static instance: DataStore2024 = null;
    private lobbyWallet: gfWallet = null;
    constructor () {
        super();
        DataStore2024.instance = this;
    }

    setLobbyWallet(wallet){
        this.lobbyWallet = wallet;
    }

    getLobbyWallet(){
        return this.lobbyWallet;
    }
}
