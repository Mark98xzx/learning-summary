var HTTP_CODE;
(function (HTTP_CODE) {
    HTTP_CODE[HTTP_CODE["OK"] = 200] = "OK";
    HTTP_CODE[HTTP_CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_CODE[HTTP_CODE["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
})(HTTP_CODE || (HTTP_CODE = {}));
// HTTP_CODE.OK = 1; // err
// // HTTP_CODE['OK'] = 200;
// // HTTP_CODE['200'] = 'OK';
// key 不能为数字
// value 可以为数字，也可以为字符串；不给 第一个值默认为0
var HTTP_CODE1;
(function (HTTP_CODE1) {
    HTTP_CODE1[HTTP_CODE1["OK"] = 0] = "OK";
    HTTP_CODE1[HTTP_CODE1["CC"] = 1] = "CC";
})(HTTP_CODE1 || (HTTP_CODE1 = {}));
var URLS;
(function (URLS) {
    URLS["USER_REGISETER"] = "/user/register";
    URLS["USER_LOGIN"] = "/user/login";
    // 如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
    URLS[URLS["INDEX"] = 1] = "INDEX";
    // INDEX2 //err
})(URLS || (URLS = {}));
URLS.USER_LOGIN;
