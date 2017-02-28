//......................准备的数据.......................
var handle = {
//获取指定id的子数据
	//通过指定id找到子数据
	getchild(data,id){
		return data.filter(function (value){
			return value.pid == id;
		})	
	},
//通过id找到对应的数据	
	getselfid(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	},
//指定多个id，找到多个id下的子数据
 	getchildren(data,idarr){
 		var arr=[];
 		idarr.forEach(function(value){
 			arr=arr.concat(handle.getChildsAll(data,value))//getChildsAll,调用方法找到这个id的所有的子孙数据
 		})
 		return arr;
 	},
	
//找到指定id所有的父数据，包含自己
	getprevent(data,id){
		var arr = [];
		var self = 	handle.getselfid(data,id);
		if( self ){
			arr.push(self);
			arr = arr.concat(handle.getprevent(data,self.pid));
		}
		
		return arr;
	},
	//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	isTitle(data,value,id){
		var childs = handle.getchild(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	},
	//通过指定id，找到这个id的所有的子孙数据，放在数组中
	getChildsAll(data,id){
		var arr = [];

		var self = handle.getselfid(data,id);
		arr.push(self);
		//在子数据
		var childs = handle.getchild(data,self.id);

		childs.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value.id));
		})

		return arr;
	},
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	getdarr(data,idArr){
		var arr = [];
		idArr.forEach(function(value){
			arr = arr.concat(handle.getChildsAll(data,value));
		})

		return arr;
	},

	//指定多个id，删除多个id下面的子孙数据

	delectChildsAll(data,idArr){
		//所有的子孙数据
		var childsAll = handle.getdarr(data,idArr);
		//循环data，拿到data的每一项，跟childsAll每一项对比
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < childsAll.length; j++ ){
				if( data[i] === childsAll[j] ){
					data.splice(i,1);
					i--;
					break;
				}
			}
		}
	}
}
