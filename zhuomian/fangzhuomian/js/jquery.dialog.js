;(function($){
	//.................拖拽....................
	function Drag(element,options){

		this.defaults = {
			left:null
		}

		this.element = element;  //被拖拽的元素 jq对象

		$.extend(true,this.defaults,options);
		
		this.init();	
	}

	Drag.prototype = {
		constructor:Drag,
		init(){
			//this => Drag创造的实例
			this.element.on("mousedown",this.downFn.bind(this));
		},
		downFn(ev){
			//this =>  拖拽的原生的元素
			//要把这个函数中的this指向实例
			this.disX = ev.pageX - this.element.position().left;
			this.disY = ev.pageY - this.element.position().top;
			//记录鼠标按下时的位置
			this.dix =this.element.position().left;
			this.disy =this.element.position().top;
			$(document).on("mousemove.drag",this.moveFn.bind(this))
			$(document).on("mouseup.drag",this.upFn.bind(this))
			return false;
		},
		moveFn(ev){
			this.element.css("left",ev.clientX-this.disX);
			this.element.css("top",ev.clientY-this.disY);

			//触发moving自定事件
			this.element.trigger("moving");
		},
		upFn(){
			$(document).off("mousemove.drag mouseup.drag");
			this.element.css("left",this.dix);
			this.element.css("top",this.disy);
		}
	}
	$.fn.drag = function (options){
		new Drag(this,options);
	}
	$(function (){
		$(".file").drag();
		$(".file-1").drag();
		$(".file-2").drag();
		$(".file-3").drag();
		$(".file-4").drag();
		$(".file-5").drag();
		$(".file-6").drag();
	})
	
	
//......................弹框................................
	function Tab(opction){
		opction = opction  || {};
		if(opction.constructor!==Object){
			opction={};
		}
		this.decou={
			title:"123",
			src:null,
			left:null,
			top:null,
			content:"3D翻转文字"
		}
		for(var attr in opction){
			if(opction.hasOwnProperty(attr)){
				this.decou[attr]=opction[attr];
			}
		}
		this.init();
	}
	Tab.prototype={
		coustructor:Tab,
		init(){
			this.diaDiv = this.createHtml();
			$("body").append(this.diaDiv);
			this.diaDiv = this.diaDiv.get(0);
			this.diaDiv.style.zIndex=100;
			this.mask=this.createmask();
			document.body.appendChild(this.mask);
			this.mask.style.zIndex=99;
			this.position();
			this.h3 = this.diaDiv.querySelector("h3")
		},
		position(){
			var isleft = this.decou.left!==null && isNaN(Number(this.decou.left));
			var istop = this.decou.top!==null && isNaN(Number(this.decou.top));
			var left = (document.documentElement.clientWidth - this.diaDiv.offsetWidth)/2;
			var top = (document.documentElement.clientHeight - this.diaDiv.offsetHeight)/2;
			if(isleft){
				left=this.decou.left;
			}
			if(istop){
				top = this.decou.top;
			}
			this.diaDiv.style.left=left+"px";
			this.diaDiv.style.top=top+"px";
		},
		createHtml(){
			var diaDiv =$("<div></div>");
			diaDiv.addClass("full-pop");
			var diaHtml = `
					<div class="title-title">
						<h3 class="title">${this.decou.title}</h3>
						<div class="title-right">
							<span class="narrow" title="缩小"></span>
							<span class="enlarge" title="放大"></span>
							<span class="close" title="关闭"></span>
						</div>
					</div>
					<iframe src=${this.decou.src}></iframe>
					<div class="motif">
						<div class="bg">
							<span class="bg-bg"></span>
							<span class="bg-font">可爱娃娃</span>
						</div>
						<div class="bg">
							<span class="bg-bg2"></span>
							<span class="bg-font">我们的心</span>
						</div>
						<div class="bg">
							<span class="bg-bg3"></span>
							<span class="bg-font">梦幻光影</span>
						</div>
						<div class="bg">
							<span class="bg-bg4"></span>
							<span class="bg-font">日出光景</span>
						</div>
					</div>
					`;
			diaDiv.html(diaHtml );
			return diaDiv;
		},
		createmask(){
			var mask = document.createElement("div");
			$(mask).addClass("mask");
			return mask;
		}
	}
	$.dialog=function(opction){
		new Tab(opction)
	}
	//...........生成弹框内容.......................
	$(".content-class .file-2").dblclick(function (){//3D翻转文字
		//缩小窗口
		new_obj = $("icons-1");
		$(".icons-1").slideDown(1000);
		$(".begin").hide();
		$.dialog({
			title:"3D翻转文字",
			src:"../3Dfanzhuanwenzi/index2.html"
		});
		//窗口切换
		Nwe();
		
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class .file").dblclick(function (){//微 云
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".begin").hide();
		$.dialog({
			title:"微 云",
			src:"../weiyu/html/微云.html"
		});
		$(".icons-bg").css("background","url(img/weiyun.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("微云");
		//窗口切换
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class .file-5").dblclick(function (){//爱奇艺app
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".begin").hide();
		$.dialog({
			title:"爱奇艺APP",
			src:"../aiqiyiAPP/html/aiqiyi.html"
		});
		$(".icons-bg").css("background","url(img/aiqiyi-.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("爱奇艺APP");
		//窗口切换
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class .file-3").dblclick(function (){//爱奇艺首页
			//缩小窗口
			$(".icons-1").slideDown(1000);
			$(".begin").hide();
			$.dialog({
				title:"爱奇艺首页",
				src:"../aiqiyi/html/aiqiyi.html"
			});
			$(".icons-bg").css("background","url(img/aiqiyi-2.png) no-repeat");
			$(".icons-bg").css("background-size","32px 30px");
			$(".icons-font").html("爱奇艺");
			//窗口切换
			Nwe();
			$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
			})
		})
	$(".content-class .file-4").dblclick(function (){//漂浮的文字
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".begin").hide();
		$.dialog({
			title:"漂浮的文字",
			src:"../piaofu/index.html"
		});
		$(".icons-bg").css("background","url(img/xuan.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("漂浮文字");
		//窗口切换
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class .file-6").dblclick(function (){//lehtml
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".begin").hide();
		$.dialog({
			title:"lehtml响应式",
			src:"../lehtml/html/lehtml-2.html"
		});
		$(".icons-bg").css("background","url(img/1-2.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("lehtml响应式");
		//窗口切换
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})

	function Nwe(){//自定义窗口放大缩小
		$(".narrow").click(function(){
			$(".full-pop").fadeOut("slow");
			$(".mask").show();
		})
		
		$(".close").click(function(){//关闭
			$(".full-pop").remove();
			$(".mask").remove();
			$(".icons-1").slideUp("slow");
			$(".icons-1").off();
		})
		var largeOnoff = true;
		$(".enlarge").click(function(){//点击最大化
			var full =$(".full-pop");
			if (largeOnoff) {
				full.css({'left':'0','top':'0','width':'1366','height':'600'})
				$(".title-title").css("width",1366);
				$("iframe").css({'width':'1366','height':'570'});
				$(this).addClass('enlarge-v');
			} else{
				full.css({'left':'184.5','top':62,'width':'980','height':'30'})
				full.css("left",184.5);
				$(".title-title").css("width",980);
				$("iframe").css({'width':'980','height':'490'});
				$(this).removeClass('enlarge-v');
			}
			largeOnoff = !largeOnoff;
		})
	}
	$(".content-class .file-1").dblclick(function (){//垃圾桶
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(img/lasi.jpg) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("回收站");
		$(".begin").hide();
		$.dialog({
			title:"回收站"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class1 .file").dblclick(function (){//读览天下
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/readGod.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("读览天下");
		$(".begin").hide();
		$.dialog({
			title:"读览天下"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class1 .file-1").dblclick(function (){//团购地图
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/tuanmap.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("团购地图");
		$(".begin").hide();
		$.dialog({
			title:"团购地图"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class1 .file-2").dblclick(function (){//芒果旅游
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/mangguo.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("芒果旅游");
		$(".begin").hide();
		$.dialog({
			title:"芒果旅游"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class2 .file").dblclick(function (){//SOSO地图
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/sosomap.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("SOSO地图");
		$(".begin").hide();
		$.dialog({
			title:"SOSO地图"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class2 .file-1").dblclick(function (){//奥尔网
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/friend.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("奥尔网");
		$(".begin").hide();
		$.dialog({
			title:"奥尔网"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class2 .file-2").dblclick(function (){//开开
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/kaikai.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("开开");
		$(".begin").hide();
		$.dialog({
			title:"开开"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class3 .file").dblclick(function (){//Pixlr
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/Pixlr.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("Pixlr");
		$(".begin").hide();
		$.dialog({
			title:"Pixlr"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class3 .file-1").dblclick(function (){//音乐盒子
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/musicbox.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("音乐盒子");
		$(".begin").hide();
		$.dialog({
			title:"音乐盒子"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class4 .file").dblclick(function (){//天气
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/5.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("天气");
		$(".begin").hide();
		$.dialog({
			title:"天气"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class4 .file-1").dblclick(function (){//欢乐斗地主
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/doudizhu.pn) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("欢乐斗地主");
		$(".begin").hide();
		$.dialog({
			title:"欢乐斗地主"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class2 .file-2").dblclick(function (){//开开
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/kaikai.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("开开");
		$(".begin").hide();
		$.dialog({
			title:"开开"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".content-class5 .file").dblclick(function (){//时钟
		//缩小窗口
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/time.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("时钟");
		$(".begin").hide();
		$.dialog({
			title:"时钟"
		});
		$("iframe").hide();
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
	})
	$(".trumpet").click(function(){
		$(this).toggleClass("trumpet").toggleClass("trumpet-2");
	})
	$(".theme,.uls-lis").click(function (){
		$.dialog({
			title:"主题设置"
		});
		//弹框缩小
		$("iframe").hide();
		$(".motif").show();
		$(".enlarge").hide();
		$(".narrow").hide();
		$(".bg").eq(0).click(function(){
			console.log("3333");
			$("#box").css("background","url(img/beijing3.jpg) no-repeat");
			$("#box").css("background-size","100% 100%");
		})
		$(".bg").eq(1).click(function(){
			$("#box").css("background","url(img/beijing1-1.jpg) no-repeat");
			$("#box").css("background-size","100% 100%");
		})
		$(".bg").eq(2).click(function(){
			$("#box").css("background","url(img/beijing2.jpg) no-repeat");
			$("#box").css("background-size","100% 100%");
		})
		$(".bg").eq(3).click(function(){
			$("#box").css("background","url(img/beijing4.jpg) no-repeat");
			$("#box").css("background-size","100% 100%");
		})
		
		$(".close").click(function(){
			$(".full-pop").remove();
			$(".mask").remove();
			$(".icons-1").slideUp("slow");
		})
	})
	$(".register").click(function(){
		$(".begin").toggle();
	})
	$(".applys").click(function(){//应用
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/appmarket.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("应用市场");
		$.dialog({
			title:"应用市场",
			src:"http://www.juheweb.com"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})
		
	})
	$(".applys-1").click(function(){//QQ
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/big.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("QQ");
		$.dialog({
			title:"QQ",
			src:"http://im.qq.com/pcqq/"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})

	})
	$(".applys-2").click(function(){//微博
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/weibo.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("微博");
		$.dialog({
			title:"微博",
			src:"http://weibo.com/"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})

	})
	$(".applys-3").click(function(){//QQ邮箱
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/mail.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("QQ邮箱");
		$.dialog({
			title:"QQ邮箱",
			src:"https://mail.qq.com/"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})

	})
	$(".applys-4").click(function(){//浏览网页 
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/internet.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("QQ邮箱");
		$.dialog({
			title:"浏览网页",
			src:"http://baidu.com/"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})

	})
	$(".applys-5").click(function(){//QQ空间
		$(".icons-1").slideDown(1000);
		$(".icons-bg").css("background","url(icon/zone.png) no-repeat");
		$(".icons-bg").css("background-size","32px 30px");
		$(".icons-font").html("QQ邮箱");
		$.dialog({
			title:"浏览网页",
			src:"http://ctc.qzs.qq.com/"
		});
		Nwe();
		$(".icons-1").click(function(){//缩小按钮显示隐藏
			$(".full-pop").fadeToggle("slow");
			$(".mask").show();
		})

	})
	$(document).contextmenu(function(ev){//右键自定义菜单
		$(".menu").show();
		var leftX =ev.pageX;
		var topY = ev.pageY;
		$(".menu").css("left",leftX);
		$(".menu").css("top",topY);
		return false;//阻止右键默认行为
	})
	$(document).click(function(){
		$(".menu").hide();
	})
	//数据切换
	var a = $("#nav a");
	var uls = $(".content ul");
	
	a.each(function (index,item){
		$(item).attr("index",index);
	});
	a.click(function (){
		var index = $(this).attr("index");
		uls.animate({
			left:"1249"
		},300)
		uls.eq(index).animate({
			left:"0"
		},300)
	
	});
	
})(jQuery)
