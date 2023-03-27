<?php

class Furniture extends Product{

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Dimensions){
        parent::_construct($ID, $SKU, $Name, $Price, $ProductType);
        $this -> ProductType = "Furniture";
    }

    public function setProductType($ProductType){
        $this -> ProductType = "Furniture";
    }

    public function getProductType(){
        return $this-> ProductType;
    }

    public function setAttributes($Dimensions){
        if(count($Dimensions) == 1){
            $this -> Attributes =  "{$Dimensions[0]}";
        }else{
            $this -> Attributes =  "Dimensions: {$Dimensions[2][0]}x{$Dimensions[2][1]}x{$Dimensions[2][2]}";
        }
    }

    public function getAttributes(){
        return $this-> Attributes;
    }

}