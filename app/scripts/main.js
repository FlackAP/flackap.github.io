console.log('\'Allo \'Allo!');
$(document).ready(function(){

	$( ".about" ).click(function() {
  		alertify.alert( "Prepare your heart and mind for internet wizardry! Coming soon!");
  		alertify.log("Lovingly crafted by Andy Flack", "", 5000);
	});

	$('.contact').click(function(){
		$('.contact-box').addClass('contact-active')

	})

	$('#close').click(function(){
		$('.contact-box').removeClass('contact-active')
	})


window.fitText( document.getElementById("responsive_headline"), .5 );
window.fitText( document.getElementById("responsive_about"), 1.5 );
window.fitText( document.getElementById("responsive_contact"), 2.5 );
})

