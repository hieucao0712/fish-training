import EventEmitter from "../../../../plugins/events.js";
export default class gfEventEmitter {
    public static instance: gfEventEmitter = null;
    
    private _emiter: any;

    constructor () {
        gfEventEmitter.instance = this;
        
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
    }

    emit(...args : any[]): void {
        this._emiter.emit(...args);
    }
    
    registerEvent(event, listener) {
        this._emiter.on(event, listener);
    }

    removeEvent(event, listener) {
        this._emiter.removeListener(event, listener);
    }

    destroy()
    {
        this._emiter.removeAllListeners();
        this._emiter = null;
        gfEventEmitter.instance = null;
    }
}
// gfEventEmitter.instance = null;