<?php

abstract class Product{
    protected $ID;
    protected $SKU;
    protected $Name;
    protected $Price;
    protected $ProductType;
    protected $Attributes = array();

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Attributes){
        $this -> ID = $ID;
        $this -> SKU = $SKU;
        $this -> Name = $Name;
        $this -> Price = $Price;
        $this -> ProductType = $ProductType;
        $this -> Attributes = $Attributes;
    }

    abstract public function setID($ID);
    abstract public function getID();
    abstract public function setSKU($SKU);
    abstract public function getSKU();
    abstract public function setName($Name);
    abstract public function getName();
    abstract public function setPrice($Price);
    abstract public function getPrice();
    abstract public function setProductType($ProductType);
    abstract public function getProductType();
    abstract public function setAttributes($Attributes);
    abstract public function getAttributes();

    abstract public function ADD();
}