<?php
    class controller_shop {
        function view(){
            common::load_view('top_page_shop.php', VIEW_PATH_SHOP . 'shop.html');
        }
        function brands_models() {
            echo json_encode(common::load_model('shop_model','brands_models_model'));
        }
        function fuels() {
            echo json_encode(common::load_model('shop_model','fuels_model'));
        }
        function categories() {
            echo json_encode(common::load_model('shop_model','categories_model'));
        }
        function cities() {
            echo json_encode(common::load_model('shop_model','cities_model'));
        }
        function cars() {
            echo json_encode(common::load_model('shop_model','cars_model'));
        }
        function related_cars() {
            echo json_encode(common::load_model('shop_model','related_cars_model',$_POST));
        }
        function car() {
            echo json_encode(common::load_model('shop_model','car_model',$_GET['param']));
        }
        function carImages() {
            echo json_encode(common::load_model('shop_model','carImages_model',$_GET['param']));
        }
        function filter_cars() {
            echo json_encode(common::load_model('shop_model','filter_cars_model',$_POST));
        }
        function increment_views() {
            echo json_encode(common::load_model('shop_model','increment_views_model',$_GET['param']));
        }
        function user_likes() {
            echo json_encode(common::load_model('shop_model','user_likes_model',apache_request_headers()["token"]));
        }
        function mod_user_like() {
            echo json_encode(common::load_model('shop_model','mod_user_like_model',array("token"=>apache_request_headers()["token"],"idCar"=>$_GET["param"])));
        }
        
        
    };
?>