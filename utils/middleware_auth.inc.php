<?php
class middleware_auth {
    public static function encode($id) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (10 * 60), 'id' => $id]);
        $JWT = new jwt();
        return $JWT->encode($header, $payload, $secret);
    }

    public static function decode($token) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $JWT = new jwt();
        $payload = json_decode($JWT->decode($token, $jwt['secret']));
        if ($payload->exp<time()){
            return false; 
        }
        return $payload;
    }
}