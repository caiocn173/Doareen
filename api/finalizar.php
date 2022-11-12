<?php

include("funcoes.php");

$funcoes = new funcoes;
$item = $_POST['item'];
$cliente = $_POST['id'];
$data = $_POST['data'];

echo $funcoes->finalizarDoacao($item, $cliente, $data);

?>