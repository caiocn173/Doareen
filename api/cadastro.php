<?php

    include("funcoes.php");

    $funcoes = new funcoes;
    $dados = json_decode($_POST['dados'], true);
    
    print_r($dados);

    //$funcoes->cadastrar_cliente($dados)

?>