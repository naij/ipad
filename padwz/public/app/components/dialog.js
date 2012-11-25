define(function(require, exports, module) {
    
    function Lavalamp(cfg) {
        this.cfg = cfg
        this.init();
    }

    $.extend(Lavalamp.prototype,{
        init : function(){
            var self = this;
            var trigger = $(self.cfg.el);
            var backNode = $('<li class="back"></li>');
            var liList = trigger.find('li');

            trigger.append(backNode);
            self.liList = liList;
            self.backNode = backNode;

            self._setCur();

            liList.each(function() {
                var node = $(this);
                node.on('touchstart', function(e) {
                    liList.removeClass('current');
                    node.addClass('current');
                    self._move(node);
                });
            });
        },

        _setCur : function(){
            var liList = this.liList;
            var backNode = this.backNode;
            var path = location.hash;
            var node;

            if(path == ''){
                node = liList.eq(0);
            }
            else{
                liList.each(function(item){
                    var curNode = $(this);
                    if(curNode.attr('path') == path){
                        node = curNode;
                    }
                });
            }

            node.addClass('current');

            backNode.css({
                left : node.offset().left,
                top: node.offset().top
            });
        },

        _move : function(node){
            var backNode = this.backNode;

            backNode.animate({ 
                left : node.offset().left,
                top: node.offset().top
            }, 200, 'linear', function(){
                Backbone.history.navigate(node.attr('path'), {trigger: true, replace: true});
            });
        }
    });

    return Lavalamp;
});