//入口函数
$(function() {
  var layer = layui.layer;
  var form = layui.form;
  //先设置link_reg点击事件
  $(".link_reg").on("click", function() {
    $(".login_box").hide();
    $(".reg_box").show();
  });
  //先设置link_login点击事件
  $(".link_login").on("click", function() {
    $(".login_box").show();
    $(".reg_box").hide();
  });
  //自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    somepwd: function(value) {
      var pwd = $(".reg_box [name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致";
      }
    }
  });
  //注册页面
  $("#form-reg").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://www.liulongbin.top:3007/api/reguser",
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg("注册失败");
        }
        layer.msg("注册成功,正在登陆");
        $(".link_login").click();
      }
    });
  });
  //登录页面
  $("#form-login").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://www.liulongbin.top:3007/api/login",
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/li_index.html";
      }
    });
  });
});
