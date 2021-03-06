export default function () {
    //获取小圆点
    const pointsNodes = document.querySelectorAll('.home-points li');
    const liNodes = document.querySelectorAll('.home-carousel li');
    const homeNode = document.querySelector('.home');

    //记录上一次下标
    let lastIndex = 0;
    //记录当前下标
    let nowIndex = 0;
    //记录上一次触发的时间
    let lastTime = 0;

    let timer = null;

    //绑定点击事件
    for (let i = 0; i < pointsNodes.length; i++) {
        pointsNodes[i].onclick = function () {
            //函数节流
            const nowTime = Date.now();
            if (nowTime - lastTime <= 2500) return;

            //将当前下标同步当前小圆点下标
            nowIndex = i;
            //点击同一个小圆点不处理
            if (nowIndex === lastIndex) return;

            if (nowIndex > lastIndex) {
                //说明点击的是右边
                liNodes[nowIndex].className = 'common-title rightShow';
                liNodes[lastIndex].className = 'common-title leftHide';
            } else {
                //说明点击是左边
                liNodes[nowIndex].className = 'common-title leftShow';
                liNodes[lastIndex].className = 'common-title rightHide';
            }

            //让上一次的小圆点清空，当前的加上active
            pointsNodes[lastIndex].className = '';
            pointsNodes[nowIndex].className = 'active';

            //同步更新上一次下标
            lastIndex = nowIndex;

            lastTime = nowTime;

        }
    }

    //自动轮播
    function autoPlay() {
        timer = setInterval(() => {
            nowIndex++;

            if (nowIndex === 4) nowIndex = 0;

            liNodes[nowIndex].className = 'common-title rightShow';
            liNodes[lastIndex].className = 'common-title leftHide';
            //让上一次的小圆点清空，当前的加上active
            pointsNodes[lastIndex].className = '';
            pointsNodes[nowIndex].className = 'active';

            //同步更新上一次下标
            lastIndex = nowIndex;

        }, 3000)
    }

    //开启自动轮播
    autoPlay();

    //绑定鼠标移入移出事件
    /*
     mouseenter mouseleave
     mouseover mouseout
     */
    homeNode.onmouseenter = function () {
        //清除轮播
        clearInterval(timer);
    }
    homeNode.onmouseleave = autoPlay;


}










