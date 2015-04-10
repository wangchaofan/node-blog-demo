/**
 * Created by Administrator on 2015/4/1.
 */
$('#regform').on('click', 'button', function () {
    var form = $('#regform')
        ,username = form.find('#username').val()
        ,passowrd = form.find('#password').val()
        ,repassword = form.find('#repassword').val();
    var html = '';
    if(username === '') {
        html = '<strong>用户名不能为空</strong>';
    } else if (username.length < 5) {
        html = '<strong>用户名最小长度为5个字符</strong>';
    } else if(passowrd === '') {
        html = '<strong>密码不能为空</strong>'
    } else if (passowrd.length < 6) {
        html = '<strong>密码最小长度为6个字符</strong>';
    } else if(repassword !== passowrd) {
        html = '<strong>两次输入密码不一致</strong>'
    }
    if(html !== '') {
        if($('.alert').length > 0) {
            $('.alert').addClass('alert-danger').html(html);
        } else {
            var alert = $('<div class="alert alert-danger" role="alert">'+html+'</div>');
            form.prepend(alert);
        }
        return false;
    }
});