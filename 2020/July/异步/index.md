## 迭代

### 迭代协议
		规定了迭代与实现的逻辑

### 迭代器
    具体的迭代实现逻辑

### 迭代对象
    可被迭代的对象 - 实现了[Symbol.iterator]方法

### 迭代语句
    for...in：以原始插入的顺序迭代对象的可枚举属性
    for...of：根据迭代对象的迭代器具体实现迭代对象数据

### 迭代器实现原理

####  [Symbol.iterator] 

obj[Symbol.iterator] = function(){
    return {
        next(){
            return {
                value: this.i++, 
                done: false 
            }
        }
    }
}


## Generator 函数
    在形式上，Generator是一个普通函数，但是有两个特征。一是，function命令与函数名之间有一个星号
    二是，函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态

### Generator 语法
function* fn() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 

### 自执行Generator函数
	co函数：自动化generator函数调用器
    