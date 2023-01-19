<?php

abstract class Product{

    public $SKU;
    public $Name;
    public $Price;
    public $ProductType;
    public $Attributes = array();

    public function _construct($SKU, $Name, $Price, $ProductType, $Attributes){
        $this -> SKU = $SKU;
        $this -> Name = $Name;
        $this -> Price = $Price;
        $this -> ProductType = $ProductType;
        $this -> Attributes = $Attributes;
    }

    abstract public function setSKU($SKU);
    abstract public function getSKU();
    abstract public function setName($Name);
    abstract public function getName();
    abstract public function setPrice($Price);
    abstract public function getPrice();
    abstract public function setProductType($ProductType);
    abstract public function getProductType();
    abstract public function setAttributes(array $Attributes);
    abstract public function getAttributes();

    abstract public function GET();
    abstract public function ADD();
    abstract public function DELETE($ID);
}