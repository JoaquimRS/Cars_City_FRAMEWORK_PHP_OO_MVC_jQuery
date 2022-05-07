<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function brands_model() {
            return $this -> bll -> brands_BLL();
        }

        public function categories_model() {
            return $this -> bll -> categories_BLL();
        }

        public function cities_model() {
            return $this -> bll -> cities_BLL();
        }
        
        public function filter_cities_model($filters) {
            return $this -> bll -> filter_cities_BLL($filters);
        }
    }
?>