<?php

include("database.php");

session_start();

class funcoes extends database{

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
        $email = $dados['email'];

        $sql = "SELECT * FROM clientes WHERE cpf_cliente = {$cpf} AND email_cliente = '{$email}'";
        $result = $this->query($sql);

        $resultado = $this->loop($result, '');

        if(sizeof($resultado) > 0){

            return 1;

        }else{

            return $this->cadastrar_cliente($dados);

        }

    }

    function cadastrar_cliente($dados){

        unset($dados['repsenha']);

        $dados['senha'] = md5($dados['senha']);
        $cpf = $dados['cpf'];
        $string = "(";

        foreach($dados as $field => $value){

            $string .= "'" . $value . "',";

        }

        $string = substr($string, 0,  -3);
        $string .= "')";

        $sql = "INSERT INTO clientes(nome_cliente, cpf_cliente, email_cliente, data_nasc_cliente, cep_cliente, cidade_cliente, uf_cliente, bairro_cliente, rua_cliente, numero_cliente, complemento_cliente, telefone_cliente, senha_cliente) VALUES $string;";
        $result = $this->query($sql);

        $sql = "SELECT id_cliente, nome_cliente FROM clientes WHERE cpf_cliente = {$cpf}";
        $result = $this->query($sql);

        $this->setSessao($this->loop($result, ''));

        return 0;

    }

    function setSessao($dados){

        $_SESSION['dadosCliente'] =  $dados;

    }

    function getSessao(){

        return $_SESSION['dadosCliente'];

    }



    //Fim - Funções para o arquivo cadastro.php

    //Inicio - Funções para o arquivo login.php

    function verificar_login($dados){

        $emailCliente = $dados['email'];
        $senhaCliente = md5($dados['senha']);

        $sql = "SELECT id_cliente, nome_cliente FROM clientes WHERE email_cliente = {$emailCliente} and senha_cliente = {$senhaCliente}";
        $result = $this->query($sql);

        $resultado = $this->loop($result, '');

        if(sizeof($resultado) > 0){

            $this->setSessao($resultado);

            return 1;

        }else{

            return 0;

        }

    }

    //Fim - Funções para o arquivo login.php

}

?>