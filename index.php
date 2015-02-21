<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 

session_start();
if (!isset($_SESSION["access"])) {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $admin_data = file("site-data/login/admins.txt", FILE_IGNORE_NEW_LINES);
        $user_data = file("data/login/users.txt", FILE_IGNORE_NEW_LINES);
        $is_admin = FALSE;
        for ($i = 0; $i < count($admin_data); $i++) {
            $data = explode(":", $admin_data[$i]);
            if ($data[0] == $username && $data[1] == $password) {
                $is_admin = TRUE;
                $_SESSION["access"] = "admin";

            }
        }
        if (!$is_admin) {
            for ($i = 0; $i < count($user_data); $i++) {
                $data = explode(":", $user_data[i]);
                if ($data[0] == $username && $data[1] == $password) {
                    session_start();
                    $_SESSION["access"] = "user";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>

<html>
    <head>
        <title>Pi Kappa Alpha - Beta Beta Chapter</title>
        <link rel="stylesheet" href="css/nivo-slider.css" type="text/css" media="screen" />
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <script type="text/javascript" src="scripts/setlists.js"></script>
        <script type="text/javascript" src="scripts/index.js"></script>
        <script type="text/javascript" src="scripts/editor.js"></script>
        <script type="text/javascript" src="scripts/jquery.js"></script>
        <script type="text/javascript" src="scripts/jquery.nivo.slider.pack.js"></script>
        <script type="text/javascript" src="scripts/jquery.scrollTo-1.4.3.1-min.js"></script>

        <script type="text/javascript" src="scripts/editor/editcontent.js"></script>
        <script type="text/javascript">
            //Loads main photo slider
            $(window).load(function() {
                $('#slider').nivoSlider({
                    directionNav: false,
                    controlNav: false,
                    pauseOnHover: false
                });
            });
        </script>
    </head>
    <body>

        <div id="header">
            <img id="banner" src="images/pike-banner.jpg" alt="banner" />
            <p>BETA BETA CHAPTER<br />UNIVERSITY OF WASHINGTON</p>
            <form method="post" action="index.php">
                <div id="form">
                    <span>Login:</span><br />
                    <input type="text" name="username" placeholder="Username" /> <br />
                    <input type="password" name="password" placeholder="Password" /><br />
                    <input type="submit" value="Submit" /><br />

                    <?php if ($access == "none") { ?>
                    <span>Login information incorrect!!!</span>
                    <?php } ?>

                </div>
            </form>
        </div>

        <div id="wrapper">

            <div id="nav-content" class="active">
                <div id="nav-bar">
                    <img src="images/pike-logo.png" alt="pike logo" />
                    <div class="navbutton nomenu" id="home">Home</div>
                </div>

                <div id="menus">
                </div>

                <div class="slider-wrapper">
                    <div id="slider" class="nivoSlider">
                        <img src="images/slider1.jpg" alt="" />
                        <img src="images/slider2.jpg" alt="" />
                        <img src="images/slider3.jpg" alt="" />
                        <img src="images/slider4.jpg" alt="" />
                        <img src="images/slider5.jpg" alt="" />
                        <img src="images/slider6.jpg" alt="" />
                        <img src="images/slider7.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div id="content"></div>
            
        </div>

        <div id="editor-space">
        <?php
        if (isset($_SESSION["access"])) {
            if ($_SESSION["access"] == "admin") {
                include("admin.php");
                echo "<script> activateEditor() </script>";
            } else if ($_SESSION["access"] == "user") {
                include("user.php");
                echo "<script> activateEditor() </script>";
            }
        }
        ?>
        </div>

    </body>
</html>
