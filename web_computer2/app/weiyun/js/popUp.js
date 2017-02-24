
function popUp(options){
	options = options || {};
	// 初始化一个对象
	var defaults = {
		title:'我是 一个弹窗',
		content:'我是内容',
		okFn:function(){}
	}
	//克隆对象，防止修改了原数据
	for(var attr in options){
		defaults[attr] = options[attr];
	}
	//封装弹窗，append到body中
	var div = document.createElement("div");
	div.id = 'popBox';
	var boxHtml = `<h3 class="pop_title">${defaults.title}</h3>
		<a href="javascript:void(0);" class="pop_close">×</a>
		<div class="pop_content">
			${defaults.content}
		</div>
		<div class="btn_box">
			<div class = "tip_box"></div>
			<a href="javascript:void(0);" class="pop_ok">确定</a>
			<a href="javascript:void(0);" class="pop_cancel">取消</a>
		</div>`;
		
	div.innerHTML = boxHtml;
	document.body.appendChild(div);
	//遮罩层
	var mask = document.createElement('div');
	mask.className = 'mask';
	document.body.appendChild(mask);
    //居中显示
	div.style.left = (document.documentElement.clientWidth - div.offsetWidth)/2 + 'px';
	div.style.top = (document.documentElement.clientHeight - div.offsetHeight)/2 + 'px';
	window.addEventListener('resize',function(){
		div.style.left = (document.documentElement.clientWidth - div.offsetWidth)/2 + 'px';
		div.style.top = (document.documentElement.clientHeight - div.offsetHeight)/2 + 'px';
	})
	
	//给确定取消关闭添加点击事件
	var close = div.querySelector('.pop_close');
	var ok = div.querySelector('.pop_ok');
	var cancel = div.querySelector('.pop_cancel');
	close.addEventListener('click',function(){
		document.body.removeChild(div);
		document.body.removeChild(mask);
	})
	ok.addEventListener('click',function(){
		var bl = defaults.okFn();
		if (!bl) {
			document.body.removeChild(div);
			document.body.removeChild(mask);
		}
	})
	cancel.addEventListener('click',function(){
		document.body.removeChild(div);
		document.body.removeChild(mask);
	})
}
