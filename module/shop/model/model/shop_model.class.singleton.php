<?php
    class shop_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        public function brands_models_model() {
            return $this -> bll -> brands_models_BLL();
        }
        public function fuels_model() {
            return $this -> bll -> fuels_BLL();
        }
        public function categories_model() {
            return $this -> bll -> categories_BLL();
        }
        public function cities_model() {
            return $this -> bll -> cities_BLL();
        }
        public function cars_model() {
            return $this -> bll -> cars_BLL();
        }
        public function related_cars_model($carInfo) {
            return $this -> bll -> related_cars_BLL($carInfo);
        }
        public function car_model($idCar) {
            return $this -> bll -> car_BLL($idCar);
        }
        public function carImages_model($idCar) {
            return $this -> bll -> carImages_BLL($idCar);
        }
        public function filter_cars_model($filters) {
            return $this -> bll -> filter_cars_BLL($filters);
        }
        public function increment_views_model($idCar) {
            return $this -> bll -> increment_views_BLL($idCar);
        }
        

    }
?>