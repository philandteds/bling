Revolver.registerTransition('slide', function(options, done) {
  var $nextSlide    = $(this.slides[this.nextSlide]);
  var $currentSlide = $(this.slides[this.currentSlide]);
  var $prevSlide    = $(this.slides[this.previousSlide]);

  // gonna need this
  var complete = this.trigger.bind(this, 'transitionComplete');

  // all slides except the current are hidden
  // so we must unhide the next slide before
  // we can begin the transition
  var pos = parseInt($currentSlide.width());
  $nextSlide.css({left: pos}).show(0, function() {
    $currentSlide.velocity({left: -pos}, {
      duration: 600,
      easing: "swing"
    });
    $nextSlide.velocity({left: 0}, {
      duration: 600,
      easing: "swing",
      complete: done
    });
  });
  
});
