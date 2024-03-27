import { BoxCollider2D, Color, Node, ParticleSystem2D, Skeleton, UITransform,sp, _decorator, color, macro, sys, tween, v2, v3, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import { gfDragon } from '../../../../cc-common/cc30-fishbase/Modules/cc30-fish-module-boss/Dragon/Scripts/gfDragon';
import EventCode from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseEvents';
import GameConfig from '../../../../cc-common/cc30-fishbase/Scripts/Config/gfBaseConfig';
import Emitter from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfEventEmitter';


const BASE_TIME_SCALE = 0.25;
const MAIN_TRACK = 0;
const ANIMATION_DURATION = 42
@ccclass('Dragon2024')
export class Dragon2024 extends gfDragon {
    @property(ParticleSystem2D)
    arrDust: ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrSmoke: ParticleSystem2D[] = [];
    @property(ParticleSystem2D)
    arrElectro: ParticleSystem2D[] = [];
    @property(Node)
    nodeDust: Node[] = [];
    @property(Node)
    nodeSmoke: Node[] = [];
    @property(Node)
    nodeElectro: Node[] = [];
    _timeRemain = 0;
    curAnimTime = null;
    _plasmaTween = null;


    ANIMATION = {
        In: "Swim In",
        Loop: "Swim Loop",
        Out: "Swim Out",
        In_L: "Swim In",
        In_R: "Swim In"
    }

    onLoad(): void {
        super.onLoad();
    }

    update(dt) {
        if (this._isDie) return;
        // if (sys.isNative) {
        //     this.updateBoneCache(dt, true);
        // }

        this._timeRemain = this._timeRemain - dt > 0 ? this._timeRemain-=dt : this._timeRemain;
        this.curAnimTime += dt;
        for (let i = 0; i < this.listBox.length; ++i) {
            if (this.bone[i] && this.bone[i].worldX != 0 && this.bone[i].worldY != 0) {
                this.listBox[i].offset = v2(this.bone[i].worldX, this.bone[i].worldY);
            }
        }
    }
    

    // startMoving() {
    //     // Emitter.instance.emit(EventCode.SOUND.PLAY_SOUND_BACKGROUND, GameConfig.instance.SOUND_BACKGROUND_CONFIG.GODZILLA);
    //     this.fishAnim.timeScale = BASE_TIME_SCALE;
    //     this.setDragonAnim(MAIN_TRACK, animationName, false, ANIMATION_DURATION - this._timeRemain);
    //     this.fishAnim.setCompleteListener((trackEntry) => {
    //         if(trackEntry.trackIndex === MAIN_TRACK) {
    //             this.fishAnim.setCompleteListener(() => {
    //             });
    //             this.onDie();
    //         }
    //     });
    // }

    // playPlasmaEffect(callback){
    //     if(this._colorTween && !this._colorTween.isDone()){
    //         this._colorTween.stop();
    //         this._colorTween = null;
    //         this._mainMaterial.setProperty('brightness', 0.0);
    //     }
    //     if(!this._plasmaTween || this._plasmaTween.isDone()) {
    //         // const curAnimTime = this.curAnimTime;
    //         const duration = this.fishAnim.findAnimation("Plasma").duration;
    //         let isRed = (this._oldState!==5) ? 1 : 0; //should be is not red
    //         this._plasmaTween =  cc.tween(this.fishAnim)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.15);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.3);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.45);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.6);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.75);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 0.9);
    //             })
    //             .delay(0.05 * isRed)
    //             .call(()=>{
    //                 if(isRed)
    //                     this._mainMaterial.setProperty('brightness', 1);
    //             })
    //             .call(() => {
    //                 if(isRed) {
    //                     this.fishAnim.setSkin("LV5");
    //                     this.updateParticle(5);
    //                     if (cc.sys.isNative) {
    //                         this.fishAnim.useTint = true;
    //                         this.fishAnim.setToSetupPose();
    //                     }
    //                     this.startMoving();
    //                 }
    //             })
    //             .delay(0.1 * isRed)
    //             .call(()=>{
    //                 if(isRed) {
    //                     this._mainMaterial.setProperty('brightness', 0.6);
    //                 }
    //             })
    //             .delay(0.025 * isRed)
    //             .call(()=>{
    //                 if(isRed) {
    //                     this._mainMaterial.setProperty('brightness', 0.3);
    //                 }
    //             })
    //             .delay(0.025 * isRed)
    //             .call(()=>{
    //                 this._mainMaterial.setProperty('brightness', 0);
    //                 this.fishAnim.setAnimation(SUB_TRACK, "Plasma", false);
    //             })

    //             .delay(duration*0.75)
    //             .call(()=>{
    //                 callback();
    //             })
    //             .delay(1)
    //             .call(()=>{
    //                 this.changeColor();
    //             })
    //             .start();
    //     } else {
    //         callback();
    //     }
    // },

    onDie(isResume = false) {
        super.onDie();
        if(!isResume){
            Emitter.instance.emit(EventCode.SOUND.PLAY_SOUND_BACKGROUND, GameConfig.instance.SOUND_BACKGROUND_CONFIG.IN_GAME);
        }
        this.playEffectDie();
    }
}


