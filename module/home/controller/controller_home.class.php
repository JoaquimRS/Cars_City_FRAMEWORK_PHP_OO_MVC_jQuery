<?php
    class controller_home {
		function view(){
			common::load_view('top_page_home.php', VIEW_PATH_HOME . 'home.html');
		}
		function brands() {
			echo json_encode(common::load_model('home_model','brands_model'));
		}
		
		function fuels() {
			echo json_encode(common::load_model('home_model','fuels_model'));
		}

		function categories() {
			echo json_encode(common::load_model('home_model','categories_model'));
		}
    };
?>