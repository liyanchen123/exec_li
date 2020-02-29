$(function () {
    //获取登录信息
    var layer = layui.layer;
    getUserInfo();
    $('.login_out').on("click", function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = "/li_login.html"
            layer.close(index);
        });
    })



})
//封装一个函数,获取登录信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('信息获取失败');
            }
            //跟新用户信息
            raderAvatar(res.data);
        }

    })
}
//对获取的信息封装一个函数,用于更新头像
function raderAvatar(user) {
    var name = user.nickname || user.username;
    $(".welcom").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".ziti_avatar").hide();
    } else {
        var first = name[0].toUpperCase();
        $(".ziti_avatar").html(first).show();
        $(".layui-nav-img").hide();
    }
}