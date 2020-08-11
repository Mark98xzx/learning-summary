// function showOrHide(el: HTMLElement, attr: 'display'|'opacity', value: 'block'|'none'|number) {
//     // 
// }
function showOrHide(el, attr, value) {
    // 
}
let div1 = document.querySelector('div1');
if (div1) {
    showOrHide(div1, 'display', 'block');
    showOrHide(div1, 'display', 'none');
    showOrHide(div1, 'opacity', 1);
    showOrHide(div1, 'opacity', 'block');
}
