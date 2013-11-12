// Dependencies: modernizr.js, jquery.js
// 
// Fix for level 3+ navigation being totally borked on mobile
// // Bootstrap 3
// // Roots
$("html:not(.touch) li.dropdown").hover(function(e) {	
	parentUl = $(this).parent("ul");

	// If we're looking at a child menu link
	if ($(parentUl).parent("li").length > 0) {
		$(this).addClass("open");
		$("> ul", this).show();
	}
	
}, function(e) {		

	parentUl = $(this).parent("ul");

	// If we're looking at a child menu link
	if ($(parentUl).parent("li").length > 0) {
		$(this).removeClass("open");
		$("> ul", this).hide();
	}
	
});

$("li.dropdown a").click(function(e) {
		
	console.log('click');
	
	var parentli = $(this).parent("li");
	
	// If the menu item clicked has a child menu
	if ($("> ul", parentli).length > 0) {
	
		// and the child menu is already open
		if ($(parentli).hasClass("open")) {
		
			// then close that sucka!
			$(parentli).removeClass("open");
			$("> ul", parentli).hide();
			
		// Otherwise it must need to be opened
		} else {
		
			// so first close all dropdowns that aren't
			// part of the same menu item
			// (We don't want to accidentally close it's parent)
			$(".dropdown.open").each(function() {
				if ($(this).find(parentli).length == 0) {
					$(this).removeClass("open");
				}
			});
			
			// and open the child menu
			$(parentli).addClass("open");
			$("> ul", parentli).show();

		}
		
		parentUl = $(parentli).parent("ul");

		// If we're looking at a child menu link
		if ($(parentUl).parent("li").length > 0) {
		
			// and we're on a mobile
			if ($('html.touch').length > 0) {
			
				// Stop any other behaviour
				// e.g. navigating to href, executing any other methods
				e.preventDefault();
				e.stopPropagation();
				return false;
			} else {
				// otherwise we can allow the link to behave normally
				return true;
			}

		// If we're not looking at a child menu link
		// we always want to stay on the page
		} else {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}
	
});
