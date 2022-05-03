<?php

    require 'autoload.php';
    
    class router {
        private $uriModule;
        private $uriFunction;
        private $nameModule;
        static $_instance;

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function __construct() {
            if(isset($_GET['module'])){
                $this -> uriModule = $_GET['module'];
            }else{
                $this -> uriModule = 'home';
            }
            if(isset($_GET['op'])){
                $this -> uriFunction = ($_GET['op'] === "") ? 'view' : $_GET['op'];
            }else{
                $this -> uriFunction = 'view';
            }
        }

        function routingStart() {
            try {
                call_user_func(array($this -> loadModule(), $this -> loadFunction()));
            }catch(Exception $e) {
                common::load_error();
            }
        }

        private function loadModule() {
            $modules = 'resources/modules.xml';
            if (file_exists($modules)) {
                $modules = simplexml_load_file('resources/modules.xml');
                foreach ($modules as $row) {
                    if (in_array($this -> uriModule, (Array) $row -> uri)) {
                        $path = MODULES_PATH . $row -> name . '/controller/controller_' . (String) $row -> name . '.class.php';
                        if (file_exists($path)) {
                            require_once($path);
                            $controllerName = 'controller_' . (String) $row -> name;
                            $this -> nameModule = (String) $row -> name;
                            return new $controllerName;
                        }
                    }
                }
            }
            throw new Exception('Not Module found.');
        }

        private function loadFunction() {
            $functions = MODULES_PATH . $this -> nameModule . '/resources/function.xml';
            if (file_exists($functions)) {
                $functions = simplexml_load_file($functions);
                foreach ($functions as $row) {
                    if (in_array($this -> uriFunction, (Array) $row -> uri)) {
                        return (String) $row -> name;
                    }
                }
            }
            throw new Exception('Not Function found.');
        }
    }

    router::getInstance() -> routingStart();
?>