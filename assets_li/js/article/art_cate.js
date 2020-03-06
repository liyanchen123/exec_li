$(function () {
    var layer = layui.layer;
    var form = layui.form;

    initTable();
    //初始化列表数据
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("文章列表更新失败");

                }
                layer.msg("列表更新成功");
                var htmlStr = template("temp", res);
                $("tbody").html(htmlStr);
            }

        });
    }
    //点击添加类别,弹框
    $("#showAdd").on("click", function () {
        addIndex = layer.open({
            type: 1,
            title: "添加文章分类",
            content: $("#tpl-add").html(),
            area: ['500px', '300px'],
        });
        //设置添加类别功能
        $("body").on("submit", "#form-add", function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("添加失败");
                    }
                    layer.msg();
                    initTable();
                    layer.close(addIndex);
                }

            })

        });

    });


    //添加编辑功能

    $("body").on("click", "#edit", function () {
        editIndex = layer.open({
            type: 1,
            title: "修改文章分类",
            content: $("#tpl-edit").html(),
            area: ['500px', '300px'],
        });
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败');
                }
                form.val("form-edit", res.data);
            }
        })
        //发送数据编辑请求
        $("body").on("submit", '#form-edit', function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("更新失败");
                    }
                    layer.msg("更新成功");
                    initTable();
                    layer.close(editIndex);

                }
            });
        });
    });


    //删除功能

    $("body").on("click", "#del", function () {
        var id = $(this).attr("data-id");
        layer.confirm('确定删除?', {
            // icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除失败");
                    }
                    layer.msg("删除成功");
                    layer.close(index),
                        initTable();
                }

            });

        });

    });


});