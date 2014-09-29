'use strict';

// Smooth scroll
// Closes sidebar menu
$('#menu-close').click(function(e) {
  e.preventDefault();
  $('#sidebar').toggleClass('active');
});
// Opens the sidebar menu
$('#menu-open').click(function(e) {
 e.preventDefault();
 $('#sidebar').toggleClass('active');
});
// Scrolls to the selected menu item on the page
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
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
});