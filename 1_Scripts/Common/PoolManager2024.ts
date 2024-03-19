import gfPoolManager, { POOL_TYPE } from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfPoolManager';

export default class PoolManager2024 extends gfPoolManager {
    public static instance: PoolManager2024 = null;

    constructor(listPrefab) {
        super(listPrefab);
        PoolManager2024.instance = this;
    }

    initPools() {
        this.pools = [];
        this.initPool(POOL_TYPE.SpineFish, 'SpineFish2024', 'gfSpineFish', 25);
        this.initPool(POOL_TYPE.SpriteFish, 'SpriteFish2024', 'gfSpriteFish', 25);
        this.initPool(POOL_TYPE.Coin, 'Coin2024', 'gfCoinFX', 10);
        this.initPool(POOL_TYPE.Bullet, 'Bullet2024', 'gfBullet', 10);
        this.initPool(POOL_TYPE.NetFX, 'NetFX2024', 'NetFX2024', 5);
        this.initPool(POOL_TYPE.SmallExplosion, 'SmallExplosion2024', 'gfExplosionSpine', 50);
        this.initPool(POOL_TYPE.BigExplosion, 'BigExplosion2024', 'gfExplosionSpine', 20);
        this.initPool(POOL_TYPE.LabelCoin, 'LabelCoin2024', 'gfCoinLabel', 5);
    }
}
