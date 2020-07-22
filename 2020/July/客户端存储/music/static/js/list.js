window.onload = function(){
    //控制添加按钮显示或者隐藏；
    let uls = document.querySelectorAll(".listContainer");
    let spans = document.querySelectorAll(".btnController");
    uls.forEach((v,k)=>{
        v.onmouseover = function(){
            spans.forEach((value,key)=>{
                if((key+1)==k){
                    spans[key].style.display = "block";
                }else{
                    spans[key].style.display = "none";
                }
            })
        }
    })



    //设置localStorage；
    // localStorage.setItem("test","测试文字");
    // localStorage.setItem("test1","测试文字1");
    //读取localStorage；
    // console.log(localStorage.getItem("test"));
    //清除localStorage
    // localStorage.removeItem("test");
    //清除所有localStorage
    // localStorage.clear();
    // document.cookie = "test2=test2;Max-Age=3600";
    // console.log(document.cookie);
    let colorArr = ["white","rgb(204,232,207)", "rgb(200,200,169)", "rgb(114,111,128)"];
    let key = 0;
    // if(getCookie("key")){
    //     key = getCookie("key");
    // }
    if(localStorage.getItem("key")){
        key = localStorage.getItem("key");
    }
    document.body.style.background = colorArr[key];
    document.querySelector(".changeSkin").onclick = function(){
        key++;
        key = key>3?0:key;
        // setCookie("key",key,{
        //     "Max-Age":3600*24
        // });
        localStorage.setItem("key",key);
        document.body.style.background = colorArr[key];
    }
}
//设置cookie方法
function setCookie(name,value,options={}){
    let cookieData = `${name}=${value};`;
    for(let key in options){
        let str = `${key}=${options[key]};`;
        cookieData += str;
    }
    document.cookie = cookieData;
}

//获取cookie方法；
function getCookie(name){
    let arr = document.cookie.split("; ");
    for(let i =0;i<arr.length;i++){
        let arr2 = arr[i].split("=");
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return "";
}

function showDetail(musicData){
    // console.log(musicData);
    if(localStorage.getItem("musicData")){
        //除重
        let localData = JSON.parse(localStorage.getItem("musicData"));
        if(!localData.find(v=>v.id==musicData.id)){
            localData.push(musicData);
            localStorage.setItem("musicData",JSON.stringify(localData));
        }

    }else{
        localStorage.setItem("musicData",JSON.stringify([musicData]));
    }
    //开启详细页面
    //储存音乐信息；
    if(!localStorage.getItem("isOpen")){
        window.open("/detail");
    }
    
   

}

