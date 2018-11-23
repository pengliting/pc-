/**
 * Created by Administrator on 2018/11/23.
 */
/**
 * 头部模块
 **/

export  default function () {
    //实现头部点击切换class
    const navNodes = document.querySelectorAll('li nav');
    const arrowNode = document.querySelector('.arrow');
    //新增
    const ulNode = document.querySelector('#content>ul');
    const contentNode = document.querySelector('#content');

    //缓存高度
    let contentHeight = contentNode.offsetHeight;
    //缓存小箭头一半的宽度
    const arrowHalfWidth = arrowNode.offsetWidth / 2;

    //代表li的下标
    let nowIndex = 0;

    //ie/google
    document.onmousewheel = wheel;
    //火狐
    document.addEventListener && document.addEventListener('DOMMouseScroll',wheel);

    let wheelTimer = null;

    //
    function wheel(event) {
         event = event || window.event;

         clearTimeout(wheelTimer);
         wheelTimer = setTimeout(() => {
             let flag = '';
             if(event.wheelDelta){
                 //ie/google
                 if(event.wheelDelta > 0){
                     flag = 'up';
                 }else{
                     flag = 'down';
                 }
             }else if(event.datail){
                 //火狐
                 if(event.detail < 0){
                     flag = 'up';
                 }else{
                     flag = 'down';
                 }
             }

             //
             switch  (flag){
                 case 'up' :
                     if(nowIndex > 0){
                         nowIndex--;
                         move(nowIndex);
                     }
                     break;
                 case 'down':
                     if(nowIndex < 4){
                         nowIndex++;
                         move(nowIndex);
                     }
                     break;
             }
         },200);
         //禁止默认行为
        event.preventDefault && event.preventDefault();
        return;
    }

    function move() {

        //清空class
        for (let j = 0;i<navNodes.length;j++){
            navNodes[j].className= '';
        }
        //点击添加active
        navliNode[nowIndex].class = 'active';

        //切换小箭头的位置
        arrowNode.style.left= navNodes[0].getBoundingClientRect().left + navNodes.offsetWidth/2 + navNodes + 'px';

        //内容区的ul的top
        ulNode.style.top = nowIndex * contentHeight + 'px';
    }

    //遍历绑定事件监听
    for(let i =0;i<navNodes.length;i++){
        navNodes[i].onclick = function () {
            nowIndex = i;
            move(nowIndex);
        }
    };

    //初始化让小箭头来到第一个li下面
    arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

    //修改小箭头位置
    window.onresize = function () {
        arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
        //修改ul的位置
        contentheight = contentNode.offsetHeight;
        ulNode.style.top = - nowIndex * contentHeight + 'px';
    }

}