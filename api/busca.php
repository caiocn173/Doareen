<?php

include("funcoes.php");

$funcoes = new funcoes;
$termo = $_POST['termo'];

echo json_encode($funcoes->busca($termo));

?>