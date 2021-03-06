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

        public function select_user($db,$user,$entity) {
            $sql = "SELECT * FROM usuarios WHERE usuario = '$user' AND uuid LIKE '$entity%';";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }
        public function select_user_id($db,$userID) {
            $sql = "SELECT * FROM usuarios WHERE id = '$userID';";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }
        public function select_user_email($db,$email,$entity) {
            $sql = "SELECT * FROM usuarios WHERE email = '$email' AND uuid LIKE '$entity%';";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }
        public function register_user($db,$infoUser) {
            $sql = "INSERT INTO usuarios(uuid,usuario,contrasena,email,tipo,avatar,verificado,token) VALUES('$infoUser->uuid','$infoUser->user', '$infoUser->password', '$infoUser->email','client','$infoUser->avatar',0,'$infoUser->token');";
            $stmt = $db->ejecutar($sql);
            return $stmt;
        }
        public function register_social_user($db,$infoUser) {
            $sql = "INSERT INTO usuarios(uuid,usuario,email,tipo,avatar,verificado) VALUES('$infoUser->uuid','$infoUser->user','$infoUser->email','client','$infoUser->avatar',1);";
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

        public function recover_password($db,$userID,$password_hash) {
            $password = "UPDATE usuarios SET contrasena='$password_hash' WHERE id='$userID'";
            $status = "UPDATE usuarios SET verificado=1 WHERE id='$userID'";
            $db->ejecutar($password);
            $db->ejecutar($status);
            return "Password changed";
        }

        public function change_user_status($db,$idUser,$token) {
            $status = "UPDATE usuarios SET verificado=0 WHERE id='$idUser'";
            $token = "UPDATE usuarios SET token='$token' WHERE id='$idUser'";
            $db->ejecutar($status);
            $db->ejecutar($token);
            return "Status changed";
        }
    }
?>