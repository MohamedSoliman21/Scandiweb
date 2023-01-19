<?php

require_once('Database/Classes.php');

$Product = new SelectedProduct(new ProductFactory);
$Product->setType("DVD");
echo $Product->ADD();