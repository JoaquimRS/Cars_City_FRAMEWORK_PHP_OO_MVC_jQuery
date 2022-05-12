<?php
    
	class login_bll {
		private $dao;
		private $db;
		static $_instance;
        
		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function submit_login_BLL($infoLogin) {
            $password = $infoLogin['log_password'];
            $user = $infoLogin['log_username'];
            $res_user = $this -> dao -> select_user($this->db,$user);
            if(!isset($res_user)){
                return array('error'=>'Usuario o contraseña incorrectos','src'=>'error_login');
            } else {
                if (password_verify($password,$res_user->contrasena)){
                    session_start();
                    $token = jwt_process::encode($user);
                    $_SESSION['user'] = $user;
                    $_SESSION['time'] = time();
                    return $token;
                }else {
                    return array('error'=>'Usuario o contraseña incorrectos','src'=>'error_login');
                }
            }
		}
        public function submit_register_BLL($infoRegister) {
            $check = true;
            $password_hash = password_hash($infoRegister['reg_password'],PASSWORD_DEFAULT);
            $avatar = "https://avatars.dicebear.com/api/avataaars/" . $infoRegister['reg_username'] . ".svg?b=%23c2c2c2&r=50";
            $infoUser = json_decode(json_encode(['user' => $infoRegister['reg_username'], 'email' => $infoRegister['reg_email'], 'password' => $password_hash, 'avatar' => $avatar]));
            $check_user = $this -> dao -> select_user($this->db,$infoUser->user);
            $check_email = $this -> dao -> select_user_email($this->db,$infoUser->email);
            if (isset($check_user)) {
                $check = false;
                return array('error'=>'Usuario no disponible','src'=>'error_reg_username');
            }
            if (isset($check_email)) {
                $check = false;
                return array('error'=>'Email no disponible','src'=>'error_reg_email');
            }
            if ($check){
                $new_user = $this -> dao -> register_user($this->db,$infoUser);
                session_start();
                $token = jwt_process::encode($infoUser->user);
                $_SESSION['user'] = $user;
                $_SESSION['time'] = time();

                return $token;
            }else {
                return array('error'=>'Algo ha ido mal al crear el token','src'=>'error_reg');
            }
		}
        public function data_user_BLL($token){
            $user = jwt_process::decode($token)->name;
            $res_user = $this -> dao -> select_user($this->db,$user);
            return $res_user;
        }

        public function logout_BLL(){
            $_SESSION['user'] = "";
            $_SESSION['time'] = "";
            session_destroy();
            return $_SESSION['user'];
        }
	}

?>