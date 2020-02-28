//入口函数
$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //先设置link_reg点击事件
    $(".link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show();
    });
    //先设置link_login点击事件
    $(".link_login").on("click", function () {
        $(".login_box").show();
        $(".reg_box").hide();
    });
    //自定义校验规则
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        somepwd: function (value) {
            var pass = $(".reg_box [name=password]").val();
            if (value !== pass) {
                return "两次密码不一致"
            }
        }

    });
    //设置注册事件
    $(".lg_gin").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送注册请求
        $.ajax({
            type: "POST",
            url: "http://www.liulongbin.top:3007/api/reguser",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('res.message');
                }
                layer.msg('注册成功,请登录');
                //触发登录框跳转
                $(".link_login").click();
            }
        });
        //设置提交事件




    })
})