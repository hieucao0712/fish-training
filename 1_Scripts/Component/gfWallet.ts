const DEBUG_WALLET = false;
import { _decorator, Component, Label, warn, error } from 'cc';
import { formatCoin } from '../Utilities/gfUtilities';
const INCREASING_TIME = 0.3;
const { ccclass, property } = _decorator;
const logError = DEBUG_WALLET ? error : warn;
@ccclass('gfWallet')
export class gfWallet extends Component {
    @property(Label)
    private displayLabel: Label = null;

    private _displayAmount = 0;
    private _rewardAmount = 0;
    private _targetAmount = 0;
    private _totalAmount = 0;
    private incSpeed = 0;

    forceUpdateWallet(amount) {
        this._displayAmount = amount;
        this._targetAmount = amount;
        this._rewardAmount = 0;
        this.incSpeed = 0;
        this._totalAmount = amount;
        this.updateDisplay();
    }

    updateWallet(amount) {
        this._targetAmount = amount - this._rewardAmount;
        if (this._displayAmount > this._targetAmount) {
            this._displayAmount = this._targetAmount;
        } else {
            this.incSpeed = (this._targetAmount - this._displayAmount) / INCREASING_TIME;
        }
        this._totalAmount = amount;
        this.updateDisplay();
    }

    addToDisplay(amount) {
        if(amount > this._rewardAmount) {
            logError("Reward Wallet Amount is negative! [" + amount + "]");
        }
        this._rewardAmount -= amount;
        this._targetAmount += amount;
        if(this._targetAmount > this._totalAmount) {
            this._targetAmount = this._totalAmount;
        }
        this.incSpeed = (this._targetAmount - this._displayAmount) / INCREASING_TIME;
        DEBUG_WALLET && warn('- addToDisplay   -' + formatCoin(amount) + " \t= " + formatCoin(this._rewardAmount));
    }

    addGoldReward(reward) {
        this._rewardAmount += reward;
        DEBUG_WALLET && warn('+ addGoldReward  +' + formatCoin(reward) + " \t= " + formatCoin(this._rewardAmount));
    }

    update(dt) {
        if (this._displayAmount == this._targetAmount) return;
        this._displayAmount += this.incSpeed * dt;
        if (this._displayAmount > this._targetAmount) {
            this._displayAmount = this._targetAmount;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayLabel.string = formatCoin(this._displayAmount);
    }

    getDisplayWallet(){
        return this._targetAmount;
    }

    getRealWallet(){
        return this._totalAmount;
    }

    resetOnExit() {
        this.displayLabel.string = '';
    }
}