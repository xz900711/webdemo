var threadTitle='';
var threadResource=1;
var threadInterest;
var sortLayerFlag=false;
var insertFlag=false;
var insertCurrentId;
var videoUpload=false;
var imgUpload=false;
var canClick=true;
var leaveAlert=true;
//===========================================================//
//=                  页面滚动模块固定                       =//
//===========================================================//
var rightTop=$(".right").offset().top;
var addModelBoxTop=$(".add-model-box").offset().top;
function domFixed(){
	if($(window).scrollTop()>rightTop){
		$('#container').find('.right-area').addClass('right-fixed');
	}
	else{
		$('#container').find('.right-area').removeClass('right-fixed');
	}
	if($(window).scrollTop()>addModelBoxTop){
		$('.add-model').addClass('add-model-fixed');
	}
	else{
		$('.add-model').removeClass('add-model-fixed');
	}
}
//===========================================================//
//=                 缩略图区域隐藏/显示                     =//
//===========================================================//
function thumbShow(){
	if($(".thumbnail-box").find('li').length<=0){
		$(".thumbnail").slideUp(200);
	}
	else{
		$(".thumbnail").slideDown(200);
	}
}
//===========================================================//
//=             鼠标经过显示文字模块缩略图内容              =//
//===========================================================//
function txtShow(thisDom){
	if(sortLayerFlag==true){
		var top=thisDom.offset().top;
		var left=thisDom.offset().left;
		var layerWidth=$(".sort-layer").width();
		var txtWidth=thisDom.parents(".sort-layer").find(".txt-show").width();
		var text=thisDom.find('input').val();
		var len;
		winScrollTop=parseInt($(document).scrollTop());
		if(left>layerWidth/2){
			thisDom.parents(".sort-layer").find(".txt-show").css({
				top: top-winScrollTop+8+"px",
				left: left-80+'px'
			});
			thisDom.parents(".sort-layer").find(".txt-show").find('span').css({
				'text-align':"right"
			});
		}
		else{
			thisDom.parents(".sort-layer").find(".txt-show").css({
				top: top-winScrollTop+8+"px",
				left: left+'px'
			});
			thisDom.parents(".sort-layer").find(".txt-show").find('span').css({
				'text-align':"left"
			});
		}

		thisDom.parents(".sort-layer").find(".txt-show").find('p').text(text);
		thisDom.parents(".sort-layer").find(".txt-show").css("display","inline-block");
	}
	else{
		var top=thisDom.position().top;
		var listHeight=parseInt($(".thumbnail").find('ol').height());
		var scrollTops=parseInt($(".thumbnail").find('.slimScrollBar').css('top'))/parseInt($(".thumbnail-box").height())*listHeight;
		var left=thisDom.offset().left;
		var layerWidth=$(".thumbnail").offset().left;
		var txtWidth=thisDom.parents("#container").find(".txt-show").width();
		var thisDomId=(thisDom.attr("id")).replace(/[^0-9]/ig,"");
		var text=$('#mainSort'+thisDomId).find('textarea').val();
		if(left>layerWidth+150){
			thisDom.parents("#container").find(".txt-show").css({
				top: top-scrollTops+184+"px",
				right:'20px',
				left:'auto',
				'line-height':'18px'
			});
			thisDom.parents("#container").find(".txt-show").find('span').css({
				'text-align':"right"
			});
		}
		else{
			thisDom.parents("#container").find(".txt-show").css({
				top: top-scrollTops+184+"px",
				left: '20px',
				right:'auto',
				'line-height':'18px'
			});
			thisDom.parents("#container").find(".txt-show").find('span').css({
				'text-align':"left"
			});
		}

		thisDom.parents("#container").find(".txt-show").find('p').text(text);
		thisDom.parents("#container").find(".txt-show").css("display","inline-block");		
	}
}
//===========================================================//
//=                   多选排序方法                          =//
//===========================================================//
var selectedHtml='';
var selectedArray;//已选中的多个对象内容数组
var selectedDataSortArray;//已选中的多个对象排序属性数组
var selectedIdArray;//已选中的多个对象ID数组
var thisSelected;
var multiSortFlag=false;
var insertKeyDom;//定义拖拽对象安置锚点
function getSelectedHtml(){//获取已选择对象的html
	if(multiSortFlag==true){
		selectedHtml='';
		selectedArray=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		var count=$(".ui-selected").length-1;
		for(var i=0;i<count;i++){
			selectedHtml=selectedHtml+$(".ui-selected:eq("+i+")").html();
			selectedArray[0].push($(".ui-selected:eq("+i+")").html());
			selectedArray[1].push($(".ui-selected:eq("+i+")").attr('data-sort'));
			selectedArray[2].push($(".ui-selected:eq("+i+")").attr('id'));
			selectedArray[3].push($(".ui-selected:eq("+i+")").attr('type'));
			selectedArray[4].push($(".ui-selected:eq("+i+")").attr('hash'));
			selectedArray[5].push($(".ui-selected:eq("+i+")").attr('mime'));
			selectedArray[6].push($(".ui-selected:eq("+i+")").attr('url'));
			selectedArray[7].push($(".ui-selected:eq("+i+")").attr('imgUrl'));
			selectedArray[8].push($(".ui-selected:eq("+i+")").attr('title'));
			selectedArray[9].push($(".ui-selected:eq("+i+")").attr('size'));
			selectedArray[10].push($(".ui-selected:eq("+i+")").attr('fId'));
			selectedArray[11].push($(".ui-selected:eq("+i+")").attr('fWidth'));
			selectedArray[12].push($(".ui-selected:eq("+i+")").attr('fHeight'));
			selectedArray[13].push($(".ui-selected:eq("+i+")").attr('time'));
			selectedArray[14].push($(".ui-selected:eq("+i+")").attr('mediaId'));
			selectedArray[15].push($(".ui-selected:eq("+i+")").attr('poster'));
		}
		selectedArray[0].reverse();
		selectedArray[1].reverse();
		selectedArray[2].reverse();
		selectedArray[3].reverse();
		selectedArray[4].reverse();
		selectedArray[5].reverse();
		selectedArray[6].reverse();
		selectedArray[7].reverse();
		selectedArray[8].reverse();
		selectedArray[9].reverse();
		selectedArray[10].reverse();
		selectedArray[11].reverse();
		selectedArray[12].reverse();
		selectedArray[13].reverse();
		selectedArray[14].reverse();
		selectedArray[15].reverse();
	}
}
function clickToSelect(){//单击多选
	var selected='ui-selected';
	var thisAttr=thisSelected.attr("class");
	if(thisAttr.indexOf(selected)<0){
		thisSelected.addClass('ui-selected');
	}
	else{
		if($(".ui-selected").length>1){
			$(".sort-layer-list").find('li').removeClass('ui-selected');
			thisSelected.addClass('ui-selected');
		}
		else{
			thisSelected.removeClass('ui-selected')
		}
	}
	multiDeleteSelect();
	$(".ui-selectee").find('span').css('opacity','0');
	$(".ui-selected").find('span').css('opacity','1');

}
function multiStart(){//拖拽开始的方法
	if(multiSortFlag==true){
		insertKeyDom=$(".ui-sortable-placeholder").prev("li");
	}
}
function multiSort(){//拖拽过程中的方法
	$(".ui-selected").find('span').css('opacity','0');
	if(multiSortFlag==true){
		var helperWidth=$(".opacity").length*130;
		if(helperWidth>650){
			helperWidth=650;
		}
		$(".ui-sortable-helper").css("width",helperWidth+'px');
		getSelectedHtml();
		$(".ui-selected").not('.ui-sortable-helper').addClass('opacity');
		$(".ui-sortable-helper").html(selectedHtml);
	}
	else{
		$(".ui-sortable-helper").css("width",'120px');
	}
}
function multiStop(){//拖拽结束的方法
	if(multiSortFlag==true){	
		for(var i=0;i<selectedArray[0].length;i++){
			if(insertKeyDom.length>0){
				insertKeyDom.after('<li class="ui-selectee ui-sortable-handle" id="'+selectedArray[2][i]+'" data-sort="'+selectedArray[1][i]+'" type="'+selectedArray[3][i]+'" hash="'+selectedArray[4][i]+'" mime="'+selectedArray[5][i]+'" url="'+selectedArray[6][i]+'" imgUrl="'+selectedArray[7][i]+'" title="'+selectedArray[8][i]+'" size="'+selectedArray[9][i]+'" fId="'+selectedArray[10][i]+'" fWidth="'+selectedArray[11][i]+'" fHeight="'+selectedArray[12][i]+'" time="'+selectedArray[13][i]+'" mediaid="'+selectedArray[14][i]+'" poster="'+selectedArray[15][i]+'">'+selectedArray[0][i]+'</li>');
			}
			else{
				$(".sort-layer-list").prepend('<li class="ui-selectee ui-sortable-handle" id="'+selectedArray[2][i]+'" data-sort="'+selectedArray[1][i]+'" type="'+selectedArray[3][i]+'" hash="'+selectedArray[4][i]+'"  mime="'+selectedArray[5][i]+'" url="'+selectedArray[6][i]+'" imgUrl="'+selectedArray[7][i]+'" title="'+selectedArray[8][i]+'" size="'+selectedArray[9][i]+'" fId="'+selectedArray[10][i]+'" fWidth="'+selectedArray[11][i]+'" fHeight="'+selectedArray[12][i]+'" time="'+selectedArray[13][i]+'" mediaid="'+selectedArray[14][i]+'" poster="'+selectedArray[15][i]+'">'+selectedArray[0][i]+'</li>')
			}
		}
		$(".opacity").remove();
	}
	else{
		$(".ui-selected").removeClass('opacity');
	}
	emReorder();//序号重新排序
}
//===========================================================//
//=                   模块重新排序                          =//
//===========================================================//
function emReorder(){//缩略图标号排序
	for(var i=1;i<=$('.sort-layer-list').find('li').length;i++){
		var j=i-1;
		$('#container').find('.emReorder:eq('+j+')').text(i);
		$('.sort-layer-list').find('.emReorder:eq('+j+')').text(i);
		$('.thumbnail-box ol').find('.emReorder:eq('+j+')').text(i);
	}
}
function getTxt(){//获取模块文本内容
	for(var i=0;i<$(".thread-content-list").find('li').length;i++){
		$(".sort-layer-list").find('li:eq('+i+')').find('input').val($('.thread-content-list').find('li:eq('+i+') textarea').val());
	}
}
function getImgHtml(){
	var boxHeight;

	if(sortLayerFlag==true){
		if(width>=728){
			boxHeight=728*height/width;
		}
		else{
			boxHeight=height;
		}
		var html='<li id="mainSort'+id+'" data-sort="'+dataSort+'" type="'+type+'"  hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'" mediaId="'+mediaId+'" poster="'+poster+'">'+
					'<div class="mainSortBox">'+
						'<a href="javascript:;" class="remove thread-model-remove">×</a>'+
						'<h3 class="sort-handle">'+
							'<span><i></i><i></i><i></i></span>'+
						'</h3>'+
						'<div class="content-box" style="height:'+boxHeight+'px;overflow:hidden">'+
							'<img src="'+domain+hash+'?imageView2/2/w/728/q/100|watermark/1/image/aHR0cDovLzd4c2N3NS5jb20wLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/gravity/South/dy/5">'+
						'</div>'+
						'<textarea placeholder="在此添加上方图片的描述，描述不超过500字。" class="description-input">'+txt+'</textarea>'+
						'<div class="char-limit"><em>还可以输入</em> <i></i> <b>字</b></div>'+
					'</div>'+
					'<a href="javascript:;" class="insert-model-btn" title="插入模块">+</a>'+
					'<span class="add-model" style="height:0px;margin-top:0px;margin-bottom:10px">'+
						'<a href="javascript:;" class="close-add-btn-box">×</a>'+
						'<div class="add-model-box">'+
							'<div class="intro">'+
								'<h5>点击右侧按钮，添加相对应的元素模块</h5>'+
								'<h6>还不太会用？看看<a href="/html/pub-thread-course.html" target="_blank">发帖教程</a></h6>'+
							'</div>'+
							'<div class="btn-box">'+
								'<a href="javascript:;" class="add-txt-btn" id="add-txt'+id+'"><i></i>添加文字</a>'+
								'<a href="javascript:;" class="add-img-btn" id="add-img'+id+'"><i></i>添加图片</a>'+
								'<a href="javascript:;" class="add-video-btn" id="add-video'+id+'"><i></i>添加视频</a>'+
							'</div>'+
						'</div>'+
					'</span>'+
				 '</li>';
		if(insertFlag==false){
			$(".thread-content-list").append(html);
		}
		else{
			$("#mainSort"+insertCurrentId).after(html);
		}
	}
	else{
		var html='<li id="sort'+id+'" data-sort="'+dataSort+'" type="'+type+'" hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'" class="ui-selectee ui-sortable-handle">'+
				 	'<div class="sort-img-box">'+
					 	'<em class="emReorder"></em>'+
					 	'<span><i></i></span>'+
					 	'<input type="hidden" value="" class="txt">'+
					 	'<img src="'+domain+hash+'?imageMogr2/auto-orient/thumbnail/!120x80r/gravity/Center/crop/120x80/quality/100">'+
				 	'</div>'+
				 '</li>';
		if(insertFlag==false){
			$(".sort-layer-list").append(html);
		}
		else{
			$("#sort"+insertCurrentId).after(html);
		}
		emReorder();
	}
}
function getVideoHtml(){
	if(sortLayerFlag==true){
		var html='<li id="mainSort'+id+'" data-sort="'+dataSort+'" type="'+type+'"  hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'">'+
					'<div class="mainSortBox">'+
						'<a href="javascript:;" class="remove thread-model-remove">×</a>'+
						'<h3 class="sort-handle">'+
							'<span><i></i><i></i><i></i></span>'+
						'</h3>'+
						'<div class="content-box">';
						if(title!=''){
					html+=	'<img src="images/transcode.png">';
						}
						else{
					html+='<video src="'+vdomain+hash+'" controls="controls" width="728" height="410" poster="'+poster+'"></video>';		
						}
				html+=	'</div>'+
						'<textarea placeholder="在此添加上方视频的描述，描述不超过500字。" class="description-input">'+txt+'</textarea>'+
						'<div class="char-limit"><em>还可以输入</em> <i></i> <b>字</b></div>'+
					'</div>'+
					'<a href="javascript:;" class="insert-model-btn" title="插入模块">+</a>'+
					'<span class="add-model" style="height:0px;margin-top:0px;margin-bottom:10px">'+
						'<a href="javascript:;" class="close-add-btn-box">×</a>'+
						'<div class="add-model-box">'+
							'<div class="intro">'+
								'<h5>点击右侧按钮，添加相对应的元素模块</h5>'+
								'<h6>还不太会用？看看<a href="/html/pub-thread-course.html" target="_blank">发帖教程</a></h6>'+
							'</div>'+
							'<div class="btn-box">'+
								'<a href="javascript:;" class="add-txt-btn" id="add-txt'+id+'"><i></i>添加文字</a>'+
								'<a href="javascript:;" class="add-img-btn" id="add-img'+id+'"><i></i>添加图片</a>'+
								'<a href="javascript:;" class="add-video-btn" id="add-video'+id+'"><i></i>添加视频</a>'+
							'</div>'+
						'</div>'+
					'</span>'+
				 '</li>';
		if(insertFlag==false){
			$(".thread-content-list").append(html);
		}
		else{
			$("#mainSort"+insertCurrentId).after(html);
		}
	}
	else{
		var html='<li id="sort'+id+'" data-sort="'+dataSort+'" type="'+type+'" hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'" class="ui-selectee ui-sortable-handle">'+
				 	'<div class="sort-img-box">'+
				 		'<i class="play"></i><div class="play-box"></div>'+
					 	'<em class="emReorder"></em>'+
					 	'<span><i></i></span>'+
					 	'<input type="hidden" value="" class="txt">';
						if(title!=''){
					html+=	'<img src="images/transcode-small.png" height="80" width="120">';
						}
						else{
					html+='<img src="'+poster+'?imageMogr2/auto-orient/thumbnail/!120x80/gravity/Center/crop/120x80/quality/100" height="80" width="120">';		
						}
			  html+='</div>'+
				 '</li>';
		if(insertFlag==false){
			$(".sort-layer-list").append(html);
		}
		else{
			$("#sort"+insertCurrentId).after(html);
		}
		emReorder();
	}
}
function getOutsideVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,youkuId,mediaId){
	if(sortLayerFlag==true){
		var html='<li id="mainSort'+id+'" data-sort="'+dataSort+'" type="'+type+'"  hash="'+hash+'" mime="'+mime+'" url="'+url+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'">'+
					'<div class="mainSortBox">'+
						'<a href="javascript:;" class="remove thread-model-remove">×</a>'+
						'<h3 class="sort-handle">'+
							'<span><i></i><i></i><i></i></span>'+
						'</h3>'+
						'<div class="content-box">'+
							'<iframe height=408 width=728 src="'+url+'" frameborder=0 allowfullscreen></iframe>'+
						'</div>'+
						'<textarea placeholder="在此添加上方视频的描述，描述不超过500字。" class="description-input">'+txt+'</textarea>'+
						'<div class="char-limit"><em>还可以输入</em> <i></i> <b>字</b></div>'+
					'</div>'+
					'<a href="javascript:;" class="insert-model-btn" title="插入模块">+</a>'+
					'<span class="add-model" style="height:0px;margin-top:0px;margin-bottom:10px">'+
						'<a href="javascript:;" class="close-add-btn-box">×</a>'+
						'<div class="add-model-box">'+
							'<div class="intro">'+
								'<h5>点击右侧按钮，添加相对应的元素模块</h5>'+
								'<h6>还不太会用？看看<a href="/html/pub-thread-course.html" target="_blank">发帖教程</a></h6>'+
							'</div>'+
							'<div class="btn-box">'+
								'<a href="javascript:;" class="add-txt-btn" id="add-txt'+id+'"><i></i>添加文字</a>'+
								'<a href="javascript:;" class="add-img-btn" id="add-img'+id+'"><i></i>添加图片</a>'+
								'<a href="javascript:;" class="add-video-btn" id="add-video'+id+'"><i></i>添加视频</a>'+
							'</div>'+
						'</div>'+
					'</span>'+
				 '</li>';
		if(insertFlag==false){
			$(".thread-content-list").append(html);
		}
		else{
			$("#mainSort"+insertCurrentId).after(html);
		}
	}
	else{
		var html='<li id="sort'+id+'" data-sort="'+dataSort+'" type="'+type+'" hash="'+hash+'" mime="'+mime+'"  url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'" class="ui-selectee ui-sortable-handle">'+
				 	'<div class="sort-img-box">'+
				 		'<i class="play"></i><div class="play-box"></div>'+
					 	'<em class="emReorder"></em>'+
					 	'<span><i></i></span>'+
					 	'<input type="hidden" value="" class="txt">'+
					 	'<img src="'+imgUrl+'" height="80" width="120">'+
				 	'</div>'+
				 '</li>';
		if(insertFlag==false){
			$(".sort-layer-list").append(html);
		}
		else{
			$("#sort"+insertCurrentId).after(html);
		}
		emReorder();
	}
}
function getTxtHtml(){
	if(sortLayerFlag==true){
		var html='<li id="mainSort'+id+'" data-sort="'+dataSort+'" type="'+type+'" hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'" >'+
					'<div class="mainSortBox">'+
						'<a href="javascript:;" class="remove thread-model-remove">×</a>'+
						'<h3 class="sort-handle">'+
							'<span><i></i><i></i><i></i></span>'+
						'</h3>'+
						'<textarea placeholder="在此输入正文内容。" class="txt-input">'+txt+'</textarea>'+
						'<div class="char-limit"><em>还可以输入</em> <i>5000</i> <b>字</b></div>'+
					'</div>'+
					'<a href="javascript:;" class="insert-model-btn" title="插入模块">+</a>'+
					'<span class="add-model" style="height:0px;margin-top:0px;margin-bottom:10px">'+
						'<a href="javascript:;" class="close-add-btn-box">×</a>'+
						'<div class="add-model-box">'+
							'<div class="intro">'+
								'<h5>点击右侧按钮，添加相对应的元素模块</h5>'+
								'<h6>还不太会用？看看<a href="/html/pub-thread-course.html" target="_blank">发帖教程</a></h6>'+
							'</div>'+
							'<div class="btn-box">'+
								'<a href="javascript:;" class="add-txt-btn" id="add-txt'+id+'"><i></i>添加文字</a>'+
								'<a href="javascript:;" class="add-img-btn" id="add-img'+id+'"><i></i>添加图片</a>'+
								'<a href="javascript:;" class="add-video-btn" id="add-video'+id+'"><i></i>添加视频</a>'+
							'</div>'+
						'</div>'+
					'</span>'+
				 '</li>';
		if(insertFlag==false){
			$(".thread-content-list").append(html);
		}
		else{
			$("#mainSort"+insertCurrentId).after(html);
		}
	}
	else{
		var html='<li id="sort'+id+'" data-sort="'+dataSort+'" type="'+type+'" hash="'+hash+'" mime="'+mime+'" url="'+url+'" imgUrl="'+imgUrl+'" title="'+title+'" size="'+size+'" fId="'+fId+'" fWidth="'+width+'" fHeight="'+height+'" time="'+time+'"  mediaId="'+mediaId+'" poster="'+poster+'" class="ui-selectee ui-sortable-handle">'+
				 	'<div class="sort-img-box">'+
					 	'<em class="emReorder"></em>'+
					 	'<span><i></i></span>'+
					 	'<input type="hidden" value="" class="txt">'+
					 	'<img src="images/pubThread-txt.png" title="">'+
				 	'</div>'+
				 '</li>';
		if(insertFlag==false){
			$(".sort-layer-list").append(html);
		}
		else{
			$("#sort"+insertCurrentId).after(html);
		}
		emReorder();
	}
}
// 缩略图尺寸
function thumbSize(){
	var thumbHeight=$(".thumbnail-box").find('ol').height();
	var thumbnailHeight=$(window).height()-540;
	if(thumbnailHeight<223){
		thumbnailHeight=223;
	}
	$('.thumbnail-box').slimScroll({
        height: thumbnailHeight+'px',
	    size: '5px',
	    color:'#999',
    });
}
function getThumbHtml(type,id,domain,hash,title,j,imgUrl){
	if(type=='img'){
		if(insertFlag==true){
			$(".thumbnail-box ol").find("#thumb"+insertCurrentId).after('<li id="thumb'+id+'" type="'+type+'" title="'+title+'"><a href="javascript:;"><em class="emReorder">'+j+'</em><img src="'+domain+hash+'?imageMogr2/auto-orient/thumbnail/!124x82r/gravity/Center/crop/124x82/quality/100"></a></li>');			
		}
		else{
			$(".thumbnail-box ol").append('<li id="thumb'+id+'" type="'+type+'" title="'+title+'"><a href="javascript:;"><em class="emReorder">'+j+'</em><img src="'+domain+hash+'?imageMogr2/auto-orient/thumbnail/!124x82r/gravity/Center/crop/124x82/quality/100"></a></li>');
		}
	}
	else if(type=='txt'){
		if(insertFlag==true){
			$(".thumbnail-box ol").find("#thumb"+insertCurrentId).after('<li id="thumb'+id+'" type="'+type+'" ><a href="javascript:;"><em class="emReorder">'+j+'</em><img src="images/pubThread-txt.png"></a></li>');
		}
		else{
			$(".thumbnail-box ol").append('<li id="thumb'+id+'" type="'+type+'"><a href="javascript:;"><em class="emReorder">'+j+'</em><img src="images/pubThread-txt.png"></a></li>');
		}	
	}
	else if(type=='video'){
   var html='<li id="thumb'+id+'" type="'+type+'" title="'+title+'">'+
				'<a href="javascript:;">'+
				'<i class="play"></i><div class="play-box"></div>'+
				'<em class="emReorder">'+j+'</em>';
				if(title!=''){
		html+= '<img src="images/transcode-small.png" style="width:124px;height:82px"></a>';
				}else{
		html+= '<img src="'+poster+'?imageMogr2/auto-orient/thumbnail/!124x82r/gravity/Center/crop/124x82/quality/100"  style="width:124px;height:82px"></a>';			
				}
		html+='</li>';
		if(insertFlag==true){
			$(".thumbnail-box ol").find("#thumb"+insertCurrentId).after(html);
		}
		else{
			$(".thumbnail-box ol").append(html);
		}
	}else if(type=='outsideVideo'){
		if(insertFlag==true){
			$(".thumbnail-box ol").find("#thumb"+insertCurrentId).after('<li id="thumb'+id+'" type="'+type+'" title="'+title+'"><a href="javascript:;"><i class="play"></i><div class="play-box"></div><em class="emReorder">'+j+'</em><img src="'+imgUrl+'" height="82" width="124"></a></li>');
		}
		else{
			$(".thumbnail-box ol").append('<li id="thumb'+id+'" type="'+type+'" title="'+title+'"><a href="javascript:;"><i class="play"></i><div class="play-box"></div><em class="emReorder">'+j+'</em><img src="'+imgUrl+'" height="82" width="124"></a></li>');
		}
	}
	thumbSize();
}
function sortUpdate(thisLength,thisValue){
	var listLength=$('.sort-layer-list').find('li').length;
	$(".thumbnail-box ol").html('');
	var thisList;
	if(sortLayerFlag==true){
		$('.thread-content-list').html('');
		thisList=$('.sort-layer-list');
	}
	else{
		$('.sort-layer-list').html('');
		thisList=$('.thread-content-list');
	}
	for(var i=0;i<listLength;i++){
		var j=i+1;
		type=thisList.find('li:eq('+i+')').attr('type');
		id=(thisList.find('li:eq('+i+')').attr('id')).replace(/[^0-9]/ig,"");
		dataSort=thisList.find('li:eq('+i+')').attr('data-sort');
		txt=thisList.find('li:eq('+i+') input').val();
		hash=thisList.find('li:eq('+i+')').attr('hash');
		mime=thisList.find('li:eq('+i+')').attr('mime');
		url=thisList.find('li:eq('+i+')').attr('url');
		imgUrl=thisList.find('li:eq('+i+')').attr('imgUrl');
		title=thisList.find('li:eq('+i+')').attr('title');
		size=thisList.find('li:eq('+i+')').attr('size');
		fId=thisList.find('li:eq('+i+')').attr('fId');
		width=thisList.find('li:eq('+i+')').attr('fWidth');
		height=thisList.find('li:eq('+i+')').attr('fHeight');
		time=thisList.find('li:eq('+i+')').attr('time');
		mediaId=thisList.find('li:eq('+i+')').attr('mediaid');
		poster=thisList.find('li:eq('+i+')').attr('poster');
		if(type=='img'){
			insertFlag=false;
			getImgHtml(id,dataSort,txt,type,hash,mime,url,imgUrl,title,size,fId,width,height,time,mediaId,poster);
			thisDom=$(".thread-content-list").find('li:eq('+i+')').find('textarea');
			mediaTxtInput();
		}
		else if(type=='txt'){
			insertFlag=false;
			getTxtHtml(id,dataSort,txt,type,hash,mime,url,imgUrl,title,size,fId,width,height,time,mediaId,poster);
			thisDom=$(".thread-content-list").find('li:eq('+i+')').find('textarea');
			txtModelInput();
		}
		else if(type=='video'){
			insertFlag=false;
			getVideoHtml(id,dataSort,txt,type,hash,mime,url,imgUrl,title,size,fId,width,height,time,mediaId,poster);
			thisDom=$(".thread-content-list").find('li:eq('+i+')').find('textarea');
			mediaTxtInput();			
		}
		else{
			insertFlag=false;
			youkuId=thisList.find('li:eq('+i+')').attr('url');
			var start=youkuId.indexOf("id_")+3;
			var end=youkuId.indexOf("==");
			if(end<0){
				end=youkuId.indexOf(".html");
			}
			youkuId=youkuId.substring(start,end);
			getOutsideVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,youkuId,mediaId,poster);
			thisDom=$(".thread-content-list").find('li:eq('+i+')').find('textarea');
			mediaTxtInput();				
		}
		getThumbHtml(type,id,domain,hash,title,j,imgUrl);
	}
	$(".txt-show").css("opacity","1");
}
//===========================================================//
//=                   帖子标题输入                          =//
//===========================================================//
var titleFlag=false;
function threadTitleInput(){
	charCount();
	var charLength=Math.round(thisLength/2);
	if(thisLength<12 && thisLength!=0){
		thisDom.parent(".title-box").find('.char-limit em').text('还需要至少输入');
		var must=6-charLength;
		if(must==0){
			must=1;
		}
		thisDom.parent(".title-box").find('.char-limit i').text(must);
		thisDom.parent(".title-box").find('.char-limit i').css('color','#ff6600');
		thisDom.parent(".title-box").find('.char-limit b').text('字');	
		$('.thread-title').addClass('error-input');
		titleFlag=false;
	}
	else if(thisLength>60  && thisLength!=0){
		thisDom.parent(".title-box").find('.char-limit em').text('已超出');
		thisDom.parent(".title-box").find('.char-limit i').text(Math.abs(30-charLength));
		thisDom.parent(".title-box").find('.char-limit i').css('color','#e24343');	
		thisDom.parent(".title-box").find('.char-limit b').text('字');
		$('.thread-title').addClass('error-input');		
	}
	else if(thisLength==0){
		thisDom.parent(".title-box").find('.char-limit em').text('请输入帖子标题');
		thisDom.parent(".title-box").find('.char-limit i').text('');
		thisDom.parent(".title-box").find('.char-limit b').text('');
		$('.thread-title').removeClass('error-input');		
	}
	else{
		thisDom.parent(".title-box").find('.char-limit em').text('还可以输入');
		thisDom.parent(".title-box").find('.char-limit i').text(30-charLength);
		thisDom.parent(".title-box").find('.char-limit i').css('color','#2175d0');
		thisDom.parent(".title-box").find('.char-limit b').text('字');	
		$('.thread-title').removeClass('error-input');	
		titleFlag=true;
	}
}
//===========================================================//
//=                   帖子来源选择                          =//
//===========================================================//
function resourceChoice(){
	$('.resource-btn').removeClass('resourceChoice-curr');
	thisDom.addClass('resourceChoice-curr');
	threadResource=parseInt($(".resourceChoice-curr").attr("data-value"));
}
//===========================================================//
//=                   兴趣分类选择                          =//
//===========================================================//
function interestLabelAdd(){
	var interestId=thisDom.find('a').attr('id');
	var interestText=thisDom.text();
	if($(".interest-label-list").find('#in_'+interestId).length<1){
		$(".interest-label-list").append('<li id="in_'+interestId+'"><a href="#"><span>'+interestText+'</span></a><a href="javascript:;"></a><a href="javascript:;" class="remove">×</a></li>');
		if($(".interest-label-list").find('li').length>1){
			$(".add-interest-btn").remove();
			$(".interest-list").fadeOut(50);
			$(".interest-list-layer").fadeOut(50);
		};
		thisDom.slideUp(200);
	}
}
function interestLabelRemove(){
	thisDom.parent("li").remove();
	if($(".add-interest-btn").length<1){
		$(".interest-label-list").before('<a href="javascript:;" class="add-interest-btn"><span><i></i><i></i><i></i></span>添加所属兴趣</a>');
	}
	var thisInterestId=(thisDom.parent('li').attr('id')).replace(/[^0-9]/ig,"");
	$("#"+thisInterestId).parent('li').slideDown(200);
}
//===========================================================//
//=                   图注文字输入限制                      =//
//===========================================================//
function mediaTxtInput(){
	charCount();
	var charLength=Math.round(thisLength/2);
	if(thisLength<=1000){
		thisDom.next(".char-limit").find('em').text('还可以输入');
		thisDom.next(".char-limit").find('i').text(500-charLength);
		thisDom.next(".char-limit").find('i').css('color','#2175d0');
		thisDom.removeClass('error-input');
	}
	else{
		thisDom.next(".char-limit").find('em').text('已超出');
		thisDom.next(".char-limit").find('i').text(Math.abs(500-charLength));
		thisDom.next(".char-limit").find('i').css('color','#e24343');
		thisDom.addClass('error-input');		
	}
}
//===========================================================//
//=                   文字模块输入限制                      =//
//===========================================================//
function txtModelInput(){
	charCount();
	var charLength=Math.round(thisLength/2);
	if(thisLength<=10000){
		thisDom.next(".char-limit").find('em').text('还可以输入');
		thisDom.next(".char-limit").find('i').text(5000-charLength);
		thisDom.next(".char-limit").find('i').css('color','#2175d0');
		thisDom.removeClass('error-txt-input');
	}
	else{
		thisDom.next(".char-limit").find('em').text('已超出');
		thisDom.next(".char-limit").find('i').text(Math.abs(5000-charLength));
		thisDom.next(".char-limit").find('i').css('color','#e24343');
		thisDom.addClass('error-txt-input');		
	}
}
//===========================================================//
//=                    添加模块参数方法                     =//
//===========================================================//
var num=0;
function addParameter(){
	$(".thread-content-list").find('li').each(function() {
		var thisId=parseInt(($(this).attr('id')).replace(/[^0-9]/ig,""));
		if(thisId>num){
			num=parseInt(($(this).attr('id')).replace(/[^0-9]/ig,""));	
		}
	});
	num=num+1;
}
//===========================================================//
//=                   滚动到当前模块方法                    =//
//===========================================================//
function scrollCurrentModel(thisId){
	var thisTop=$("#mainSort"+thisId).offset().top;
	var top;
	if(($(".add-model").attr("class")).indexOf("add-model-fixed")>=0){
		top=thisTop-100;
	}
	else{
		top=thisTop-200;
	}
	$("body,html").animate({scrollTop:top},300,function(){return;});
}
//插入模块后状态还原
function insertBoxHide(){
	$('.insert-model-btn').each(function(index, el) {
		$(this).next('.add-model').css({
			"height":"0px"
		});
		$(this).parents("li").find(".insert-model-btn").css({
			"height":"40px",
			"border-width":"1px"
		});
	});
}
//===========================================================//
//=                    添加文字模块方法                     =//
//===========================================================//
function addTxtModel(){
	addParameter();
	id=num;
	thisId=num;
	dataSort=num;
	j=$(".thumbnail-box").find('li').length+1;
	type='txt';
	txt='';
	hash='';
	mime='';
	url='';
	imgUrl='';
	title='';
	size='';
	fId='';
	width='';
	height='';
	time='';
	mediaId='';
	poster='';
	getThumbHtml(type,id,domain,hash,j);
	sortLayerFlag=true;
	getTxtHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
	sortLayerFlag=false;
	getTxtHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
	scrollCurrentModel(thisId);
	thumbShow();
	insertBoxHide();
}
function outsideVideo(){
	var youkuId=$("#outside-video-input").val();
	if(youkuId==""){
		return;
	}
	var start=youkuId.indexOf("id_")+3;
	var end=youkuId.indexOf("==");
	if(end<0){
		end=youkuId.indexOf(".html");
	}
	youkuId=youkuId.substring(start,end);
	$.ajax({
	        type: 'get',
	        url: "https://openapi.youku.com/v2/videos/show_basic.json?video_id="+youkuId+"&client_id=81d1d38ac5ef7eac",
	        data: 'json',
	        success: function (data) {
				addParameter();
				id=num;
				thisId=num;
				dataSort=num;
				j=$(".thumbnail-box").find('li').length+1;
				type='outsideVideo';
				hash='';
				mime='';
				url='http://player.youku.com/embed/'+data.id;
				imgUrl=data.thumbnail;
				title=data.title;
				size='';
				fId='';
				width='';
				height='';
				time='';
				mediaId='';
				poster='';
				if(!("description" in data)){
					txt="";
				}
				else{
					txt=data.description;
				}
				getThumbHtml(type,id,domain,hash,title,j,imgUrl);
				sortLayerFlag=true;
				getOutsideVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,youkuId,mediaId,poster);
				sortLayerFlag=false;
				getOutsideVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,youkuId,mediaId,poster);
				scrollCurrentModel(thisId);
				$("#outside-video-input").val('');
				thisDom=$("#mainSort"+id).find('textarea');
				mediaTxtInput();
				$(".add-video-box").slideUp(200);
				thumbShow();
				insertBoxHide();
	        },
	        error:function(){
	        	content='您填写的视频地址有误，目前只支持优酷外链视频。';
	        	dialogTop=200;
	        	confirmText='确定';
	        	confirmBackground="#e97171";
	        	cancelDisplay='none';
	        	ok=function(){return;};
	        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	        }
	});
}
//===========================================================//
//=                  添加上传文件方法                       =//
//===========================================================//
var filesSize;//定义全局变量，一次添加的文件总大小
var filesLen=0;//定义全局变量，一次添加的文件个数
var filesUploadedLen=0;//定义全局变量，已经上传完成的文件个数
var tooLarge;
function addUpload(files){
	tooLarge=false;
	tooMany=false;
	filesSize=0;
	filesUploadedLen=0;
	var photoLen=files.length+$(".thread-content-list").find('li[type=img]').length;
	var videosLen=files.length+$(".thread-content-list").find('li[type=video]').length;
	$(".upload-layer .files-count").find('i').text(filesLen);
	if(imgUpload==true){
		for(var i=0;i<filesLen;i++){
			filesSize=filesSize+files[i].size;
			if(files[i].size>20971520){
	        	content='您上传的图片"'+files[i].name+'"尺寸超限！';
	        	dialogTop=200;
	        	confirmText='确定';
	        	confirmBackground="#e97171";
	        	cancelDisplay='none';
	        	ok=function(){return;};
	        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
				tooLarge=true;
				percentage=0;
				abcd=0;
				return;
			}
			
		}
		if(photoLen>1000){
        	content='您的图片模块数量超限，最多可以上传1000张图片';
        	dialogTop=200;
        	confirmText='确定';
        	confirmBackground="#e97171";
        	cancelDisplay='none';
        	ok=function(){return;};
        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
			tooMany=true;
			percentage=0;
			abcd=0;
			return;			
		}
	}
	else if(videoUpload==true){
		for(var i=0;i<filesLen;i++){
			filesSize=filesSize+files[i].size;
			if(files[i].size>2147483648){
	        	content='您上传的视频"'+files[i].name+'"尺寸超限！';
	        	dialogTop=200;
	        	confirmText='确定';
	        	confirmBackground="#e97171";
	        	cancelDisplay='none';
	        	ok=function(){return;};
	        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
				tooLarge=true;
				percentage=0;
				abcd=0;
				return;
			}
		}
		if(videosLen>10){
        	content='您的视频模块数量超限，最多可以上传10个视频';
        	dialogTop=200;
        	confirmText='确定';
        	confirmBackground="#e97171";
        	cancelDisplay='none';
        	ok=function(){return;};
        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
			tooMany=true;
			percentage=0;
			abcd=0;
			return;			
		}		
	}
}
//===========================================================//
//=                    文件上传中方法                       =//
//===========================================================//
var filesLoaded=0;//定义全局变量，一次添加的文件已上传的总和
var percentage=0;
var abcd=0;
function progressingUpload(file){
	percentage=(filesLoaded+file.loaded)/filesSize*100;
	percentage=percentage+abcd;
	$(".upload-layer .percentage").find('em').text(percentage.toFixed(1));
	$(".upload-layer").find('.progressing').width(percentage.toFixed(1)+"%");
}
//===========================================================//
//=                    文件上传完成方法                     =//
//===========================================================//
var firstThisId=0;
function completeUpload(res,tFile,thisId){
	if(imgUpload==true){
		addParameter();
		id=num;
		//thisId=num;
		dataSort=num;
		j=$(".thumbnail-box").find('li').length+1;
		type='img';
		hash=res.hash;
		mime=res.mimeType;
		url="";
		imgUrl="";
		title=tFile.name;
		size=res.fsize;
		fId=tFile.id;
		orient=res.orient;
		//判断图片方向
		if("Right-top" == orient || "Left-top" == orient ||"Right-bottom" == orient ||"Left-bottom" == orient){
			width=res.h;
			height=res.w;
		}else{
			width=res.w;
			height=res.h;
		}

		time='';
		txt='';
		mediaId='';
		poster='';
		getThumbHtml(type,id,domain,hash,title,j);
		sortLayerFlag=true;
		getImgHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
		sortLayerFlag=false;
		getImgHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
		thisId=$(".thread-content-list").find('li[fId='+firstThisId+']').attr("id").replace(/[^0-9]/ig,"");
		scrollCurrentModel(thisId);
		thisDom=$("#mainSort"+id).find('textarea');
		mediaTxtInput();
		thumbShow();
	}else if(videoUpload==true){
		addParameter();
		id=num;
		//thisId=num;
		dataSort=num;
		j=$(".thumbnail-box").find('li').length+1;
		type='video';
		hash=res.hash;
		mime=res.mimeType;
		url="";
		imgUrl="";
		title=tFile.name;
		size=res.fsize;
		fId=tFile.id;
		rotate = res.rotate;
		width=res.w;
		height=res.h;
		time=res.duration;
		txt='';
		mediaId='';
		poster='';
		getThumbHtml(type,id,domain,hash,title,j);
		sortLayerFlag=true;
		getVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
		sortLayerFlag=false;
		getVideoHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
		thisId=$(".thread-content-list").find('li[fId='+firstThisId+']').attr("id").replace(/[^0-9]/ig,"");
		scrollCurrentModel(thisId);
		thisDom=$("#mainSort"+id).find('textarea');
		mediaTxtInput();
		thumbShow();
	}
	insertBoxHide();
}
//===========================================================//
//=                      取消上传方法                       =//
//===========================================================//
function uploadOver(){
	$(".upload-layer").fadeOut(200,function(){
		filesLoaded=0;
		$(".upload-layer .percentage").find('em').text('0');
		$(".upload-layer").find('.progressing').width("0%");
		$(".upload-layer .files-count").find('i').text('0');
		$(".upload-layer .files-count").find('em').text('0');	
		insertBoxHide();	
	});
}
//===========================================================//
//=                      删除模块方法                       =//
//===========================================================//
function deleteThreadModel(id){
	if(sortLayerFlag==true){
		$(".sort-layer").find('.ui-selected').each(function(index, el) {
			var deleteId=($(this).attr("id")).replace(/[^0-9]/ig,"");
			$(".thread-content-list").find('#mainSort'+deleteId).remove();
			$(".sort-layer-list").find('#sort'+deleteId).remove();
			$(".thumbnail-box").find('#thumb'+deleteId).remove();
			multiDeleteSelect();
			emReorder();
		});
		if($(".sort-layer-list").find('li').length<=0){
			$(".sort-layer").slideUp(200);
			thumbShow();
			footerBottom();
		}
	}
	else{
		id=(thisDom.attr('id')).replace(/[^0-9]/ig,"");
		$(".thread-content-list").find('#mainSort'+id).slideUp(200,function(){
			$(".thread-content-list").find('#mainSort'+id).remove();
			footerBottom();
		});
		$(".sort-layer-list").find('#sort'+id).remove();
		$(".thumbnail-box").find('#thumb'+id).fadeOut(200, function() {
			$(".thumbnail-box").find('#thumb'+id).remove();
			emReorder();
			thumbShow();
		});
	}
}
//===========================================================//
//=                      批量删除按钮                       =//
//===========================================================//
function multiDeleteSelect(){
	if($(".ui-selected").length>0){
		$(".sort-layer").find('.btn-list').find('.sort-layer-delete-gray').after('<a href="javascript:;" class="sort-layer-delete thread-model-remove"><i></i>批量删除</a>');
		$(".sort-layer").find('.btn-list').find('.sort-layer-delete-gray').remove();
	}
	else{
		$(".sort-layer").find('.btn-list').find('.sort-layer-delete').after('<a href="javascript:;" class="sort-layer-delete-gray"><i></i>批量删除</a>');
		$(".sort-layer").find('.btn-list').find('.sort-layer-delete').remove();				
	}
}
//===========================================================//
//=                        发布条件                         =//
//===========================================================//
var threadTitleFlag=true;
var threadContentFlag=true;
var threadDescriptionFlag=true;
var threadTxtFlag=true;
function pubThreadRequirement(){
	submitFilter();
	if(($(".thread-title").attr('class')).indexOf("error-input")>=0){
		threadTitleFlag=false;
	}
	else if($(".thread-title").val()==""|| $(".thread-title").val()=="在这里输入标题，标题长度为6-30个文字"){
		threadTitleFlag=false;
	}
	else{
		threadTitleFlag=true;
	}
	var threadLen=$(".thread-content-list").find('li').length;
	if(threadLen<=0){
		threadContentFlag=false;
	}
	else if(threadLen==1 && $(".thread-content-list").find('li[type=txt]').find('textarea').val()==""){
		threadContentFlag=false;
	}
	else{
		threadContentFlag=true;	
	}
	if($(".thread-content-list").find(".error-input").length>0){
		threadDescriptionFlag=false;
	}
	else{
		threadDescriptionFlag=true;
	}
	if($(".thread-content-list").find(".error-txt-input").length>0){
		threadTxtFlag=false;
	}
	else{
		threadTxtFlag=true;
	}
	//
	if(threadTitleFlag==false){
		if($(".thread-title").val()==""){
			content="帖子标题不能为空。";
		}
		else{
			content="您输入的标题长度有误，标题长度必须为6~30个字。";
		}
		confirmText="确定";
		confirmBackground="#e97171";
		dialogTop=100;
		cancelDisplay='none';
		ok=function(){
			$("body,html").animate({scrollTop:0},300);
			$(".thread-title").focus();
		}
		dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);	
		return;
	}
	if(threadContentFlag==false){
		content="帖子内容不能为空。";
		confirmText="确定";
		confirmBackground="#e97171";
		dialogTop=100;
		cancelDisplay='none';
		ok=function(){
			$("body,html").animate({scrollTop:0},300);
		}
		dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);	
		return;		
	}
	if(threadDescriptionFlag==false){
		content="图片或视频注释字数超限，不得超过500字。";
		confirmText="确定";
		confirmBackground="#e97171";
		dialogTop=100;
		cancelDisplay='none';
		ok=function(){
			thisId=($(".thread-content-list").find(".error-input:eq(0)").parents('li').attr('id')).replace(/[^0-9]/ig,"");
			$(".thread-content-list").find(".error-input:eq(0)").focus();
			scrollCurrentModel(thisId);
		}
		dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);	
		return;				
	}
	if(threadTxtFlag==false){
		content="文字模块字数超限，单个模块不得超过5000字。";
		confirmText="确定";
		confirmBackground="#e97171";
		dialogTop=100;
		cancelDisplay='none';
		ok=function(){
			thisId=($(".thread-content-list").find(".error-txt-input:eq(0)").parents('li').attr('id')).replace(/[^0-9]/ig,"");
			$(".thread-content-list").find(".error-txt-input:eq(0)").focus();
			scrollCurrentModel(thisId);
		}
		dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);	
		return;				
	}
	if(threadTitleFlag==true && threadContentFlag==true && threadDescriptionFlag==true && threadTxtFlag==true){
		if(status1==-1){
			pubThread();
		}
		else if(status1==0){
			content="确定要发布此帖吗？";
			confirmText="确定"
			confirmBackground="#2175d0";
			dialogTop=100;
			cancelDisplay='inline-block';
			ok=function(){
				pubThread();
			}
			dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);			
		}

	}
}
//===========================================================//
//=                        发布帖子                         =//
//===========================================================//
var status1;
function pubThread() {
	submitFilter();
	//判断id input是不是存在，如果不存在是发新帖，否则是编辑帖子
	var id = $("#threadId").val();
	var isDraft=$("#isDraft").val();
	var title=$(".thread-title").val();
	var smalltopic;
	if($("#isSmallTopic").prop('checked')==true){
		smalltopic=1;
	}

	else{
		smalltopic=0;
	}
	var source=parseInt($(".resourceChoice-curr").attr('data-value'));
	var contentjsons=[];
    var photosjsons=[];
    var imagejsons=[]; 
    var videoinfojsons=[];
    var videojsons=[];
    var linkvideojsons=[];
    var interestjsons=[];
    var interestlength=$(".interest-label-list").find('li').length;
    var contentLen=$(".thread-content-list").find('li[type=txt]').length;
    var imageLen=$(".thread-content-list").find('li[type=img]').length;
    var videoLen=$(".thread-content-list").find('li[type=video]').length;
    var linkVideoLen=$(".thread-content-list").find('li[type=outsideVideo]').length;
    for(var i=0;i<contentLen;i++){
        var contentSort = $(".thread-content-list").find('li[type=txt]:eq('+i+')').index();
        var txtContent= $(".thread-content-list").find('li[type=txt]:eq('+i+')').find('textarea').val();
        // var contentId = ($(".thread-content-list").find('li[type=txt]:eq('+i+')').attr("id")).replace(/[^0-9]/ig,"");
        var contentId;
        if(txtContent.length<=0){
            txtContent='&nbsp;';
        }
        contentjsons.push({id:contentId,sort:contentSort,content:txtContent});
        
    }
    for(var i=0;i<imageLen;i++){
        var imageSort = $(".thread-content-list").find('li[type=img]:eq('+i+')').index();
        // var imageId = ($(".thread-content-list").find('li[type=img]:eq('+i+')').attr('id')).replace(/[^0-9]/ig,"");
        var imageId;
        var imageHash = $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('hash');
        var imageMime = $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('mime');
        var imageUrl =  $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('hash');
        var imageSize = $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('size');
        var imageWidth = $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('fWidth');
        var imageHeight = $(".thread-content-list").find('li[type=img]:eq('+i+')').attr('fHeight');
        var imageContent = $(".thread-content-list").find('li[type=img]:eq('+i+')').find('textarea').val();
        if(imageHash.length!=0){
            photosjsons.push({id:imageId,sort:imageSort,hash:imageHash,content:imageContent});
            imagejsons.push({hash:imageHash,mime:imageMime,url:imageUrl,size:imageSize,width:imageWidth,height:imageHeight});
        }
    }
    for(var i=0;i<videoLen;i++){
	    var videoSort = $(".thread-content-list").find('li[type=video]:eq('+i+')').index();
	    var videoHash = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('hash');
	    var videoMime = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('mime');
	    var videoUrl = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('hash');
	    var videoSize = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('size');
	    var videoWidth = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('fwidth');
	    var videoHeight = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('fheight');
	    var videoTime = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('time');
	     //var videoId = ($(".thread-content-list").find('li[type=video]:eq('+i+')').attr('id')).replace(/[^0-9]/ig,"");
	    var videoId = $(".thread-content-list").find('li[type=video]:eq('+i+')').attr('mediaId');
	    var videoContent = $(".thread-content-list").find('li[type=video]:eq('+i+')').find('textarea').val();
        if(videoHash.length!=0){
            videojsons.push({id:videoId,sort:videoSort,hash:videoHash,content:videoContent});
            videoinfojsons.push({hash:videoHash,mime:videoMime,url:videoUrl,size:videoSize,width:videoWidth,height:videoHeight,timelen:videoTime});
        }
    }
    for(var i=0;i<linkVideoLen;i++){
    	var linkSort = $(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').index();
	    var linkTitle = $(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').attr('title');
	    // var linkId = ($(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').attr('id')).replace(/[^0-9]/ig,"");
	    var linkId;
	    var linkCommonurl = $(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').attr('url');
			var start=linkCommonurl.indexOf("embed/")+6;
			var end=linkCommonurl.indexOf("==");
		var linkOutsideurl=linkCommonurl.substring(start,end);
		linkOutsideurl="http://v.youku.com/v_show/id_"+linkOutsideurl+"=="
	    var linkImgurl = $(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').attr('imgurl');
	    var linkContent = $(".thread-content-list").find('li[type=outsideVideo]:eq('+i+')').find('textarea').val();
            if(linkCommonurl.length!=0) {
                linkvideojsons.push({id:linkId,sort: linkSort, title: linkTitle, commonurl: linkCommonurl, outsideurl: linkOutsideurl, imgurl: linkImgurl, content: linkContent});
            }
    }
    for(var i=0;i<interestlength;i++){
        var interest = ($(".interest-label-list").find('li:eq('+i+')').attr("id")).replace(/[^0-9]/ig,"");
        interestjsons.push({id:interest});
    }
	$.ajax({
        type : 'POST',
        url : '/thread/save',
        data : {
            'id':id,
            'title':title,
            'source':source,
            'status':status1,
            'isdraft':isDraft,
            'smalltopic':smalltopic,
            'photosjsons':JSON.stringify(photosjsons),
            'imagejsons':JSON.stringify(imagejsons),
            'videosjsons':JSON.stringify(videojsons),
            'videoinfojsons':JSON.stringify(videoinfojsons),
            'linkvideojsons':JSON.stringify(linkvideojsons),
            'contentjsons':JSON.stringify(contentjsons),
            'interestjsons':JSON.stringify(interestjsons)
        },
        beforeSend:function(){
        	canClick=false;
        },
        success : function(json){
            if(json){
                var status = json.status;
                if(!status){
                	canClick=false;
                    return ;
                }else{
	                if(status == "200"){
			        	dialogTop=200;
			        	confirmBackground="#e97171";
			        	confirmBackground="#2175d0";
	                	if(status1==-1){
	                		documentHtml=$(".thread-content-list").html();
	                		
	                		$("#threadId").val(json.threadid)
	                		content='已保存至草稿箱。';
	                		confirmText='确定';
				        	cancelDisplay='none';
	                		ok=function(){
								leaveAlert=false;
	                			window.location='/center/drafts';
	                		}
	                	}
	                	else if(status1==0){
			        		content='帖子发布成功！';
				        	confirmText='确定';
				        	cancelDisplay='none';
			        		ok=function(){
			        			leaveAlert=false;
			        			window.location = '/center/thread';
			        		}
			        	}
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	                    return ;
	                }else if(status == "600"){
			        	content='上传内容错误！';
			        	dialogTop=200;
			        	confirmText='确定';
			        	confirmBackground="#e97171";
			        	cancelDisplay='none';
			        	ok=function(){return;};
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	                    return ;
	                }else if(status == "666"){
			        	content='您好，您的账号处于禁言状态，无法进行此操作。';
			        	dialogTop=200;
			        	confirmText='确定';
			        	confirmBackground="#e97171";
			        	cancelDisplay='none';
			        	ok=function(){return;};
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	                    return ;
	                } else if(status == "601"){
	                    alert("您还没有登录或者登录信息已失效，请重新登录!");
	                    $("#loginiframe").attr("src","/login?isfrom=2");
						$("#login_layer").fadeIn(150);
						setTimeout(function(){$("#login_layer .close").fadeIn('slow');},1000);
	                    $(".pub_note_button").css("display","inline-block");
	                    $(".pub_note_button_gray").css("display","none");
	                    return ;
	                }else if(status == "602"){
			        	content='帖子视频正在转码中，稍候自动发布！';
			        	dialogTop=200;
			        	confirmText='确定';
			        	confirmBackground="#2175d0";
			        	cancelDisplay='none';
			        	ok=function(){
			        		leaveAlert=false;
			        		window.location = '/center/thread'; 
			        	};
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);                                          
	                    return ;
	                }else if(status=="401"){
			        	content='帖子已经被推入选题，暂不允许编辑，请联系管理员。';
			        	dialogTop=200;
			        	confirmText='确定';
			        	confirmBackground="#e97171";
			        	cancelDisplay='none';
			        	ok=function(){return false; };
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	                    return;
	                }else{
			        	content='系统错误';
			        	dialogTop=200;
			        	confirmText='确定';
			        	confirmBackground="#e97171";
			        	cancelDisplay='none';
			        	ok=function(){return false; };
			        	dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
	                   return;
	                }
	                canClick=true;
                }
            }
        },
        error : function(a){
        	content='访问服务器端出错！这一般是由于您的网络与服务器通信异常导致的，请不要关闭或刷新此页面，确保您的网络正常后再次点击发布即可。';
        	dialogTop=200;
        	confirmText='确定';
        	confirmBackground="#e97171";
        	cancelDisplay='none';
        	ok=function(){
        		canClick=true;
        		return; 
        	};
            return;
        },
        complete: function(){
        	
        }
    });	
}
//===========================================================//
//=                        扫码传图                         =//
//===========================================================//
var existQrImg=new Array();
$.ajax({
    type: 'get',
    url: "/thread/showimage",
    data: 'json',
    success: function (data) {
    	var v=eval(data.info);
    	if(data.info!=""){
	    	if(v.length>0){
		    	$.each(v, function(i,item) {     
				     existQrImg.push(item.fid);         
				});
			}
		}
		setInterval(qrcodeUpload,3000);      
    }
});
function qrcodeUpload(){
	$.ajax({
	    type: 'get',
	    url: "/thread/showimage",
	    data: 'json',
	    success: function (data) {
	    	var v=eval(data.info);
	    	$.each(v, function(i,item) {  
			     if(existQrImg.indexOf(item.fid)>=0){
			     	console.log("There is no latest image.");
			     }
			     else{		     	
			     	existQrImg.push(item.fid);
					addParameter();
					id=num;
					//thisId=num;
					dataSort=num;
					j=$(".thumbnail-box").find('li').length+1;
					type='img';
					hash=item.hash;
					mime=item.mime;
					url="";
					imgUrl="";
					title="";
					size=item.size;
					fId=item.id;
					width=item.width;
					height=item.height;
					time='';
					txt='';
					mediaId='';
					poster='';
					getThumbHtml(type,id,domain,hash,title,j);
					sortLayerFlag=true;
					getImgHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
					sortLayerFlag=false;
					getImgHtml(id,dataSort,type,hash,mime,url,imgUrl,title,size,width,height,time,txt,mediaId,poster);
					thisId=num;
					scrollCurrentModel(thisId);
					thisDom=$("#mainSort"+id).find('textarea');
					mediaTxtInput();
					thumbShow();
					$(".add-img-box").slideUp(200);
					insertCurrentId=id;
			     }         
			});     
	    }
	});
}
//===================================================================================================================================================================================================================
//===========================================================//
//=                                                         =//
//=                    jQuery交互部分                       =//
//=                                                         =//
//===========================================================//
var documentHtml;//初始页面的html
$(document).ready(function() {
	if($("#threadId").val()>0){
		thumbSize();
		// 进入帖子编辑，每个模块的字数重读。
		if($(".description-input").length>0){
			$(".description-input").each(function(index, el) {
				thisDom=$(this);
				mediaTxtInput();
			});
		}
		if($(".txt-input").length>0){
			$(".txt-input").each(function(index, el) {
				thisDom=$(this);
				txtModelInput();
			});
		}
	}
	// 删除侧边栏发帖按钮
	$(".side-pub-thread").remove();
	//===================缩略图区域显示/隐藏=====================//
	thumbShow();
	//===================输入标题=====================//
	$(".thread-title").keyup(function(thisLength,thisValue) {
		thisDom=$(this);
		threadTitleInput();
	});
	$("body").on('paste cut','.thread-title',function(thisLength,thisValue) {
		thisDom=$(this);
		threadTitleInput();
		setTimeout(function(){thisDom.blur();},100);
	});
	$(".thread-title").blur(function(thisLength,thisValue) {
		thisDom=$(this);
		threadTitleInput();
	});
	//===================兴趣分类选择=====================//
	$(".interest-label-list").find('li').each(function(index, el) {
		var thisInterestId=($(this).attr("id")).replace(/[^0-9]/ig,"");
		$("#"+thisInterestId).parent("li").css("display","none");
	});
	if($(".interest-label-list").find('li').length>1){
		$(".add-interest-btn").remove();
	}
	$(".thread-resource-interest").on('click','.add-interest-btn',function(event) {
		$(".interest-list").fadeIn(200);
		$(".interest-list-layer").fadeIn(200);
	});
	$(".interest-list-layer").click(function(event) {
		$(".interest-list").fadeOut(200);
		$(this).fadeOut(200);
	});
	$(".interest-list").find('.remove').click(function(event) {
		$(".interest-list").fadeOut(200);
		$('.interest-list-layer').fadeOut(200);
	});
	$(".interest-list").find('ul li').click(function(event) {
		thisDom=$(this);
		interestLabelAdd();
	});
	$(".interest-label-list").on('click', '.remove', function(event) {
		thisDom=$(this);
		interestLabelRemove();
	});
	//===================输入图注=====================//
	$("body").on('keyup','.description-input',function(thisLength,thisValue) {
		thisDom=$(this);
		mediaTxtInput();
	});
	$("body").on('paste cut','.description-input',function(thisLength,thisValue) {
		thisDom=$(this);
		mediaTxtInput();
		setTimeout(function(){thisDom.blur();},100);
	});
	$("body").on('blur','.description-input',function(thisLength,thisValue) {
		thisDom=$(this);
		mediaTxtInput();
	});
	//===================输入文字模块=====================//
	$("body").on('keyup','.txt-input',function(thisLength,thisValue) {
		thisDom=$(this);
		txtModelInput();
	});
	$("body").on('paste cut','.txt-input',function(thisLength,thisValue) {
		thisDom=$(this);
		txtModelInput();
		setTimeout(function(){thisDom.blur();},100);
	});
	$("body").on('blur','.txt-input',function(thisLength,thisValue) {
		thisDom=$(this);
		txtModelInput();
	});
	//===================帖子来源=====================//
	$(".resource-btn").click(function(event) {
		thisDom=$(this);
		thisValue=$(this).val();
		resourceChoice(thisValue);
	});
	//===================各个模块后插入模块=====================//
	$(".thread-content-list").on('click', '.insert-model-btn', function(event) {
		$(this).css({
			"height":"0px",
			"border-width":"0px"
		});
		$(this).parents("li").find('.add-model').css("height","92px");
	});
	$(".thread-content-list").on('click', '.close-add-btn-box', function(event) {
		$(this).parent('.add-model').css({
			"height":"0px"
		});
		$(this).parents("li").find(".insert-model-btn").css({
			"height":"40px",
			"border-width":"1px"
		});
	});
	//===================打开添加图片浮层====================//
	$("#container").on('click','.add-img-btn',function(event) {
		var thisTop=$(this).offset().top;
		var thisLeft=$(this).offset().left;
		if($(".add-img-box").is(":visible")){
			$(".add-img-box").slideUp(200,function(){
				$(".add-img-box").css({
					top: thisTop+'px',
					left: thisLeft-440+'px'
				});
				$(".add-img-box").slideDown(200);
				$(".add-video-box").slideUp(200);
			});
		}
		else{
			$(".add-img-box").css({
				top: thisTop+'px',
				left: thisLeft-440+'px'
			});
			$(".add-img-box").slideDown(200);
			$(".add-video-box").slideUp(200);
		}
		if($(this).attr('id')=='add-img'){
			insertFlag=false;
		}
		else{
			insertFlag=true;
			insertCurrentId=($(this).parents('li').attr('id')).replace(/[^0-9]/ig,"");
		}
		$(".moxie-shim").css({
			width: '150px',
			height: '40px',
			top:"50px",
			left:"64px"
		});
		videoUpload=false;
		imgUpload=true;
	});
	//===================打开添加视频浮层=====================//
	$("#container").on('click','.add-video-btn',function(event) {
		var thisTop=$(this).offset().top;
		var thisLeft=$(this).offset().left;
		if($(".add-video-box").is(":visible")){
			$(".add-video-box").slideUp(200,function(){
				$(".add-video-box").css({
					top: thisTop+'px',
					left: thisLeft-579+'px'
				});
				$(".add-video-box").slideDown(200);
				$(".add-img-box").slideUp(200);
			});
		}
		else{
			$(".add-video-box").css({
				top: thisTop+'px',
				left: thisLeft-579+'px'
			});
			$(".add-video-box").slideDown(200);
			$(".add-img-box").slideUp(200);
		}
		if($(this).attr('id')=='add-video'){
			insertFlag=false;
		}
		else{
			insertFlag=true;
			insertCurrentId=($(this).parents('li').attr('id')).replace(/[^0-9]/ig,"");
		}
		$(".moxie-shim").css({
			width: '150px',
			height: '40px',
			top:"40px",
			left:"30px"
		});
		videoUpload=true;
		imgUpload=false;		
	});
	//==================添加文字模块==================//
	$("#container").on('click','.add-txt-btn',function(event) {
		if($(this).attr('id')=='add-txt'){
			insertFlag=false;
		}
		else{
			insertFlag=true;
			insertCurrentId=($(this).parents('li').attr('id')).replace(/[^0-9]/ig,"");
		}
		addTxtModel();
	});
	//==================添加外链视频模块==================//
	$("#save-outside-video").click(function(event) {
		outsideVideo();
	});
	//==================打开/关闭排序层==================//
	$("#open-sortable-layer-btn").click(function(event) {
		$(".sort-layer-box").height($(window).height()-170);
		$(".sort-layer-box").css("overflow","auto")
		$(".sort-layer").height($(window).height());
		getTxt();
		setTimeout(function(){
			$(".sort-layer").slideDown(300,function(){sortLayerFlag=true;});
			$('body').addClass('body-overlay');
		},100);
		multiDeleteSelect();
	});
	$(".sort-layer .sort-layer-cancel").click(function(event) {
		$(".sort-layer").slideUp(300,function(){
			sortLayerFlag=false;
			sortUpdate();
		});
		$('body').removeClass('body-overlay');
		multiDeleteSelect();
	});
	$("#save-sort").click(function(event) {
		sortUpdate();
		$(".sort-layer").slideUp(300,function(){
			sortLayerFlag=false;
		});
		$('body').removeClass('body-overlay');
		multiDeleteSelect();
	});
	$(".sort-layer-save").click(function(event) {
		sortUpdate();
		$(".sort-layer").slideUp(300,function(){
			sortLayerFlag=false;
		});
		$('body').removeClass('body-overlay');
		multiDeleteSelect();
	});
	//===================排序层-拖拽排序==================//
	$( ".sort-layer-list" ).on("click","li",function() {//点击选择被拖拽对象
		thisSelected=$(this);
		clickToSelect();
	});
	$(".sort-layer-box").selectable({//框选多个对象
		filter: "li",
		selecting:function(){
		},
		unselected: function( event, ui ) {
			multiDeleteSelect();
		},
		stop:function(){
			$(".ui-selectee").find('span').css('opacity','0');
			$(".ui-selected").find('span').css('opacity','1');
			multiDeleteSelect();			
		}
	});
	$( ".sort-layer-list" ).sortable({//拖拽排序
		  placeholder: "ui-state-highlight",
		  tolerance :'pointer',
		  cursor: "move",
		  revert: 200,
		  delay:100,
		  helper:'clone',
		  scroll:true,
		  scrollSensitivity:150,
		  scrollSpeed:100,
		  start:function(event, ui) {//开始拖拽
			var thisSortDom=ui.item.context.className;
			var thisSortClass='ui-selected';
			if($(".ui-selected").length>=2){
			  	if(thisSortDom.indexOf(thisSortClass)>0){
			  		multiSortFlag=true;
			  	}
			}
		  	else{
		  		multiSortFlag=false;
		  	}
		  	multiStart();
		  	
		  },
		  sort:function(event, ui) {//拖拽中
		  	multiSort();
		  	$(".txt-show").css("opacity","0");
		  },
		  stop:function(){//拖拽结束
		  	multiStop();
		  	$(".txt-show").css("opacity","1");
		  },
		  update:function(){
		  	$(".txt-show").css("opacity","1");
		  }
	});
	$(".sort-layer-list").on('mouseover','.ui-selectee[type=txt]',function(event) {
		thisDom=$(this);
		txtShow(thisDom);
	});
	$(".sort-layer-list").on('mouseover','.ui-sortable-helper',function(event) {
		thisDom=$(this);
		thisDom.parents(".sort-layer").find(".txt-show").hide();
	});
	$(".sort-layer-list").on('mouseover','.ui-selected',function(event) {
		thisDom=$(this);
		thisDom.parents(".sort-layer").find(".txt-show").hide();
	});
	$(".sort-layer-list").on('mouseleave','li[type=txt]',function(event) {
		thisDom=$(this);
		thisDom.parents(".sort-layer").find(".txt-show").hide();
	});
	$(".thumbnail-box").on('mouseenter','li[type=txt]',function(event) {
		thisDom=$(this);
		txtShow(thisDom);		
	});
	$(".thumbnail-box").on('mouseleave','li[type=txt]',function(event) {
		thisDom=$(this);
		thisDom.parents("#container").find('.txt-show').css("display","none");		
	});
	//===================主内容区域-拖拽排序==================//
	$( ".thread-content-list" ).sortable({
		  placeholder: "thread-content-highlight",
		  tolerance :'pointer',
		  revert: 200,
		  delay:100,
		  helper:'clone',
		  scroll:true,
		  scrollSensitivity:50,
		  scrollSpeed:300,
		  handle:'.sort-handle',
		  axis: 'y',
		  start:function(event,ui){
		  	var thisSortID=ui.item.context.id;
		  	thisOl=$("#"+thisSortID).parents('ol');
		  },
		  sort:function(event,ui){
		  	$(".ui-sortable-helper").css({
		  		height: '200px',
		  		'border':'2px solid #2175d0'
		  	});
		  },
		  update:function(){
		  	sortUpdate();
		  }		
	});
	//==================删除模块==================//
	$("body").on("click",".thread-model-remove",function(){
		thisDom=$(this).parents("li");
		if(thisDom.attr("type")=='txt' && thisDom.find('textarea').val()==""){
			deleteThreadModel();
		}
		else{
			content="删除的模块将无法恢复，确定要删除吗？";
			confirmText="删除"
			confirmBackground="#e97171";
			dialogTop=100;
			cancelDisplay='inline-block';
			ok=function(){
				deleteThreadModel();
			}
			dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
		}
	});
	//===================右侧缩略图自定义滚动条==================//
    var interestListHeight=$('.interest-list').height();
	$('.interest-list').find('li ul').slimScroll({
        height: interestListHeight+'px',
	    size: '5px',
	    color:'#999',
    });
    $('.thumbnail-box').on("click","li",function(){
    	thisId=($(this).attr("id")).replace(/[^0-9]/ig,"");
    	scrollCurrentModel(thisId);
    });
    var ll=0;
    var aa=0;

   //===================创建上传图片对象==================//
   var filesArray=new Array();
   var imgUploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles-img',
		filters: {
		  mime_types : [ 
		    { title : "Image files", extensions : "jpg,gif,png,jpeg" }
		  ],
		},
        //max_file_size: '20mb',
        flash_swf_url: 'plugin/Moxie.swf',

        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: $('#uptoken_url').val(),
        uptoken_url1: $('#uptoken_url1').val(),
        domain: $('#domain').val(),
        save_key: true,
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
            	filesArray=[];
            	filesLen=files.length;
            	addUpload(files,tooLarge);
            	$(".add-img-box").slideUp(200);
            	for(var i=0;i<files.length;i++){
	            	if(tooLarge==true || tooMany==true){
	            		imgUploader.stop();
	            		imgUploader.removeFile(files[i]);
	            	}else{
	            		filesArray.push(files[i].id);
	            		$(".upload-layer").fadeIn(200);
	            	}
	            }
            	
            	firstThisId=files[0].id;
            },
            'BeforeUpload': function(up, file) {
            	abcd=percentage;
            },
            'UploadProgress': function(up, file) {
            	$(".upload-layer").find('.text').text('正在处理图片，请您稍等...');
            	progressingUpload(file);
            },
            'UploadComplete': function() {
            	uploadOver();
            	abc=0;
            	percentage=0;
            },
            'FileUploaded': function(up, file, info) {
            	res=$.parseJSON(info);
            	var tFile=file;
            	filesUploadedLen=filesUploadedLen+1;
            	$(".upload-layer .files-count").find('em').text(filesUploadedLen);
            	completeUpload(res,tFile);
            	insertCurrentId=($(".thread-content-list").find('li[fid='+file.id+']').attr("id")).replace(/[^0-9]/ig,"");
            },
            'Error': function(up, err, errTip) {
            },
            'Key': function(up, file) {
                 var key = "";
                 return key
             }
        }
    });
    imgUploader.bind('FileUploaded', function() {
        console.log('A picture is loaded.');
    });
   //===================创建上传视频对象==================//
   var videoUploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles-video',
		filters: {
		  mime_types : [ 
		    { title : "Video files", extensions : "flv,Flv,mp4,mov,mpeg,avi,dat,vob,rm,wmv,asf,rmvn,mkv,3gp" }
		  ],
		},
        flash_swf_url: 'plugin/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: $('#uptoken_url').val(),
        uptoken_url1: $('#uptoken_url1').val(),
        domain: $('#domain').val(),
        save_key: true,
        auto_start: true,
        init: {
           'FilesAdded': function(up, files) {
            	filesArray=[];
            	filesLen=files.length;
            	addUpload(files,tooLarge);
            	$(".add-video-box").slideUp(200);
            	for(var i=0;i<files.length;i++){
	            	if(tooLarge==true || tooMany==true){
	            		videoUploader.stop();
	            		videoUploader.removeFile(files[i]);
	            	}else{
	            		filesArray.push(files[i].id);
	            		$(".upload-layer").fadeIn(200);
	            	}
	            }
	            firstThisId=files[0].id;
            },
            'BeforeUpload': function(up, file) {
            	abcd=percentage;
            },
            'UploadProgress': function(up, file) {
            	$(".upload-layer").find('.text').text('正在处理视频，请您稍等...');
            	progressingUpload(file);
            },
            'UploadComplete': function() {
            	uploadOver();
            	abc=0;
            	percentage=0;            	
            },
            'FileUploaded': function(up, file, info) {
            	res=$.parseJSON(info);
            	var tFile=file;
            	filesUploadedLen=filesUploadedLen+1;
            	$(".upload-layer .files-count").find('em').text(filesUploadedLen);
            	if(filesUploadedLen>=filesLen){
            		uploadOver();
            	}
            	completeUpload(res,tFile);
            	insertCurrentId=($(".thread-content-list").find('li[fid='+file.id+']').attr("id")).replace(/[^0-9]/ig,"");
            },
            'Error': function(up, err, errTip) {
            },
            'Key': function(up, file) {
                 var key = "";
                 return key
             }
        }
    });
    videoUploader.bind('FileUploaded', function() {
        console.log('A video is loaded.');
    });
    //=================拖拽上传=====================//
    // $('#container').on(
    //     'dragenter',
    //     function(e) {
    //         e.preventDefault();
    //         $('#container').addClass('draging');
    //         e.stopPropagation();
    //     }
    // ).on('drop', function(e) {
    //     e.preventDefault();
    //     $('#container').removeClass('draging');
    //     e.stopPropagation();
    // }).on('dragleave', function(e) {
    //     e.preventDefault();
    //     $('#container').removeClass('draging');
    //     e.stopPropagation();
    // }).on('dragover', function(e) {
    //     e.preventDefault();
    //     $('#container').addClass('draging');
    //     e.stopPropagation();
    // });
    //=================取消上传=====================//
    $(".upload-layer").find('.cancel').click(function(event) {
	    if(imgUpload==true){
			for(var i=0;i<filesLen;i++){
				imgUploader.removeFile(filesArray[i]);
			}
		}
		else if(videoUpload==true){
			for(var i=0;i<filesLen;i++){
				videoUploader.removeFile(filesArray[i]);
			}
		}
		uploadOver();
    });
    $(".thread-content-list").on("focus","textarea",function(){
    	$(this).parent(".mainSortBox").addClass('focus');
    });
    $(".thread-content-list").on("blur","textarea",function(){
    	$(this).parent(".mainSortBox").removeClass('focus');
    });
    //=============***********************************====发布帖子====***********************************=================//
    $("#pub-thread-btn").click(function(event) {
    	if(canClick==true){
    		status1=0;
    		pubThreadRequirement();
    	}
    });
    //=============***********************************====保存草稿====***********************************=================//
    $("#save-thread-btn").click(function(event) {
    	if(canClick==true){
    		status1=-1;
    		pubThreadRequirement();
    	}
    });
    documentHtml=$('.thread-content-list').html();
});
window.onbeforeunload = function(event) { 
		var documentHtmlModify=$(".thread-content-list").html();
		if(documentHtml!=documentHtmlModify && leaveAlert==true){
        	var warning;
        	if($("#threadId").val()>0){
        		warning="您已经对帖子进行了修改，尚未保存草稿。";
        	}else{
        		warning="您的帖子尚未保存。";
        	}          
        	return warning;
        }
} 