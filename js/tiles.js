!function(t){t(function(){function n(){t(".fader").each(function(){t(this).height(t(this).width()).children("IMG").css({display:"block",position:"absolute",top:"0",left:"0"}),t(this).children("IMG:gt(0)").hide(),e.push(this)}),i()}function i(){var t=function(){var n=e[Math.floor(Math.random()*e.length)];o(n);var i=Math.round(1500*Math.random())+1250;setTimeout(t,i)};t()}var e=[],o=function(n){t(n).find("IMG:first").fadeOut(1e3).next().fadeIn(1e3).end().appendTo(n)};n()})}(jQuery);