//..........阻止浏览器默认选中文字图片
document.onmousedown=function(e){
	e.preventDefault()
}
//svg线条宽高设置
var svgW=parseFloat($("svg").css("width"));
var svgH=parseFloat($("svg").css("height"));
$("svg").html('<path class="path" d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />');
//..........................................................
var imgArr=["img/1_h.jpg","img/2_h.jpg","img/3_h.jpg","img/4_h.jpg","img/5_h.jpg","img/6_h.jpg","img/7_h.jpg","img/8_h.jpg","img/9_h.jpg","img/10_h.jpg","img/11_h.jpg","img/12_h.jpg","img/13_h.jpg"];
var num=-1;
var animation=false;
var a=0;//第十页图片切换
var timer1=null;
var timer2=null;
var onoff1=true;
var onoff2=false;
var cut=true;
var clientW=document.documentElement.clientWidth;//浏览器视图宽
var clientH=document.documentElement.clientHeight;//浏览器视图高
var teyeWrap=parseFloat($(".teye-wrapper-connected").css("width"));
var teyeWrapL=(clientW-teyeWrap)/2-(teyeWrap/20);
var teyeL=(clientW-599)/2;
var oneL=(clientW-599)/2+80;
var enterNewPage=false;
var enterModal=false;
$(".skill-img").css("left",teyeL);
$(".teyetwo").css("left",teyeL);
$(".teyeone").css("left",oneL);
$(".teye-wrapper-connected").css("left",teyeWrapL);
var explodeWrapper=$(".explode-wrapper");
var explodeText=$(".explode .text");
window.onresize=function(){
	clientW=document.documentElement.clientWidth;
	if(num==6){
		if(clientW<1024){
			explodeWrapper.css("transition","none")
			explodeWrapper.css("transform","scale(0.5)")
		}else{
			explodeWrapper.css("transition","none")
			explodeWrapper.css("transform","scale(1)")
		}
	}	
	teyeWrap=parseFloat($(".teye-wrapper-connected").css("width"));
	teyeWrapL=(clientW-teyeWrap)/2-(teyeWrap/20);
	$(".teye-wrapper-connected").css("left",teyeWrapL);
	teyeL=(clientW-599)/2;
	$(".skill-img").css("left",teyeL);
	$(".teyetwo").css("left",teyeL);
	oneL=(clientW-599)/2+80
	$(".teyeone").css("left",oneL);
	svgW=parseFloat($("svg").css("width"));
	svgH=parseFloat($("svg").css("height"));
	if(num==-1){
		$("svg").html('<path class="path" d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />')
	}else if(num>=5){
		$("svg").html('<path d="M0 '+svgH*2+' L0 0 L'+svgW*2+' 0 L'+svgW*2+' '+svgH*2+' Z" stroke="green" stroke-width="5" fill="none" />')
	}else{
		$("svg").html('<path d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />')
	}
	
}

var textDiv=$("section.text div");
var oneEyeLeft=$(".one-eye-left");
var oneEyeRight=$(".one-eye-right");
var toggleMenu=$(".toggle-menu");
var toggleMenuSpan=$(".toggle-menu").find("span");
var oneEye=$(".one-eye");
var teyePink=$(".teye-wrapper-pink");
var teyeBlue=$(".teye-wrapper-blue");
var connected=$(".connected");
var cityConnectedDot=$(".city-connected .dot");
var PwrapperEyeLeft=$(".teye-wrapper-pink .wrapper-eye.left");
var PwrapperEyeRight=$(".teye-wrapper-pink .wrapper-eye.right");
var BwrapperEyeLeft=$(".teye-wrapper-blue .wrapper-eye.left");
var BwrapperEyeRight=$(".teye-wrapper-blue .wrapper-eye.right");
var sceneLi=$("#scene li");

//............................第九页十个小点从左向右闪烁.................................		
function dotPlayL(){
	for(var i = 0; i < 10; i++){
		(function(i){
			setTimeout(function(){
				cityConnectedDot.eq(i).css("transform","scale(1)");
			},(i+7)*150)
		})(i);
		(function(i){
			setTimeout(function(){
				cityConnectedDot.eq(i).css("transform","scale(0)");
			},(i+1)*150)
		})(i)
	}
};
//......................第九页十个小点从右向左闪烁....................................
function dotPlayR(){
	console.log(333)
	for(var i = 0; i < 10; i++){
		(function(i){
			setTimeout(function(){
				console.log(444)
				cityConnectedDot.eq(9-i).css("transform","scale(1)");
			},(i+6)*150)
		})(i);
		(function(i){
			setTimeout(function(){
				cityConnectedDot.eq(9-i).css("transform","scale(0)");
			},(i+1)*150)
		})(i)
	}
};
//......................第九页放到按钮上切换小音响.................
function moveRight(){
	clearInterval(timer1);
	onoff1=false;
	if(onoff2){			
	}else{
		cityConnectedDot.css("transform","scale(1)");
		dotPlayR();
		timer2=setInterval(dotPlayR,2400);
		onoff2=true;
	}
	if(teyePink.css("z-index")=="1"&&cut){
		cut=false;
		PwrapperEyeLeft.css("transform","rotate(-90deg)");
		PwrapperEyeRight.css("transform","rotate(90deg)");
		BwrapperEyeLeft.css("transform","rotate(180deg)");
		BwrapperEyeRight.css("transform","rotate(0deg)");
		teyePink.css("transition","0.6s");
		teyePink.css("transform","translate3d(0px,0px,-25px)");
		teyePink.css("left",408);
		teyePink.css("opacity","1");
		teyeBlue.css("transition","0.6s");
		teyeBlue.css("transform","translate3d(0px,0px,-25px)");
		teyeBlue.css("left",-34);
		setTimeout(function(){
			teyeBlue.css("transition","none");
			teyePink.css("transition","none");
			teyePink.css("z-index","2");
			teyeBlue.css("z-index","1");
		},600)
		setTimeout(function(){
			teyePink.css("transition","0.6s");
			teyeBlue.css("transition","0.6s");
			teyePink.css("transform","translate3d(0px,0px,0px)");
			teyePink.css("left",337);
			teyeBlue.css("transform","translate3d(0px,0px,-50px)");
			teyeBlue.css("left",37);
			teyeBlue.css("opacity","0.5");
			cut=true;
		},620)		
	}
};
function moveLeft(){			
	clearInterval(timer2);
	onoff2=false;
	if(onoff1){
	}else{
		cityConnectedDot.css("transform","scale(1)");
		dotPlayL();
		timer1=setInterval(dotPlayL,2400);
		onoff1=true;
	}
	if(teyeBlue.css("z-index")=="1"&&cut){
		cut=false;
		PwrapperEyeLeft.css("transform","rotate(0deg)");
		PwrapperEyeRight.css("transform","rotate(0deg)");
		BwrapperEyeLeft.css("transform","rotate(90deg)");
		BwrapperEyeRight.css("transform","rotate(90deg)");
		teyePink.css("transition","0.6s");
		teyePink.css("transform","translate3d(0px,0px,-25px)");
		teyePink.css("left",408);
		teyeBlue.css("opacity","1");
		teyeBlue.css("transition","0.6s");
		teyeBlue.css("transform","translate3d(0px,0px,-25px)");
		teyeBlue.css("left",-34);
		setTimeout(function(){
			teyeBlue.css("transition","none");
			teyePink.css("transition","none");
			teyePink.css("z-index","1");
			teyeBlue.css("z-index","2");
		},600)
		setTimeout(function(){
			teyeBlue.css("transition","0.6s");
			teyePink.css("transition","0.6s");
			teyePink.css("transform","translate3d(0px,0px,-50px)");
			teyePink.css("left",337);
			teyeBlue.css("transform","translate3d(0px,0px,0px)");
			teyeBlue.css("left",37);
			teyePink.css("opacity","0.5");
			cut=true;
		},620)		
	}
};
//..................第十页的上下页图片切换。....................
function next(){
	if($(".slideImg").is(":animated")){
		return
	}
	a++;
	if(a==imgArr.length){
		a=0;
	}
	$(".owl-dots div").removeClass("active");
	$(".owl-dots div").eq(a).addClass("active");
	$(".slideImg").animate({
		left:'-200%'
	},500,function(){
		$(".slideImg").css("left","-100%")
		if(a==0){
			$(".imgOne").attr("src",imgArr[imgArr.length-1])
		}else{
			$(".imgOne").attr("src",imgArr[a-1])
		}
		$(".imgTwo").attr("src",imgArr[a])
		if(a==imgArr.length-1){
			$(".imgThree").attr("src",imgArr[0])
		}else{
			$(".imgThree").attr("src",imgArr[a+1])
		}
	})
};
function prev(){
	if($(".slideImg").is(":animated")){
		return
	}
	a--;
	if(a<0){
		a=imgArr.length-1;
	}
	$(".owl-dots div").removeClass("active");
	$(".owl-dots div").eq(a).addClass("active");
	$(".slideImg").animate({
		left:'0'
	},500,function(){
		$(".slideImg").css("left","-100%")
		if(a==0){
			$(".imgOne").attr("src",imgArr[imgArr.length-1])
		}else{
			$(".imgOne").attr("src",imgArr[a-1])
		}
		$(".imgTwo").attr("src",imgArr[a])
		if(a==imgArr.length-1){
			$(".imgThree").attr("src",imgArr[0])
		}else{
			$(".imgThree").attr("src",imgArr[a+1])
		}
	})
};
//按住屏幕滑动切换
function movePic(){
	$(document).on("mousedown",function(e){
		var startX=e.clientX;
		var disLeft=0;
		var dis=0;
		$(document).on("mousemove",function(e){
			var disX=e.clientX-startX;
			dis=disX;
			clientW=document.documentElement.clientWidth;	
			disLeft=-clientW+disX;
			$(".slideImg").css("left",disLeft)
		})
		$(document).on("mouseup",function(){
			clientW=document.documentElement.clientWidth;
			disLeft=-clientW+dis;
			if(Math.abs(disLeft)-clientW>20){
				next();
			}else if(Math.abs(disLeft)-clientW<-20){
				prev();
			}else{
				$(".slideImg").css("left",-clientW)
			}
			$(document).off("mousemove");
			$(document).off("mouseup");
		})
	})
};
//..................第八页图片随着鼠标移动而移动..................................
function picWithMouse(){
	$(document).on("mousemove",function(e){
		clientW=document.documentElement.clientWidth;
		clientH=document.documentElement.clientHeight;
		//最多左右移动96px；页面上每移动clientW/192 li标签就移动1px。在中间clientW/2处li标签的位移为零。
		//最多上下移动47px；页面上每移动clientH/94 li标签就移动1px。在中间clientW/2处li标签的位移为零。
		var liX=(e.clientX-clientW/2)/(clientW/192)+"px";
		var liY=(e.clientY-clientH/2)/(clientH/94)+"px";
		sceneLi.eq(9).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/124)+"px";
		liY=(e.clientY-clientH/2)/(clientH/60)+"px";
		sceneLi.eq(5).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/110)+"px";
		liY=(e.clientY-clientH/2)/(clientH/54)+"px";
		sceneLi.eq(8).css("transform","translate3d("+liX+","+liY+",0)")
		liX=(e.clientX-clientW/2)/(clientW/82)+"px";
		liY=(e.clientY-clientH/2)/(clientH/40)+"px";
		sceneLi.eq(7).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/110)+"px";
		liY=(e.clientY-clientH/2)/(clientH/54)+"px";
		sceneLi.eq(6).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/136)+"px";
		liY=(e.clientY-clientH/2)/(clientH/68)+"px";
		sceneLi.eq(4).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/28)+"px";
		liY=(e.clientY-clientH/2)/(clientH/14)+"px";
		sceneLi.eq(3).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/22)+"px";
		liY=(e.clientY-clientH/2)/(clientH/11)+"px";
		sceneLi.eq(2).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/28)+"px";
		liY=(e.clientY-clientH/2)/(clientH/14)+"px";
		sceneLi.eq(1).css("transform","translate3d("+liX+","+liY+",0)");
		liX=(e.clientX-clientW/2)/(clientW/136)+"px";
		liY=(e.clientY-clientH/2)/(clientH/68)+"px";
		sceneLi.eq(0).css("transform","translate3d("+liX+","+liY+",0)");
	})
};
//右侧列表小提示当前页
function tips(){
	if(num!==-1){
		$(".ico-mouse").hide();
		$(".ico-mouse .wheel").hide();
		$(".slides li a").css("background","rgb(147, 90, 36)")	
		$(".slides .active").css("border-color","rgb(147, 90, 36)");	
	}else if(num==-1){
		$(".ico-mouse").show();
		$(".ico-mouse .wheel").show();
		$(".slides li a").css("background","rgb(255, 255, 255)");
		$(".slides .active").css("border-color","rgb(255, 255, 255)");
	}
	$(".slides .active").css("top",10*num+20);
};
document.onmousewheel=function(e){
	if(textDiv.is(":animated")){
		return
	};
	if(animation){
		return
	};
	if(enterNewPage){
		return
	};
	if(enterModal){
		return
	};
	if($("svg").is(":animated")){
		return
	};
	if(connected.is(":animated")){
		return
	};
	if($(".teyeone").is(":animated")){
		return
	};
	if(oneEye.is(":animated")){
		return
	};
	if($(".city-connected").is(":animated")){
		return
	};
	if($(".image-wrapper .teye-head").is(":animated")){
		return
	};	
//..........................下滑..................	
	if(e.wheelDelta<=0){
		if(num==8){
			return;
		}
		num++;
		if(num>=0&&num<5){
			$("svg").show();
		}
		
		$("path").css("animation-play-state","paused")
		setTimeout(function(){
			$("path").css("animation-play-state","running")
		},800)
		if(num==0){
			svgW=parseFloat($("svg").css("width"));
			svgH=parseFloat($("svg").css("height"));
			$("svg").html('<path class="path" d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />')
			$("path").css("animation-play-state","paused")
				setTimeout(function(){
					$("path").css("animation-play-state","running")
				},800)
			$(".one").animate({
				bottom:"100%"
			},2000);
			$(".oneText").animate({
				opacity:0
			},500);
			
			$(".onoff").animate({
				right:8
			},2000)
			$(".onoff span").css("border-color","rgb(147, 90, 36)")
			$(".onoff .mouth").css("top",40);
			toggleMenu.css("border-color","rgb(147, 90, 36)");
			toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
			textDiv.eq(0).animate({
				opacity:1,
				top:"10%"
			},2300)
		}
		
		if(num==1){
//			textDiv.eq(1).css("opacity",0);
//			textDiv.eq(1).css("top","20%");
//			textDiv.eq(1).hide();
			oneEyeLeft.css("transform","rotate(90deg)");
			oneEyeRight.css("transform","rotate(-90deg)");
		}
		
		if(num==2){
//			textDiv.eq(2).css("opacity",0);
//			textDiv.eq(2).css("top","20%");
//			textDiv.eq(2).hide();
			oneEyeLeft.css("transform","rotate(0deg)");
		}
		
		if(num==3){
//			textDiv.eq(3).css("opacity",0);
//			textDiv.eq(3).css("top","20%");
//			textDiv.eq(3).hide();
			oneEyeLeft.css("transform","rotate(20deg)");
			oneEyeRight.css("transform","rotate(-20deg)");
		}
		
		if(num==4){
//			textDiv.eq(4).css("opacity",0);
//			textDiv.eq(4).css("top","20%");
//			textDiv.eq(4).hide();
			oneEyeLeft.css("transform","rotate(-20deg)");
			oneEyeRight.css("transform","rotate(20deg)");
		}
		if(num>0&&num<5){
			textDiv.eq(num-1).animate({
				opacity:0,
				top:"0"
			},500,function(){
				textDiv.eq(num-1).hide();
				textDiv.eq(num).show();
				textDiv.eq(num).animate({
					opacity:1,
					top:"10%"
				},800)
			})	
		}
		
		if(num==5){	
			$("svg").animate({
				"opacity":"0"
			},500)
			$(".one").css("z-index","23")
			textDiv.eq(4).delay(500).animate({
				opacity:0,
			},800)
			oneEyeLeft.css("transform","rotate(90deg)");
			oneEyeRight.css("transform","rotate(-90deg)");
			oneEye.css("bottom",-50);
			oneEye.css("transform","scale(0.5)");
			$(".skills").css("z-index","22");
			$(".skills").css("transform","scale(1)");
			$(".skills").css("opacity",1);
		}
		
		if(num==6){
			$(".explode").css("z-index","25");
			clientW=document.documentElement.clientWidth;
			explodeWrapper.css("transition","1.3s")
			setTimeout(function(){
				explodeText.css("opacity",1)
				explodeText.css("margin-top",0)
				if(clientW<1024){
					explodeWrapper.css("transform","scale(0.5)")
				}else{
					explodeWrapper.css("transform","scale(1)")
				}
			},500)
			$(".skills .text").hide();
			$(".ico").animate({
				opacity:0
			},500)
			$(".teyetwo").animate({
				bottom:"550"
			},800,function(){
				$(".skills").hide();
			});
			$(".teyeone").animate({
				bottom:"-550"
			},800);
			oneEye.css("transition","0s")
			oneEye.animate({
				bottom:"550"
			},800,function(){
				oneEye.css("transition","1.3s")
			})
			$(".skill-img").css("background","white");
		}
				
		if(num==7){			
			$(".connected .text").delay(1300).animate({
				opacity:"1"
			},400)
			$(".city-connected").delay(1300).animate({
				opacity:"1"
			},400)
			connected.css("z-index","26")
			explodeText.css("opacity","0")
			explodeWrapper.css("transform","scale(0)")
			teyeBlue.css("left",187);
			$(".image-wrapper .teye-head").animate({
				top:"24"
			},1300)
			$(".teye-wrapper-blue .image-wrapper img").animate({
				left:"0"
			},1300)
			$(".image-wrapper .teye-foot").animate({
				top:"107"
			},1300)
			teyeBlue.delay(1300).animate({
				left:"37"
			},400)
			teyePink.delay(1300).animate({
				left:"337",
				opacity:"0.5"
			},400)
			
		}
				
		if(num==8){	
			clearInterval(timer1);
			clearInterval(timer2);
			$(".slideshow").css("z-index","27");
			connected.animate({
				bottom:"100%"
			},1300)
			$(".teye-wrapper-connected").animate({
				bottom:"100%"
			},1300)
			$(".slideshow").animate({
				bottom:"0"
			},1300)			
			//点击第十页的图片切换
			$(".owl-next").on("click",next)			
			$(".owl-prev").on("click",prev)		
			//鼠标移动
			movePic();
		}
			
//..........................上滑..................		
	}else{
		if(num==-1){
			return;
		}
		
		if(num>0&&num<=5){
			$("svg").show();
		}else{
			$("svg").hide();
		}
		if(num==0){
			$(".one").animate({
				bottom:0
			},2000);
			$(".oneText").animate({
				opacity:1
			},500);		
			$(".onoff").animate({
				right:"50%"
			},2000)
			$(".onoff span").css("border-color","rgb(255, 255, 255)")
			$(".onoff .mouth").css("top",20);
			toggleMenu.css("border-color","rgb(255,255,255)");
			toggleMenuSpan.css("border-color","rgb(255, 255, 255)");
			textDiv.eq(0).animate({
				opacity:0,
				top:"20%"
			},500)
		}
		if(num==1){
			oneEyeLeft.css("transform","rotate(0deg)");
			oneEyeRight.css("transform","rotate(0deg)");
		}
		
		if(num==2){
			oneEyeLeft.css("transform","rotate(90deg)");
			oneEyeRight.css("transform","rotate(-90deg)");
		}
		
		if(num==3){
			oneEyeLeft.css("transform","rotate(0deg)");
			oneEyeRight.css("transform","rotate(-90deg)");
		}
		
		if(num==4){
			oneEyeLeft.css("transform","rotate(20deg)");
			oneEyeRight.css("transform","rotate(-20deg)");
		}
		
		if(num==5){			
			$("svg").animate({
				"opacity":"1"
			},500)

			$(".one").css("z-index","23")
			textDiv.eq(4).delay(500).animate({
				opacity:1,
			},800)
			oneEyeLeft.css("transform","rotate(-20deg)");
			oneEyeRight.css("transform","rotate(20deg)");
			oneEye.css("bottom",-200);
			oneEye.css("transform","scale(1)");
			$(".skills").css("z-index","20");
			$(".skills").css("transform","scale(0.5)");
			$(".skills").css("opacity",0);
		}
		if(num>0&&num<5){
			textDiv.eq(num+1).animate({
				opacity:0,
				top:"20%"
			},500,function(){
				textDiv.eq(num+1).hide();
				textDiv.eq(num).show();
				textDiv.eq(num).animate({
					opacity:1,
					top:"10%"
				},800)
			})
			
		}
		
		if(num==6){
			animation=true;	
			$(".explode").css("z-index","20")
			$("section").css("z-index","20")
			connected.css("z-index","initial")
			$(".skills").css("z-index","26");
			$(".skills").css("opacity","1");
			$(".one").css("z-index","27");
			explodeWrapper.css("transition","1.3s")
			explodeText.css("opacity",0)
			$(".skills").show();
			explodeText.css("margin-top",100)
			explodeWrapper.css("transform","scale(0)")	
			$(".skills .text").fadeIn(3300)
			$(".ico").delay(1000).animate({
				opacity:1
			},500)
			$(".teyetwo").delay(500).animate({
				bottom:"-50"
			},800,function(){
				animation=false;
			});
			$(".teyeone").delay(500).animate({
				bottom:"0"
			},800);
			oneEye.css("transition","0s");
			oneEye.delay(500).animate({
				bottom:"-50"
			},800,function(){
				oneEye.css("transition","1.3s");
			})
			$(".skill-img").css("background","none");
		}
		
		if(num==7){
			clientW=document.documentElement.clientWidth;
			explodeWrapper.css("transition","1.3s")
			setTimeout(function(){
				explodeText.css("opacity",1)
				explodeText.css("margin-top",0)
				if(clientW<1024){
					explodeWrapper.css("transform","scale(0.5)")
				}else{
					explodeWrapper.css("transform","scale(1)")
				}
			},1300)
			$(".connected .text").animate({
				opacity:"0"
			},800)
			$(".city-connected").animate({
				opacity:"0"
			},800,function(){
				setTimeout(function (){
					connected.css("z-index","initial")	
				},1300)
				
			})
			$(".image-wrapper .teye-head").delay(800).animate({
				top:"-850"
			},1300)
			$(".teye-wrapper-blue .image-wrapper img").delay(1000).animate({
				left:"-874"
			},1300)
			$(".image-wrapper .teye-foot").delay(1000).animate({
				top:"650"
			},1300)
			teyeBlue.animate({
				left:"187"
			},400)
			teyePink.animate({
				opacity:"0",
				left:"187"
			},400)
			teyePink.css("transform","translate3d(0px,0px,-50px)");
			teyePink.css("z-index","1");
			teyeBlue.css("opacity","1");
			PwrapperEyeLeft.css("transform","rotate(0deg)");
			PwrapperEyeRight.css("transform","rotate(0deg)");
			BwrapperEyeLeft.css("transform","rotate(90deg)");
			BwrapperEyeRight.css("transform","rotate(90deg)");
			teyeBlue.css("transform","translate3d(0px,0px,0px)");
			teyeBlue.css("z-index","2");
		}
		
		if(num==8){
			connected.animate({
				bottom:"0"
			},1300)
			teyeBlue.css("left",187)
			teyePink.css("left",187)
			teyePink.css("transform","translate3d(0px,0px,-50px)");
			teyePink.css("z-index","1");
			teyeBlue.css("opacity","1");
			PwrapperEyeLeft.css("transform","rotate(0deg)");
			PwrapperEyeRight.css("transform","rotate(0deg)");
			BwrapperEyeLeft.css("transform","rotate(90deg)");
			BwrapperEyeRight.css("transform","rotate(90deg)");
			teyeBlue.css("transform","translate3d(0px,0px,0px)");
			teyeBlue.css("z-index","2");
			$(".teye-wrapper-connected").animate({
				bottom:"0"
			},1300,function(){
				teyeBlue.animate({
					left:"37"
				},400)
				teyePink.animate({
					left:"337",
					opacity:"0.5"
				},400)
			})
			$(".slideshow").animate({
				bottom:"-100%"
			},1300)
			
		}		
		num--;
	}
	console.log(num)
	//第8页滑动屏幕移动图标
	if(num==6){
		picWithMouse();
		clearInterval(timer1);
		clearInterval(timer2);
	}
	//第9页左右切换
	if(num==7){
		timer1=setInterval(dotPlayL,2400);
		//鼠标放入右移
		$(".cologne-flag").on("mouseover",moveRight)
		//鼠标放入左移
		$(".berlin-flag").on("mouseover",moveLeft)
	}
	//滑动时右侧列表小提示
	tips();
	//给右侧列表点击的区域添加当前页所在时小图标的激活状态。
	$(".toggle-menu-wrapper li").attr("class","inactive");	
	if(num%2){
		$(".toggle-menu-wrapper li").eq((num+1)/2).attr("class","active");
	}else{
		$(".toggle-menu-wrapper li").eq(num/2+5).attr("class","active");
	}
}

//第8页点击图标进入新的页面时左右切换图片。
var expIndex=0;
$(".modal-arrow-right").on("click",function(){
	$(".modal-content>div").eq(expIndex).fadeOut(300)
	expIndex++;
	expIndex%=$(".modal-content>div").length;
	$(".modal-content>div").eq(expIndex).show()
})
$(".modal-arrow-left").on("click",function(){
	$(".modal-content>div").eq(expIndex).fadeOut(300)
	expIndex--;
	if(expIndex<0){
		expIndex=$(".modal-content>div").length-1
	}	
	$(".modal-content>div").eq(expIndex).show()
})
//第8页点击图标进入新的页面。
$(".scene li").on("click",function(e){
	enterModal=true;	
	$(".modal-wrap").show();
	$(".modal-wrap").css("z-index",100);
	$(".modal-content>div").hide()
	e.stopPropagation();
})
$(".speaker").on("click",function(){	
	expIndex=5;
	$(".modal-content>div").eq(expIndex).show()
})
$(".motor-left").on("click",function(){	
	expIndex=4;
	$(".modal-content>div").eq(expIndex).show()
})
$(".motor-right").on("click",function(){	
	expIndex=4;
	$(".modal-content>div").eq(expIndex).show()
})
$(".raspberry").on("click",function(){	
	expIndex=0;
	$(".modal-content>div").eq(expIndex).show()
})
$(".chip").on("click",function(){	
	expIndex=1;
	$(".modal-content>div").eq(expIndex).show()
})
$(".micro").on("click",function(){	
	expIndex=7;
	$(".modal-content>div").eq(expIndex).show()
})
$(".motion-detector").on("click",function(){	
	expIndex=8;
	$(".modal-content>div").eq(expIndex).show()
})
$(".usb").on("click",function(){	
	expIndex=2;
	$(".modal-content>div").eq(expIndex).show()
})
$(".sound-card").on("click",function(){	
	expIndex=3;
	$(".modal-content>div").eq(expIndex).show()
})
$(".battery-module").on("click",function(){	
	expIndex=6;
	$(".modal-content>div").eq(expIndex).show()
})
$(".ico-close-small").on("click",function(e){
	$(".modal-wrap").hide();
	$(".modal-wrap").css("z-index",0);
	$(".modal-content>div").hide();
	enterModal=false;
	//从第八页进入大图时，关闭大图返回第八页，重新调用移动图片函数，防止关闭后无法移动图片。
	picWithMouse();
	e.stopPropagation();
})

//弹出列表选项卡
$(".toggle-menu").on("mouseover",function(){
	$(".toggle-menu-wrapper li").attr("class","inactive");	
	if(num%2){
		$(".toggle-menu-wrapper li").eq((num+1)/2).attr("class","active");
	}else{
		$(".toggle-menu-wrapper li").eq(num/2+5).attr("class","active");
	}
	$(".toggle-menu-container").css("width","100%");
	$(".toggle-menu-wrapper").show(0);//把时间写为0就可以阻止元素直接block，有过渡时间。
	$(".toggle-menu-wrapper").css("transform","translate(0px,0px)");
	$("#menuLeft").css("transform","rotateY(0deg)");
	$("#menuRight").css("transform","rotateY(0deg)");
	
})
//点击列表选页
$(".toggle-menu-wrapper li").on("click",function(){
	if(enterNewPage){
		return
	};
	if(enterModal){
		return
	};
	if($(this).attr("class")=="active"){
		return;
	}
	$(".toggle-menu-wrapper li").attr("class","inactive");
	$(this).attr("class","active");
	var index=$(".toggle-menu-wrapper li").index(this);
	if(index==4){
		clearInterval(timer1);
		clearInterval(timer2);
		timer1=setInterval(dotPlayL,2400)
	}else{
		clearInterval(timer1);
		clearInterval(timer2);
	}
	//........................第一页.....................
	if(index==0){
		$(".slides .active").css("top",10);
		num=-1;
		$("svg").hide();
		// $("svg").find("path").addClass("path")
		// $("svg").html('<path class="path" d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />')
		oneEyeLeft.css("transform","rotate(0deg)");
		oneEyeRight.css("transform","rotate(0deg)");
		$(".one").animate({
			bottom:0
		},2000);
		$(".oneText").animate({
			opacity:1
		},500);		
		$(".onoff").animate({
			right:"50%"
		},2000)
		$(".onoff span").css("border-color","rgb(255, 255, 255)")
		$(".onoff .mouth").css("top",20);
		toggleMenu.css("border-color","rgb(255,255,255)");
		toggleMenuSpan.css("border-color","rgb(255, 255, 255)");
		textDiv.eq(0).animate({
			opacity:0,
			top:"20%"
		},500)
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.css("top","20%");
		textDiv.eq(0).show();
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第二页.............................
	if(index==5){
		num=0;
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.css("top","20%");
		textDiv.eq(0).show();
		textDiv.eq(0).animate({
			opacity:1,
			top:"10%"
		},2300)
		$("svg").show();
		oneEyeLeft.css("transform","rotate(0deg)");
		oneEyeRight.css("transform","rotate(0deg)");
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第三页.............................
	if(index==1){
		num=1;
		oneEyeLeft.css("transform","rotate(90deg)");
		oneEyeRight.css("transform","rotate(-90deg)");
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).show();
		textDiv.eq(1).animate({
			opacity:1,
			top:"10%"
		},2300)
		$("svg").show();
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第四页.............................
	if(index==6){
		num=2;
		oneEyeRight.css("transform","rotate(-90deg)");
		oneEyeLeft.css("transform","rotate(0deg)");
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).show();
		textDiv.eq(2).animate({
			opacity:1,
			top:"10%"
		},2300)
		$("svg").show();
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第五页.............................
	if(index==2){
		num=3;
		oneEyeLeft.css("transform","rotate(20deg)");
		oneEyeRight.css("transform","rotate(-20deg)");
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).show();
		textDiv.eq(3).animate({
			opacity:1,
			top:"10%"
		},2300)
		$("svg").show();
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第六页.............................
	if(index==7){
		num=4;
		oneEyeLeft.css("transform","rotate(-20deg)");
		oneEyeRight.css("transform","rotate(20deg)");
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).css("top","0");
		textDiv.eq(4).show();
		textDiv.eq(4).animate({
			opacity:1,
			top:"10%"
		},2300)
		$("svg").show();
		oneEye.css("bottom",-200);
		oneEye.css("transform","scale(1)");
		$("svg").css("opacity",1)
		$(".skills").css("z-index","18");
		$(".skills").css("transform","scale(0.5)");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第七页.............................
	if(index==3){
		num=5;
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).css("top","0");
		textDiv.eq(4).show();
		textDiv.eq(4).animate({
			opacity:0,
			top:"10%"
		},2300)
		
		$("svg").css("opacity",0)
		$(".one").css("z-index","23")
		oneEyeLeft.css("transform","rotate(90deg)");
		oneEyeRight.css("transform","rotate(-90deg)");
		oneEye.css("bottom",-50);
		oneEye.css("transform","scale(0.5)");
		$(".skills").css("z-index","22");
		$(".skills").css("transform","scale(1)");
		$(".skills").css("opacity",1);
		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
//		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
	}
	//.................................第八页.............................
	if(index==8){
		num=6;
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).css("top","0");
		textDiv.eq(4).show();
		textDiv.eq(4).animate({
			opacity:0,
			top:"10%"
		},2300)
		$("svg").css("opacity",0)
		oneEyeLeft.css("transform","rotate(90deg)");
		oneEyeRight.css("transform","rotate(-90deg)");
		oneEye.css("bottom",-50);
		oneEye.css("transform","scale(0.5)");
		$(".skills").css("transform","scale(1)");
		$(".explode").css("z-index","25");
			clientW=document.documentElement.clientWidth;
			explodeWrapper.css("transition","1.3s")
			setTimeout(function(){
				explodeText.css("opacity",1)
				explodeText.css("margin-top",0)
				if(clientW<1024){
					explodeWrapper.css("transform","scale(0.5)")
				}else{
					explodeWrapper.css("transform","scale(1)")
				}
			},500)
			
			$(".skills .text").hide();
			$(".teyeone").css("bottom",-550)
			oneEye.css("transition","0s")
			oneEye.animate({
				bottom:"550"
			},800,function(){
				oneEye.css("transition","1.3s")
			})
			$(".skill-img").css("background","white");
		
		$(".skills").css("opacity",0);
//		$(".explode").css("z-index","initial")
		explodeText.css("opacity",0)
		$(".skills").hide();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
		$(".connected .text").css("opacity",0);
		$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
		$(".image-wrapper .teye-head").css("top",-850)
		$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
		$(".image-wrapper .teye-foot").css("top",650);
		teyePink.css("opacity",0)
		teyeBlue.css("left",187);
		teyePink.css("left",187);
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
		
//....................直接点击跳转第8页移动图形.........................
		picWithMouse();
	}
	//.................................第九页.............................
	if(index==4){
		num=7;
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).css("top","0");
		textDiv.eq(4).show();
		textDiv.eq(4).animate({
			opacity:0,
			top:"10%"
		},2300)
		$("svg").css("opacity",0);
		oneEyeLeft.css("transform","rotate(90deg)");
		oneEyeRight.css("transform","rotate(-90deg)");
		oneEye.css("bottom",-50);
		oneEye.css("transform","scale(0.5)");
		$(".skills").css("transform","scale(1)");
		$(".connected .text").delay(1300).animate({
				opacity:"1"
			},400)
			$(".city-connected").delay(1300).animate({
				opacity:"1"
			},400)
			connected.css("z-index","26")
			explodeText.css("opacity","0")
			explodeWrapper.css("transform","scale(0)")
			teyeBlue.css("left",187);
			$(".image-wrapper .teye-head").animate({
				top:"24"
			},1300)
			$(".teye-wrapper-blue .image-wrapper img").animate({
				left:"0"
			},1300)
			$(".image-wrapper .teye-foot").animate({
				top:"107"
			},1300)
			teyeBlue.delay(1300).animate({
				left:"37"
			},400)
			teyePink.delay(1300).animate({
				left:"337",
				opacity:"0.5"
			},400)
		$(".skills .text").hide();
			$(".teyeone").css("bottom",-550)
			oneEye.css("transition","0s")
			oneEye.animate({
				bottom:"550"
			},800,function(){
				oneEye.css("transition","1.3s")
			})
			$(".skill-img").css("background","white");
		
		$(".skills").css("opacity",0);
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
//		connected.css("z-index","initial")
		connected.css("bottom",0);
		$(".teye-wrapper-connected").css("bottom",0);
		$(".slideshow").css("bottom","-100%");
		$(".skills").css("z-index","18");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","25")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		$(".skill-img").css("background","none");		
		//鼠标放入右移
		$(".cologne-flag").on("mouseover",moveRight);
		//鼠标放入左移
		$(".berlin-flag").on("mouseover",moveLeft);
	}
	//.................................第十页.............................
	if(index==9){
		num=8;
		$(".one").css("bottom","100%");
		$(".oneText").css("opacity",0);
		$(".onoff").css("right",8);
		$(".onoff span").css("border-color","rgb(147, 90, 36)")
		$(".onoff .mouth").css("top",40);
		toggleMenu.css("border-color","rgb(147, 90, 36)");
		toggleMenuSpan.css("border-color","rgb(147, 90, 36)");
		textDiv.hide();
		textDiv.css("opacity",0);
		textDiv.eq(0).css("top","0");
		textDiv.eq(1).css("top","0");
		textDiv.eq(2).css("top","0");
		textDiv.eq(3).css("top","0");
		textDiv.eq(4).show();
		textDiv.eq(4).animate({
			opacity:0,
			top:"10%"
		},2300)
		$(".slideshow").css("z-index","27");
			connected.animate({
				bottom:"100%"
			},1300)
			$(".teye-wrapper-connected").animate({
				bottom:"100%"
			},1300)
			$(".slideshow").animate({
				bottom:"0"
			},1300)
		
		$("svg").css("opacity",0);
		oneEye.css("bottom",-50);
		oneEye.css("transform","scale(0.5)");
		oneEyeLeft.css("transform","rotate(90deg)");
		oneEyeRight.css("transform","rotate(-90deg)");
		$(".skills").css("transform","scale(1)");
		$(".connected .text").css("opacity",1)
		$(".city-connected").css("opacity",1);
		connected.css("z-index","26")
		explodeText.css("opacity","0")
		explodeWrapper.css("transform","scale(0)")
		teyeBlue.css("left",187);
		$(".image-wrapper .teye-head").css("top",24)
		$(".teye-wrapper-blue .image-wrapper img").css("left",0);
		$(".image-wrapper .teye-foot").css("top",107);
		teyeBlue.css("left",37);
		teyePink.css("left",337);
		$(".skills .text").hide();
		$(".teyeone").css("bottom",-550)
		oneEye.css("transition","0s")
		oneEye.animate({
				bottom:"550"
			},800,function(){
				oneEye.css("transition","1.3s")
			})
		$(".skill-img").css("background","white");		
		$(".skills").css("opacity",0);
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
//		oneEye.css("bottom",-200);
		$(".skill-img").css("background","none");
//		oneEye.css("transform","scale(1)");
		$(".skills").css("z-index","18");
		$(".skills").css("opacity",0);
		$(".explode").css("z-index","25")
		explodeText.css("opacity",0)
		$(".skills").show();
		explodeText.css("margin-top",100)
		explodeWrapper.css("transform","scale(0)")	
		$(".ico").css("opacity",1)
		$(".teyetwo").css("bottom",-50);
		$(".teyeone").css("bottom",0);
		$(".skills .text").show();
		$(".skill-img").css("background","none");
		
		//点击上下一页以及按住拖动切换图片
		$(".owl-next").on("click",next);
		$(".owl-prev").on("click",prev);		
		movePic();
	}
	console.log(index)
	tips();
})
//鼠标离开右侧列表，列表选项卡消失
$(".toggle-menu-wrapper").on("mouseleave",function(){
	$(".toggle-menu-wrapper").css("transform","translate(50%,0%)");
	setTimeout(function(){
		$(".toggle-menu-wrapper").hide();
		$(".toggle-menu-container").css("width","auto");
	},800)
	
	$("#menuLeft").css("transform","rotateY(90deg)");
	$("#menuRight").css("transform","rotateY(-90deg)");
})


//点击按钮跳回主页
$(".onoff").on("click",function(){
	if(num==-1){
		return;
	};
	if(enterNewPage){
		return
	};
	if(enterModal){
		return
	};
	num=-1;
	$("svg").hide();
	// svgW=parseFloat($("svg").css("width"));
	// svgH=parseFloat($("svg").css("height"));
	// $("svg").html('<path class="path" d="M0 '+svgH+' L0 0 L'+svgW+' 0 L'+svgW+' '+svgH+' Z" stroke="green" stroke-width="5" fill="none" />')
	oneEyeLeft.css("transform","rotate(0deg)");
	oneEyeRight.css("transform","rotate(0deg)");
	$(".one").animate({
		bottom:0
	},2000);
	$(".oneText").animate({
		opacity:1
	},500);
	
	$(".onoff").animate({
		right:"50%"
	},2000)
	$(".onoff span").css("border-color","rgb(255, 255, 255)")
	$(".onoff .mouth").css("top",20);
	$(".slides .active").css("top",10);
	toggleMenu.css("border-color","rgb(255,255,255)");
	toggleMenuSpan.css("border-color","rgb(255, 255, 255)");
	textDiv.eq(0).animate({
		opacity:0,
		top:"20%"
	},500)
	textDiv.hide();
	textDiv.css("opacity",0);
	textDiv.css("top","20%");
	textDiv.eq(0).show();
	oneEye.css("bottom",-200);
	oneEye.css("transform","scale(1)");
	$("svg").css("opacity",1)
	$(".skills").css("z-index","18");
	$(".skills").css("transform","scale(0.5)");
	$(".skills").css("opacity",0);
	$(".explode").css("z-index","initial")
	explodeText.css("opacity",0)
	$(".skills").show();
	explodeText.css("margin-top",100)
	explodeWrapper.css("transform","scale(0)")	
	$(".ico").css("opacity",1)
	$(".teyetwo").css("bottom",-50);
	$(".teyeone").css("bottom",0);
	$(".skills .text").show();
	oneEye.css("bottom",-200);
	$(".skill-img").css("background","none");
	$(".connected .text").css("opacity",0);
	$(".city-connected").css("opacity",0);
		connected.css("z-index","initial")
	$(".image-wrapper .teye-head").css("top",-850)
	$(".teye-wrapper-blue .image-wrapper img").css("left",-874)
	$(".image-wrapper .teye-foot").css("top",650);
	teyePink.css("opacity",0)
	teyeBlue.css("left",187);
	teyePink.css("left",187);
	connected.css("bottom",0);
	$(".teye-wrapper-connected").css("bottom",0);
	$(".slideshow").css("bottom","-100%");
	$(".ico-mouse").show();
	$(".ico-mouse .wheel").show();
	$(".slides li a").css("background","rgb(255, 255, 255)");
	$(".slides .active").css("border-color","rgb(255, 255, 255)");
})


var timerOne=null;
var timerTwo=null;
var timerThree1=null;
var timerThree2=null;
var timerFour=null;
var skillPage=0;
//...................四个技能点击事件.................................
//          第一张技能函数
var submenue=$(".submenu");
var submenueA=$(".submenu a");
var motionDotsSpan=$(".motion .dots span");
var sound=$(".sound");
var battery=$(".battery");
var motion=$(".motion");
var voice=$(".voice");
var batteryFill=$(".battery-fill");
var batteryImg=$(".batteryImg");
var batteryText=$(".battery .text");
function sameAnimation(n){
	skillPage=n;
	enterNewPage=true;
	$("section").hide();
	submenueA.removeClass("active");
	submenueA.eq(n-1).addClass("active");
	submenue.delay(200).animate({
		"opacity":"1"
	},1000)
}
function skillOnePage(){	
	sameAnimation(1);		
	battery.show();								
	batteryFill.delay(200).animate({
		"width":"100%"
	},1000)
	batteryImg.delay(200).animate({
		"top":"4",
		"opacity":"1"
	},1000)
	batteryText.delay(200).animate({
		"top":"0",
		"opacity":"1"
	},1000)
	$(".wifi-dot").delay(700).animate({
			opacity:"1"
		},500)
				
	timerOne=setInterval(function(){
		//爱心
		$(".ico-heart").css("transform","scale(1.2)");
		setTimeout(function(){
			$(".ico-heart").css("transform","scale(1)");
		},600)
		$(".wifi-small").animate({
			top:"0",
			opacity:"1"
		},1000,function(){
			$(".wifi-small").css("top",15);
			$(".wifi-small").css("opacity",0);
		})
		//wifi信号
		$(".wifi-middle").delay(300).animate({
			top:"0",
			opacity:"1"
		},700,function(){
			$(".wifi-middle").css("top",15);
			$(".wifi-middle").css("opacity",0);
		})
		
		$(".wifi-big").delay(500).animate({
			top:"0",
			opacity:"1"
		},500,function(){
			$(".wifi-big").css("top",15);
			$(".wifi-big").css("opacity",0);
		})
	},1200)
}
//  第二张技能函数
function skillTwoPage(){
	sameAnimation(2);
	motion.show();
	
	$(".motion .content-wrapper").delay(200).animate({
		"opacity":"1"
	},500)
	$(".ray-distance").delay(200).animate({
		"opacity":"1"
	},500)
	$(".ray-end").delay(200).animate({
		"opacity":"1"
	},500)
	$(".motionImg").delay(200).animate({
		"left":"0",
		"opacity":"1"
	},1000)
	$(".motion .text").delay(200).animate({
		"top":"142",
		"opacity":"1"
	},1000)	
	$(".ray-left").css("left",600);
	$(".ray-left").eq(0).css("top",47);
	$(".ray-left").eq(1).css("top",-3);
	$(".ray-right").delay(1000).animate({
		left:"600",
		top:"15",
		opacity:"1"
	},2000,function(){
		$(".ray-right").css("top",133);
		$(".ray-right").css("left",-250);
		$(".ray-right").css("opacity",0);
		$(".ray-right").animate({
			left:"185",
			top:"76",
			opacity:"1"
		},1500)
	})
	$(".ray-left").css("opacity",1)
	$(".ray-left").eq(0).delay(2200).animate({
		left:"0",
		top:"130",
		opacity:"0"
	},1500)
	$(".ray-left").eq(1).delay(2200).animate({
		left:"0",
		top:"80",
		opacity:"0"
	},1500)
	function motionDotPlay(){
		for (var i = 0; i < 3; i++) {
			(function(i){
				setTimeout(function(){
					motionDotsSpan.eq(i).css("opacity","0");
				},(i+12)*100)
			})(i);
			(function(i){
				setTimeout(function(){
					motionDotsSpan.eq(i).css("opacity","1");
				},(i+18)*100)
			})(i);
		}
	}
	motionDotPlay();
	timerTwo=setInterval(motionDotPlay,2000)
}
//    第三张技能函数	
function skillThreePage(){
	sameAnimation(3);
	sound.show();
	$(".sound .content-wrapper").delay(200).animate({
		"opacity":"1"
	},500)
	$(".soundImg").delay(200).animate({
		"top":"0",
		"opacity":"1"
	},1000)
	$(".sound .text").delay(200).animate({
		"top":"0",
		"opacity":"1"
	},1000)	
	$(".sound .icon-animation").css("left",-75)
	$(".sound .icon-animation").animate({
		"opacity":"1",
		"left":"0"
	},1000)
	$(".note-left").delay(200).animate({
		"left":"10%",
		"opacity":"1"
	},1000)
	$(".note-right").delay(200).animate({
		"right":"10%",
		"opacity":"1"
	},1000)
	function noteplay(){
		$(".note-left .note-small").animate({
			left:"100",
			opacity:"1"
		},1000,function(){
			$(".note-left .note-small").css("left",150);
			$(".note-left .note-small").css("opacity",0);
		})
		$(".note-right .note-small").animate({
			left:"47",
			opacity:"1"
		},1000,function(){
			$(".note-right .note-small").css("left",6);
			$(".note-right .note-small").css("opacity",0);
		})
		
		$(".note-left .note-middle").delay(300).animate({
			left:"50",
			opacity:"1"
		},700,function(){
			$(".note-left .note-middle").css("left",100);
			$(".note-left .note-middle").css("opacity",0);
		})
		$(".note-right .note-middle").delay(300).animate({
			left:"73",
			opacity:"1"
		},700,function(){
			$(".note-right .note-middle").css("left",23);
			$(".note-right .note-middle").css("opacity",0);
		})
		
		$(".note-left .note-big").delay(500).animate({
			left:"0",
			opacity:"1"
		},500,function(){
			$(".note-left .note-big").css("left",50);
			$(".note-left .note-big").css("opacity",0);
		})
		$(".note-right .note-big").delay(500).animate({
			left:"108",
			opacity:"1"
		},500,function(){
			$(".note-right .note-big").css("left",58);
			$(".note-right .note-big").css("opacity",0);
		})
	}
	noteplay();
	timerThree1=setInterval(noteplay,1200)
//
	function soundplay(){
		$(".ico-sound-big span").eq(1).animate({
			left:"76",
			opacity:"1"
		},1000,function(){
			$(".ico-sound-big span").eq(1).css("left",45)
			$(".ico-sound-big span").eq(1).css("opacity",0)
		})
		$(".ico-sound-big span").eq(0).delay(400).animate({
			left:"60",
			opacity:"1"
		},600,function(){
			$(".ico-sound-big span").eq(0).css("left",45)
			$(".ico-sound-big span").eq(0).css("opacity",0)
		})
	}
	setTimeout(function(){
		timerThree2=setInterval(soundplay,1200)
	},600)
}
//    第四张技能函数
function skillFourPage(){
	sameAnimation(4);
	voice.show();
	$(".voice .content-wrapper").delay(200).animate({
		"opacity":"1"
	},500)
	$(".voiceImg").delay(200).animate({
		"top":"0",
		"opacity":"1"
	},1000)
	$(".voice .text").delay(200).animate({
		"top":"0",
		"opacity":"1"
	},1000)	
	
	timerFour=setInterval(function(){
		$(".ico-voice-circle").eq(0).css("transition","1s")
		$(".ico-voice-circle").eq(1).css("transition","1.8s")
		$(".ico-voice-circle").css("transform","scale(1.8)")
		$(".ico-voice-circle").css("opacity","0")
		setTimeout(function(){
			$(".ico-voice-circle").css("transition","none")
			$(".ico-voice-circle").css("transform","scale(1)")
			$(".ico-voice-circle").css("opacity","1")
		},1800)
	},1850)
}
//第一张
$(".circle1").on("click",function(e){
	skillOnePage();
	e.stopPropagation();
})
//第二张
$(".circle2").on("click",function(e){
	skillTwoPage();
	e.stopPropagation();
})
//第三张
$(".circle3").on("click",function(e){
	skillThreePage();
	e.stopPropagation();
})
//第四张
$(".circle4").on("click",function(e){
	skillFourPage();
	e.stopPropagation();
})
//..........................点击关闭按钮.......................
function skillClose(e){
//..........................点击关闭按钮第一页.......................			
	if(skillPage==1){
		clearInterval(timerOne)
		batteryFill.animate({
			"width":"0%"
		},1000)
		$(".wifi-dot").animate({
			"opacity":"0"
		},1000)
		batteryImg.animate({
			"top":"500",
			"opacity":"0"
		},1000)
		batteryText.animate({
			"top":"200",
			"opacity":"0"
		},1000)
	}
//..................................关闭当前第二页..........................			
	if(skillPage==2){
		clearInterval(timerTwo);
		$(".ray-right").finish()
		$(".ray-left").finish()
		$(".motion .text").animate({
			"top":"342",
			"opacity":"0"
		},1000)
		$(".motionImg").animate({
			"left":"-1000",
			"opacity":"0"
		},1000)
		$(".motion .content-wrapper").animate({
			"opacity":"0"
		},500)
		$(".ray-distance").animate({
			"opacity":"0"
		},500)
		$(".ray-end").animate({
			"opacity":"0"
		},500)
		$(".ray-left").css("left",600);
		$(".ray-left").eq(0).css("top",47);
		$(".ray-left").eq(1).css("top",-3);
		$(".ray-right").css("top",133);
		$(".ray-right").css("left",-250);
		$(".ray-right").css("opacity",0);		
	}
//..................................关闭当前第三页..........................			
	if(skillPage==3){
		clearInterval(timerThree1);
		clearInterval(timerThree2);
		$(".sound .text").animate({
			"top":"200",
			"opacity":"0"
		},1000)
		$(".soundImg").animate({
			"top":"-400",
			"opacity":"0"
		},1000)
		$(".sound .content-wrapper").animate({
			"opacity":"0"
		},500)
		$(".note-left").animate({
			"left":"30%",
			"opacity":"0"
		},1000)
		$(".note-right").animate({
			"right":"30%",
			"opacity":"0"
		},1000)
		$(".sound .icon-animation").animate({
			"opacity":"0"
		},1000)
	}
//..................................关闭当前第四页..........................			
	if(skillPage==4){
		clearInterval(timerFour);
		$(".voice .text").animate({
			"top":"-100",
			"opacity":"0"
		},1000)
		$(".voiceImg").animate({
			"top":"-100%",
			"opacity":"0"
		},1000)
		$(".voice .content-wrapper").animate({
			"opacity":"0"
		},500)
	}						
}

$(".ico-close-small").on("click",function(e){
	skillClose();
	submenue.animate({
		"opacity":"0"
	},1000,function(){
		$("section").show();
		battery.hide();
		motion.hide();
		sound.hide();
		voice.hide();
	})
	enterNewPage=false;
	e.stopPropagation();
	
})

//.....................点击小图标按钮....................		
$(".ico-battery-small").on("click",function(){
	if(skillPage==1){
		return
	}
	skillClose();
	skillOnePage();	
})
$(".ico-motion-small").on("click",function(){
	if(skillPage==2){
		return
	}
	skillClose();
	skillTwoPage();	
})
$(".ico-sound-small").on("click",function(){
	if(skillPage==3){
		return
	}
	skillClose();
	skillThreePage();	
})
$(".ico-voice-small").on("click",function(){
	if(skillPage==4){
		return
	}
	skillClose();
	skillFourPage();	
})