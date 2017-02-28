//弹框
function tan(option){
	option = option || {};
	var defa = {
		title:"hello",
		content:"弹 弹 弹",
		okof:function(){}
	};
	for(var attr in option){
		defa[attr] = option[attr];
	}
	//封装弹框的内容，放在body里
	//创建一个div
	var bombBox = document.createElement("div");
	bombBox.className="delete";
	var str =`<h3>
			<div class="content-title">${defa.title}</div>
			<div class="content-content">
				${defa.content}
			</div>
			<span id= 'sp'></span>
			</h3>
			<div class="ny">
			<a href="javascript:;" class="confirm">确定</a>
			<a href="javascript:;" class="cancel">取消</a>
			</div>
			<a href="javascript:;" class="mistake">×</a>`;
			bombBox.innerHTML = str;
	document.body.appendChild(bombBox);
	bombBox.style.zIndex = 100;
	
//	遮罩
	var mask = document.createElement("div");
	mask.style.cssText="width:100%;height:100%;background:#000;opacity:0.4;position:fixed;left:0;top:0;z-index:99px;";
	document.body.appendChild(mask);
	
//居中显示
    bombBox.style.left=(document.documentElement.clientWidth - bombBox.offsetWidth)/2+"px";
    bombBox.style.top=(document.documentElement.clientHeight - bombBox.offsetHeight)/2+"px";
    
 //给确定取消关闭添加点击处理
    window.addEventListener("reset",function(){
    	 bombBox.style.left=(document.documentElement.clientWidth - bombBox.offsetWidth)/2+"px";
   		 bombBox.style.top=(document.documentElement.clientHeight - bombBox.offsetHeight)/2+"px";
    })
    
    var confirm = bombBox.querySelector(".confirm");//确定按钮
	var cancel = bombBox.querySelector(".cancel");//取消按钮
	var mistake = bombBox.querySelector(".mistake");//X按钮
	mistake.addEventListener("click",function (){
		document.body.removeChild(bombBox);
		document.body.removeChild(mask);
	})
	confirm.addEventListener("click",function(){
			var bl = defa.okof(); 
		/*
			1. return undefined 关闭
			2. return false  关闭
			3. return true   不关闭
		*/
		if(!bl){
			document.body.removeChild(bombBox);
			document.body.removeChild(mask);
		}
	})
	cancel.addEventListener("click",function (){
		document.body.removeChild(bombBox);
		document.body.removeChild(mask);
	})
}
