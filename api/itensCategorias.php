<?php

include("funcoes.php");

$funcoes = new funcoes;
$categoria = $_POST['categoria'];

echo json_encode($funcoes->itensCategoria($categoria));

?>