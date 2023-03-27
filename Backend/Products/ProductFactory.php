<?php

class ProductFactory{

    public function CreateProduct($ProductType) {
        $className = "" . $ProductType;

        return new $className();
    }
}