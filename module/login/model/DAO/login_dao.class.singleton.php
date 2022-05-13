<?php
    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_user($db,$user) {
            $sql = "SELECT * FROM usuarios WHERE usuario = '$user';";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }
        public function select_user_email($db,$email) {
            $sql = "SELECT * FROM usuarios WHERE email = '$email';";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }
        public function register_user($db,$infoUser) {
            $sql = "INSERT INTO usuarios(usuario,contrasena,email,tipo,avatar,verificado,token) VALUES('$infoUser->user', '$infoUser->password', '$infoUser->email','client','$infoUser->avatar',0,'$infoUser->token');";
            $stmt = $db->ejecutar($sql);
            return $stmt;
        }

        public function check_user($db,$token) {
            $sql = "SELECT id,verificado FROM usuarios WHERE token='$token'";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }

        public function verify_user($db,$idUser) {
            $sql = "UPDATE usuarios SET verificado=1 WHERE id='$idUser'";
            return $db->ejecutar($sql);
        }
    }
?>