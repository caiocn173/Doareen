<?php

include("database.php");

class funcoes extends database{

    public function __construct(){

        $database = new database;

    }

    //Início - Funções genéricas
    
    function loop($result, $campo){
        if(strlen($campo) == 0){
            $arr = [];
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                array_push($arr, $row);
                $i++;
            }
            return $arr;
        }else{
            while($row = mysqli_fetch_assoc($result)){
                return $row[$campo];
            }
        }
    }
    
    //Fim - Funções genéricas

    //Inicio - Funções para o arquivo cadastro.php

    function verificar_cliente($dados){

        $cpf = $dados['cpf'];

        $sql = "SELECT * FROM clientes WHERE cpf_cliente = {$cpf}";
        $result = $database->query($sql);

        $resultado = $this->loop($result, '');

        if(sizeof($resultado) > 0){

            return 1;

        }else{

            $this->cadastrar_cliente($dados);

        }

    }

    function cadastrar_cliente($dados){

        $senha = md5($dados['senha']);
        $string = "(";

        foreach($dados as $field => $value){

            $string .= $value . ",";

        }

        $string = substr($string, 0,  -2);
        $string .= ")";

        $sql = "INSERT INTO clientes(nome_cliente, cpf_cliente, email_cliente, data_nasc_cliente, cep_cliente, cidade_cliente, uf_cliente, bairro_cliente, rua_cliente, numero_cliente, complemento_cliente, telefone_cliente, senha_cliente) VALUES $string;";
        $result = $database->query($sql);

        return 0;

    }

    //Fim - Funções para o arquivo cadastro.php

}

?>