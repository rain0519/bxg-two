// 4. 在login.js中实现登陆页面的功能
// 4. 1. 在login.js中注册登陆按钮的点击事件! // $('xxx').on('click')
// 4. 2. 在事件里， 获取表单数据
// 4. 3. 把表单数据进行验证
// 4. 4. 验证成功之后，发请求，把数据发给后端.
// 4. 5. 请求成功之后，跳转之前，把用户资料保存到cookie中，然后跳转到首页
// 4. 6. 请求失败, 给用户一个提示

define(['jquery','cookie'],function($){
    var $sub = $('#sub');
    $sub.on('click',clickHandler);
    //console.log($sub);
    //点击事件
    function clickHandler(e){
        e.preventDefault();
        var username = $('#name').val();
        var pwd = $('#pass').val();
        if(!username.trim() || !pwd.trim()){
            return;
        };
        var options = {
            url:'/api/login',
            type:'post',
            data:{
                tc_name:username,
                tc_pass:pwd
            },
            success:function(data){
                //console.log(data);
                if(data.code==200){
                    $.cookie('userinfo',JSON.stringify(data.result),{expires: 7, path: '/'});
                    window.location.href = '/two/views/index/dashboard.html';
                }
            }
        }
        $.ajax(options);
    }


})