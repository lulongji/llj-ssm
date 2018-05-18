$(document).ready(function(){
  //$.cookie("musicList", "", {expires: 365, path: "/", domain: "//music_inc.html", secure: false});
  //$.cookie("musicList","11")
  /*if($.cookie("musicList") == undefined) {
	$.cookie("musicList", "", {expires: 365, path: "/", domain: "//music_inc.html", secure: false});
	$.cookie("musicList","")
  }*/
  
  musicList1 = [];
	$(".nocnt").fadeOut();
	Initialize();
  var cssSelector = {
    jPlayer: "#jquery_jplayer",
    cssSelectorAncestor: ".music-player"
  };
  
  var options = {
    swfPath: "/Jplayer.swf",
	verticalVolume : "height",
	loop : 1,
    supplied: "ogv, m4v, oga, mp3, wav"
  };
  
  /*提取本地音乐列表*/
  musicList1.length == 0 ?  $(".nocnt").show() : $(".nocnt").hide();
  var mymusicList = new jPlayerPlaylist(cssSelector, musicList1, options);
  
  /*添加音乐*/
  var string = "";
  $(document).on("click",".js-music a",function() {
	  $(".g-btmbar").show();
	  if(!jQuery(this).attr("option")) return;
      if ($(this).html() != "") {
          var Class = ""
      } else {
          var Class = "ico-stop"
      }
      if(Class == "") {
		  if($(this).parent().find("a.ico-play").is(".ico-stop")) {
			  $("a.ico-play").removeClass("ico-stop");
			  $(this).parent().find("a.ico-play").removeClass("ico-stop");
		  } else {
			  $("a.ico-play").removeClass("ico-stop");
			  $(this).parent().find("a.ico-play").addClass("ico-stop");
		  }
	  } else {
		  if($(this).is(".ico-stop")) {
			  $("a.ico-play").removeClass("ico-stop");
			  $(this).removeClass(Class);
		  } else {
			  $("a.ico-play").removeClass("ico-stop");
			  $(this).addClass(Class);
		  } 
	  }	
	  var index = 0;
	  string = jQuery(this).attr("option").split("(*)");
	  string[4] = "/music/" + string[4].split("/")[string[4].split("/").length-1].split(".")[0] + ".mp3";
	  for(var i=0;i<musicList1.length;i++) {
	  	if(musicList1[i].id == string[3]) {
			//alert("该歌曲已经添加");
			if(Class == "") {
			  if($(this).parent().find("a.ico-play").is(".ico-stop")) {
				 mymusicList.play(i);
			  } else {
				 mymusicList.pause(i);
			  }
		  } else {
			  if($(this).is(".ico-stop")) {
				  //$("#jquery_jplayer").jPlayer("play");
				  mymusicList.play(i)
			  } else {
				  mymusicList.pause(i);
			  } 
		  }	
			return;
		}
      }
      var newNusic = {
		  title: string[0],
		  artist: string[1],
		  code: string[2],
		  id : string[3],
		  mp3 : string[4]
  	  };
	  musicList1.unshift(newNusic);
	  if(musicList1.length != 0) $(".nocnt").fadeOut();
	  mymusicList.add({
	  	  title: string[0],
		  artist: string[1],
		  code: string[2],
		  id : string[3],
		  mp3 : string[4]
	  });
	  //$.cookie('musicList',JSON.stringify(musicList1),{path: "/"});
	mymusicList.play(0);
  });
  
  /*删除音乐*/
  $(document).on("click",".icn-del",function() {
	if(confirm("您确定要删除 " + $(this).parents("li").find(".col-2 .z-sel").html() + " 吗")) {
		var code = $(this).parents("li").attr("code");
		var n;
		for(var i=0;i<musicList1.length;i++) {
			if (code == musicList1[i].code)  {
				n = i;
				break;
			}
		}
		mymusicList.remove(n);
		musicList1.splice(n,1);
		//$.cookie('musicList',JSON.stringify(musicList1),{path: "/"});
		if(musicList1.length == 0) {
			Initialize();
			$(".nocnt").fadeIn();
		}
	}
  });
  
  /*音乐清空*/
  $(".js-clear").on("click",function() {
	  musicList1 = [];
	  mymusicList.remove();
	  $(".nocnt").fadeIn();
	  //$.cookie('musicList',null,{path: "/"});
	  Initialize();
  });
  
  /*自定义循环模式*/
  var st = 500;
  $(".playType a").on("click",function() {
	var i = Number($(this).attr("type"));
	var Class = "";
	switch(i) {
		case 0 :  {
			Class = "icn-loopHover";
			break;
		}
		case 1 :  {
			Class = "icn-shuffleHover";
			break;
		}
		default : {Class = "icn-oneHover";}
	}
	$(".playType").attr("type",i);
	$(".playType a").removeClass("icn-loopHover icn-shuffleHover icn-oneHover").eq(i).addClass(Class);
  });
  
  /*关闭打开歌词歌曲列表*/
  $(".js-close").on("click",function() {
	$(".listmusic").fadeOut(st);
  });
  $(".js-open").on("click",function() {
	$(".listmusic").fadeToggle(st);
	$(".jp-playlist").jScrollPane();
  });
  
  /*声音控制*/
  var time;
  $(".js-vol").on({
	  mousemove : function() {
		  $(this).addClass("icn-volHover");
		  $(".m-vol").show();
	  },
	  mouseleave : function() {
		 time = setTimeout(function() {
			$(".m-vol").fadeOut(st,function() {
				$(".js-vol").removeClass("icn-volHover");	
			})
		  },st);
	  }
  });
  $(".m-vol").on({
	  mousemove : function() {
		  $(".js-vol").addClass("icn-volHover");
		  clearTimeout(time)
	  },
	  mouseleave : function() {
		  setTimeout(function() {
			$(".m-vol").fadeOut(st,function() {
				$(".js-vol").removeClass("icn-volHover");	
			})
		  },st);
	  }
  });
  
  /*歌词帮助*/
  var time1;
  $(".ico-ask").on({
	  mousemove : function() {
		 $(this).addClass("ico-askHover");
		 $(".upload").show(); 
	  },
	  mouseleave : function() {
		  time1 = setTimeout(function() {
			$(".upload").fadeOut(st,function() {
				$(".ico-ask").removeClass("ico-askHover");	
			})   
		  },st)
	  }
  });
  $(".upload").on({
	  mousemove : function() {
		 $(this).addClass("ico-askHover");
		 clearTimeout(time1)
	  },
	  mouseleave : function() {
		  setTimeout(function() {
			$(".upload").fadeOut(st,function() {
				$(".ico-ask").removeClass("ico-askHover");	
			})   
		  },st)
	  }
  });
  
  /*播放器下拉隐藏*/
  $(".btnLock").on("click",function() {
	$(".listmusic").fadeOut(st,function() {
		var top = Number($(".m-playbar").css("top").split("px")[0]);
		if(top < -6) {
			$(".m-playbar").animate({top:-6},st);
//			$("#divShowHidden").removeClass("btn");
			$("#divShowHidden").addClass("btnhiden");
		} else {
			$(".m-playbar").animate({top:-53},st);
			$("#divShowHidden").removeClass("btnhiden");
			$("#divShowHidden").addClass("btn");
		}
		
	})  
  });
  
  /*鼠标移入显示操作项*/
  $/*(document).on("mouseenter",".js-list li",function() {$(this).find(".icns").show();})
  $(document).on("mouseleave",".js-list li",function() {$(this).find(".icns").hide();})*/
  
  /*歌曲列表为空时 初始化播放器*/
  function Initialize() {
	 $(".playlistNum").html(0);
	 $(".name").html("当前没有歌曲");
	 //$(".jp-playlist-current").html("");
  }
  
});;