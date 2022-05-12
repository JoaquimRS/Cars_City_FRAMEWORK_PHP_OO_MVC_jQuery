<?php
class jwt_process {
    public static function encode($user) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'name' => $user]);
        $JWT = new jwt();
        return $JWT->encode($header, $payload, $secret);
    }

    public static function decode($token) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $JWT = new jwt();
        return json_decode($JWT->decode($token, $jwt['secret']));
    }
}