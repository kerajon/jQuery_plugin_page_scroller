define(function (require, exports) {
  var $ = require('jquery'),
      behavior = require('behavior'),
      tm = require('TweenMax');
  var slideInProgress = false;
  var dataContainer = [],
      $pages = [],
      pagesLength;
  function _readData () {
    _findPages();
    var index = 0;
    while (index < pagesLength) {
      dataContainer.push($pages[index].data('scrollFrom'));
      index++;
    }
  }
  function _findPages () {
    var pageContainer = $('.screen-scroll'),
        index = 0;
    pagesLength = pageContainer.length;
    while (index < pagesLength) {
      $pages.push($(pageContainer[index]));
      index++;
    }
  }
  function _slideInProgress(){
    slideInProgress = false;
  }



  function scrollingPage (ip) {
    var indexPage = ip;
    (function () {
      var pagePosition = {
        start: (function () {
            return {top: 0, left: 0, zIndex: 0, position: 'absolute'};
        })(),
        bottom: (function () {
          return {top: '120%', left: 0, zIndex: setZindex(ip), position: 'absolute'};
        })(),
        right: (function () {
          return {top: 0, left: '120%', zIndex: setZindex(ip), position: 'absolute'};
        })()
      };

      function isFF (e) {
        return (e.originalEvent.detail && e.originalEvent.detail !== 0);  //  true if FF
      };
      function scrollDown (e) {  //  true if scroll donw
        if (isFF(e)) {
          return (e.detail === Math.abs(e.detail));  //  true if FF && scroll down
        } else {
          return (e.originalEvent.wheelDelta !== Math.abs(e.originalEvent.wheelDelta));  // true if nonFF && scroll down
        }
      };
      function setZindex (i) {  //  z-index of page based on order
        return i * 10;
      }
      function fitToScreen () {  //  fit all pages on resize
        $(window).on('resize', function () {
          for (var i = 0; i < pagesLength; i++) {
            $($pages[i]).width($(window).width());
            $($pages[i]).height($(window).height());
          }
        });
      };
      function initPosition (i) {  //  set page position based on html data atr
        if (i === 0) {
          pagePosition = pagePosition.start;
          return pagePosition;
        }
        if (dataContainer[i] === 'bottom') {
          pagePosition = pagePosition[dataContainer[i]];
          return pagePosition;
        } else if (dataContainer[i] === 'right') {
          return pagePosition =  pagePosition[dataContainer[i]];
        } else if (dataContainer[i] === undefined) {
          //  end of tree
          return pagePosition;
        } else {
          throw 'Scrolling Page Error';
        }
      }
      function initOnScreen (i) {  //  set all pages position on screen
        $pages[i].css(initPosition(i));
      }
      function registerScrollActions (i) {
        //  register event for all pages in middle
        if (i !== 0 && i !== (pagesLength - 1)) $pages[i].on('mousewheel DOMMouseScroll', function (e) {
          if (slideInProgress) return;
          if (scrollDown(e)) {
            slideInProgress = true;

            tm.to($(this), .4, {opacity: 0});
            $pages[i + 1].width($(window).width()).height($(window).height());
            tm.to($pages[i + 1], .6, {ease: Expo.easeOut, top: 0, left: 0, onComplete:_slideInProgress});
          } else {
            slideInProgress = true;
            tm.to($pages[i - 1], .3, {opacity: 1});
            $(this).width($(window).width()).height($(window).height());
            tm.to($(this), .3, $.extend({ease: Expo.easeIn, top: 0, left: 0, onComplete:_slideInProgress}, pagePosition));
          }
        });
        //  register event for first page
        if (i === 0) $pages[i].on('mousewheel DOMMouseScroll', function (e) {
          if (slideInProgress) return;
          if (scrollDown(e)) {
            slideInProgress = true;
            tm.to($(this), .5, {opacity: 0});
            $pages[i + 1].width($(window).width()).height($(window).height());
            tm.to($pages[i + 1], .6, {ease: Expo.easeOut, top: 0, left: 0, onComplete:_slideInProgress});
          }
        });
        //  register event for last page
        if (i === (pagesLength - 1)) $pages[i].on('mousewheel DOMMouseScroll', function (e) {
          if (slideInProgress) return;
          if (!scrollDown(e)) {
            slideInProgress = true;
            tm.to($pages[i - 1], .3, {opacity: 1});
            $(this).width($(window).width()).height($(window).height());
            tm.to($(this), .3, $.extend({ease: Expo.easeIn, top: 0, left: 0, onComplete:_slideInProgress}, pagePosition));
          }
        });
      }

      initOnScreen(indexPage);
      if (indexPage === 0) fitToScreen();
      registerScrollActions(indexPage);

    }());
  }

  function _init () {
    _readData();
    var i, next;
    for (i = 0; i < pagesLength; i++) {
      next = i + 1;
      scrollingPage(i);
    }
  };

  exports.init = _init;
});
