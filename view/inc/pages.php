<?php
    switch($_GET['module']){
        case "controller_car":
            include("module/car/controller/controller_car.php");
        break;
        case "controller_home":
            include("module/home/controller/controller_home.php");
        break;
        case "controller_shop":
            include("module/shop/controller/controller_shop.php");
        break;
        case 'controller_login':
            include("module/login/controller/controller_login.php");
            break;
        default:
            include("module/home/controller/controller_home.php");
        break;
    }
?>

