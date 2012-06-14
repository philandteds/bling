jQuery(document).ready(function() {
	        
	        $('#slider').bjqs({
	        	// ALL AVAILABLE SETTINGS & THEIR DEFAULTS
	        	// Width + Height used to ensure consistency
	        	'width': 700,
	        	'height': 300,
	        	// The type of animation (accespts slide or fade)
	        	'animation': 'fade',
	        	// The duration in ms of the transition between slides
	        	'animationDuration': 450,
	        	// Automatically rotate through the slides
	        	'automatic': true,
	        	// Delay in ms between auto rotation of the slides
	        	'rotationSpeed': 4000,
	        	// Pause the slider when any elements receive a hover event
	        	'hoverPause': true,
	        	// Show the manual slider controls
	        	'showControls': true,
	        	// Center the controls vertically
	        	'centerControls': true,
	        	// Text to display in next/prev buttons (can accept html)
	        	'nextText': 'Next',
	        	'prevText': 'Prev',
	        	// Show positional markers
	        	'showMarkers': true,
	        	// Center the positional indicators
	        	'centerMarkers': true,
	        	// Allow navigation with arrow keys
	        	'keyboardNav': true,
	        	// Use image title text as caption
	        	'useCaptions': true
	        });
	        
	      });