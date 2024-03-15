import { tween, v3, Node, Tween, UIOpacity, bezier, Vec2, TweenEasing, math, v2, misc, Vec3, UIRenderer, Color, Mask } from 'cc';
import { roundAngle } from './gfUtilities';
import { setOpacity } from '../../../../cc-common/cc-share/common/utils';

export const fadeOut = function(time: number, easing?: TweenEasing) {
    return fadeTo(time, 0, easing);
}

export const fadeIn = function(time: number, easing?: TweenEasing) {
    return fadeTo(time, 255, easing);
}

export const fadeTo = function(time: number, opacity: number, easing?: TweenEasing){
    if(opacity < 0 || opacity > 255){
        opacity = 0;
    }
    let currentOpacity = 0;
    return tween().to(time, null, {
        easing,
        onStart:(target) => {
            const renderer = (target as Node).getComponent(UIRenderer);
            if (renderer) {
                currentOpacity = renderer.color.a;
            } else {
                let uiProps = (target as Node).getComponent(UIOpacity);
                if (!uiProps) {
                    uiProps = (target as Node).addComponent(UIOpacity);
                }
                currentOpacity = uiProps.opacity;
            }
        },

        onUpdate: (target, ratio) => {
            let newOpacity = math.lerp(currentOpacity, opacity, ratio);
            setOpacity(target as Node, newOpacity);
        }
    })
}


export const delay = function(time: number) {
    return tween().delay(time);
}

export const scaleTo = function(time: number, x: number, y?: number, easing?: TweenEasing) {
    if(y == undefined) {
        y = x;
    }
    return tween().to(time, {scale: v3(x, y, 1)}, { easing });
}

export const rotateTo = function(time: number, angle: number, easing?: TweenEasing) {
    let startAngle = null;
    let realAngle = null;
    return tween().to(time, null, {
        easing,
        onStart:(target) =>{
            startAngle = roundAngle((target as Node).angle);
            realAngle = roundAngle(angle - startAngle);
        },

        onUpdate: (target, ratio) => {
            (target as Node).angle = startAngle + realAngle * ratio;
        }
    });
}

export const rotateBy = function(time: number, a: number, easing?: TweenEasing) {
    return tween().by(time, { angle: a }, {easing});
}

export const call = function(callFunc) {
    return tween().call(callFunc);
}

export const v3f = function(f) {
    return v3(f,f,f);
}

export const stopAllActions = function (target){
    Tween.stopAllByTarget(target);
}

export const moveTo = function(dur: number, x: number, y: number = 0, z: number = 0, easing?: TweenEasing) {
    return tween().to(dur, {position: v3(x, y, z)}, { easing });
}

export const moveBy = function(dur: number, x: number, y: number = 0, z: number = 0, easing?: TweenEasing) {
    return tween().by(dur, {position: v3(x, y, z)}, { easing });
}

export const bezierTo = function(dur: number, points: Vec2[], easing?: TweenEasing) {
    let start = v3(0, 0, 0);
    return tween().to(dur, null, {
        easing,
        onStart: (target) => {
            start = (target as Node).getPosition();
        },
        onUpdate: (target, ratio) => {
            const x = bezier(start.x, points[0].x, points[1].x, points[2].x, ratio);
            const y = bezier(start.y, points[0].y, points[1].y, points[2].y, ratio);
            (target as Node).setPosition(x, y, start.z);
        }
    })
}

export const gfMoveBy = function(duration: number, x: number, y: number, timeSkipped: number = 0, easing?: TweenEasing) {
    let startPos = v3(0, 0, 0);
    return tween().to(duration, null, {
        easing,
        onStart: (target) => {
            startPos = (target as Node).getPosition();
        },
        onUpdate: (target, ratio) => {
            const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
            const px = startPos.x + dt * x;
            const py = startPos.y + dt * y;
            (target as Node).setPosition(px, py, startPos.z);
        }
    });
};

export const gfMoveTo = function(duration: number, x: number, y: number, timeSkipped: number = 0, easing?: TweenEasing) {
    let startPos = v3(0, 0, 0);
    return tween().to(duration, null, {
        easing,
        onStart: (target) => {
            startPos = (target as Node).getPosition();
        },
        onUpdate: (target, ratio) => {
            const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
            const px = startPos.x + dt * (x - startPos.x);
            const py = startPos.y + dt * (y - startPos.y);
            (target as Node).setPosition(px, py, startPos.z);
        }
    });
};

export const gfMoveByDistance = function(duration: number, distance: number, timeSkipped = 0) {
    let startPos = v3(0, 0, 0);
    let deltaPos = v2(0, 0);
    return tween().to(duration, null, {
        onStart: (target) => {
            const node = target as Node;
            startPos = node.getPosition();
            const angle = misc.degreesToRadians(node.angle);
            deltaPos = v2(distance * Math.cos(angle), distance * Math.sin(angle));
        },
        onUpdate: (target, ratio) => {
            const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
            const px = startPos.x + dt * deltaPos.x;
            const py = startPos.y + dt * deltaPos.y;
            (target as Node).setPosition(px, py, startPos.z);
        }
    });
};

export const gfCircleBy = function(duration: number, center: Vec2, radius: number, angle: number, timeSkipped = 0) {
    let startPos = v3(0, 0, 0);
    let baseAngle = 0;
    return tween().to(duration, null, {
        onStart: (target) => {
            const node = target as Node;
            startPos = node.getPosition();
            baseAngle = Math.atan2(startPos.y - center.y, startPos.x - center.x);
        },
        onUpdate: (target, ratio) => {
            const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
            const radian = baseAngle + misc.degreesToRadians(angle) * dt;
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);
            (target as Node).setPosition(x + center.x, y + center.y, startPos.z);
        }
    });
};

export const gfBezierBy = function(duration: number, points: Vec2[], timeSkipped = 0) {
    let start = v3(0, 0, 0);
    return tween().to(duration, null, {
        onStart: (target) => {
            start = (target as Node).getPosition();
        },
        onUpdate: (target, ratio) => {
            const dt = (ratio * duration + timeSkipped) / (duration + timeSkipped);
            const x = bezier(start.x, start.x + points[0].x, start.x + points[1].x, start.x + points[2].x, dt);
            const y = bezier(start.y, start.y + points[0].y, start.y + points[1].y, start.y + points[2].y, dt);
            (target as Node).setPosition(x, y, start.z);
        }
    })
};

export const shake = function(pos: Vec2 | Vec3, duration: number, delay = 0) {
    const timeFrame = duration / 11;
    const posX = pos.x;
    const posY = pos.y;
    return tween()
        .to(timeFrame, {position: v3(posX - 1, posY - 2, 0), angle: -1}) //10%
        .to(timeFrame, {position: v3(posX - 3, posY + 0, 0), angle: 1}) //20%
        .to(timeFrame, {position: v3(posX + 3, posY + 2, 0), angle: 0}) //30%
        .to(timeFrame, {position: v3(posX + 1, posY - 1, 0), angle: 1}) //40%
        .to(timeFrame, {position: v3(posX - 1, posY + 2, 0), angle: -1}) //50%
        .to(timeFrame, {position: v3(posX - 3, posY + 1, 0), angle: 0}) //60%
        .to(timeFrame, {position: v3(posX + 3, posY + 1, 0), angle: -1}) //70%
        .to(timeFrame, {position: v3(posX - 1, posY - 1, 0), angle: 1}) //80%
        .to(timeFrame, {position: v3(posX + 1, posY + 2, 0), angle: 0}) //90%
        .to(timeFrame, {position: v3(posX + 1, posY - 2, 0), angle: -1}) //100%
        .to(timeFrame, {position: v3(posX, posY, 0), angle: 0}) //100%
        .delay(delay);
}

export const blink = function(duration: number, times: number, finalOpacity = 255) {
    let slice = 1.0 / times;
    return tween()
        .to(duration, null, {
            onUpdate: (target, ratio)=> {
                var m = ratio % slice;
                setOpacity(target as Node, (m > (slice / 2)) ? 255 : 0);
            },
            onComplete: (target) => {
                setOpacity(target as Node, finalOpacity);
            }
        })
}

export const moveBySpring = function(data, timeSkipped = 0) {
    const {duration, cycleIntensity, speed, radius, timeSpent , pos , flip, angle} = data;
    let startPos = v3(0, 0, 0);
    return tween().to(duration, null, {
        onStart: (target) => {
            const node = target as Node;
            startPos = node.getPosition();
        },
        onUpdate: (target, dt) => {
            dt = (dt * duration + timeSpent ) / (duration + timeSkipped);
            function mx(u) {
                const timeSpent = (u * duration) * speed * (flip ? 1 : -1);
                return ((timeSpent / cycleIntensity - Math.cos(timeSpent + angle * Math.PI / 180))) * radius  + pos.x;
            }

            function my(u) {
                const timeSpent = (u * duration) * speed * (flip ? 1 : -1);
                return (Math.sin(timeSpent + angle * Math.PI / 180)) * radius + pos.y;
            }

            const x = mx(dt);
            const y = my(dt);
            (target as Node).setPosition(x , y, startPos.z);
        }
    });
}

export const gfSetOpacityAll = function(node: Node, opacity: number) { 
    setOpacity(node, opacity);
    const children = node.getComponentsInChildren(UIRenderer).filter(child => !child.getComponent(Mask));
    children.forEach(child => {
        const {r,g,b} = child.color;
        child.color = new Color(r, g, b, opacity);
    })
}

export const gfFadeOutAll = function(time: number, easing?: TweenEasing) {
    return gfFadeToAll(time, 0, easing);
}

export const gfFadeInAll = function(time: number, easing?: TweenEasing) {
    return gfFadeToAll(time, 255, easing);
}

export const gfFadeToAll = function(time: number, opacity: number, easing?: TweenEasing) {
    opacity = math.clamp(opacity, 0, 255);
    let currentOpacity = 255;
    return tween().to(time, null, {
        easing,
        onStart:(target) => {
            let node = target as Node;
            let uiProps = node.getComponent(UIOpacity);
            if(uiProps) {
                currentOpacity = uiProps.opacity;
            } else {
                const renderable2D = node.getComponent(UIRenderer);
                if(renderable2D) {
                    currentOpacity = renderable2D.color.a;
                }
            } 
        },

        onUpdate: (target, ratio) => {
            let node = target as Node;
            let newOpacity = math.lerp(currentOpacity, opacity, ratio);
            gfSetOpacityAll(node, newOpacity);
        }
    })
}