<?php
    class home_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance();
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

        public function fuels_model() {
            return $this -> bll -> fuels_BLL();
        }

        public function categories_model() {
            return $this -> bll -> categories_BLL();
        }

    }
?>