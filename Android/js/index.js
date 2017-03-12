;(function(){
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var str1 =add0(h)+":"+add0(m);
	var Month=now.getMonth()+1;//月
	var DateR=now.getDate();//日
	var Day=now.getDay();//周
	if(Day===0){
		Day=6;
	}else{
		Day=Day-1;
	}
	var arr=["一","二","三","四","五","六","日"]
	var mDD=Month+"月"+DateR+"日 "+"星期 "+arr[Day];
	$("#time_text").html(mDD);
	
	var uls=$(".time_ul");
	for (var i = 0; i < uls.length; i++) {
		if(i==2){
			uls.eq(i).find("li").html(":");
		}else{
			uls.eq(i).find("li").html(str1.charAt(i))//通过下标设置当前时间
		}
	}
	setInterval(function(){
		checkDiffer();
	},2000)
	
	function checkDiffer(){
		var now2 = new Date();
		var h2 = now2.getHours();
		var m2 = now2.getMinutes();
		var s2 = now2.getSeconds();
		
		var Month=now2.getMonth()+1;//月
		var DateR=now2.getDate();//日
		var Day=now2.getDay();//周
		var arr=["一","二","三","四","五","六","日"]
		if(Day===0){
			Day=6;
		}else{
			Day=Day-1;
		}
		var mDD=Month+"月"+DateR+"日 "+"星期 "+arr[Day];
		$("#time_text").html(mDD);
		
		var str2 = add0(h2)+":"+add0(m2);
		//传入两个时间值 然后返回不一样的值
		var differArr = check( str1,str2 );
		
		for(var i = 0;i<differArr.length;i++){
			//0是下标                                  1是即将要改变的值
			go( differArr[i][0],differArr[i][1] );
		}
		str1 = str2;
	}
	
	function check(a,b){
		var arr=[];
		//把不同的值push到arr里
		for (var i = 0; i < a.length; i++) {
			if(a.charAt(i) !=b.charAt(i)){
				arr.push([i,b.charAt(i)]);
			}
		}
		return arr;
	}
	
	function go(index,srcNum){
		//把变得的下标和更改的值传入并更改
		$(".time_ul").eq(index).find("li").css("-webkit-animation-play-state","running");
		$(".time_ul").eq(index).find("li").css("animation-play-state","running");
		setTimeout(function(){
			$(".time_ul").eq(index).find("li").html(srcNum);
		},500)
		setTimeout(function(){
			$(".time_ul").eq(index).find("li").css("-webkit-animation-play-state","paused");
			$(".time_ul").eq(index).find("li").css("animation-play-state","paused");
		},1000);
	}
	function add0(n){
			return n<10 ? "0"+n : ""+n
	}
	
	var hdX=0;
	var hdMX=0;
	var w=$("#shade1").width()/2;
	$("#clear_box").on("touchstart",function(ev){
		hdX=ev.changedTouches[0].pageX;
		return false;
	})
	$("#clear_box").on("touchmove",function(ev){
		hdMX=Math.floor(ev.changedTouches[0].pageX-hdX);
		$("#shade1").css("left",hdMX);
	})
	$("#clear_box").on("touchend",function(ev){
		if(hdMX>=w){
			$("#shade").hide();
			$("#shade1").hide();
		}else{
			$("#shade1").css("left","0");
		}
	})
	
	var str="";
	for (var i = 0; i < data1.length; i++) {
		str+="<div class='use' data-id="+i+"><img src="+data1[i]+" /><span>"+texts[i]+"</span></div>"
	}
	$("#use_box").html(str);
	 index=$(this).index();
	var onoff=true;
	$(".use").on("touchstart",function(ev){
		var index=$(this).index();
		if(index===0){
			if(onoff){
				onoff=false;
				//生成内部结构
				$(".use").eq(0).append("<div id='view'></div>");
				var htm="<div id='pageBg'></div><div id='logo1'><div class='logoImg'><img src='load/logo.png'></div><p class='logoText'>已加载 0%</p></div><div id='mian'><div id='tZ'><div id='panoBg'></div><div id='cloud'></div><div id='pano'></div></div></div>";
				$("#view").html(htm);
				$("#view").animate({
					height:"100%"
				},130,function(){
					 setLoding();
				});
				
				function setPerc(){
					resetview();
					window.onresize=resetview;
					function resetview(){
						var view=document.querySelector("view");
						var mian=document.querySelector("#mian");
						var deg=52.5;
						var height=document.documentElement.clientHeight;
						var R=Math.round(Math.tan(deg/180*Math.PI)*height*.5);
						view.style.webkitPerspective=view.style.MozPerspective=R+"px";
						css(mian,"translateZ",R);
					}
				}
				
				//预加载
				function setLoding(){
					var logoText=document.querySelector(".logoText");
					var data=[];
					var nub=0;
					for(var s in imgData){
						data=data.concat(imgData[s]);
					}
					for (var i = 0; i < data.length; i++) {
						var img=new Image();
						img.src=data[i];
						img.onload=function(){
							nub++;
							logoText.innerHTML="已加载"+(Math.floor(nub/data.length*100))+"%";
							if(nub===data.length){
								anmt();
							}
						}
					}
				}
				
				//logo1隐藏 logo2出场
				function anmt(){
					var view=document.querySelector("#view");
					var logo1=document.querySelector("#logo1");
					var logo2=document.createElement("div");
					var logo3=document.createElement("div");
					var img=new Image();
					var img2 = new Image();
					img.src = imgData.logo[0];
					img2.src=imgData.logo[1];
					logo2.id="logo2";
					logo3.id="logo3";
					logo3.className=logo2.className="logoImg";
					
					logo2.appendChild(img);
					logo3.appendChild(img2);
					css(logo2,"opacity",0);
					css(logo3,"opacity",0);
					css(logo2,"translateZ",-1000);
					css(logo3,"translateZ",-1000);
					view.appendChild(logo2);
					view.appendChild(logo3);
					MTween({
						el:logo1,
						target:{opacity:0},
						time:1000,
						type:"easeOut",
						callBack:function(){
							view.removeChild(logo1);
							css(logo2,"opacity",100);
							MTween({
								el:logo2,
								target:{translateZ:0},
								time:300,
								type:"easeBoth",
								callBack:anmt2
							});
						}
					});
				}
				
				//logo2隐藏 logo3出场
				function anmt2(){
					var view=document.querySelector("#view");
					var logo2=document.querySelector("#logo2");
					setTimeout(function(){
						MTween({
							el:logo2,
							target:{translateZ:-1000},
							time: 800,
							type: "linear",
							callBack:function(){
								view.removeChild(logo2);
								css(logo3,"opacity",100);
								setTimeout(function(){
									MTween({
										el:logo3,
										target:{translateZ:0},
										time:500,
										type:"easeBoth",
										callBack:anmt3
									});
								},300);
							}
						});
					},2000)
				}
				
				//logo3隐藏 爆炸碎片出场
				function anmt3(){
					var view=document.querySelector("#view");
					var logo3=document.querySelector("#logo3");
					setTimeout(function(){
						MTween({
							el:logo3,
							target:{translateZ:-2000},
							time:2000,
							type:"easeIn",
							callBack:function(){
								view.removeChild(logo3);
								anmt4();
							}
						});
					},1000)
				}
				
				//生成爆炸碎片
				function anmt4(){
					var view=document.querySelector("#view");
					var logo4=document.createElement("div");
					var logoIcos=document.createElement("div");
					var logo4Img=new Image();
					var iconsLength=27;
					logo4.id="logo4";
					logo4Img.id="logo4Img";
					logoIcos.id="logoIcos";
					logo4Img.src=imgData.logo[2];
					css(logo4,"translateZ",-2000);
					for (var i = 0; i < iconsLength; i++) {
						var span=document.createElement("span");
						var xR=20+Math.round(Math.random()*240);
						var xDeg=Math.round(Math.random()*360);
						
						var yR=10+Math.round(Math.random()*240);
						var yDeg=Math.round(Math.random()*360);
						css(span,"rotateY",xDeg);
						css(span,"translateZ",xR);
						
						css(span,"rotateX",yDeg);
						css(span,"translateY",yR);
						span.style.backgroundImage="url("+imgData.logoIco[i%imgData.logoIco.length]+")";
						logoIcos.appendChild(span);
					}
					logo4.appendChild(logoIcos);
					logo4.appendChild(logo4Img);
					view.appendChild(logo4);
					MTween({
						el:logo4,
						target:{translateZ:0},
						time:500,
						type:"easeOutStrong",
						callBack:function(){
							setTimeout(function(){
								MTween({
									el: logo4,
									target: {translateZ: -1000,scale:20},
									time: 3000,
									type: "linear",
									callBack: function(){
										view.removeChild(logo4);
										anmt5();
									}
								});
							},100);
						}
					})
				}
				
				//主体入场
				function anmt5(){
					var tZ=document.querySelector("#tZ");
					css(tZ,"translateZ",-2000);
					anmt6();
					anmt7();
					createPano();
					MTween({
						el:tZ,
						target:{translateZ:200},
						time:3600,
						type:"easeBoth"
					});
				}
				
				//生成背景圆柱
				function anmt6(){
					var panoBg=document.querySelector("#panoBg");
					var width=129;
					var deg=360/imgData.bg.length;
					var R=parseInt(Math.tan((180-deg)/2*Math.PI/180)*(width/2))-1;
					var startDeg=180;
					css(panoBg,"rotateX",0);
					css(panoBg,"rotateY",-695);
					for (var i = 0; i < imgData.bg.length; i++) {
						var span=document.createElement("span");
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						span.style.backgroundImage="url("+imgData.bg[i]+")";
						span.style.dipslay="none";
						panoBg.appendChild(span);
						startDeg-=deg;
					}
					var nub=0;
					var timer=setInterval(function(){
						panoBg.children[nub].style.display="block";
						nub++;
						if(nub>=panoBg.children.length){
							clearInterval(timer);
						}
					},3600/2/20);
					MTween({
						el:panoBg,
						target:{rotateY:25},
						time:3600,
						type:"linear",
						callBack:function(){
							 setDarg();
							 setTimeout(function(){
	//						 	setSensors();
							 },1000)
						}
					});
				}
				
				//云朵入场
				function anmt7(){
					var cloud=document.querySelector("#cloud");
					css(cloud,"translateZ",-400);
					for (var i = 0; i < 9; i++) {
						var span=document.createElement("span");
						span.style.backgroundImage = "url("+imgData.cloud[i%3]+")";
						var R=200+(Math.random()*150);
						var deg=(360/9)*i;
						var x=Math.sin(deg*Math.PI/180)*R;
						var z=Math.cos(deg*Math.PI/180)*R;
						var y=(Math.random()-0.5)*200;
						css(span,"translateX",x);
						css(span,"translateZ",z);
						css(span,"translateY",y);
						span.style.display="none";
						cloud.appendChild(span);
					}
					var nub=0;
					var timer=setInterval(function(){
						cloud.children[nub].style.display="block";
						nub++;
						if(nub>=cloud.children.length){
							clearInterval(timer);
						}
					},50);
					MTween({
						el:cloud,
						target:{rotateY:540},
						time:3500,
						type:"easeIn",
						callIn:function(){
							var deg=-css(cloud,"rotateY");
							for (var i = 0; i < cloud.children.length; i++) {
								css(cloud.children[i],"rotateY",deg);
							}
						},
						callBack:function(){
							cloud.parentNode.removeChild(cloud);
							bgShow();
							
						}
					});
				}
				
				//滑动事件
				function setDarg(){
					var pano = document.querySelector('#pano');
					var panoBg=document.querySelector("#panoBg");
					var tZ=document.querySelector("#tZ");
					var startPoint={x:0,y:0};
					var panoBgDeg={x:0,y:0};
					var scale={x:129/18,y:1170/80};
					var startZ=css(tZ,"translateZ");
					var lastDeg={x:0,y:0};
					var lastDis={x:0,y:0};
					document.addEventListener("touchstart",function(ev){
						ev.stopPropagation();
						startPoint.x=ev.changedTouches[0].pageX;
						startPoint.y=ev.changedTouches[0].pageY;
						panoBgDeg.x=css(panoBg,"rotateY");
						panoBgDeg.y=css(panoBg,"rotateX");
					});
					document.addEventListener("touchmove",function(ev){
						
						var nowPoint = {};
						var nowDeg = {};
						var nowDeg2 = {};
						nowPoint.x = ev.changedTouches[0].pageX;
						nowPoint.y = ev.changedTouches[0].pageY;
						
						var dis={};
						dis.x=nowPoint.x-startPoint.x;
						dis.y=nowPoint.y-startPoint.y;
						
						var disDeg={};
						disDeg.x = -(dis.x/scale.x);
						disDeg.y = dis.y/scale.y;
						nowDeg.y = panoBgDeg.y + disDeg.y;
						nowDeg.x = panoBgDeg.x + disDeg.x;
						nowDeg2.x = panoBgDeg.x + (disDeg.x)*.95;
						nowDeg2.y = panoBgDeg.y + (disDeg.y)*.95;
						if(nowDeg.y>45){
							nowDeg.y=45;
						}else if(nowDeg.y<-45){
							nowDeg.y=-45;
						};
						if(nowDeg2.y>45){
							nowDeg2.y=45;
						}else if(nowDeg2.y<-45){
							nowDeg2.y=45;
						};
						lastDis.x=nowDeg.x-lastDeg.x;
						lastDeg.x=nowDeg.x;
						lastDis.y=nowDeg.y-lastDeg.y;
						lastDeg.y=nowDeg.y;
						css(panoBg,"rotateX",nowDeg.y);
						css(panoBg,"rotateY",nowDeg.x);
						css(pano,"rotateX",nowDeg2.y);
						css(pano,"rotateY",nowDeg2.x);
						if(Math.abs(dis.x)>300){
							dis.x=300;
						};
						css(tZ,"translateZ",startZ-Math.abs(dis.x));
					});
					document.addEventListener("touchend",function(e){
						var nowDeg={x:css(panoBg,"rotateY"),y:css(panoBg,"rotateX")};
						var disDeg={x:lastDis.x*10,y:lastDis.y*10};
						MTween({
							el:tZ,
							target:{translateZ:startZ},
							time:800,
							type:"easeOut"
						});
						MTween({
							el:panoBg,
							target:{rotateY:nowDeg.x+disDeg.x},
							time:800,
							type:"easeOut"
						});
						MTween({
							el:pano,
							target:{rotateY:nowDeg.x+disDeg.x},
							time:800,
							type:"easeOut"
						});
					});
				}
				
				//生成漂浮层
				function createPano(){
					var pano = document.querySelector('#pano');
					var deg = 18;
					var R = 406;
					var nub = 0;
					var startDeg = 180;
					css(pano,"rotateX",0);
					css(pano,"rotateY",-180);
					css(pano,"scale",0);
					var pano1 = document.createElement("div");
					pano1.className = "pano";
					css(pano1,"translateX",1.564);
					css(pano1,"translateZ",-9.877);
					for(var i = 0; i < 2; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:344px;margin-top:-172px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",-163);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano1.appendChild(span)
					}
					pano.appendChild(pano1);
				
					var pano2 = document.createElement("div");
					pano2.className = "pano";
					css(pano2,"translateX",20.225);
					css(pano2,"translateZ",-14.695);
					for(var i = 0; i < 3; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:326px;margin-top:-163px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",278);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano2.appendChild(span)
					}
					pano.appendChild(pano2);
	
					var pano3 = document.createElement("div");
					pano3.className = "pano";
					css(pano3,"translateX",22.275);
					css(pano3,"translateZ",11.35);
					for(var i = 0; i < 4; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:195px;margin-top:-97.5px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",192.5);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano3.appendChild(span)
					}
					pano.appendChild(pano3);
					
					var pano4 = document.createElement("div");
					pano4.className = "pano";
					css(pano4,"translateX",20.225);
					css(pano4,"translateZ",14.695);
					startDeg = 90;
					for(var i = 0; i < 5; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:468px;margin-top:-234px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",129);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano4.appendChild(span)
					}
					pano.appendChild(pano4);
					
					var pano5 = document.createElement("div");
					pano5.className = "pano";
					css(pano5,"translateX",-11.35);
					css(pano5,"translateZ",22.275);
					startDeg = 18;
					for(var i = 0; i < 6; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:468px;margin-top:-234px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",200);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano5.appendChild(span)
					}
					pano.appendChild(pano5);
					
					var pano6 = document.createElement("div");
					pano6.className = "pano";
					css(pano6,"translateX",-4.54);
					css(pano6,"translateZ",8.91);
					startDeg = 18;
					for(var i = 0; i < 6; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:444px;margin-top:-222px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",-13);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano6.appendChild(span)
					}
					pano.appendChild(pano6);
					
					var pano7 = document.createElement("div");
					pano7.className = "pano";
					css(pano7,"translateX",-20.225);
					css(pano7,"translateZ",-14.695);
					startDeg = -108;
					for(var i = 0; i < 3; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:522px;margin-top:-261px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",176.5);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano7.appendChild(span)
					}
					pano.appendChild(pano7);
					
					var pano8 = document.createElement("div");
					pano8.className = "pano";
					css(pano8,"translateX",-17.82);
					css(pano8,"translateZ",-9.08);
					startDeg = -72;
					for(var i = 0; i < 6; i++){
						var span = document.createElement("span");
						span.style.cssText = "height:421px;margin-top:-210.5px;";
						span.style.background = "url("+imgData["pano"][nub]+")";
						css(span,"translateY",-19.5);
						css(span,"rotateY",startDeg);
						css(span,"translateZ",-R);
						nub++;
						startDeg -= deg;
						pano8.appendChild(span)
					}
					pano.appendChild(pano8);
					setTimeout(function(){
						MTween({
							el:pano,
							target: {
								rotateY: 25,
								scale:100
							},
							time: 1200,
							type: "easeBoth",
							callBack:function(){
								var view=document.querySelector("#view");
								var div=document.createElement("div");
								div.id="deleteX";
								view.appendChild(div);
								var deleteX=document.querySelector("#deleteX");
								var use=document.querySelector(".use");
								deleteX.addEventListener("touchstart",function(e){
										MTween({
										el:view,
										target:{scale:0.1},
										time:200,
										type:"easeOut",
										callBack:function(){
											view.innerHTML="";
											use.removeChild(view);
											onoff=true;
										}
									});
								})
							}
						});
					},2800);
				}
				
				//背景
				function bgShow(){
					var pageBg = document.querySelector('#pageBg');
					MTween({
						el:pageBg,
						target:{opacity:100},
						time: 1000,
						type:"easeBoth"
					});
				}
				
				//陀螺仪
	//			function setSensors(){
	//				var pano = document.querySelector('#pano');
	//				var panoBg = document.querySelector('#panoBg');
	//				var start = {};
	//				var now = {};
	//				var startEl = {};
	//				var lastTime = Date.now();
	//				var scale = 129/18;
	//				var startZ = -160;
	//				var dir = window.orientation; //检测横竖屏
	//				window.isStart = false;
	//				window.isTouch = false;
	//				window.addEventListener('orientationchange', function(e) {
	//					dir = window.orientation;//用户切换了横竖之后，重置方向
	//				});
	//			
	//				
	//				window.addEventListener('deviceorientation', function(e)
	//				{
	//					if(window.isTouch){
	//						return;
	//					}
	//					switch(dir){
	//						case 0:
	//							var x = e.beta;
	//							var y = e.gamma;
	//							break;
	//						case 90:
	//							var x = e.gamma;
	//							var y = e.beta;
	//							break;	
	//						case -90:
	//							var x = -e.gamma;
	//							var y = -e.beta;
	//							break;	
	//						case 180:
	//							var x = -e.beta;
	//							var y = -e.gamma;
	//							break;
	//			
	//					}
	//					var nowTime = Date.now();
	//					if(nowTime - lastTime < 30){
	//						return;
	//					}
	//					lastTime = nowTime;
	//					if(!isStart){
	//						isStart = true;
	//						start.x = x;
	//						start.y = y;
	//						startEl.x = css(pano,"rotateX");
	//						startEl.y = css(pano,"rotateY");
	//					} else {
	//						now.x = x;
	//						now.y = y;
	//						var dis = {};
	//						dis.x = now.x - start.x;
	//						dis.y = now.y - start.y;
	//						var deg = {};
	//						deg.x = startEl.x + dis.x;
	//						deg.y = startEl.y + dis.y;
	//						if(deg.x > 45){
	//							deg.x = 45;
	//						} else if(deg.x < -45){
	//							deg.x = -45;
	//						}
	//						var disXZ = Math.abs(Math.round((deg.x  - css(pano,"rotateX"))*scale));
	//						var disYZ = Math.abs(Math.round((deg.y  - css(pano,"rotateY"))*scale));
	//						var disZ = Math.max(disXZ,disYZ);
	//						if(disZ > 300){
	//							disZ = 300;
	//						}
	//						MTween({
	//							el:tZ,
	//							target:{
	//								translateZ: startZ - disZ
	//							},
	//							time: 300,
	//							type: "easeOut",
	//							callBack: function(){
	//								MTween({
	//									el:tZ,
	//									target:{
	//										translateZ: startZ
	//									},
	//									time: 400,
	//									type: "easeOut"
	//								});
	//							}
	//						});
	//						MTween({
	//							el:pano,
	//							target:{
	//								rotateX:deg.x,
	//								rotateY:deg.y
	//							},
	//							time: 800,
	//							type: "easeOut"
	//						});
	//						MTween({
	//							el:panoBg,
	//							target:{
	//								rotateX:deg.x,
	//								rotateY:deg.y
	//							},
	//							time: 800,
	//							type: "easeOut"
	//						});
	//					}
	//				});
	//			}
			}
		}
		if(index===1){
			if(onoff){
				onoff=false;
				var qqBox = $("</div><div class='qqBox'></div>");
				var str=`
						<a href='javascript:;' class='closeqq'>×</a>
						<div class='logon'>
							<div class='initilBg'></div>
							<div class='logonOption'>
								<span>登 录</span>
								<span>注 册</span>
							</div>
						</div>
						<div class='logon1'>
							<div class='tImgBox'>
							<span class='qqImg'></span>
							</div>
							<div class='inpu'>
								<input placeholder='QQ号/手机号/邮箱' type='text' class='texts'/>
								<input placeholder='密码' type='password' class='pass'/>
							</div>
							<div class='enter'>
								<input type='submit' class='subm' value='登 录'/>
							</div>
							<div class='user clearfix'>
								<span class='lef'>忘记密码？</span>
								<span class='rig'>新用户注册</span>
							</div>
						</div>`;
				qqBox.html(str);
				$(".use").eq(1).append(qqBox);
				$('.closeqq').on('touchend',function(){
					qqBox.remove();
					onoff=true;
				})
				$('.logonOption span').eq(0).on('touchend',function(){
					$('.logon').hide()
				})
				$(".qqImg").css("background-image","url("+data1[1]+")");
			
				setTimeout(function(){
					var initilBg=document.querySelector(".initilBg");
					var logonOption=document.querySelector(".logonOption");
					MTween({
						el:initilBg,
						target:{scale:80},
						time:800,
						type:"linear",
						callIn:function(){
							$(".logonOption").animate({
								bottom:"10%"
							},800)
						}
					})
				},1000)
				
			}
		}
		if(index===2){
			var photoBox = $("<div class='photoBox'></div>");
			photoBox.html(photoHtml());
			photoBox.on('touchstart',function(e){
				e.stopPropagation();
			})
			$(".use").eq(2).append(photoBox);
			$('#closeBtn').on('touchend',function(){
				photoBox.remove();
				onoff=true;
			})
			$('body').append('<script src="upload/load.js"></script>')
		}
	})
})()

//照片html
function photoHtml(){
	var html = `
		<header>我的相册<a href="javascript:;" id="closeBtn">×</a></header>
		<div id="box">
			<div id="inner">
				<ul id="list">
				</ul>
				<footer>加载更多</footer>
			</div>
		</div>
		<section id="imgPage">
			<header>大图预览<a href="javascript:;" id="backBtn"><</a></header>
			<div class="imgWrap">
				<img src="pics/1.jpg" id="bigImg" />
				<nav id="imgNavs">
					<a href="javascript:;">向左旋转90</a>
					<a href="javascript:;">向右旋转90</a>
					<a href="javascript:;">放大</a>
					<a href="javascript:;">缩小</a>
				</nav>
			</div>
		</section>`;
	return html;
}

