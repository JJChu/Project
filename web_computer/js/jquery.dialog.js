//jQuery插件扩展格式如下

;(function($){
	//构造函数
	function Dialog(options){
		//1.判断
		options = options || {};			//如果没有传参，则options = {};
		if (options.constructor !== Object) { //判断传入的是否是对象
			options = {};
		}
		//2.克隆对象
		this.defaults = {
			title:"我是一个弹窗",
			url:"",
			content:null,
			ico:"",
			left:null,
			top:null,
			closeBack:null		//关闭弹框时候的回调函数
		}
		for (var attr in options) {
			if ( options.hasOwnProperty(attr) ) {
				this.defaults[attr] = options[attr];
			}
		}
		this.content = this.defaults.content? this.defaults.content : `<iframe src=${this.defaults.url} width="100%" height="100%" frameborder="0"></iframe>`
		this.init();
	}
	Dialog.prototype = {
		constructor:Dialog,
		init(){	//初始化
			//生成弹框
			this.boxDiv = this.conHtml();
			document.body.appendChild(this.boxDiv);
			//生成thumbLi
			this.thumbLi = this.thumbHtml();
			$('.thumbList').append(this.thumbLi);
			this.zIndexMax();
			
			this.position();
			window.onresize = this.position.bind(this);
			this.h3 = this.boxDiv.querySelector('h3');
			
			//关闭按钮
			$('.pop_close',this.boxDiv).on('click',this.close.bind(this));
			//最大化按钮
			this.maxOff = true;	//true代表不全屏
			$('.pop_max',this.boxDiv).on('click',this.changeSize.bind(this));
			$('.pop_title',this.boxDiv).on('dblclick',this.changeSize.bind(this));
			//最小化按钮
			$('.pop_min',this.boxDiv).on('click',this.min.bind(this));
			this.showOff = true;
			//底部导航
			$(this.thumbLi).on('click',this.show.bind(this));
			//点击弹框提升层级
			$(this.boxDiv).on('click',this.zIndexMax.bind(this));
			//拖拽功能
			$.drag({
				pos:this,
				targetEle:$('.title_box',this.boxDiv),
				moveEle:$(this.boxDiv)
			});
		},
		conHtml(){
			var boxDiv = document.createElement("div");
			boxDiv.className = 'popBox';
			var boxHtml = `<h3 class="pop_title">
								<div class="title_box">
									<span>${this.defaults.title}</span>
								</div>
								<nav class="pop_change">
									<a href="javascript:void(0);" class="pop_min"></a>
									<a href="javascript:void(0);" class="pop_max"></a>
									<a href="javascript:void(0);" class="pop_close"></a>
								</nav>
							</h3>
							<div class="pop_content">
								${this.content}
							</div>
							`;
			boxDiv.innerHTML = boxHtml;
			return boxDiv;
		},
		thumbHtml(){
			var thumbLi = document.createElement("li");
			thumbLi.className = 'thumbItem selected';
			var boxHtml = `<img src=${this.defaults.ico}/>
						   <span id="">${this.defaults.title}</span>`;
			thumbLi.innerHTML = boxHtml;
			return thumbLi;
		},
		close(){
			document.body.removeChild(this.boxDiv);
			$(this.thumbLi).remove();
			this.defaults.closeBack && this.defaults.closeBack();
		},
		changeSize(){
			this.maxOff = !this.maxOff;
			this.max();
		},
		max(){
			$(this.boxDiv).show();
			if (this.maxOff) {
				$(this.boxDiv).animate({
					width:'990px',
					height:'540px',
					left:this.x+'px',
					top:this.y + 'px',
					opacity:1
				},300,'linear');
				$('.pop_max',this.boxDiv).removeClass('pop_max_min');
			} else{
				$(this.boxDiv).animate({
					width:'100%',
					height:this.winHeight - 60 +'px',
					left:0,
					top:0,
					opacity:1
				},300,'linear');
				$('.pop_max',this.boxDiv).addClass('pop_max_min');
			}
			this.showOff = true;
		},
		min(ev){
			var num = $(this.thumbLi).index();
			$(this.boxDiv).animate({
					width:'99px',
					height:'54px',
					top:this.winHeight-60-54 +'px',
					left:64*num+75+'px',
					opacity:0
			},300,'linear',function(){
				$(this).hide();
			});
			this.zIndexMin();
			this.showOff = false;
			ev.stopPropagation();
		},
		show(ev){		//	出现/消失
			if (!$(this.thumbLi).hasClass('selected')) {	//没有聚焦
				if (!this.showOff) {	//文件没有打开
					this.max();
				}
				this.zIndexMax();
			}else{											//聚焦
				if (this.showOff) {		// 文件打开
					this.min(ev);
				}
			}
		},
		zIndexMax(){		//提升层级
			$('.thumbItem').removeClass('selected');
			$(this.thumbLi).addClass('selected');	
			$('.popBox').removeClass('active');
			$(this.boxDiv).addClass('active');
		},
		zIndexMin(){		//降低层级
			$(this.thumbLi).removeClass('selected');
			$(this.boxDiv).removeClass('active');
		},
		position(){ //如果传入了left/top值且不为null，且left/top是纯数字，则...  否则，弹框居中显示
			var isLeft = this.defaults.left !== null && !isNaN(this.defaults.left);
			var isTop = this.defaults.top !== null && !isNaN(this.defaults.top);
			this.winWidth = document.documentElement.clientWidth;
			this.winHeight = document.documentElement.clientHeight;
			this.x = (this.winWidth - this.boxDiv.offsetWidth)/2;
			this.y = (this.winHeight - this.boxDiv.offsetHeight)/2;
			if (isLeft) {
				this.x = this.defaults.left;
			}
			if (isTop) {
				this.y = this.defaults.top;
			}
			this.boxDiv.style.left = this.x + 'px';
			this.boxDiv.style.top = this.y + 'px';
		}
	}
	
	//将Dialog函数挂载在$函数身上作为静态方法
	
	$.dialog = function(options){
		new Dialog(options);
	}
	
})(jQuery)
