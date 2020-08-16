class User3 {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
    postArticle(title, content) {
        console.log(`${this.username} 发表了一篇文章：${title}`);
    }
}
class VIP extends User3 {
    constructor(id, username, score) {
        // this.id;
        super(id, username);
        this.score = score;
        // 必须在super调用之后才能访问 this
        console.log('子类构造函数');
    }
    postArticle(title, content, file) {
        super.postArticle(title, content);
        if (file) {
            this.postAttachment(file);
        }
    }
    postAttachment(file) {
        console.log(`${this.username} 上传了一个附件： ${file}`);
    }
}
let vip1 = new VIP(1, 'mt', 0);
vip1.postArticle('标题', '内容', '1.png');
vip1.postAttachment('1.png');
