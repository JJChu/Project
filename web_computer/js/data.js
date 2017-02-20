var dataFn = {			//操作数据方法
	save(key,value){
		localStorage.setItem("vue",JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	exchangeData(id1,id2,data){		//交换两个数据的位置
		var data1 = dataFn.findDataById(id1,data);
		var data2 = dataFn.findDataById(id2,data);
		data.splice(data1[1],1,data2[0]);
		data.splice(data2[1],1,data1[0]);
	},
	findDataById(id,data){			//根据id在数据中找到数据和位置[data,index]
		for(let i=0;i<data.length;i++){
			if(data[i].id == id){
				return [data[i],i];
			}
		}
	}
}

var data ={
	leftNav:[
		{
			name:"应用时尚",
			ico:"ico/appmarket.png",
			url:"",
			diaOnoff:false
		},
		{
			name:"QQ",
			ico:"ico/big.png",
			url:"weiyun.html",
			diaOnoff:false
		},
		{
			name:"腾讯微博",
			ico:"ico/weibo.png",
			url:"weiyun.html",
			diaOnoff:false
		},
		{
			name:"邮箱",
			ico:"ico/mail.png",
			url:"weiyun.html",
			diaOnoff:false
		},
		{
			name:"浏览器",
			ico:"ico/internet.png",
			url:"weiyun.html",
			diaOnoff:false
		},
		{
			name:"QQ邮箱",
			ico:"ico/zone.png",
			url:"weiyun.html",
			diaOnoff:false
		}
	]
}
var appData = [
		{
			name:"微云",
			ico:"ico/weiyun.png",
			id:1,
			url:"app/weiyun/weiyun.html",
			diaOnoff:false
		},
		{
			name:"游戏",
			ico:"ico/game_ico.png",
			id:2,
			url:"app/snack/snack.html",
			diaOnoff:false
		},
		{
			name:"动漫",
			ico:"ico/game_ico.png",
			id:2,
			url:"app/cartoon/cartoon.html",
			diaOnoff:false
		}
	];
