//jQuery插件扩展格式如下

/*
 	使用说明：
 		1.通过jq实例（元素）调用方法
 		2.如果方法不传参（jq对象），则 调用方法的元素可拖动
 		3.如果传参（jq对象），则 表示 点击调用的元素，拖动传入的元素
 */

;(function($){
	//构造函数
	//传入一个对象，对象中包括 要点击的元素，[和需要拖拽的元素]，只有一个元素时，点击拖拽为同一个
	function Drag(options){
		options = options || {};
		this.defaults = {
			pos:{x:null,y:null},
			targetEle:null,
			moveEle:null,
			upGo:null,
			upBack:null
		}
		for (var attr in options) {
			if ( options.hasOwnProperty(attr) ) {
				this.defaults[attr] = options[attr];
			}
		}
		
		this.pos = this.defaults.pos;
		if (this.defaults.moveEle) {
			this.targetEle = this.defaults.targetEle.get(0);
			this.ele = this.defaults.moveEle.get(0);
		}else{
			this.targetEle = this.defaults.targetEle.get(0);
			this.ele = this.defaults.targetEle.get(0);
		}
		this.go();
	}
	//原型 方法
	Drag.prototype = {
		constructor:Drag,
		go(){
//			this.targetEle.onmousedown = this.downFn.bind(this);
			this.targetEle.addEventListener('mousedown',this.downFn.bind(this))
		},
		downFn(e){
			this.disX = e.clientX - this.ele.offsetLeft;
			this.disY = e.clientY - this.ele.offsetTop;
			
			document.onmousemove = this.moveFn.bind(this);
			document.onmouseup = this.upFn.bind(this);
			e.preventDefault();
		},
		moveFn(e){
			this.x = e.clientX - this.disX;
			this.y = e.clientY - this.disY;
			if (Math.abs(this.x)<10 && Math.abs(this.y)<10) { //缓冲间隙
				return;
			}
			this.limit();
			this.ele.style.left = this.x + 'px';
			this.ele.style.top = this.y + 'px';
		},
		upFn(){
			this.pos.x = this.x;
			this.pos.y = this.y;
			if (this.defaults.upBack && (this.x > document.documentElement.clientWidth - this.ele.offsetWidth -10)) {
				this.defaults.upBack();
			}else if(this.defaults.upGo){
				this.defaults.upGo();
			}
			document.onmousemove = null;
			document.onmouseup = null;
		},
		limit(){
			if( this.x < 0 ){
				this.x = 0;
			}
			if( this.x > document.documentElement.clientWidth - this.ele.offsetWidth ){
				this.x = document.documentElement.clientWidth - this.ele.offsetWidth;
			}
			if( this.y < 0 ){
				this.y = 0;
			}
			if( this.y > document.documentElement.clientHeight - this.ele.offsetHeight ){
				this.y = document.documentElement.clientHeight - this.ele.offsetHeight;
			}
		}
	}
	
	//将Dialog函数挂载在$函数原型上，则 【$函数实例 】（jq对象）可调用方法，将实例传入
	
	$.drag = function(options){
		//这个函数里面的 this 指向 $函数实例，是一个jq对象。
		new Drag(options);
	}
})(jQuery)


