import { sys, Vec2, Vec3, Rect, math, v2, v3, Tween, Node, view, Button , UITransform, misc, sp} from 'cc';
import Emitter from '../Common/gfEventEmitter';
import GameConfig from '../Config/gfBaseConfig';
import { customDateFormat } from '../../../../cc-common/cc-share/common/utils';
// Tween.prototype.isDone = function(){
//     return this._finalAction.isDone();
// };

Tween.prototype.setSpeed = function(speed = 1){
    this._finalAction._speedMethod = true;
    this._finalAction.setSpeed(speed);
};

const SubString = function (str: string, len: number) {
    return str.substr(0, len);
};

const v2Distance = function (p1: Vec2 | Vec3, p2: Vec2 | Vec3) {
    if (p1 == null || p2 == null)
        return 0;

    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const getRotation = function (p1: Vec2 | Vec3, p2: Vec2 | Vec3) {
    if (p1 == null || p2 == null)
        return 0;
    return Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
};

export const getRotationByRad = function (p1: Vec2 | Vec3, p2: Vec2 | Vec3) {
    if (p1 == null || p2 == null)
        return 0;
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
};

const randomBetween = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const convertSecondToTime = function (a: number | string) {
    let sec_num = parseInt(a.toString(), 10);
    // let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num % 60;

    return [minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
};

const ReplaceDataNotify = function (string, data, substr = '') {
    let strOut = string;
    for (let index = 0; index < data.length; index++) {
        strOut = strOut.replace("data.data[" + index + "]", data[index]);
    }
    if (substr != '') {
        strOut = strOut.replace("substr", substr);
    }
    return strOut;
};

const convertMillisecondsToTime = function (duration) {
    if (typeof duration !== "number") duration = parseInt(duration);
    let milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let hourString = (hours < 10) ? "0" + hours : hours;
    let minuteString = (minutes < 10) ? "0" + minutes : minutes;
    let secondString = (seconds < 10) ? "0" + seconds : seconds;

    return hourString + ":" + minuteString + ":" + secondString + "." + milliseconds;
};


const  isWebMobileSafari = function () {
    if (sys.platform === sys.Platform.MOBILE_BROWSER && sys.browserType === sys.BrowserType.SAFARI) {
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1 && navigator.userAgent.indexOf("CriOS") <= -1) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
};

const isChromeiOS = function () {
    if(sys.os === sys.OS.IOS && sys.platform === sys.Platform.MOBILE_BROWSER && sys.browserType === sys.BrowserType.SAFARI){
        if(navigator.userAgent.indexOf("CriOS") > -1){ //Check is Chrome
            return true;
        }
    }
    return false;
};

const isEmpty = function (data) {
    return data == undefined || data == null;
};

const formatCoin = function (str: number | string, seperate: string = ","): string {
    if(str == undefined || str < 0)
        return '0';
    seperate = seperate == null ? "," : seperate;
    if (typeof str === "number") {
        str = Math.round(str);
        str = str.toString();
    }
    else {
        if(typeof str == 'string')
        {
            let coin = parseInt(str);
            str = coin.toString();
        }

    }
    let strResult = "";
    let count = -1;
    let stringLength = str.length;
    for (let i = 0; i < stringLength; i++) {
        count++;
        if (count == 3) {
            count = 0;
            if (parseInt(str.charAt(stringLength - (i + 1)), 10).toString() != "NaN" && str.charAt(stringLength - (i + 1)) != "-") {
                strResult += seperate + str.charAt(stringLength - (i + 1));
            }
            else {
                strResult += str.charAt(stringLength - (i + 1));
            }
        }
        else {
            strResult += str.charAt(stringLength - (i + 1));
        }
    }
    let s1: string | number = "";
    let strResultLength = strResult.length;
    for (let j = 0; j < strResultLength; j++) {
        s1 += strResult.charAt(strResultLength - (j + 1));
    }
    if (s1 == "NaN"){
        s1 = 0;
    }
    return s1.toString();
};

const getPointBetweenTwoPointByPercent = function (p0,p1, per){
    let px = p0.x + (p1.x - p0.x)*per;
    let py = p0.y + (p1.y - p0.y)*per;
    return v2(px, py);
};

const getListPointFromThreePoint = function (p1: Vec2 | Vec3, p2: Vec2 | Vec3, p3: Vec2 | Vec3, tbegin: number){
    let listPoints = [];
    for(let t = tbegin; t <= 1 ; t += 0.01 )
    {
        let xt = (1-t)*(1-t)*p1.x + 2*(1-t)*t* p2.x + t*t*p3.x;
        let yt = (1-t)*(1-t)*p1.y + 2*(1-t)*t* p2.y + t*t*p3.y;
        listPoints.push(v2(xt, yt));
    }

    return listPoints;
};

const rotateAngleByCoordinate = function(cx: number, cy: number, x: number, y: number, angle: number) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x:nx, y:ny};
};

const showFullScreenButton = function(isShow = true) {
    const visible = isShow ? "visible" : "hidden";
    if (sys.os === sys.OS.ANDROID && sys.isMobile) {
        let divFullscreen = document.getElementById('div_full_screen');
        if (divFullscreen) {
            divFullscreen.style.visibility = visible;
        }
    }
};

const addHtmlCursor = function() {
    if (sys.platform == sys.Platform.DESKTOP_BROWSER) {
        let css = document.createElement('style');
        css.type = 'text/css';
        css.id = 'cursorId';
        let styles = 'canvas { color: #555;cursor: url(data:image/cur;base64,' + GameConfig.instance.CursorBase64 + ') 16 16, default; background:#F4F4F4; display: block;  text-align: center;}';
        if (css['styleSheet'])
            css['styleSheet'].cssText = styles;
        else
            css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);
    }
};

const removeCursorInHtml = function () {
    if (sys.platform == sys.Platform.DESKTOP_BROWSER) {
        let cursorElement = document.getElementById("cursorId");
        cursorElement && document.getElementsByTagName("head")[0]?.removeChild(cursorElement);
    }
};

const clamp = function(x, min, max) {
    return math.clamp(x, min, max);
};

const isArrayEqual = function(x, y) {
    return globalThis._(x).xorWith(y, globalThis._.isEqual).isEmpty();
};

const getPointByDegrees = function(cx: number, cy: number, x: number, y: number, angle: number) {

    let radians = -(Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x:nx, y:ny};
};

const registerEvent = function(eventCode, func, main){
    if(!main.eventMap) {
        main.eventMap = [];
    }
    const funcKey = func.bind(main);
    main.eventMap.push({eventCode, funcKey});
    if ( Emitter.instance) {
        Emitter.instance.registerEvent(eventCode, funcKey);
    }
};

const removeEvents = function(main){
    if(!main.eventMap || !Emitter.instance) return;
    main.eventMap.forEach(e =>{
        Emitter.instance.removeEvent(e.eventCode, e.funcKey);
    });
    main.eventMap.length = 0;
};

const autoEnum = function (arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        res[arr[i]] = i;
    }
    return res;
};

const getBetValue = (gameId, roomKind ) => {
    if (!gameId || !roomKind) return null;
    const KEY_STORE = 'betFish'+ gameId;
    let betObject = sys.localStorage.getItem(KEY_STORE);
    if (!globalThis._.isEmpty(betObject)) {
        betObject = JSON.parse(betObject);
        if(betObject[roomKind]){
            return betObject[roomKind];
        }
    } 
    return null;
};

const setBetValue = (gameId, roomKind, bulletMultiple)  => {
    const KEY_STORE = 'betFish'+ gameId;
    let betObject = sys.localStorage.getItem(KEY_STORE);
    if (globalThis._.isEmpty(betObject)) {
        const newObj = { [roomKind] : bulletMultiple};
        sys.localStorage.setItem(KEY_STORE, JSON.stringify(newObj));
    } else {
        betObject = JSON.parse(betObject);
        betObject[roomKind] = bulletMultiple;
        sys.localStorage.setItem(KEY_STORE, JSON.stringify(betObject));
    }
};

const formatUserName = (userName = '', maxLength = 16, replaceText = "...") => {
    if (userName.length <= maxLength) return userName;
    return userName.slice(0, maxLength - replaceText.length + 1) + replaceText;
};

const isPointInScreen = function (point: Vec2 | Vec3, offset = 0){
    const {SceneBox, realSize} = GameConfig.instance;
    const screen = new Rect(SceneBox.Left - offset / 2, SceneBox.Bottom - offset / 2, realSize.Width + offset, realSize.Height + offset);
    return screen.contains(v2(point.x, point.y));
};
const formatString = function(theString, argumentArray) {
    var regex = /%s/;
    var _r = function(p,c){ return p.replace(regex,c); };
    return argumentArray.reduce(_r, theString);
};

const deepCopy = <T>(target: T): T => {
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach((v) => { cp.push(v); });
      return cp.map((n: any) => deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== {}) {
      const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
      Object.keys(cp).forEach(k => {
        cp[k] = deepCopy<any>(cp[k]);
      });
      return cp as T;
    }
    return target;
};

const mergeTwoObject = <U, V>(obj1: U, obj2: V): U & V => {
    return globalThis._.merge({}, obj1, obj2);
};

const SetZIndex = function(node: Node, index) {
    const zIndex = 'zIndex';
    if(!node.parent) return;
    node[zIndex] = index;
    for(let i = 0; i < node.parent.children.length; ++i) {
        const child = node.parent.children[i];
        if(child[zIndex] == undefined) {
            child[zIndex] = 0;
        }
        if(index <= child[zIndex] && node.uuid != child.uuid) {
            node.setSiblingIndex(child.getSiblingIndex());
            return;
        }
    }
    node.setSiblingIndex(node.parent.children.length);

}

export const convertFishCoordinateSystem = function(points) {
    const APP_SIZE = GameConfig.instance.AppSize;
    for (let i = 0; i < points.length; ++i) {
        const pointRotated = rotateAngleByCoordinate(APP_SIZE.Width / 2, APP_SIZE.Height / 2, points[i].PosX, points[i].PosY, -180);
        points[i].PosY = pointRotated.y;
        points[i].PosX = pointRotated.x;
    }
}

export const bezier3P = function(a, b, c, t) {
    return (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
}

export const getPositionWithTimeSpentFromThreePoint = function(p1, p2, p3, timeLost, speed){
    const totalPoints = 100;
    const durationPerUnit = 1 / totalPoints;
    let duration = 0;
    let position = v2(x(0), y(0));
    let i = 1;
    let currentPoint = position;
    let lastPoint = currentPoint;
    let lastDuration = 0;
    while(duration < timeLost && i <= totalPoints) {
        lastPoint = currentPoint;
        lastDuration = duration;
        currentPoint = v2(x(i * durationPerUnit), y(i * durationPerUnit));
        const distance = v2Distance(lastPoint, currentPoint);
        duration += distance / speed;
        ++i;
    }

    if(duration == lastDuration) {
        return v2(x(i - 1), y(i - 1));
    }
    const ratio = (timeLost - lastDuration) / (duration - lastDuration);
    const index = ((i - 2) + ratio) * durationPerUnit;
    return v2(x(index), y(index));

    function x(t) {
        return bezier3P(p1.x, p2.x, p3.x, t);
    }

    function y(t) {
        return bezier3P(p1.y, p2.y, p3.y, t);
    }
};

export const flipX = function(node: Node) {
    node.scale = v3(-node.scale.x, node.scale.y, node.scale.z);
}


const checkTablet = function () {
    if (sys.isNative) {
        //Temporary remove due to engine error
        return false;
        // let msg = "Debug check tablet \n";
        // const dpi = jsb.device.getDevicePixelRatio();
        // msg+= "dpi by screen:" + screen.devicePixelRatio +"\n";
        // //Start debug
        // msg += "dpi:" + dpi + "\n";
        // const viewSize = screen.windowSize;
        // const xInches = viewSize.width / dpi;
        // msg += "xInches: " + xInches + " - ";
        // const yInches = viewSize.height / dpi;
        // msg += "yInches: " + yInches + "\n";
        // let diagonalInches = Math.sqrt(Math.pow(xInches, 2) + Math.pow(yInches, 2));
        // diagonalInches = Math.round(diagonalInches * 100) / 100;
        // msg+= "diagonalInches:" + diagonalInches + "\n";
        // console.error('DebugNode: \n' + msg);
        // return (diagonalInches >= 7);
    } else {
        const userAgent = navigator.userAgent.toLowerCase();
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
        return isTablet;
    }
};

const formatTimeStamp = function (ts, formatString = "#DD#/#MM# #hhhh#:#mm#:#ss#") {
    const date = new Date(ts);
    return customDateFormat(date, formatString);
};

export const refreshButtonState = function(button: Button) {
    button.interactable = false;
    button.interactable = true;
}

export const isTouchScreen = function() {
    return navigator.maxTouchPoints > 0;
}

export const roundAngle = function(angle) {
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    return angle;
}

const convertSecondToTimeDay = function (a) {
    //let sec_num = parseInt(a, 10);
    let sec_num = parseInt(a, 10);
    let days = Math.floor(sec_num / 86400);
    sec_num -= days * 86400;
    let hours = Math.floor(sec_num / 3600) % 24;
    sec_num -= hours * 3600;
    let minutes = Math.floor(sec_num / 60) % 60;
    sec_num -= minutes * 60;
    let seconds = sec_num;

    return [days, hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "0" || i > 1)
        .join(":");
}

const removeZero = function (str) {
    if (str.length > 1 && str.charAt(0) == "0") {
        return str.charAt(1);
    }
    return str;
}

const addTimePrefix = function (str,arrPrefix ) {
    let infos = str.split(':');

    if (infos[0] == "00" && infos[1] == "00" && infos[2] == "00") {
        str = removeZero(infos[3]) + arrPrefix[3];
    } else if (infos[0] == "00" && infos[1] == "00") {
        str = removeZero(infos[2]) + arrPrefix[2] + removeZero(infos[3]) + arrPrefix[3];
    } else if (infos[0] == "00") {
        if (infos[2] == "00") str = removeZero(infos[1]) + arrPrefix[1].replace(':', '');
        else str = removeZero(infos[1]) + arrPrefix[1] + removeZero(infos[2]) + arrPrefix[2].replace(':', '');
    } else {
        if (infos[2] == "00") str = removeZero(infos[0]) + arrPrefix[0] + removeZero(infos[1]) + arrPrefix[1].replace(':', '');
        else str = removeZero(infos[0]) + arrPrefix[0] + removeZero(infos[1]) + arrPrefix[1] + removeZero(infos[2]) + arrPrefix[2].replace(':', '');
    }
    return str;
}

const getPositionInOtherNode = function (spaceNode, targetNode) {
    if (targetNode.parent == null) {
        return null;
    }
    let pos = targetNode.parent.getComponent(UITransform).convertToWorldSpaceAR(targetNode.getPosition());
    return spaceNode.getComponent(UITransform).convertToNodeSpaceAR(pos);
}

const getSkillTypeBySkillID = function(SkillID) {
    let skillType = null;
    Object.keys(GameConfig.instance.SKILL_CONFIG).forEach(key =>{
        const item = GameConfig.instance.SKILL_CONFIG[key];
        if(item.SkillID == SkillID){
            skillType = item.Type;
        }
    })
    return skillType;
};

export const updateSpineTime = function(spine: sp.Skeleton, dt) {
    const { tracks } = spine.getState();
    tracks.forEach((track)=> {
        if (track && !track.isComplete()) {
            track.trackTime += dt;
        }
    });
    sys.isNative ? spine.updateAnimation(0) : spine.getState().apply(spine._skeleton);
}

export const convertToRelativePoint = function(position, point, angle) {
    const radian = misc.degreesToRadians(angle);
    const x = position.x + point.x * Math.cos(radian) - point.y * Math.sin(radian);
    const y = position.y + point.x * Math.sin(radian) + point.y * Math.cos(radian);
    return v2(x, y);
}

export const StateMachineHistory = function(options) { options = options || {};
    function camelize(label) {

        if (label.length === 0)
        return label;
    
        var n, result, word, words = label.split(/[_-]/);
    
        // single word with first character already lowercase, return untouched
        if ((words.length === 1) && (words[0][0].toLowerCase() === words[0][0]))
        return label;
    
        result = words[0].toLowerCase();
        for(n = 1 ; n < words.length ; n++) {
        result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
        }
    
        return result;
    }
  
    camelize.prepended = function(prepend, label) {
        label = camelize(label);
        return prepend + label[0].toUpperCase() + label.substring(1);
    }

    var past       = camelize(options.name || options.past   || 'history'),
        future     = camelize(                options.future || 'future'),
        clear      = camelize.prepended('clear', past),
        back       = camelize.prepended(past,   'back'),
        forward    = camelize.prepended(past,   'forward'),
        canBack    = camelize.prepended('can',   back),
        canForward = camelize.prepended('can',   forward),
        max        = options.max;

    var plugin = {

        configure: function(config) {
        config.addTransitionLifecycleNames(back);
        config.addTransitionLifecycleNames(forward);
        },

        init: function(instance) {
        instance[past]   = [];
        instance[future] = [];
        },

        lifecycle: function(instance, lifecycle) {
        if (lifecycle.event === 'onEnterState') {
            instance[past].push(lifecycle.to);
            if (max && instance[past].length > max)
            instance[past].shift();
            if (lifecycle.transition !== back && lifecycle.transition !== forward)
            instance[future].length = 0;
        }
        },

        methods:    {},
        properties: {}

    }

    plugin.methods[clear] = function() {
        this[past].length = 0
        this[future].length = 0
    }

    plugin.properties[canBack] = {
        get: function() {
        return this[past].length > 1
        }
    }

    plugin.properties[canForward] = {
        get: function() {
        return this[future].length > 0
        }
    }

    plugin.methods[back] = function() {
        if (!this[canBack])
        throw Error('no history');
        var from = this[past].pop(),
            to   = this[past].pop();
        this[future].push(from);
        this._fsm.transit(back, from, to, []);
    }

    plugin.methods[forward] = function() {
        if (!this[canForward])
        throw Error('no history');
        var from = this.state,
            to = this[future].pop();
        this._fsm.transit(forward, from, to, []);
    }

    return plugin;

}



export {
    getSkillTypeBySkillID,
    checkTablet,
    mergeTwoObject,
    getPointByDegrees,
    removeCursorInHtml,
    addHtmlCursor,
    showFullScreenButton,
    rotateAngleByCoordinate,
    getPointBetweenTwoPointByPercent,
    getListPointFromThreePoint,
    SubString,
    v2Distance,
    getRotation,
    randomBetween,
    convertSecondToTime,
    ReplaceDataNotify,
    convertMillisecondsToTime,
    isWebMobileSafari,
    isChromeiOS,
    formatCoin,
    isEmpty,
    clamp,
    isArrayEqual,
    registerEvent,
    removeEvents,
    isPointInScreen,
    autoEnum,
    formatUserName,
    formatString,
    deepCopy,
    getBetValue,
    setBetValue,
    SetZIndex,
    formatTimeStamp,
    convertSecondToTimeDay,
    addTimePrefix,
    getPositionInOtherNode
};
