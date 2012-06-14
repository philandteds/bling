$(document).ready(function(){
	
	// Calling our splashScreen plugin and
	// passing an array with images to be shown
	
	$('#promoIMG').splashScreen({
		textLayers		: ['images/1.jpg','images/2.jpg','images/3.jpg'],
		textShowTime	: 600,
		textTopOffset	: 80
	});
	
});

