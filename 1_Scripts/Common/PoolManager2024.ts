import gfPoolManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfPoolManager';
import { POOL_TYPE } from '../../../cc30-fish4-1993/1_Script/Common/PoolManager1993';

export default class PoolManager2024 extends gfPoolManager {
    public static instance: PoolManager2024 = null;

    constructor(listPrefab) {
        super(listPrefab);
        PoolManager2024.instance = this;
    }

    initPools(): void {
        this.pools = [];
        this.initPool(POOL_TYPE.SpineFish, 'SpineFish2024', 'SpineFish2024', 25);
        this.initPool(POOL_TYPE.SpriteFish, 'SpriteFish2024', 'SpriteFish2024', 25);
        // todo:
    }
}
