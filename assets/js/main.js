(function ($) {
"use strict";

    // preloader
    //---------------------------------------------------------------
    $(window).on('load',function() {
        $("#loading").delay(200).fadeOut(1000);
        $("#loading-center").click(function() {
        $("#loading").fadeOut(1000);
        })
    })


    // meanmenu active
    //---------------------------------------------------------------
    jQuery('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "991"
    });

    // Data-background
    //---------------------------------------------------------------
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });


    // sticky
    //---------------------------------------------------------------
	// sticky-header
	$(window).on('scroll',function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$(".header-area").addClass("sticky");
		}
		else {
			$(".header-area").removeClass("sticky");
		}
	});

    // Show or hide the sticky footer button
    //---------------------------------------------------------------
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('#scroll').fadeIn(200)
        } else{
            $('#scroll').fadeOut(200)
        }
    });





    //Animate the scroll to Top
    //---------------------------------------------------------------
    $('#scroll').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });

    // Testimonial active
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
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
  

    // Brand active
    //---------------------------------------------------------------
    $('.brand-active').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
    });


	// tabs protflio
	//----------------------------------------------------------------------------------------
	$(window).on('load',function(){
		var $grid =  $('.item-active').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
			// use outer width of grid-sizer for columnWidth
			columnWidth: 1
			}
		})
			// filter items on button click
		$('.item-menu').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
	});
	

	// tabs protflio-menu
	//----------------------------------------------------------------------------------------
		// filter items on button click
	$('.portfolio-menu').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});	
	// change is-checked class on buttons
	$(".button-group").each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function() {
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
	});



    // counterUp
    //---------------------------------------------------------------
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });

  
    // counter
    //---------------------------------------------------------------
    const animationDuration = 6000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round( animationDuration / frameDuration );
    const easeOutQuad = t => t * ( 2 - t );
    const animateCountUp = el => {
        let frame = 0;
        const countTo = parseInt( el.innerHTML, 10 );

        const counter = setInterval( () => {
            frame++;

            const progress = easeOutQuad( frame / totalFrames );

            const currentCount = Math.round( countTo * progress );


            if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
                el.innerHTML = currentCount;
            }

            if ( frame === totalFrames ) {
                clearInterval( counter );
            }
        }, frameDuration );
    };
    const countupEls = document.querySelectorAll( '.timer' );
    countupEls.forEach( animateCountUp );

    // Bootstrap Modal Animation
    $(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

    // Active WOW js
    //---------------------------------------------------------------
	// wow active
	new WOW().init();

	AOS.init({
		duration: 1200,
    })


    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('.form-message');

    // Set up an event listener for the contact form.
    $(form).on('submit',function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured. Message could not be sent.');
                }
            });
    });


})(jQuery);	