(function( $ ) {
    $.fn.Caroubiel = function(width, height) {
    	var settings = {
    		width: width,
    		height: height
    	}
    	
		return new Carousel(this,settings);
    };

    var Carousel = function(el, settings) {
    	this.el = el;
    	this.settings = settings;
    	this.carousel = el.children('ul');
		this.items = el.find('li');
		this.currentPoisition = 1;
		this.init();
    }

    Carousel.prototype.init = function() {
		// Assign width to container of carousel
		this.el.css('width', this.settings.width);

		// Assign width and height to each item of carousel
		this.items.css('width', this.settings.width);
		this.items.css('height', this.settings.height);

		// Assign width to the UL of carousel
		var width = this.items.outerWidth(true) * this.items.length;
		this.carousel.css('width', width+'px');

		// sets the first item of ul as active
		this.items.first().addClass('active');

		this.bind();
	}  

	Carousel.prototype.bind = function() {
		var self = this;
		this.el.find('.navigation').on('click', function(e){
			e.preventDefault();
			self.initNavigation($(this));
		});
	}

	Carousel.prototype.initNavigation = function(el) {
		this.items.removeClass('active');
		this.items.eq(this.currentPoisition).addClass('active');
		
		if(el.attr('href') == '#next') {
			if(this.currentPoisition < this.items.length) {
				this.goNext();
			}
		} else {
			if(this.currentPoisition > 1) {
				this.goPrev();
			}
		}
	}

	Carousel.prototype.goNext = function() {
		var self = this;
		if(!this.carousel.is(':animated')) {
			this.carousel.animate({
				'margin-left': '-='+this.settings.width
			}, function() {
				self.currentPoisition++;
			});
		}
	}

	Carousel.prototype.goPrev = function() {
		var self = this;
		if(!this.carousel.is(':animated')) {
			this.carousel.animate({
				'margin-left': '+='+this.settings.width
			}, function() {
				self.currentPoisition--;
			});
		}
	}
 
}( jQuery ));
 
// Usage example:
$( ".carousel" ).Caroubiel('500px', '250px');