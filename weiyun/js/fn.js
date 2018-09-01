//事件处理封装函数
var fn = (function (){
	function on(element,evName,evFn){
		element.addEventListener(evName,evFn);	
	}
	function off(element,evName,evFn){
		element.removeEventListener(evName,evFn);	
	}
	return {
		on:on,
		off:off
	}
})()
//获取样式属性值
function getEl(el){
    return el.getBoundingClientRect();
}
//颜色变化
function bgcSwitch(el,el2,bgc1,bgc2,state){
    el.style.backgroundColor = bgc1;
    el.style.borderColor = bgc2;
    el2.style.display = state;
}
//引用函数
function fnUse(el){
    //找到要用的id
    var tnd = el.getAttribute('data-id');
    //把id传进去，右下面内容区域的生成
    havaFolder.innerHTML = addFolderBoxHtml(tnd);
    //导航跟随变化,调用函数，生成上面的导航
    navBox.innerHTML = addNavHtml(tnd);
}
//获取父级对象的函数
function addNavData(n){
    //定义一个空数组
    var arr = [];
    //存当前传进来的数对应的对象
    var dataPid = data[n];
    //如果有这个对象
    if(dataPid){
        //把这个对象存进数组里面
        arr.push(dataPid)
        //回调函数，如果有上一级，存下来，并且把数组合并
        arr = arr.concat(addNavData(dataPid.pid))
    }
    //返回当前的数组
    return arr;
}
//右侧导航的生成函数
function addNavHtml(n){
    var arr = addNavData(n).reverse();
    //定义一个空字符串
    var navHtml = '';
    //循环传进来的数组生成结构
    for(var i=0; i<arr.length-1; i++){
        navHtml += `<a href="javascript:;" data-id="${arr[i].id}">${arr[i].title}</a>`;
    }
    //数组最后一个变成span为不能点击的状态
    navHtml += `<span class="nav-span" data-id="${arr[arr.length-1].id}">${arr[arr.length-1].title}</span>`;
    //返回这个字符串
    return navHtml;
}
//获取子项对象的函数
function addFolderBoxData(n){
    //定义一个空数组
    var arr = [];
    //保存这个传进来的参数对应的对象
    var thisChild = data[n];
    //如果有这个对象
    if(thisChild){
        //遍历这个对象
        for(var i in data){
            //如果有对象的pid是等于当前这个对象的id的，说明是当前对象的子项
            if(data[i].pid == thisChild.id){
                //把这个对象存到上面定义的数组里面
                arr.push(data[i]);
            }
        }
    }
    //返回这歌数组
    return arr;
}
//右侧内容区域的生成函数
function addFolderBoxHtml(n){
    var arr = addFolderBoxData(n)
    //定义一个空的字符串
    var FolderBoxHtml = '';
    //如果传进来有内容
    if(arr.length > 0){
        //开始循环这个数组生成结构
        for(var i=0; i<arr.length; i++){
            FolderBoxHtml +=`<div data-id="${arr[i].id}" class="into">
                                <a href="javascript:;" class="noclick"></a>
                                <em></em>
                                <span>${arr[i].title}</span>
                                <input type="text" value="">
                            </div>`;
        }
    }else{
        //这是没有内容的时候，生成另一个结构
        FolderBoxHtml +=`<section class="nothing">
                            <section class="nothing-bgi"></section>
                            <section class="nothing-no">暂无文件</section>
                            <section class="nothing-text">请点击左上角的“上传”按钮添加</section>
                        </section>`;
    }
    //返回这个字符串
    return FolderBoxHtml;
}
// 碰撞检测函数
function isDuang(box1,box2){
    var getBox1Rect = getEl(box1);
    var getBox2Rect = getEl(box2);
    if( 	
            getBox1Rect.right < getBox2Rect.left || 
            getBox1Rect.bottom < getBox2Rect.top || 
            getBox1Rect.left > getBox2Rect.right ||
            getBox1Rect.top > getBox2Rect.bottom
      ){
        return false;
    }else{
        return true;
    }		
}
//全选判断函数
function allBtn(){
    var n = 0;
    for(var i=0; i<aClick.length; i++){
        if(aClick[i].classList.contains('click')){
            n++;
        }
    }
    if(n == aClick.length){
        allClick.className = 'click';
    }else{
        allClick.className = 'noclick';
    }
}
//重新渲染
function newHtml(num){
    //文件应该渲染的函数
    havaFolder.innerHTML = addFolderBoxHtml(num);
    //左侧菜单渲染
    menuHtml = '';
    dataMenu.innerHTML = createTreeHtml(dataNum,-1);
    //上面渲染
    navBox.innerHTML = addNavHtml(num);
    //添加文件夹图标
    for(var i=0; i<menuSpans.length; i++){
        //如果span有兄弟节点，就给span添加对应的className，反之亦然
        if(menuSpans[i].parentNode.nextElementSibling){
            menuSpans[i].className = 'ofolderup';
        }
    }
    //如果哪一个div等于存的值，那个高亮
    for(var i=0; i<menuDivs.length; i++){
        if(menuDivs[i].dataset.id == num){
            //对应的左侧菜单高亮
            menuDivs[i].classList.add('divsBC');
        }
    }
}
//获取当前id下的所有子项
function getChildsById(id){
    var arr = [];
    for(var attr in data){
        if(data[attr].pid == id){
            arr.push(data[attr])
        }
    }	
    return arr;
}
//左侧树状结构生成函数
function createTreeHtml(id,level){
    var childs = getChildsById(id);
    var treeHtml = '';
    level++;
    if(childs.length > 0){
        treeHtml += '<ul>'
        for( var i = 0; i < childs.length; i++ ){
            var childsHtml = createTreeHtml(childs[i].id,level);
            treeHtml += `<li>
                <div data-id="${childs[i].id}" style="padding-left: ${level*25}px;">
                    <span>${childs[i].title}</span>
                </div>
                ${childsHtml}
            </li>`
        }
        treeHtml += '</ul>'
    }
    return treeHtml;
}
//---------------------------删除子项-----------------------------------------
function delChild(id){
    for(var d in data){
        if(data[d].pid == id){
            var num = data[d].id;
            delete data[d];
            delChild(num);
        }
    }
}
// ---------------------------------提示框-------------------------------------
function info(el1,el2,text){
    el1.innerHTML = text;
    el2.style.display = 'block';
    setTimeout(function(){
        el2.style.display = 'none';
    },800)
}
// -----------------------------显示消失封装函数------------------------------------------
function displayOrNo(el1,el2,state){
    el1.style.display = state;
    el2.style.display = state;
}
