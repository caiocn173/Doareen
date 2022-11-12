<?php

include("funcoes.php");

$funcoes = new funcoes;
$texto = $_POST['texto'];

echo json_encode($funcoes->pesquisar($texto));

?>