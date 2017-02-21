(function(){
	var methods = {
		// 方法：在指定元素身上找有没有 指定 className，有的话返回true，没有的话返回false
		hasClass(element,className){
			var arrClass = element.className.split(" "); // 将元素身上所有的class劈开存入数组	
			for (var i = 0; i < arrClass.length; i++) {
				if (arrClass[i] == className) {
					return true;
				}
			}
			return false;
		},
		// 方法：通过指定的 class，id，tagName找到某个元素的父级
		parent(element,attr){
			var firstChar = attr.charAt(0);
			if (firstChar == ".") {
				// while 循环，如果元素不是document，且 它的className中找不到 输入的class,把element = element.parentNode
				while(element.nodeType != 9 && !methods.hasClass(element,attr.slice(1))){ 
					element = element.parentNode;
				}
			}else if (firstChar == "#") {
				while(element.nodeType != 9 && element.id != attr.slice(1)){ 
					element = element.parentNode;
				}
			}else{
				while(element.nodeType != 9 && element.nodeName != attr.toUpperCase()){ 
					element = element.parentNode;
				}
			}
			return element.nodeType == 9? null:element;
		},
		// 方法：给指定的元素身上添加上某个className
		addClass(element,className){
			if (!methods.hasClass(element,className)) {
				element.className += ' ' + className;
			}
		},
		// 方法：去除指定元素身上的某个 className
		removeClass(element,className){
			if (methods.hasClass(element,className)) {
				var arrClass = element.className.split(" ");
				var newClass = arrClass.filter(function(value){
					return value != className;
				})
				element.className = newClass.join(" ");
			}
		},
		// 方法：如果元素身上有 指定 class，则去除，否则的话，添加这个class
		onOffClass(element,className){
			if (methods.hasClass(element,className)) {
				methods.removeClass(element,className);
				return false;
			}else{
				methods.addClass(element,className);
				return true;
			}
		}
	}
	window.t = methods;
})();