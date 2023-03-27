<?php

require_once('Database/Classes.php');

$method = $_SERVER['REQUEST_METHOD'];
$Product = null;

switch($method){
    case 'GET':
        $Product = new SelectedProduct(new ProductFactory());
        $Product->get();

        break;
    
    case 'POST':
        if(isset($_GET["delete"])){
            $Delete = $_GET['delete'];
            $Product = new SelectedProduct(new ProductFactory());
            $Product->delete($Delete);
        }
        else{
            $ProductType = $_REQUEST["productType"];

            $Product = new SelectedProduct(new ProductFactory());
            $Product->setType($ProductType);
            $Product->add();

        }
}