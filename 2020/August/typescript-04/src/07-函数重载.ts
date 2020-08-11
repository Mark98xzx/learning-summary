// function showOrHide(el: HTMLElement, attr: 'display'|'opacity', value: 'block'|'none'|number) {
//     // 
// }






function showOrHide(ele: HTMLElement, attr: 'display', value: 'block'|'none');
function showOrHide(ele: HTMLElement, attr: 'opacity', value: number);
function showOrHide(el: HTMLElement, attr: any, value: any) {
    // 
}


let div1 = document.querySelector('div1');

if (div1) {

    showOrHide(div1, 'display', 'block');
    showOrHide(div1, 'display', 'none');
    showOrHide(div1, 'opacity', 1);

    showOrHide(div1, 'opacity', 'block');

}