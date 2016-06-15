require.config({
  paths: {
    //  jQuery library
    jquery: 'lib/jquery-1.12.3.min',
    //  core mediator
    behavior: 'lib/behavior',
    //  scroll module
    scroller: 'lib/scroller',
    //  velocity lib
    velocity: 'lib/velocity.min',
    //  GSAP lib
    'gsap.EasePack': 'lib/gsap/minified/easing/EasePack.min',
		'gsap.CSSPlugin': 'lib/gsap/minified/plugins/CSSPlugin.min',
		'gsap.BezierPlugin': 'lib/gsap/minified/plugins/BezierPlugin.min',
		'gsap.DirectionalRotationPlugin': 'lib/gsap/minified/plugins/DirectionalRotationPlugin.min',
		'gsap.AttrPlugin': 'lib/gsap/minified/plugins/AttrPlugin.min',
		'gsap.RoundPropsPlugin': 'lib/gsap/minified/plugins/RoundPropsPlugin.min',
		'gsap.ColorPropsPlugin': 'lib/gsap/minified/plugins/ColorPropsPlugin.min',
		'gsap.CSSRulePlugin': 'lib/gsap/minified/plugins/CSSRulePlugin.min',
		'gsap.EaselPlugin': 'lib/gsap/minified/plugins/EaselPlugin.min',
		'gsap.KineticPlugin': 'lib/gsap/minified/plugins/KineticPlugin.min',
		'gsap.RaphaelPlugin': 'lib/gsap/minified/plugins/RaphaelPlugin.min',
		'gsap.ScrollToPlugin': 'lib/gsap/minified/plugins/ScrollToPlugin.min',
		'gsap.TextPlugin': 'lib/gsap/minified/plugins/TextPlugin.min',
		'gsap.EndArrayPlugin': 'lib/gsap/minified/plugins/EndArrayPlugin.min',
		'gsap.TEMPLATE_Plugin': 'lib/gsap/minified/plugins/TEMPLATE_Plugin.min',
		'gsap.Draggable': 'lib/gsap/minified/utils/Draggable.min',
		'TimelineLite': 'lib/gsap/minified/TimelineLite.min',
		'TimelineMax': 'lib/gsap/minified/TimelineMax.min',
		'TweenLite': 'lib/gsap/minified/TweenLite.min',
		'TweenMax': 'lib/gsap/minified/TweenMax.min'
  },
  shim: {
    velocity: {
      deps: ['jquery']
    },
    'gsap.Draggable': {
			deps: ['gsap.CSSPlugin']
		},
		'gsap.EndArrayPlugin': {
			deps: ['TweenLite']
		},
		'gsap.ColorPropsPlugin': {
			deps: ['TweenLite']
		},
		'gsap.CSSRulePlugin': {
			deps: ['gsap.CSSPlugin']
		},
		'gsap.EaselPlugin': {
			deps: ['TweenLite']
		},
		'gsap.KineticPlugin': {
			deps: ['TweenLite']
		},
		'gsap.RaphaelPlugin':{
			deps: ['TweenLite']
		},
		'gsap.ScrollToPlugin': {
			deps: ['TweenLite']
		},
		'gsap.TextPlugin': {
			deps: ['TweenLite']
		},
		'gsap.EasePack': {
			deps: ['TweenLite']
		},
		'gsap.CSSPlugin': {
			deps: ['TweenLite']
		},
		'gsap.BezierPlugin': {
			deps: ['TweenLite']
		},
		'gsap.DirectionalRotationPlugin': {
			deps: ['TweenLite']
		},
		'gsap.AttrPlugin': {
			deps: ['TweenLite']
		},
		'gsap.RoundPropsPlugin': {
			deps: ['TweenLite']
		},
		'TweenLite': {
			exports: 'TweenLite'
		},
		'TweenMax': {
			deps: [/* TweenMax deps */'TimelineMax', 'gsap.EasePack', 'gsap.CSSPlugin', 'gsap.BezierPlugin', 'gsap.DirectionalRotationPlugin', 'gsap.AttrPlugin', 'gsap.RoundPropsPlugin', /* Activate */'gsap.ScrollToPlugin'],
			exports: 'TweenMax'
		},
		'TimelineLite': {
			deps: ['TweenLite'],
			exports: 'TimelineLite'
		},
		'TimelineMax': {
			deps: ['TimelineLite'],
			exports: 'TimelineMax'
		}
  }
});
/*

var pages = {
  $refList : $('.pages-scroll')
};
pages.quantity = pages.$refList.length - 1;

load module set scroll screen animations

pages.$refList[0].on('scroll', function () {
  if (scroll-down) {
    pages.$refList[1].scrollOnScreen();
  }
});
for (var i = 1; i < pages.quantity; i++) {
  pages.$refList[i].on('scroll', function () {
    if (scroll-down) {
      pages.$refList[i++].scrollOnScreen();
    } else {
      pages.$refList[i++].scrollOffScreen();
    }
  });
}
pages.$refList[pages.quantity].on('scroll', function () {
  if (!scroll-down) {
    pages.$refList[pages.quantity--].scrollOnScreen();
  }
});



*/
define('app', function (require, exports) {
  var $ = require('jquery'),
      screen = require('screen');

  exports.init = function () {
    screen.init();
    screen.regEvents();
  };

});

require(['app'], function (app) {
  app.init();
});
