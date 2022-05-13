<?php
    class login_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = login_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        public function submit_login_model($infoLogin) {
            return $this -> bll -> submit_login_BLL($infoLogin);
        }
        public function submit_register_model($infoRegister) {
            return $this -> bll -> submit_register_BLL($infoRegister);
        }
        public function data_user_model($token) {
            return $this -> bll -> data_user_BLL($token);
        }
        public function logout_model() {
            return $this -> bll -> logout_BLL();
        }
        public function control_user_model($token) {
            return $this -> bll -> control_user_BLL($token);
        }
        public function activity_model() {
            return $this -> bll -> activity_BLL();
        }
        public function refresh_cookie_model() {
            return $this -> bll -> refresh_cookie_BLL();
        }
        public function refresh_token_model($token) {
            return $this -> bll -> refresh_token_BLL($token);
        }
        public function verify_user_model($token) {
            return $this -> bll -> verify_user_BLL($token);
        }
        

    }
?>