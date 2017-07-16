//要实现的功能
//1-上传图片
//2-裁剪图片（Jcrop）,保存裁剪的宽高和坐标
//3-给按钮注册点击裁剪事件，将坐标发送给服务器
//4-成功跳转到下一个页面




require(['/two/assets/js/config.js'],function(){
    require(['jquery','/two/assets/js/getarg.js','Jcrop','/two/assets/js/common.js'],function($,args){    
        //定义对象，存储坐标
        var coords = {}; 
        //上传图片  
        $('#content').on('change','#upfile',function(){          
            nativeUploader();          
        })
        //点击按钮，裁剪图片
        subCoords()

        //原生js上传图片
        function nativeUploader(){
            var fileInput = document.getElementById('upfile').files[0];
            //console.log(fileInput);
            var xhr = new XMLHttpRequest();
            xhr.open('post','/api/uploader/cover');
            xhr.onreadystatechange = function(e){
                if(xhr.readyState==4 && xhr.status==200){
                    var data = JSON.parse(xhr.responseText);
                    var img = document.querySelector('.preview img');
                    img.src = data.result.path; 
                    jcropInit();
                }
            }
            var fd = new FormData();
            fd.append('cs_id',args.cs_id);
            fd.append('cs_cover_original',fileInput);
            // console.log(args.cs_id);
            // console.log(fileInput);
            xhr.send(fd);
        }

        //裁剪图片插件获取坐标值
        function jcropInit(){
            var options = {
                onSelect:function(c){
                    coords = c;
                    console.log(coords);
                }
            }
            $('.preview img').Jcrop(options,function(){

            })
        }

        //点击裁切按钮，把坐标发送给后台服务器
        function subCoords(){
            $('#sub').on('click',function(){
                coords.cs_id = args.cs_id;
                var options = {
                    type:'post',
                    url:'/api/course/update/picture',
                    data:coords,
                    success:function(data){
                        if(data.code==200){
                            window.location.href = './step3.html?cs_id='+ data.result.cs_id;
                        }
                    }
                }
                $.ajax(options);
            })
        }

    })
})