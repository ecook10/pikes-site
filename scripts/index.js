window.onload = function() {
    
    //Function in 'setlists.js' - Sets nav-bar options
    setLists();

    
//-----------------Nav-Bar Hovers------------------
    
    //Mouse goes over any nav-bar button
    $('.navbutton').mouseenter(function() {

        //User is 'home' - photo slider showing
        if ($('#nav-content').attr('class') == "active") {

            //Button is newly hovered over - prevent premature fadeouts
            if ($(this)[0] != $(".hovered")[0]) {

                if ($(this).attr('id') != "home") {
                    $(this).animate({marginLeft:'70px'});
                }

                //Move old hovered-over button back, fade out overlay menu, remove hovered class
                $('.hovered').animate({marginLeft:'35px'}); //35px is default margin
                if ($('.hovered.hasmenu').length  == 1) {
                    var menu = $('.hovered.hasmenu').get()[0];
                    $("#" + menu.id + "menu").fadeOut("slow");
                }

                $('.hovered').removeClass("hovered");

                //Fade in new overlay, add hovered class
                $("#" + this.id + "menu").fadeIn("slow");
                $(this).addClass("hovered");
            }

        //User is viewing content
        } else {
            
            //Button is newly hovered over - prevent premature fadeouts
            if ($(this)[0] != $(".hovered")[0]) {

                //Find menu that's showing and slide up
                if ($('.hovered.hasmenu').length  == 1) {
                    var list = $('.hovered.hasmenu').get()[0];
                    $("#" + list.id + "list").slideUp("fast");
                }

                $('.hovered').removeClass("hovered");

                $("#" + this.id + "list").slideDown("fast");

                if (!$(this).hasClass("selected")) {
                    $(this).addClass("hovered");
                }
            }
        }

        $('#nav-bar li').hover(
            function() {
                $(this).css('textDecoration', 'underline');
            }, function() {
                $(this).css('textDecoration', 'none');
            }
        );

        $('#nav-bar').mouseleave(function() {
            if ($('#nav-content').attr('class') != "active") {
                if ($('.hovered.hasmenu').length == 1) {
                    $("#" + $('.hovered.hasmenu').attr('id') + "list").slideUp("fast");
                    $('.hovered.hasmenu').removeClass("hovered");
                }
            }
        });
    });


    //Mouse goes over button with no subcategory menu
    $('.nomenu').mouseenter(function() {

        //Photo slider is showing
        if ($('#nav-content').attr('class') == "active") {

            //If overlay menu showing , get rid of overlay
            if ($('.hovered.hasmenu').length  == 1) {
                var menu = $('.hovered.hasmenu').get()[0];
                $("#" + menu.id + "menu").fadeOut("slow");
            }

        //Site content is showing
        } else {

            //If sidebar menu showing, not showing content, get rid of sidebar menu
            if ($('.hovered.hasmenu').length  == 1) {
                if (!$('.hovered.hasmenu').hasClass("selected")) {
                    var list = $('.hovered.hasmenu').get()[0];
                    $("#" + list.id + "list").slideUp("fast");
                }
            }
        }
    });

    $('.nomenu').mouseleave(function() {
        if ($('#nav-content').attr('class') == "active") {
            $(this).animate({marginLeft:'35px'});
        }
        $(this).removeClass("hovered");
    });




//--------------------Menu Clicks--------------------

    //Main Category button clicked in nav bar
    $('.navbutton').click(function() {
        if ($(this).attr('id') != "home") {
            $('.displayed').removeClass("displayed");
            if ($('.selected').length == 1) {
                $("#" + $('.selected').attr('id') + "list").slideUp("fast");
                $('.selected').removeClass("selected");
            }
            toContentState($(this));
            updateContent(this.innerHTML);
        } else {
            toMenuState();
        }
    });

    //Link clicked in overlay menu
    $('.overlay li').click(function() {
        $('#nav-bar li:contains(' + $(this).html() + ')').addClass("displayed");
        toContentState($('.hovered'));
        updateContent(this.innerHTML);
    });

    //Subcategory link clicked in nav bar
    $('#nav-bar li').click(function() {
        $('.displayed').removeClass("displayed");
        $(this).addClass("displayed");
        if ($('.hovered').length == 1) {
            $("#" + $('.selected').attr('id') + "list").slideUp("fast");
            $('.selected').removeClass("selected");
            $('.hovered').removeClass("hovered").addClass("selected");
        }
        updateContent(this.innerHTML);
    });


}

//Removes photo slider and shows content defined by passed jQuery object 'clicked'
function toContentState(clicked) {
    clicked.animate({marginLeft:'35px'});

    //If overlay menu showing, get rid of it
    if ($('.hovered.hasmenu').length == 1) {
        var menu = $('.hovered.hasmenu').get()[0];
        $("#" + menu.id + "menu").fadeOut("fast");
    }

    //
    $('.slider-wrapper').fadeOut("fast", function() {
        $('#nav-content').animate({width:'170px'});
        $('#nav-content').css("textAlign", "center");
        $('#nav-content').removeClass("active");
        if (clicked.hasClass('hasmenu')) {
            $("#" + clicked.attr('id') + "list").slideDown("fast");
            $("#" + clicked.attr('id')).addClass("selected");
            $("#" + clicked.attr('id')).removeClass("hovered");
        }
    });
}

function updateContent(buttonName) {
    $('#content').slideUp("slow", function() {
        $('#content').html("");
        $('#content').load("content/" + toFilename(buttonName), function() {
            $('#content').slideDown();
        });
    });
}

function toMenuState() {
    if (!$('#nav-content').hasClass("active")) {
        $("#" + $('.selected').attr('id') + "list").slideUp("fast");
        $('#content').slideUp("slow", function() {
            $('#nav-content').css("textAlign", "left");
            $('#nav-content').animate({width:'925px'}, function() {
                $('.slider-wrapper').fadeIn("fast");
                $('.selected').removeClass("selected");
                $('.displayed').removeClass("displayed");
                $('#nav-content').css("textAlign", "center");
                $('#nav-content').addClass("active");
            });
        });
    }
}

function toFilename(name) {
    return name.replace(/\s+/g, "") + ".html";
}
