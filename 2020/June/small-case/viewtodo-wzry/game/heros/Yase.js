import Hero from './Hero.js'

import S11610 from '../skills/yase/s11610.js'
import S11620 from '../skills/yase/s11620.js'
import S11630 from '../skills/yase/s11630.js'
import Skins1 from '../skins/yase/skins1.js'
import Skins2 from '../skins/yase/skins2.js'
import Skins3 from '../skins/yase/skins3.js'
export default class Yase extends Hero {
    constructor() {
        super("亚瑟", [new S11610,new S11620,new S11630], "sources/heros/yase1.png")
        // this.name = "亚瑟";
        // // 技能
        // this.skills = [new S11610,new S11620,new S11630];
        // this.ico = "sources/heros/yase1.png"
        // 皮肤 
        this.skins = [new Skins1, new Skins2, new Skins3];
    }
    fire(){
        console.log("开火....")
    }
}