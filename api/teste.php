<?php

$servidor = "ec2-23-23-151-191.compute-1.amazonaws.com";
//Aqui é o nome de usuário do seu banco de dados, root é o servidor inicial e
//básico de todo servidor, mas recomenda-se não usar o usuario root e sim criar um novo usuário
$usuario = "jlnrrtrcncxdri";
//Aqui colocamos a senha do usuário, por padrão o usuário root vem sem senha,
//mas é altamente recomendável criar uma senha para o usuário root, visto que ele é
//o que tem mais privilégios no servidor
$senha ="ed6ead83f589868ba10d5c1dd33199883daaaad7f50eadb48f9935d3819d13a4";

//Aqui criamos a conexão utilizando o servidor, usuario e senha,
//caso dê erro, retorna um erro ao usuário.
$connect = pg_connect("host=ec2-23-23-151-191.compute-1.amazonaws.com dbname=d96t37t1e8l25b user=jlnrrtrcncxdri password=ed6ead83f589868ba10d5c1dd33199883daaaad7f50eadb48f9935d3819d13a4") or
die ("Não foi possível conectar ao servidor PostGreSQL");
//caso a conexão seja efetuada com sucesso, exibe uma mensagem ao usuário
echo "Conexão efetuada com sucesso!!";

$result = pg_query($connect, "SELECT * FROM clientes");
if (!$result) {
  echo "An error occurred.\n";
  exit;
}

while ($row = pg_fetch_row($result)) {
  print_r($row);
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