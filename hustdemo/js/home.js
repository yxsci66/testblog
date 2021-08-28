$(function() {
    // $(document).ready(function())
    var container = $('#container');
    var list = $('#list');
    var buttons = $('#buttons span');
    var prev = $('#prev');
    var next = $('#next');
    var index = 1;
    var len = 5;
    var interval = 3000;
    var timer;
    var jumphandle = $('#jumphandle');
    var gotop = $('#gotop');
    var gobot = $('#gobot');
    /* var yScoll = scrollTop();
    
    */

    /* function vi() {
        if (yScoll == 0) jumphandle.hide();
        else jumphandle.show();

    }

    gotop.bind('click', function() {
        scrollTop(0);
        vi();
    });
    gobot.bind('click', function() {
        scrollTop(999999);
        vi();
    });
 */
    $(window).scroll(function() {
        console.log($(document).scrollTop());

        if ($(document).scrollTop() > 0) {
            // $('.icon-zhiding').show();
            jumphandle.fadeIn();
        } else {
            jumphandle.fadeOut();
        }
    });

    gotop.click(function() {
        console.log($('html,body').scrollTop());
        $('html,body').animate({ "scrollTop": 0 });
    });
    gobot.click(function() {
        console.log($('html,body').scrollTop());
        $('html,body').animate({ "scrollTop": 99999 });
    });


    // 定义animate，300ms完成动画，回调left值
    function animate(offset) {
        var left = parseInt(list.css('left')) + offset;
        if (offset > 0) {
            offset = '+=' + offset;
        } else {
            offset = '-=' + Math.abs(offset);
        }
        list.animate({
            'left': offset
        }, 300, function() {
            if (left > -1360) {
                list.css('left', -1360 * len);
            }
            if (left < (-1360 * len)) {
                list.css('left', -1360);
            }
        });

    }
    // buttons只有一个处于'on'状态
    function showButton() {
        buttons.eq(index - 1).addClass('on').siblings().removeClass('on');
    }
    // 递归，每3000ms触发右翻页的点击事件
    function play() {
        timer = setTimeout(function() {
            next.trigger('click');
            play();
        }, interval);
    }
    // 取消setTimeout
    function stop() {
        clearTimeout(timer);
    }
    // 左右翻页键添加点击事件，动画未完成则不操作
    next.bind('click', function() {
        if (list.is(':animated')) {
            return;
        }
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        animate(-1360);
        showButton();
    });
    prev.bind('click', function() {
        if (list.is(':animated')) {
            return;
        }
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        animate(1360);
        showButton();
    });
    /* 
        // 单击任意buttons子元素实现跳转，动画未完成则不操作
        buttons.each(function() {
            $(this).bind('click', function() {
                if (list.is(':animated') || $(this).attr('class') == 'on') {
                    return;
                }
                var myIndex = parseInt($(this).attr('index'));
                var offset = -1360 * (myIndex - index);

                animate(offset);
                index = myIndex;
                showButton();
            });
        }); */
    // hover实现mouseenter与mouseleave
    buttons.mouseenter(function() {
        if ( /* list.is(':animated') || */ $(this).attr('class') == 'on') {
            return;
        }
        var myIndex = parseInt($(this).attr('index'));
        var offset = -1360 * (myIndex - index);

        animate(offset);
        index = myIndex;
        showButton();
    });
    container.hover(stop, play);
    play();
});