//import data
$.ajax({
    // url: "functions/colors.json",
    //url: "https://roneetkumar.github.io/chroma/functions/colors.json",
    dataType: "json",
    async: false,
    success: function(data) {
        $.each(data.colors, function(i, item) {
            $('ul#grid-wrapper').append('<li class="card' + data.colors[i].name + '><a href="#" class="color-title">' + data.colors[i].name + '</a><div class="color-wrapper"><div class="colors"><div class="details"><span class="shade">' + data.colors[i].shade[i] + '</span><span class="hex">' + data.colors[i].hex[i] + '</span></div></div></div></li>');
            console.log("pink");
        });
    }
});

$(function() {
    //-------------chip-width
    function width() {
        var width = 0;
        $('ul.chips-list li').each(function() {
            width += $(this).outerWidth(true);
        });
        $('ul.chips-list').css('width', width + 1);
    }
    width();

    //---------color-hex-values-boxes
    $('.colors').each(function() {
        var hex = $(this).children().children('.hex').html();
        $(this).css('background', hex);
        var svg = $(this).children().children('.shade').after('<img class="copy-btn" src="assets/copy.svg" alt="copy-svg">');
    });

    //-----------------select-btn--------------
    $('.color-wrapper').each(function() {
        $(this).append('<div class="select-btn"></div>');
        var selectBtnColor = $(this).children('.colors:nth-child(6)').css('background-color');
        $(this).children('.select-btn').css('background-color', selectBtnColor);
    });

    //-----------------colors-------------------------
    $('ul.chips-list li, .select-btn').each(function() {
        //------------chips-color---------------
        var colorClass = $(this).find('h1').html();
        $(this).addClass(colorClass);
        //------------header-color----------
        $(this).on('click', function() {
            var headerColor = $(this).css('background-color').replace(')', ', 0.2)').replace('rgb', 'rgba');
            $('.search-wrapper').css('background', headerColor);
        });
    });

    //search-open-function--------------------------------
    function searchOpen() {
        $('.search-bar').addClass('search-active');
        $('svg.nav-btn').css('display', 'none');
        $('svg.back-btn').css('display', 'inline-block');
        $('.search-overlay').fadeIn(195);
        $('body').css('overflow', 'hidden');
    }

    //search-close-function-------------------------------
    function searchClose() {
        $('.search-bar').removeClass('search-active');
        $('.search-overlay').fadeOut(195);
        $('svg.nav-btn').css('display', 'inline-block');
        $('svg.back-btn').css('display', 'none');
        $('body').css('overflow', 'visible');
    }

    //search-input-value-reset-----------------------------
    $('svg.search-close-btn').on('click', function() {
        $('input.search-text-field').val('');
        card.removeAttr('style');
        $('svg.search-btn').css('display', 'inline-block');
        $('svg.search-close-btn').css('display', 'none');
    });

    //search-bar-open-and-close---------------------------
    $('.search-text-field, svg.search-btn,.search-overlay, svg.back-btn').on('click', function() {
        if ($('.search-bar').hasClass('search-active') && $('#myinput').val() != '') {
            searchClose();
            searchFunction();
            $('svg.search-btn').css('display', 'none');
            $('svg.search-close-btn').css('display', 'inline-block');
        } else if ($('.search-bar').hasClass('search-active') && $('#myinput').val() === '') {
            searchClose();
            searchFunction();
        } else {
            searchOpen();
            $('svg.search-btn').css('display', 'inline-block');
            $('svg.search-close-btn').css('display', 'none');
        }
    });

    //chip-filter--------------------------------

    var card = $('.card');
    //-----other-selection--------------
    function otherChipSelected() {
        $('.chips').on('click', function() {
            var chipsSecondClassColor = '.' + $(this).attr('class').split(' ')[1];

            card.removeClass('card-hidden');
            //-----all-color-selected
            $(this).addClass('color-selected');
            $('.chips').not(this).removeClass('color-selected');
            width();
            //------selects-colors-from-chips
            $('.colors').css('width', '100%');
            $('.colors .details').show();
            //------hides-cards-which-are-not-selected
            card.not(chipsSecondClassColor).addClass('card-hidden');

            $('.select-btn').hide();
            $('.fab').addClass('display-fab');


        });
        $('.select-btn').on('click', function() {
            // var h = $(this).attr('class').split(' ')[1];
            var cardSecondClassColor = '.' + $(this).parents('.card').attr('class').split(' ')[1];
            // console.log(cardSecondClassColor);
            card.removeClass('card-hidden');
            //-----all-color-selected
            $('.chips' + cardSecondClassColor).addClass('color-selected');
            $('.chips').not(cardSecondClassColor).removeClass('color-selected');
            width();
            // //------selects-colors-from-chips
            $('.colors').css('width', '100%');
            $('.colors .details').show();
            // //------hides-cards-which-are-not-selected
            card.not(cardSecondClassColor).addClass('card-hidden');
            // console.log(h);
            $('.select-btn').hide();
            $('.fab').addClass('display-fab');
        });
    }
    //all-card-selected------------
    function allChipSelected() {
        $('.chips.all, .fab').on('click', function() {
            card.not('.all').removeClass('card-hidden');

            $('.colors').css('width', '14.28%');
            $('.colors .details').hide();

            $('.select-btn').show();
            $('.fab').removeClass('display-fab');

            $('.all').addClass('color-selected');
            $('.chips').not('.all').removeClass('color-selected');

            $('#color-chips').animate({
                scrollLeft: "-=1000px"
            });
            width();

            $('.search-wrapper').css('background', 'rgba(0,0,0,0.2)');
        });
    }

    otherChipSelected();
    allChipSelected();

    // copy-hex-values---------------------------
    $('.copy-btn').click(function() {
        var e = $(this).siblings('.hex').html();
        var dummy = $('<input>').val(e).appendTo('body').select();
        document.execCommand("copy");
        dummy.remove();
        $('.snack').hide();
        $('.snack').html('Hex -- ' + '<i>' + e + '</i>' + ' -- Copied').show();
        $('.snack').delay(2000).fadeOut(0);
    });

    //event.stopPropagation---------------------------------------------------
    $(".info-wrapper").children().on('click', function(event) {
        event.stopPropagation();
    });

    //anchor-for-scrolling-------------------------------------
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 700);
                return false;
            }
        }
    });
});

//search--------------------------------------
function searchFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('myinput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("grid-wrapper");
    li = ul.getElementsByTagName('li');


    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


//REGISTROVANJE SERVICE WORKER-A
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(function() {
            console.log("Service-Worker-Registered");

        });
}

/*const checkOnlineStatus = async () => {
    try{
        const online = await fetch("ONLINE");
        return online.status >= 200 && online.status < 300;
    }catch (err){
        return false;
    }
};

setInterval(async () => {
    const result = await checkOnlineStatus();
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = result ? "Online" : "Offline";
}, 3000);*/