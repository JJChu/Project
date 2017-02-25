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
	},
	deleDataById(id,data){			//通过id删除某条数据
		for(let i=0;i<data.length;i++){
			if(data[i].id == id){
				data.splice(i,1);
				break;
			}
		}
	},
	fileNum(data){						//文件文件夹+num
		// 获取当前文件夹名字
		var arr = [];//创建数组，用来保存已有文件夹的名字
		for(var i = 0; i < data.length; i++){
			//循环所有文件夹的名字
			var name = data[i].name;
			if((name.substring(0,5) == "新建文件夹" && !isNaN(name.substring(5))) || name == "新建文件夹"){
			//判断文件夹的名字 如果 (前5位是 "新建文件夹"，并且后边是数字) 或者(文件夹的名字 就是 "新建文件夹") 
				var nub = parseInt(name.substring(5)) - 1; 
				// 拿到文件夹后边的数字，并且 -1(数组从0开始计数) ,得到的结构，就是 这应该是第几个 文件夹
				nub = isNaN(nub)?0:nub;// 由于第0个文件夹后边没有数字，所以判断如果拿到的数字是 NaN的话就代表这是第0个文件夹
				//console.log(nub);
				arr[nub] = name; //把文件夹 按顺序放入数组对应位
			}
		}
		/*
			循环结束之后，我们就可以得到一个数组，数组是按顺序排列好的 文件夹名字，如果这位没有，就会被空着
			[,"新建文件2",,"新建文件4"]
		*/
		if(!arr[0]){ //判断第0位为空 就直接返回 "新建文件夹"
			return "新建文件夹";
		}
		/* 执行到着 第0位铁定是有东西,开始循环数组*/
		for(var i = 1; i <arr.length; i++){
			if(!arr[i]){//如果数组第几位是,那说明该创建的就是第几位了
				return "新建文件夹" + (i+1); //然后 "新建文件夹" + 第几个
			}
		}
		/* 如果执行到这步，所有没有空着的位数,那就在最后再添加 */
		return "新建文件夹" + (arr.length+1);
	}
}

var data ={
	leftNav:[
		{
			name:"微云",
			ico:"ico/weiyun.png",
			url:"app/weiyun/weiyun.html",
			diaOnoff:false
		},
		{
			name:"动漫",
			ico:"ico/cartoon.png",
			url:"app/cartoon/cartoon.html",
			diaOnoff:false
		},
		{
			name:"游戏",
			ico:"ico/snack.png",
			url:"app/snack/snack.html",
			diaOnoff:false
		},
		{
			name:"QQ",
			ico:"ico/big.png",
			url:"http://web2.qq.com/",
			diaOnoff:false
		},
		{
			name:"浏览器",
			ico:"ico/internet.png",
			url:"http://www.baidu.com",
			diaOnoff:false
		},
		{
			name:"QQ空间",
			ico:"ico/zone.png",
			url:"http://qzone.qq.com/",
			diaOnoff:false
		}
	],
	topNav:[
		{
			name:"主页",
			ico:"img/home_thisMenu.png",
			url:"appList1",
			diaOnoff:false
		},
		{
			name:"邮件",
			ico:"img/email.png",
			url:"appList2",
			diaOnoff:false
		},
		{
			name:"音乐",
			ico:"img/music.png",
			url:"appList3",
			diaOnoff:false
		},
		{
			name:"视频",
			ico:"img/video.png",
			url:"appList4",
			diaOnoff:false
		},
		{
			name:"备忘录",
			ico:"img/history.png",
			url:"appList5",
			diaOnoff:false
		},
		{
			name:"日历",
			ico:"img/calendar.png",
			url:"appList6",
			diaOnoff:false
		}
	]
}
var fileData = {
	appList1:[
		{
			name:"回收站",
			ico:"ico/recycle.png",
			url:"",
			id:1,
			diaOnoff:false,
			deleData:[]
		},
		{
			name:"微博",
			ico:"ico/weibo.png",
			url:"http://weibo.com/",
			id:8,
			diaOnoff:false
		},
		{
			name:"读览天下",
			ico:"ico/readGod.png",
			url:"http://www.xiami.com/",
			id:2,
			diaOnoff:false
		},
		{
			name:"百度云",
			ico:"ico/baiduyun.png",
			url:"http://yun.baidu.com/",
			id:3,
			diaOnoff:false
		}
	],
	appList2:[
		{
			name:"网易邮箱",
			ico:"ico/wyemail.png",
			url:"http://mail.163.com/",
			id:4,
			diaOnoff:false
		},
		{
			name:"QQ邮箱",
			ico:"ico/mail.png",
			url:"https://mail.qq.com/",
			id:4,
			diaOnoff:false
		},
		{
			name:"芒果旅游",
			ico:"ico/mangguo.png",
			url:"http://www.mangocity.com/",
			id:5,
			diaOnoff:false
		},
		{
			name:"团购地图",
			ico:"ico/tuanmap.png",
			url:"http://map.baidu.com/",
			id:6,
			diaOnoff:false
		},
		{
			name:"快递查询",
			ico:"ico/fastsearch.png",
			url:"http://www.kuaidi100.com/",
			id:7,
			diaOnoff:false
		},
		{
			name:"网络硬盘",
			ico:"ico/wangdesk.png",
			url:"http://pan.baidu.com/",
			id:8,
			diaOnoff:false
		}
	],
	appList3:[
		{
			name:"网易云音乐",
			ico:"ico/wangyi.png",
			url:"http://www.xiami.com/",
			id:4,
			diaOnoff:false
		},
		{
			name:"QQ音乐",
			ico:"ico/qqmusic.png",
			url:"https://y.qq.com/",
			id:5,
			diaOnoff:false
		},
		{
			name:"虾米电台",
			ico:"ico/xiami.png",
			url:"http://www.xiami.com/",
			id:6,
			diaOnoff:false
		},
		{
			name:"音乐盒子",
			ico:"ico/musicbox.png",
			url:"http://play.baidu.com/",
			id:7,
			diaOnoff:false
		}
	],
	appList4:[
		{
			name:"优酷",
			ico:"ico/youku.png",
			url:"http://www.youku.com/",
			id:4,
			diaOnoff:false
		},
		{
			name:"爱奇艺",
			ico:"ico/aiqiyi.png",
			url:"http://www.iqiyi.com/",
			id:5,
			diaOnoff:false
		},
		{
			name:"腾讯视频",
			ico:"ico/vadio.png",
			url:"https://v.qq.com/",
			id:5,
			diaOnoff:false
		},
		{
			name:"乐视网",
			ico:"ico/leshi.png",
			url:"http://www.le.com/",
			id:5,
			diaOnoff:false
		}
	],
	appList5:[
		{
			name:"好友近况",
			ico:"ico/friendnear.png",
			url:"",
			id:5,
			diaOnoff:false
		},
		{
			name:"时钟",
			ico:"ico/time.png",
			url:"app/watch/index.html",
			id:5,
			diaOnoff:false
		}
	],
	appList6:[
		{
			name:"日历",
			ico:"img/calendar_thisMenu.png",
			url:"app/Calendar/index.html",
			id:5,
			diaOnoff:false
		},
		{
			name:"便签",
			ico:"ico/bianqian.png",
			url:"",
			id:5,
			diaOnoff:false
		}
	]
	
}
	
