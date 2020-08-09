enum HTTP_CODE {
    OK = 200,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED
}

// HTTP_CODE.OK = 1; // err


// // HTTP_CODE['OK'] = 200;
// // HTTP_CODE['200'] = 'OK';


// key 不能为数字
// value 可以为数字，也可以为字符串；不给 第一个值默认为0
enum HTTP_CODE1 {
    OK, // 0
    CC,
}


enum URLS  {
    USER_REGISETER = '/user/register',
    USER_LOGIN = '/user/login',
    // 如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
    INDEX = 1
    // INDEX2 //err
}
URLS.USER_LOGIN;