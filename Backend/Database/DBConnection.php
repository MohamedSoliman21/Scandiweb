<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

Class DBConnection {

private $server = "mysql:host=localhost;dbname=scandiweb";
private $user = "root";
private $pass = "root";
private $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,);

protected $conn;

public function OpenConnection(){
    try{
        $this->conn = new PDO($this->server, $this->user,$this->pass,$this->options);
	    return $this->conn;

    }catch (PDOException $e){
         echo "There is some problem in connection: " . $e->getMessage();
    }
}

public function CloseConnection() {
   	$this->conn = null;
	}
}
