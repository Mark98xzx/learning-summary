
// 装饰器  是一个实验性语法，后面会有改动   vue2刚开始用的就是装饰器

// 装饰器作用就是扩展类，扩展类中的属性和方法

function addSay(target: any) {

}


@addSay // = addSay(Person);
class Person { // tsconfig.json 中 配置 "experimentalDecorators": true

}

// addSay(Person)
// addSay(Person)
// addSay(Person)