<?php

include("funcoes.php");
header("Access-Control-Allow-Origin: *");
$funcoes = new funcoes;
$dados = json_decode($_POST['dados'], true);

echo $funcoes->verificar_login($dados);

?>