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
  $('a[href*="#"]:not([href="#"])').click(function() {
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

// Parallax stuff hell yeah hell yeah

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

var win = $(window);

var aboutPhoto = $(".about-photo");

aboutPhoto.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  aboutPhoto.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});

var oddSkills = $(".skill");

oddSkills.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  oddSkills.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("skill-active"); 
    } 
  });
  
});

var evenSkills = $(".skill2");

evenSkills.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  evenSkills.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("skill2-active"); 
    } 
  });
  
});

// Blog Feed
function tumblrFeed(url, $el) {
  console.log('okay')
   $.ajax({
     url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
     dataType: 'json',
     success: function(data) {
       
       var entries = data.responseData.feed.entries;
       var fragment = '';
       console.log(entries);
       if(entries) {
          
          for(var i=0;i < 4; i++) {
            
            if (entries[i]) {
              fragment += '<li><a href="'+entries[i].link+'">'+entries[i].title+'</a></li>';
            }
          }
         
         $el.append(fragment);
         }
       }
   });

}

  $(document).ready(function() {
    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  });