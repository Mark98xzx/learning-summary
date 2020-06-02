// 负责提供计算方法

// 定义方法
// 加法
function add(num1, num2){
    return num1 + num2
}
// 减法
function sub(num1, num2){
    return num1 - num2
}
// 乘法
function multiplication(num1, num2){
    return num1 * num2
}
// 除法
function division(num1, num2){
    return num1 / num2
}


// 暴露
export default {
    add,
    sub,
    multiplication,
    division
}