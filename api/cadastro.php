<?php
ini_set( 'error_reporting', E_ALL );
ini_set( 'display_errors', true );
include("funcoes.php");

$funcoes = new funcoes;
$dados = json_decode($_POST['dados'], true);

echo $funcoes->verificar_cliente($dados);

?>