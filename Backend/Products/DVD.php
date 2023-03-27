<?php

class DVD extends Product{

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Size){
        parent::_construct($ID, $SKU, $Name, $Price, $ProductType);
        $this -> ProductType = "DVD";
    }

    public function setProductType($ProductType){
        $this -> ProductType = "DVD";
    }

    public function getProductType(){
        return $this-> ProductType;
    }

    public function setAttributes($Size){
        if(count($Size) == 1){
            $this -> Attributes =  "{$Size[0]}";
        }else{
            $this -> Attributes =  "Size: {$Size[0]} MB";
        }
    }

    public function getAttributes(){
        return $this-> Attributes;
    }

}