class User4 {
    constructor(
        // 可以访问，但是一旦确定不能修改
        readonly id: number,
        // 可以访问，但是不能外部修改
        protected username: string,
        // 外部包括子类不能访问，也不可修改
        private _password: string
    ) {
        // ...
    }

    method1() {
        this.username;
        this._password;
    }

    // setPassword(password: string) {
    //     if (password.length >= 6) {
    //         this._password = password;
    //     }
    // }

    set password(password: string) {
        if (password.length >= 6) {
            this.password = password;
        }
    }
        
    get password(): string {
            return '****';
    }
}

class VIP1 extends User {

    method2() {
        this.username;
        // this.password;
    }

}

let user4 = new User4(1, 'mt', '123')
// user4.id;
// user4.id = 1;
// user4.username;
// user4.password;