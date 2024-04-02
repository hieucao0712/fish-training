import { _decorator, Component, instantiate, Node, Prefab, UITransform } from "cc";
import EventCode from "../Common/EventsCode2024";
import Emitter from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter";
import { gfBossEffectLayer } from "../../../../cc-common/cc30-fishbase/Scripts/Components/Boss/gfBossEffectLayer";
import { registerEvent, SetZIndex } from "../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities";
import DragonEvent from "../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonEvent";
import BaseEvents from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents";
import BossController from "../../../../cc-common/cc30-fishbase/Scripts/Components/Boss/gfBossController";
import gfDragonConfig from "../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragonConfig";
import PoolManager from "../Common/PoolManager2024";
import gfBaseConfig from "../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig";
import { IBossWheelData } from '../../../../cc-common/cc30-fishbase/Scripts/Components/Effects/gfWheelController'
import { WheelType } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfCustomDataType';
import gfDataStore from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfDataStore";
import NetworkGameEvent2024 from "../Common/NetworkGameEvent2024";
import { gfGunSkillController } from "../../../../cc-common/cc30-fishbase/Scripts/Components/GunSkill/gfGunSkillController";
import ReferenceManager from "../../../../cc-common/cc30-fishbase/Scripts/Common/gfReferenceManager";
const { ccclass, property } = _decorator;

interface IDataDragon {
    wonJackpot: Object;
    DeskStation: number;
    jackpotAmount: number;
    Result: IResult[];
}

interface IResult {
    DeskStation: number,
    WinAmount: number,
}

@ccclass("DragonEffectLayer2024")
export class DragonEffectLayer2024 extends gfBossEffectLayer {
    @property(Prefab)
    protected dragonDieSmallExplosionPrefab: Prefab = null;
    @property(Prefab)
    protected cutSceneJackpotPrefab: Prefab;
    _endData = null;

    private _bigWinPlaying: number = 0;
    private needUpdateWallet: boolean = false;
    get endData() {
        return this._endData;
    }

    set endData(data) {
        this._endData = data;
    }
    onLoad() {
        super.onLoad();
    }

    initEvents() {
        super.initEvents();
        registerEvent(DragonEvent.DRAGON.WARNING, this.onDragonWaring, this);
        registerEvent(DragonEvent.DRAGON.ON_END, this.onDragonEnd, this);
        registerEvent(DragonEvent.DRAGON.BIG_EXPLOSION, this.onPlayBigExplosion, this);
        registerEvent(DragonEvent.DRAGON.SMALL_EXPLOSION, this.onPlaySmallExplosion, this);
        registerEvent(DragonEvent.DRAGON.SHOW_JACKPOT_WINAMOUNT, this.onJackpotStarDone, this);
        registerEvent(DragonEvent.DRAGON.DONE_PLAYER_BIGWIN, this.onDonePlayerBigWin, this);
        registerEvent(DragonEvent.DRAGON.DONE_JACKPOT_STAR, this.playDragonBallBigWin, this);
        registerEvent(DragonEvent.DRAGON.CREATE, this.onDragonCreated, this);

        registerEvent(BaseEvents.EFFECT_LAYER.PLAY_BOSS_JACKPOT, this.playDragonBallJackpot, this);
        registerEvent(BaseEvents.PLAYER_LAYER.UPDATE_LIST_PLAYER, this.onEnterGameRoom, this);
        registerEvent(BaseEvents.COMMON.EXIT_GAME_ROOM, this.onExitGameRoom, this);
        registerEvent(BaseEvents.BOSS.JACKPOT_WIN_AMOUNT_POPUP_CLOSE, this.updatePlayerWallet, this);
        registerEvent(BaseEvents.GAME_LAYER.PLAYER_CHANGE_GUN, this.playerChangeGun, this);
    }

    protected onEnterGameRoom(data): void {
        this.onRefresh();
    }

    protected onExitGameRoom(): void {
        this.onRefresh();
    }

    private updatePlayerWallet(): void {
        if (this.endData) {
            const player = ReferenceManager.instance.getPlayerByDeskStation(this.endData.DeskStation);
            if (player && player.isMe) {
                player.addToDisplayWallet(this.endData.jackpotAmount);
            }
        }
        this.needUpdateWallet = false;
        this.onFinishState();
    }

    protected onDragonWaring(): void {}

    private onDragonEnd(data: IDataDragon): void {
        this.endData = data;
        
        if (data.wonJackpot) {
            this.endData.jackpotAmount = this.getJackpotWinAmount();
        }
        const dragon = BossController.instance.getBossByKind(gfDragonConfig.instance.bossKind);
        data.wonJackpot ? dragon?.onCatch(data) : dragon?.onDie();

        data.Result?.forEach((result) => {
            const player = ReferenceManager.instance.getPlayerByDeskStation(result.DeskStation);
            if (player.isMe) {
                player.addGoldReward(result.WinAmount);
                if (result.DeskStation === this.endData.DeskStation) {
                    this.needUpdateWallet = true;
                }
            }
        });
        if (data.Result) {
            this.playDragonEndEffect();
        }
    }

    private onPlayBigExplosion(position): void {
        const JPExplosion = PoolManager.instance.createBigExplosion({position: this.node.getComponent(UITransform).convertToNodeSpaceAR(position)});
        SetZIndex(JPExplosion, gfBaseConfig.instance.Z_INDEX.POPUP + 10);
    }

    private onPlaySmallExplosion(listPosition): void {
        const effectLayer = ReferenceManager.instance.getEffectLayer();
        listPosition.forEach((pos, i) => {
            this.scheduleOnce(() => {
                const explosion = instantiate(this.dragonDieSmallExplosionPrefab);
                effectLayer.addChild(explosion);
                explosion.active = true;
                explosion.position = pos;
            }, i * 0.15);
        });
    }

    private onJackpotStarDone(): void {
        const player = ReferenceManager.instance.getPlayerByDeskStation(this.endData.DeskStation);
        if (player.isMe) {
            Emitter.instance.emit(BaseEvents.CUT_SCENE.SHOW_CUT_SCENE, this.cutSceneJackpotPrefab, this.endData);
        }
    }
    protected onDonePlayerBigWin(): void {
        --this._bigWinPlaying;
        this.onFinishState();
    }

    private playDragonBallBigWin(): void {
        this.endData.Result.forEach((result: IResult) => {
            const {DeskStation, WinAmount} = result;
            const player = ReferenceManager.instance.getPlayerByDeskStation(DeskStation);
            if (player.isActive()) {
                if (DeskStation === this.endData.DeskStation) {
                    if (!player.isMe) {
                        this.playWheelDragonBallsJackpot(player, WinAmount);
                    }
                } 
            }
        });
        this.onFinishState();
    }

    private onDragonCreated(): void {

    }

    private playDragonBallJackpot(): void {
        const player = ReferenceManager.instance.getPlayerByDeskStation(this.endData.DeskStation);
        if (player.isActive()) {
            Emitter.instance.emit(DragonEvent.SOUND.COLLECT_BALL);
        } else {
            this.playDragonBallBigWin();
        }
    }

    private playDragonEndEffect(): void {
        if (this.endData.wonJackpot) {
            const player = ReferenceManager.instance.getPlayerByDeskStation(this.endData.DeskStation);
            if (player && player.isMe) {
                Emitter.instance.emit(BaseEvents.EFFECT_LAYER.ADD_ANIM_TO_QUEUE_ANIM, "JACKPOT", this.endData);
            } else {
                this.playDragonBallJackpot();
            }
        } else {
            this.playDragonBallBigWin();
        }
    }

    private onRefresh(): void {
        this.endData = null;
        this.unscheduleAllCallbacks();
    }

    protected onFinishState() {
        if (this._bigWinPlaying > 0 || this.needUpdateWallet) return;
        this.onRefresh();
        Emitter.instance.emit(DragonEvent.DRAGON.DONE_ALL_BIG_WIN);
    }

    protected playWheelDragonBallsJackpot(player: gfPlayer, winAmount: number):void {
        const data: IBossWheelData = {
            player,
            GoldReward: winAmount,
            wheelType: WheelType.BOSS,
            isWonJP: true
        }
        Emitter.instance.emit(BaseEvents.EFFECT_LAYER.PLAY_BIG_WIN_EFFECT, data);
    }


    protected getJackpotWinAmount():number {
        for (let i = 0; i < this.endData.Result.length; ++i) {
            const result = this.endData.Result[i];
            if (result.DeskStation === this.endData.DeskStation) {
                return result.WinAmount;
            }
        }
        return 0;
    }

    checkExtraCondition():boolean {
        const player = ReferenceManager.instance.getPlayerByDeskStation(gfDataStore.instance.getSelfDeskStation());
        if(!player){
            return false;
        }
        this.showPopupNoMoney();
        return true;
    }

    showPopupNoMoney(){
        Emitter.instance.emit(BaseEvents.POPUP.POPUP_PROMPT, NetworkGameEvent2024.MSG_CODE.NO_MONEY_IN_GAME);
    }

    playerChangeGun(data) {
        const {DeskStation} = data;
        const player = ReferenceManager.instance?.getPlayerByDeskStation(DeskStation);
        if (!player) return;
        const gunSkillController = ReferenceManager.instance.getPlayerLayer().getComponent(gfGunSkillController);
        const gunSkill = gunSkillController.getGunSkillNodeActiveByDeskStation(DeskStation);
    }
    showJackpotWinAmountPopup() {
        Emitter.instance.emit(EventCode.CUT_SCENE.SHOW_CUT_SCENE, "JackpotWinPopup2024", this.endData);
    }
}
