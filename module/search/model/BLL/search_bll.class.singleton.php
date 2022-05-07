<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function brands_BLL() {
			return $this -> dao -> select_brands($this->db);
		}
        
        public function categories_BLL() {
			return $this -> dao -> select_categories($this->db);
		}

        public function cities_BLL() {
			return $this -> dao -> select_cities($this->db);
		}

        public function filter_cities_BLL($filters) {
			return $this -> dao -> select_filter_cities($this->db,$filters);
		}
	}
?>