<?php

$host="localhost";
$port=3306;
$socket="";
$user="caio";
$password="75489873";
$dbname="doareen";

try {
    $dbh = new PDO("mysql:host={$host};port={$port};dbname={$dbname}", $user, $password));
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}




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