/*
*1-日期插件初始化
*2-表单控件验证

 */


require(['/two/assets/js/config.js'],function(){//先引入配置文件
    require(['jquery','/two/assets/js/common.js','datepicker', 'validate', 'form','zh'],function($){

        //1-日期插件初始化
        $('input[name="tc_join_date"]').datepicker({
            format: 'yyyy-mm-dd',
            language:'zh-CN'
        })

        //2-表单控件验证
        $('form').validate({
            submitHandler:(function(){
                // 验证通过会执行这个方法
                // 这里调用发ajax请求的方法
                $('form').ajaxSubmit({
                    success:function(data){
                        if(data.code==200){
                            alert('添加成功');
                        }
                    }
                })
            }),
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,10]
                },
                tc_pass:{
                    required:true,             
                },
                tc_join_date:{
                    required:true,
                    date:true
                }
            },
            messages:{
                tc_name:{
                    required:'长度不能为空',
                    rangelength:'长度应该在2-4之间'
                },
                tc_pass:{
                    required:'密码不能为空'
                }
            }
        })
    })
})