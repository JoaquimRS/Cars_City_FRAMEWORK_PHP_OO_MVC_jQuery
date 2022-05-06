<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
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

		public function fuels_BLL() {
			return $this -> dao -> select_3_fuels($this->db);
		}

        public function categories_BLL() {
			return $this -> dao -> select_4_categories($this->db);
		}
	}
?>