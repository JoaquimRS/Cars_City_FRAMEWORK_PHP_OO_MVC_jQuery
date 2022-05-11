<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		public function brands_models_BLL() {
			$ret[0] = $this -> dao -> select_brands($this->db);
            $ret[1] = $this -> dao -> select_models($this->db);
            return $ret;
		}
        public function fuels_BLL() {
			return $this -> dao -> select_fuels($this->db);
		}
        public function categories_BLL() {
			return $this -> dao -> select_categories($this->db);
		}
        public function cities_BLL() {
			return $this -> dao -> select_cities($this->db);
		}
        public function cars_BLL() {
			return $this -> dao -> select_cars($this->db);
		}
		public function related_cars_BLL($carInfo) {
			return $this -> dao -> select_related_cars($this->db,$carInfo);
		}
		public function car_BLL($idCar) {
			return $this -> dao -> select_car($this->db,$idCar);
		}
		public function carImages_BLL($idCar) {
			return $this -> dao -> select_carImages($this->db,$idCar);
		}
		public function filter_cars_BLL($filters) {
			return $this -> dao -> select_filter_cars($this->db,$filters);
		}
		public function increment_views_BLL($idCar) {
			return $this -> dao -> increment_views($this->db,$idCar);
		}
		
		
	}
?>