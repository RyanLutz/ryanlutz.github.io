(function ( $ ) {

  $(function() {
    var tileArray = [];

    function init(){
      $('.fader').each( function(){
        $(this).height($(this).width())
          .children('IMG').css({
            'display' : 'block',
            'position' : 'absolute',
            'top' : '0',
            'left' : '0'
        });
        $(this).children("IMG:gt(0)").hide();
        tileArray.push(this);
      });

      slideSwitch();
    }

    var slideFade = function(slider) {
      var active = $(slider).find('IMG:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo(slider);
    }

    function slideSwitch() {
      var slideInterval = function() {
        var randomSlider = tileArray[Math.floor(Math.random()*tileArray.length)];

        slideFade(randomSlider);
        var rand = Math.round(Math.random() * (2000 - 500)) + 1250; // generate new time (between 3sec and 500"s)
        setTimeout(slideInterval, rand);
      }
      slideInterval();
    }

    init();

  })
}( jQuery ));
