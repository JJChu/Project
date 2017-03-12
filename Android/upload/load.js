document.addEventListener('touchstart', function(e) {
	e.preventDefault();
});
(function(){
	var box = document.querySelector('#box');
	var inner = document.querySelector('#inner');
	var list = document.querySelector('#list');
	var footer = inner.querySelector('footer');
	var imgPage = document.querySelector('#imgPage');
	var bigImg = document.querySelector('#bigImg');
	var lis = list.children;
	var dataImg = [];
	var length = 12;
	var start = 0;
	var isEnd = false;
	for(var i = 0; i < 26; i++){
		dataImg.push("pics/"+(i%26+1)+".jpg");
	}
	setBigImg();
	setScroll();
	createLi();
	/* createLi 请求数据 加载li */
	function createLi(){
		if(start >= dataImg.length){
			//alert("对不起没有更多图片了");
			footer.innerHTML = "对不起没有更多图片了";
			setTimeout(function(){
				footer.style.opacity = 0;
				MTween({
					el:inner,
					target:{
						translateY:box.clientHeight -inner.offsetHeight
					},
					time:300,
					type:"easeBoth"
				});
			},1000);
			return;
		}
		var end = start + length;
		end = end > dataImg.length?dataImg.length:end;
		for(var i = start; i < end; i++){
			var li = document.createElement("li");
			li.src = dataImg[i];
			li.isLoad = true;
			li.addEventListener('touchstart', function(e) {
				this.isMove = false;
			});
			li.addEventListener('touchmove', function(e) {
				this.isMove = true;
			});
			li.addEventListener('touchend', function(e) {
				if(this.isMove) {
					return;
				}
				css(bigImg,"scale",100);
				css(bigImg,"rotate",0);
				bigImg.src = this.children[0].src;
				css(imgPage,"scale",100);	
			});
			list.appendChild(li);
		}
		createImg();
		footer.style.opacity = 0;
	}
	/* 判断是否该创建图片 */
	function createImg(){
		var boxRect = box.getBoundingClientRect();
		var bottom = boxRect.top + boxRect.height;
		for(var i = 0; i < lis.length; i++){
			var top = lis[i].getBoundingClientRect().top;//li相对可视区的top值
			if(top < bottom && lis[i].isLoad){//当前li进入可视区
				lis[i].isLoad = false;
				showImg(lis[i]);
			}
		}
	}
	/* 创建图片并显示 */
	function showImg(li){
		var img = new Image(); 
		img.src = li.src;
		img.onload = function(){
			li.appendChild(img);
			/* 元素没有渲染完成，transition不起作用*/
			setTimeout(function(){
				img.style.opacity = 1;
			},100);
		}
	}
	function setScroll(){
		mScroll({
			el:box,
			start:function(e){
				//console.log("手指按下要执行的函数");
				var innerTop = Math.round(css(inner,"translateY")) - 5;
				var minTop = box.clientHeight - inner.offsetHeight;
				if(minTop >= innerTop ){
					console.log("用户是在底部进行拖拽的");
					footer.style.opacity = 1;	
					isEnd = true;	
				} else {
					footer.style.opacity = 0;	
					isEnd = false;	
				}
			},
			move:function(e){
				//console.log("发生滚动的时候，执行的函数")
				createImg();
			},
			end:function(e){
				//console.log("手指抬起要执行的函数");
				var innerTop = Math.round(css(inner,"translateY")) - 5;
				var minTop = box.clientHeight - inner.offsetHeight;
				if(isEnd&&minTop >= innerTop){
					console.log("可以加载更多");
					clearInterval(inner.timer);//清除定时阻止滑屏函数回弹动画
					start += length;
					createLi();
					document.querySelector('#scrollBar').style.opacity = 0;
					isEnd = false;
				}
			},
			over:function(){
				//console.log("滚动结束");
			}
		});
	}	
})();
function mScroll(init){
	if(!init.el){
		return;
	}
	var wrap = init.el;
	var inner = init.el.children[0];
	var scrollBar = document.createElement("div");	
	var startPoint = 0;
	var startEl = 0;
	var lastY = 0;
	var lastDis = 0;
	var lastTime = 0;
	var lastTimeDis = 0;
	var back = document.documentElement.clientWidth/8;
	var maxTranslate = wrap.clientHeight - inner.offsetHeight;
	scrollBar.id = "scrollBar";
	if(!init.offBar){
		var scale = wrap.clientHeight/inner.offsetHeight;
		inner.style.minHeight = "100%";
		scrollBar.style.cssText = "width:4px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:2px;opacity:0;transition:.3s opacity;";
		wrap.appendChild(scrollBar);
	}
	css(inner,"translateZ",0.01);
	inner.addEventListener('touchstart', function(e) {
		maxTranslate = wrap.clientHeight - inner.offsetHeight;
		if(!init.offBar){
			if(maxTranslate >= 0) {
				scrollBar.style.display = "none";
			} else {
				scrollBar.style.display = "block";
			}
			scale = wrap.clientHeight/inner.offsetHeight;
			scrollBar.style.height = wrap.clientHeight * scale + "px";
		}
		clearInterval(inner.timer);
		startPoint = e.changedTouches[0].pageY;
		startEl = css(inner,"translateY");
		lastY = startEl;
		lastTime = new Date().getTime();
		lastTimeDis = lastDis = 0;
		(init.offBar)||(scrollBar.style.opacity = 1);
		init.start&&init.start.call(box,e);
		e.stopPropagation();
	});
	inner.addEventListener('touchmove', function(e) {
		var nowTime = new Date().getTime();
		var nowPoint = e.changedTouches[0].pageY;
		var dis = nowPoint - startPoint;
		var translateY = startEl + dis;
		if(translateY > back){
			translateY = back
		} else if(translateY < maxTranslate -back){
			translateY = maxTranslate - back;
		}
		css(inner,"translateY",translateY);
		(init.offBar)||css(scrollBar,"translateY",-translateY*scale);
		lastDis = translateY - lastY;
		lastY = translateY;
		lastTimeDis = nowTime - lastTime;
		lastTime = nowTime;
		init.move&&init.move.call(box,e);
	});
	inner.addEventListener('touchend', function(e) {
		var type = "easeOut";
		var speed = Math.round(lastDis / lastTimeDis*10);
		speed = lastTimeDis <= 0?0 :speed;
		var target = Math.round(speed*30 + css(inner,"translateY"));
		if(target > 0){
			target = 0;
			type = "backOut";
		} else if(target < maxTranslate){
			target = maxTranslate;
			type = "backOut";
		}
		MTween({
			el:inner,
			target: {translateY:target},
			time: Math.round(Math.abs(target - css(inner,"translateY"))*1.8),
			type: type,
			callBack: function(){
				(init.offBar) || (scrollBar.style.opacity = 0);
				init.over&&init.over.call(box,e);
			},
			callIn: function(){
				var translateY = css(inner,"translateY");
				init.offBar||css(scrollBar,"translateY",-translateY*scale);
				init.move&&init.move.call(box,e);
			}
		});
		init.end&&init.end.call(box,e);
	});
}
function setBigImg(){
	var imgPage = document.querySelector('#imgPage');
	var bigImg = document.querySelector('#bigImg');
	var navs = document.querySelectorAll('#imgNavs a');
	var backBtn = document.querySelector('#backBtn');
	var startRotate = 0;
	var startScale = 0; 
	var maxScale = 1.5;
	var minScale = .5;
	css(imgPage,"scale",0);
	backBtn.addEventListener('touchend', function(e) {
		css(imgPage,"scale",0);
	});
	setGesture({
		el: bigImg,
		start: function(e){
			startRotate = css(this,"rotate");
			startScale = css(this,"scale")/100;
		},
		change:function(e){
			var scale = startScale * e.scale;
			if(scale > maxScale){
				scale = maxScale;
			} else if(scale < minScale){
				scale = minScale;
			}
			css(this,"rotate",startRotate + e.rotation);
			css(this,"scale",scale*100);
		},
		end:function(){
			var deg = css(this,"rotate");
			deg = Math.round(deg/90);
			deg = deg * 90;
			MTween({
				el:this,
				target:{rotate:deg},
				time: 300,
				type: "easeBoth"
			}); 
		}
	});
	navs[0].addEventListener("touchend",function(){
		var deg = css(bigImg,"rotate");
		deg = Math.round(deg/90) - 1;
		deg = deg * 90;
		MTween({
			el:bigImg,
			target:{rotate:deg},
			time: 300,
			type: "easeBoth"
		}); 
	});
	navs[1].addEventListener("touchend",function(){
		var deg = css(bigImg,"rotate");
		deg = Math.round(deg/90) + 1;
		deg = deg * 90;
		MTween({
			el:bigImg,
			target:{rotate:deg},
			time: 300,
			type: "easeBoth"
		}); 
	});
	navs[2].addEventListener("touchend",function(){
		var scale = css(bigImg,"scale")/100;
		scale += .1;
		if(scale > maxScale){
			scale = maxScale;
		}
		MTween({
			el:bigImg,
			target:{scale:scale*100},
			time: 300,
			type: "easeBoth"
		}); 
	});
	navs[3].addEventListener("touchend",function(){
		var scale = css(bigImg,"scale")/100;
		scale -= .1;
		if(scale < minScale){
			scale = minScale;
		}
		MTween({
			el:bigImg,
			target:{scale:scale*100},
			time: 300,
			type: "easeBoth"
		}); 
	});
}
function getDis(point1,point2){
	var x = point2.x - point1.x;
	var y = point2.y - point1.y;
	return Math.sqrt(x*x + y*y);
}
function getDeg(point1,point2){
	var x = point2.x - point1.x;
	var y = point2.y - point1.y;
	return Math.atan2(y,x)*180/Math.PI; 
}
function setGesture(init){
	var el = init.el;
	var isGestrue = false; 
	var startPoint = [];
	if(!el){
		return;
	}
	el.addEventListener('touchstart', function(e) {
		if(e.touches.length >= 2){
			isGestrue = true; //记录当前用户触发了gesture
			startPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
			startPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY}; 
			init.start&&init.start.call(el,e);
		}
	});
	el.addEventListener('touchmove', function(e) {
		if(isGestrue&&e.touches.length >= 2){
			var nowPoint = [];
			nowPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
			nowPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY};
			var startDis = getDis(startPoint[0],startPoint[1]);
			var nowDis = getDis(nowPoint[0],nowPoint[1]);
			var startDeg = getDeg(startPoint[0],startPoint[1]);
			var nowDeg = getDeg(nowPoint[0],nowPoint[1]);
			e.scale = nowDis/startDis;
			e.rotation = nowDeg - startDeg;
			init.change&&init.change.call(el,e);
		}
	});
	el.addEventListener('touchend', function(e) {
		if(isGestrue){
			if(e.touches.length < 2 || e.targetTouches.length < 1){
				isGestrue = false;
				init.end&&init.end.call(el,e);
			}
		}
	});
}