/**
 * 1-将之前数据展示到页面上
 * 2-修改后的表单验证
 */


require(['/two/assets/js/config.js'],function(){//引入配置文件
    require([
    'jquery',
    '/two/assets/js/getarg.js',
    'validate',
    'form',
    'datepicker',
    '/two/assets/js/common.js' 
    ], function($,obj){

       //1-将之前的数据展示到页面上
        var options = {
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:obj.tc_id
            },
            success:function(data){
                var $tcName = $('input[name="tc_name"]');
                var $tcJoinDate = $('input[name="tc_join_date"]');
                var $tcType = $('input[name="tc_type"]');
                var $tcGender = $('input[name="tc_gender"]');
                var obj = data.result;
                //将数据放到页面的dom元素中
                $tcName.val(obj.tc_name);
                $tcJoinDate.val(obj.tc_join_date);
                var num = obj.tc_type === 0 ? 1 : 0;
                $($tcType.find('option')[num]).attr('selected',true);
                var num2 = obj.tc_gender === 0  ? 1 : 0;
                $($tcGender[num2]).attr('selected',true);
            }
        }
        $.ajax(options);
        

       //2-进行表单验证
      // console.log(obj.tc_id);
       $('form').validate({
           submitHandler:function(){
            $('form').ajaxSubmit({
                url:'/api/teacher/update',
                type:'post',
                data:{
                    tc_id:obj.tc_id
                },
                success:function(data){
                    if(data.code==200){
                        alert(data.msg);
                    }
                },
                error:function(){
                    alert('请求未成功')
                }
            })
           },
           rules:{
            tc_name:{
                required:true,
                rangelength:[2,10]
            },
            tc_join_date:{
                required:true,
                date:true
            }
           },
           messages:{
            tc_name:{
                required:'姓名不能为空',
                rangelength:'长度应该在2-10之间'
            },
            tc_join_date:{
                required:'入职日期不能为空',
                date:'日期格式不正确'
            }
           }
       })
        
       //3-日期插件初始化
       $('input[name="tc_join_date"]').datepicker({
        format:'yyyy/mm-dd'
       })
    })
})