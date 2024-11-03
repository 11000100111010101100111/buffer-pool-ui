class CustomerQueue {
  constructor(maxSize = 100) {
    this.queue = []; // 用数组来存储队列中的元素
    this.maxSize = maxSize; // 队列的最大容量
  }

  // 向队列尾部加入元素
  enqueue(element) {
    if (this.isFull()) {
      console.log("Queue is full! Cannot add more elements.");
      return false;
    }
    this.queue.push(element); // 队列尾部添加元素
    return true;
  }

  // 从队列头部移除元素
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty! Cannot remove elements.");
      return null;
    }
    return this.queue.shift(); // 移除并返回队列头部的元素
  }

  // 返回队列头部的元素，但不移除
  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty! No elements to peek.");
      return null;
    }
    return this.queue[0]; // 返回队列头部的元素
  }
  get(index) {
    return this.queue[index - 1]; // 返回队列头部的元素
  }

  // 检查队列是否为空
  isEmpty() {
    return this.queue.length === 0;
  }

  // 检查队列是否已满
  isFull() {
    return this.queue.length >= this.maxSize;
  }

  // 返回队列中的元素个数
  size() {
    return this.queue.length;
  }

  array() {
    return this.queue;
  }
}
