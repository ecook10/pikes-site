function editContent() {
    var ajax = new XMLHttpRequest();
    ajax.onload = fillTables;
    ajax.open("GET", "../../site-data/categories.json", "true");
    ajax.send();
}

function fillTables() {
    var data = JSON.parse(this.responseText);
    for (var i = 0; i < data.categories.length; i++) {
        var category = data.categories[i];
        var heading = document.createElement("h2");
        heading.innerHTML = category.name;
        document.getElementById("selectpane").appendChild(heading);
        
        var optionTable = document.createElement("table");
        var editLink = document.createElement("td");
        editLink.innerHTML = '<span class="link">Edit Page</span>';
        editLink.className = "edit ";
        var removeLink = document.createElement("td");
        removeLink.innerHTML = '<span class="link">Remove Page</span>';
        removeLink.className = "remove ";

        var row = document.createElement("tr");
        optionTable.appendChild(row);
        var nameData = document.createElement("td");
        nameData.innerHTML = "Main";
        row.appendChild(nameData);
        var edit = editLink.cloneNode(true)
        edit.className += category.name;
        row.appendChild(edit);

        for (var j = 0; j < category.subs.length; j++) {
            row = document.createElement("tr");
            optionTable.appendChild(row);

            var nameData = document.createElement("td");
            nameData.innerHTML = category.subs[j];
            row.appendChild(nameData);

            var edit = editLink.cloneNode(true);
            var remove = removeLink.cloneNode(true);
            edit.className += category.subs[j];
            remove.className += category.subs[j];
            row.appendChild(edit);
            row.appendChild(remove);
        }
        document.getElementById("selectpane").appendChild(optionTable);

        var add = document.createElement("p");
        add.className = "addpage link";
        add.innerHTML = "+ ADD PAGE";
        document.getElementById("selectpane").appendChild(add);
    }
    checkScroll();
    readInput();
}

function readInput() {
    $(".link").mousedown(function() {
        if ($(this).hasClass("addpage")) {
            addPage(this.previousSibling.previousSibling.innerHTML);
        } else if ($(this).parent().hasClass("remove")) {
            var classes = $(this).parent()[0].className.split(" ");
            classes.shift();
            var category = $(this)[0].parentNode.parentNode.parentNode.previousSibling.innerHTML;
            removePage(classes, category);
        } else {
            var classes = $(this).parent()[0].className.split(" ");
            classes.shift();
            editPage(classes);
        }
    });
}

function addPage(category) {
    var formDiv = document.getElementById("htmldiv");
    clearInputArea(formDiv);

    var categorySplit = category.split(":");
    category = categorySplit.join(" ");
    var heading = document.createElement("h2");
    heading.innerHTML = "Add Page To " + category;
    heading.id = "htmlheading";
    formDiv.insertBefore(heading, document.getElementById("html"));

    var filenameForm = document.createElement("p");
    filenameForm.innerHTML = 'Page Name: <input type="text" name="filename" />';
    filenameForm.id = "addfile";
    formDiv.insertBefore(filenameForm, document.getElementById("html"));

    var categoryForm = document.createElement("input");
    categoryForm.id = "addcategory";
    formDiv.insertBefore(categoryForm, document.getElementById("html"));  
    $("#addcategory").attr({
        "type" : "hidden",
        "name" : "category",
        "value" : category 
    });

    formDiv.style.display = "";
    $("#editor").scrollTo(formDiv);
}

function removePage(nameArray, category) {
    var formDiv = document.getElementById("htmldiv");
    clearInputArea(formDiv);

    var pageName = nameArray.join(" ");

    var confirmation = document.createElement("p");
    confirmation.innerHTML = "Are you sure you want to delete " + pageName + "?"; 
    confirmation.id = "confirmtext";
    document.getElementById("confirm").insertBefore(confirmation, document.getElementById("deletefile"));
    $("#deletefile").attr("value", pageName);
    document.getElementById("selectpane").style.display = "none";
    document.getElementById("htmldiv").style.display = "none";
    document.getElementById("confirm-wrapper").style.display = "";

    var categoryForm = document.createElement("input");
    categoryForm.id = "deletecategory";
    document.getElementById("confirm").insertBefore(categoryForm, document.getElementById("deletefile"));  
    $("#deletecategory").attr({
        "type" : "hidden",
        "name" : "category",
        "value" : category 
    });
    

    $("#return").mousedown(function() {
        document.getElementById("confirm").removeChild(document.getElementById("confirmtext"));
        document.getElementById("confirm").removeChild(document.getElementById("deletecategory"));
        document.getElementById("confirm-wrapper").style.display = "none";
        document.getElementById("selectpane").style.display = "";
    });
}

function editPage(nameArray) {
    var pageName = nameArray.join(" ");
    var formDiv = document.getElementById("htmldiv");
    clearInputArea(formDiv);

    var heading = document.createElement("h2");
    heading.innerHTML = "Edit Page  - " + pageName;
    heading.id = "htmlheading";
    formDiv.insertBefore(heading, document.getElementById("html"));
    var filenameForm = document.createElement("input");
    filenameForm.id = "editfile";
    formDiv.insertBefore(filenameForm, document.getElementById("submitfile"));  
    $("#editfile").attr({
        "type" : "hidden",
        "name" : "filename",
        "value" : pageName
    });

    showHTML(toFilename(pageName));
    formDiv.style.display = "";
    $("#editor").scrollTo(formDiv);
}

function showHTML(filename) {
    ajax = new XMLHttpRequest();
    ajax.onload = function() {
        document.getElementById("html").innerHTML = this.responseText;
        $("#htmldiv").css("display", "");
        document.getElementById("editor").style.overflowY = "scroll";
    }
    ajax.open("GET", "../../content/" + filename, true);
    ajax.send();
}

function clearInputArea(formDiv) {
    if ($("#htmldiv").css("display") != "none") {
        formDiv.removeChild(document.getElementById("htmlheading"));
        if ($("#addfile").length > 0) {
            formDiv.removeChild(document.getElementById("addfile"));
            formDiv.removeChild(document.getElementById("addcategory"));
        } else {
            formDiv.removeChild(document.getElementById("editfile"));
        }
    }
}



