<?php

include("funcoes.php");

$funcoes = new funcoes;
$cliente  = $_POST['id'];
$item = $_POST['item'];

echo $funcoes->cancelarReserva($cliente, $item);

?>