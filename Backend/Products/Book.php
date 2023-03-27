<?php

class Book extends Product{

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Attributes){
        parent::_construct($ID, $SKU, $Name, $Price, $ProductType, $Attributes);
        $this -> ProductType = "Book";
    }

    public function setProductType($ProductType){
        $this -> ProductType = "Book";
    }

    public function getProductType(){
        return $this-> ProductType;
    }

    public function setAttributes($Weight){
        if(count($Weight) == 1){
            $this -> Attributes =  "{$Weight[0]}";
        }else{
            $this -> Attributes =  "Weight: {$Weight[1]}KG";
        }
    }

    public function getAttributes(){
        return $this-> Attributes;
    }

}