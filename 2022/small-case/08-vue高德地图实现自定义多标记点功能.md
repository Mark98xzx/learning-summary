## vue 高德地图实现自定义多标记点功能

- 首先安装 ：npm i @amap/amap-jsapi-loader --save
- 在使用地图的页面 引入：import AMapLoader from ‘@amap/amap-jsapi-loader’;
- 处理单标记：
    ```js
        import AMapLoader from '@amap/amap-jsapi-loader';
        export default {
            data() {
                    return {
                        map: null,
                    }
            },
            mounted() {
                this.initMap();
            },
            methods: {
                // 初始化地图
                initMap() {
                    AMapLoader.load({
                            key: "XXXX",             // 申请好的Web端开发者Key，首次调用 load 时必填
                            version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                            plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                    }).then((AMap) => {
                            this.map = new AMap.Map("container", {  //设置地图容器id
                                viewMode: "3D",    //是否为3D地图模式
                                zoom: 18,           //初始化地图级别
                                center: [113.932497, 22.540517], //初始化地图中心点位置
                            });
                            var marker = new AMap.Marker({
                                position: new AMap.LngLat(113.932497,
                                        22.540517), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                content: `
                                        <div class="my_marker">
                                            <div class="showLog">
                                                SOS 
                                            </div>
                                            <div class="marker">
                                                    <div class="title">
                                                        <img src="https://img.vinua.cn/images/jkGv.png" alt="">
                                                    </div>
                                            </div>
                                            
                                            
                                        </div>`,

                                // icon: 'https://s1.ax1x.com/2022/05/27/XeLFGn.png', // 添加 Icon 图标 URL
                                offset: new AMap.Pixel(-15, -20),

                            });
                            // var circle = new AMap.Circle({
                            // 		center: new AMap.LngLat("113.934497", "22.540517"), // 圆心位置
                            // 		radius: 10, //半径
                            // 		strokeColor: "#1aec1a", //线颜色
                            // 		strokeOpacity: 1, //线透明度
                            // 		strokeWeight: 1, //线粗细度
                            // 		fillColor: "#1aec1a", //填充颜色
                            // 		fillOpacity: 0.35 //填充透明度
                            // 	});
                            // 将创建的点标记添加到已有的地图实例：
                            this.map.add([marker]);
                    }).catch(e => {
                            console.log(e);
                    })
                },
            }
        }

    ```

- 处理多标记：
    ```js
    // 初始化地图
    initMap() {
        let arr = [[117.517694,32.414674],[111.145623,27.583686],[113.474725,30.692175]];
        AMapLoader.load({
            key: "xxxx",              // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0",                                       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [''],                                         // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap) => {
            this.map = new AMap.Map("container", {                   //设置地图容器id
                viewMode: "3D",                                       //是否为3D地图模式
                zoom: 5,                                               //初始化地图级别
                center: [112.886125, 28.130778],                         //初始化地图中心点位置
            });
            // 循环所有的标记点
            for( let i =0; i <  arr.length; i++) {
                var marker = new AMap.Marker({
                    position: arr[i],                                        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    map:this.map,
                    content: `
                        <div class="my_marker">
                                <div class="marker">
                                    ${this.winBox}所
                                </div>
                                
                        </div>`,
                    offset: new AMap.Pixel(-15, -20),

                });
                // 将创建的点标记添加到已有的地图实例：
                this.map.add([marker]);
        
            }
            
            //矩形
            // var circle = new AMap.Circle({
            // 		center: new AMap.LngLat("113.934497", "22.540517"), // 圆心位置
            // 		radius: 10, //半径
            // 		strokeColor: "#1aec1a", //线颜色
            // 		strokeOpacity: 1, //线透明度
            // 		strokeWeight: 1, //线粗细度
            // 		fillColor: "#1aec1a", //填充颜色
            // 		fillOpacity: 0.35 //填充透明度
            // 	});
        }).catch(e => {
            console.log(e);
        })
    },

    ```