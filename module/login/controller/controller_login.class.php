<?php
    class controller_login {
		function login(){
			common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'login.html');
        }
        function submit_login(){
			echo json_encode(common::load_model('login_model','submit_login_model',$_POST));
        }
        function submit_register(){
			echo json_encode(common::load_model('login_model','submit_register_model',$_POST));
        }
        function data_user() {
            echo json_encode(common::load_model('login_model','data_user_model',apache_request_headers()["token"]));
        }
        function logout() {
            echo json_encode(common::load_model('login_model','logout_model'));
        }
    };
?>