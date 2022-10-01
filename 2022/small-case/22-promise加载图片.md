### promise 加载图片

- 实现一个图片的加载；设置第一张图片加载1s之后加载第二张图片

```js
    // 获取 body 元素
    let el = document.querySelector('body');

    // 设置一个函数,把图片的url地址作为参数
    function imgFn(url) {
        // 实例化 promise 对象
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 建立图像对象
                let img = document.createElement('img');
                // 设置图片url地址
                img.setAttribute('src', url);
                // 把图片插入到 body 节点中
                el.append(img);
                // 图片加载完成后执行 resolve
                img.onload = () => {
                    console.log('加载成功');
                    
                    resolve();
                }
                img.onerror = () => {
                    console.log('加载失败')
                    reject('加载失败！')
                }
                console.log('img', img)
            }, 1000)
        })
    }

    imgFn('https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&app=138&size=w400&n=0&f=JPEG').then(function(){
        console.log(2);
        return imgFn('https://img1.baidu.com/it/u=3009731526,373851691&fm=253&app=138&size=w400&n=0&f=JPEG')
    }).then(function(){
        console.log(3)
        // return imgFn('https://img0.baidu.com1/it/u=922902802,2128943538&fm=253&app=120&size=w931&n=0&f=JPEG')
        return imgFn('https://img0.baidu.com/it/u=922902802,2128943538&fm=253&app=120&size=w400&n=0&f=JPEG')
    }).catch((err) => {
        console.log('err', err)
    })

```

#### 补充

- js校验图片是否加载成功或失败
  - onload ：事件会在页面或图像加载完成后立即发生。
  - onerror： 事件在加载外部文件（文档或图像）发生错误时触发。
