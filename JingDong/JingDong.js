/**
 * Created by Administrator on 2016/10/7.
 */
$(function () {

    //设置所有a标签
    $("a").hover(function () {
        $(this).addClass("a-hover");
    }, function () {
        $(this).removeClass("a-hover");
    });

    //设置s变化的函数
    function s_change(obj) {
        obj.css({
            "top": 0
        });
    }

    function s_rechange(obj) {
        obj.css({
            "top": "-7px"
        });
    }

    //设置 显示/收起 下拉菜单的函数
    function dropdown(top, sChange, drop) {
        drop.show();
        s_change(sChange);
        top.addClass("borderChange");
    }

    function up(top, sChange, drop) {
        drop.hide();
        s_rechange(sChange);
        top.removeClass("borderChange");
    }


    // 送至：北京
    $(".send-city")
        .hover(function () {
            $(".send-city ul").show();
            s_change($(".send-city i s"));
            $(".send-city-first").addClass("borderChange");
        },function () {
            $(".send-city ul").hide();
            s_rechange($(".send-city i s"));
            $(".send-city-first").removeClass("borderChange");
        });
    $(".send-city ul li")
        .hover(function () {
            $(this).addClass("choose").siblings("li").removeClass("choose");
        }, function () {
            $(this).removeClass("choose");
        })
        .on('click',function () {
            $(".send-city-first .city span").html($(this).html());
            $(this).addClass("now-city").siblings("li").removeClass("now-city");
        });


    // 我的京东
    $(".top-nav-myjd")
        .hover(function () {
            dropdown($(".top-nav-myjd-top"), $(".top-nav-myjd-top a i s"), $(".top-nav-myjd-dropdown"));
        },function () {
            up($(".top-nav-myjd-top"), $(".top-nav-myjd-top a i s"), $(".top-nav-myjd-dropdown"));
        });


    // 手机京东
    $(".top-nav-right-phone")
        .hover(function () {
            dropdown($(".top-nav-right-phone-top"), $(".top-nav-right-phone-top a i s"), $(".top-nav-right-phone-dropdown"));
            $(".top-nav-right-phone .img").css({
                "background-position": "0 -25px"
            });
        },function () {
            up($(".top-nav-right-phone-top"), $(".top-nav-right-phone-top a i s"), $(".top-nav-right-phone-dropdown"));
            $(".top-nav-right-phone .img").css({
                "background-position": "0 0"
            });
        });

    //关注京东
    $(".top-nav-right-focus")
        .hover(function () {
            dropdown($(".top-nav-right-focus-top"), $(".top-nav-right-focus-top a i s"), $(".top-nav-right-focus-dropdown"));
        },function () {
            up($(".top-nav-right-focus-top"), $(".top-nav-right-focus-top a i s"), $(".top-nav-right-focus-dropdown"));
        });

    //客户服务
    $(".top-nav-right-service")
        .on('mouseenter', function () {
            dropdown($(".top-nav-right-service-top"), $(".top-nav-right-service-top a i s"), $(".top-nav-right-service-dropdown"));
        })
        .on('mouseleave', function () {
            up($(".top-nav-right-service-top"), $(".top-nav-right-service-top a i s"), $(".top-nav-right-service-dropdown"));
        });

    // 全部商品分类
    $(".all-kinds-sell-banner")
        .hover(function () {
            $(".all-kinds-sell-banner .differ-things")
                .on('mouseenter', function () {
                    $(".all-kinds-sell-banner-dropdown").show();
                });
        },function () {
            $(".all-kinds-sell-banner-dropdown").hide();
        });
    $(".all-kinds-sell-banner .differ-things li")
        .hover(function () {
            // $(this).addClass(".now-kind").siblings("li").removeClass(".now-kind");
            $(this).css({
                "background-color": "#ffffff"
            });
            $(this).children("a").css({
                "color": "#b1191a"
            });
            var index = $(this).index();
            $(".all-kinds-sell-banner-dropdown .house-apply")
                .eq(index).show()
                .siblings("li").hide();
        }, function () {
            // $(this).removeClass(".now-kind");
            $(this).css({
                "background-color": "#c81623"
            });
            $(this).children("a").css({
                "color": "#ffffff"
            });
        });


    //全部商品分类右侧二级菜单
    $(".left-active-kinds li")
        .mouseenter(function () {
            $(this).css({"background-color": "#C81623"});
            $(this).children(".arrow").css({"background-color": "#b1191a"});
        })
        .mouseleave(function () {
            $(this).css({"background-color": "#7c7171"});
            $(this).children(".arrow").css({"background-color": "#5c5251"});
        });


    // 轮播图

    //添加数字
    var ulNum = $("<ul></ul>");
    var lis = $(".all-kinds-sell-lunbotu ul li");
    for (var i = 1; i <= lis.length; i++) {
        ulNum.append("<li>" + (i) + "</li>");
    }
    ulNum.addClass("num").appendTo(".all-kinds-sell-lunbotu");


    // var imgWidth =  $(".all-kinds-sell-lunbotu .img li").eq(0).width();
    // var currentIndex = 0, hasStarted = false;
    $(".all-kinds-sell-lunbotu .img li:first")
        .show()
        .addClass("current")//将第1个数字设为激活状态
        .siblings("li").hide();//隐藏除第1张以外的图片

    //鼠标上悬时显示左右箭头，轮播图停止轮播；鼠标移开时隐藏左右箭头，轮播图开始
    $(".all-kinds-sell-lunbotu").hover(function () {
        $(".all-kinds-sell-lunbotu span").show();
        clearInterval(timer);
    }, function () {
        $(".all-kinds-sell-lunbotu span").hide();
        clearInterval(timer);
        timer = setInterval(auto, 2000);
    });

    //前后翻页
    var next = 0;
    $(".arrow-prev").on('click', function () {
        now = next;
        //若是这里不写now = next，只依靠play函数中的now = next，则轮播到最后一张图时，不会淡出，保持原位
        next = (--next + lis.length) % lis.length;
        play(now, next);
    });
    $(".arrow-next").on('click', function () {
        now = next;
        auto();
    });

    //鼠标滑到数字上时，按数字变化
    $(".all-kinds-sell-lunbotu .num li").on('mouseenter', function () {
        // now = $(".all-kinds-sell-lunbotu .number li").find(".current").index();
        // 不能这样写，是因为.current的添加较快，可能会直接添加到当前指向的数字
        //因此这里就在play函数中加一个now = next;
        next = $(this).index();
        play(now, next);
    });

    //自动轮播
    var timer = null;
    timer = setInterval(auto, 2000);

    function auto() {
        now = next;  //这里不写now = next则不会自动开始轮播
        next = (++next + lis.length) % lis.length;
        play(now, next);
    }

    function play(nowIndex, nextIndex) {
        $(".all-kinds-sell-lunbotu .img li")
            .eq(nowIndex).stop().fadeOut(300)
            .parent().children().eq(nextIndex).stop().fadeIn(500);
        $(".all-kinds-sell-lunbotu .num li")
            .removeClass("current")
            .eq(nextIndex)
            .addClass("current");
        now = next;
    }

    //main右侧菜单
    var iis = $(".bottom ul li a i");
    for (var j = 0; j < iis.length; j++) {
        iis.eq(j).css({
            "background-position": "0 " + (-25 * j) + "px"
        });
    }


    // main底部菜单
    // $(".main-bottom .inner .img").eq(0).show().siblings("li").hide();
    $(".main-bottom .right")
        .hover(function () {
            $(this).children("span").show();
        },function () {
            $(this).children("span").hide();
        });
    var leftLast = 0;
    $(".main-bottom .right .arrow-prev").on('click', function () {
        leftLast == 0 ? leftLast = -3015 : leftLast += 1005;
        $(".main-bottom .right .inner").animate({
            "left": leftLast
        })
    });
    $(".main-bottom .right .arrow-next").on('click', function () {
        leftLast == -3015 ? leftLast = 0 : leftLast -= 1005;
        $(".main-bottom .right .inner").animate({
            "left": leftLast
        })
    });


    // 右侧固定栏
    $(".fixed-right-box a")
        .hover(function () {
            $(this)
                .css({"background-color":"#c81623"})
                .children("span")
                .show();
            var width = $(this).children("span").width();
            $(this).children("span")
                .animate({
                    "left": -width - 18
                },200)
        },function () {
            $(this)
                .css({"background-color":"#7a6f6f"})
                .children("span")
                .animate({
                    "left": 0
                })
                .hide()
        });
    $(".fixed-right-box .down .backtop").on("click", function () {
        $(window).scrollTop(0);
    });


    // 左侧固定栏（楼层）
    $(".fixed-left ul li a")
        .hover(function () {
            $(this)
                .css({"background-color": "#b1191a"})
                .children("i").hide()
                .siblings("s").show().css({"color": "#ffffff"});
        },function () {
            $(this)
                .css({"background-color": "#ffffff"})
                .children("s").css({"color": "#b1191a"}).hide()
                .siblings("i").show()
        });


    $(window).on('scroll', function () {
        var scrollTop = $(document).scrollTop();
        if(scrollTop > 900) {
            $(".fixed-left").show();
            if(scrollTop < 1650) {
                $(".fixed-left ul li:eq(0) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(0)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F1-cloth-shoes s").animate({"top": 0});
            }else if(scrollTop < 2400) {
                $(".fixed-left ul li:eq(1) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(1)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F2-self-makeup s").animate({"top": 0});
            }else if(scrollTop < 3150) {
                $(".fixed-left ul li:eq(2) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(2)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F3-phone s").animate({"top": 0});
            }else if(scrollTop < 3900) {
                $(".fixed-left ul li:eq(3) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(3)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F4-house s").animate({"top": 0});
            }else if(scrollTop < 4650) {
                $(".fixed-left ul li:eq(4) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(4)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F5-computer s").animate({"top": 0});
            }else if(scrollTop < 5400) {
                $(".fixed-left ul li:eq(5) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(5)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F6-sport s").animate({"top": 0});
            }else if(scrollTop < 6150) {
                $(".fixed-left ul li:eq(6) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(6)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F7-life s").animate({"top": 0});
            }else if(scrollTop < 6900) {
                $(".fixed-left ul li:eq(7) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(7)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F8-baby s").animate({"top": 0});
            }else if(scrollTop < 7650) {
                $(".fixed-left ul li:eq(8) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(8)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F9-food s").animate({"top": 0});
            }else if(scrollTop < 8400) {
                $(".fixed-left ul li:eq(9) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(9)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F10-book s").animate({"top": 0});
            }else if(scrollTop < 9150) {
                $(".fixed-left ul li:eq(10) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(10)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F11-car s").animate({"top": 0});
            }else if(scrollTop < 9900) {
                $(".fixed-left ul li:eq(11) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(11)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F12-service s").animate({"top": 0});
            }else if(scrollTop < 16500) {
                $(".fixed-left ul li:eq(12) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(12)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
                $(".floormsg").css({"top": "-25px"});
                $(".F1-cloth-shoes s").animate({"top": 0});
            }
        }else {
            $(".fixed-left").hide();
            $(".floormsg").css({"top": "-25px"});
        }

        $(".fixed-left li").on("click", function () {
            var index = $(this).index();
            var targetHeight = 800 + 640*index;
            $(window).scrollTop(targetHeight);
        })
    });
    /*$(window).on('scroll', function () {
        var scrollTop = $(document).scrollTop();
        var lis = $('.fixed-left ul li');
        console.log(lis.length);
        if(scrollTop > 900) {
            $(".fixed-left").show();
            /!*for(var i = 0; i<lis.length;i++) {
                lis[i].index = i;
                lis[i].low = 900 + 750*i;
                lis[i].high = 900 + 750*(i+1);

            }*!/
            var index = parseInt((scrollTop - 900) / 750);
            setInterval(function () {
                $(".fixed-left ul li:eq(index) a")
                    .children("i").hide()
                    .siblings("s").show();
                $(".fixed-left ul li:eq(index)").siblings("li").children("a")
                    .children("i").show()
                    .siblings("s").hide();
            },30);
        }else {
            $(".fixed-left").hide();
        }
    })*/
});


























