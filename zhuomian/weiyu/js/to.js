(function (){
	var meth = {
		//给元素添加指定的class
		addclass(element,className){
			if( !meth.hasClass(element,className) ){
				element.className += " "+ className;
			}
		},
		//删除元素指定的class
		removeclass(element,className){
			if( meth.hasClass(element,className) ){
				var classArr = element.className.split(" ");
				for( var i = classArr.length-1; i >= 0; i-- ){
					if( classArr[i] === className){
						classArr.splice(i,1);
					}
				}
				element.className = classArr.join(" ");

			}
		},
		//有指定class，就删除；没有，就添加。
		shanclass(element,className){
			if( meth.hasClass(element,className) ){
				meth.removeclass(element,className);
				return false;
			}else{
				meth.addclass(element,className);
				return true;
			}
		},
		hasClass(element,className){
			var classArr = element.className.split(" ");
			for(var i=0;i<classArr.length;i++){
				if(classArr[i]===className){
					return true;
				}
			}
			return false;
		},
		classid(element,attr){
    	//先找到attr的第一个字符
	    	var ab = attr.charAt(0);
	    	if(ab === "."){
	    		//element没有指定的class，那么element就为父级，继续向上找
	    		while(element.nodeType !==9 && !meth.hasClass(element,attr.slice(1)) ){
	    			element=element.parentNode;
	    		}
	    	}else if(ab==="#"){//寻找指定的id,因为id只有一个
	    		while(element.nodeType !==9 && element.id!==attr.slice(1)){
	    			element=element.parentNode;
	    		}
	    	}else{//寻找指定的id,因为id只有一个
	    		while(element.nodeType !==9 && element.nodeName!==attr.toUpperCase()){
	    			element=element.parentNode;
	    		}
	    	}
	    	return element.nodeType==9?null:element;
	    }
	}
	window.t = meth;
})();
