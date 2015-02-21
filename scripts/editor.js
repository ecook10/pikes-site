//Check if scroll needs to be on or not
function checkScroll() {
    var menu = document.getElementById("editor");
    if (menu.scrollHeight + 10 != menu.offsetHeight) {
        $("#editor").css("overflow-y", "scroll");
    } else {
        $("#editor").css("overflow-y", "hidden");
    }
}

function activateEditor() {

    checkScroll();
    window.onresize = checkScroll;

//Options hovered over
    $("#editoptions li").hover(function() {
        $(this).css("textDecoration", "underline");
    }, function() {
        $(this).css("textDecoration", "none");
    });

//Options clicked
    $("#editoptions li").mousedown(function() {
       if ($(".option-chosen").length == 1) {
           $(".option-chosen").animate({paddingLeft:"0px"}, 'fast');
           $(".option-chosen").removeClass("option-chosen"); 
       }
       $(this).addClass("option-chosen");
       $(this).animate({paddingLeft:"10px", listStyleType:"none"}, 'fast');
       getControls($(this)[0].innerHTML);
    });
}

function updateControls() {
    document.getElementById("controls").innerHTML = this.responseText;
}

function getControls(filename) {
    if (filename != "Log Out") {
        var ajax = new XMLHttpRequest();
        ajax.onload = updateControls;
        ajax.open("GET", "../editor/" + filename + ".php", false);
        ajax.send();

        if (filename == "Edit Content") {
            editContent();
        }
    } else {
        window.location = ("../editor/logout.php");
    }
}

