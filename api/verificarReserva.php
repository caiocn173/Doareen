<?php

include("funcoes.php");

$funcoes = new funcoes;
$item = $_POST['item'];

echo $funcoes->verificarReserva($item);

?>