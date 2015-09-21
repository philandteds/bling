(function ($) {

  // make revolver use Sizzle instead of querySelectorAll
  Revolver.setSelectorEngine($.find);

  // jquery plugin
  $.fn.revolver = function(options) {
    return this.each(function () {
      // store the revolver object using jquery's data method
      if (!$.data(this, 'revolver')) {
        // merge options
        _.merge(options, {container: this});
        $.data(this, 'revolver', new Revolver(options));
      }
    });
  };
  
  // convenience method that wraps dom elements (that are 
  // within the container element) with jquery object 
  Revolver.prototype.$ = function (selector) {
    return $(selector, this.container);
  };

}(jQuery));
