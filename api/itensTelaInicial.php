<?php

ini_set( 'error_reporting', E_ALL );
ini_set( 'display_errors', true );

include("funcoes.php");

$funcoes = new funcoes;

echo json_encode($funcoes->itensHome());

?>