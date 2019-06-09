function processBuffetData(jsonData, container_id, callback) {

  $.get("./snippet_menu_container.html", function (htmlDataContainer) {
    $.get("./snippet_days.html", function (htmlDataDays) {
      $.get("./snippet_children_price.html", function (htmlDataChildren) {

        var $menuContainer = $($.parseHTML(htmlDataContainer));
        $menuContainer.find(".data-buffet-heading").html(jsonData.heading);
        $menuContainer.find(".data-buffet-clock-time").html(jsonData.time);
        var entriesLength = jsonData.entries.length;

        for (var i = 0; i < entriesLength; i++) {

          var $days = $($.parseHTML(htmlDataDays));
          $days.find(".data-buffet-time").html(jsonData.entries[i].time);
          $days.find(".data-buffet-extras").html(jsonData.entries[i].extras);
          $days.find(".data-buffet-price").html(jsonData.entries[i].price);

          if (i == 0) $days.addClass("margin-top-30");
          else $days.addClass("margin-top-20");

          $menuContainer.find('.data-buffet-entries').append($days);   

          var childrenEntriesLength = jsonData.entries[i].children.length;

          for (var j = 0; j < childrenEntriesLength; j++) {

            var $children = $($.parseHTML(htmlDataChildren));
            $children.find(".data-children-age").html(jsonData.entries[i].children[j].age);
            $children.find(".data-children-price").html(jsonData.entries[i].children[j].price);

            if (j == 0) $children.addClass("margin-top-5");

            $menuContainer.find('.data-buffet-entries').append($children);          

          }

        }

        $("#" + container_id).append($menuContainer);

        callback();


      });
    });
  });

}

function loadBuffet(filepath, container_id, callback) {
  $.getJSON(filepath, function(data) {
    processBuffetData(data, container_id, callback);
  });
}

function loadAllBuffets(callback) {

  loadBuffet("./data/mittagsbuffet.json", "data-mittagsbuffet", function() { });
  loadBuffet("./data/erlebnisbuffet.json", "data-erlebnisbuffet", function() { });
  loadBuffet("./data/mittagsbuffet_drink.json", "data-mittagsbuffet-drink", function() { });
  loadBuffet("./data/erlebnisbuffet_drink.json", "data-erlebnisbuffet-drink", function() {
    console.log("buffet loaded");
    callback();
  });

}

function loadMainContent(callback) {
  $.get("./main_snippet.html", function (htmlData) {
    $("#main-content").html(htmlData);
    loadAllBuffets(callback);
  });
}

function waitForEl(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 150);
  }
};


var gallery_loaded = false;

$(function() {

  loadMainContent(function() { });
  

  $("#gallery-link").click(function () {
    if (!gallery_loaded) {
      $.get("./gallery_snippet.html", function (htmlData) {
        $("#main-content").html(htmlData);
        gallery_loaded = true;
      });
    }

  });

  $(".link-main-content").click(function() {
    if (gallery_loaded) {
      var target = this.hash;
      console.log("wait for " + target);
      loadMainContent(function() {
        
        gallery_loaded = false;
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000, function () {
        });


      });
      /*
      waitForEl(target, function() {
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000, function () {
        });
      });
      gallery_loaded = false;
      */
    }
    else {
      var target = this.hash;
      if ($(target).length) {
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000, function () {
        });
      }
    }
  });


/*
  var win = $(window);
  var allMods = $(".animate-slide-in");
  
  // Already visible modules
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
      el.addClass("already-visible"); 
    } 
  });
  
  win.scroll(function(event) {
    
    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true) && !el.hasClass("already-visible")) {
        el.addClass("come-in"); 
      } 
    });
    
  });
*/
/*
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
*/
});