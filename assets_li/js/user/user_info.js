$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 昵称验证规则

    form.verify({
        nickname: [/^[\S]{2,6}$/, "昵称必须2到6位，且不能出现空格"]
        //   username: function (value) {
        //       var
        //   }

    });
    getxin();
    //先获取数据信息,封装1个函数
    function getxin() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("信息获取失败");
                }
                layer.msg("信息获取成功");
                form.val("f1", res.data);
            }
        });
    }
    //设置提交修改的点击事件
    $("#form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("信息更新失败");
                }
                layer.msg("更新成功");
                window.parent.getUserInfo();
            }
        });
    });
    //设置重置按钮的功能
    // $("#btnReset").on("click", function (e) {
    //     e.preventDefault();


    // });

});