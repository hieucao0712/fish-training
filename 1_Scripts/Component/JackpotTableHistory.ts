import { _decorator, Component, instantiate, Node, Prefab, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JackpotTableHistory')
export class JackpotTableHistory extends Component {
    @property (Prefab)
    cell: Prefab = null;
    onLoad() {
        this.node.on("UPDATE_DATA", this.updateData, this);
        this.node.on("CLEAR_DATA", this.clearData, this);
    }

    initCells(itemPerPage){
        for (let i = 0; i < itemPerPage; ++i) {
            const cell = instantiate(this.cell);
            cell.parent = this.node;
            cell.getComponent(UIOpacity).opacity = 1;
        }
    }

    updateData(data) {
        this.node.children.forEach((child, index) => {
            if (index < data.length)
            {
                child.updateData(data[index]);
                child.active = true;
                child.getComponent(UIOpacity).opacity = 255;
            }
            else
            {
                child.active = false;
            }
        });
    }

    clearData()
    {
        this.node.children.forEach(child => child.active = false);
    }
}

