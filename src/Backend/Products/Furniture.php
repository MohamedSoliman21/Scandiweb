<?php

class Furniture extends Product{

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Dimensions){
        parent::_construct($ID, $SKU, $Name, $Price, $ProductType);
        $this -> ProductType = "Furniture";
    }

    public function setID($ID){
        $this -> ID = $ID;
    }

    public function getID(){
        return $this-> ID;
    }

    public function setSKU($SKU){
        $this -> SKU = $SKU;
    }

    public function getSKU(){
        return $this-> SKU;
    }

    public function setName($Name){
        $this -> Name = $Name;
    }

    public function getName(){
        return $this-> Name;
    }

    public function setPrice($Price){
        $this -> Price = $Price;
    }

    public function getPrice(){
        return $this-> Price;
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

    
    public function ADD(){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("INSERT INTO products (SKU, Name, Price, ProductType, Attributes) VALUES ( :SKU, :Name, :Price, :ProductType, :Attributes)");
            $stmt->bindParam(':SKU', $this->getSKU());
            $stmt->bindParam(':Name', $this->getName());
            $stmt->bindParam(':Price', $this->getPrice());
            $stmt->bindParam(':Attributes', $this->getAttributes());
            $stmt->bindValue(':ProductType', "Furniture");
            
            $stmt->execute() or die("Cannot add the data to the database, please try again.");

            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }
}