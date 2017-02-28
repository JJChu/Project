;(function($){
	//时钟
	var box = document.getElementById("divs");
	var str = "";
	for (var i = 0; i < 60; i++) {
		if(i%5==0){
			str += '<div class="div1" style="transform:rotate('+(i*6)+'deg);height:20px;"></div>';
		}else{
			str += '<div class="div1" style="transform:rotate('+(i*6)+'deg)"></div>';
		}
	}
	str+="<div id='hour'></div><div id='min'></div><div id='sec'></div>"
	box.innerHTML = str;
	var sec = document.getElementById("sec");
	var min = document.getElementById("min");
	var hour = document.getElementById("hour");
	tab();
	setInterval(function(){
		tab()
	},1000)
	function tab(){
		var now = new Date();
		var s = now.getSeconds();
		var m = now.getMinutes();
		var h = now.getHours();
		var ms = now.getMilliseconds();
		sec.style.transform = "rotate("+ (s*6+ms/1000*6) +"deg)";
		min.style.transform = "rotate("+ (m*6+s/60*6) +"deg)";
		hour.style.transform = "rotate("+ (h*30+m/60*30) +"deg)";
	}

})(jQuery);
