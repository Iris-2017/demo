$(function () {
    $('#top ul.right li').hover(function () {
        $(this).toggleClass('hover').find('.details').finish().slideToggle(100);
    });
    $('#top ul.right li.fuwu .details a,#top ul.right li.teamwork .details a').hover(function () {
        $(this).toggleClass('hove');
    });
    $('#logWrap .nowCity').hover(function () {
        $(this).toggleClass('hover');
    });
    $('#logWrap .nowCity .cityList ul li').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    $('#navWrap ul.nav li').hover(function () {
        $(this).toggleClass('hover');
    });
    //幻灯效果
    //获得幻灯片图片的数量以及对应的页面数量(5),动态获取数量。
    var isRun = true;
    /*var slideNum = $('#slideWrap ul.slide>li').length;
     var slideNumHtml = '<ul class="num">';
     for (var i = 1; i <= slideNum; i++) {
     slideNumHtml += '<li>' + i + '</li>';
     }
     slideNumHtml += '</ul>';
     $('#slideWrap ul.slide').after(slideNumHtml);*/

    function showSlide(num) {
        if (num == $('#slideWrap ul.num>li').index($('#slideWrap ul.num>li.current'))) {
            return null;
        }
        $('#slideWrap ul.slide>li')
            .finish()
            .filter(':visible').fadeOut()
            .css({'z-index': 0})
            .end().eq(num).fadeIn().css({'z-index': 1});
        $('#slideWrap ul.num>li').filter('.current').removeClass('current').end().eq(num).addClass('current')
    }

    showSlide(0);
    $('#slideWrap ul.num>li').on('mouseenter.trigger', function () {
        showSlide($('#slideWrap ul.num>li').index(this));
    });

    //设置变量isRun=true，鼠标悬停在图片或图片页码上时，变为false，则停止播放，离开则播放。
    $('#slideWrap ul.slide,#slideWrap ul.num>li').hover(function () {
        isRun = false;
    }, function () {
        isRun = true;
    });

    //(每间隔3秒)如果执行下一个直到li.current长度为0，到尾，返回第一个，实行模拟(triggerHandler) mouseenter事件，否则执行下一个。
    setInterval(function () {
        if (isRun) {
            if ($('#slideWrap ul.num>li.current').next().length == 0) {
                $('#slideWrap ul.num>li').eq(0).triggerHandler('mouseenter.trigger')
            } else {
                $('#slideWrap ul.num>li.current').next().triggerHandler('mouseenter.trigger')
            }
        }
    }, 5000);
    /********************************/

    $('#leftNav ul.nav>li').click(function () {
        $(this).addClass('current');
        $(this).siblings().removeClass('current');
    });
    $('#leftNav ul.nav li .details ul.list li').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
    });

    $('#leftNav ul.nav li .list li:eq(0)').click(function () {
        $(this).parent().siblings().css({"display": "block"});
        $(this).parent().siblings('.tb2,.tb3').css({"display": "none"});
    });
    $('#leftNav ul.nav li .list li:eq(1)').click(function () {
        $(this).parent().siblings().css({"display": "block"});
        $(this).parent().siblings('.tb1,.tb3').css({"display": "none"});
    });
    $('#leftNav ul.nav li .list li:eq(2)').click(function () {
        $(this).parent().siblings().css({"display": "block"});
        $(this).parent().siblings('.tb1,.tb2').css({"display": "none"});
    });


    $('#contentBox ul.nav li').click(function () {
        $(this).addClass('at');
        $(this).siblings().removeClass('at');
    });
    $('#cjjx ul.nav li').not('.li0').click(function () {
        $(this).addClass('at1');
        $(this).siblings().removeClass('at1');
    });
    $('#cjjx .imgWrap').hover(function () {
        $(this).find('img').css({"transform": "scale(1.2)", "transition": "1s"});
    }, function () {
        $(this).find('img').css({"transform": "scale(1)", "transition": "1s"});
    });

    /******************************************************************/
    $('#contentBox .left ul li').hover(function () {
        $(this).find(".imgWrap .box").css({"display": "block"});
    }, function () {
        $(this).find(".imgWrap .box").css({"display": "none"})
    });
    $('#jxth .title ul li,#cjjx .title ul li').click(function () {
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur');
    });

    /************************图片随着滚动条的滑动而加载*******************************/
    /***使用，将需要延迟加载的图片的src属性修改为data-src，然后给需要延迟加载的图片加上delay这个css类******/
    /*将所有需要延迟加载的图片设置一个初始的图片*/
    /*$('img.delay').attr('src', 'images/XXXX.jpg');*/
    function delay() {
        //当所有的图片加载完毕，delay为0后，移除掉绑定的事件处理函数。
        if ($('img.delay').length == 0) {
            $(window).off('.delay');
        }
        //将所有需要延迟加载的img图片+上class='delay',src变为data-src，并且each遍历
        $('img.delay').each(function () {
            //如果图片距离文档顶部的距离<浏览器窗口高度+滚动条滑动后距离顶部的高度
            if ($(this).offset().top < $(window).height() + $(window).scrollTop()) {
                //<img data-src="">图片添加src属性，从data-src中，使用data()方法中获取src属性,
                //并且移除掉class="delay"则再滑动至该图片时就不会重复加载
                $(this).attr('src', $(this).data('src')).removeClass('delay');
            } else {
                //如果没有执行到第1张图片，则跳出循环，提高效率
                return false;
            }
        });
    }

    delay();
    $(window).on('scroll.delay resize.delay', delay);

    $('#appxb .appxb-header img').click(function () {
        $(this).animate({"left": "-170px"}, '700');
        $('#appxb .appxb-icon').animate({"left": "0%"}).css({"transition": "all,0.5s,ease-out,0.7s"});
    });

    $('#appxb .fuli .icon').hover(function () {
        $(this).css({"transform": "rotate(180deg)", "transition": "all 0.5s ease 0s"});
    }, function () {
        $(this).css({"transform": "rotate(0deg)", "transition": "all 0.5s ease 0s"});
    });
    $('#appxb .fuli .icon').click(function () {
        $('#appxb .appxb-icon').animate({"left": "-380%"}).css({"transition": "all,0.5s,ease-out,0.7s"});
        $('#appxb .appxb-header img').animate({"left": "0px"}).css({"transition": "all,0.3s,ease-out,1s"});
    });

    $('#slider .top-img').hover(function () {
        $(this).children('div').css({"display": "block"});
    }, function () {
        $(this).children('div').css({"display": "none"});
    });

    $('#slider .slider-tools ul .p').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) -40px -95px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -120px -47px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .d').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) -40px -47px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -120px 0px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .f').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) -40px 0px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -80px -141px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .s').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) 0px -141px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -80px -94px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .k').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) 0px -95px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -80px -47px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .q').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) -40px -141px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-166px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -120px -94px"});
        $(this).find('span').animate({"left": "-199px"}).fadeOut(10);
    });
    $('#slider .slider-tools ul .t').hover(function () {
        $(this).css({"background": "rgb(255,102,0) url(images/tools.png) 0px -47px"});
        $(this).find('span').css({"display": "block"}).animate({"left": "-86px", "opacity": "1"});
    }, function () {
        $(this).css({"background": "rgb(51, 51, 51) url(images/tools.png) -80px 0px"});
        $(this).find('span').animate({"left": "-119px"}).fadeOut(10);
    });
    $('#cjjx .rightList ul li').hover(function () {
        $(this).find('.mark').css({"display": "block"});
    }, function () {
        $(this).find('.mark').css({"display": "none"});
    });

    $('#slider .slider-tools .t').click(function () {
        $('html,body').animate({"scrollTop": "0"});
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('#slider .slider-tools .t').css({'visibility': 'visible'});
        } else {
            $('#slider .slider-tools .t').css({'visibility': 'hidden'});
        }
    });
});