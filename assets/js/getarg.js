
/**
 * 获取地址栏中的参数，并把它转换为对象
 */
define(function(){
    var search = window.location.search;
    var str = search.split('?')[1] || null;
    //console.log(str);
    var arr = str.split('&') || null;
    var obj = {};
    arr.forEach(function(item){
        var key = item.split('=')[0];
        var value = item.split('=')[1];
        obj[key] = value;
    })
    return obj;
})