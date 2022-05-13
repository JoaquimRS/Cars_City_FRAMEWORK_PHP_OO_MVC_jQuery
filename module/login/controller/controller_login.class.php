<?php
    class controller_login {
		function login(){
			common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'login.html');
        }
        function verify() {
            common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'verify.html');
        }
        function recover() {
            common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'recover.html');
        }
        function ask_email() {
            common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'ask_email.html');
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
        function control_user() {
            echo json_encode(common::load_model('login_model','control_user_model',apache_request_headers()["token"]));
        }
        function activity() {
            echo json_encode(common::load_model('login_model','activity_model'));
        }
        function refresh_cookie() {
            echo json_encode(common::load_model('login_model','refresh_cookie_model'));
        }
        function refresh_token() {
            echo json_encode(common::load_model('login_model','refresh_token_model',apache_request_headers()["token"]));
        }
        function verify_user() {
            echo json_encode(common::load_model('login_model','verify_user_model',$_GET["param"]));
        }
        function recover_password() {
            echo json_encode(common::load_model('login_model','recover_password_model',$_POST));
        }
        function recover_email() {
            echo json_encode(common::load_model('login_model','recover_email_model',$_POST));
        }
    };
?>