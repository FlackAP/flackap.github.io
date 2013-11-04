$('.contact-box').removeClass('contact-active')
$('.portfolio-box').removeClass('portfolio-active')

console.log('\'Allo \'Allo!');
$(document).ready(function(){
	$('.contact-box').removeClass('contact-active')
		$('.portfolio-box').removeClass('portfolio-active')

	$( ".about" ).click(function() {
  		alertify.alert( "The personal site of front-end web developer Andy Flack. Information, portfolio, and much, much more coming soon!");
  		alertify.log("Lovingly crafted by Andy Flack", "", 5000);
	});

	$('.contact').click(function(){
		$('.contact-box').addClass('contact-active')

	});

	$('.portfolio').click(function(){
		$('.portfolio-box').addClass('portfolio-active')
	});

	$('.close').click(function(){
		$('.contact-box').removeClass('contact-active')
		$('.portfolio-box').removeClass('portfolio-active')
	})



window.fitText( document.getElementById("responsive_headline"), .5 );
window.fitText( document.getElementById("responsive_about"), 1.0 );
window.fitText( document.getElementById("responsive_contact"), 1.75 );
window.fitText( document.getElementById("responsive_portfolio"), 2.0 );
})

