<?php

    include("/var/task/user/api/funcoes.php");

    $funcoes = new funcoes;
    $dados = json_decode($_POST['dados'], true);
    
    print_r($dados);

    //$funcoes->cadastrar_cliente($dados)

?>