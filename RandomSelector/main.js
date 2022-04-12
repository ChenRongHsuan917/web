$('.js-img-shake').hide();

$('.js-start').on('click', function () {
    var options = $('.js-textarea').val().split('\n');
    var rand = Math.floor(Math.random()*options.length);

    $('.js-img-shake').show();
    $('.js-img-ok').hide();
    $('.js-result').text('等待結果...');
    setTimeout(function() {
        $('.js-img-shake').hide();
        $('.js-img-ok').show();
        $('.js-result').text('今晚吃：' + options[rand]);
    }, 3000);

    //var imgnumber = Math.floor(Math.random()*4)+1; 
    //document.write(
    //"<a href='../index.html'><img src='" + imgnumber + ".jpg'/></a>"
   // );
});
