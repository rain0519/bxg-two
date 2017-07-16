/**
 * 这里就完成其他页面公共要使用的功能!
 * 功能1: 判断用户是否登陆
 * 功能2: 从cookie读取用户的资料，并展示
 * 功能3: 导航菜单交互(展开与收起!)
 * 功能4: 退出登陆
 * 功能5: 让页面打开时有进度条，让每个ajax发送过程有进度
 */

define(['jquery','nprogress','cookie'],function($,NProgress){
    validSignIn();//判断用户是否登录
    getInfo();//获取用户信息并展示
    navToggle();//导航菜单交互
    signOut();//退出登录
    globalAjaxEvent();//注册全局ajax事件，添加进度条


    //1-判断用户是否登录，若没有登录，则跳转到登录页面
    function validSignIn(){
        var sessionId = $.cookie('PHPSESSID');
        //console.log(sessionId);
        if(!sessionId){
            window.location.href = '/two/views/index/login.html';           
        }
    }
    //2-获取用户信息并展示
    function getInfo(){
        var userInfo = JSON.parse($.cookie('userinfo'));
        //console.log(userInfo);
        $('.profile img').attr('src',userInfo.tc_avatar);
        $('.progile h4').text(userInfo.tc_name);
    }
    //3-导航菜单交互
    function navToggle(){
        $('.navs li a').on('click',function(){
            $(this).next('ul').slideToggle();
        })
    }
    //4-退出登录
    function signOut(){
        //http://api.botue.com/logout
        $('.fa-sign-out').closest('li').on('click',clickHandler);
        function clickHandler(){
            var options = {
                type:'post',
                url:'/api/logout',
                success:function(data){
                    if(data.code == 200){
                        window.location.href = '/two/views/index/login.html';
                    }
                }
            };
            $.ajax(options);
        }
    }
    //5-注册全局Ajax事件，添加进度条
    function globalAjaxEvent(){
        $(document).ajaxStart(function(){
            NProgress.start();
        });
        $(document).ajaxStop(function(){
            NProgress.done();
        })       
    }
    //入口函数，刷新页面，添加进度条
     $(function(){
        NProgress.done()
     })
})