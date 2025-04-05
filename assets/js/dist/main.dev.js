"use strict";

(function ($) {
  "use strict"; // preloader
  //---------------------------------------------------------------

  $(window).load(function () {
    $("#loading").delay(1600).fadeOut(1000);
    $("#loading-center").click(function () {
      $("#loading").fadeOut(1000);
    });
  }); // meanmenu active
  //---------------------------------------------------------------

  jQuery('#mobile-menu').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991"
  }); // Data-background
  //---------------------------------------------------------------

  $("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
  }); // sticky
  //---------------------------------------------------------------
  // sticky-header

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  }); // Show or hide the sticky footer button
  //---------------------------------------------------------------

  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 600) {
      $('#scroll').fadeIn(200);
    } else {
      $('#scroll').fadeOut(200);
    }
  });
  /* magnificPopup video view */
  //---------------------------------------------------------------

  $('.popup-video').magnificPopup({
    type: 'iframe'
  }); //Animate the scroll to Top
  //---------------------------------------------------------------

  $('#scroll').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1500);
  }); // One Page Nav
  //---------------------------------------------------------------

  var top_offset = $('.header-area').height() - 10;
  $('.main-menu nav ul').onePageNav({
    currentClass: 'active',
    scrollOffset: top_offset
  }); // niceSelect
  //---------------------------------------------------------------

  $('select').niceSelect(); // Testimonial active
  //---------------------------------------------------------------

  $('.testimonial-info').slick({
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="flaticon-left-arrow"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="flaticon-right-arrow-angle"></i></button>',
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }, {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); // Brand active
  //---------------------------------------------------------------

  $('.brand-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }, {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  }); // tabs protflio
  //----------------------------------------------------------------------------------------

  $(window).load(function () {
    var $grid = $('.item-active').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 1
      }
    }); // filter items on button click

    $('.item-menu').on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });
    });
  }); // tabs protflio-menu
  //----------------------------------------------------------------------------------------
  // filter items on button click

  $('.portfolio-menu').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  }); // change is-checked class on buttons

  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });
  /* magnificPopup img view */
  //---------------------------------------------------------------

  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
  /* magnificPopup video view */
  //---------------------------------------------------------------

  $('.popup-video').magnificPopup({
    type: 'iframe'
  }); //---------------------------------------------------------------

  $('.grid').imagesLoaded(function () {
    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-item'
      }
    });
  }); // counterUp
  //---------------------------------------------------------------

  $('.counter').counterUp({
    delay: 10,
    time: 2000
  }); // counter
  //---------------------------------------------------------------

  var animationDuration = 6000;
  var frameDuration = 1000 / 60;
  var totalFrames = Math.round(animationDuration / frameDuration);

  var easeOutQuad = function easeOutQuad(t) {
    return t * (2 - t);
  };

  var animateCountUp = function animateCountUp(el) {
    var frame = 0;
    var countTo = parseInt(el.innerHTML, 10);
    var counter = setInterval(function () {
      frame++;
      var progress = easeOutQuad(frame / totalFrames);
      var currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  var countupEls = document.querySelectorAll('.timer');
  countupEls.forEach(animateCountUp); // Active WOW js
  //---------------------------------------------------------------
  // wow active

  new WOW().init();
  AOS.init({
    duration: 1200
  });
})(jQuery);