<?php

$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="75489873";
$dbname="doareen";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
	or die ('Could not connect to the database server' . mysqli_connect_error());

//$con->close();





/*$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '75489873';
$dbName = 'doareen';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if($conexao->connect_errno){
    echo 'Erro';
}else{
    echo 'Sucesso';
}


$sql = "SELECT * FROM clientes";
$result = mysqli_query($conexao, $sql);

while($row = mysqli_fetch_assoc($result)){

    foreach($row as $field => $value){

        echo $value;

    }

}*/

?>