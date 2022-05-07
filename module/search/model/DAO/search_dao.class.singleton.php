<?php
    class search_dao {
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

        public function select_categories($db) {
            $sql = "SELECT * FROM categoria ORDER BY nombre_categoria;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_cities($db) {
            $sql = "SELECT DISTINCT ciudad FROM coches ORDER BY ciudad;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filter_cities($db,$filters) {
            $sql = "SELECT DISTINCT c.ciudad
            FROM coches AS c 
            LEFT JOIN modelos m 
            ON m.id_modelo=c.id_modelo
            INNER JOIN marcas AS a
            ON a.id_marca=m.id_marca
            INNER JOIN combustible AS o
            ON o.id_combustible=c.id_combustible
            INNER JOIN categoria AS t 
            ON t.id_categoria=c.id_categoria";
            $filter = "";
            $where = false;

            foreach ($filters as $key => $value) {
                switch ($key) {
                    case 'brand':
                        if(strlen($value)>1){
                            if ($where==false){
                                $filter=" WHERE a.nombre_marca='" . $value ."'";
                                $where=true;
                            }else {
                            $filter.=" AND a.nombre_marca='" . $value ."'";
                            }
                        }
                        break;
                    case 'model':
                        if(strlen($value)>1){
                            if ($where==false){
                                $filter=" WHERE m.nombre_modelo='" . $value ."'";
                                $where=true;
                            } else {
                                $filter.=" AND m.nombre_modelo='" . $value ."'";
                            }
                        }

                        break;
                    case 'price':
                        if($value!=0){
                            if ($where==false){
                                $filter=" WHERE precio=" . $value;
                                $where=true;
                            } else {
                                $filter.=" AND precio=" . $value;
                            }
                        }

                        break;
                        case 'fuel':
                            if(strlen($value)>1){
                                if ($where==false){
                                    $filter=" WHERE nombre_combustible='" . $value ."'";
                                    $where=true;
                                } else {
                                    $filter.=" AND nombre_combustible='" . $value ."'";
                                }
                            }
    
                            break;
                        case 'category':
                                if(strlen($value)>1){
                                    if ($where==false){
                                        $filter=" WHERE nombre_categoria='" . $value ."'";
                                        $where=true;
                                    } else {
                                        $filter.=" AND nombre_categoria='" . $value ."'";
                                    }
                                }
        
                                break;
                    
                    default:
                        break;
                }
            }
            $mainsql = $sql . $filter . " ORDER BY c.ciudad;";
            $stmt = $db->ejecutar($mainsql);
            return $db->listar($stmt);
        }

        

        
    }
?>