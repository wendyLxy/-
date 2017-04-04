$(function() {
	//banner图轮播效果
	var pic = $(".banner-pic").find("li");
	var dian = $(".banner-dian").find("li");
	var len = pic.length;
	var index = 0;
	move();
	var timer = setInterval(startmove, 2500);

	function startmove() {
		index++;
		if(index == len) {
			index = 0;
		}
		move();
	}

	function move() {
		pic.eq(index).siblings().fadeOut();
		pic.eq(index).fadeIn();
		dian.eq(index).siblings().removeClass("select");
		dian.eq(index).addClass("select");
	}
	$("#banner .banner-dian li").mouseover(function() {
		index = $(this).index();
		clearInterval(timer);
		move();
	})
	//nav二级菜单
	$("#header .header-nav ul").eq(0).find("li").eq(3).hover(function() {
		$("#header .header-nav ul").eq(1).show();
	}, function() {
		$("#header .header-nav ul").eq(1).hide();
	})

	//全部商品
	$("#header .header-nav .dls").find("dl").hover(function() {
		var index = $(this).index();
		var $top = $(this).position().top;
		$(this).find("dt").show().css("top", $top);
		$(this).siblings().find("dt").hide().css("top", 0);

	}, function() {
		$(this).find("dt").hide().css("top", 0);
	})
	//为您推荐 划过
	$("#con .con-geiyour-pic a figure").hover(function() {
		$(this).siblings().find("img").css("opacity", 1);
		$(this).find("img").css("opacity", .6);
		$(this).siblings().find("h6").css("color", "#222");
		$(this).find("h6").css("color", "#EC0971");
	}, function() {
		$(this).find("img").css("opacity", 1);
		$(this).find("h6").css("color", "#222")
	})
	//
	$(".con-today .con-today-block .con-today-fig").find("a").hover(function() {
		$(this).find("h5").css("color", "#EC0971");
	}, function() {
		$(this).find("h5").css("color", "#222");
	})

	$(".aas").hover(function() {
		$(this).find(".aas-bbd").show();
	}, function() {
		$(this).find(".aas-bbd").hide();
	})

	//滚动事件   触发两边的

	$(window).scroll(function() {
		var sTop = $(this).scrollTop();
		var hTop = $("#header .header-nav ul").offset().top;
		if(sTop >= hTop) {
			$("#gundong-left").fadeIn();
			$("#gundong-right").fadeIn();
		} else {
			$("#gundong-left").fadeOut();
			$("#gundong-right").fadeOut();
		}
	})
	$(".hua-kefu").hover(function() {
		$(".huachulai").stop().fadeIn().animate({ "right": "54px" }, 300);
	}, function() {
		$(".huachulai").fadeOut().animate({ "right": "90px" }, 300);
	})

	$(".hua-weixin").hover(function() {
		$(".huachulai2").stop().fadeIn().animate({ "right": "54px" }, 300);
	}, function() {
		$(".huachulai2").fadeOut().animate({ "right": "90px" }, 300);
	})

	$(".gundong-right-top").click(function() {
		$(window).scrollTop(0);
	})

	//nav数据接收
	$.ajax({
		type: "get",
		url: "json/index-nav.json",
		async: true,
		success: function(data) {
			var $span = "<a href='#'>" + data['nav']['title'] + "</a>"
			$(".dls-one span").html($span);
			var sum = data['nav']['subtitle'];
			var $p = "";
			$.each(sum, function(i, val) {
				//var $p = "<a href='#'>"+val+"</a>" 如果这样去定义每遍历一次那么就会重新生成一个$p，这样的话到最后就只有一个$p，达不到预期的效果
				$p += "<a href='#'>" + val + "</a>"
				$(".dls-one p").html($p);
			});
		}
	});
	
	
	
	
	
	
	//展开和收起
	$(".product-zs").click(function(){
		console.log("aaa");
		var hei = $(".List-one").height();
		$(".List-one").find("span").slideToggle();
		if(hei > 100){
			$(".product-zs").text("展开");
		}else{
			$(".product-zs").text("收起");
		}
	})
	
	//选项卡
	$(".abbs li").eq(0).find("span").css("background-position-y","-80px");
	$(".mia").eq(0).show();
	$(".abbs li").click(function(){
		var index = $(this).index();
		$(this).find("span").css("background-position-y","-80px");
		$(this).siblings().find("span").css("background-position-y","0");
		$(".mia").eq(index).show();
		$(".mia").eq(index).siblings().hide();
	})
	
	$(".shopList-middle span").click(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	
	
	
	
	
	
	
	
})