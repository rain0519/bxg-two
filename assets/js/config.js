require.config({
    baseUrl:'/two/node_modules',
    paths:{
        jquery:'./jquery/dist/jquery',
        cookie:'./jquery.cookie/jquery.cookie',
        nprogress:'./nprogress/nprogress',
        template:'./art-template/lib/template-web',
        bootstrap:'./bootstrap/dist/js/bootstrap',
        // 'datepicker', 'validate', 'form'
        datepicker:'./bootstrap-datepicker/dist/js/bootstrap-datepicker',
        zh:'./bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        validate:'./jquery-validation/dist/jquery.validate',
        form:'./jquery-form/dist/jquery.form.min',
        Jcrop:'../Jcrop/js/jquery.Jcrop'

    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        zh:{
            deps:['jquery','datepicker']
        },
        Jcrop:{
            deps:['jquery']
        }
    }
    
})