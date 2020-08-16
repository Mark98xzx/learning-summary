
class User {
    id: number;
    username: string;

    // 具体特征就是 {} 中进行定义的
    constructor(
        id: number,
        username: string
    ) {
        // 创建类的函数，当类通过new实例化的时候，就会执行该函数
        console.log('这是构造函数，对类中成员属性进行初始化赋值');

        this.id = id;
        this.username = username;

        // return 1;
    }

    postArticle(title: string, content: string) {
        console.log(`${this.username} 发表了一篇文章：${title}`)
    }
}

let user1 = new User(1, 'xzx')
console.log(user1)
user1.postArticle('标题', '内容')

//---------------------------------------------------------

class User2 {
    // id: number;
    // username: string;

    /**
     * 当我们给构造函数参数设置了访问修饰符：public，那么ts会做如下两件事情
     *  - 给当前类添加同名的成员属性
     *  - 在类的实例化的时候，会把传入的参数值赋值给对应的成员属性
     */
    constructor(
        public id: number,
        public username: string
    ) {
        // this.id = id;
        // this.username = username;
    }

    postArticle(title: string, content: string) {
        console.log(`${this.username} 发表了一篇文章：${title}`)
    }
}

let user2 = new User2(2, 'mt');
console.log(user2);
user2.postArticle('标题', '内容');