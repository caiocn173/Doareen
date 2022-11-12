<?php

include("funcoes.php");

$funcoes = new funcoes;
$id = $_POST['id_item'];

echo json_encode($funcoes->getRelacionados($id));

?>