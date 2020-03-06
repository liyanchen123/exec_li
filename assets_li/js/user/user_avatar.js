$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  //点击上传按钮,弹出文件选择
  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  //对file文件域进行监听

  $("#file").on("change", function () {
    var file = $("#file")[0].files;
    if (file.length === 0) {
      return layer.msg('请选取文件');
    }
    var newImgURL = URL.createObjectURL(file[0]);
    // 2. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域

  });
  $("#upload").on("click", function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化
    $.post('/my/update/avatar', {
      avatar: dataURL,
    }, function (res) {
      if (res.status !== 0) {
        return layer.msg("头像更新失败");
      }
      layer.msg("头像更新成功");
      window.parent.getUserInfo();
    });
  });





});