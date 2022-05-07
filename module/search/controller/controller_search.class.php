<?php
    class controller_search {
        function brands(){
            echo json_encode(common::load_model('search_model','brands_model'));
        }
        function categories(){
            echo json_encode(common::load_model('search_model','categories_model'));
        }
        function cities(){
            echo json_encode(common::load_model('search_model','cities_model'));
        }
        function filter_cities(){
            // echo json_encode($_POST);
            echo json_encode(common::load_model('search_model','filter_cities_model',$_POST));
        }
    };
?>