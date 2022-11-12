<?php

include("funcoes.php");

$funcoes = new funcoes;
$idItem = $_POST['id_item'];

echo $funcoes->processaInteresse($idItem);

?>