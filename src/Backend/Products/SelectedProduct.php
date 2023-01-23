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

    public function DELETE($ID){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("DELETE FROM products WHERE ID=:ID");
            $stmt->bindparam(":ID",$ID);
            $stmt->execute() or die("Cannot delete the data from the database, please try again.");

            $DataBase->CloseConnection();

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();

        }
    }

    public function GET(){
        try{
            $DataBase = new DBConnection();
            $DB = $DataBase->OpenConnection();

            $stmt = $DB->prepare("SELECT * FROM products");
            $stmt->execute() or die("Cannot fetch the data from the database, please try again.");
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            
            $result = json_encode($result);
            $result = json_decode($result, true);

            $AllProducts = array();

            foreach($result as $res){
                $this->setType($res['ProductType']);
                $Product = $this->SimpleFactory->CreateProduct($this->type);
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
            echo $AllProducts;

        }catch(PDOException $e){
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function ADD(){        
        $Product = $this->SimpleFactory->CreateProduct($this->type);
        $SKU = $_REQUEST["sku"];
        $Name = $_REQUEST["name"];
        $Price = $_REQUEST["price"];
        $Size = $_REQUEST["size"];
        $Weight = $_REQUEST["weight"];
        $Dimensions = array($_REQUEST["height"], $_REQUEST["width"], $_REQUEST["length"]);
        $Attributes = array($Size, $Weight, $Dimensions);
        
        $Product->setSKU($SKU);
        $Product->setName($Name);
        $Product->setPrice($Price);
        $Product->setAttributes($Attributes);
        $Product->ADD();
    }
}
