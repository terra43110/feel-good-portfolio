var FOOTER_DOT_COLOR = '#818181';
var FOOTER_DOT_CIRCUMFERENCE_COLOR = '#FFFFFF';

$(document).ready( function() {
    resizePageHeight();

    // activate page-1 footer dot
    var pageCircle = ".circle-buttons a:nth-of-type(1) span";
    $(pageCircle).css('border', '7px solid ' + FOOTER_DOT_COLOR);

    $(document).on('scroll', onScroll);

    // smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off('scroll');

        $('a').each( function(e) {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash;
        var menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function() {
            window.location.hash = target;
            $(document).on('scroll', onScroll);
        });
    });
});

// TESTING
/*
$('#myCarousel').on('slide.bs.carousel', function () {
$('.carousel-item a img')
});
*/

window.onresize = function() {
    resizePageHeight();
};

window.onscroll = function() {
    var pagePositionY = $(window).scrollTop();
    var navigationHeight = $('.navbar').height();
    var pageHeight = $(window).innerHeight() - navigationHeight;
    var currentPage = Math.floor((pagePositionY + pageHeight / 2) / pageHeight) + 1;
    indicateCorrectPageOnScroll(currentPage);
};

// after clicking nav link, collapse navigation menu
// $('.nav-link').click(collapseNavMenu);
$('.nav-link').click( function(e) {
    collapseNavMenu();
});

$('.circle-buttons a').click( function(e) {
    collapseNavMenu;
});

function onScroll(e) {
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each( function() {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPost && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass('active');
            currLink.addClass('active');
        }
        else {
            currLink.removeClass('active');
        }
    });
    clearAllNavLinkBorders();
    /*
       var numOfPages = $('#collapsingNavItems a').length;
       for (var i = 1; i <= numOfPages; i++) {
       removeNavLinkBorder(i);
       }
       */
}

function resizePageHeight() {
    var navigationHeight = $('.navbar').height();
    // 1. adjust pageHeight, dependent on screen size
    // 2. hide footer on xs screen size
    var pageHeight = $(window).innerHeight() - navigationHeight;
    var pageWidth = $(document).width();
    if (pageWidth < 544) {
        pageHeight += 4;  // quick and dirty adjustment
        $('.circle-buttons').css('display', 'none');
    }
    else {
        pageHeight -= 12;  // quick and dirty adjustment
        $('.circle-buttons').css('display', 'inherit');
    }
    $('.page').css('height', pageHeight);
}

function collapseNavMenu() {
    $('#collapsingNavItems').collapse('hide');
}

function indicateCorrectPageOnScroll(currentPage) {
    var pageNumber = currentPage;
    var allCircles = $('.circle-buttons a span');
    for (var i = 1; i <= allCircles.length; i++) {
        if (i === pageNumber) {
            var pageCircle = ".circle-buttons a:nth-of-type(" + pageNumber + ") span";
            $(pageCircle).css('border', '7px solid ' + FOOTER_DOT_COLOR);
            // add .active to page nav-links
            var pageNavLink = "#collapsingNavItems a:nth-of-type(" + i + ") span";
            var w = $(document).width();
            var h = $(document).height();
            //      console.log(w + " " + h);
            var w = $(window).width();
            var h = $(window).height();
            //      console.log(w + " " + h);

            //      if (w >= 544  &&  h >= 544) {
            $(pageNavLink).addClass('nav-link active');
            $(pageNavLink).css('height', '24px');
            $(pageNavLink).css('padding-top', '0px');
            //      }
            //      else {
            //        removeNavLinkBorder(i);
            //      }
        }
        /* BACKUP
           if (i === pageNumber) {
           var pageCircle = ".circle-buttons a:nth-of-type(" + pageNumber + ") span";
           $(pageCircle).css('border', '7px solid ' + FOOTER_DOT_COLOR);
    // add .active to page nav-links
    var pageNavLink = "#collapsingNavItems a:nth-of-type(" + i + ") span";
    $(pageNavLink).addClass('nav-link active');
    $(pageNavLink).css('height', '24px');
    $(pageNavLink).css('padding-top', '0px');
    }
    */
        else {
            var pageCircle = ".circle-buttons a:nth-of-type(" + i + ") span";
            $(pageCircle).css('border', '1px solid ' + FOOTER_DOT_CIRCUMFERENCE_COLOR);
            // remove .active from page nav-links
            removeNavLinkBorder(i);
        }
    }
}

function removeNavLinkBorder(pageNumber) {
    var pageNavSpan = "#collapsingNavItems a:nth-of-type(" + pageNumber + ") span";
    $(pageNavSpan).removeClass('active');
    var pageNavLink = "#collapsingNavItems a:nth-of-type(" + pageNumber + ")";
    $(pageNavLink).removeClass('active');
}

function clearAllNavLinkBorders() {
    var numOfPages = $('#collapsingNavItems a').length;
    for (var i = 1; i <= numOfPages; i++) {
        removeNavLinkBorder(i);
        //    console.log('clearing');
    }
}

// carousel left-arrow click
$("#carousel-left-arrow").click( function() {
    console.log('prev carousel slide');
    $("#carousel-portfolio").carousel('prev');
});
$("#carousel-right-arrow").click( function() {
    console.log('next carousel slide');
    $("#carousel-portfolio").carousel('next');
});

// page-4 Contact: Enable Submit Button after input validation
$("#contact-form").on('change', function() {
    if (this.checkValidity()) {
        console.log('valid');
        $("#contact-form-submit").css( {
            "box-shadow": "3px 3px 0 #363636",
            "background-color": "#88DF85",
            "color": "#FFFFFF",
            "font-weight": "bold"
        });
    }
    else {
        console.log('invalid');
        $("#contact-form-submit").css( {
            "box-shadow": "3px 3px 0 #5D5D5D",
            "background-color": "#DF8885",
            "color": "#5D5D5D"
        });
    }
});
