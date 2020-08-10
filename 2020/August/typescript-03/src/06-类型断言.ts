let img = document.querySelector('#img');
if (img) {
    //...
    // img.src  // err

    // 类型断言 1
    (<HTMLImageElement>img).src;

    // 类型断言 2
    (img as HTMLImageElement).src;
}