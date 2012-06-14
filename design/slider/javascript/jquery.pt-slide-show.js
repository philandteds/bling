/**********************************************************************
	jquery.pt-slide-show.js
	Image slider control, with support for image pre-load.

	Copyright (c) 2012, phil&teds (http://philandteds.com)

	You are free to use this jQuery plugin in commercial
	projects as long as this copyright header is left intact.

	The plugin is available "as is", without warranty of any kind.
**********************************************************************/ 
/**********************************************************************
	Usage:
	$('#your_div_element').ptSlideShow(imageURLArray, imageWidth, imageHeight);
	
	* imageURLArray - array of URL addresses pointing to images to show
	* imageWidth    - width of the images
	* imageHeight   - height of the images

	$Version: 1.1$
	- mouse and touch swipe support added

	@depends: jquery.js
	@depends: jquery.ui.core.js
**********************************************************************/ 


(function($) {
	
	var methods = {
	  imagesLoaded : function(images, loading_box, slider_elem) { 
		  loading_box.remove();
		  images[0].show();
		  slider_elem.show();
	  },
	  loadImages : function(imageURLArray, view_elem, loading_box, progressbar, percents, slider_elem) {
		var images = [];

		var imagesLength = imageURLArray.length;
		var loadedCounter = 0;
		        
		for (var i = 0; i < imagesLength; i++) {
		  var cacheImage = document.createElement('img');
		   
		  //set the onload method before the src is called otherwise will fail to be called in IE
		  cacheImage.onload = function() {
		    loadedCounter++;
				
		    var percentValue = Math.round((loadedCounter/imagesLength)*100);
		    progressbar.progressbar({
		      value: percentValue
		    });
		    percents.html(percentValue + "%");

		    // all images loaded
		    if (loadedCounter == imagesLength) {
		      methods.imagesLoaded(images, loading_box, slider_elem);
		    }
		  }
		   
		  cacheImage.alt = '';
		  cacheImage.src = imageURLArray[i];
	      // cache needed also for overagressive garbage collectors
		  images[i] = $(cacheImage);
		  view_elem.append(cacheImage);
		}
	    return images;
	  }
	};
	
	$.fn.ptSlideShow = function(imageURLArray, imageWidth, imageHeight) {
		var lastValue = 0;

		//Loop over each element in the set and return them to keep the chain alive.
		return this.each(function() {
			var $this = $(this);

			$this.css({
				width: imageWidth
			});
			

			// view area
			var view_elem = $('<div onclick="void(0)"></div>').addClass('pt-slide-show-view-elem').css({
				height: imageHeight
			}).appendTo($this);
			
			// view area - progressbar
			var progressbar_box = $('<div></div>').addClass('pt-slide-show-progressbar-box').appendTo($this);
			var percents = $('<div></div>').addClass('pt-slide-show-progressbar-percents').appendTo(progressbar_box);
			var progressbar = $('<div></div>').appendTo(progressbar_box);
			progressbar_box.append($('<div></div>').addClass('pt-slide-show-progressbar-loading').html('loading'));
			
			var loading_box = $('<table>').css({
				width: '100%',
				height: '100%'
			}).append($('<tr>').append($('<td>').css({
				textAlign: 'center',
				verticalAlign: 'middle'
			}).append(progressbar_box))).appendTo(view_elem);

			// init jQuery UI progressbar
			progressbar.progressbar({
			  value: 0
			});
		    percents.html("0%");
			
			
			// slider area
			var slider_elem = $('<div></div>').addClass('pt-slide-show-slider-elem').appendTo($this);
			slider_elem.append($('<div></div>').addClass('pt-slide-show-slider-left-fix'))
			slider_elem.append($('<div></div>').addClass('pt-slide-show-slider-right-fix'))
			var slider = $('<div></div>').addClass('pt-slide-show-slider');
			slider_elem.append(slider);
			slider_elem.append($('<div></div>').css({
				clear: 'both'
			}));
			
			var images = methods.loadImages(imageURLArray, view_elem, loading_box, progressbar, percents, slider_elem);

			// init jQuery UI slider 
		    slider.slider({
			  min: 0,
			  max: (images.length-1),
			  step: 1,
			  slide: function(event, ui) {
			    if (lastValue != ui.value) {
			      images[lastValue].hide();
			      images[ui.value].show();
			      lastValue = ui.value;
			    }     
			  }
			});

		    
		    // mouse + touch swipe support
			var swipe = false;   // swipe in progress
			var swipe_x = -1;    // swipe event start x 
			var sensitivity = (imageWidth/1.8) / images.length;
			
			view_elem.bind({
			  
			  mousedown: function(event) {
			  	event.preventDefault();     // prevent the default behaviour
			  	swipe = true;
			  	swipe_x = event.pageX;
			  },
			
			  mouseup: function() {
			    swipe = false;
			  },
			
			  mouseleave: function() {
			    swipe = false;
			  },
			
			  mousemove: function(event) {
			    if (swipe) {
			      var pageX = event.pageX;
			      var moveTo = parseInt((pageX - swipe_x) / sensitivity);
			
				  if (moveTo > 0 || moveTo < 0) {
					  moveTo = lastValue + moveTo;      
			
				    if (moveTo > images.length-1) {
				    	moveTo = images.length-1;
				    }      
			
				    if (moveTo < 0) {
				    	moveTo = 0;
				    }      
			
				    images[lastValue].hide();
				    images[moveTo].show();
				    slider.slider("value", moveTo);
				        
				    lastValue = moveTo;
				    swipe_x = pageX;
				  }
			    }    	  
			  },
			
			  touchstart: function(event) {
			  	event.preventDefault();     // prevent the default behaviour
			    swipe = true;
			    swipe_x = event.originalEvent.changedTouches[0].pageX;
			  },
			
			  touchend: function(event) {
			    event.preventDefault();     // prevent the default behaviour
			    swipe = false;
			  },
			
			  touchmove: function(event) {
			    event.preventDefault();     // prevent the default behaviour
			    if (swipe) {
			      var pageX = event.originalEvent.changedTouches[0].pageX;
			      var moveTo = parseInt((pageX - swipe_x) / sensitivity);
			
			  	  if (moveTo > 0 || moveTo < 0) {
			  		moveTo = lastValue + moveTo;      
			
			  	    if (moveTo > images.length-1) {
			  	      moveTo = images.length-1;
			  	    }      
			
			  	    if (moveTo < 0) {
			  	      moveTo = 0;
			  	    }      
			
			  	    images[lastValue].hide();
			  	    images[moveTo].show();
			  	    slider.slider("value", moveTo);
			  	        
			  	    lastValue = moveTo;
			  	    swipe_x = pageX;
			  	  }
			    }    	  
			  }
			
			});

		});
		
	};
})(jQuery);
