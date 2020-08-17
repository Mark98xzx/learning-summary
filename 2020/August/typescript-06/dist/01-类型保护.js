function fn(a) {
    // 这里的a变量的是可能是字符串，但也有可能是数字，所以ts告诉我们，你不能直接作为字符串去使用，有风险
    // a.substring(1,2);
    // 类型断言
    // (<string> a).substring(1);
    if (typeof a === 'string') {
        a.substring(1);
    }
    else {
        a.toFixed(1);
    }
    // a.toFixed(1);
}
// 自定义类型保护 
function canEach(data) {
    return data.forEach !== undefined;
}
function fn2(elements) {
    if (canEach(elements)) {
        elements.forEach((element) => {
            element.className = '';
        });
    }
    else {
        elements.className = '';
    }
}
