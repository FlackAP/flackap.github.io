console.log('\'Allo \'Allo!');
$(document).ready(function(){

	$( ".about" ).click(function() {
  		alertify.alert( "The personal site of front-end web developer Andy Flack. Information, portfolio, and much, much more coming soon!");
  		alertify.log("Lovingly crafted by Andy Flack", "", 5000);
	});

	$('.contact').click(function(){
		$('.contact-box').addClass('contact-active')

	})

	$('#close').click(function(){
		$('.contact-box').removeClass('contact-active')
	})


window.fitText( document.getElementById("responsive_headline"), .5 );
window.fitText( document.getElementById("responsive_about"), 1.0 );
window.fitText( document.getElementById("responsive_contact"), 2.0 );
})

