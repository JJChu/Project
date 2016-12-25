(function(){  // 函数自执行
	var datas = data.files; //准备数据
	var currentId = 0; // 初始点击的id

//---------------------------【生成各个区域HTML】---------------------
// 1.生成菜单区域内容
	var treeMenu = document.getElementsByClassName("cata")[0];
	function creatTreeHtml(id){
		var childs = handle.getChildsById(datas,id);
		var html = '<ul>';
		childs.forEach(function(value){
			var parLength = handle.getParsById(datas,value.id).length;
			html += '<li><h3 style="padding-left:'+parLength*20+'px" data-id="'+value.id+'"><i class="on"></i><i class="file_on"></i><span>'+value.title+'</span></h3>';
			html += creatTreeHtml(value.id);
			html += '</li>';
		})
		return html;
	}
	treeMenu.innerHTML = creatTreeHtml(-1);
// 2.生成导航区域内容
	var navHtml = document.getElementsByClassName("bar_nav")[0];
	function creatNavHtml(id){
		var arrPars = handle.getParsById(datas,id).reverse();
		var html = "";
		arrPars.forEach(function(value){
			html += '<li data-id="'+value.id+'">'+value.title+'</li>';
		})
		return html;
	}
// 3.生成文件区域内容
	var fileHtml = document.getElementById("file_content");
	function creatFileHtml(id){
		var arrChilds = handle.getChildsById(datas,id);
		var html = "";
		arrChilds.forEach(function(value){
			html += '<li data-id="'+value.id+'"><div class="check"></div><img src="img/file_box.png"/><span>'+value.title+'</span><input type="text" class="editor" /></li>';
		})
		return html;
	}
	
	
//----------------------------【添加点击事件】--------------------------

	var checkAll = document.querySelector(".all");
	var upLoad = document.getElementsByClassName("upload")[0]
// --------------公共使用函数-----------
	
	function render(id){  //渲染函数
		t.removeClass(getTreeById(currentId),'selected');
		t.addClass(getTreeById(id),'selected'); 	//给菜单添加背景
		navHtml.innerHTML = creatNavHtml(id);		//渲染导航区域
		fileHtml.innerHTML = creatFileHtml(id); 	//渲染文件区域
		var childs = handle.getChildsById(datas,id);//文件为空时 显示 提示
		if (!childs.length) {
			upLoad.style.display = "block";
		}else{
			upLoad.style.display = "none";
		}
		t.removeClass(checkAll,'checkall');			//全选按钮取消
		currentId = id;								//当前的id改变
	}
	render(0);
	var oTip = document.getElementsByClassName("tip")[0];
	var tipSpan = oTip.getElementsByTagName("span")[0];
	function tip(className,tipVal){ // 提示框
		oTip.className = "tip";
		t.addClass(oTip,className);
		tipSpan.innerHTML = tipVal;
		clearTimeout(oTip.timer);
		oTip.style.transition = "none";
		oTip.style.top = "-50px";
		setTimeout(function(){
			oTip.style.transition = "0.5s";
			oTip.style.top = "10px";
		},0)
		oTip.timer = setTimeout(function(){
			oTip.style.top = "-50px";
		},1500)
	}
// 1. 添加菜单的交互
	treeMenu.addEventListener('click',function(ev){
		var target = ev.target;
		if (target = t.parent(target,'h3')) {	// 点击其他元素时,找到父级H3
			var id = target.dataset.id;
			render(id);
		}
	})
	
	t.addClass(getTreeById(currentId),'selected');
	function getTreeById(id){ // 通过指定的id 找到菜单中的某个元素
		var h3s = treeMenu.getElementsByTagName("h3");
		for (var i = 0; i < h3s.length; i++) {
			if (h3s[i].dataset.id == id) {
				return h3s[i];
			}
		}
	}
// 2. 添加导航的交互
	navHtml.addEventListener('click',function(ev){
		var target = ev.target;
		if (target = t.parent(target,'li')) {	// 点击其他元素时,找到父级H3
			var id = target.dataset.id;
			render(id);
		}
	})
// 3.添加文件的交互
	function isCheckAll(){	//判断所有的li有没有被选中
		var bl = Array.from(lis).every(function(value){
			return t.hasClass(value,'selected');
		})
		if (bl) {
			t.addClass(checkAll,'checkall');
		}else{
			t.removeClass(checkAll,'checkall');
		}
	}
	fileHtml.addEventListener('click',function(ev){ 
		var target = ev.target;
		if ( t.parent(target,'.check')) {	//  单选
			target = t.parent(target,'li');
			t.onOffClass(target,'selected');
			isCheckAll(); //判断所有的li有没有被选中
		}
	})
	fileHtml.addEventListener('click',function(ev){ // 进入下一级
		var target = ev.target;
		if (t.parent(target,'.check') || t.parent(target,'.editor')) {
			return;
		}
		if ( t.parent(target,'li')) {
			target = t.parent(target,'li')
			var id = target.dataset.id;
			render(id);
		}
	})
	fileHtml.addEventListener('mouseover',function(ev){ // 鼠标移入
		if (target = t.parent(ev.target,'li')) {
			t.addClass(target,'active')
		}
	})
	fileHtml.addEventListener('mouseout',function(ev){ // 鼠标移出
		if (target = t.parent(ev.target,'li')) {
			t.removeClass(target,'active');
		}
	})
	
	// 点击到 input 时，阻止冒泡
	fileHtml.addEventListener('mousedown',function(ev){ // 鼠标移出
		if (target = t.parent(ev.target,'.editor')) {
			ev.stopPropagation();
		}
	})

//-------------------------【全选】----------------------------------------
	
	var lis = fileHtml.getElementsByTagName('li');
	checkAll.addEventListener('click',function(){
		var bl = t.onOffClass(this,'checkall');
		for (var i = 0; i < lis.length; i++) {
			if (bl) {
				if (!t.hasClass(lis[i],'selected')) {
					t.addClass(lis[i],'selected');
				}
			}else{
				t.removeClass(lis[i],'selected');
			}
		}
	})

//-------------------------【新建文件夹】---------------------------
	
	var funcNav = document.getElementsByClassName("nav_left")[0];
	var creatFile = document.getElementsByClassName("creat")[0];
// 1. 功能新建文件夹
	creatFile.addEventListener('mouseup',function(ev){ // 鼠标的按下时候创建一个文件并获取焦点
		this.isCreat = true;  // !!在元素身上绑定自定义属性 >> 表示正在创建文件状态
		var newFileLi = document.createElement("li");
		newFileLi.innerHTML = newFileHtml({});
		var firstEle = fileHtml.firstElementChild;
		if (firstEle) {		//如果这个文件夹下有子文件则 innerBefore，否则 append 
			fileHtml.insertBefore(newFileLi,firstEle)
		}else{
			fileHtml.appendChild(newFileLi);
		}
		// 新建时，将空文件上传tip隐藏
		upLoad.style.display = "none";
		// 如果全选按钮选中的话，取消选中，并绑定一个状态
		if (t.hasClass(checkAll,'checkall')) { //
			t.removeClass(checkAll,'checkall');
			creatFile.hasCheckAll = true;
		}else{
			creatFile.hasCheckAll = false;
		}
		
		var newSpan = newFileLi.querySelector("span");
		var newInput = newFileLi.querySelector("input");
		newSpan.style.display = "none";
		newInput.style.display = "block";
		newInput.focus();
	})
	
	document.addEventListener('mousedown',creatNewFile);	//点击document
	document.addEventListener('keyup',function(e){	// 点击确定按钮
		if (e.keyCode == 13) {
			creatNewFile();
		}
	})
	function creatNewFile(){
		if (!creatFile.isCreat) return;  //如果没有在创建状态，直接return
		var firstEle = fileHtml.firstElementChild;
		var newSpan = firstEle.querySelector("span");
		var newInput = firstEle.querySelector("input");
		var inputVal = newInput.value.trim();
		if (inputVal=="") {		//判断输入框内容是否为空
			fileHtml.removeChild(firstEle);	// 为空的时候删除首个元素
			if (creatFile.hasCheckAll) {	// 新建失败的时候,如果全选按钮原本点亮，之后也要点亮
				t.addClass(checkAll,'checkall');
			}
		}else{                      
			var isExist = handle.isTitleExist(datas,inputVal,currentId);
			if (isExist) {
				//判断是否重名，重名提醒并新建失败
				tip('warn',"命名冲突，新建不成功");
				fileHtml.removeChild(firstEle);
				if (creatFile.hasCheckAll) { // 新建失败的时候,如果全选按钮原本点亮，之后也要点亮
					t.addClass(checkAll,'checkall');
				}
			}else{
				// 添加信息
				tip('success',"新建文件成功");
				newSpan.innerHTML = inputVal;
				newSpan.style.display = "block";
				newInput.style.display = "none";
				// 生成数据，存放数据
				var newId = Math.random();
				datas.unshift({
					id:newId,
					pid:currentId,
					title:inputVal
				})
				//  在元素行间 绑定自定义属性
				firstEle.setAttribute('data-id',newId);
				//  重新渲染菜单栏
				treeMenu.innerHTML = creatTreeHtml(-1);
			}
		}
		//  新建后，判断是否有子级，显示或者隐藏提醒
		var arrChilds = handle.getChildsById(datas,currentId);
		if (!arrChilds.length) {
			upLoad.style.display = "block";
		}
		creatFile.isCreat = false; // 创建后，把状态关闭
	}
	function newFileHtml(value){  // 生成 新建元素的的Hmtl，传一个数据；
		var str = '<div class="check"></div><img src="img/file_box.png"/><span>'+value.title+'</span><input class="editor" type="text" />';
		return str;
	}

//------------------------------【删除文件夹】--------------------
	
	var deleFile = document.getElementsByClassName("delect")[0];
	deleFile.addEventListener('click',function(){
		// 1.判断是否有选中文件
		var liSele = whoSelected();
		if (!liSele.length) {
			tip('warn',"请选择需要删除的文件");
		}else{
			//弹窗
			popUp({
				title:'删除选中的文件',
				content:'<div style="padding-left:20px">你确定要删除这些文件</div><div style="padding-left:20px">删除的文件可以在回收站中找到</div>',
				okFn:function(){
					// 2.得到所有选中文件的id值
					var arrId = liSele.map(function(item){
						return item.dataset.id;
					})
					// 3.根据 一组 id值 删除包括自己在内的所有子孙数据
					handle.deleteDatasByArrId(datas,arrId);
					// 4.重新渲染
					treeMenu.innerHTML = creatTreeHtml(-1);
					render(currentId);
					tip('success',"删除成功");
				}
			})
		}
	})
	function whoSelected(){ // 将所有选中的文件存在数组中返回
		return Array.from(lis).filter(function(item){
			return t.hasClass(item,'selected');
		})
	}

//-------------------------【框选】and 【选择拖拽】------------------------------

	var div = null,
		disX = null,
		disY = null,
		isChecked = false,	//这个元素是否已经被选中
		sketchDiv = null,	//拖拽
		imposterDiv = null,	//伪装者
		isHitEle = null;	//被碰撞的文件夹
	document.addEventListener('mousedown',function(e){
		if (e.which != 1) return; // 必须点数遍左键
		e.preventDefault();		  // 取消默认行为
		if (!t.parent(e.target,"#file_content")) return;  // 必须在文件区域点击
		isChecked = false;
		if (t.parent(e.target,"li")) {	// 这个文件已被选中
			isChecked = t.hasClass(t.parent(e.target,"li"),'selected');
		}
		disX = e.clientX;
		disY = e.clientY;

		document.addEventListener('mousemove',moveFn);
		document.addEventListener('mouseup',upFn);
		
	})
	function moveFn(e){	// move函数
		if (isChecked) {	//如果元素已经被选中，开始拖动
			//1.哪些被选中
			var arrSele = whoSelected();
			//2.生成提示小图标 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (Math.abs(e.clientX - disX)<5 && Math.abs(e.clientY - disY)<5) { //缓冲间隙
				return;
			}
			if (!sketchDiv) {
				sketchDiv = document.createElement("div");
				sketchDiv.className = "drag_box";
				sketchDiv.innerHTML = '<span class="drag_num">'+arrSele.length+'</span>';
				document.body.appendChild(sketchDiv);
				//3.生成伪装小div
				imposterDiv = document.createElement("div");
				imposterDiv.style.cssText = `position:absolute;
											width:10px;
											height:10px;
											background:red`;
				document.body.appendChild(imposterDiv);
			}
			sketchDiv.style.left = e.clientX+20 + 'px';
			sketchDiv.style.top = e.clientY+20 + 'px';
			imposterDiv.style.left = e.clientX-5 + 'px';
			imposterDiv.style.top = e.clientY-5 + 'px';
			
			//4.拖拽碰撞检测 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			isHitEle = null;
			for (var i = 0; i < lis.length; i++) {
				if (t.hasClass(lis[i],'selected')) {
					continue;
				}else if (peng(imposterDiv,lis[i])) {
					t.addClass(lis[i],'active');
					isHitEle = lis[i];
				}else{
					t.removeClass(lis[i],'active');
				}
			}
			
			return;	// 在元素身上点下，如果这个元素已选中，则不能框选
		}  
		if (Math.abs(e.clientX - disX)>15 || Math.abs(e.clientY - disY)>15) {
			if (!div) {
				div = document.createElement('div');
				div.className = 'kuang';
				document.body.appendChild(div);
			}
			div.style.width = Math.abs(e.clientX - disX) + "px";
			div.style.height = Math.abs(e.clientY - disY) + "px";
			div.style.left = Math.min(e.clientX,disX) + "px";
			div.style.top = Math.min(e.clientY,disY) + "px";
			for (var i = 0; i < lis.length; i++) {
				if( peng(div,lis[i]) ){//碰到
					t.addClass(lis[i],'selected');
				}else{
					t.removeClass(lis[i],'selected');
				}
			}
			isCheckAll();  // 判断元素是否全部被框选中
		}	
	}
	
	function upFn(){	// up函数
		document.removeEventListener('mousemove',moveFn);
		document.removeEventListener('mouseup',upFn);
		// 鼠标抬起，移除框框
		if (div) {
			document.body.removeChild(div);
			div = null;
		}
		//拖拽
		if (isHitEle) {
			//5.鼠标抬起的时候,对拖拽的元素进行移动
			
			//5-1.修改数据，重新渲染
			var arrSele = whoSelected();
			var arrSeleId = arrSele.map(function(value){
				return value.dataset.id;
			})
			var goalId = isHitEle.dataset.id;
			var onOff = false;
			for (var i = 0; i < arrSeleId.length; i++) {
				var sel = handle.getSelfById(datas,arrSeleId[i]);
				//5-2.移动的时候  判断  该文件夹下是否有重名
				var isExist = handle.isTitleExist(datas,sel.title,goalId);
				if (isExist) {	//存在的话，提示：部分移动失败，命名冲突； 必须所有的都比较完毕才能判断
					onOff = true;
				}else{	//如果不存在的时候，不移动（不修改数据）
					sel.pid = goalId;
					fileHtml.removeChild(arrSele[i]);
				}
				if (onOff) {	//移动完毕后，进行判断 提示
					tip('warn','部分移动失败，命名冲突');
				}
			}
			t.removeClass(isHitEle,'active');
			treeMenu.innerHTML = creatTreeHtml(-1);
			//用完之后释放 碰撞元素
			isHitEle = null; 
		}
		// 鼠标抬起，移除拖拽提示
		if (sketchDiv) {
			
			document.body.removeChild(sketchDiv);
			sketchDiv = null;
			document.body.removeChild(imposterDiv);
			removeChild = null;
		}
	}
	
	function peng(obj1,obj2){	// 碰撞检测
		var pos1 = obj1.getBoundingClientRect();
    	var pos2 = obj2.getBoundingClientRect();
    	
    	return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
	}
	
//--------------------------【重命名】----------------------------
	
	var reName = document.getElementsByClassName("rename")[0];
	re_obj = {}; // 存放当前重命名所需要的所有的元素
	reName.addEventListener('click',function(){
		var arrSele = whoSelected(); // 被选中文件
		if (arrSele.length === 1 ) {
			re_obj.liEle = arrSele[0];
			
			re_obj.checkEle = re_obj.liEle.querySelector('.check');
			re_obj.spanEle = re_obj.liEle.querySelector('span');
			re_obj.inputEle = re_obj.liEle.querySelector('.editor');
			
			re_obj.spanEle.style.display = 'none';
			re_obj.inputEle.style.display = 'block';
			re_obj.inputEle.value = re_obj.spanEle.innerHTML ;
			
			re_obj.inputEle.select();
			reName.isRename = true; //满足重命名条件的时候，进入重命名状态
		}else if (arrSele.length > 1) {
			tip('warn','只能对一个文件进行重命名');
		}else{
			tip('warn','请选择需要重命名的文件');
		}
	})
	document.addEventListener('mousedown',function(){
		if (!reName.isRename) { //如果不在重命名状态，直接return
			return;
		}
//      获取输入的内容
//		判断内容是否为空
//			不为空:
//				名字是否跟以前一样：
//    				一样的话:还原之前名字
//				否则是否冲突:
//					提示命名冲突,命名不成功
//				否则：
//					提示命名成功
//					修改数据
//			为空:
//				还原以前的名字
		nowValue = re_obj.inputEle.value.trim();
		if (nowValue) {
			var isExist = handle.isTitleExist(datas,nowValue,currentId); // 是否存在该名字
			if (nowValue !== re_obj.spanEle.innerHTML) {
				if (isExist) {
					tip('warn','命名冲突，请重新命名')
				}else{
					tip('success','命名成功');
					re_obj.spanEle.innerHTML = nowValue;
					var self = handle.getSelfById(datas,re_obj.liEle.dataset.id);
					self.title = nowValue;
					treeMenu.innerHTML = creatTreeHtml(-1);
				}
			}
		}
		re_obj.spanEle.style.display = 'block';
		re_obj.inputEle.style.display = 'none';
		t.removeClass(re_obj.liEle,'selected');
		t.removeClass(checkAll,'checkall');
		reName.isRename = false; // 重命名状态结束
	})
	
//--------------------------【移动到文件夹】-------------------------------------	
	
	var move = document.querySelector('.move');
	move.addEventListener('click',function(){
		var arrSel = whoSelected(); //找到选中的文件
		
		var isOk = true; // 控制确定按钮是否可点击，默认true，没有选择文件，不能点击
		var goalId = null; // 移入到的文件的id
		if (arrSel.length) {
			//1.显示弹窗
			popUp({
				title:'移动到',
				content:'<div class="cata tree_move" style="border:1px solid #56acdd;width:100%;border-radius:5px">' + creatTreeHtml(-1) + '</div>',
				okFn:function(){ //true 表示不能点击，false可以点击
					if (isOk) {//不能点击确定
						return true;
					}else{		//可以点击确定，说明可以移动了
						//1.修改数据，重新渲染
						var onOff = false;
						for (var i = 0; i < arrSeleId.length; i++) {
							var sel = handle.getSelfById(datas,arrSeleId[i]);
						//2.移动的时候  判断  该文件夹下是否有重名
							var isExist = handle.isTitleExist(datas,sel.title,goalId);
							if (isExist) {	//存在的话，提示：部分移动失败，命名冲突； 必须所有的都比较完毕才能判断
								onOff = true;
							}else{	//如果不存在的时候，不移动（不修改数据）
								sel.pid = goalId;
								fileHtml.removeChild(arrSel[i]);
							}
							if (onOff) {	//移动完毕后，进行判断 提示
								tip('warn','部分移动失败，命名冲突');
							}
						}
						treeMenu.innerHTML = creatTreeHtml(-1);
					}
				}
			})
			//4.准备数据
			var arrSeleId = [];   //存放选中的文件的id
			for (var i = 0; i < arrSel.length; i++) {
				arrSeleId.push(arrSel[i].dataset.id);
			}
			var arrSeleData = handle.getChildsByArrId(datas,arrSeleId); //通过一组id找到包括自身在内的所有的子数据
			
			//2.给元素添加点击处理
			var currentEle = document.querySelectorAll('.tree_move h3')[0];
			var treeMove = document.querySelector('.tree_move');
			var error = document.querySelector('.tip_box'); //提醒错误的元素
			
			treeMove.addEventListener('click',function(ev){
				target = ev.target;
				if (target = t.parent(target,'h3')) {
					
					//3.给点击的元素添加class
					t.removeClass(currentEle,'selected');
					t.addClass(target,'selected');
					currentEle = target;
					
					//4.不能放在其父级目录下，提示：该目录下文件已经存在；不能点确定
					goalId = target.dataset.id; //移动到目录的id
					var goalData = handle.getSelfById(datas,goalId);	//移动到目录的数据
					var moveData = handle.getSelfById(datas,arrSeleId[0]);	//移动的文件的一条数据
					if (moveData.pid == goalId) {
						error.innerHTML = "该目录下文件已经存在";
						isOk = true;	//点击确定不能关闭弹窗
						return;
					}
					
					//5.不能放在自身 和 自己的子级下面，提示：不能将文件移动到本文件或其子文件下面
						//判断goalData 是否存在于 arrSeleData中；判断完之后再决定
					var onOff = false;
					for (var i = 0; i < arrSeleData.length; i++) {
						if (goalData == arrSeleData[i]) {
							onOff = true;	// 说明放在了自身 或者其子级下面
							break;
						}
					}
					if (onOff) {
						error.innerHTML = "不能将文件移动到本文件或其子文件下面";
						isOk = true;  //不能点确定；
					}else{
						error.innerHTML = "";
						isOk = false;  //可以点确定；
					}
					
				}
			})
			
		}else{
			tip('warn','请选择需要移动的文件'); //没有选择文件，提醒选择
		}
		
	})
	
	
})()