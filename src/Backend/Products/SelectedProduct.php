<?php

class SelectedProduct{
    public $type;
    private $SimpleFactory;

    public function __construct(ProductFactory $SimpleFactory){
        $this->SimpleFactory = $SimpleFactory;
    }

    public function setType($type){
        $this -> type =  $type;
    }

    public function ADD(){        
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
        $Product->ADD();
    }
}
