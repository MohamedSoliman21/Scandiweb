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

    abstract public function setProductType($ProductType);
    abstract public function getProductType();
    abstract public function setAttributes($Attributes);
    abstract public function getAttributes();

    public function add(){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("INSERT INTO products (SKU, Name, Price, ProductType, Attributes) VALUES ( :SKU, :Name, :Price, :ProductType, :Attributes)");
            $stmt->bindParam(':SKU', $this->getSKU());
            $stmt->bindParam(':Name', $this->getName());
            $stmt->bindParam(':Price', $this->getPrice());
            $stmt->bindParam(':Attributes', $this->getAttributes());
            $stmt->bindValue(':ProductType', $this->getProductType());

            $stmt->execute() or die("Cannot add the data to the database, please try again.");
            
            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function delete($ID, $PType){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("DELETE FROM products WHERE ID=:ID AND ProductType=:ProductType");
            $stmt->bindparam(":ID", $ID);
            $stmt->bindparam(":ProductType", $PType);
            $stmt->execute() or die("Cannot delete the data from the database, please try again.");

            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function get($PType){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("SELECT * FROM products WHERE ProductType=:ProductType");
            $stmt->bindparam(":ProductType", $PType);
            $stmt->execute() or die("Cannot fetch the data from the database, please try again.");
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            
            $result = json_encode($result);
            $result = json_decode($result, true);

            $AllProducts = array();

            foreach($result as $res){
                $Product = new SelectedProduct(new ProductFactory());
                $Product->setType($res['ProductType']);
                $Product = $Product->SimpleFactory->CreateProduct($Product->getType());
                $Product->setID($res['ID']);
                $Product->setSKU($res['SKU']);
                $Product->setName($res['Name']);
                $Product->setPrice($res['Price']);
                $Product->setProductType($res['ProductType']);
                $Product->setAttributes(array($res['Attributes']));

                $pro = array("ID"=>$Product->getID(),"SKU"=>$Product->getSKU(),"Name"=>$Product->getName(),"Price"=>$Product->getPrice(),"ProductType"=>$Product->getProductType(),"Attributes"=>$Product->getAttributes());
                array_push($AllProducts, $pro);
            }

            $DataBase->CloseConnection();

            $AllProducts = json_encode($AllProducts);
            return $AllProducts;

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }
}