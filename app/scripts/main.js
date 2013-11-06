$('.contact-box').removeClass('contact-active')


$(document).ready(function(){
	$('.contact-box').removeClass('contact-active')

	$('.contact').click(function(){
		$('.contact-box').addClass('contact-active')

	});


	$('.close').click(function(){
		$('.contact-box').removeClass('contact-active')

	})

	  /* Every time the window is scrolled ... */

    
    $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
    });    



	window.fitText( document.getElementById("responsive_headline"), 0.75 );
	window.fitText( document.getElementById("responsive_contact"), 1.75 );
	window.fitText( document.getElementById("responsive_portfolio2"), 1.5 );
    window.fitText( document.getElementById("responsive_bio"), 1.5 );
})

