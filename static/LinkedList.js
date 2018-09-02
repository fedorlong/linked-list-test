import LinkedListNode from './LinkedListNode'
import Comparator from './Comparator'

export default class LinkedList {
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    //输入卫星数据，返回链表
    prepend(value) {
        //先把新建节点的next指针指向this.head,这时候链表头还是指向老的head
        const newNode = new LinkedListNode(value, this.head);
        //把新的链表头指向新建的节点
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    //输入卫星数据，返回链表
    append(value) {
        const newNode = new LinkedListNode(value, null);

        //如果链表是空链表，this.head this.tail 都是指向新节点(特殊情况)
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            //这里直接返回链表了
            return this;
        }

        //创建一个老链表尾端指向新节点的指针
        this.tail.next = newNode;
        //重新定义新节点为this.tail
        this.tail = newNode;

        return this;
    }

    //输入卫星数据，返回对应要删除的链表节点
    delete(value) {
        //空链表返回空
        if (!this.head) {
            return null;
        }

        let deleteNode = null;

        while(this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if (currentNode !== null) {
            while(currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    //重置currentNode的next指针
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // ?
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deleteNode;
    }

    deleteNodeOnceFound(value) {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;

        if (this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;

        } else {
            let currentNode = this.head;
            while(currentNode.next !== null
                && !this.compare.equal(currentNode.next.value, value)) {
                currentNode = currentNode.next;
            }

            if (currentNode.next !== null
                && this.compare.equal(currentNode.next.value, value)) {
                //找到了要删除的节点
                deleteNode = currentNode.next;
                //重置currentNode的next指针
                currentNode.next = currentNode.next.next;
            }
        }

        return deleteNode;
    }

    find({value = undefined, callback = undefined}) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while(currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail() {
        let deleteTailNode = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deleteTailNode;
        }

        let currentNode = this.head;
        while(currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deleteTailNode;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        let deleteHeadNode = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deleteHeadNode;
    }

    array2LinkList(arr) {
        let self = this;
        arr.forEach(element => {
            self.append(element);
        });

        return this;
    }

    toArray() {
        let nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }
}