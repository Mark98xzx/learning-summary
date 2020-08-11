function css(el: HTMLElement, attr: string, val?: any) {
    //...
}

let div = document.querySelector('div');

div && css(div, 'width', '100px');
div && css(div, 'width');