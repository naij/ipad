define(function(require, exports, module) {
    require('mousewheel');
    var $ = require('$');
    var Class = require('class');

    var SiteScroll = Class.create({
        initialize : function(options) {
            var self = this;

            self.options = options || {};
            self.index = self.options.startSlide || 0;
            self.speed = self.options.speed || 300;
            self.height = self.options.height;
            self.length = self.options.length;

            self.bindUI();
        },

        bindUI : function(){
            var self = this;

            $('#content').mousewheel(function(event, delta, deltaX, deltaY) {
                if (delta > 0){
                    self.up(delta);
                }
                else if (delta < 0){
                    self.down(delta);
                }
                
                event.stopPropagation();
                event.preventDefault();
            });
        },

        slide: function(index, duration) {

            var style = $('#slider')[0].style;

            // fallback to default speed
            if (duration == undefined) {
                duration = this.speed;
            }

            // set duration speed (0 represents 1-to-1 scrolling)
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

            // translate to given index position
            style.MozTransform = style.webkitTransform = 'translate3d(0,' + -(index * this.height) + 'px,0)';
            style.msTransform = style.OTransform = 'translateY(' + -(index * this.height) + 'px)';

            // set new index to allow for expression arguments
            this.index = index;
        },

        up: function(delay) {
            if (this.index){
                this.slide(this.index - 1, this.speed);
            }
        },

        down: function(delay) {
            if (this.index < this.length - 1){
                this.slide(this.index + 1, this.speed);
            }
        }
    });

    return SiteScroll;
});