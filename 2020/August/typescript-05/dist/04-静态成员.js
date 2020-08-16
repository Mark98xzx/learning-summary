class User5 {
    constructor(id, username, _allowFileTypes) {
        this.id = id;
        this.username = username;
        this._allowFileTypes = _allowFileTypes;
    }
    static info() {
        // 类的静态成员都是使用 类名.静态成员 来访问
        // VIP 这种类型的用户允许上传的所有类型有哪一些
        console.log(User5.ALLOW_FILE_TYPE_LIST);
        // 当前这个 vip 用户允许上传类型有哪一些
        // console.log(this._allowFileTypes);
    }
}
User5.ALLOW_FILE_TYPE_LIST = ['png', 'gif', 'jpg', 'jpeg', 'webp'];
let user5 = new User5(1, 'mt', ['png', 'gif']);
User5.ALLOW_FILE_TYPE_LIST;
User5.info();
