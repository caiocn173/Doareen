<?php

include("funcoes.php");
header("Access-Control-Allow-Origin: *");
$funcoes = new funcoes();

echo json_encode($funcoes->getSessao());

?>