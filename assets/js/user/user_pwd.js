$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // value是新获取到的密码的值
            // $('[name=newPwd]').val())代表获取原来密码的值的意思
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    // 为表单绑定提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单  
                // $('.layui-form')[0] 是将jQuery转换为原生js，.reset（）是原生js的方法，可把表单中的元素重置为它们的默认值。必须将jQuery转换为原生的js才能使用
                $('.layui-form')[0].reset()
            }
        })
    })
})
