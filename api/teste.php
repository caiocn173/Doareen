<?php

$dbHost = 'br902.hostgator.com.br';
$dbUsername = 'bebefofu_interno';
$dbPassword = 'efr041821';
$dbName = 'bebefofu_sistema_picking';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

	if($conexao->connect_errno){
		echo 'Erro';
	}else{
	    echo 'Sucesso';
	}

?>