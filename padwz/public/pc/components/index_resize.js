define(function(require, exports, module) {
    var $ = require('$');
    var Class = require('class');
    var IndexScroll = require('./index_scroll');

    var screenOptions = {
        'default': {"spacing": 25,"width": 260,"height": 160},
        "800*600": {"spacing": 25,"width": 160,"height": 98},
        "1024*768": {"spacing": 25,"width": 195,"height": 120},
        "1152*864": {"spacing": 25,"width": 195,"height": 120},
        "1280*600": {"spacing": 25,"width": 200,"height": 90},
        "1280*720": {"spacing": 25,"width": 215,"height": 132},
        "1280*768": {"spacing": 25,"width": 215,"height": 132},
        "1280*800": {"spacing": 25,"width": 215,"height": 132},
        "1280*960": {"spacing": 25,"width": 215,"height": 132},
        "1280*1024": {"spacing": 25,"width": 215,"height": 132},
        "1360*768": {"spacing": 25,"width": 215,"height": 132},
        "1366*768": {"spacing": 25,"width": 215,"height": 132},
        "1440*900": {"spacing": 25,"width": 240,"height": 135},
        "1400*1050": {"spacing": 25,"width": 240,"height": 148},
        "1600*900": {"spacing": 25,"width": 240,"height": 148},
        "1680*1050": {"spacing": 25,"width": 240,"height": 148},
        "1920*1080": {"spacing": 25,"width": 260,"height": 160}
    };

    var Resize = Class.create({
        initialize : function() {
            var self = this;
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var screenWidth = window.screen.width;
            var screenHeight = window.screen.height;
            var hdHeight = $('#header').height();
            var screenOption = screenOptions['default'];

            if (typeof screenOptions[screenWidth + "*" + screenHeight] != 'undefined') {
                screenOption = screenOptions[screenWidth + "*" + screenHeight];
            }

            $('#content').height(winHeight - hdHeight);
            $('#content').css('overflow','hidden');

            self.screenOption = screenOption;
            self.containerHeight = winHeight - hdHeight;
            self.containerWidth = screenOption.width*4 + screenOption.spacing*3;
            self.panelHeight = screenOption.height*3 + screenOption.spacing*2 + 60;
            self._getData();
        },

        _getData : function(){
            var self = this;

            $.ajax({
                url: '/site/list',
                success : function(data){
                    console.log(data);
                    self._renderPanel(data);
                }
            });
        },

        _renderPanel : function(data){
            var self = this;
            var slider = $('#slider');
            var screenOption = self.screenOption;
            var containerHeight = self.containerHeight;
            var containerWidth = self.containerWidth;
            var panelHeight = self.panelHeight;
            var panelLength = data.data.length;

            $.each(data.data, function(k, v){
                var siteCnt = $('<div class="site-cnt site-cnt-' + k + '"></div>');
                var siteBd = $('<div class="site-bd"></div>');
                var listHd = $('<div class="list-hd"><h3>' + v.tag + '</h3></div>');
                var listCnt = $('<ul></ul>');

                $.each(v.site,function(sk,sv){
                    if(sk > 11){return false;}
                    var listItem = $('<li><a href="' + sv.url + '" title="' + sv.title + '" target="_blank"><img src="' + data.upyun_path + sv.img + '"></a></li>');
                    listItem.find('a').css({'height' : screenOption.height, 'width' : screenOption.width});
                    listCnt.append(listItem);
                });

                listCnt.css('width', containerWidth + screenOption.spacing);
                siteBd.css({'width' : containerWidth, 'padding-top' : (containerHeight - panelHeight)/2});
                siteCnt.css('height', containerHeight);

                siteBd.append(listHd);
                siteBd.append(listCnt);
                siteCnt.append(siteBd);
                slider.append(siteCnt);
            });

            new IndexScroll({height : containerHeight, length : panelLength});
        }
    });

    return Resize;
});