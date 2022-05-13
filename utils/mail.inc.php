<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                case 'contact';
                    $email['toEmail'] = 'joaquimdaweb@gmail.com';
                    break;
                case 'verify';
                    $email['fromEmail'] = 'carscity.support@gmail.com';
                    $email['toEmail'] = 'joaquimdaweb@gmail.com';
                    $email['inputEmail'] = 'carscity.support@gmail.com';
                    $email['inputMatter'] = 'Verificación cuenta Cars City';
                    $email['inputMessage'] = "
                    <div style='background-color: #474747; height:300px; padding: 50px;'>
                    <center><img src='http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC/view/img/ximo.png' width='50' height='50'>
                    <h1 style='color: white;'>Hola, ".  $email["user"] . ":</h1>
                    <p style='color: white;'>Haz click aqui para verificar tu cuenta en Cars City:</p><br>
                    <div style='background-color: #37c0fb; border-radius:50px; height:30px; width:200px; border: 1px white solid;'>
                    <a style='color: white;  margin:20px;  font-size: 20px;' href=" . $email["url"] . ">Verificar Cuenta</a>
                    </div>
                    </div>";
                    
                    break;
                case 'recover';
                    $email['fromEmail'] = 'carscity.support@gmail.com';
                    $email['toEmail'] = 'joaquimdaweb@gmail.com';
                    $email['inputEmail'] = 'carscity.support@gmail.com';
                    $email['inputMatter'] = 'Verificación cuenta Cars City';
                    $email['inputMessage'] = "
                    <div style='background-color: #474747; height:300px; padding: 50px;'>
                    <center><img src='http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC/view/img/ximo.png' width='50' height='50'>
                    <h1 style='color: white;'>Hola, ".  $email["user"] . ":</h1>
                    <p style='color: white;'>Haz click aqui para cambiar tu contraseña en Cars City:</p><br>
                    <div style='background-color: #37c0fb; border-radius:50px; height:30px; width:230px; border: 1px white solid;'>
                    <a style='color: white;  margin:20px;  font-size: 20px;' href=" . $email["url"] . ">Cambiar Contraseña</a>
                    </div>
                    </div>";
                    
                    break;
            }
            return self::send_mailgun($email);
        }

        public static function send_mailgun($values){
            $mailgun = parse_ini_file(UTILS . "mailgun.ini");
            $api_key = $mailgun['api_key'];
            $api_url = $mailgun['api_url'];
            
            $config = array();
            $config['api_key'] = $api_key; 
            $config['api_url'] = $api_url;

            $message = array();
            $message['from'] = $values['fromEmail'];
            $message['to'] = $values['toEmail'];
            $message['h:Reply-To'] = $values['inputEmail'];
            $message['subject'] = $values['inputMatter'];
            $message['html'] = $values['inputMessage'];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $config['api_url']);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }
    }