/**
 * 讲师列表页面
 * 功能1: 获取讲师的信息并展示
 * 功能2: 点击查看，展示讲师详细信息
 * 功能3：点击按钮，注销或启用
 */

require(['/two/assets/js/config.js'],function(){//先引入config.js配置文件
    require(['jquery','template','bootstrap',,'/two/assets/js/common.js'],function($,template){
       
        getTeacherList();//获取教师信息列表
        getDetailInfo();//点击查看按钮，获取讲师详细信息
        stopOrStart();//点击按钮，注销或启用

        //1-获取教师信息并展示
        function getTeacherList(){
            var options = {
                url:'/api/teacher',
                type:'get',               
                success:function(data){
                    if(data.code==200){
                        //console.log(data);
                        var result = template('tmpl-list',{list:data.result});
                        $('#list').html(result);
                    }else{
                        alert('没有获取到数据');
                    }
                }
            };
            $.ajax(options);
        }

        //2-点击查看按钮，获取讲师详细信息
        function getDetailInfo(){
            $('#list').on('click','.preview',function(){
                $('#teacherModal').modal();
                //console.log(123);
                var tcId = $(this).closest('tr').attr('tc-id');
                //console.log($(this));
                var options = {
                    type:'get',
                    url:'/api/teacher/view',
                    data:{
                        tc_id:tcId
                    },
                    success:function(data){
                        if(data.code==200){
                            //console.log(data);
                            var obj = data.result;
                            var result =`
                                <tr>
                                    <th>姓名:</th>
                                    <td>${obj.tc_name}</td>
                                    <th>职位:</th>
                                    <td colspan="3">讲师</td>
                                    <td rowspan="4" width="128">
                                        <div class="avatar">
                                            <img src="${obj.tc_avatar}" alt="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>花名:</th>
                                    <td>${obj.tc_roster}</td>
                                    <th>出生日期:</th>
                                    <td colspan="3">${obj.tc_birthday}</td>
                                </tr>
                                <tr>
                                    <th>性别:</th>
                                    <td>${obj.tc_gender}</td>
                                    <th>入职日期:</th>
                                    <td colspan="3">${obj.tc_join_date}</td>
                                </tr>
                                <tr>
                                    <th>手机号码:</th>
                                    <td colspan="2">${obj.tc_cellphone}</td>
                                    <th>邮箱:</th>
                                    <td colspan="2">${obj.tc_email}</td>
                                </tr>
                                <tr>
                                    <th>籍贯:</th>
                                    <td colspan="6">${obj.tc_hometown}</td>
                                </tr>
                                <tr>
                                    <td colspan="7">
                                        <div class="introduce">
                                            ${obj.tc_introduce}
                                        </div>
                                    </td>
                                </tr>
                            `;
                            $('#modal-list').html(result);
                          
                        }
                    },
                    error:function(){
                        console.log('出错了');
                    }
                }
                $.ajax(options);
            })
        }

        //3-点击按钮，注销或启用
        function stopOrStart(){
            $('#list').on('click','.start-stop',function(){
                var $this = $(this);
                var $tr = $this.closest('tr');
                var tcId = $tr.attr('tc-id');
                var tcStatus = $tr.attr('tc-status');
                var options = {
                    type:'post',
                    url:'/api/teacher/handle',
                    data:{
                        tc_id:tcId,
                        tc_status:tcStatus
                    },
                    success:function(data){
                        //console.log(data);
                        var str = data.result.tc_status == 0 ? '注销' : '启用';
                        $tr.attr('tc-status',data.result.tc_status);
                        $this.text(str);
                    }
                };
                $.ajax(options);
            })
        }
        //传入出生日期，并返回年龄
        function getAge(birth){
            var birthYear = new Date(birth).getFullYear();
            var nowYear = new Date().getFullYear();
            return nowYear - birthYear; 
        }
        // 让所有的artemplate模板中可以使用getTecAge这个方法
        // template.defaults.imports是固定的
        // 过滤器，给模板中提供方法。
        template.defaults.imports.getTecAge = getAge;
    })
})
