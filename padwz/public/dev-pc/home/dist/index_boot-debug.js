define("build-pc/index_boot/1.0.0/index_resize-debug", [ "./index_scroll-debug", "$-debug", "class-debug", "mousewheel-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Class = require("class-debug");
    var index_scroll = require("./index_scroll-debug");
    var screenOptions = {
        "default": {
            spacing: 25,
            width: 260,
            height: 160
        },
        "800*600": {
            spacing: 25,
            width: 160,
            height: 98
        },
        "1024*768": {
            spacing: 25,
            width: 195,
            height: 120
        },
        "1152*864": {
            spacing: 25,
            width: 195,
            height: 120
        },
        "1280*600": {
            spacing: 25,
            width: 200,
            height: 90
        },
        "1280*720": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1280*768": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1280*800": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1280*960": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1280*1024": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1360*768": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1366*768": {
            spacing: 25,
            width: 215,
            height: 132
        },
        "1440*900": {
            spacing: 25,
            width: 240,
            height: 135
        },
        "1400*1050": {
            spacing: 25,
            width: 240,
            height: 148
        },
        "1600*900": {
            spacing: 25,
            width: 240,
            height: 148
        },
        "1680*1050": {
            spacing: 25,
            width: 240,
            height: 148
        },
        "1920*1080": {
            spacing: 25,
            width: 260,
            height: 160
        }
    };
    var index_resize = Class.create({
        initialize: function() {
            var self = this;
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var screenWidth = window.screen.width;
            var screenHeight = window.screen.height;
            var hdHeight = $("#header").height();
            var screenOption = screenOptions["default"];
            if (typeof screenOptions[screenWidth + "*" + screenHeight] != "undefined") {
                screenOption = screenOptions[screenWidth + "*" + screenHeight];
            }
            $("#content").height(winHeight - hdHeight);
            $("#content").css("overflow", "hidden");
            self.screenOption = screenOption;
            self.containerHeight = winHeight - hdHeight;
            self.containerWidth = screenOption.width * 4 + screenOption.spacing * 3;
            self.panelHeight = screenOption.height * 3 + screenOption.spacing * 2 + 60;
            self._getData();
        },
        _getData: function() {
            var self = this;
            $.ajax({
                url: "/site/list",
                success: function(data) {
                    console.log(data);
                    self._renderPanel(data);
                }
            });
        },
        _renderPanel: function(data) {
            var self = this;
            var slider = $("#slider");
            var screenOption = self.screenOption;
            var containerHeight = self.containerHeight;
            var containerWidth = self.containerWidth;
            var panelHeight = self.panelHeight;
            var panelLength = data.data.length;
            $.each(data.data, function(k, v) {
                var siteCnt = $('<div class="site-cnt site-cnt-' + k + '"></div>');
                var siteBd = $('<div class="site-bd"></div>');
                var listHd = $('<div class="list-hd"><h3>' + v.tag + "</h3></div>");
                var listCnt = $("<ul></ul>");
                $.each(v.site, function(sk, sv) {
                    if (sk > 11) {
                        return false;
                    }
                    var listItem = $('<li><a href="' + sv.url + '" title="' + sv.title + '" target="_blank"><img src="' + data.upyun_path + sv.img + '"></a></li>');
                    listItem.find("a").css({
                        height: screenOption.height,
                        width: screenOption.width
                    });
                    listCnt.append(listItem);
                });
                listCnt.css("width", containerWidth + screenOption.spacing);
                siteBd.css({
                    width: containerWidth,
                    "padding-top": (containerHeight - panelHeight) / 2
                });
                siteCnt.css("height", containerHeight);
                siteBd.append(listHd);
                siteBd.append(listCnt);
                siteCnt.append(siteBd);
                slider.append(siteCnt);
            });
            new index_scroll({
                height: containerHeight,
                length: panelLength
            });
        }
    });
    module.exports = index_resize;
});

define("build-pc/index_boot/1.0.0/index_scroll-debug", [ "mousewheel-debug", "$-debug", "class-debug" ], function(require, exports, module) {
    require("mousewheel-debug");
    var $ = require("$-debug");
    var Class = require("class-debug");
    var index_scroll = Class.create({
        initialize: function(options) {
            var self = this;
            self.options = options || {};
            self.index = self.options.startSlide || 0;
            self.speed = self.options.speed || 300;
            self.height = self.options.height;
            self.length = self.options.length;
            self.bindUI();
        },
        bindUI: function() {
            var self = this;
            $("#content").mousewheel(function(event, delta, deltaX, deltaY) {
                if (delta > 0) {
                    self.up(delta);
                } else if (delta < 0) {
                    self.down(delta);
                }
                event.stopPropagation();
                event.preventDefault();
            });
        },
        slide: function(index, duration) {
            var style = $("#slider")[0].style;
            // fallback to default speed
            if (duration == undefined) {
                duration = this.speed;
            }
            // set duration speed (0 represents 1-to-1 scrolling)
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + "ms";
            // translate to given index position
            style.MozTransform = style.webkitTransform = "translate3d(0," + -(index * this.height) + "px,0)";
            style.msTransform = style.OTransform = "translateY(" + -(index * this.height) + "px)";
            // set new index to allow for expression arguments
            this.index = index;
        },
        up: function(delay) {
            if (this.index) {
                this.slide(this.index - 1, this.speed);
            }
        },
        down: function(delay) {
            if (this.index < this.length - 1) {
                this.slide(this.index + 1, this.speed);
            }
        }
    });
    module.exports = index_scroll;
});

define("build-pc/index_boot/1.0.0/index_boot-debug", [ "./index_resize-debug", "./index_scroll-debug", "class-debug", "$-debug", "mousewheel-debug" ], function(require, exports, module) {
    var Class = require("class-debug");
    var index_resize = require("./index_resize-debug");
    var index_boot = Class.create({
        initialize: function() {
            new index_resize();
        }
    });
    module.exports = index_boot;
});