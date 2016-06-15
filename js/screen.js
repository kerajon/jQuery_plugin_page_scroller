define(function (require, exports) {
  var $ = require('jquery'),
      elem = require('components'),
      appColors = require('appColors').appColors(),
      scroller = require('scroller');

  var _window = {
    width: $(window).width(),
    height: $(window).height(),
  };
  var $welcome_screen = $('.welcome-screen');

  function _fitToScreen () {
    elem.btn_scroll_down.$ref.css({
      'background-color': appColors.orange,
      left: ($(window).width() - ($(this).width()/2) - 10)
    });
    elem.menu.$ref.width($(window).width());
    elem.menu.$ref.height($(window).height());
  }
  function _regEvents () {
    //  twitter
    elem.btn_social.twitter.$ref.on('click', function (event) {
      elem.btn_social.twitter.action.click(event, $(this));
    });
    elem.btn_social.twitter.$ref.on('mouseover', function (event) {
      elem.btn_social.twitter.action.mouseover();
    });
    elem.btn_social.twitter.$ref.on('mouseout', function (event) {
      elem.btn_social.twitter.action.mouseout();
    });
    //  linkedIn
    elem.btn_social.linkedIn.$ref.on('click', function (event) {
      elem.btn_social.linkedIn.action.click(event, $(this));
    });
    elem.btn_social.linkedIn.$ref.on('mouseover', function (event) {
      elem.btn_social.linkedIn.action.mouseover();
    });
    elem.btn_social.linkedIn.$ref.on('mouseout', function (event) {
      elem.btn_social.linkedIn.action.mouseout();
    });
    //  scroll down btn
    elem.btn_scroll_down.$ref.on('click', function (event) {
      elem.btn_scroll_down.action.click();
    });
    //  logo menu btn
    elem.btn_logo.$ref.on('mouseover', function (event) {
      elem.btn_logo.action.mouseover();
    });
    elem.btn_logo.$ref.on('mouseout', function (event) {
      elem.btn_logo.action.mouseout();
    });
    elem.btn_logo.$ref.on('click', function (event) {
      elem.btn_logo.action.click();
    });
    elem.menu.$ref.on('click', function (event) {
      elem.menu.action.click();
    });
  }

  exports.init = function () {
    $(document).ready(function () {
      _fitToScreen();
      $welcome_screen.width($(window).width());
      $welcome_screen.height($(window).height());
      scroller.init();

      $(window).ready(function () {
        $('ul.loader').remove();
        $('.fit-to-window').show();
      });

      $(window).on('resize', function () {
        _fitToScreen();
      });
    });
  };
  exports.regEvents = _regEvents;
});
