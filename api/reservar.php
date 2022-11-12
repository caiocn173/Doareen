<?php

include("funcoes.php");

$funcoes = new funcoes;
$cliente  = $_POST['id'];
$item = $_POST['item'];
$cancelado = $_POST['cancelado'];
echo $cancelado;
echo $funcoes->reservar($cliente, $item, $cancelado);

?>