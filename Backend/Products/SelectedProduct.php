<?php

class SelectedProduct{
    public $type;
    public $SimpleFactory;

    public function __construct(ProductFactory $SimpleFactory){
        $this->SimpleFactory = $SimpleFactory;
    }

    public function setType($type){
        $this -> type =  $type;
    }

    public function getType(){
        return $this-> type;
    }

    public function get(){
        $dvd = $this->SimpleFactory->CreateProduct("DVD");
        $book = $this->SimpleFactory->CreateProduct("Book");
        $furniture = $this->SimpleFactory->CreateProduct("Furniture");
        
        $Products = json_encode(
            array_merge(
                json_decode($dvd->get("DVD"), true),
                json_decode($book->get("Book"), true),
                json_decode($furniture->get("Furniture"), true),
            )
        );

        echo $Products;
    }

    public function add(){        
        $Product = $this->SimpleFactory->CreateProduct($this->type);
        $SKU = $_REQUEST["sku"];
        $Name = $_REQUEST["name"];
        $Price = $_REQUEST["price"];
        $Size = $_REQUEST["size"];
        $Weight = $_REQUEST["weight"];
        $Dimensions = array($_REQUEST["height"], $_REQUEST["width"], $_REQUEST["length"]);
        $Attributes = array($Size, $Weight, $Dimensions);
        
        $Product->setSKU($SKU);
        $Product->setName($Name);
        $Product->setPrice($Price);
        $Product->setAttributes($Attributes);
        $Product->setProductType($this->type);
        $Product->add();
    }

    public function delete($ID){
        $dvd = $this->SimpleFactory->CreateProduct("DVD");
        $book = $this->SimpleFactory->CreateProduct("Book");
        $furniture = $this->SimpleFactory->CreateProduct("Furniture");

        $dvd->delete($ID, "DVD");
        $book->delete($ID, "Book");
        $furniture->delete($ID, "Furniture");
    }
}