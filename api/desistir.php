<?php

include("funcoes.php");

$funcoes = new funcoes;
$item = $_POST['item'];
$dono = $_POST['dono'];

echo $funcoes->desistir($item, $dono);

?>