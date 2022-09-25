<?php

    include("funcoes.php");

    $funcoes = new funcoes;
    $dados = json_decode($_POST['dados'], true);

    echo $funcoes->verificar_cliente($dados);

?>