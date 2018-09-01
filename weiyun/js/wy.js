//----------------------------获取元素---------------------------------------------

//左侧菜单结构容器
var dataMenu = document.querySelector('#content .content-structure-first');
//右侧存放文件夹的容器
var havaFolder = document.querySelector('#content .item-main .havathing');
//找到右侧导航
var navBox = document.querySelector('.item-nav .nav-box');
//获取全选
var allClick = document.getElementById('allclick');
//获取删除按钮
var deleteBtn = document.getElementsByClassName('btn-box-delete')[0];
//获取询问框
var ask = document.getElementById('ask');
//文件夹里的选中按钮
var aClick = havaFolder.getElementsByTagName('a');
//文件夹里面的重命名输入框
var renameInp = havaFolder.getElementsByTagName('input');
//文件夹里面的名称
var floderSpan = havaFolder.getElementsByTagName('span');
//询问框关闭按钮
var closeBtn = ask.getElementsByClassName('close-btn')[0];
//询问框确定按钮
var yesBtn = ask.getElementsByClassName('btn-yes')[0];
//询问框取消按钮
var noBtn = ask.getElementsByClassName('btn-no')[0];
//找到dataMenu下所有的span和父级div
var menuSpans = dataMenu.getElementsByTagName('span');
var menuDivs = dataMenu.getElementsByTagName('div');
//获取选框活动区域
var boxDis = document.getElementsByClassName('item-main')[0];
//获取重命名
// var renameBtn = document.getElementsByClassName('btn-box-rename')[0];
//获取移动到
var mobileBtn = document.getElementsByClassName('btn-box-mobile')[0];
//获取新建
var newBtn = document.getElementsByClassName('btn-box-newFolder')[0];
//获取移动询问弹框
var storeBox = document.getElementById('store');
//移动询问关闭按钮
var storeCloseBtn = storeBox.getElementsByClassName('store-close')[0];
//移动取消按钮
var storeNoBtn = storeBox.getElementsByClassName('store-no')[0];
//移动确定按钮
var storeYesBtn = storeBox.getElementsByClassName('store-yes')[0];
// 移动文件夹的父级显示
var mobileFolderParent = storeBox.getElementsByClassName('folder-form')[0];
//获取移动询问框树状结构容器
var mobileBox = document.getElementsByClassName('store-item-content')[0];
//询问树状容器下的span
var mobileSpan = mobileBox.getElementsByTagName('span');
//提示成功的弹框
var yesBox = document.getElementsByClassName('item-yes')[0];
//提示成功的文字
var yesText = yesBox.getElementsByClassName('yes-text')[0]; 
// 选择前提醒
var chooseBox = document.getElementsByClassName('item-choose')[0];
//提示选择的文字
var chooseText = document.getElementsByClassName('choose-text')[0]; 
//遮罩
var mask = document.getElementById('mask');

// ---------------------------定义变量----------------------------------

//默认左侧渲染变量
var dataNum = -1;

// --------------------------左侧菜单结构渲染-------------------------------------

//左侧菜单调用函数生成结构
dataMenu.innerHTML = createTreeHtml(dataNum,-1);

// ---------------------------默认样式-----------------------------------------

//添加class来分辨有没有内容
for(var i=0; i<menuSpans.length; i++){
    //如果span有兄弟节点，就给span添加对应的className，反之亦然
    if(menuSpans[i].parentNode.nextElementSibling){
        menuSpans[i].className = 'ofolderup';
    }
}
//havaFolder的默认出现的文件夹
havaFolder.innerHTML = addFolderBoxHtml(0);
//导航默认
navBox.innerHTML = addNavHtml(0); 
//左侧树状结构默认
menuDivs[0].classList.add('divsBC');

// -------------------------------左侧菜单div--------------------------------------------

//div的事件委托函数
fn.on(dataMenu,'click',function(ev){
    storeBox.style.display = 'none';
    //找到点击的元素
    var target = ev.target;
    //让所有的点到的东西都是div
    if(ev.target.nodeName === 'Li'){
        target = ev.target.firstElementChild;
    }else if(ev.target.nodeName === 'SPAN'){
        target = ev.target.parentNode;
    }
    //所有的div把divsBC这个样式名去掉
    for(var i=0; i<menuDivs.length; i++){
        menuDivs[i].classList.remove('divsBC');
    }
    //当前点击的div添加class
    target.classList.add('divsBC');
    fnUse(target);
    allClick.className = 'noclick';
})

// ----------------------------------右侧导航a--------------------------------------------------

//右侧导航a事件委托函数
fn.on(navBox,'click',function(ev){
    storeBox.style.display = 'none';
    //如果点到的是可以点击的
    var target = ev.target;
    if(target.nodeName === 'A'){
        //右侧导航始终跟随当前点击的span的父级的data-id变化,右侧的内容区域结构
        fnUse(target);
        allClick.className = 'noclick';
    }
    for(var i=0; i<menuDivs.length; i++){
        menuDivs[i].classList.remove('divsBC');
    }
    for(var i=0; i<menuDivs.length; i++){
        if(menuDivs[i].dataset.id == target.dataset.id){
             //对应的左侧菜单高亮
            menuDivs[i].classList.add('divsBC');
        }
    }
})

// --------------------------------右侧文件夹div------------------------------------------

//右侧内容区域文件点击事件委托函数
fn.on(havaFolder,'click',function(ev){
    storeBox.style.display = 'none';
    //先把点到的变化为整个div
    var target = ev.target;
    if(ev.target.nodeName === 'EM'||ev.target.nodeName === 'SPAN'){
        target = ev.target.parentNode;
    }else if(ev.target.nodeName === 'A'){
        // ---------------------------单选------------------------------------------
        target = ev.target;
        //如果是没有点击的就变为点击
        if(target.classList.contains('noclick')){
            target.className = 'click';
        }else{
            target.className = 'noclick';
        }
        //调用函数，判断全选是不是应该变为点击
        allBtn();
        //父级变动
        bgcSwitch(target.parentNode,target,'#fff','#000','block')
    }else if(ev.target.nodeName === 'INPUT'){
        //点击的是input的话获取焦点
        ev.target.focus();
        //把选中效果去掉
        var m = ev.target.value;
        ev.target.value = '';
        ev.target.value = m;
    }
    //右侧导航始终跟随当前点击的span的父级的data-id变化,右侧的内容区域结构
    if(target.nodeName === 'DIV'){
        fnUse(target);
        for(var i=0; i<menuDivs.length; i++){
            menuDivs[i].classList.remove('divsBC');
        }
        for(var i=0; i<menuDivs.length; i++){
            if(menuDivs[i].dataset.id == target.dataset.id){
                //对应的左侧菜单高亮
                menuDivs[i].classList.add('divsBC');
            }
        }
    }
})

// -------------------------------右侧文件移入移出-------------------------------------------------------

fn.on(havaFolder,'mouseover',function(ev){
    var target = ev.target;
    //始终在div上面移入才会有样式
    if(ev.target.nodeName === 'A'||ev.target.nodeName === 'SPAN'||ev.target.nodeName === 'EM'){
        target = ev.target.parentNode;
    }
    if(target.nodeName === 'DIV'){
        //移入的封装函数
        bgcSwitch(target,target.firstElementChild,'#fff','#000','block');
    }
})
fn.on(havaFolder,'mouseout',function(ev){
    var target = ev.target;
    //始终为div
    if(ev.target.nodeName === 'A'||ev.target.nodeName === 'SPAN'||ev.target.nodeName === 'EM'){
        target = ev.target.parentNode;
    }
    //判断有没有点击，没有的话就清除样式
    if(target.nodeName === 'DIV'){
        if(target.firstElementChild.classList.contains('noclick')){
            bgcSwitch(target,target.firstElementChild,'#ebeff0','transparent','none');
        }
    }
})

// ---------------------------------------全选----------------------------------------------

allClick.onclick = function(){
    //如果当前页面下有文件才会执行
    if(aClick.length>0){
        //没有点击的时候点击当前变为点击，并且下面的文件变样子
         if(this.classList.contains('noclick')){
            this.className = 'click';
            for(var i=0; i<aClick.length; i++){
                aClick[i].className = 'click';
                bgcSwitch(aClick[i].parentNode,aClick[i],'#fff','#000','block');
            }
        }else{
            //没有点击的时候清除样式
            this.className = 'noclick';
            for(var i=0; i<aClick.length; i++){
                aClick[i].className = 'noclick';
                bgcSwitch(aClick[i].parentNode,aClick[i],'#ebeff0','transparent','none');
            }
        }
    }
    
}

// ----------------------------------框选-----------------------------------------------------------------

//找到文件夹的父级left和top值
var boxX = getEl(boxDis).left;
var boxY = getEl(boxDis).top;
document.body.onmousedown = function(ev){
    //创建节点
    var div = document.createElement('p');
    //存值
    var disX = ev.clientX-boxX;
    var disY = ev.clientY-boxY-18;
    document.body.onmousemove = function(ev){
        if(Math.abs(ev.clientX - disX - boxX) > 100 || Math.abs(ev.clientY - disY - boxY-18) > 100){
            //给节点添加名字
            div.classList.add('box');
            //放入节点
            havaFolder.appendChild(div);
            //创建的节点的定位值
            div.style.left = disX + 'px';
            div.style.top = disY + 'px';
            //创节点素的宽高和定位值
            div.style.width = Math.abs(ev.clientX - disX - boxX) + 'px';
            div.style.height = Math.abs(ev.clientY - disY - boxY-18) + 'px';
            div.style.left = Math.min(disX,ev.clientX-boxX) + 'px';
            div.style.top = Math.min(disY,ev.clientY-boxY-18) + 'px';
            //看看是不是框到了
            for(var i=0; i<aClick.length; i++){
                //框到了文件变为点击
                if(isDuang(div,aClick[i].parentNode)){
                    aClick[i].className = 'click';
                    allBtn();
                    bgcSwitch(aClick[i].parentNode,aClick[i],'#fff','#000','block');
                }else {
                    //否则就是没点击
                    aClick[i].className = 'noclick';
                    allBtn();
                    bgcSwitch(aClick[i].parentNode,aClick[i],'#ebeff0','transparent','none');
                }
            }
        }
    }
    document.body.onmouseup = function(){
        //移出节点
        div.remove();
        document.body.onmousemove = document.body.onmouseup = null;
    }
    return false;
}

// ----------------------------------删除----------------------------------------------------------

//判断应不应该显示删除提示框
deleteBtn.onclick = function(){
    //如果有选中的
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            ask.style.zIndex = 1;
            displayOrNo(ask,mask,'block');
            return;
        }
    }
    info(chooseText,chooseBox,'没有选中文件！请选择文件！');
}
//右上角关闭点击删除框消失
closeBtn.onclick = function(){
    displayOrNo(ask,mask,'none');
}
//取消点击关闭删除框
noBtn.onclick = function(){
    displayOrNo(ask,mask,'none');
}
//确定删除
yesBtn.onclick = function(){
    //存一个值，显示删除后应该显示的地方
    var m = -10;
    //删除勾选中的文件的数据
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            for(var d in data){
                if(data[d].id == aClick[i].parentNode.dataset.id){
                    m = data[d].pid;
                    var num = data[d].id;
                    delete data[d];
                    delChild(num);
                }
            }
        }
    }
    //全选变为没选中
    allClick.className = 'noclick';
    //弹框消失
    displayOrNo(ask,mask,'none');
    newHtml(m);
    info(yesText,yesBox,'删除文件成功！');
}

// ------------------------------------新建文件夹---------------------------------------------

newBtn.onclick = function(ev){
    //重新渲染结构，一直点击只能生成一个文件夹，成功了才能再创建
    //首先找到要所在目录，存下来id来充当新建文件数据的pid，也用来判断有没有子项
    for(var i=0; i<menuDivs.length; i++){
        if(menuDivs[i].classList.contains('divsBC')){
            var id = menuDivs[i].dataset.id;
        }
    }
    //渲染
    newHtml(id);
    //全选消失
    allClick.className = 'noclick';
    mask.style.display = 'block';
    //创建节点
    var div = document.createElement('div');
    div.innerHTML = `<a href="javascript:;" class="click"></a>
                    <em></em>
                    <input id="inp" type="text" value="" style="display:block;">`;
    var num = 0;
    //给个classname一会儿再body点击的时候会用到
    div.className = 'into';
    div.style.zIndex = 1;
    //遍历对象，看看当前这个目录下有没有子项
    for(var i in data){
        if(data[i].pid == id){
            num++;
        }
    }
    //如果有子项，就直接放进去节点
    if(num > 0){}else{
        //没有子项的话里面有个页面，先清空掉，在插入
        havaFolder.innerHTML = '';
    }
    havaFolder.appendChild(div);
    bgcSwitch(div,div.firstElementChild,'#fff','#000','block');
    inp.focus();
    //插入节点，及相应样式，并且让input获取焦点
    havaFolder.appendChild(div);
    bgcSwitch(div,div.firstElementChild,'#fff','#000','block');
    inp.focus();
    //创建文件数据
    document.body.onclick = function(ev){
        //如果不是点击的是这个文件夹不执行下面的代码
        if(ev.target.className === 'into'||ev.target.parentNode.className === 'into'){
            return;
        }
        //先存下来input的value
        var va = inp.value;
        //创建一个空数组，来存放当前显示的文件夹的名字，用来判断是否重复了
        var names = [];
        //定义变量来判断是否重复
        var m = 0;
        //存名字
        for(var i=0; i<floderSpan.length; i++){
            names.push(floderSpan[i].innerHTML);
        }
        //获取时间
        var d = Date.now();
        //如果创建的额文件夹名字是空的，那么直接重新生成结构，并提示没有名字重新创建
        if(va === ''){
            div.remove();
            newHtml(id);
            info(chooseText,chooseBox,'没有文件名！请重新创建！');
            //body点击事件取消
            document.body.onclick = null;
        }else{
            //有名字的话开始判断
            //判断是否重名
            for(var i=0; i<names.length; i++){
                if(names[i] == va){
                    m++;
                }
            }
            //如果没有重名，创建成功
            if( m === 0){
                //保存创建文件的数据到对象里面
                data[d] = { id:d,
                            pid:id,
                            title:va};
                //重新渲染
                newHtml(id);
                //提示成功
                info(yesText,yesBox,'创建文件成功！');
            }else{
                //重名了，提示重名，重新创建
                div.remove();
                newHtml(id);
                info(chooseText,chooseBox,'文件名称重复了！请重新创建！');
            }
        }
        mask.style.display = 'none';
        //body点击事件取消
        document.body.onclick = null;
        //阻止传播
        ev.stopPropagation();
    }
    //阻止传播
    ev.stopPropagation();
}

// ---------------------------------------移动到---------------------------------------------

mobileBtn.onclick = function(){
    //先判断有没有选中的文件夹
    var m = 0;
    var id = -10;
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            id = aClick[i].parentNode.dataset.id;
            m++;
        }
    }
    if(m>0){
        //如果有选中的文件夹才会弹出来选择弹框
        storeBox.style.zIndex = 1;
        displayOrNo(storeBox,mask,'block')
        mobileBox.innerHTML = createTreeHtml(dataNum,-1);
        for(var i=0; i<mobileSpan.length; i++){
            //如果span有兄弟节点，就给span添加对应的className，反之亦然
            if(mobileSpan[i].parentNode.nextElementSibling){
                mobileSpan[i].className = 'mobilespancss';
            }
        }
        var pid = data[id].pid;
        mobileFolderParent.innerHTML = data[pid].title;
    }else{
        info(chooseText,chooseBox,'没有选中文件！请选择文件！');
    }
    
}
//弹框消失
storeCloseBtn.onclick = function(){
    displayOrNo(storeBox,mask,'none')
}
//弹框消失
storeNoBtn.onclick = function(){
    displayOrNo(storeBox,mask,'none')
}
//定义变量存变色的span，来清空
var clickSpan = null;
//点击高亮事件委托
var rightDivId = 0;
var btnState = false;
fn.on(mobileBox,'click',function(ev){
    var target = ev.target;
    if(target.nodeName === 'DIV'){
        target = ev.target.firstElementChild;
    }
    if(target.nodeName === 'SPAN'){
        if(clickSpan){
            clickSpan.classList.remove('fontcolor')
        }
        target.classList.add('fontcolor');
        clickSpan = target;
        btnState = false;
        //定义空数组存想存入的对象的所有的父项
        var childPid =[];
        //存想移入的数据id
        var id = -10;
        for(var f=0; f<mobileSpan.length; f++){
            if(mobileSpan[f].classList.contains('fontcolor')){
                id = mobileSpan[f].parentNode.dataset.id;
            }
        }
        //找到想移入的数据的所有的父项
        childPid = addNavData(id);
        //想要移动的文件的id
        var nowFolderId = 0;
        //通过循环，如果移动的文件是想移入的文件的父项，晴重新移动
        for(var j=0; j<aClick.length; j++){
            if(aClick[j].classList.contains('click')){
                var aPaid = aClick[j].parentNode.dataset.id;
                nowFolderId = aPaid;
                for(var l=0; l<childPid.length; l++){
                    if(childPid[l].id == aPaid){
                        btnState = false;
                        info(chooseText,chooseBox,'不能移动到自身及子项下面！请重新选择！');
                        return;
                    }
                }
            }
        }
        //不能有重名
        var names = [];
        for(var y=0; y<aClick.length; y++){
            if(aClick[y].classList.contains('click')){
                var zid = aClick[y].parentNode.dataset.id;
                names.push(data[zid].title)
            }
        }
        var childName = [];
        for(var p in data){
            if(data[p].pid == id){
                childName.push(data[p].title)
            }
        }
        for(var i=0; i<names.length; i++){
            for(var j=0; j<childName.length; j++){
                if(names[i] == childName[j]){
                    info(chooseText,chooseBox,'选中的文件夹下面有相同的名字！请重新选择！');
                    return;
                }
            }
        }
        //如果想移动的文件夹已经在那个文件的下面了，提醒并重新选择想移动到的文件夹
        if(data[nowFolderId].pid == id){
            btnState = false;
            info(chooseText,chooseBox,'已经在这个文件夹下面了！请重新选择！');
            return;
        }
        //上面都通过的话就可以点击确定按钮
        btnState = true;
        rightDivId = id;
    }
})
storeYesBtn.onclick = function(){
    if(btnState){
        //如果不是移动到子项里面，就把移动的文件的pid改为想移入文件的id
        for(var i=0; i<aClick.length; i++){
            if(aClick[i].classList.contains('click')){
                var num = aClick[i].parentNode.dataset.id;
                data[num].pid = rightDivId;
            }
        }
        //重新渲染解耦股
        newHtml(rightDivId);
        //提示修移入成功
        displayOrNo(storeBox,mask,'none')
        info(yesText,yesBox,'移动文件成功！');
    }else{
        return;
    }
}

// ----------------------------------------重命名--------------------------------------------

renameBtn.onclick = function(ev){
    //定义变量存想要改变的名字的文件夹的数据id
    var inputNum = -1;
    //存值用来判断有没有勾选中的文件夹
    var m = 0;
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            m++;
        }
    }
    //如果有选中的文件夹，就存下来那个值，如果有多个，直接存第一个，然后退出循环
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            inputNum = i;
            i = aClick.length+1;
        }
    }
    //如果有选中的文件夹
    if(m!=0){
        //如果选中多个，提示下，并且默认更改第一个选中的文件夹的名字
        if(m>1){
            info(chooseText,chooseBox,'一次只能修改一个文件夹的名字！');
            for(var i=0; i<aClick.length; i++){
                aClick[i].className = 'noclick';
                bgcSwitch(aClick[i].parentNode,aClick[i],'#ebeff0','transparent','none');
            }
            //重新渲染结构
            allBtn();
        }
        //第一个的样式
        aClick[inputNum].className = 'click';
        bgcSwitch(aClick[inputNum].parentNode,aClick[inputNum],'#fff','#000','block');
        mask.style.display = 'block';
        aClick[inputNum].parentNode.style.zIndex = 1;
        //input显示。span隐藏
        renameInp[inputNum].style.display = 'block';
        floderSpan[inputNum].style.display = 'none';
        //input默认文字为span里的文字
        renameInp[inputNum].value = floderSpan[inputNum].innerHTML;
        //默认input文字选中
        renameInp[inputNum].select();
        //input获取焦点
        renameInp[inputNum].focus();
    }else{
        //没有选中的文件夹的话直接退出
        info(chooseText,chooseBox,'没有选中文件！请选择文件！');
        return;
    }
    document.body.onclick = function(ev){
        //点击的是文件夹本身的话直接退出
        if(ev.target.className === 'into'||ev.target.parentNode.className === 'into'){
            return;
        }
        //存值
        var n = inputNum;
        var m = aClick[inputNum].parentNode.dataset.id;
        //空数组存名字
        var spanInner = [];
        //定义变量来判断是不是重名了
        var l = 0;
        //如果input是空的，提示没有名字，恢复修改状态
        if(renameInp[n].value === ''){
            info(chooseText,chooseBox,'没有输入文件夹名字！请重新命名！');
            newHtml(data[m].pid);
            document.body.onclick = null;
        }else{
            //找到所有的名字，添加到空数组里面
            for(var i=0; i<floderSpan.length; i++){
                if(n !== i){
                    spanInner.push(floderSpan[i].innerHTML);
                }
            }
            //判断是不是重名了
            for(var i=0; i<spanInner.length; i++){
                if(renameInp[n].value == spanInner[i]){
                    l++;
                }
            }
            //如果没有重名
            if(l == 0){
                //获取修改的文件的id
                var id = aClick[n].parentNode.dataset.id;
                //修改数据
                data[id].title = renameInp[n].value;
                //获取当前所在的文件夹id用来渲染
                var pid = data[id].pid;
                newHtml(pid);
                //body的点击事件处理为空
                document.body.onclick = null;
                mask.style.display = 'none';
                //提示重命名成功了
                info(yesText,yesBox,'重新命名成功！');
            }else{
                info(chooseText,chooseBox,'输入文件夹名字重复！请重新输入！');
            }
        }
        mask.style.display = 'none';
        ev.stopPropagation();
    }
    ev.stopPropagation();
}

