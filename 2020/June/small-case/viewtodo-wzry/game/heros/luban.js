import Hero from './Hero.js'

import B11210 from '../skills/luban/b11210.js'
import B11220 from '../skills/luban/b11220.js'
import B11230 from '../skills/luban/b11230.js'

import Skin1 from '../skins/luban/skin1.js'
import Skin2 from '../skins/luban/skin2.js'
import Skin3 from '../skins/luban/skin3.js'
export default class Luban extends Hero {
    constructor() {
        super("鲁班", [new B11210, new B11220, new B11230],"sources/heros/luban1.png")
        // this.name = "鲁班";
        // // 技能
        // this.skills = [new B11210, new B11220, new B11230];
        // this.ico = "sources/heros/luban1.png"
        // 皮肤 S
        this.skins = [new Skin1, new Skin2, new Skin3];
    }S
}