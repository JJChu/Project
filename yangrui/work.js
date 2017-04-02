$(function(){
//	--------------------------初始化---------------------------------
	var li=$(".lis li");
	li.eq(0).addClass("apedd");
	$(".jianjie-1").eq(0).animate({"margin-left":"540px"},900);
	$(".jianjie-2").eq(0).animate({"margin-left":"231px"},1400);
	var i=0;
	var t=0;
	li.eq(0).addClass("apedd");
	$(".hometown-right1").each(function(i){		
		$(this).css({"background":"url('img/"+i+".jpg')","background-size":"249px 185px"})
		i++;
	});
	li.css({transition:"1s",
			transform:"scaleY(1)",
			opacity:"1"
	});	
//---------------------------导航---------------------------------------
	li.on("click",function(){
		var data=$(this).attr("dataid");
		$(".section1").css({"display":"none"});
		li.removeClass("apedd")
		$(this).addClass("apedd");
		$(".section1").eq(data).css({"display":"block"});
	});
//-----------------------第一页-----------------------------------------
	li.eq(0).on("click",function(){
		p=0;
		clearInterval(timer)
	});
	$(".backTop").on("click",function(){
        $('body').animate({scrollTop:0},500);
	});
//----------------------------------懒加载-----------------------------
	$(window).scroll(function(){
		var homeTown =$(".hometown-left")[0].getBoundingClientRect().top;
		var whight=(document.documentElement.clientHeight)/2;		
		if(homeTown < whight && li.eq(0).hasClass("apedd")){
			$(".hometown-left").css({
				opacity:"1",
				transition:"1s",
				transform:"rotateZ(360deg)"				
			});
			$(".hometown-right1").each(function(i){
				if(i==0 || i==1){
					$(this).css({transition:"2s",transform:"scaleX(1)"});
				}else{
					$(this).css({transition:"2s",transform:"scaleY(1)"});
				};
			});
		};
	});
	//---------------------------------移动效果---------------------------
	$(".hometown-right1").hover(
		function(){
			$(this).find(".hometown-right2").css({
				transform:"rotateZ(0deg)",
				transition:"500ms",
				opacity:"0.9"
			});
		},
		function(){
			$(this).find(".hometown-right2").css({
				transform:"rotateZ(-45deg)",
				transition:"500ms",
				opacity:"0"
			});
		}
	)
//-------------------------第二页-------------------------------
	$(".photo1 li:odd").addClass("margin-right");
	var e=0;
	$(".photo3 li").each(function(i){
		$(this).css({"background-position":"0 "+-(i*20)+"px"});
		$(this).data("onoff",false);
		$(this).data("index",i);
	})
	$(".photo3 li").hover(
		function(){
			$(this).css({"opacity": "1"})
			$(this).data("onoff", true)
		},
		function(){
			$(this).animate({"opacity": "0"},200,function(){
				if($(this).data("index")==0 ||$(this).data("index")==$(".photo3 li").length-1){
					if(pan()){
						e++;
						e=e%9;
						$(".photo3 li").css({"backgroundImage":"url(img1/"+e+".jpg)"});
						$(".photo3 li").data("onoff", false);
					}
				}
			
			});
		}
	)
	function pan(){
		for(var i=0;i<$(".photo3 li").length;i++){
			if ($(".photo3 li").eq(i).data("onoff")== false){
				return false;
			}
		}
		return true;
	}
	var p=0;
	var s=0
	var timer=null;
//-----------------------封装运动函数----------------------------
	function setInterva(){
		timer=setInterval(function(){
			p++;
			p=p%9;
			$(".photo1 li").each(function(i){
				$(this).css({"background":"url(img1/"+p+".jpg)","background-position":""+-(i*125)+"px 0"})
			})			
			$(".photo1 li").animate({"marginTop":"0","opacity":"1"},800,function(){
				$(".photo1").css({"background":"url(img1/"+p+".jpg)"})
				$(".photo1 li:odd").css({"margin-top":"-300px","opacity":"0"})
				$(".photo1 li:even").css({"margin-top":"300px","opacity":"0"})
			});
		},1000);			
	}
//-------------------------图片切换--------------------------------
	
	li.eq(1).on("click",function(){
		if(timer){
			return;
		};
		setInterva();	
	});
	
	$(".photo1").on("mousemove",function(){
		clearInterval(timer)		
	});
	$(".photo1").on("mouseout",function(){
		setInterva();		
	});
	
//-----------------------------第三页----------------------------------------
	li.eq(2).on("click",function(){
		clearInterval(timer);
		timer=null	
		p=0;		
	})
//-----------------------------爆炸效果----------------------------------------	
	var onoff=false;
	var r=0;
	for(var i=0;i<200;i++){
		$(".cachu").append("<li style='left:"+((i%20)*50)+"px;top:"+Math.floor(i/20)*50+"px;background-position:"+(-(i%20)*50)+"px "+(-Math.floor(i/20)*50)+"px'></li>");
	};	
	$(".cachu").on("click",function(){		
		if(onoff==false){
			var ran=Math.random();
			$(".cachu li").each(function(i){			
				$(this).css({"transform":"rotateX("+180*Math.random()+"deg) rotateY("+360*Math.random()+"deg) rotateZ("+360*Math.random()+"deg) translateZ("+ran*1000+"px)"
				});
			});
		}else{
			r++;
			r= r<9? r:0
			$(".cachu").css({"perspective":"0"})
			console.log(r);
			$(".cachu li").css({"transform":"","background-image":"url(img1/"+r+".jpg)"})
		}
		onoff=!onoff;
	});
//--------------------------懒加载--------------------------------	
	$(window).scroll(function(){
			var photodown =$(".Hover")[0].getBoundingClientRect().top;
			var hhight=(document.documentElement.clientHeight);		
			if(photodown < hhight && li.eq(2).hasClass("apedd")){
				$(".Hover").css({"margin-left":"174px","transition":"2s","opacity":"1"});
			};
		});
	//------------------------图片-------------------------------
	$(".Hover li").eq(0).on("mouseover",function(){
		$(this).stop().animate({"backgroundPositionY":0},1000);
		$(".Hover li h2").eq(0).stop().animate({"top":"100px"},1000);
		$(".Hover li span").eq(0).stop().animate({"opacity":"1","top":"250px"},1000);
		$(".xia").eq(0).stop().animate({"opacity":"0.4"},1000);
	})
	$(".Hover li").eq(0).on("mouseout",function(){
		$(this).stop().animate({"backgroundPositionY":-20},1000);
		$(".Hover li h2").eq(0).stop().animate({"top":"150px"},1000);
		$(".Hover li span").eq(0).stop().animate({"top":"300px","opacity":"0"},1000);
		$(".xia").eq(0).stop().animate({"opacity":"0"},1000);
	})
//--------------------------图片2-------------------------------
	$(".Hover li").eq(1).hover(function(){
		$(".dfg").stop().animate({"width":"380px"},1000);
		$(".Hover li span").eq(1).stop().animate({"left":"20px","top":"70px"},1000);
		$(".xia").eq(1).stop().animate({"opacity":"0.4"},1000);		
	},function(){
		$(".dfg").stop().animate({"width":"0"},1000);
		$(".Hover li span").eq(1).stop().animate({"left":"999px","top":"70px"},1000);
		$(".xia").eq(1).stop().animate({"opacity":"0"},1000);	
	})
//------------------------------图片3---------------------------
	$(".Hover li").eq(2).hover(function(){
		$(this).stop().animate({"backgroundPositionX":-20},1000);
		$(".dances").eq(0).stop().animate({"left":"30px"},1000);
		$(".dances").eq(1).stop().animate({"left":"30px","top":"115px"},1200);
		$(".dances").eq(2).stop().animate({"left":"30px","top":"140px"},1400);
		$(".xia").eq(2).stop().animate({"opacity":"0.4"},1000)
	},function(){
		$(this).stop().animate({"backgroundPositionX":0},1000);
		$(".dances").stop().animate({"left":"-999px","top":"90px"},1000);
		$(".xia").eq(2).stop().animate({"opacity":"0"},1000)
	})
//------------------------------图片4-------------------------------
	$(".Hover li").eq(3).hover(function(){
		$(".zhegai").css({"transform":"rotateZ(45deg) translate(-450px,650px)","transition":"2s"});
		$(".lit").stop().animate({"top":"250px","opacity":"1"},1000);
	},function(){
		$(".zhegai").css({"transform":"rotateZ(45deg) translate(20px,-20px)","transition":"2s"});
		$(".lit").stop().animate({"top":"300px","opacity":"0"},1000);
	})
//------------------------------第四页--------------------------------------
	li.eq(3).on("click",function(){
		clearInterval(timer);		
		$(".jianjie-1").eq(1).animate({"margin-left":"540px"},900);
		$(".jianjie-2").eq(1).animate({"margin-left":"231px"},1400,function(){
			$(".last-box").animate({"marginTop":"0","opacity":"1"},2000);
		});
		timer=null
		p=0;
		
	})
//------------------------------footer-------------------------------------
  $(".footer span:first-child").css({
  	"margin-left":"400px"
  })
	var stop=setInterval(function(){
		t++;
		$(".footer span").css({
			transform:"rotateY("+t*360+"deg)",
			transition:"3000ms",
			"margin-bottom":"20px"
		});
	},1000)
})
