(function flexible(window,document){//立即函数,两个参数 window  document; 
    //获取html的根元素
    let  docE1 = document.documentElement;
    //dpr 物理像素比
    //在pc端为1 , 在移动端为2
    let dpr = window.devicePixelRatio || 1;
    function setBodyFontSize(){
        if(document.body){//如果页面中有body ,则给body设置元素
            document.body.style.fontSize = (12 * dpr) + 'px';
        }else{//如果提早执行js,添加一个监听事件,等页面主要的dom元素加载完毕,设置body大小
            document.addEventListener('DOMCountentLoaded',setBodyFontSize);
        }
    }
    setBodyFontSize();

    // 设置html 元素的文字大小
    function setRemUnit(){
        let rem = docE1.clientWidth / 10;//把屏幕划分成10等分,
        docE1.style.fontSize = rem + 'px';
    }
    setRemUnit();
    // 页面大小发生变化 重新计算 rem的大小
    window.addEventListener('resize',setRemUnit);
    // pageshow页面重新加载的时候触发.无论页面是否来至缓存
    window.addEventListener('pageshow',function(e){
        if(e.persisted){//persisted是否来至缓存, true 为缓存取来的
            setRemUnit();
        }
    });
    // 有些浏览器不支持0.5像素的写法,用下面的写法
    if(dpr >= 2){
        let fakeBody = document.createElement('body');
        let testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docE1.appendChild(fakeBody);
        if(testElement.offsetHeight === 1){
            docE1.classList.add('hairlines');
        }
        docE1.removeChild(fakeBody);
    }
}(window,document));