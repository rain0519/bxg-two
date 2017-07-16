//1-引入配置文件和common.js
//2-获取地址栏中的参数
//3-根据2中参数中的cs_id发请求获取课程信息
//4-把3中获取的数据展示出来（模板）
//5-二级联动
//6-进行表单验证
//7-当点击保护按钮时，要把数据发送服务器
//8-请求成功后，页面跳转到step2.html
require(['/two/assets/js/config.js'],function(){
    require(['jquery','/two/assets/js/getarg.js','template','validate','form','/two/assets/js/common.js'],function($,arg,template){
        getCourseInfo();



        //获取对应的课程信息
        function getCourseInfo(){
            var options = {
                type:'get',
                url:'/api/course/basic',
                data:{
                    cs_id:arg.cs_id
                },
                success:function(data){
                    if(data.code==200){
                        //渲染数据
                        var result = template('teml',{list:data.result});
                        $('.content').html(result);

                        //二级联动（注册一级联动的change事件）
                        $('#top').on('change',function(){
                            var cgId = $(this).val();
                            var options = {
                                type:'get',
                                url:'/api/category/child',
                                data:{
                                    cg_id:cgId
                                },
                                success:function(data){                 
                                    var str = '';
                                    var arr = data.result;
                                    //console.log(data.result);
                                    for(var i = 0 ; i < arr.length; i++){
                                        str += '<option value="' + arr[i].cg_id + '">' + arr[i].cg_name + '</option>'
                                    }
                                    $('#childs').html(str);
                                }
                            };
                            $.ajax(options);
                        })
                        validateInit()
                    }                   
                }
            };
            $.ajax(options);
        }

        //表单验证
        function validateInit(){
            var options = {};
            options.submitHandler = function(){
                var options = {
                    type:'post',
                    url:'/api/course/update/basic',
                    data:{
                        cs_id:arg.cs_id
                    },
                    success:function(data){
                        if(data.code==200){
                            window.location.href = './step2.html?cs_id='+ data.result.cs_id;
                        }
                    }

                };
                $('form').ajaxSubmit(options);
            };
            options.rules = {
                cs_name:{
                    required:true,
                    rangelength:[2,10]
                },
                cs_tags:{
                    required:true,
                    rangelength:[2,50]
                }
            };
            options.messages = {
                cs_name:{
                    required:'不能为空',
                    rangelength:'范围在2-10之间'
                },
                cs_tags:{
                    required:'不能为空',
                    rangelength:'范围在2-50之间'
                }
            };
            $('form').validate(options);
        }
    })
})