//单位
var ratio = 21.33;
var differ = unit/ratio;

var mainPage = $('.main_page');

//首页加载
mainPage.eq(0).addClass('index');
$('.mask').delay(2000).fadeOut(200,function(){
	page1();
})

//划屏切换
var wH = $(window).height();	//视口高度

var disY = null,
	status = true;
	index = 0,
	moveIndex = 1,
	dis = 0,
	target = null,
	obj = null;
$(document).on('touchstart',startFn);
$(document).on('touchmove',moveFn);
$(document).on('touchend',endFn);
function startFn(ev){
	if(!status)return;
	var ev = ev.changedTouches[0];
	disY = ev.pageY;
	target = $(ev.target).closest('.main_page');
	index = target.index();
	if (index < mainPage.length-1) { //给当前页的上一张和下一张提高层级并重新定位
		mainPage.eq(index+1).css('top',wH);
		mainPage.eq(index+1).addClass('index2');
	}
	if (index > 0) {
		mainPage.eq(index-1).css('top',-wH);
		mainPage.eq(index-1).addClass('index2');
	}
}
function moveFn(ev){
	var ev = ev.changedTouches[0];
	dis = ev.pageY - disY;
	if (dis < 0) {
		if(index === mainPage.length-1)return;
		moveIndex = index+1;
	}else{
		if(index === 0)return;
		moveIndex = index-1;
	}
	obj = mainPage.eq(moveIndex);
	obj.css('top',dis<0? wH+dis:-wH+dis);
	if (Math.abs(dis)>100) {
		switch(moveIndex){
			case 0:
				page1();
				break;
			case 1:
				page2();
				break;
			case 2:
				page3();
				break;
			case 3:
				page4();
				break;
			case 4:
				page5();
				break;
			case 5:
				page6();
				break;
			case 6:
				page7();
				break;
			case 7:
				page8();
				break;
		}
	}
}
function endFn(){
	status = false;
	if(!obj)return;
	if (Math.abs(dis)>100) {
		obj.animate({'top':0},300,function(){
			target.removeClass('index');
			mainPage.removeClass('index2');
			obj.addClass('index');
			obj = null;//执行完之后释放
			status = true;
		})
	}else{
		obj.animate({'top':dis<0? wH:-wH},300,function(){
			obj.removeClass('index2');
			obj = null;
			status = true;
		})
	}
}

//个人简历
function page1(){	//page1加载
	startMove($('.theme_img li')[0],{
		top:53*differ
	},type.flex)
	startMove($('.theme_img li')[1],{
		top:58*differ
	},type.flex)
	startMove($('.theme_img li')[2],{
		top:96*differ
	},type.flex)
	startMove($('.theme_img li')[3],{
		top:64*differ
	},type.flex)
	
	$('.theme_text>li').eq(0).fadeIn(500,function(){
		$('.theme_text li').eq(1).fadeIn(500,'linear',function(){
			$('.theme_text li').eq(2).fadeIn(500,'linear',function(){
				$('.theme_text li').eq(3).fadeIn(500,'linear');
			});
		});
	});
}

//基本信息
function page2(){
	startMove($('.info_img li')[0],{
		top:62*differ
	},type.flex)
	setTimeout(function(){
		startMove($('.info_img li')[1],{
			top:330*differ
		},type.flex,function(){
			var i = 0,
				timer;
			timer = setInterval(function(){
				$('.info_text dd').eq(i).animate({'marginLeft':35*differ,'opacity':1},1000);
				i++;
				if (i === $('.info_text dd').length) {
					clearInterval(timer);
				}
			},200)
		})
	},200)
	
}

//求职意向
function page3(){
	startMove($('.job_head')[0],{
		left:72*differ
	},type.flex)
	startMove($('.job_text')[0],{
		left:80*differ
	},type.flex)
	
	$('.line').slideDown(800);
	var i = 0,
		timer;
	timer = setInterval(function(){
		$('.job_rect li').eq(i).fadeIn(800);
		if (i%2===0) {
			$('.jobList li').eq(i).animate({'left':180*differ,'opacity':1},800,function(){
				$(this).find('.text').fadeIn(800);
			});
		}else{
			$('.jobList li').eq(i).animate({'left':32*differ,'opacity':1},800,function(){
				$(this).find('.text').fadeIn(800);
			});
		}
		i++;
		if (i === $('.jobList li').length) {
			clearInterval(timer);
		}
	},200)
}

//教育背景
function page4(){
	startMove($('.teach_text .mainTitle')[0],{
		left:75*differ
	},type.flex)
	setTimeout(function(){
		startMove($('.teach_text .subTitle')[0],{
			left:75*differ
		},type.flex)
	},100);
	setTimeout(function(){
		startMove($('.teach_head')[0],{
			left:84*differ
		},type.flex,function(){
			var i = 0,
				timer;
			timer = setInterval(function(){
				$('.teachList li').eq(i).addClass('ani');
				i++;
				if (i === $('.teachList li').length) {
					clearInterval(timer);
				}
			},300)
		})
	},150);
}

//掌握技能
function page5(){
	$('.skill_img li').eq(0).animate({'left':151*differ},200);
	startMove($('.skill_img li')[1],{
			top:61*differ
	},type.flex);
	$('.skill_text li').eq(0).animate({'top':30*differ,'opacity':1},1000);
	$('.skill_text li').eq(1).animate({'top':68*differ,'opacity':1},1000);
	
	$('.skillList .skill_name').addClass('ani');
	$('.skillList>li').each(function(){
		var _this = this
		this.index = 0;
		this.timer = setInterval(function(){
			$(_this).find('li').eq(_this.index).addClass('ani');
			_this.index++;
			if (_this.index === $(_this).find('li').length) {
				clearInterval(_this.timer);
			}
		},200)
	})
}

//工作经验
function page6(){
	startMove($('.exp_img li')[0],{
		left:18*differ
	},type.flex)
	startMove($('.exp_img li')[1],{
		left:55*differ
	},type.flex)
	$('.exp_text').addClass('ani');
	$('.exp_line').addClass('ani');
	var i = 0,
		timer;
	timer = setInterval(function(){
		$('.expList li .xing').eq(i).addClass('ani');
		$('.expList li .kuang').eq(i).addClass('ani');
		i++;
		if (i === $('.expList li .xing').length) {
			clearInterval(timer);
		}
	},300)
}

//自我评价
function page7(){
	startMove($('.self_img li')[0],{
		left:47*differ
	},type.flex)
	startMove($('.self_img li')[1],{
		left:133*differ
	},type.flex,function(){
		var i = 0,
			timer;
		timer = setInterval(function(){
			$('.selfList>li').eq(i).show();
			$('.selfList>li').eq(i).css('animationName','rect');
			i++;
			if (i === $('.selfList li').length) {
				clearInterval(timer);
			}
		},200)
	})
	
}

//联系方式
function page8(){
	startMove($('.con_img li')[0],{
		left:47*differ
	},type.flex)
	startMove($('.con_img li')[1],{
		left:133*differ
	},type.flex,function(){
		$('.con_info li').eq(0).addClass('ani');
		setTimeout(function(){
			$('.con_info li').eq(1).delay(1000).addClass('ani2');
		},500)
	})
	$('.erwei').addClass('ani')
}