$(function() {
  $('#p1 a').miniPreview({ prefetch: 'pageload' });
  $('#p2 a').miniPreview({ prefetch: 'parenthover' });
  $('#p3 a').miniPreview({ prefetch: 'none' });
});

(function($) {
  var PREFIX = 'link-preview';
  
  $.fn.miniPreview = function(options) {
    return this.each(function() {
      var $this = $(this);
      var miniPreview = $this.data(PREFIX);
      if (miniPreview) {
        miniPreview.destroy();
      }

      miniPreview = new MiniPreview($this, options);
      miniPreview.generate();
      $this.data(PREFIX, miniPreview);
    });
  };
  
  var MiniPreview = function($el, options) {
    this.$el = $el;
    this.options = $.extend({}, this.defaultOptions, options);
    this.counter = MiniPreview.prototype.sharedCounter++;
  };
  
  MiniPreview.prototype = {
    sharedCounter: 0,
    
    defaultOptions: {
      width: 256,
      height: 144,
      scale: .25,
      prefetch: 'pageload'
    },
        
    generate: function() {
      this.createElements();
      this.setPrefetch();
    },

    createElements: function() {
      var $wrapper = $('<div>', { class: PREFIX + '-wrapper' });
      var $loading = $('<div>', { class: PREFIX + '-loading' });
      var $frame = $('<iframe>', { class: PREFIX + '-frame' });
      var $cover = $('<div>', { class: PREFIX + '-cover' });
      $wrapper.appendTo(this.$el).append($loading, $frame, $cover);
      
      $wrapper.css({
        width: this.options.width + 'px',
        height: this.options.height + 'px'
      });
      
      var inversePercent = 100 / this.options.scale;
      $frame.css({
        width: inversePercent + '%',
        height: inversePercent + '%',
        transform: 'scale(' + this.options.scale + ')'
      });

      var fontSize = parseInt(this.$el.css('font-size').replace('px', ''), 10)
      var top = (this.$el.height() + fontSize) / 2;
      var left = (this.$el.width() - $wrapper.outerWidth()) / 2;
      $wrapper.css({
        top: top + 'px',
        left: left + 'px'
      });
    },
    
    setPrefetch: function() {
      switch (this.options.prefetch) {
        case 'pageload':
          this.loadPreview();
          break;
        case 'parenthover':
          this.$el.parent().one(this.getNamespacedEvent('mouseenter'),
            this.loadPreview.bind(this));
          break;
        case 'none':
          this.$el.one(this.getNamespacedEvent('mouseenter'),
            this.loadPreview.bind(this));
          break;
        default:
          throw 'Prefetch setting not recognized: ' + this.options.prefetch;
          break;
      }
    },
    
    loadPreview: function() {
      this.$el.find('.' + PREFIX + '-frame')
        .attr('src', this.$el.attr('href'))
        .on('load', function() {
          $(this).css('background-color', '#fff');
        });
    },
    
    getNamespacedEvent: function(event) {
      return event + '.' + PREFIX + '_' + this.counter;
    },

    destroy: function() {
      this.$el.parent().off(this.getNamespacedEvent('mouseenter'));
      this.$el.off(this.getNamespacedEvent('mouseenter'));
      this.$el.find('.' + PREFIX + '-wrapper').remove();
    }
  };
})(jQuery);









    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
})(jQuery); // End of use strict