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
        $SKU = $_REQUEST["SKU"];
        $Name = $_REQUEST["Name"];
        $Price = $_REQUEST["Price"];
        $Size = $_REQUEST["Size"];
        $Weight = $_REQUEST["Weight"];
        $Dimensions = array($_REQUEST["Height"], $_REQUEST["Width"], $_REQUEST["Length"]);
        $Attributes = array($Size, $Weight, $Dimensions);
        
        $Product->setSKU($SKU);
        $Product->setName($Name);
        $Product->setPrice($Price);
        $Product->setAttributes($Attributes);
        $Product->ADD();
    }
}
