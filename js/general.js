
/************************************************************************/
/*                               global.js                              */
/************************************************************************/
//输入框默认值
;(function($){
    $.fn.extend({
        "defText":function(opts){
            var def = $.extend({
                fcolor : "#000",
                bcolor : "#bbb"
            },opts);
            return this.each(function(){
                var val=$(this).attr("placeholder");
                if(!val || val=="") {this.value="";return;}
                this.value=val;
                this.style.color=def.bcolor;
                $(this).bind({
                    "focus":function(){
                        if(this.value==val) this.value="";
                        this.style.color=def.fcolor;
                    },
                    "blur":function(){
                        if(this.value==""){
                            this.value=val;
                            this.style.color=def.bcolor;
                        }
                    }
                });
            })
        }   
    });
})(jQuery);

String.prototype.trim = function()
{
    return this.replace(/(^[\s]*)|([\s]*$)/g, '');
}
String.prototype.trim2 = function()
{
  var vStr = this.trim();
  vStr = vStr.replace(/(^[\s]*)|([\s]*$)/g,   '');   
  vStr = vStr.replace(/(^[　]*)|([　]*$)/g,'');
  return  vStr;
}
String.prototype.strLength = function()
{
    var vStr = this.trim().split("");
    var vLength = 0;
    
    for (i = 0 ; i < vStr.length ; i++)
    {
        vTemp = escape(vStr[i]);
        vLength += (vTemp.indexOf("%u", 0) == -1) ? 1 : 2;
    }
    
    return vLength;
}

String.prototype.cnLength = function(){
    
    var str = this.trim();
    var len = str.length;
    var cnStr = str.replace(/[\x00-\x7f]/g, '');
    return Math.ceil((len-cnStr.length)/2) + cnStr.length;
}

String.prototype.isUserName = function()
{
    var vStr = this.trim();
    var vReg = /^[a-zA-Z][\w]{3,50}$/;
    
    if(vStr.isEmail()) return true;
        if(vStr.isMobile()) return true;
    
    if(vReg.test(vStr))
        {
                return true;
        }
        else
        {
                var vRegAlipay = /[@(alipay|gld)]$/;
                return vRegAlipay.test(vStr);
        }
}

String.prototype.isNickName = function()
{
    var vStr = this.trim();
    var vReg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\w])+$/;
    
    //if (vStr.length < 2 || vStr.length > 6)
    if (vStr.strLength() < 4 || vStr.strLength() > 16)
    {
        return false;
    } else {
        return vReg.test(vStr);
    }
}
// /^/w+((-/w+)|(/./w+))*/@[A-Za-z0-9]+((/.|-)[A-Za-z0-9]+)*/.[A-Za-z0-9]+$/
String.prototype.isEmail = function()
{
    var vStr = this.trim();
    var vReg = /^\w+([-+.]\w+[-]*)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //var vReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    
    if (vStr.strLength() < 3 || vStr.strLength() > 50)
    {
        return false;
    } else {
        return vReg.test(vStr);
    }
}

String.prototype.isPassword = function()
{
    var vStr = this.trim();
    var vReg = /^[a-zA-Z0-9]{6,16}$/;
    return vReg.test(vStr);
}

String.prototype.isRealName = function()
{
    var vStr = this.trim();
    var vReg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\w])+$/;
    
    if (vStr.strLength() < 1 || vStr.strLength() > 20)
    {
        return false;
    } else {
        return vReg.test(vStr);
    }
}

String.prototype.isAnswer = function()
{
    var vStr = this.trim();
    var vReg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\w])+$/;
    
    if (vStr.strLength() < 1 || vStr.strLength() > 30)
    {
        return false;
    } else {
        return vReg.test(vStr);
    }
}

String.prototype.isZipCode = function()
{
    var vStr = this.trim();
    var vReg = /^([0-9]{6})$/;
    return vReg.test(vStr);
}

String.prototype.isTel = function()
{
    var vStr = this.trim();
    var vReg = /^[\d\-]{6,20}$/;
    return vReg.test(vStr);
}

String.prototype.isMobile = function()
{
    var vStr = this.trim();
    //var vReg = /^(13[4-9]|15(0|1|2|7|8|9))\d{8}$/;
    var vReg = /^1(3|4|5|8)\d{9}$/;
    return vReg.test(vStr);
}

String.prototype.isProof = function()
{
    var vStr = this.trim();
    var vReg = /^[\d]{8}\-0[\d]+\-[0-9a-fA-F]{6}$/;
    return vReg.test(vStr);
}

String.prototype.isIDCard = function()
{
    var vCid = this.trim();
    var vSum = 0;
    var vReg = /^([\d]{17}[xX\d]|[\d]{15})$/;
    var vCity = '|11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91|';
    
    if (!vReg.test(vCid)) return false;
    
    if(vCity.indexOf(parseInt(vCid.substr(0,2))) == '-1') return false;
    
    vCid = vCid.replace(/[xX]$/i, 'a');
    
    if (vCid.length == 18)
    {
        vBirthday = vCid.substr(6, 4) + '/' + Number(vCid.substr(10, 2)) + '/' + Number(vCid.substr(12, 2));
    } else {
        vBirthday = '19' + vCid.substr(6, 2) + '/' + Number(vCid.substr(8, 2)) + '/' + Number(vCid.substr(10, 2));
    }
    
    var vDate = new Date(vBirthday);
    
    if (vBirthday != (vDate.getFullYear() + '/' + (vDate.getMonth() + 1) + '/' + vDate.getDate())) return false;
    
    if (vCid.length == 18)
    {
        for(var i = 17 ; i >= 0 ; i--) vSum += (Math.pow(2, i) % 11) * parseInt(vCid.charAt(17 - i), 11);
        if(vSum % 11 != 1) return false;
    }
    
    return true;
}

String.prototype.isInt = function()
{
    var vStr = this.trim();
    var vReg = /^([1-9]+)([0-9]*)$/;
    return vReg.test(vStr);
}

String.prototype.isMoney = function()
{
    var vStr = this.trim();
    var vReg = /^\d+(\.\d{1,2})?$/;
    return vReg.test(vStr);
}

String.prototype.isEnglish = function()
{
    var vStr = this.trim();
    var vReg = /^[A-Za-z]+$/;
    return vReg.test(vStr);
}

String.prototype.isChinese = function()
{
    var vStr = this.trim();
    var vReg = /^[\u0391-\uFFE5]+$/;
    return vReg.test(vStr);
}

String.prototype.isCardNo = function()
{
    var vStr = this.trim();
    var vReg = /^[0-9A-Z]{2}[\d]{14}$/;
    return vReg.test(vStr);
}

String.prototype.isCardPwd = function()
{
    var vStr = this.trim();
    var vReg = /^[\d]{8,12}$/;
    return vReg.test(vStr);
}

String.prototype.isSzxCardNo = function()
{
    var vStr = this.trim();
    var vReg = /^[\d]{17}$/;
    return vReg.test(vStr);
}

String.prototype.isSzxCardPwd = function()
{
    var vStr = this.trim();
    var vReg = /^[\d]{18}$/;
    return vReg.test(vStr);
}

function changeVerifyCode(imgDom , width, height,complex) {
    
    var path =  "/servlet/simple/rand?rand=rand";
    if(complex){
        path = "/servlet/randimgservlet?rand=rand";
    }
    if(width>0){
        path += "&width="+ width;
    }
    if(height>0){
        path += "&height="+ height;
    }
    
    imgDom.src = path + "&r=" + Math.random();
}
function addHome()
{
    if (window.sidebar)
    {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e)
        {
            alert("您的浏览器不支持第三方【设为首页】功能，需手动设置，谢谢您的支持");
        }

        var prefs =  Components.classes["@mozilla.org/preferences-service;1"].getService( Components.interfaces.nsIPrefBranch );
        prefs.setCharPref("browser.startup.homepage",location.href);
    }
    else if(document.all)
    {
        document.body.style.behavior="url(#default#homepage)";
        document.body.setHomePage(location.href);
    }
    else
    {
        alert("您的浏览器不支持第三方【设为首页】功能，需手动设置，谢谢您的支持");
    }
}

//searchStr是用来记录搜索时的条件字符串的，生产格式如下：“&name=abc&id=1&pid=8”;
function tunePage(toPageNo, pageNo, searchStr) {
    try {
        if (searchStr != "null"&&searchStr.length>0) {
            //  alert("add_searchStr_pathname=" + window.location.pathname +"?pageNo="+ toPageNo + searchStr);
            window.location = window.location.pathname + "?p=" + toPageNo + searchStr;
        }
        else {
            var topage = 1;
            if (typeof(toPageNo) != "number" || toPageNo < 1) topage = 1;
            else topage = toPageNo;
            // olds是得到连接后面的条件，比如 xxx.do?name=abc 那么olds=?name=abc;
            var olds = window.location.search;
            //alert(olds);
            if (typeof(pageNo) == "undefined" || pageNo == "") pageNo = "p";
            var news = "";
            if (olds.length > 1) {
                olds = olds.substring(1, olds.length);
                var arrays = olds.split("&");
                for (var i = 0; i < arrays.length; i++)
                {
                    if (arrays[i].indexOf(pageNo + "=") < 0 && arrays[i].length > 1) {
                        news += "&" + arrays[i];
                    }
                }
                if (news.length > 1) {
                    news = "?" + news.substring(1, news.length) + "&" + pageNo + "=" + topage;
                }
                else {
                    news = "?" + pageNo + "=" + topage;
                }
            }
            else {
                news = "?" + pageNo + "=" + topage;
            }
            //alert("not--searchStr_pathname=" + window.location.pathname + " not--addsearchst_news=" + news);
            window.location = window.location.pathname + news;
        }
    }
    catch(e) {
        alert("catch...")
        window.location = window.location.pathname + window.location.search;
    }
}

function sendActiveMail(){
    
    var email = $("#bakemail").val();
    if(email=='' || email.length==0 || !email.isEmail()){
        
        $.alert("请输入有效的邮箱。");
        return;
    }
    $.post(ctx+"/mail", {email:email},function(data){
        
        if(data==0){
            
            $.alert({title:'提示', content:'邮件发送成功',ok:function(){
                //var dialog = $.dialog('email_dialog');
                //$('.btn',dialog.boxy).html('<a class="login" href="javascript:;"></a><a class="resend" href="javascript:;"></a>');
                location.href = ctx+"/mail?success";
            }, type:1});
        }else if(data==1){
            
            $.alert("您的账号已认证，请勿重复认证");
        }else if(data==2){
            
            $.alert("该邮箱已经认证了其他账号，请使用新的邮箱进行认证");
        }else{
            
            $.alert("邮件发送失败，请稍候重试");
        }
    });
}

function sendEmailDialog(email){
    var html = '<div class="email_dialog"><div class="infobox1">\
                            <p>注意：当您的账号通过邮箱认证后，平台所有服务邮件将会发送到您所认证的邮箱当中，请注意查收。</p>\
                            <p><input type="text" class="bakemail" id="bakemail" value="'+ email +'"/></p>\
                            <p class="btn"><a class="send" href="javascript:;" onclick="sendActiveMail()"></a><a class="latersend" href="javascript:;"></a></p></div>\
                            <div class="infobox2">\
                            <p>1. 若账号邮箱不存在或填写错误，建议您填写一个真实有效的邮箱，作为接收平台服务邮件的邮箱。</p>\
                            <p>2. 若网络传输较慢，您可能需要等待2~3分钟才能收到邮件。</p>\
                            <p>3. 若长时间未收到邮件，建议您检查垃圾邮件或重发认证邮件。</p></div></div>';
    var conf = {
        id: 'email_dialog',
        title: '认证您的账号',
        content: html
    };
    var el = $.dialog(conf);
    $('.latersend',el.boxy).click(function(){
        el.hide();
    });
}

function getForwardContent(feed, nickname){
    return '<div class="forward_dialog">\
                <div class="topic">'+ feed +'</div>\
                <div class="c_pub">\
                    <div class="kind">\
                        <span class="counter">150</span>\
                        <a href="#" class="face"></a>\
                    </div>\
                    <div class="input"><textarea name="content"></textarea>\
                    </div>\
                    <div class="btn"><input type="submit" value=""></div>\
                    <div class="opt"><label><input type="checkbox" name="isReply"/>同时评论给 '+ nickname +'</label></div>\
                </div>\
            </div>';
}

function feedZan(btn){
    
    var $item = $(btn).closest("div._feed_item");
    var $feed = $item.find("._feed");
    var feedId = $feed.attr("fid");
    $.post(ctx + "/u/feed?zan",{feedId:feedId},function(data){
        
        if(data==0){
            $zanCount = $(btn).find(".zanCount");
            $zanCount.html(parseInt($zanCount.html())+1);
            $(btn).removeAttr("onclick");
        }
    });
    
}


function forwardDialog(btn){
    var $item = $(btn).closest("div._feed_item");
    var $feed = $item.find("._feed");
    var orgFeedId = $feed.attr("fid");
    var content = $feed.html();
    var nickname = $item.find(".nick").html();

    var conf = {
        title: '转发',
        content: getForwardContent(content, nickname),
        afterShow: function(){
            var r = this.getInner();
            var tp = $('.topic',r);
            if(tp.height() >= 200){
                tp.css({'height':200,'overflow-y':'auto'});
            }
            $('textarea',r).maxlength({counter:$('.counter',r)});
            $('.face',r).click(function(event){
                $.insertEmotion(event,$('textarea',r).get(0));
            });
        },
        onSubmit: function(){
            //alert(0)
            $this = this;
            //alert($("input[name=isReply][checked]", this.getInner()).val());
            //return;
            var $freshTextarea = $("textarea", this.getInner());
            var fresh = $.trim($freshTextarea.val());
            if(fresh==""){

                $.alert({title:'提示', content:'转发评论不能为空',ok:function(){
                    $freshTextarea.focus();
                }, type:1});
                return ;
            }
            
            var params = {};
            params.content = fresh;
            params.orgFeedId = orgFeedId;
            params.isReply = ($("input[name=isReply]", this.getInner()).attr("checked")!=undefined);

            //alert($.param(params, true));
            //return;
            
            $.post(ctx + "/u/feed?tran",$.param(params, true),function(data){
                
                if(data == "null"){
                    $.alert({title:'提示', content:'转发评论不能为空',ok:function(){
                        $freshTextarea.focus();
                    }, type:0});
                }else if(data == "toolong"){
                    $.alert({title:'提示', content:'转发评论超过了150字',ok:function(){
                        $freshTextarea.focus();
                    }, type:0});
                }else{
                    //prependFresh(data);
                    //$freshTextarea.defText();
                    $this.hide();
                    $.alert({title:'提示', content:'转发成功！',ok:function(){
                        
                        location.href = location.href;
                    }, type:1});
                }
            });
        }
    };
    $.dialog(conf);
}

function delFeed(feedId){
    $.confirm({
        title:'删除信息',
        content:'确定删除该信息？',
        ok:function(){
            
            $.post(ctx+"/u/feed?method=del",{feedId:feedId},function(ret){
                
                $.alert({title:'提示', content:'删除成功！',ok:function(){
                    
                    location.href = location.href;
                }, type:1});
            });
        }
    });
    
}
function delReply(replyId){
    $.confirm({
        title:'删除回复',
        content:'确定删除该回复？',
        ok:function(){
            
            $.post(ctx+"/u/feed/reply?method=del",{replyId:replyId},function(ret){
                
                $.alert({title:'提示', content:'删除成功！',ok:function(){
                    
                    location.href = location.href;
                }, type:1});
            });
        }
    });
    
}

function delFriend(uid){
    
    $.confirm({
        title:'删除好友',
        content:'确定删除该好友？',
        ok:function(){
            
            $.post(ctx+"/u/f/del", {to:uid}, function(data){
                
                location.reload();
            });
        }
    });
}

function selectGroupPop(elem){
    
    $.get(ctx+"/u/fg/pop",{_:new Date().getTime()},function(html){
        var conf = {
            content: html,
            show: false,
            afterShow: function(){
                var r = this.getInner();
                var self = this;
                
                var oldGroupId = $(elem).attr("groupId");
                $("input[value="+ oldGroupId +"]", r).attr("checked", "checked");
                
                $('.btn_cancel',r).click(function(){
                    self.hide();
                });
                $('.btn_comfirm',r).click(function(){
                    
                    var groupId = $(':checked',r).val();
                    var friendId = $(elem).attr("friendId");
                    if(groupId == undefined){
                        
                        alert("请选择分组");
                        return;
                    }
                    $.post(ctx+"/u/f/cg", {groupId:groupId, friendId:friendId},function(data){
                        
                        location.reload();
                    });
                });
            }
        }
        var dialog = $.dialog(conf);
        dialog.boxy.css({
            'left': elem.offset().left,
            'top': elem.offset().top + elem.height()
        });
        dialog.show();
    });
}
function addGroup(btn){
    var $name = $(btn).closest(".group_dialog").find(":text");
    var name = $.trim($name.val());
    if(name.length==0 || name.length>8){
        
        alert("分组名称应为1~8个字符");
        $name.focus();
        return;
    }
    $.post(ctx+"/u/fg/add",{name:name},function(data){
        
        if(data == -2){
            
            alert("名称重复");
        }else{
            
            location.reload();
        }
    });
}
function addGroupDialog(){
    var conf = {
        title: '添加分组',
        content: '<div class="group_dialog">\
                            <input type="text" class="d_txt">\
                            <input type="button" class="d_btn" value="新建" onclick="addGroup(this)">\
                          </div>'
    };
    $.dialog(conf);
}
function editGroupDialog(){

    $.get(ctx+"/u/fg/edit",{_:new Date().getTime()},function(html){
        
        var conf = {
                title: '编辑分组',
                content: html,
                afterShow: function(){
                    var w = this.getInner();
                    glah(w)
                    bindEditEvent();
                }
            };
            $.dialog(conf);
    });
}

function bindEditEvent(){
    
    var elem = $('.group_dialog');
    var lst = $('.grouplist',elem);
    var editor_html = '<li><input type="text" class="d_txt"><input type="button" class="d_btn btn_submit" value="确定"><input type="button" class="d_btn btn_cancel" value="取消"></li>';
    var editor;
    function removeEditor(){
        if(editor){
            editor.next('li').show();
            editor.remove();
            editor = null;
        }
    }
    function createEditor(li){
        removeEditor();
        editor = $(editor_html).insertBefore(li);
        editor.unbind('click').bind('click',function(event){event.stopPropagation()});
        
        var orgtxt = li.find('span').text();
        editor.find(':text').val(orgtxt);
        editor.find('li').attr("groupId", li.attr("groupId"));
        li.hide();
        $('.btn_cancel',editor).unbind('click').bind('click',function(){
            removeEditor();
        });
        $('.btn_submit',editor).unbind('click').bind('click',function(){
            var txt = editor.find(':text');
            var li = editor.next('li');
            if($.trim(txt.val())==orgtxt){
                removeEditor();
                return;
            }
            //alert(li.attr("groupId")); return;
            $.post(ctx+"/u/fg/add",{name:txt.val(), groupId:li.attr("groupId")},function(data){
                
                if(data == -2){
                    
                    alert("名称重复");
                }else{
                    li.find('span').text(txt.val());
                    li.show();
                    removeEditor();
                }
            });
        });
    }
    elem.on('click',function(){
        removeEditor();
    });
    //新建
    elem.on('click','.addgroup :button',function(){
        
        var $name = $(this).closest(".addgroup").find(":text");
        var name = $.trim($name.val());
        if(name.length==0 || name.length>8){
            
            alert("分组名称应为1~8个字符");
            $name.focus();
            return;
        }
        $.post(ctx+"/u/fg/add",{name:name},function(data){
            
            if(data == -2){
                
                alert("名称重复");
            }else{
                
                var li = $('<li groupId="'+ data +'"><span>'+ name +'</span><a href="#" class="edit">修改</a><a href="#" class="del">删除</a></li>');
                li.appendTo(lst);
                glah(elem);
                $name.val('');
            }
        });
    });
    //修改
    elem.on('click','.grouplist .edit',function(){
        createEditor($(this).closest('li'))
        return false;
    });
    //删除
    elem.on('click','.grouplist .del',function(event){
        event.preventDefault();
        var li = $(this).closest('li');
        $.post(ctx+"/u/fg/del",{groupId:li.attr("groupId")},function(data){
            
            li.remove();
        });
    });
}

function glah(){
    var lst = $('.grouplist');
    if(lst.find('li').size() > 10){
        lst.css({'height': 300,'overflow-y': 'auto'});
    }else {
        lst.css({'height': 'auto'});
    }
}
/************************************************************************/
/*                               custom.js                              */
/************************************************************************/
//searchStr是用来记录搜索时的条件字符串的，生产格式如下：“&name=abc&id=1&pid=8”;
function _redireactPage(toPageNo, pageNo, uri, searchStr) {
    var topage = 1;
    if (typeof toPageNo == "string") {
        try {
            toPageNo = parseInt(toPageNo);
        } catch (_e) {
        }
    }
    if (typeof(toPageNo) != "number" || toPageNo < 1) topage = 1;
    else topage = toPageNo;

    try {
        if (searchStr != "null" && searchStr.length > 0) {
            window.location = uri + "?pageNo=" + topage + searchStr;
        }
        else {
            window.location = uri + "?pageNo=" + topage;
        }
    }
    catch (e) {
        window.location = uri + "?pageNo=1";
    }
}


/**
 * 将ajax内容装入jquery selector
 *
 * @param url
 * @param $target
 * @param type
 *            0 装载内容 1 替换内容
 * @return
 */
function _renderUrl(url, selector, type, fn) {
    $(selector).html(
        '<img src="/images/loading.gif" />');
    $.ajax({
        url: url,
        cache: false,
        success: function (html) {
            if (html == "0") { //
                alert("您访问的页面已经不存在。");
                return;
            }
            if (!type || type == 0) {
                $(selector).empty().append(html);
            } else
                $(selector).replaceWith(html);

            if (fn) {
                fn();
            }
        },
        error: function () {
            alert("您访问的页面出错，请稍后再试。");
        }
    });
}
//// searchStr是用来记录搜索时的条件字符串的，生产格式如下：“&name=abc&id=1&pid=8”;
//function tunePage(toPageNo, pageNo, searchStr) {
//  try {
//      if (searchStr != "null"&&searchStr.length>0) {
//          //  alert("add_searchStr_pathname=" + window.location.pathname +"?pageNo="+ toPageNo + searchStr);
//          window.location = window.location.pathname + "?pages=" + toPageNo + searchStr;
//      }
//      else {
//          var topage = 1;
//          if (typeof(toPageNo) != "number" || toPageNo < 1) topage = 1;
//          else topage = toPageNo;
//          // olds是得到连接后面的条件，比如 xxx.do?name=abc 那么olds=?name=abc;
//          var olds = window.location.search;
//          //alert(olds);
//          if (typeof(pageNo) == "undefined" || pageNo == "") pageNo = "pages";
//          var news = "";
//          if (olds.length > 1) {
//              olds = olds.substring(1, olds.length);
//              var arrays = olds.split("&");
//              for (var i = 0; i < arrays.length; i++)
//              {
//                  if (arrays[i].indexOf(pageNo + "=") < 0 && arrays[i].length > 1) {
//                      news += "&" + arrays[i];
//                  }
//              }
//              if (news.length > 1) {
//                  news = "?" + news.substring(1, news.length) + "&" + pageNo + "=" + topage;
//              }
//              else {
//                  news = "?" + pageNo + "=" + topage;
//              }
//          }
//          else {
//              news = "?" + pageNo + "=" + topage;
//          }
//          //alert("not--searchStr_pathname=" + window.location.pathname + " not--addsearchst_news=" + news);
//          window.location = window.location.pathname + news;
//      }
//  }
//  catch(e) {
//      alert("catch...")
//      window.location = window.location.pathname + window.location.search;
//  }
//}


//searchStr是用来记录搜索时的条件字符串的，生产格式如下：“&name=abc&id=1&pid=8”;
function _tunePage(toPageNo, pageNo, uri, selector, searchStr) {
    var topage = 1;
    if (typeof toPageNo == "string") {
        try {
            toPageNo = parseInt(toPageNo);
        } catch (_e) {
        }
    }
    if (typeof(toPageNo) != "number" || toPageNo < 1) topage = 1;
    else topage = toPageNo;

    try {
        if ("" != selector) {
            if (searchStr != "null" && searchStr.length > 0) {
                //  alert("add_searchStr_pathname=" + window.location.pathname +"?pageNo="+ toPageNo + searchStr);
                //window.location = window.location.pathname + "?pageNo=" + toPageNo + searchStr;
                _renderUrl(uri + "?pageNo=" + topage + searchStr , selector, 0);
            }
            else {
                _renderUrl(uri + "?pageNo=" + topage, selector, 0);
            }
        } else {
            window.location = uri + "?pageNo=" + topage + searchStr ;
        }
    }
    catch (e) {
        // window.location = window.location.pathname + window.location.search;
        _renderUrl(uri + "?pageNo=", selector, 0);
    }
}
(function ($) {
    //ajax装载一个页面到该对象中
    $.fn.renderUrl = function (options) {
        var defaults = {
            replace: false,
            params: {},
            url: "",
            fn: function () {

            }
        }
        var options = $.extend(defaults, options);
        this.each(function () {
            if (options.url) {
                var thisContainer = $(this);
                thisContainer.html('<img src="' + ctx + '/images/loading.gif" />.');
                $.ajax({
                    url: options.url,
                    data: options.params,
                    cache: false,
                    success: function (html) {
                        if (html == "0") { //
                            alert("您访问的页面已经不存在。");
                            thisContainer.empty();
                            return;
                        }
                        if (!options.replace) {
                            thisContainer.empty().append(html);
                        } else {
                            thisContainer.replaceWith(html);
                        }
                        if (options.fn) {
                            options.fn();
                        }
                    },
                    error: function () {
                        alert("您访问的页面出错，请稍后再试。");
                    }
                });
            }
        });
    };
    //装载select的选项
    $.fn.loadSelect = function (options) {
        var defaults = {
            headValue: "", //默认的一个选项的值 eg 0
            headText: "",//默认的一个选项的文本 eg 请选择
            data: null, //select中需要填充的数据，如果提供了该数据，则直接将这个数据填充到色了传统中，若未提供，则根据url去取
            params: {},//用于获得select中数据的地址
            url: "",//用于获得select中数据的地址
            value: 'key', //取json数据data中，用于表示option的value属性的标示
            text: 'value',//取json数据data中，用于表示option的text属性的标示
            defaultValue: '',//默认被选中的值
            changeFn: null,//change事件
            fn: null//装载完以后调用的回调函数
        };
        options = $.extend(defaults, options);
        var _loadSelectByData = function (selectDom, data) {
            if (data) {
                selectDom.options.length = "0";
                if (options.headText) {
                    var optionDom = document.createElement("option");
                    optionDom.value = options.headValue;
                    optionDom.innerHTML = options.headText;
                    selectDom.appendChild(optionDom);
                }
                //处理返回来的服务器列表
                if (data.length) {
                    for (var i = 0; i < data.length; i++) {
                        var optionDom = document.createElement("option");
                        optionDom.value = data[i][options.value];
                        optionDom.innerHTML = data[i][options.text];
                        selectDom.appendChild(optionDom);
                    }
                } else {
                    $.each(data, function (k, v) {
                        var optionDom = document.createElement("option");
                        optionDom.value = k;
                        optionDom.innerHTML = v;
                        selectDom.appendChild(optionDom);
                    });
                }
                if (options.defaultValue) {
                    $(selectDom).val(options.defaultValue);
                }
                if (options.changeFn) {
                    $(selectDom).change(function () {
                        options.changeFn(this);
                    });
                }
                if (options.fn) {
                    options.fn(selectDom);
                }
            }
        };
        this.each(function () {
            var selectDom = this;
            if (options.data) {
                _loadSelectByData(this, options.data);
                return;
            }
            if (options.url) {
                $.ajax({
                    url: options.url,
                    data: options.params,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        _loadSelectByData(selectDom, data);
                    },
                    error: function () {
                        alert("页面出错");
                    }
                });
            }
        });
        return this;

    };
    //装载checkbox的选项
    $.fn.loadCheckbox = function (options) {
        var defaults = {
            headValue: "", //默认的一个选项的值 eg 0
            headText: "",//默认的一个选项的文本 eg 请选择
            data: null, //select中需要填充的数据，如果提供了该数据，则直接将这个数据填充到色了传统中，若未提供，则根据url去取
            params: {},//用于获得select中数据的地址
            url: "",//用于获得select中数据的地址
            value: 'key', //取json数据data中，用于表示option的value属性的标示
            text: 'value',//取json数据data中，用于表示option的text属性的标示
            classname: 'mycheckbox',// checkbox的样式
            name: 'mycheckboxname',// checkbox的样式
            changeFn: null,//change事件
            checkFun: function (value, text) {
                return false;
            },//判断是否选中事件
            fn: null//装载完以后调用的回调函数
        };
        options = $.extend(defaults, options);
        var _loadSelectByData = function (container, data) {
            var $container = $(container);
            $container.html("");
            if (options.headValue && options.headText) {
                $container.append(_loadCheckbox(options.headValue, options.headText));
                $container.append(options.headText);
            }
            if (data) {
                //处理返回来的服务器列表
                if (data.length) {
                    for (var i = 0; i < data.length; i++) {
                        $container.append(_loadCheckbox(data[i][options.value], data[i][options.text]));
                        $container.append(data[i][options.text]);
                    }
                } else {
                    $.each(data, function (k, v) {
                        $container.append(_loadCheckbox(k, v));
                        $container.append(v);
                    });
                }
                if (options.changeFn) {
                    $($container).change(function () {
                        options.changeFn(this);
                    });
                }
                if (options.fn) {
                    options.fn($container);
                }
            }
        };
        var _loadCheckbox = function (value, text) {
            var htm = '<input class="' + options.classname + '" type="checkbox"';
            htm += ' name="' + options.name + '"';
            htm += ' value="' + value + '"';
            if (options.checkFun(value, text)) {
                htm += ' checked="checked"';
            }
            htm += '/>';
            var $chk = $(htm);
            if (options.changeFn) {
                $chk.change(function () {
                    options.changeFn(this);
                });
            }
            return $chk;
        }
        this.each(function () {
            var selectDom = this;
            if (options.data) {
                _loadSelectByData(this, options.data);
                return;
            }
            if (options.url) {
                $.ajax({
                    url: options.url,
                    data: options.params,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        _loadSelectByData(selectDom, data);
                    },
                    error: function () {
                        alert("页面出错");
                    }
                });
            }
        });
        return this;

    };
    //下拉框搜索
    $.fn.comboSelect = function (options) {
        var defaults = {
            emptyText: "No Record",//默认没有搜索到结果的提示信息,
            url: "",//搜索请求的地址
            keyword: "key", //搜索时关键字变量名
            value: 'key', //取json数据data中，用于表示option的value属性的标示
            text: 'value',//取json数据data中，用于表示option的text属性的标示
            currentText: "",
            currentValue: ""
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            var selectDom = this;
            var $this = $(this);
            var curId = $this.attr("id");
            var $div = $("<div id='" + curId + "_' style='display:none;'></div>");
            $this.wrap($div);
            var $topDiv = $("<div class='suggest_box ' id='" + curId + "_top' >"
                + "<div class='suggest_item' style='display:none'>"
                + "<span class='bg'>"
                + "<span class='name'></span>"
                + "<span class='del'>x</span>"
                + "</span>"
                + "</div>"
                + "<div class='suggest_text' >"
                + "<input type='text' id='" + curId + "fid' style='margin-top:-2px; '/>"
                + "</div>"
                + "<div class='suggest_list SelectMenu' style='display:none'></div>"
                + "</div>");
            $("#" + curId + "_").replaceWith($topDiv.append($("#" + curId + "_").clone()));
            var $t = $("#" + curId + "_top");
            var isFill = false, index = 0, isarr = 0;

            var input = $t.find(".suggest_text input");
            var list = $t.find(".suggest_list");
            input.bind({
                "click": function (event) {
                    event.stopPropagation();
                },
                "focus": function () {
                    if (isFill) {
                        this.blur();
                        return
                    }
                    _searchFriends();
                    //list.html("请输入用户昵称").show()
                },
                "keyup": function (event) {
                    if (isFill) {
                        return
                    }
                    if (event.keyCode == 40 || event.keyCode == 38) {
                        return;
                    }
                    _searchFriends();
                },
                "keydown": function (event) {
                    switch (event.keyCode) {
                        case 40://down
                            if (isarr) {
                                if (index >= lis.length - 1) {
                                    index = 0;
                                } else {
                                    index++;
                                }
                                lis.removeClass("selected");
                                lis.eq(index).addClass("selected");
                            }
                            break;
                        case 38://up
                            if (isarr) {
                                if (index <= 0) {
                                    index = lis.length - 1;
                                } else {
                                    index--;
                                }
                                lis.removeClass("selected");
                                lis.eq(index).addClass("selected");
                            }
                            break;
                        case 13://enter
                            if (isarr) {
                                isFill = true;
                                var sel = lis.eq(index)
                                $t.find(".suggest_item .name").html(sel.html());
                                $t.find(".suggest_item").show();
                                $t.find(".suggest_text").hide();//隐藏输入框
                                this.value = "";
                                list.hide();
                                $("#" + curId).val(sel.attr("userId"));
                                $("#" + curId + "fid").val("");
                            }
                            break;
                        case 8://backspace
                            if (isarr) {
                                $t.find(".suggest_item").hide();
                                isFill = false;
                            }
                            $("#" + curId).val("");
                            break;
                    }
                }
            });
            if (options.currentText && options.currentValue) {
                $t.find(".suggest_text").hide();
                $t.find(".suggest_item .name").html(options.currentText);
                $t.find(".suggest_item").show();
                $("#" + curId).val(options.currentValue);
            }

            $t.find(".suggest_item .del").click(function () {
                $t.find(".suggest_item").hide();
                $t.find(".suggest_text").show();//显示输入框
                input.get(0).focus();
                isFill = false;
                $("#" + curId).val("");
            })
            $("html").click(function () {
                list.hide();
            });

            var _fri_search_obj = {};

            function _searchFriends() {
                var keyword = $.trim($("#" + curId + "fid").val());
                if (_fri_search_obj && _fri_search_obj[keyword]) {
                    _refreshFriListDiv(_fri_search_obj[keyword]);
                } else {
                    var params = new Object();
                    params['r'] = Math.random();
                    params[options.keyword] = keyword;
                    $.ajax({
                        url: options.url,
                        data: params,
                        dataType: 'json',
                        beforeSend: function () {
                        },
                        success: function (data) {
                            if (data) {
                                _fri_search_obj[keyword] = data;
                                _refreshFriListDiv(data);
                            }
                        }
                    });
                }
            }

            function _refreshFriListDiv(friJson) {
                var html = [], v = this.value;
                var hasFriend = false;
                $.each(friJson, function (i) {
                    var e = this;
                    hasFriend = true;
                    html.push('<li userId="' + e[options.value] + '">' + e[options.text] + '</li>')
                    //var self=this;
                    list.html('<ul>' + html.join("\n") + '</ul>').show();
                    index = 0;
                    list.find("li:first").addClass("selected");
                    lis = list.find("li");
                    lis.bind({
                        "mouseover": function () {
                            lis.removeClass("selected");
                            $(this).addClass("selected");
                            index = $(this).index();
                        },
                        "click": function () {
                            isFill = true;
                            $t.find(".suggest_item .name").html($(this).html());
                            $t.find(".suggest_item").show();
                            $t.find(".suggest_text").hide();//隐藏输入框
                            //self.value="";
                            $("#" + curId).val($(this).attr("userId"));
                            $("#" + curId + "fid").val("");
                        }
                    })
                });
                if (!hasFriend) {
                    list.html(options.emptyText).show();
                    isarr = false;
                    return;
                } else {
                    isarr = 1;
                }
            }

        });
    };
    //下拉框搜索
    $.fn.cascadeSelect = function (options) {
        var defaults = {
            url: "",
            pidName: "pId",
            path: "",
            value: "key",
            text: "value",
            childrenSizeName: "childrenSize",
            headValue: "", //默认的一个选项的值 eg 0
            headText: "",//默认的一个选项的文本 eg 请选择
            leafChangeFn: function () {
            }
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            _initSelect(this);
        });

        function _initSelect(topDom, pDptid) {
            var $sel = $(topDom)
            var topDpt = $sel.attr("id");
            if (!topDpt) {
                topDpt = "_";
            }
            var params = {};
            if (pDptid) {
                params[options.pidName] = pDptid;
            }
            $.ajax({
                url: options.url,
                data: params,
                dataType: "json",
                cache: false,
                success: function (data) {
                    //$sel.get(0).length = 0;
                    var _cVal = "0";
                    for (var i = 0; i < data.length; i++) {
                        var $opt = $("<option></option>")
                        $opt.val(data[i][options.value]);
                        if (options.path) {
                            if (options.path.indexOf("," + data[i][options.value] + ",") != -1) {
                                _cVal = data[i][options.value];
                            }
                        }
                        $opt.text(data[i][options.text]);
                        $opt.attr("cldCnt", data[i][options.childrenSizeName]);
                        $sel.append($opt);
                    }
                    $sel.change(function () {
                        $("select[id^='" + topDpt + "_']").remove();
                        var $this = $(this);
                        var $opt = $this.find("option:selected");
                        if ($opt.attr("cldCnt") > 0) {
                            var $cSelct = $("<select id='" + topDpt + "_' ><option value='" + options.headValue + "'>" + options.headText + "</option></select>");
                            $this.after("&nbsp;&nbsp;");
                            $this.after($cSelct);
                            _initSelect($("#" + topDpt + "_").get(0), $this.val());
                        } else {
                            options.leafChangeFn(this);
                            options.path = "";
                        }
                    });
                    if (options.path && _cVal && _cVal != "0") {
                        $sel.val(_cVal);
                        $sel.change();
                    }
                    //$sel.change();
                },
                error: function () {
                    alert("您访问的页面出错，请稍后再试。");
                }
            });
        }
    };

})(jQuery);

/************************************************************************/
// /*                          通用交互js方法                              */========================================================================================
/************************************************************************/
var thisDom;
var winHeight;
var winWidth;
var docHeight;
var docWidth;
var winScrollTop;
var usercenterLeftTop;
var lookAtLeftTop;
var rankNavTop;
var smallTopicBoxTop;
var homepageTopicLabelTop;
var domain='http://imageqiniu.xxxxxbbs.com/';//图片服务器域名
var vdomain='http://videoqiniu.xxxxxbbs.com/';//视频服务器域名
var imgCommentCount=0;
// 判断设备类型
var browser={  
    versions:function(){   
           var u = navigator.userAgent; 
           return {//移动终端浏览器版本信息   
                trident: u.indexOf('Trident') > -1, //IE内核  
                presto: u.indexOf('Presto') > -1, //opera内核  
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                android: u.indexOf('Android') > -1, //|| u.indexOf('Linux') > -1, //android终端或者uc浏览器  
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
                iPad: u.indexOf('iPad') > -1, //是否iPad    
                webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部  
                ie10:u.indexOf('MSIE')>-1,
                ie11:u.indexOf('rv:11')>-1
            };  
         }(),  
         language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}
//m和pc的跳转
var threadURL=window.location.href;
var threadID=parseInt(threadURL.match(/\d+(\.\d+)?/g));
var prefix = 'http://www.xxxxxbbs.com/thread/';
var indexFix='xxxxxbbs.com/index';
var isThreadInfo = (threadURL.slice(0, prefix.length) == prefix);
if(browser.versions.android || browser.versions.iPhone || browser.versions.iPad){
     if(isThreadInfo){
       window.location.href="http://m.xxxxxbbs.com/th/info?id="+threadID;
     }
     else if(threadURL.indexOf(indexFix)>=0){
         window.location.href="http://m.xxxxxbbs.com/index";
     }
}
//自动创建超链接
function delHtmlTag(str) 
{ 
   return str.replace(/<[^>]+>/g,"");//去掉所有的html标记 
} 
function linkAutoCreate(thisArea){
      var s=thisArea.html();      
      var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&amp;|-)+)/g;
     //var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      var reg=/\[URL=(.[^\[]*)\](.*?)\[\/URL\]/ig;
      s=s.replace(re,"<a href='$1$2' target='_blank'>$1$2</a>");
      thisArea.html(s);
      thisArea.find("a").each(function(index, element) {
        var html=thisArea.html();
        html=html.replace("&nbsp;","");
        html=html.replace("&amp;","&");
        thisArea.html(html);
        thisArea.attr("href",html);
      });

      var s1=thisArea.html();
      s1= s1.replace(reg,function ($1){
        var v1=delHtmlTag($1);
        var reg1=/\[URL=(.[^\[]*)\](.*?)\[\/URL\]/ig;
        v1=v1.replace(reg1,"<A HREF=$1 TARGET='_blank' class='toBuy'>$2</A>");
            return v1;
      });
      thisArea.html(s1)
}
//图片加载
function imgLoad(){
    $(".onload-img").load(function() {
        $(this).prev('.loading-img').fadeOut(200, function() {
            $(this).next('.onload-img').fadeIn(200);
            $(this).remove();
        });
    });
}
//侧边栏定位
function sideBar(){
    var bodyHeight=$("body").height();
    var winHeight=$(window).height();
    var winWidth=$(window).width();
    var scrollTop=$(document).scrollTop();
    if(scrollTop>=bodyHeight-winHeight-236){//侧边栏定位
        $(".side-bar").css("bottom",winHeight+scrollTop+256-bodyHeight);
    }
    else{
        $(".side-bar").css("bottom","20px");
    }
    if(scrollTop>0){//显示-隐藏滚动到顶部按钮
        $(".side-bar").find('.go-top').removeClass('go-top-hidden');  
    }
    else{
       $(".side-bar").find('.go-top').addClass('go-top-hidden');  
    }
    if(winWidth<=1170){//窗口宽度变化侧栏水平位置
        $(".side-bar").css({
            "opacity":"0.5",
            "right":"0px"
        }); 
        $(".side-bar").mouseenter(function(event) {
            $(this).css("opacity","1");
        });  
        $(".side-bar").mouseleave(function(event) {
            $(this).css("opacity","0.5");
        });  
    }else{
        $(".side-bar").css({
            "opacity": "1",
            "right": "auto"
        }); 
        $(".side-bar").mouseenter(function(event) {
            $(this).css("opacity","1");
        });  
        $(".side-bar").mouseleave(function(event) {
            $(this).css("opacity","1");
        });       
    }
}
//站内信息推送
function remind() {
    var isUserCenter;
    if((window.location.href).indexOf(/center/)>=0){
        isUserCenter=true;
    }else{
        isUserCenter=false;
    }
    $.ajax({
        type: 'GET',
        url: '/userremind',
        success: function (data) {
            if (null != data && 0 != data.length) {
                //推送消息总数 
                if ((data.remind.newmessagesystemcount + data.remind.newmessagereceivedcount+data.remind.newcommentcount+data.remind.newpraisecount+data.remind.newfinscount) > 0) {
                    var totalNum = parseInt(data.remind.newmessagesystemcount) + parseInt(data.remind.newmessagereceivedcount) + parseInt(data.remind.newcommentcount) + parseInt(data.remind.newpraisecount) + parseInt(data.remind.newfinscount);
                    if (totalNum > 99) {
                        totalNum = "99+"
                    }
                    $("#header").find('.header-username').append('<i class="remind-light">'+totalNum+'</i>');
                    $("#header").find('.remind-light').css("top","12px");
                    // 消息中心总数
                    if ((data.remind.newmessagesystemcount + data.remind.newmessagereceivedcount+data.remind.newcommentcount+data.remind.newpraisecount) > 0){
                        var infoNum = parseInt(data.remind.newmessagesystemcount) + parseInt(data.remind.newmessagereceivedcount) + parseInt(data.remind.newcommentcount) + parseInt(data.remind.newpraisecount); 
                        $("#header").find('.user-info-list .list-info').find('a').append('<i class="remind-light">'+infoNum+'</i>');
                        if(isUserCenter==true){
                            $(".usercenter-left").find('.nav-info').append('<i class="remind-light">'+infoNum+'</i>');
                        }
                        if (0 < data.remind.newmessagesystemcount) {
                            var sysCount=data.remind.newmessagesystemcount;
                            if(sysCount>99){
                                sysCount='99+';
                            }
                            if(isUserCenter==true){
                                $('.info-sysinfo').append('<i class="remind-light">'+sysCount+'</i>');
                            }
                        }
                        if (0 < data.remind.newmessagereceivedcount) {
                            var privateCount=data.remind.newmessagereceivedcount;
                            if(privateCount>99){
                                privateCount='99+';
                            }
                            if(isUserCenter==true){
                                $('.info-private').append('<i class="remind-light">'+privateCount+'</i>');
                            }
                        }
                        if (0 < data.remind.newcommentcount) {
                            var commentCount=data.remind.newcommentcount;
                            if(commentCount>99){
                                commentCount='99+';
                            }
                            if(isUserCenter==true){
                                $('.info-comment').append('<i class="remind-light">'+commentCount+'</i>');
                            }
                        }
                        if (0 < data.remind.newpraisecount) {
                            var praiseCount=data.remind.newpraisecount;
                            if(praiseCount>99){
                                praiseCount='99+';
                            }
                            if(isUserCenter==true){
                                $('.info-praise').append('<i class="remind-light">'+praiseCount+'</i>');
                            }
                        }
                    }
                    //粉丝数
                    if (0 < data.remind.newfinscount) {
                        var fansCount=data.remind.newfinscount;
                        if(fansCount>99){
                            fansCount='99+';
                        }
                        $("#header").find('.user-info-list .friend-info').find('a').append('<i class="remind-light">'+fansCount+'</i>');
                        if(isUserCenter==true){
                            $(".usercenter-left").find('.nav-friend').append('<i class="remind-light">'+fansCount+'</i>');
                        }
                    } 
                }
            }
        }
    });
}
//搜索关键字
function searchkey() {
    var regs=new RegExp("\\(","g");
    var regs1=new RegExp("\\)","g");
    var key001 = $("#keyword001").val();
    key001=key001.replace(regs,"（");
    key001=key001.replace(regs1,"）");
    if (!($.trim(key001).length != 0 && key001 != "搜索帖子、用户")) {
        key001=$("#keyword002").val();
    }
    if ($.trim(key001).length != 0 && key001 != "搜索帖子、用户") {
        window.location.href = "/search/thread?keyword=" + key001;
    }

}

//页脚始终置于底部的方法
function footerBottom(){
	winHeight=parseInt($(window).height());
	winWidth=parseInt($(window).width());
	docHeight=parseInt($("body").height());
	docWidth=parseInt($("body").width());
	winScrollTop=parseInt($(document).scrollTop());
	if(winHeight>docHeight){
		$("#container").css({
            "height":winHeight-388+"px",
            "min-height":"720px"
        });
        //$(".interest-list").css("height",winHeight-388+"px");
	}
}
//定义选题标签颜色
function topicColor(){
    $(".topic-lab").each(function (index, element) {
        var topicName = $(this).text();
        if (topicName == "秀最新/NB装备") {
            $(this).css("background", "#2e4b6b");
            return;
        }
        if (topicName == "我最美") {
            $(this).css("background", "#ff68c8");
            return;
        }
        if (topicName == "妹子也会玩") {
            $(this).css("background", "#3eb7c9");
            return;
        }
        if (topicName == "我是大玩家") {
            $(this).css("background", "#729c5c");
            return;
        }
        if (topicName == "有钱人怎么玩") {
            $(this).css("background", "#343434");
            return;
        }
        if (topicName == "比谁倒霉") {
            $(this).css("background", "#ef2f2f");
            return;
        }
        if (topicName == "全球游记") {
            $(this).css("background", "#85a5c7");
            return;
        }
        if (topicName == "最爱慢镜头") {
            $(this).css("background", "#d07721");
            return;
        }
        if (topicName == "大神经验分享") {
            $(this).css("background", "#d6c23b");
            return;
        }
        if (topicName == "三维视角的生活") {
            $(this).css("background", "#2175d0");
            return;
        }
        if (topicName == "拍的漂亮") {
            $(this).css("background", "#67a7a6");
            return;
        }
        if (topicName == "帮帮忙") {
            $(this).css("background", "#676767");
            return;
        }
    });
}
//字数判定方法
function charCount(len,v){
	thisValue=thisDom.val();
	len = 0;
	v = $.trim(thisValue);
	for(i=0;i<v.length;i++)	{
		if(v.charCodeAt(i)>256)	{
			len += 2;
		} else {
			len++;
		}
	}
	thisLength=len;
}
//自定义弹出对话框
function dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok){
	var html='<div class="dialog-layer">'+
				'<div id="dialog">'+
					'<p></p>'+
					'<div class="button-box"><a href="javascript:;" class="cancel">取消</a> <a href="javascript:;" class="confirm"></a></div>'+
				'</div>'+
			'</div>';
	$('body').prepend(html);
    $('body').addClass('body-overlay');
	$(".dialog-layer").fadeIn(200);
	$("#dialog").find('p').text(content);
	$("#dialog").find('.confirm').text(confirmText);
	$("#dialog").find('.confirm').css({
		'background':confirmBackground,
		'border-color':confirmBackground
	});
	$("#dialog").find('.cancel').css('display',cancelDisplay);
	$("#dialog").css({
		'top': dialogTop+'px'
	});
	$("body").off("click","#dialog .confirm").on("click","#dialog .confirm",function(event) {
		$(".dialog-layer").fadeOut(200,function(){
            if($('#overlay').length<=0){
                if($(".sort-layer").length>0){
                    if($(".sort-layer").is(":hidden")){
                        $('body').removeClass('body-overlay');
                    }
                }else{
                    $('body').removeClass('body-overlay');
                }
            }
			$(".dialog-layer").remove();
			ok();
		});
	});
	$("body").off("click","#dialog .cancel").on("click","#dialog .cancel",function(event) {

		$(".dialog-layer").fadeOut(200,function(){
            if($('#overlay').length<=0){
                if($(".sort-layer").length>0){
                    if($(".sort-layer").is(":hidden")){
                        $('body').removeClass('body-overlay');
                    }
                }else{
                    $('body').removeClass('body-overlay');
                }
            }
            $(".dialog-layer").remove();
		});
	});
}
//提交内容过滤
function submitFilter(){
    var htmlReg = new RegExp("<[^<]*>", "gi");
    
    $("input[type=text],textarea").each(function(index, el) {
        var inputValue=$(this).val();
        inputValue=inputValue.replace(htmlReg,"");
        inputValue=inputValue.replace(/(^\s*)|(\s*$)/g, ""); 
         inputValue=inputValue.replace(/&nbsp;/ig, "");
        $(this).val(inputValue);
    }); 
}
//输入字数限制
function commentCount(){
    charCount();
    var charLength=Math.round(thisLength/2);
    if(thisLength>1000  && thisLength!=0){
        thisDom.next(".button-box").find('.char-limit em').text('已超出');
        thisDom.next(".button-box").find('.char-limit i').text(Math.abs(500-charLength));
        thisDom.next(".button-box").find('.char-limit i').css('color','#e24343');  
        thisDom.next(".button-box").find('.char-limit b').text('字');
        thisDom.addClass('textarea-error');   
    }
    else{
        thisDom.next(".button-box").find('.char-limit em').text('还可以输入');
        thisDom.next(".button-box").find('.char-limit i').text(500-charLength);
        thisDom.next(".button-box").find('.char-limit i').css('color','#2175d0');
        thisDom.next(".button-box").find('.char-limit b').text('字');
        thisDom.removeClass('textarea-error');
    }
}
//禁言对话框提示
function forbiddenAlert(){
    content='您好，您尚未登录或账号处于禁言状态，无法进行此操作。';
    dialogTop=200;
    confirmText='确定';
    confirmBackground="#e97171";
    cancelDisplay='none';
    ok=function(){return false;};
    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
}
//赞
function praise() {
    //判断是否已登录先
    //请求后台赞
    var threadId=thisDom.attr('threadid');
    $.ajax({
        type: 'GET',
        url:'/thread/praise',
        data:{threadId:threadId},
        success: function (result) {
            if(result.status==666){
                forbiddenAlert();
            }
            var code = parseInt(result);
            switch (code){
                case 4://点赞成功
                    thisDom.prepend('<div class="add-one">+1</div>');
                    $(".add-one").fadeIn(500,function(){
                        $(this).fadeOut(500, function() {
                            $(this).remove();
                            var originalText=parseInt($(".praise-btn").find('em').text());
                            originalText++;
                            $(".praise-btn").find('em').text(originalText);
                        });
                    });
                    break;
                case 1:
                    content='您还没有登录，无法点赞。';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);                    
                    break;
                case 2:
                    content='您已经赞过此帖。';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
                    break;
                //其他错误就不给提示了，直接没反应
            }
        }
    });
}
//顶
function up(){
    var commentId = thisDom.attr("commentid");
    var upCount=parseInt(thisDom.find('em').text());
    $.ajax({
        type: 'GET',
        url:'/thread/comment/' + commentId + "/top" ,
        success: function (result) {
            if(result.status==666){
                forbiddenAlert();
            }
            var code = parseInt(result);
            switch (code){
                case 4:
                    thisDom.prepend('<b class="add-one">+1</b>');
                    thisDom.find('.add-one').fadeIn(500,
                        function(){
                            thisDom.find('.add-one').fadeOut(500,
                                function(){
                                    thisDom.find('.add-one').remove(); 
                                    upCount=upCount+1;
                                    thisDom.find('em').text(upCount);
                                    checkTopStatus();
                                });
                        });
                    break;
                case 5:
                    thisDom.prepend('<b class="add-one">+10</b>');
                    thisDom.find('.add-one').fadeIn(500,
                        function(){
                            thisDom.find('.add-one').fadeOut(500,
                                function(){
                                    thisDom.find('.add-one').remove(); 
                                    upCount=upCount+10;
                                    thisDom.find('em').text(upCount);
                                    checkTopStatus();
                                });
                        });
                    break;
                case 1:
                    break;
                case 2:
                    content='您已经顶过该条评论。';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);                
                    break;
                //其他错误就不给提示了，直接没反应
            }
        }
    });
}
//举报
function openReport(threadid,commentid,userid,typeid){//打开举报层
  threadid=thisDom.attr('threadid');
  commentid=thisDom.attr('commentid');
  userid=thisDom.attr('userid');  
  typeid=thisDom.attr('type'); 
  var reportHtml  = '<div id="overlay" class="report-overlay"  threadid="'+threadid+'" commentid="'+commentid+'" userid="'+userid+'" type="'+typeid+'">'+
                        '<div class="report">'+
                            '<h3>'+
                                '举报'+
                                '<a href="javascript:;" class="close-report">×</a>'+
                            '</h3>'+
                            '<div class="report-box">'+
                                '<h4>请选择举报原因：<span>必选</span></h4>'+
                                '<table>  '     +
                                    '<tr>'+
                                        '<td><input type="radio" name="reason" id="renshengongji" value="人身攻击" /><label for="renshengongji">人身攻击</label></td>'+
                                        '<td><input type="radio" name="reason" id="seqing" value="色情低俗" /><label for="seqing">色情低俗</label></td>'+
                                        '<td><input type="radio" name="reason" id="guanggao" value="广告骚扰" /><label for="guanggao">广告骚扰</label></td>'+
                                        '<td><input type="radio" name="reason" id="zhengzhi" value="政治敏感" /><label for="zhengzhi">政治敏感</label></td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td><input type="radio" name="reason" id="yaoyan" value="谣言" /><label for="yaoyan">谣言</label></td>'+
                                        '<td><input type="radio" name="reason" id="zhapian" value="诈骗"/><label for="zhapian">诈骗</label></td>'+
                                        '<td><input type="radio" name="reason" id="qita" value="其它" /><label for="qita">其它</label></td>'+
                                    '</tr>'+
                                '</table>'+
                                '<h4>请输入补充说明：</h4>'+
                                '<textarea placeholder="再次输入补充说明"></textarea>'+
                                '<a href="javascript:;" id="pub-report" class="blue-button">确认提交</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    $("#header").before(reportHtml);
    $("body").addClass('body-overlay');
    $(".report-overlay").fadeIn(200);
    $("body").on('click', '.close-report,.success-close', function(event) {
        $(".report-overlay").fadeOut(200, function() {
            $(".report-overlay").remove();
            if($(".overlay").length<=0){
                $('body').removeClass('body-overlay');
            }
        });
    });
    $("body").on('click', '#pub-report', function(event) {
        reportAjax();
    });
}
function reportAjax(reason,addoptionreason,uid,typeid,tid){//提交举报
    typeid=$(".report-overlay").attr('type');
    if(typeid==2 || typeid==3){
        tid=$(".report-overlay").attr('commentid');
    }else if(typeid==1){
        tid=$(".report-overlay").attr('threadid');
    }else if(typeid==4){
        tid=$(".report-overlay").attr('userid');
    }
    uid=$(".report-overlay").attr('userid');
    reason=$.trim($(".report-overlay").find("input[name=reason]:checked").val());
    addoptionreason=$.trim($(".report-overlay").find("textarea").val());
    if(reason==""){
        content='请输入举报原因';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='none';
        ok=function(){return false;};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
        return;        
    }
    $.ajax({
        type : 'POST',
        url : '/user/report',
        data : {"re":reason+":"+addoptionreason,"uid":uid,"te":typeid,"tid":tid},
        success : function(result){
            if(result.status==666){
                forbiddenAlert();
            }
            else if(result.status==200){
                $(".report-box").after('<div class="report-success"><h1>您的举报信息已提交成功</h1><a href="javascript:;"" class="success-close blue-button">确定</a></div>');
                $(".report-box").remove();
            }else if(result.status==601){
                content='请您登录后再提交举报信息';
                dialogTop=200;
                confirmText='确定';
                confirmBackground="#e97171";
                cancelDisplay='none';
                ok=function(){window.location.reload();};
                dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);                
            }
        },
        error : function(){
            content='提交失败。';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);      
        }
    });
}
//加入/取消收藏
function myFavorite(threadId){
    threadId=thisDom.attr('threadid');
    var type=thisDom.attr('type');
    $.ajax({
      type:'GET',
      url:'/thread/favorite',
      data: {'threadId':threadId,'type':type},
      success:function(data){
        if((window.location.href).indexOf("/center/favorite")>=0){
            window.location.reload();
            return;
        }
        if(type==1){
            content='收藏成功！';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#2175d0";
            cancelDisplay='none';
            ok=function(){
                thisDom.after('<a href="javascript:;" class="has-favorite" threadid="'+threadId+'" type="2" title="取消收藏"></a>');
                thisDom.remove();
            };
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
        }else if(type==2){
            thisDom.after('<a href="javascript:;" class="add-favorite" threadid="'+threadId+'" type="1" title="加入收藏"></a>');
            thisDom.remove();
        }
      },
      error:function(){
        content='操作失败，请检查您的网络状态是否正常。';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='none';
        ok=function(){return false;};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);           
      }
    });
}
//回复等图片加载方法
function uploadReplyImg(pickfiles){
   var replyUploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: pickfiles,
        filters: {
          mime_types : [ //只允许上传图片
            { title : "Image files", extensions : "jpg,gif,png,jpeg" }
          ],
        },
        flash_swf_url: '/plugin/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: $('#uptoken_url').val(),
        uptoken_url1: $('#uptoken_url1').val(),
        domain: $('#domain').val(),
        save_key: true,
        auto_start: true,
        init: {
           'FilesAdded': function(up, files) {
                thisDom=$('#'+pickfiles);
                commentImgBox();
            },
            'BeforeUpload': function(up, file) {

            },
            'UploadProgress': function(up, file) {
                
            },
            'UploadComplete': function() {
                
            },
            'FileUploaded': function(up, file, info) {
                res=$.parseJSON(info);
                commentImgUploaded(res);
            },
            'Error': function(up, err, errTip) {
            },
            'Key': function(up, file) {
                 var key = "";
                 return key
             }
        }
    });
}
//添加图片后
function commentImgBox(){
    thisDom.parent(".button-box").next('.comment-img-area').remove();
    var left= thisDom.parent(".button-box").find('.upload-img-btn').position().left+20;
    var html='<div class="comment-img-area" style="left:'+left+'px;margin-top:5px;display:none">'+
                '<div class="comment-img-box">'+
                    '<span><em></em><b></b></span>'+
                    '<a href="javascript:;" class="close">×</a>'+
                    '<div class="img-box">'+
                        '<img src="/images/loading.gif" class="upload-img"/>'+
                    '</div>'+
                '</div>'+
             '</div>';
    thisDom.parent(".button-box").after(html);
    $(".comment-img-area").fadeIn(200);
    $("body").on('click', '.comment-img-area .close', function(event) {
        thisDom=$(this);
        $(this).parents(".comment-img-area").fadeOut(200, function() {
             thisDom.parents(".comment-img-area").remove();
        });
    });
}
//图片上传完成后
function commentImgUploaded(res){
    thisDom.parent(".button-box").next(".comment-img-area").attr({
        'imghash':res.hash,
        'imgurl':res.hash,
        'imgmime':res.mimeType,
        'imgsize':res.fsize,
        'imgwidth':res.w,
        'imgheight':res.h
    });
     thisDom.parent(".button-box").next(".comment-img-area").find('.upload-img').attr("src",domain+res.hash+"?imageMogr2/auto-orient/thumbnail/!80x80r/gravity/Center/crop/80x80/quality/100");
}
//打开评论图片
function commentImgLayer(imgUrl,imgCut){
    var html  = '<div id="overlay" class="overlay comment-img-overlay" style="z-index:9992">'+
                    '<div class="view-img">'+
                        '<h3>'+
                            '查看图片'+
                            '<a href="javascript:;" class="close-view-img">×</a>'+
                        '</h3>'+
                        '<div class="view">'+
                            '<div class="img-box"><img src="/images/loading.gif" class="loading-img"/><img src="'+imgUrl+imgCut+'" class="onload-img"></div>'+
                        '</div>'+
                        '<a href="'+imgUrl+'?imageView2/1/q/100|watermark/1/image/aHR0cDovL3B1YmxpYy54eHh4eGJicy5jb20vaW1hZ2VzL3dhdGVybWFyay5wbmc=/gravity/South" target="_blank" class="blue-button view-button">查看原图</a>'+
                    '</div>'+
                '</div>';
    $("body").prepend(html);
    $("body").addClass('body-overlay');
    $(".overlay").fadeIn(200);
    imgLoad();
    $("body").on('click', '.close-view-img', function(event) {
        $(".comment-img-overlay").fadeOut(200, function() {
            if($("#overlay").length<=1){
                $("body").removeClass('body-overlay');
            }
            $(this).remove();
        });
    });
}
//删除评论
function delComment(){
    thrId=thisDom.attr('threadid');
    comId=thisDom.attr('commentid');
    $.ajax({
      type:'POST',
      url:'/thread/delComment',
      data: {'threadId':thrId,'commentId':comId},
      success: function (result) {
        if(result.status==666){
            forbiddenAlert();
        }
        var code = parseInt(result);
        if(1==code){
            thisDom.parents(".comment-list").find('p:first').after('<p class="comment-deleted">该条评论已被删除！</p>');
            thisDom.parents(".comment-list").find('.up-btn').remove();
            thisDom.parents(".comment-list").find('.uped-btn').remove();
            thisDom.parents(".comment-list").find('p:first').remove();
            thisDom.parents(".comment-list").find('.commentImgBox').remove();
            thisDom.parents(".comment-list").find('.comment-p').attr('style','');
            thisDom.parents(".comment-list").find('.comment-operate').remove();
        }else if(-1==code || 0==code){
            content='删除失败，请重新载入页面后再次尝试。';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
        }
      }
    });
}
//加关注/取消关注
function follow(friendUserId,type){
    $.ajax({
        type: 'GET',
        url: '/usconter/followUser?userId=' + friendUserId + '&type=' + type,
        beforeSend:function(){
            thisDom.css("display","none");
            thisDom.after('<span class="white-button follow-btn following">处理中...</span>');
        },
        success: function (result) {
            if(result.status==666){
                forbiddenAlert();
            }
            if(result == 6){//加关注
                $(".following").after('<a href="javascript:;" class="white-button un-follow-btn" userid="'+friendUserId+'" type="1"><i></i>取消关注</a>');
                thisDom.remove();
                $(".following").remove();
                return;
            }
            if(result == 4) {//取消关注
                $(".following").after('<a href="javascript:;" class="white-button follow-btn" userid="'+friendUserId+'" type="0"><i></i>关注</a>');
                thisDom.remove();
                thisDom.remove();
                $(".following").remove();
                return;
            }
            if(result == 7) {//互相关注
                $(".following").after('<a href="javascript:;"class="white-button each-follow-btn" userid="'+friendUserId+'" type="2"><i></i>互相关注</a>');
                thisDom.remove();
                thisDom.remove();
                $(".following").remove();
                return;
            }
            if(result == 2) {//互相关注
                if(type==2){
                    content='操作失败，您已取消对该用户的关注。';
                }
                else if(type==1){
                    content='操作失败，您已关注了该用户。';
                }
                dialogTop=200;
                confirmText='确定';
                confirmBackground="#e97171";
                cancelDisplay='none';
                ok=function(){window.location.reload();};
                dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
                return;
            }
        },
        error: function(){
            content='操作失败，请重新载入页面后再次尝试。';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
        }
    });
}
//通用-自定义滚动条方法
function dialogLayerScroll(top){
    $("#overlay .dialog").mCustomScrollbar({
        theme:"dark",
        callbacks:{
            onInit: function(){
                $(".mCSB_container").css('top',top+'px');
            }
        }
    });
}
//私信 
var privatePageNo;
function OpenPrivateMessage(userId){//打开私信层
    var html=  '<div id="overlay" class="private-overlay" uid="'+userId+'">'+
                    '<div class="comment-dialog-area">'+
                        '<div class="comment-dialog-box private-box" style="margin:auto;padding-bottom:140px">'+
                            '<h3>'+
                                '私信'+
                                '<a href="javascript:;" class="close-dialog">×</a>'+
                            '</h3>'+
                            '<div class="dialog mCustomScrollbar">'+
                                '<div class="dialog-list">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="private-input">'+
                            '<textarea placeholder="请输入私信内容" class=""></textarea>'+
                            '<div class="button-box" style="height:auto;overflow:auto">'+
                                '<div class="char-limit"><em>还可以输入</em> <i style="color: #2175d0;">500</i> <b>字</b></div>'+
                                '<a href="javascript:;" class="blue-button" id="pub-private-message-btn">发送</a>'
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    $("body").prepend(html);
    privateMessageAjax(userId);
    $("body").addClass('body-overlay');
    $("#overlay").fadeIn(200,function(){
        dialogLayerScroll();    
        commentDialog=true;
        $(".private-input").find('textarea').focus();
        $("body").on('click', '.load-more-pm', function(event) {
            privatePageNo=privatePageNo+1;
            privateMessageAjax(userId);
            $(this).remove();
        });
        $("body").on('click', '.private-box .close-dialog', function(event) {          
            $("#overlay").fadeOut(200, function() {
                $("#overlay").remove();
            if($(".overlay").length<=1){
                $("body").removeClass('body-overlay');
            }
                $("body").off('click', '.load-more-pm');
                privatePageNo=1;
            });
        });
    });
}
function privateMessageHtml(pm){//私信条目html
    var html;
    if(pm.ismysend==1){
                html='<dl class="comment-list my" pmid="'+pm.id+'" style="display:none">';
    }
    else{
                html='<dl class="comment-list other" pmid="'+pm.id+'" style="display:none">';
    }
      html+=
                '<dt>';
                if(pm.ismysend==1){
                    html+='<a href="/center/thread" target="_blank"><img src="'+pm.my.image.url+'?imageMogr2/auto-orient/thumbnail/!40x40r/gravity/Center/crop/40x40"></a>';
                }
                else{
                    html+='<a href="/lookat/home?userId='+pm.user.id+'" target="_blank"><img src="'+pm.user.image.url+'?imageMogr2/auto-orient/thumbnail/!40x40r/gravity/Center/crop/40x40"></a>';
                }
          html+='</dt>'+
                '<dd>'+
                    '<span><em></em></span>';
                    if(pm.ismysend==1){
                        html+='<h5> <a href="/center/thread" target="_blank">我</a> ';
                    }
                    else{
                        html+='<h5> <a href="/lookat/home?userId='+pm.user.id+'" target="_blank">'+pm.user.name+'</a>';
                    }
              html+= pm.time+'</h5>'+
                    '<p>'+pm.content+'</p>'+
                    '<div class="operate" style="padding:0px;height:auto">'+
                        '<div class="comment-operate" style="text-align:right">';
                            if(pm.ismysend==0){
                           html+= '<a href="javascript:;" class="report-btn" threadid="'+pm.id+'" commentid="'+pm.id+'" userid="'+pm.user.id+'" type="3">举报</a>';
                            }
                html+=  '</div>'+
                '</div>'+
                '</dd>'+
                '<div class="clear">'+
                '</div>'+
            '</dl>';
    return html;
}
function privateMessageAjax(userId){//加载私信数据
    $.ajax({
        url:"/center/messagebyuserid",

        data:{
            userId:userId,
            pageNo:privatePageNo
        },
        beforeSend: function(){
            $(".dialog-list").prepend('<div class="loading-private" style="text-align:center;padding:20px 0px;"><img src="/images/loading.gif"></div>')
        },
        success:function(data){
            $(".loading-private").fadeOut(200, function() {
                $(".loading-private").remove();
                if(privatePageNo<=data[0].pagecount){
                    for(var i=0;i<data[0].list.length;i++){
                        pm=data[0].list[i];
                        var html=privateMessageHtml(pm);
                        $("#overlay .dialog-list").prepend(html);
                        $(".comment-list").fadeIn(1000);
                    }
                    if(privatePageNo<data[0].pagecount){
                        $("#overlay .dialog-list").prepend('<a href="javascript:;" class="load-more-pm">加载更多私信</a>');
                    }
                    else{
                        $(".load-more-pm").remove();
                    }
                    var dialogListHeight=$(".dialog-list").height();
                    var dialogHeight=$(".dialog").height();
                    if(dialogListHeight>dialogHeight){
                        $(".mCSB_container").css("top",dialogHeight-dialogListHeight-10+"px");
                    }
                }
            });
        }
    }); 
}
function pubPrivateMessage(userId,content){//发私信
    userId=$("#overlay").attr("uid");
    submitFilter();
    content=$(".private-input").find('textarea').val();
    $.ajax({
      type: 'post',
      url: '/center/sendmessage',
      data: {"userId":userId,"content":content},
      success: function (data) {
        pm=data[0].list;
        if(data.status==666){
            forbiddenAlert();
        }
        if(1==data[0].tip){
          $(".private-input").find('textarea').val("");
          pm.my.image.url=pm.my.image.url;
          var html=privateMessageHtml(pm,pm.my.image.url);
          $('.dialog-list').append(html);
          $(".my").fadeIn(200,function(){
            var top=$("#overlay .dialog").find('.dialog-list').height()-415;
            $(".mCSB_container").css('top',-top+'px');
          });        
          return true;
        }else if(data[0].tip==-1){
            content='请输入私信内容！';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
        }
      }
    });
}
function delPrivateMessage(){//删除私信---个人中心预留
    var privateId=thisDom.attr('privatemsgid');
    $.ajax({
      type:'POST',
      url:'/center/delPrivateMsg',
      data: {'privateId':privateId},
      success: function (result) {
        if(result.status==666){
            forbiddenAlert();
        }
        var code = parseInt(result);
        if(1==code){
            window.location.reload();
        }else if(-1==code){
            content='删除私信失败！'+code;
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
        }else if(0==code){
            content='删除私信失败！'+code;
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
        }
      }
    });
}
// 申请删除/修改帖子
function showApplyShow(threadId){
    var html  = '<div id="overlay" class="showApplySubmitLayer">'+
                  '<div class="showApplySubmit">'+
                    '<h3>'+
                      '对帖子操作失败'+
                      '<a href="javascript:;" class="close-dialog">×</a>'+
                    '</h3>'+
                    '<div class="showApplySubmitBox">'+
                      '<p>该帖子已被管理员设为推荐或焦点图，如需修改或删除请注明理由，我们会尽快给你答复。</p>'+
                      '<textarea class="reason"></textarea>'+
                      '<div class="button-area">'+
                        '<a href="javascript:;" class="white-button cancel-apply" style="margin-right:10px">取消</a>'+
                        '<a href="javascript:;" class="blue-button submit-apply" threadid="'+threadId+'">提交申请</a>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
    $("body").prepend(html);
    $("body").addClass('body-overlay');
    $(".showApplySubmitLayer").fadeIn(200);
    $("body").on('click', '.showApplySubmitLayer .close-dialog,.cancel-apply', function(event) {
        $(".showApplySubmitLayer").fadeOut(200, function() {
            $(this).remove();
            if($("#overlay").length<=1){
                $("body").removeClass('body-overlay');
            }
        });
    });
    $("body").on('click', '.showApplySubmitLayer .submit-apply', function(event) {
        dialogText=$(".showApplySubmitLayer").find('textarea').val();
        currentId=$(this).attr("threadid");
        showApplySutmit(currentId,dialogText);
    });
}
function showApplySutmit(currentId,dialogText){
    $.getJSON('/user/thread/' + currentId + '/apply-edit',{info:dialogText},function(result,status){
        if(result.status==666){
            forbiddenAlert();
        }
        if(status == 'success' && typeof result.code !== 'undefined'){
            var code = parseInt(result.code);
            switch (code){
                case 1://成功
                    content='提交申请成功！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#2175d0";
                    cancelDisplay='none';
                    ok=function(){location.reload();};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case -1://重复提交
                    content='您已提交过申请，请耐心等待！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
                break;
                default :
                    content='提交失败，请确认您已登录并刷新页面重试！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
            }
        }else{
            content='提交失败，请请确认您已登录并刷新页面重试！';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
        }
    });
}
//删除帖子/草稿方法
function deleteThread(isDraft){
    var currentId=thisDom.attr('threadid');
    $.getJSON('/thread/del',{id:currentId,isDraft:isDraft}, function (data,status) {
        if(status=='success' && typeof data.status !== 'undefined'){
            var s = parseInt(data.status);
            switch (s){
                case 1:
                    content='删除成功！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#2175d0";
                    cancelDisplay='none';
                    ok=function(){location.reload();};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case 1001:
                    content='删除失败：该帖子不存在！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case 666:
                    forbiddenAlert();
                    break;
                case 1002:
                    content='删除失败：您还没有登录或登录授权已过期！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case 1003:
                    content='删除失败：该帖子不存在！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case 1004:
                    content='删除失败：您不能删除其他用户的帖子！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                case -2:
                    threadId=currentId;
                    showApplyShow(threadId);
                    break;
                case -3:
                    content='删除失败：该帖子已被推荐至选题！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
                    break;
                default:
                    content='删除失败！';
                    dialogTop=200;
                    confirmText='确定';
                    confirmBackground="#e97171";
                    cancelDisplay='none';
                    ok=function(){return false;};
                    dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
            }
        }else{
            content='与服务器通信错误，请稍后重试！';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);  
        }
        //1001编号不存在 1002 用户未登录 1003 帖子不存在 1004 用户不对应 -1 参数不对，-2被推荐，-3被推荐到选题 -4推荐到焦点图 1删除成功
    });
}
// 修改帖子
function modifyThread(currentId){
    $.getJSON('/user/thread/' + currentId + '/is-editable',function(result,status){
      if(result.status==666){
        alert("您好，您的账号处于禁言状态，无法进行此操作。");
        return false;
      }
      if(status == 'success' && typeof result.editable !== 'undefined'){
        var editable = parseInt(result.editable);
        switch (editable){
          case 1://可操作
            window.location = '../../../../thread/update?id=' + currentId;
            break;
          case -3:
            threadId=currentId;
            showApplyShow(threadId);
            break;
          case -4:
            threadId=currentId;
            showApplyShow(threadId);
            break;
          case -5:
            threadId=currentId;
            showApplyShow(threadId);
            break;
          case -1:
            alert("与服务器通信错误，请稍后重试！");
            break;        
        }

      }else{
        alert('与服务器通信错误，请稍后重试！');
      }
    }); 
}
//对帖子图片的评论
/************************************************************************/
/*                          Dom加载完毕后                               */
/************************************************************************/
$(document).ready(function() {
//商城暂时关闭
    $(".user-info-list").find('.building').mouseenter(function(event) {
        $(this).text('敬请期待');
    });
    $(".user-info-list").find('.building').mouseleave(function(event) {
        $(this).text('兑换中心');
    });
    remind();//消息推送
    sideBar();
    topicColor();
//导航高亮设置
    var windowHref=window.location.href;
    if(windowHref.indexOf("/index")>0){
        $("#header").find('.homepage a').css("color","#2175d0");
    }else if(windowHref.indexOf("/interest/")>0){
        $("#header").find('.interestpage a').css("color","#2175d0");
    }else if(windowHref.indexOf("/concerns/")>0){
        $("#header").find('.followpage a').css("color","#2175d0");
    }else if(windowHref.indexOf("/rank/")>0){
        $("#header").find('.rankpage a').css("color","#2175d0");
    }
//延迟加载
if($(".upload").length>0){
    $(".upload").lazyload({
        effect: "fadeIn",
        skip_invisible:false,
        threshold : 200
    });
}
    $(".side-bar").find('.go-top').click(function(event) {
        $("html,body").animate({
            scrollTop:"0px"
        },500);
    });
    $("p").each(function() {
        thisArea=$(this);
        linkAutoCreate(thisArea);
    });
    //顶部导航
    $("#header .header-row-1-col-2").find('.nav-topic').mouseenter(function(event) {
        $(".header-topic-label").addClass('header-topic-label-slidedown');
    });
    $("#header .header-row-1-col-2").find('.nav-topic').mouseleave(function(event) {
        $(".header-topic-label").removeClass('header-topic-label-slidedown');
    });    
    //敲回车搜索结果
    $("#keyword001").keyup(function (e) {
        e=e||event;
        if(e.keyCode==13){
          searchkey();
        } 
    });
    $("#footer .left-footer .sns ul .weixin").click(function(event) {
        var thisTop=$(this).offset().top;
        var thisLeft=$(this).offset().left;
        $(".mm-qrcode-area").css({
            top: thisTop+"px",
            left: thisLeft+"px"
        });
    });
    //举报
    $('body').on('click', '.report-btn', function(event) {
        if($("#myid").val()<=0){
            content='您尚未登录，请登录后提交举报信息。';
            dialogTop=200;
            confirmText='确定';
            confirmBackground="#e97171";
            cancelDisplay='none';
            ok=function(){return false;};
            dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);               
        }else{
            thisDom=$(this);
            openReport();
            if($(".overlay").length<=0){
                $('body').addClass('body-overlay');
            }
        }
    });
    //加关注
    $('body').on('click', '.follow-btn', function(event) {
        thisDom=$(this);
        type=1;
        friendUserId=thisDom.attr("userid");
        follow(friendUserId,type);
    });
    //取消关注
    $('body').on('click', '.un-follow-btn,.each-follow-btn', function(event) {
        thisDom=$(this);
        type=2;
        friendUserId=thisDom.attr("userid");
        content='是否要取消对Ta的关注？';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#2175d0";
        cancelDisplay='inline-block';
        ok=function(){follow(friendUserId,type);};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);
    });
    //加入收藏
    $("body").on('click', '.add-favorite', function(event) {
        thisDom=$(this);
        myFavorite(thisDom);
    });
    //取消收藏
    $("body").on('click', '.has-favorite', function(event) {
        thisDom=$(this);
        content='确定要取消收藏此帖吗？';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='inline-block';
        ok=function(){myFavorite(thisDom);};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);    
    });
    //===================输入评论/回复/私信内容=====================//
    $("body").on('keyup','.comment-textarea,.comment-list textarea,.private-overlay textarea',function(thisLength,thisValue) {
        thisDom=$(this);
        commentCount();
    });
    $("body").on('paste cut','.comment-textarea,.comment-list textarea,.private-overlay textarea',function(thisLength,thisValue) {
        thisDom=$(this);
        commentCount();
        setTimeout(function(){thisDom.blur();},100);
    });
    $("body").on('blur','.comment-textarea,.comment-list textarea,.private-overlay textarea',function(thisLength,thisValue) {
        thisDom=$(this);
        commentCount();
    });
    //打开私信
    $(".message-button").click(function(event) {
        userId=$(this).attr("userid");
        privatePageNo=1;
        OpenPrivateMessage(userId);
    });
    //发送私信
    $("body").on('click', '#pub-private-message-btn', function(event) {
        var thisTextarea=$(this).parent('.button-box').prev('textarea');
        if((thisTextarea.attr('class')).indexOf("textarea-error")>=0){
                content='发布私信字数超限。';
                dialogTop=200;
                confirmText='确定';
                confirmBackground="#e97171";
                cancelDisplay='none';
                ok=function(){return false;};
                dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);          
        }else{
            pubPrivateMessage();
        }
    });
     $("body").on("keydown", ".private-input textarea", function (e) {
            e = e||event;
            if (e.keyCode == 13 && e.ctrlKey) {
                if(($(this).attr('class')).indexOf("textarea-error")>=0){
                        content='发布私信字数超限。';
                        dialogTop=200;
                        confirmText='确定';
                        confirmBackground="#e97171";
                        cancelDisplay='none';
                        ok=function(){return false;};
                        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);          
                }else{
                    pubPrivateMessage();
                }     
            }
     });
    //删除私信
    $("body").on('click', '.private-delete-btn', function(event) {
        thisDom=$(this);
        content='是否要该条私信？';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='inline-block';
        ok=function(){delPrivateMessage();};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok);        
    });
    //打开评论图片
    $('body').on('click', '.comment-imgBox', function(imgUrl,imgCut) {
        imgUrl=$(this).find("img").attr('data-url');
        var imgH=parseInt($(this).find("img").attr('data-height'));
        var imgW=parseInt($(this).find("img").attr('data-width'));
        if(imgH<imgW){
            if((imgW/imgH)<1.6){
                imgCut='?imageView2/2/h/450/q/100|watermark/1/image/aHR0cDovL3B1YmxpYy54eHh4eGJicy5jb20vaW1hZ2VzL3dhdGVybWFyay5wbmc=/gravity/South/dy/5';
            }else{
                imgCut='?imageView2/2/w/728/q/100|watermark/1/image/aHR0cDovL3B1YmxpYy54eHh4eGJicy5jb20vaW1hZ2VzL3dhdGVybWFyay5wbmc=/gravity/South/dy/5';
            }
        }
        else if(imgH>=imgH){
            imgCut='?imageView2/2/h/450/q/100|watermark/1/image/aHR0cDovL3B1YmxpYy54eHh4eGJicy5jb20vaW1hZ2VzL3dhdGVybWFyay5wbmc=/gravity/South/dy/5';
        }
        commentImgLayer(imgUrl,imgCut);
    });
    //点赞
    $(".praise-btn").click(function(event) {
        thisDom=$(this);
        praise();
    });
    //删除帖子
    $("body").on('click', '.thread-delete-btn', function(event) {
        thisDom=$(this);
        content='是否要删除这篇帖子？';
        dialogTop=200;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='inline-block';
        ok=function(){deleteThread();};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
    });
    //修改帖子
    $("body").on('click', '.thread-modify-btn', function(event) {
        currentId=$(this).attr('threadid');
        modifyThread(currentId);
    });
    //删除草稿
    $("body").on('click', '.draft-delete-btn', function(event) {
        thisDom=$(this);
        content='是否要删除这篇草稿？';
        dialogTop=200;
        isDraft=-1;
        confirmText='确定';
        confirmBackground="#e97171";
        cancelDisplay='inline-block';
        ok=function(){deleteThread(isDraft);};
        dialog(content,confirmText,confirmBackground,dialogTop,cancelDisplay,ok); 
    });
//============================== 页脚微博/二维码切换=====================================//
    $("#footer").find('.footer-weibo-btn').mouseenter(function(event) {
        $(this).addClass('footer-weibo-btn-active');
        $('.footer-weixin-btn').removeClass('footer-weixin-btn-active');
        $('.footer-taobao-btn').removeClass('footer-taobao-btn-active');
        $("#footer").find('.qrcode').addClass('qrcode-hide');
        $("#footer").find('.weibo-list').addClass('weibo-list-show');
        $("#footer").find('.shop-qrcode').removeClass('shop-qrcode-show');
    });
    $("#footer").find('.footer-weixin-btn').mouseenter(function(event) {
        $(this).addClass('footer-weixin-btn-active');
        $('.footer-weibo-btn').removeClass('footer-weibo-btn-active');
        $('.footer-taobao-btn').removeClass('footer-taobao-btn-active');
        $("#footer").find('.qrcode').removeClass('qrcode-hide');
        $("#footer").find('.weibo-list').removeClass('weibo-list-show');
        $("#footer").find('.shop-qrcode').removeClass('shop-qrcode-show');
    });
    $("#footer").find('.footer-taobao-btn').mouseenter(function(event) {
        $(this).addClass('footer-taobao-btn-active');
        $('.footer-weixin-btn').removeClass('footer-weixin-btn-active');
        $('.footer-weibo-btn').removeClass('footer-weibo-btn-active');
        $("#footer").find('.qrcode').addClass('qrcode-hide');
        $("#footer").find('.weibo-list').removeClass('weibo-list-show');
        $("#footer").find('.shop-qrcode').addClass('shop-qrcode-show');
    });
    if($(".usercenter-left").length>0){    
        usercenterLeftTop=$(".usercenter-left").find('.nav').offset().top;
    }
    if($(".lookat-left").length>0){ 
       lookAtLeftTop=$('.lookat-left').offset().top; 
    }
    if($(".rank-nav").length>0){ 
       rankNavTop=$('.rank-nav').offset().top; 

    }
    if($(".small-topic-box").length>0){ 
       smallTopicBoxTop=$('.small-topic-box').offset().top; 
    }
    if($("#topicLabel").length>0){
        homepageTopicLabelTop=$(".topic-list").offset().top;
    }
});
/************************************************************************/
/*                          窗口尺寸变化                                */
/************************************************************************/
window.onresize=function(){
	footerBottom();
    sideBar();
}
window.onload=function(){
    sideBar();
    //页脚置底
    footerBottom();
}
/************************************************************************/
/*                            页面滚动时                                */
/************************************************************************/
window.onscroll=function(){
    sideBar();
    winScrollTop=$(window).scrollTop();
    //头部导航
    if(winScrollTop>=140){
        $("#header").find('.header-row-1').addClass('header-row-1-show');
    }
    else{
        $("#header").find('.header-row-1').removeClass('header-row-1-show');    
    }
    if($("#topicLabel").length>0){
        if (winScrollTop>=homepageTopicLabelTop) {
            $(".header-topic-label").addClass('header-topic-label-autoslidedown');
            $(".nav-topic").addClass('nav-topic-active');
        }else{
            $(".header-topic-label").removeClass('header-topic-label-autoslidedown');
            $(".nav-topic").removeClass('nav-topic-active');
        }
    }
    //帖子最终页右侧用户信息
    var threadRightHeight=$(".thread-right").height();
    if(winScrollTop>=threadRightHeight+100){
        $(".thread-right .user-info").addClass('user-info-fixed');
    }
    else{
        $(".thread-right .user-info").removeClass('user-info-fixed');
    }
    if($(".pubThreadContainer").length>0){//发帖页右侧
        domFixed();
    }
    // 个人中心左侧
    if($(".usercenter-left").length>0){        
        if(winScrollTop>=usercenterLeftTop){
            $(".usercenter-left").find('.nav').addClass('nav-fixed');
        }
        else{
            $(".usercenter-left").find('.nav').removeClass('nav-fixed');
        }        
    }
    //排行榜顶部
    if($(".rank-nav").length>0){      
        if(winScrollTop>=rankNavTop){
            $(".rank-nav").addClass('rank-nav-fixed');
        }
        else{
            $(".rank-nav").removeClass('rank-nav-fixed');
        }        
    }
    // 看Ta的主页左侧
    if($(".lookat-left").length>0){         
        if(winScrollTop>=lookAtLeftTop){
            $(".left-box").addClass('lookat-left-fixed');
        }
        else{
            $(".left-box").removeClass('lookat-left-fixed');
        }        
    }
    // 小话题最终页右侧
    if($(".small-topic-box").length>0){ 
        if(winScrollTop>=smallTopicBoxTop){
            $(".small-topic-box").addClass('small-topic-box-fixed');
        }
        else{
            $(".small-topic-box").removeClass('small-topic-box-fixed');
        }          
    }
}