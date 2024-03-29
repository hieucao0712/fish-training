import { _decorator, Component, Node, tween, UIOpacity, UITransform, v3 } from 'cc';
import GameConfig from '../Config/Config2024';
import { isPointInScreen } from '../../../../cc-common/cc30-fishbase/Scripts/Utilities/gfUtilities';
const { ccclass, property } = _decorator;


@ccclass('CrystalBall')
export class CrystalBall extends Component {
    @property(Node)
    mainItem: Node;
    @property(Node)
    eff1: Node;

    onLoad() {
        this.node.flyGemToPlayer = this.flyGemToPlayer.bind(this);
    }

    flyGemToPlayer(pos, callback) {
        this.mainItem.scale = v3(0,0);
        this.eff1.scale = v3(0,0);
        this.eff1.getComponent(UIOpacity).opacity = 0;
        const appearTime = 0.25;
        const moveTime = 0.5;
        const standTime = 0.75;
        const dest = this.calculateMovePoint();
        const tweenEffect = tween(this.eff1)
            .to(appearTime, { scale: 1.2, opacity: 255 });
        const tweenMainItem = tween(this.mainItem)
            .to(appearTime, { scale: 2 });
        const tweenEffect2 = tween(this.eff1)
            .to(moveTime, { scale: 0.6});
        const tweenMainItem2 = tween(this.mainItem)
            .to(moveTime, { scale: 1 });
        tween(this.node)
            .parallel(
                tween()
                    .call(() => {
                        tweenEffect.start();
                        tweenMainItem.start();
                    }),
                tween()
                    .to(appearTime, { position: dest }),
            )
            .delay(standTime)
            .call(() => {
                tweenEffect2.start();
                tweenMainItem2.start();
            })
            .to(moveTime, { position: pos }, { easing: "cubicOut" })
            .call(() => {
                callback();
                if(isValid(this.node))
                    this.node.destroy();
            })
            .start();
    }

    calculateMovePoint(){
        let x = this.node.x;
        let y = this.node.y;

        let pos = v3(this.node.x, GameConfig.instance.AppSize.Height / 2);

        while(!isPointInScreen(pos)){
            pos.x = pos.x < GameConfig.instance.AppSize.Width / 2 ? pos.x + 150 : pos.x - 150;
        }
        x = pos.x;
        pos = v3(GameConfig.instance.AppSize.Width / 2, this.node.y);

        while(!isPointInScreen(pos)){
            pos.y = pos.y < GameConfig.instance.AppSize.Height / 2 ? pos.y + 150 : pos.y - 150;
        }
        return v3(x,y);
    }
}

