<?php

$dbHost = 'sql10.freemysqlhosting.net';
$dbUsername = 'sql10522028';
$dbPassword = '2qTSZeEq1S';
$dbName = 'sql10522028';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if($conexao->connect_errno){
    echo 'Erro';
}else{
    echo 'Sucesso';
}


$sql = "SELECT * FROM clientes";
$result = mysqli_query($conexao, $sql);

while($row = mysqli_fetch_assoc($result)){

    foreach($row as $value){

        echo $value['nome_cliente'];

    }

}

?>