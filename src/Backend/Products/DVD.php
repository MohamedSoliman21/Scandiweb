<?php

class DVD extends Product{

    public function _construct($SKU, $Name, $Price, $ProductType, $Size){
        parent::_construct($SKU, $Name, $Price, $ProductType);
        $this -> ProductType = "DVD";
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

    public function setAttributes(array $Size){
        $this -> Attributes =  "Size: {$Size[0]} MB";
    }

    public function getAttributes(){
        return $this-> Attributes;
    }

    public function Get(){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();
            $id ="";
            $stmt = $DB->prepare("SELECT * FROM products WHERE ProductType = 'DVD'");
            $stmt->execute() or die("Cannot fetch the data from the database, please try again.");
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);

            $DataBase->CloseConnection();

            return json_encode($result);

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
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

    public function Delete($ID){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("DELETE FROM products WHERE ID=:ID AND ProductType = 'DVD'");
            $stmt->bindparam(":ID",$ID);
            $stmt->execute() or die("Cannot delete the data from the database, please try again.");

            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();

        }
    }
}