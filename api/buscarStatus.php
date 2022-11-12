<?php

include("funcoes.php");

$funcoes = new funcoes;
$item = $_POST['item'];
$cliente = $_POST['id'];

echo json_encode($funcoes->buscarStatus($item, $cliente));

?>