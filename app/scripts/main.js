console.log('\'Allo \'Allo!');
$(document).ready(function(){
	$( ".about" ).click(function() {
  		alertify.alert( "Prepare your heart and mind for internet wizardry! Coming soon!");
  		alertify.log("Lovingly crafted by Andy Flack", "", 5000);
	});


window.fitText( document.getElementById("responsive_headline"), .5 );
window.fitText( document.getElementById("responsive_subtitle"), 1.5 );
})