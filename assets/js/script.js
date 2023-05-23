/*OWL CAROUSEL*/
$('.my-work').owlCarousel({
    animateOut: 'slideOutDown',
    autoplay:'true',
    autoplayTimeout: '3000',
    autoplaySpeed: '1000',
    navText: ['<span class="jam jam-arrow-left"></span>','<span class="jam jam-arrow-right"></span>'],
    loop:true,
    margin:24,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        568:{
            items:2
        },
        768:{
            items:2
        },
        992:{
            items:3
        },
        1000:{
            items:3
        }
    }
});

/*SMALL NAV DROP-DOWN*/
$(document).click(function () {
    if ($(event.target).closest(".menu-btn").length != 0)return false;
    $(".small-drop-down").fadeOut(400);
});
$(".small-drop-down").hide(0);
$(".menu-btn").click(function () {
    $(".small-drop-down").fadeToggle(400);
});

/*STICKY NAV*/
$(document).scroll(function (event) {
    if($(document).scrollTop() > 150){
        $('.Navbar-portion').addClass('sticky-nav');
    }
    if($(document).scrollTop() < 150){
        $('.Navbar-portion').removeClass('sticky-nav');
    }
});


