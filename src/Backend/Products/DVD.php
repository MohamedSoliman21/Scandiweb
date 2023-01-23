<?php

class DVD extends Product{

    public function _construct($ID, $SKU, $Name, $Price, $ProductType, $Size){
        parent::_construct($ID, $SKU, $Name, $Price, $ProductType);
        $this -> ProductType = "DVD";
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

    public function ADD(){        
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("INSERT INTO products (SKU, Name, Price, ProductType, Attributes) VALUES ( :SKU, :Name, :Price, :ProductType, :Attributes)");
            $stmt->bindParam(':SKU', $this->getSKU());
            $stmt->bindParam(':Name', $this->getName());
            $stmt->bindParam(':Price', $this->getPrice());
            $stmt->bindParam(':Attributes', $this->getAttributes());
            $stmt->bindValue(':ProductType', "DVD");

            $stmt->execute() or die("Cannot add the data to the database, please try again.");
            
            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }
}