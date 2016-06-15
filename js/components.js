define(function (require, exports) {
  var $ = require('jquery');
  var tm = require('TweenMax');
  var TimelineMax = require('TimelineMax');
  var behavior = require('behavior');

  function removeFromDOM (elem) {
      elem.remove();
  }

  /*    COMPONENT:
   *    BUTTONS -->  LOGO MENU
   *
   */

   var menu = {
     $ref: $('.main-menu'),
     action: {
       click: function (event, target) {
         behavior.on('menu-click').emit();
       }
     }
   };


  /*    COMPONENT:
   *    BUTTONS -->  LOGO MENU
   *
   */

  var btn_logo = {
    $ref: $('.cartoon-profile'),
    action: {
      mouseover: function (event, target) {
        behavior.on('btn-logo-action-mouseover').emit();
      },
      mouseout: function (event, target) {
        behavior.on('btn-logo-action-mouseout').emit();
      },
      click: function () {
        behavior.on('btn-logo-action-click').emit();
      }
    }
  };
  (function () {
    var tlm = new TimelineMax({paused: true}),
        is_paused = false;
    function isPaused (setter) {
      if (setter === undefined) return is_paused;
      return is_paused = setter;
    }
    behavior.on('btn-logo-action-mouseover').add(function (event, target) {
      if (!isPaused()) tlm.to(btn_logo.$ref, .1, {scale: 1.05, boxShadow: '0 11px 12px rgba(200,200,200,0.62)'}).play();
    });
    behavior.on('btn-logo-action-mouseout').add(function (event, target) {
      if (!isPaused()) tlm.reverse();
    });
    behavior.on('btn-logo-action-click').add(function (event, target) {
      isPaused(true);
      tlm.pause();
      menu.$ref.width($(window).width()).height($(window).height());
      tm.to(menu.$ref, 1, {ease: Expo.easeOut, top: 0, left: 0, onComplete: menuON});
      function menuON () {
        tlm.reverse();
        isPaused(false);
      }
    });
    behavior.on('menu-click').add(function (event, target) {
      behavior.on('btn-logo-action-mouseover').emit();
      isPaused(true);
      tm.to(menu.$ref, 1, {ease: Expo.easeIn, top: '-120%', left: 0, onComplete: menuOFF});
      function menuOFF () {
        tlm.reverse();
        isPaused(false);
      }
    });
  })();

  /*    COMPONENT:
   *    BUTTON  -->  SCROLL DOWN
   *
   */

  var btn_scroll_down = {
    $ref: $('#scroll-down'),
    action: {
      click: function (event, target) {
        behavior.on('btn-scroll-down-action-click').emit(event, target);
      }
    }
  };

  behavior.on('btn-scroll-down-action-click').add(function (event, target) {
    tm.to(btn_scroll_down.$ref, 1, {bezier:[{x:100, y:-100}, {x:0, y:-200}], ease:Linear.easeNone});
    tm.to(btn_scroll_down.$ref, .5, {color: '#000000', scale: 60, delay:.9, onComplete: removeFromDOM, onCompleteParams: [btn_scroll_down.$ref]});
  });

  /*    COMPONENT:
   *    BUTTONS -->  SOCIAL BUTTONS
   *
   */

  var btn_social = {
    linkedIn: {
      $ref: $('.social-btn-container div:nth-child(1)'),
      action: {
        click: function ( event, target ) {
          tm.to(btn_social.linkedIn.$ref, .3, {ease: Power1.easeInOut, scale: .7, repeat:1, yoyo: true});
        },
        mouseover: function ( event, target ) {
          tm.to(pages.landingPage.$ref, 2, {backgroundColor: '#0077B5'});
        },
        mouseout: function ( event, target ) {
          tm.to(pages.landingPage.$ref, .6, {backgroundColor: '#0F222E'});
        }
      }
    },
    twitter: {
      $ref: $('.social-btn-container div:nth-child(2)'),
      action: {
        click: function ( event, target ) {
          tm.to(btn_social.twitter.$ref, .3, {ease: Power1.easeInOut, scale: .7, repeat:1, yoyo: true});
        },
        mouseover: function ( event, target ) {
          tm.to(pages.landingPage.$ref, 2, {backgroundColor: '#55ACEE'});
        },
        mouseout: function ( event, target ) {
          tm.to(pages.landingPage.$ref, .6, {backgroundColor: '#0F222E'});
        }
      }
    }
  };

    /*    COMPONENT:
     *    PAGES - DIVS
     *
     */

    var pages = {
      landingPage: {
        $ref: $('.welcome-screen')
      }
    };

  exports.btn_scroll_down = btn_scroll_down;
  exports.btn_social = btn_social;
  exports.btn_logo = btn_logo;
  exports.menu = menu;
});
