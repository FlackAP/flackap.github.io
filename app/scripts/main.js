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
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.animated').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                $(this).addClass('animated-active');
                    
            }
            
        }); 
    
    });
    



	window.fitText( document.getElementById("responsive_headline"), 0.75 );
	window.fitText( document.getElementById("responsive_contact"), 1.75 );
	window.fitText( document.getElementById("responsive_portfolio2"), 1.5 );
})

