$('.contact-box').removeClass('contact-active')


$(document).ready(function(){
	$('.contact-box').removeClass('contact-active')

	$('.contact').click(function(){
		$('.contact-box').addClass('contact-active')

	});


	$('.close').click(function(){
		$('.contact-box').removeClass('contact-active')

	})



window.fitText( document.getElementById("responsive_headline"), 0.75 );
window.fitText( document.getElementById("responsive_contact"), 1.75 );
window.fitText( document.getElementById("responsive_portfolio2"), 1.5 );
})

