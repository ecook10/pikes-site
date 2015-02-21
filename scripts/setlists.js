function setLists() {
    var ajax = new XMLHttpRequest();
    ajax.onload = setMenus;
    ajax.open("GET", "../site-data/categories.json", false);
    ajax.send();
};

//Sets category and subcategories based on categories.json file
function setMenus() {
    var data = JSON.parse(this.responseText);
    var navbar = document.getElementById("nav-bar");
    var menus = document.getElementById("menus");

    //Iterate through menu categories (i.e. Rush, Photos, etc.)
    for (var i = 0; i < data.categories.length; i++) {
        var category = data.categories[i];
        var id = category.name.split(" ")[0].toLowerCase();     //id first word, lowercase of category

        //Create new element for each category, populate w/ values
        var button = document.createElement("div");
        button.innerHTML = category.name;
        button.id = id;
        button.className = "navbutton";

        //If no subcategories, add 'noMenu' class to button element and add to nav-bar
        if (category.subs.length == 0) {
            button.className += " noMenu";
            navbar.appendChild(button);

        //If subcategories, add 'hasmenu' class to element, 
        //iterate through and add all subcategories
        } else {
            button.className += " hasmenu";
            navbar.appendChild(button);

            //Overlay menu for home page (goes over photo slider, initially hidden)
            var menu = document.createElement("div");
            menu.id = id + "menu";
            menu.className="overlay";
            menu.style.display = "none";
            menus.appendChild(menu);

            //Populate subcategory lists for nav-bar (initially hidden)
            var subList = document.createElement("ul");
            for (var j = 0; j < category.subs.length; j++) {
                var subItem = category.subs[j];
                var listItem = document.createElement("li");
                listItem.innerHTML = subItem;
                subList.appendChild(listItem);
            }

            //Clone list, use to populate overlay menu
            var subMenu = subList.cloneNode(true);
            menu.appendChild(subMenu);

            subList.id = id + "list";
            subList.style.display = "none";
            navbar.appendChild(subList);
        }
    }
}






