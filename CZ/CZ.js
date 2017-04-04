/**
 * Created by Administrator on 2017/4/2 0002.
 */
$(function(){
    var arr=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg"];
    var abc=$("#nav a");
    abc.on("click",function(){
        $("section").css({display:"none"});
        abc.removeClass("remove");
        var data=$(this).attr("dataid");
        $("section").eq(data).css({display:"block"});
        abc.eq(data).addClass("remove");
    });
    var vb= $("#hezuo li");
    vb.each(function(i){
       vb[i].style.background="url("+arr[i]+")  center no-repeat";
    });
    $("#wx").hover(function(){
        $("#wei").css({opacity:1})
    },function(){
        $("#wei").css({opacity:0})
    });
    $("#what ul li").hover(function(){
        $(this).find("img").css({ transform:"rotateZ(180deg)"})
    },function(){
        $("#what img").css({ transform:"rotateZ(0deg)"});
    });
    $("#ghf ul li").hover(function(){
        $(this).css({background:"#16df1b"});
        $(this).find("div").css({color:"white"});
    },function(){
        $("#ghf ul li").css({background:"none"});
        $("#ghf ul li").find("div").css({color:"black"});
    });
    $(".sm").hover(function(){
        $(this).find(".tree").css({ opacity:"1"});
    },function(){
        $(this).find(".tree").css({opacity: "0"});
    });
})
