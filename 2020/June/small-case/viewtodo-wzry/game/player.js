import Yase from './heros/Yase.js';
import Luban from './heros/luban.js'

export default class Player{
    constructor(name){
        this.name = name;
        // 英雄
        this.heros = [new Yase, new Luban];
    }
}