$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: "", //文章分类的 Id
        state: "",
    }
    //定义时间过滤器

    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date(date);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;

    }

    //封装一个补零的函数
    function padZero(num) {
        return num > 9 ? num : '0' + num;
    }

    initTable();
    initCate();
    //文章列表初始化
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("文章列表获取失败");
                }
                layer.msg("文章列表获取成功");
                var htmlStr = template("list", res);
                $('tbody').html(htmlStr);
                usePage(res.total);
            }
        });
    }
    //列表初始化
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("列表获取失败");
                }
                var htmlStr = template('cateList', res);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }
    // 绑定筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    });


    //分页显示
    function usePage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pager', //注意，这里的 pager 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr: q.pagenum,
            layout: ['count', 'prev', 'page', 'next', 'skip', "limit"],
            // layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            limit: q.pagesize,
            limits: [2, 3, 5, 7, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit;
                if (!first) {
                    //do something
                    initTable();
                }
            }
        });
    }


});