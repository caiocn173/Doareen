<?php

include("funcoes.php");

$funcoes = new funcoes();

echo json_encode($funcoes->getSessao());

?>