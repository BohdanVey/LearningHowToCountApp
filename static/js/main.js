jQuery(document).ready(function ($) {

    'use strict';


    $(".Modern-Slider").slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        fade: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        // fade:true,
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>',
    });

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });

    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    })


    $(".box-video").click(function () {
        $('iframe', this)[0].src += "&amp;autoplay=1";
        $(this).addClass('open');
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    })


    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');

    //when a nav link is clicked, smooth scroll to the section
    navigation.on('click', 'a', function (event) {
        event.preventDefault(); //prevents previous event
        smoothScroll($(this.hash));
    });

    //update navigation on scroll...
    $(window).on('scroll', function () {
        updateNavigation();
    })
    //...and when the page starts
    updateNavigation();

    /////FUNCTIONS
    function updateNavigation() {
        contentSection.each(function () {
            var sectionName = $(this).attr('id');
            var navigationMatch = $('nav a[href="#' + sectionName + '"]');
            if (($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationMatch.addClass('active-section');
            } else {
                navigationMatch.removeClass('active-section');
            }
        });
    }

    function smoothScroll(target) {
        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }


    $('.button a[href*=#]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 0}, 500, 'linear');
    });


});


function calculate_multinomial_coefficient() {

    word = document.getElementById("multonomial_theorem_input").value.toLowerCase();
    let arr = Array(28);
    for (let i = 0; i < 28; i += 1) {
        arr[i] = 0;
    }
    for (let i = 0; i < word.length; i += 1) {
        arr[word.charCodeAt(i) - 'a'.charCodeAt(0)] += 1;
    }
    let ans = 1;
    for (let i = 1; i <= word.length; i += 1)
        ans *= i;
    for (let i = 0; i < 28; i += 1) {
        for (let j = 2; j <= arr[i]; j += 1)
            ans /= j;
    }

    let some_text = '$$N = {N_{total} \\choose{'
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i += 1) {
        if (arr[i - 97] > 0) {
            console.log(String.fromCharCode(i - 'a'.charCodeAt(0) + 'A'.charCodeAt(0)));
            some_text += 'N_{' + String.fromCharCode(i).toUpperCase() + '}';
        }
    }
    some_text += '}} = {' + word.length + ' \\choose{';
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i += 1) {
        if (arr[i - 97] > 0) {
            some_text += arr[i - 97] + '\\text{ }';
        }
    }
    some_text += '}} = ' + ans + '$$';

    some_text = MathJax.tex2chtml(some_text);
    console.log(some_text);
    document.getElementById("answer_multinomial_theorem").innerHTML = '';
    document.getElementById("answer_multinomial_theorem").appendChild(some_text);
    MathJax.startup.output.clearCache();
}