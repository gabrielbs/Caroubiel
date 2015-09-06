(function($) {


	$.fn.Caroubiel = function(width, height) {
		var settings = {
			width: width,
			height: height
		}
		
		return new Carousel(this, settings);
	};

	var Carousel = function(el, settings) {
		this.el = el;
		this.settings = settings;
		this.carousel = el.find('ul');
		this.items = el.find('li');
		this.itemsWidth = parseInt(this.settings.width);
		this.bullets = el.parent().find('.bullet-navigation');
		this.infos = el.parent().find('.item-infos');
		this.currentPoisition = 0;
		this.currentDevice = null;
		this.targetElement = null;
		this.swipeEvent = null;
		this.init();	
	}

	Carousel.prototype.init = function() {
		 var self = this;
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
		this.infos.first().addClass('active');
		this.bullets.children('li').first().addClass('active');

		this.currentDevice = ($('body').innerWidth() >= 960) ? 'desktop' : 'mobile';

		$( window ).resize(function() {
            if (self.changeDevice($('body').innerWidth())) {
            }
        });

		this.bind();
	}  

	Carousel.prototype.bind = function() {
		var self = this;
		this.el.find('.navigation').on('click', function(e){
			e.preventDefault();
			self.targetElement = 'A';
			var goTo = self.items.width();

			if($(this).attr('href') == '#next') {
				self.initNavigation('next', goTo);
			} else {
				self.initNavigation('prev', goTo);
			}
		});

		this.bullets.find('li').on('click', function(e) {
			var el = $(this);
			self.targetElement = 'LI';
			var goTo = el.index() * parseInt(self.items.width());
			if(el.index() > el.siblings('.active').index()) {
				self.goNext(goTo);
			} else {
				self.goNext(goTo);
			}

			self.currentPoisition = el.index();
			self.setInfoActive();
		});

		self.carousel.on('movestart', function(e) {
	  		startPosition = parseInt(self.carousel.css('margin-left'));
	  	});

	    self.carousel.on('move', function(e) {
	    	self.swipeEvent = e;
	    	if(self.currentDevice != 'desktop') {
				if (e.distX < 0 && self.currentPoisition < self.items.length - 1) {
					self.carousel.css('margin-left', startPosition + e.distX);
		  		} if (e.distX > 0 && self.currentPoisition > 0) {
		  			self.carousel.css('margin-left', startPosition + e.distX);
		  		}
		  	}
	    });

	    self.carousel.on('moveend', function(e) {
	    	var goTo = self.itemsWidth;
	    	self.targetElement = '';
		    if(self.device != 'desktop') {
		      if (e.distX > 50 || e.distX < -50) {
		          if (e.distX < 0) {
		            self.initNavigation('next', goTo);
		          } else {
		            self.initNavigation('prev', goTo);
		          }
		      } else {
			       self.carousel.css('margin-left', startPosition);
		      }
		    }
	    });
	}

	Carousel.prototype.initNavigation = function(dir, goTo) {
		if(dir == 'next') {
			if(this.currentPoisition < this.items.length - 1) {
				this.goNext(goTo);
			}
		} else {
			if(this.currentPoisition > 0) {
				this.goPrev(goTo);
			}
		}
	}

	Carousel.prototype.goNext = function(goTo) {
		var self = this;

		if(self.targetElement != '') {
			var increment = (self.targetElement == 'A') ? '-=' : '-';
		} else if (self.swipeEvent.type == "move") {
			var increment = (self.swipeEvent.distX < 0) ? '-=' : '-';
			goTo = goTo + self.swipeEvent.distX;
		}

		if(!this.carousel.is(':animated')) {
			self.currentPoisition++;
			this.carousel.animate({
				'margin-left': increment+goTo+'px'
			}, 200, function() {
				self.setInfoActive();
			});
		}
	}

	Carousel.prototype.goPrev = function(goTo) {
		var self = this;

		if(self.targetElement != '') {
			var increment = (self.targetElement == 'A') ? '+=' : (self.targetElement == 'LI') ? '+' : '';
		}

		if (increment == '' || typeof increment == 'undefined' && self.swipeEvent.type == "move") {
			var increment = (self.swipeEvent.distX > 0) ? '+=' : '+';
			goTo = goTo - self.swipeEvent.distX;
		}


		if(!this.carousel.is(':animated')) {
			self.currentPoisition--;
			this.carousel.animate({
				'margin-left': increment+goTo+'px'
			}, 200, function() {
				self.setInfoActive();
			});
		}
	}

	Carousel.prototype.setInfoActive = function() {
		this.items.removeClass('active');
		this.infos.removeClass('active');
		this.bullets.children('li').removeClass('active');
		this.items.eq(this.currentPoisition).addClass('active');
		this.infos.eq(this.currentPoisition).addClass('active');
		this.bullets.children('li').eq(this.currentPoisition).addClass('active');
	}

	Carousel.prototype.changeDevice = function(width){
        if (this.currentDevice == 'mobile' && width >= 960) {
            this.currentDevice = 'desktop';
            return true;
        } else if (this.currentDevice == 'desktop' && width < 960) {
            this.currentDevice = 'mobile';
            return true;
        }
        
        return false;
    }
}(jQuery));
 
// Usage example:
$( ".carousel" ).Caroubiel('500px', '250px');