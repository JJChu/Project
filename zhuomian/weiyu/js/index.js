//............................渲染各个区域.........

// 准备数据
	var datas = data.files;

// 1.渲染菜单区域
	var contentleft = document.getElementById("content-left");//获取元素
	function create(id){
		var arr = handle.getchild(datas,id);//找到对应id下的所有的子数据
		var str="<ul class='uu'>";//根据子数据生成内容
		arr.forEach(function(value){
			var mulength = handle.getprevent(datas,value.id).length;//根据id找到父元素，按照父元素的长度加上Padding值来区分层级
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
	
    //初始化是菜单区域
	contentleft.innerHTML=create(-1);

//2.导航区域
	var right =document.getElementById("right-top");
	function file(id){
		var arr = handle.getprevent(datas,id).reverse();//通过id找到所有的父元素并且把一级的父元素放在前面
		var str='';//循环内容
		arr.forEach(function(value){//循环数组找到所有的父元素,并且给他添加上
			str+='<span class="wy"  data-id="'+value.id+'">'+value.title+'</span><em class="xz"></em>';
		})
		return str;
		contentct.innerHTML=creatrhtml(id);//根据id值把生成好的文件区域内容添加上
	}
     // 初始化导航
	 right.innerHTML =file(0);

//3.文件区域
	var contentct =document.getElementById("content-ct");
	function creatrhtml(id){
		var childs = handle.getchild(datas,id);//根据id找到所有的子元素
		var str = "";//根据子元素生成文件区域内容
		childs.forEach(function(value){
			str+="<li class='curriculum' data-id='"+value.id+"'><div class='che'></div><span class='wj'></span><span id='wj-font' >"+value.title+"</span><input type ='text' value='"+value.title+"'><li>";
		})
		return str;
	}
	 // 初始化文件区域
	 contentct.innerHTML=creatrhtml(0);

//..........................交互........................
//获取所有的H3，给所有的H3添加点击事件
	var h = document.getElementsByTagName("h3");
	var currentId =0;
//点击树形菜单，生成右边导航内容
//	Array.from(h).forEach(function(value){//把类数组H3转成数组，用数组方法遍历每个H3给他添加点击事件
	
		contentleft.onclick=function(e){//点击的时候通过id值渲染导航菜单及文件夹
			var target=e.target;
			var id = target.dataset.id;
		t.removeclass(getTreeById(currentId),"back");
		t.addclass(getTreeById(id),"back");
			bgblock(id);// 无子元素渲染背景
			right.innerHTML =file(id);// 渲染导航
			contentct.innerHTML=creatrhtml(id);//渲染文件区域
			currentId =id;
		}
//	})
	
	function tab(id){
		t.removeclass(getTreeById(currentId),"back");
		t.addclass(getTreeById(id),"back");
		currentId=id;
		t.removeclass(div1,"bj");
	}
	//获取指定id对应的树形菜单的标题
//	console.log(t.addclass(l,"back");
	function getTreeById(id){
		var treeTitle = contentleft.querySelectorAll("h3");
		for( var i = 0; i < treeTitle.length; i++ ){
			if( treeTitle[i].dataset.id == id ){
				return treeTitle[i];
			}
		}
	}
	//初始的时候给id为0的树形菜单标题添加class
//判断有没有自己来添加背景
	var img1 =document.getElementById("img");
	
	function bgblock(id){
		var childs = handle.getchild(datas,id);//根据id找到所有的子元素
		if(!childs.length){
			img1.style.display="block";
		}else{
			img1.style.display="none";
		}
	}
	//导航区域
	right.onclick = function(e){
		var target = e.target;//找到触发事件的源
		if(target.nodeName=="SPAN"){//点击span节点的时候，根据id下的子数据重新渲染导航区域和文件区域
			var id = target.dataset.id;
			creatrhtml(id);
			bgblock(id);// 无子元素渲染背景
			right.innerHTML =file(id);// 渲染导航
			contentct.innerHTML=creatrhtml(id);//渲染文件区域
			t.removeclass(getTreeById(currentId),"back");
			t.addclass(getTreeById(id),"back");
			currentId =id;
		}
	}
	var box1 = document.getElementById("div1");
	var divs = document.getElementsByClassName("che");
	contentct.addEventListener("click",function(e){//单选
		var target = e.target;
		if(t.classid(target,".che")){
			target =t.classid(target,".che");
			t.shanclass(target,"checkbox");
			t.shanclass(target.parentNode,"do");
			//有一个单选没被选中，全选就不能被选中
			var bl = Array.from(divs).every(function(item){
					return t.hasClass(item,"checkbox");
			});
			//bl为true，说明所有的单选都被选中
			if( bl ){
				t.addclass(box1,"bj");
			}else{
				t.removeclass(box1,"bj");
			}
		}	
	})
	//文件区域，进入下一级
	contentct.onclick=function(e){
		var target = e.target;//找到触发事件的源
		if(target.nodeName!=="DIV" && target.nodeName!=="STRONG"){//点击span节点的时候，根据id下的子数据重新渲染导航区域和文件区域
			if(target =t.classid(target,".curriculum")){
				var id = target.dataset.id;
				creatrhtml(id);
				bgblock(id);// 无子元素渲染背景
				right.innerHTML =file(id);// 渲染导航
				contentct.innerHTML=creatrhtml(id);//渲染文件区域
				t.removeclass(getTreeById(currentId),"back");
				t.addclass(getTreeById(id),"back");
				currentId =id;
				t.removeclass(div1,"bj");//清除全选按钮
				
			}
		}
	}
	
	//.............................移入移出..........................
	contentct.addEventListener("mouseover",function(e){//移入
		var target = e.target;
		if(target =t.classid(target,".curriculum")){
			t.addclass(target,"active");
		}
	})
	contentct.addEventListener("mouseout",function(e){//移出
		var target = e.target;
		if(target =t.classid(target,".curriculum")){
			//移开的时候，从target中找到checkbox
			var checkbox = target.querySelector(".che");
			if( !t.hasClass(checkbox,"checkbox") ){
				t.removeclass(target,"active");
			}
		}
	})
	

//............................全选..............................
	var div1 = document.getElementById("div1")
	var checkedAll =contentct.getElementsByClassName("che");//找到多有的按钮
	var chebox = contentct.getElementsByClassName("checkbox");
	var lis =  contentct.getElementsByClassName("curriculum");
	box1.addEventListener("click",function(){
		
		var bl = t.shanclass(this,"bj");
		
		Array.from(checkedAll).forEach(function (item){
			t.shanclass(item.parentNode,"active");
			if( bl ){
				t.addclass(item,"checkbox");
				
			}else{
				t.removeclass(item,"checkbox");
			}
			t.shanclass(item.parentNode,"do");
		})
	})
//........................新建文件夹....................
	function creatrfile(value){
			str="<div class='che'></div><span class='wj'></span><span id='wj-font' ></span><input type ='text'>";
		return str;
	}
	var av = nas.getElementsByTagName("a");//获取新建按钮
// 生成新文件夹
	av[5].addEventListener("mouseup",function(){
		img1.style.display = "none"
		var firstElement = contentct.firstElementChild;
		var li = document.createElement("li");
		li.className="curriculum";
		li.innerHTML=creatrfile();
		contentct.appendChild(li);
		contentct.insertBefore(li,firstElement);
		var inp = li.getElementsByTagName("input")[0]
		inp.style.display="block";
		inp.focus();//使Inp获得焦点
		av[5].onoff=true; //新建的状态
	})
	
	document.addEventListener("mousedown",function(){
		tahtml();
	})
	document.addEventListener("keyup",function(e){//键盘按下回车时新建成功
		if( e.keyCode === 13 ){
			tahtml();
		}
	})
	function tahtml(){
		//如果不是新建状态，不在继续执行
		if(!av[5].onoff){
			return;
		}
		var inp = contentct.firstElementChild.lastElementChild;
		var span = contentct.firstElementChild.getElementsByTagName("span")[1]
		
		var value = inp.value.trim();
		if(value){//新建
			var isname = handle.isTitle(datas,value,currentId);//在指定id的所有的子数据中，是否存在重复的title
			if(isname){//如果有重复的文件名，则新建不成功
				contentct.removeChild(contentct.firstElementChild);//删掉新建的第一个文件
				server( "unsuccessful","命名冲突,无法新建");//弹框显示
			}else{
				span.style.display="block";
				span.innerHTML=inp.value;
				inp.style.display="none";
				var id = Math.random();//id值取随机数
				datas.unshift({//把新建数据添加在最前面
					id:id,
					pid:currentId,
					title:value,
					type:"file"
				});
				img1.style.display = "none";
				contentct.firstElementChild.setAttribute("data-id",id);//在数据中添加新建文件的信息
				contentleft.innerHTML=create(-1);//新建成功提醒  树形菜单重新渲染
				contentct.innerHTML=creatrhtml(currentId);//重新渲染文件夹
				t.removeclass(div1,"bj");
				server( "succeed","新建成功");
			}
		}else{//不新建
			contentct.removeChild(contentct.firstElementChild);
			//判断是否有子数据，没有文件的话显示背景
			var chlids = handle.getchild(datas,currentId);
			if( !childs.length ){
				img1.style.display = "none";
			}
		}
		av[5].onoff=false;
	}
	
    //.....................新建成功弹出框....................................
    var server3 = document.getElementById("server-3");
    function server(className,text){
    	server3.style.transition = "none";
    		//先拉倒-60在过渡到0
    	server3.style.top = "-60px";
    	server3.className = 'chux';
    	setTimeout(function (){
			t.addclass(server3,className);
			server3.style.transition = ".3s";
			server3.style.top = "0";	
		},0)
		server3.innerHTML = text;
		//延时上去的定时器只能有一个
		clearTimeout(server3.timer);
		server3.timer = setTimeout(function (){
			server3.style.top = "-60px";

		},1000)	
    }
    
  //  ............................删除...........................
  
  //找到被选中的文件
	function whohtml(){//找所有的checkbox的class为checkbox的，就是被选中的li
		return Array.from(chebox).filter(function(item){
			return t.hasClass(item,"checkbox");
		}).map(function (item){
				return t.classid(item,".curriculum");
		})
	}
	av[4].addEventListener("click",function(){//点击删除，没有选择文件和选择文件两种情况
		var selse = whohtml();
		if(selse.length){//如果有选中的文件,使用弹框
			tan({
				title:"删除文件",
				content:"<div style='padding: 10px' class='sd'>确定要删除这个文件夹吗？</br>已删除的文件可以在回收站找到</div>",
				okof:function(){//删除掉要删的文件的所有的子孙数据 
					//1. 拿到要删除数据的id
					var id = selse[0].dataset.id;
					var arr =[];
					for( var i = 0; i < selse.length; i++ ){
						arr.push(selse[i].dataset.id);
					}
					//删除选中的数据
					handle.delectChildsAll(datas,arr);
					contentct.innerHTML=creatrhtml(currentId);//重现渲染文件夹区域
					server( "succeed","删除文件成功");//弹出框提示
					t.removeclass(div1,"bj");
					bgblock(currentId);// 无子元素渲染背景
					contentleft.innerHTML=create(-1);//重现渲染菜单区域
				}
			})
			
		}else{
			server( "defeated","请选择文件");
		}

	})
	
    
//..............................重命名.............................
	var rechristen = {};  //保存当前正在重名所需要的元素
	av[3].addEventListener("click",function(){
		var selse = whohtml();
		if(selse.length===1){
			rechristen.element = selse[0];
			rechristen.inp = rechristen.element.querySelector("input");//.file-title
			rechristen.span= rechristen.element.querySelector("#wj-font");
			rechristen.span.style.display = "none";
			rechristen.inp.style.display = "block";
			rechristen.inp.value = rechristen.span.innerHTML.trim();
			
			rechristen.inp.select();
			//命名状态：true是正在重命名
			av[3].isName = true;
		}else if(selse.length > 1){
			server( "unsuccessful","只能对单个文件重命名");
		}else {
			server( "defeated","请选择重命名文件");
		}
	})
	document.addEventListener("mousedown",function(){
		if( !av[3].isName ){
			return;
		}
		/*
			判断input的值是否为空
			不为空：
				是否命名冲突
					冲突：
						提醒命名不成功，还原以前名字
					不冲突：
						提醒命名成功，改为更改后的名字
						找到数据，改title，重新渲染树形菜单

			为空：
				还原以前名字
		*/
		var value = rechristen.inp.value.trim();
		if(value){
			var istext = handle.isTitle(datas,value,currentId);
			//名字存在
			if(value === rechristen.span.innerHTML.trim()){
			}else if(istext){
				server( "unsuccessful","命名冲突，请重新命名");
			}else{

				server( "succeed","命名成功");

				rechristen.span.innerHTML = value;

				//通过id找到对应的数据
				var self = handle.getselfid(datas,rechristen.element.dataset.id);

				self.title = value;

				contentleft.innerHTML=create(-1);//重现渲染菜单区域

			}
		}

			rechristen.span.style.display = "block";
			rechristen.inp.style.display = "none";

		t.removeclass(div1,"bj")
		t.removeclass(rechristen.element.querySelector(".che"),"checkbox");
		t.removeclass(rechristen.element,"do");

	})
	
	//.................移动到............................
	av[2].addEventListener("click",function(){
		var selse = whohtml();//先找到选中的文件
		//分两种情况，一种是有选中的文件，一种是没有选中的文件
		var isfull = true;//ture代表没有选择任何一个目录，无法关闭弹窗
		var move =null;//要移动到的文件的id先设置一个空的
		//如果有选中的文件，出现弹框
		if(selse.length){
			tan({
				title:"移动到",
				content:"<div class='yido'>"+create(-1)+"</div>",
				okof:function(){
					if(isfull){//如果没有选中的文件,不能关闭弹窗
						return true;
					}else{
						//可以关闭弹框，说明可以移动了
						//move 移动的目标目录
						var onoff=false;//判断有没有重名的
						for(var i=0;i<se.length;i++){
							//通过id找到选中文件对应的数据
							var chil = handle.getselfid(datas,se[i]);
							//判断一下self.title是否已经存在move下的子数据中
							var isexist = handle.isTitle(datas,chil.title,move);
							//如果不存在更改pid，如果存在，不更改
							if(!isexist){
								chil.pid = move;//更改Pid
								contentct.removeChild(selse[i]);//把这个Li删掉
							}else{
								onoff=true;//onoff为true说明有文件是重名的，则移动失败
							}
						}
						if(onoff){
							server( "unsuccessful","部分文件移动失败，重名了");
						}
						contentleft.innerHTML=create(-1);//重新渲染菜单区域
					}
				}
			})
			//给移动的树形菜单添加点击事件
			var yido = document.querySelector(".yido");
			var mu = yido.querySelector(".mu");
			//通过选中的文件，找到数据
			var se =[];
			
			for(var i=0;i<selse.length;i++){
				se.push(selse[i].dataset.id);
			}
			//通过选中的Id找到他的子数据
			var seDate = handle.getchildren(datas,se);
			//找到错误提醒的元素
			var sp = document.getElementById("sp");
			//添加菜单初始颜色
			t.addclass(mu,"back");
			var muclolr =mu;//记录当操作的元素
			yido.addEventListener("click",function(e){
				var target=e.target;
				if(target=t.classid(target,".mu")){
					t.removeclass(mu,"back");//删除上一个class
					t.addclass(target,"back");//添加class
					mu=target; //点击完的这一个等于上一个
					move = target.dataset.id;
					//通过上面定义的空变量move找到对应的ID数据
					var getdata = handle.getselfid(datas,move);//根据id找到如果点击的移动的属性菜单的数据
					
					//se[0]的pid如果为move，那么说明move是选中的那些数据的父数据
					//通过选中的id，找到对应的数据，目的是找到pid
					var selfData = handle.getselfid(datas,se[0]);
					if( move == selfData.pid ){
						sp.innerHTML = "该文件下已经存在";
						isfull = true;//不能关闭弹框
						return;
					}
					//在判断getdata是否存在于selfData里面
					var onoff=false;
					for(var i=0;i<seDate.length;i++){
						if(getdata.id==seDate[i].id){
							t.removeclass(div1,"bj");
							onoff = true;
							break;
						}
					}
					
					//for循环要跟每一项比较完成之后，才能得到结果
					if( onoff ){
						sp.innerHTML = "不能将文件移动到自身或其子文件夹下";
						isfull = true; //不能关闭弹框
					}else{
						sp.innerHTML = "";
						isfull = false;//可以关闭弹框
					}
				}
			})
		}else{
			server( "defeated","请选择要移动的文件");
		}
		
	})

	//.....................框选.................................
	var div5 = null,
		oriX = null,
		oriY = null,
		imdiv=null,//伪装者，透明的div
		sketch=null,//剪影
		isHitElement = null;  //被碰撞的元素 
	document.onmousedown = function(e){
//1.先判断这个文件是不是被选中的
		if(e.which !== 1) return;//排除掉鼠标右键跟中键
      //	判断li上面是否有class是checkbox，就是看看是否被选中
		var isChecked = false;//初始没有被选中
		if( t.classid(e.target,".curriculum") ){//判断这个文件是否是选中的状态
			isChecked = !!t.classid(e.target,".curriculum").querySelector(".checkbox");
		}//一个！是取反并且转成布尔值，两个！！是再次取反
    	oriX = e.clientX ;//摁下去的x位置
    	oriY = e.clientY ;//摁下去的Y位置
    	document.onmousemove = function(e){
 //2.不是选中状态  画框，选中状态     拖拽选中的文件		
    		if(isChecked){
//3.画框 拖拽，如果移动的距离，宽高大于5个像素，才能够生成剪影和伪装者
	    		if( Math.abs( e.clientX - oriX ) <5 && Math.abs( e.clientY -  oriY ) <5 ){
	    			return;
	    		}
	    		var selse = whohtml();//找到选中的文件
//4.生成剪影，被拖着的是剪影
				if(!sketch){//如果剪影不存在，生成一个剪影
	    			sketch = document.createElement("div");
	    			sketch.className="sk2";
	    			sketch.innerHTML=`<div class="div-img"></div>
	    							   <span class="ssp">${selse.length}</span>`;
	    			document.body.appendChild(sketch);
	    			
//5.生成一个透明的div，目的是在同一个文件down有up的时候，带你在这个div上不至于进到这个文件的下一级

	    			imdiv=document.createElement("div");
	    			imdiv.style.cssText=`	width: 10px;
	        								height: 10px;
	        								background: red;
	        								position: absolute;
	        								left:0;
	        								top:0;
	        								opacity:0;
	                                     `;
	    			document.body.appendChild(imdiv);
	    		}
	    		 sketch.style.left = e.clientX+15 + "px";//???
			     sketch.style.top = e.clientY+15 + "px";
			     imdiv.style.left= e.clientX-5+"px";//+5是为了避免触发点击事件,让鼠标一直点在DIV身上
			     imdiv.style.top= e.clientY-5+"px";
			     isHitElement = null;  //被碰撞的元素 ,只要没有碰撞,一直是null的状态      
//6.碰撞之前排除掉选中的元素			     
			     for(var i=0;i<lis.length;i++){
			     	var onoff=false;
			     	//排除掉选中的元素
			     	for(var j=0;j<selse.length;j++){
			     		if(selse[j]==lis[i]){
			     			onoff=true;
			     		}
			     	}
//7.如果是被选中的元素,跳过碰撞检测的	
			     		if( onoff ) continue;
//8.伪装者跟元素发生碰撞,把被碰撞的元素存储起来			     		
			     		if(peng(imdiv,lis[i])){
			     			t.addclass(lis[i],"active")
			     			isHitElement=lis[i];//存储被碰撞的元素
			     		}else{
	    					t.removeclass(lis[i],"active")
			     		}
			     	
			     }
				return;
			}
    		//在move的过程,只生成一个div，只要生成了了一个div之后，就没必要再生成了
    		////生成的div，要在一定的范围之后才append到body中
    		if( Math.abs( e.clientX - oriX ) > 15 || Math.abs( e.clientY -  oriY ) > 15 ){
    			if(!div5){//如果div不存在就生成
    				div5 = document.createElement("div");
			    	div5.className = "divs";
			    	document.body.appendChild(div5);
    			}
    			div5.style.width = Math.abs( e.clientX - oriX ) + "px";
	    		div5.style.height = Math.abs( e.clientY - oriY ) + "px";
	    		div5.style.left = Math.min( e.clientX,oriX ) + "px";
	    		div5.style.top = Math.min( e.clientY,oriY ) + "px";
	    		for (var i = 0; i < lis.length; i++) {//让div和每一个li进行碰撞检测
	    			if( peng(div5,lis[i]) ){//碰到
	    				t.addclass(lis[i],"do")
	    				t.addclass(lis[i].firstElementChild,"checkbox")
	    			}else{
	    				t.removeclass(lis[i],"do")
	    				t.removeclass(lis[i].firstElementChild,"checkbox")
	    			}
	    		}
	    		//判断是否全选
	    		var who = whohtml();
	    		if( who.length === checkedAll.length ){
						t.addclass(div1,"bj")
					}else{
						t.removeclass(div1,"bj")
					}
	    	}
    	}
    	document.onmouseup = function (e){
			document.onmousemove = null;
			document.onmouseup = null;
			if( div5){
				document.body.removeChild(div5);
				//把div变量设置为null，目的再次点击还要继续生成div
				div5 = null;
			}
			if(sketch){//抬起的时候把他们删掉
				document.body.removeChild(sketch);
				document.body.removeChild(imdiv);
				sketch =null;
				imdiv = null;
			}
//9.抬起的时候判断是否有碰撞元素
			if(isHitElement){
				var onoff = false;
				var selse = whohtml();//找到选中的文件
			//找到选中文件的id
				var  selseid = selse.map(function(item){
					return item.dataset.id;
				})
			//找到被碰撞元素的id	
				var fiid = isHitElement.dataset.id;
				for(var i=0;i<selseid.length;i++){
			//找到选中文件id对应的数据
					var self = handle.getselfid(datas,selseid[i]);
//10.判断一下选中文件self.title是否已经存在被撞元素fiid下的子数据中
					var iscun = handle.isTitle(datas,self.title,fiid);
					//如果存在不更改,如果不存在更改pid
					if(!iscun){//如果不存在,选中文件的Pid等于被撞元素的id,等于放在被撞元素的下面
						self.pid=fiid;
						contentct.removeChild(selse[i]);//把选中的文件清除掉
					}else{
						var onoff = true;//只要有一个是true说明有重名的,移动失败
					}
					if(onoff){
						server( "unsuccessful","部分文件移动失败，重名了");
					}
					contentleft.innerHTML=create(-1);//重新渲染菜单区域
//11.释放一下变量，目的是移动之后，不要再up后再次出发移动的判断
					isHitElement = null;
				}
			}
			
		}
	   	return false;	
    }
    function peng(obj1,obj2){//返回结果如果为true，说明碰到
    	var pos1 = obj1.getBoundingClientRect();
    	var pos2 = obj2.getBoundingClientRect();
    	
    	return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
    }