<?php

require_once('Database/Classes.php');

$method = $_SERVER['REQUEST_METHOD'];
$ProductFactory = new ProductFactory();
$Product = null;

switch($method){
    case 'GET':
        $DVD = new DVD();
        $Book = new Book();
        $Furniture = new Furniture();
        $arrDVD = json_decode($DVD->GET(), true);
        $arrBook = json_decode($Book->GET(), true);
        $arrFurniture = json_decode($Furniture->GET(), true);
        $merge = array_merge($arrDVD, $arrBook, $arrFurniture);
        $AllProducts = json_encode($merge, JSON_PRETTY_PRINT);
        echo $AllProducts;

        break;
    
    case 'POST':
        if(isset($_GET["delete"])){
            $delete = $_GET['delete']; 
            $DVD = new DVD();
            $Book = new Book();
            $Furniture = new Furniture();

            $DVD->DELETE($delete);
            $Book->DELETE($delete);
            $Furniture->DELETE($delete);
        }
        else{
            $ProductType = $_REQUEST["productType"];

            $Product = new SelectedProduct(new ProductFactory());
            $Product->setType($ProductType);
            $Product->ADD();

        }
}