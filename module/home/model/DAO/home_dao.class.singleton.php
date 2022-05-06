<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_brands($db) {
            $sql = "SELECT * FROM marcas ORDER BY nombre_marca;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_3_fuels($db) {
            $sql = "SELECT * FROM combustible WHERE id_combustible IN(1,2,3,11) ORDER BY id_combustible;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_4_categories($db) {
            $sql = "SELECT * FROM categoria LIMIT 4";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


    }
?>