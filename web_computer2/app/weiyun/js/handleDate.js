var handle = {
	getSelfById(data,id){  //通过指定id在指定数据中找到数据
		return data.find(function(value){
			return value.id == id;
		})
	},
	getChildsById(data,id){  //通过指定id在指定数据中找到所有子级
		return data.filter(function (value){
			return value.pid == id;
		})
	},
	getParsById(data,id){  //通过指定id在指定数据中找到所有的父级
		var arr = [];
		var self = handle.getSelfById(data,id);
		if (self) {
			arr.push(self);
			arr = arr.concat(handle.getParsById(data,self.pid));
		}
		return arr;
	},
	isTitleExist(data,value,id){ // 判断指定id对应的所有子数据中是否有 title==value，有true，否false
		var arrChilds = handle.getChildsById(data,id);
		return arrChilds.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	},
	getChildsAll(data,id){	// 通过id值找到 包括自己在内 所有的子孙数据，放入数组并返回
		var arr = [];
		var sel = handle.getSelfById(data,id);
		arr.push(sel);
		var arrChilds = handle.getChildsById(data,sel.id);
		arrChilds.forEach(function(item){
			arr = arr.concat(handle.getChildsAll(data,item.id))
		})
		return arr;
	},
	getChildsByArrId(data,arrId){	// 通过一组id 值，找到 包括自己在内的所有的子孙 数据
		var arr = [];
		arrId.forEach(function(value){
			arr = arr.concat(handle.getChildsAll(data,value));
		})
		return arr;
	},
	deleteDatasByArrId(data,arrId){	// 通过一组id，在指定数据data中 删除 该id的数据
		var arrData = handle.getChildsByArrId(data,arrId);
		for (var i = 0; i < arrData.length; i++) {
			for (var j = 0; j < data.length; j++) {
				if (arrData[i] == data[j]) {
					data.splice(j,1);
					i--;
				}
			}
		}
	}
	
}
