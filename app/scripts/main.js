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

})

