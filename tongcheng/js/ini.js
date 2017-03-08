//1190,990px
$(window).on('resize', function () {
    if ($(window).width() > 1190) {
        $('body').attr('class', 'w1190');
    } else {
        $('body').attr('class', 'w990');
    }
});
