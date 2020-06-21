import MyEvent from '../myEvent.js'


// 英雄基类

export default class Hero extends MyEvent{
    constructor(name, skills, ico){
        super()
        this.name = name;
        this.skills = skills;
        this.ico = ico;

        // 自定义事件绑定
        this.addEvent("heroInit", this.init)
    }
    init(){
        console.log("初始化...")
    }
}