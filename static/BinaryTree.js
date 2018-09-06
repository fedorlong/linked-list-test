import TreeNode from './TreeNode'
export default class BinaryTree {
    constructor() {

    }

    reConstructBinaryTree(preOrderArr, inOrderArr) {
        if (inOrderArr.length === 0) {
            return null;
        }

        let count = 0,
            preLeft = [],
            preRight = [],
            inLeft = [],
            inRight = [];

        while(inOrderArr[count] !== preOrderArr[0]) {
            count += 1;
        }

        if (count !== 0) {
            preLeft = preOrderArr.slice(1, count + 1);
            inLeft = inOrderArr.slice(0, count);
        }
        if (count !== inOrderArr.length - 1) {
            preRight = preOrderArr.slice(count + 1);
            inRight = inOrderArr.slice(count + 1);
        }

        let node = new TreeNode(preOrderArr[0]);
        node.leftChild = this.reConstructBinaryTree(preLeft, inLeft);
        node.rightChild = this.reConstructBinaryTree(preRight, inRight);

        return node;
    }
}