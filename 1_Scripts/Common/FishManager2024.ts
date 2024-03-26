import gfFishManager from '../../../../cc-common/cc30-fishbase/Scripts/Common/gfFishManager';

export default class FishManager2024 extends gfFishManager {
    public static instance: FishManager2024 = null;

    constructor() {
        super();
        FishManager2024.instance = this;
    }

    public destroy(): void {
        super.destroy();
        FishManager2024.instance = null;
    }
}
