$(function() {

// header
    var $header = $(".header"),
        $nav = $(".header .right .nav");

    // 헤더영역 스크롤이벤트
    $(window).on("scroll", function() {
        var scrollTop = $(window).scrollTop(), // 스크롤된 높이
            headerHeight = $header.height(); //헤더의 높이

        // 스크롤된 높이가 헤더의 높이보다 클경우
        if (headerHeight < scrollTop) {
            $header.addClass("fixed");
        } else {
            // 그렇지 않으면
            $header.removeClass("fixed");
        }
    }); //scroll end


// 비쥬얼 영역
    var visual = $(".visual"),
        main = visual.children(".main"),
        content = main.children(".content"),

        gallery = visual.children(".gallery"),
        sub = gallery.children(".sub"),
        sub_length = sub.children("li").length,

        target = " ",
        currentIndex = 0;

        // sub 갤러리 클릭시 발생할 이벤트
        sub.children("li").each(function(i) {

            $(this).on("click", function() {
                $(".on").removeClass("on");
                $(this).addClass("on");
                target = $(this).attr("data-target");

                $("#" + target).parent(".content").fadeOut(500, function(){
                    $("#" + target).addClass("on").parent(".content").fadeIn(500)
                });
            })
        }); // sub end

        // 이미지 체인지 함수
        function change(index) {
            // console.log(index);
            currentIndex = index;

            sub.children("li").removeClass("on");
            sub.children("li").eq(currentIndex).addClass("on");

            content.children("li").removeClass("on");
            content.children("li").eq(currentIndex).addClass("on");
        }; // change end

        // 슬라이드 타이머 start 함수
        function timerstart() {
            timer = setInterval(function() {
                nextIndex = (currentIndex + 1) % sub_length;
                change(nextIndex);
            }, 2000);
        } //slide timer end

        // 함수 실행
        timerstart();

        // 슬라이드 타이머 stop 함수
        function timerstop() {
            clearInterval(timer)
        }; //slide timer end

        // 갤러리 hover
        gallery.hover(
            function() {timerstop()},
            function() {timerstart()}
        ); // end

// 사이드 바
        var $sidebar = $(".sidebar"),
            $sidebar_menu = $sidebar.find(".menu"),
            $sidebar_menu_show = $(".sidebar_menu_show"),
            $sidebar_1st_choice = $(".sidebar .menu .gnb > ul > li > a"),
            $sidebar_2st_choice = $(".sidebar .menu .gnb .detail_menu_header > ul > li"),
            $detail_menu = $(this).next(".detail_menu_nav"),
            $back = $(".back");

        var window_width = $(window).width();

        // 클릭시 slide 보임
        $sidebar_menu_show.on("click", function() {
            $sidebar.fadeIn(500)
        });

        // 클로즈 클릭시 slide 사라짐
        $sidebar.find(".close").on("click", function() {
            $sidebar.find(".show").removeClass("show");
            $sidebar.fadeOut(500);
        });

        // 슬라이드 메뉴의 처음 선택
        $sidebar_1st_choice.on("click", function(event) {
            // 기본이벤트제거
            event.preventDefault();

            if ($(this).next(".detail_menu_header").is(":visible")) {
                $(this).removeClass("hide").next(".detail_menu_header").slideUp(500);
            } else {
                $sidebar_1st_choice.removeClass("hide").next(".detail_menu_header:visible").slideUp(500);
                $(this).removeClass("hide").next(".detail_menu_header").slideDown(500);
            }
        }); /*sidebar_1st end*/

        // 슬라이드 메뉴의 2번째 선택
        $sidebar_2st_choice.each(function() {
            $(this).children("a").on("click", function() {
                if ($detail_menu.is(":visible")) {
                    $(this).next(".detail_menu_nav").removeClass("show");
                } else {
                    // 만약 window의 크기가 767 보다 크면 실행한다.
                    if (window_width > 767) {
                        $(".detail_menu_nav.show").removeClass("show");
                        $(this).next(".detail_menu_nav").addClass("show").parents(".sidebar .menu").addClass("show");
                    } else {
                        $(".detail_menu_nav.show").removeClass("show");
                        $(this).next(".detail_menu_nav").addClass("show");
                    }
                };
                // 요소를 클릭하면 .back on
                $(this).parents(".detail_menu_header").next(".back").addClass("on");
            });
        }); /*sidebar_2st end*/

        // back 아이콘 클릭시
        $back.on("click", function() {
            $(".detail_menu_nav.show").removeClass("show").parents(".sidebar .menu").removeClass("show");
            // 클릭시 back 에 on클래스 제거하여 back이 사라지게 만듬
            $back.removeClass("on");
        });

// footer
    var footer = $(".footer"),
        drop = footer.find(".top > ul");

        drop.children("li").each(function(i) {

            $(this).children("h3").on("click", function() {
                if ($(this).next("ul").is(":visible")) {
                    $(this).next("ul").slideUp(500);
                } else {
                    drop.find("h3").next("ul:visible").slideUp(200);
                    $(this).next("ul").slideDown(500);
                }
            })
        }) /*각 li 마다 이벤트 핸들러 */

})
