<?php

$dbHost = 'sql203.epizy.com';
$dbUsername = 'epiz_32661291';
$dbPassword = 'D6UrJcFFcxgW';
$dbName = 'epiz_32661291_doareen';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

	if($conexao->connect_errno){
		echo 'Erro';
	}else{
	    echo 'Sucesso';
	}

?>