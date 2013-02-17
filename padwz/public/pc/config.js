seajs.config({
    alias: {
        '$' : 'gallery/jquery/1.8.3/jquery',
        'backbone' : 'gallery/backbone/0.9.9/backbone',
        'underscore' : 'gallery/underscore/1.4.2/underscore',
        'mousewheel' : 'gallery/jquery-mousewheel/3.0.6/jquery-mousewheel',
        'class': 'arale/class/1.0.0/class',
        'base': 'arale/base/1.0.1/base'
    },
    preload: ['seajs/plugin-text']
});