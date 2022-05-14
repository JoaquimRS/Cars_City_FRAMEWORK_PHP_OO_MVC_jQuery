<?php
    class shop_dao {
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
        public function select_models($db) {
            $sql = "SELECT * FROM modelos ORDER BY nombre_modelo;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_fuels($db) {
            $sql = "SELECT * FROM combustible;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_categories($db) {
            $sql = "SELECT * FROM categoria;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_cities($db) {
            $sql = "SELECT DISTINCT ciudad FROM coches ORDER BY ciudad;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_cars($db) {
            $sql = "SELECT * FROM all_info_cars";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_related_cars($db,$carInfo) {
            $sql = "SELECT c.*, a.id_marca, a.nombre_marca, m.nombre_modelo, o.nombre_combustible, t.nombre_categoria
            FROM coches AS c 
            LEFT JOIN modelos m 
            ON m.id_modelo=c.id_modelo
            INNER JOIN marcas AS a
            ON a.id_marca=m.id_marca
            INNER JOIN combustible AS o
            ON o.id_combustible=c.id_combustible
            INNER JOIN categoria AS t 
            ON t.id_categoria=c.id_categoria";
            $query = "";
            $where = false;
            foreach ($carInfo as $key => $value) {
                switch ($key) {
                    case 'id_combustible':
                            
                                if ($where==false){
                                    $query=" WHERE c.id_combustible='" . $value ."'";
                                    $where=true;
                                }else {
                                    $query.=" OR c.id_combustible='" . $value ."'";
                                }
                            
                            break;
                    case 'id_categoria':
                            
                                if ($where==false){
                                    $query=" WHERE c.id_categoria='" . $value ."'";
                                    $where=true;
                                }else {
                                    $query.=" OR c.id_categoria='" . $value ."'";
                                }
                            
                            break;
                    case 'id_marca':
                            
                                if ($where==false){
                                    $query=" WHERE a.id_marca='" . $value ."'";
                                    $where=true;
                                }else {
                                    $query.=" OR a.id_marca='" . $value ."'";
                                }
                            
                            break;
                }
            }
            $mainsql = $sql . $query . ";";
            $stmt = $db->ejecutar($mainsql);
            return $db->listar($stmt);
        }
        public function select_car($db,$idCar) {
            $sql = "SELECT c.*, a.id_marca, a.nombre_marca, m.nombre_modelo, o.nombre_combustible, t.nombre_categoria
            FROM coches AS c 
            LEFT JOIN modelos m 
            ON m.id_modelo=c.id_modelo
            INNER JOIN marcas AS a
            ON a.id_marca=m.id_marca
            INNER JOIN combustible AS o
            ON o.id_combustible=c.id_combustible
            INNER JOIN categoria AS t 
            ON t.id_categoria=c.id_categoria 
            WHERE id_coche='$idCar';";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_carImages($db,$idCar) {
            $sql = "SELECT * FROM coches_img WHERE id_coche='$idCar';";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_filter_cars($db,$filters) {
            $order = "ORDER BY ";
            $sql = "SELECT c.*, a.nombre_marca, m.nombre_modelo, o.nombre_combustible, t.nombre_categoria, n.n_visitas
            FROM coches AS c 
            LEFT JOIN modelos m 
            ON m.id_modelo=c.id_modelo
            INNER JOIN marcas AS a
            ON a.id_marca=m.id_marca
            INNER JOIN combustible AS o
            ON o.id_combustible=c.id_combustible
            INNER JOIN categoria AS t 
            ON t.id_categoria=c.id_categoria
            LEFT JOIN `n_visitas_coche` AS n
            ON c.id_coche=n.id_coche ";
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
                        case 'city':
                                if(strlen($value)>1){
                                    if ($where==false){
                                        $filter=" WHERE ciudad='" . $value ."'";
                                        $where=true;
                                    } else {
                                        $filter.=" AND ciudad='" . $value ."'";
                                    }
                                }
        
                                break;
                        case 'order':
                            if(strlen($value)>1){
                                $order.=" " . $value . " DESC";
                            }
                            else {
                                $order.="n.n_visitas DESC , a.nombre_marca";  
                            }
                            break;
                    default:
                        break;
                }
            }
            $mainsql = $sql . $filter . $order .";";
            $stmt = $db->ejecutar($mainsql);
            return $db->listar($stmt);
        }
        public function increment_views($db,$idCar) {
            $set = "INSERT INTO n_visitas_coche(id_coche,n_visitas) SELECT id_coche,0 FROM coches;";
            $update_views = "UPDATE n_visitas_coche SET n_visitas=(n_visitas+1) WHERE id_coche=".$idCar.";";
            
            $db->ejecutar($set);
            $db->ejecutar($update_views);
            return "View Incremented";
        }
        public function select_user_likes($db,$user_id) {
            $sql = "SELECT id_coche FROM favoritos AS f 
            INNER JOIN usuarios AS u 
            ON f.id_usuario=u.id
            WHERE id = '$user_id';";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function mod_user_like($db,$user_id,$idCar) {
            $sql = "CALL likes($user_id,$idCar);";
            $stmt = $db->ejecutar($sql);
            return $db->listar_unico($stmt);
        }

        // mod_user_likes

        // token_decode
    }
?>