	var contentleft = document.getElementById("content-left");
    var right =document.getElementById("right-top");
    var contentct =document.getElementById("content-ct");
    var lsi = contentct.getElementsByTagName("li");
    var img1 =document.getElementById("img");
    var nav = document.getElementById("nas");
	var av = nav.getElementsByTagName("a");
	var server2= document.getElementById("server-2");
	 var box1  =document.getElementById("div1");
// 	var span1 =ren .getElementsByTagName("span");  
//获取指定id的子数据
	function getchild(id){
		var arr=data.files.filter(function(value){////使用filter方法测试所有元素
			return value.pid==id;//如果它的pid值等于id值，说明是它的子元素
		})
		return arr;//把所有的子元素放在一个数组里返回出来
	}
	
//通过pid找到父数据
	function getprevent(pid){
		var arr=[];
		var obj=data.files.find(function(value){//使用find方法，找到数组中id等于pid的第一个值
			return value.id==pid;
		})
		if(obj){//如果他有父元素就把他放在数组里
			arr.push(obj);
			arr = arr.concat(getprevent(obj.pid));//用递归方法调用他自己找到所有的父级用数组链接方法把它拼接在一个数组里
		}
		return arr;//返回这个拼接后的数组
	}
	
//根据id生成树形结构
	function create(id){
		var arr = getchild(id);//找到所有的子数据
		var str="<ul class='uu'>";//根据子数据生成内容
		arr.forEach(function(value){
			var mulength = getprevent(value.id).length;//根据id找到父元素，按照父元素的长度加上Padding值来区分层级
			str+="<li><h3 class='mu' data-id='"+value.id+"' style='padding-left:"+mulength*20+"px;'>"+value.title+"<span class='marquee'></span><span class='folder'></span></h3>";
			if(!arr.length){//如果他没有子元素，直接返回出去
				return "";
			}
			str+= create(value.id)//如果他有子元素，用递归方法调用本身函数继续生成子元素内容
			str+="</li>"
		})
		str+="<ul>";
		return str;//返回生成好的数组结构
	}
	
//初始化是id是-1
	contentleft.innerHTML=create(-1);


//获取所有的H3，给所有的H3添加点击事件
	var h = document.getElementsByTagName("h3");
	
//清除所有
	function color(obj){
		for(var i =0;i<obj.length;i++){
			obj[i].style.background="";
		}
	}
	
//点击树形菜单，生成右边导航内容
	Array.from(h).forEach(function(value){//把类数组H3转成数组，用数组方法遍历每个H3给他添加点击事件
		value.onclick=function(e){//点击的时候通过id值渲染导航菜单及文件夹
			color(h);//点击时先把所有的h3清空
			this.style.background="#e1e8ed";//给选中的这个加上背景颜色
			file(this.dataset.id);
			checko();
			bgblock(this.dataset.id);
			e.cancelBubble=true;
		}
	})
	
//渲染指定id下的所有的子数据,根据子数据来渲染文件区域
	function creatrhtml(id){
		var childs = getchild(id);//根据id找到所有的子元素
		var str = "";//根据子元素生成文件区域内容
		childs.forEach(function(value){
			str+="<li class='curriculum' data-id='"+value.id+"'><div class='checkbox'><strong class='g'>✔</strong></div><span class='wj'></span><span id='wj-font' >"+value.title+"</span><input type ='text' value='"+value.title+"'><li>";
		})
		return str;
		 checko();
	}

	
	function bgblock(id){
		var childs = getchild(id);//根据id找到所有的子元素
		if(!childs.length){
			img1.style.display="block";
		}else{
			img1.style.display="none";
		}
		
	}
//封装函数通过id值来渲染导航及文件区域	
	function file(id){
//		var id = obj.dataset.id;//用添加自定义属性的方法，来获取元素身上的id
		var arr = getprevent(id).reverse();//通过id找到所有的父元素并且把一级的父元素放在前面
		var str='';//循环内容
		arr.forEach(function(value){//循环数组找到所有的父元素,并且给他添加上
			str+='<span class="wy"  data-id="'+value.id+'">'+value.title+'</span><em class="xz"></em>';
		})
		arr.forEach(function(value){//循环数组找到所有的父元素,并且给他添加上
		right.innerHTML =str;
		contentct.innerHTML=creatrhtml(id);//根据id值把生成好的文件区域内容添加上
		})
	}
	 file(0);
	
//利用冒泡，给导航添加点击事件
	right.onclick = function(e){
		var target = e.target;//找到触发事件的源
		if(target.nodeName=="SPAN"){//点击span节点的时候，根据id下的子数据重新渲染导航区域和文件区域
			var id = target.dataset.id;
			console.log(id);
			file(id);
			creatrhtml(id);
			bgblock(id);
			checko();
		}
		e.cancelBubble=true;
	}
	
//利用冒泡，双击文件夹打开子文件夹
	contentct.onclick=function(e){
		var target = e.target;//找到触发事件的源
		
		if(target.nodeName!=="DIV" && target.nodeName!=="STRONG"){//点击span节点的时候，根据id下的子数据重新渲染导航区域和文件区域
			if(target =classid(target,".curriculum")){
				var fileId = target.dataset.id;
				creatrhtml(fileId);
				bgblock(fileId);
				file(fileId);
				checko();
			}
		}
		e.cancelBubble=true;
	}
	contentct.innerHTML=creatrhtml(0);
//寻找指定class
	function hasClass(element,className){
		var classArr = element.className.split(" ");
		for(var i=0;i<classArr.length;i++){
			if(classArr[i]===className){
				return true;
			}
		}
		return false;
	}
//根据方法寻找class或者id父级
    function classid(element,attr){
    	//先找到attr的第一个字符
    	var ab = attr.charAt(0);
    	if(ab === "."){
    		//element没有指定的class，那么element就为父级，继续向上找
    		while(element.nodeType !=9 && !hasClass(element,attr.slice(1)) ){
    			element=element.parentNode;
    		}
    	}else if(ab==="#"){//寻找指定的id,因为id只有一个
    		while(element.nodeType !=9 && element.id!==attr.slice(1)){
    			element=element.parentNode;
    		}
    	}else{//寻找指定的id,因为id只有一个
    		while(element.nodeType !=9 && element.nodeName!==attr.toUpperCase()){
    			element=element.parentNode;
    		}
    	}
    	return element.nodeType==9?null:element;
    }
    checko();
	function checko(){
		var divs = contentct.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			divs[i].onoff=false;
			divs[i].parentNode.onmouseover=function(){//移入变色
				if(this.firstElementChild.onoff==false){
					this.style.background="#ebeff0";
					this.style.border="1px solid #55addc";
					this.firstElementChild.style.display="block";
				}
			}
			divs[i].parentNode.onmouseout=function(){//移出变回
			    if(this.firstElementChild.onoff==false){
			    	this.style.background="#ebeff0";;
					this.style.border="1px solid #ebeff0";
					this.firstElementChild.style.display="none";
					this.lastElementChild.style.display="none";
			    }
			}
			
			divs[i].onclick=function(e){//点击选中
				getprevent();
				var s = this.parentNode.lastElementChild;
				var inp = contentct.getElementsByTagName("input")[0];
				var wjfont = document.getElementById("wj-font");
				var text =this.parentNode.lastElementChild;
				if(this.onoff==false){
					this.style.background="#55addc";
					this.parentNode.style.background="#fff";
					this.firstElementChild.style.display="block";
					this.onoff=true;
					av[3].onclick=function(){//重命名
						if(s.parentNode.firstElementChild.onoff==true){
							inp.style.display="block";
							wjfont.style.display="none";
							server2.style.display="none";
						}else{
							inp.style.display="none";
							inp.previousElementSibling.style.display="block";
							server2.style.display="block";
						}
					}
				}else{
					this.style.background="#ebeff0";
					this.firstElementChild.style.display="none";
					this.onoff=false;
				}
				var bl = Array.from(divs).every(function(value){//多选
						return value.onoff==true;
					})
					console.log(bl);
					if( bl ){
						box1.firstElementChild.style.display="block";
					}else{
						box1.firstElementChild.style.display="none";
					}
				e.cancelBubble=true;
			}
			
			var onoff=false;
			box1.onclick=function(e){//全选
				if(!onoff){
					this.firstElementChild.style.display="block";
					for(var i=0;i<divs.length;i++){
						divs[i].style.background="#55addc";
						divs[i].parentNode.style.background="#fff";
						divs[i].firstElementChild.parentNode.style.display="block";
						divs[i].firstElementChild.style.display="block";
						divs[i].onoff=true;
					}
					onoff=true;
				}else{
					this.firstElementChild.style.display="none";
					for(var i=0;i<divs.length;i++){
						divs[i].style.background="#ebeff0";
						divs[i].parentNode.style.background="#ebeff0";
						divs[i].firstElementChild.parentNode.style.display="none";
						divs[i].firstElementChild.style.display="none";
						divs[i].onoff=false;
					}
					onoff=false;
				}
				e.cancelBubble=true;
			}
		}
	}
	av[5].addEventListener("click",function(e){
		var li = document.createElement("li");
		li.className="curriculum";
		var div = document.createElement("div");
		div.className="checkbox";
		var strong = document.createElement("strong");
		strong.className="g"
		strong.innerHTML="✔"
		div.appendChild(strong);
		li.appendChild(div);
		var spans = document.createElement("span");
		spans.className="wj";
		li.appendChild(spans);
		var spans2 = document.createElement("span");
		spans2.id="wj-font";
		li.appendChild(spans2)
		var inp = document.createElement("input");
		inp.type="text";
		inp.style.display="block";
		li.appendChild(inp);
		contentct.insertBefore(li,contentct.firstElementChild);
//		checko();
		inp.focus();
		bgblock(0);
		document.onclick=function(){
			if(inp.innerHTML==""){
				contentct.removeChild(li);
			}
		}
		e.stopPropagation();
	})
	
		
	      