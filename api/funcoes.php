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

        $sql = "SELECT * FROM clientes WHERE cpf_cliente = '{$cpf}' OR email_cliente = '{$email}'";
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

        $string = substr($string, 0,  -2);
        $string .= "')";

        $sql = "INSERT INTO clientes(nome_cliente, cpf_cliente, email_cliente, data_nasc_cliente, cep_cliente, cidade_cliente, uf_cliente, bairro_cliente, rua_cliente, numero_cliente, complemento_cliente, telefone_cliente, senha_cliente) VALUES $string;";
        $result = $this->query($sql);

        $sql = "SELECT id_cliente, nome_cliente FROM clientes WHERE cpf_cliente = '{$cpf}'";
        $result = $this->query($sql);

        $this->setSessao($this->loop($result, ''));

        return 0;

    }

    function setSessao($dados){

        $_SESSION['dadosCliente'] =  $dados;

    }

    function getSessao(){

        return isset($_SESSION['dadosCliente']) ? $_SESSION['dadosCliente'] : null;

    }



    //Fim - Funções para o arquivo cadastro.php

    //Inicio - Funções para o arquivo login.php

    function verificar_login($dados){

        $emailCliente = $dados['email'];
        $senhaCliente = md5($dados['senha']);

        $sql = "SELECT id_cliente, nome_cliente FROM clientes WHERE email_cliente = '{$emailCliente}' and senha_cliente = '{$senhaCliente}'";
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

    //Inicio - Funções para o arquivo logout.php

    function logout(){

        $this->setSessao(null);

    }

    //Fim - Funções para o arquivo logout.php

    //Inicio - Funções para o arquivo publicar.php

    function publicar($nomeItem, $categoria, $condicao, $descricao, $destino){

        $dados = $this->getSessao();

        if(sizeOf($dados) > 0){
          
            date_default_timezone_set('America/Sao_Paulo');
			$data = date('Y/m/d h:i:s', time());

            $sql = "INSERT INTO itens(nome_item, descricao, categoria, condicao, nome_imagem, status, qtd_interessados, data_cadastro, id_cliente) values('$nomeItem', '$descricao', '$categoria', '$condicao', '".$destino."', 'disponivel', 0, '$data', '".$dados[0]['id_cliente']."')";
            $result = $this->query($sql);
          
          return $sql;

        }
        

    }

    //Fim - Funções para o arquivo publicar.php
  
  	//Inicio - Funções para o arquivo getItens.php
  
 	function getItens(){
    
      	$dados = $this->getSessao();

      	$sql = "SELECT itens.id_item, itens.nome_item, itens.descricao, itens.status, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente = ".$dados[0]['id_cliente'];
        $result = $this->query($sql);
        
        return $this->loop($result, '');
      
    } 
 
  	//Fim - Funções para o arquivo getItens.php
  
    //Inicio - Funções para o arquivo itensHome.php
  
  	function itensHome(){
    
    	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
    	$sql = "";
      
      	if($id != null){
        
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente != $id AND itens.status = 'disponivel' ORDER BY itens.data_cadastro DESC";
          
        }else{
      
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.status = 'disponivel' ORDER BY itens.data_cadastro DESC";
          
        }
      
      	$result = $this->query($sql);
      	
      	return $this->loop($result, '');
    
    }
  
    //Fim - Funções para o arquivo itensHome.php
  
  	//Inicio - Funções para o arquivo carregarItem.php
  
  	function getItem($id){
    
    	$sql = "SELECT itens.id_item, itens.nome_item, itens.descricao, itens.condicao, itens.nome_imagem, clientes.nome_cliente, clientes.cidade_cliente, clientes.uf_cliente FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_item = $id";
        $result = $this->query($sql);
      
      	return $this->loop($result, '');
    
    }
  
  	//Fim - Funções para o arquivo carregarItem.php
  
    //Fim - Funções para o arquivo buscarRelacionados.php
  
  	function getRelacionados($id){
    
    	$sql = "SELECT categoria FROM itens WHERE id_item = $id";
        $result = $this->query($sql);
      
      	$categoria = $this->loop($result, 'categoria');
      	$dados = $this->getSessao();
      
        $idCliente = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
        $sql = "";
      
      	if($idCliente != null){
        
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente != $idCliente AND itens.status = 'disponivel' AND itens.categoria = '$categoria' AND itens.id_item != $id ORDER BY itens.data_cadastro DESC LIMIT 4";
          
        }else{
      
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.status = 'disponivel' AND itens.categoria = '$categoria' AND itens.id_item != $id ORDER BY itens.data_cadastro DESC LIMIT 4";
          
        }

      	$result = $this->query($sql);
      	
      	if(mysqli_num_rows($result) > 0){
        
        	return $this->loop($result, '');
          
        }else{
        
        	return array();
        
        }
    
    }
  
    //Fim - Funções para o arquivo buscarRelacionados.php
  
  	//Inicio - Funções para o arquivo itensCategoria.php
  
  	function itensCategoria($categoria){
    
    	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
    	$sql = "";
      
      	if($id != null){
        
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente != $id AND itens.status = 'disponivel' AND itens.categoria = '$categoria' ORDER BY itens.data_cadastro DESC LIMIT 4";
          
        }else{
      
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.status = 'disponivel' AND itens.categoria = '$categoria' ORDER BY itens.data_cadastro DESC LIMIT 4";
          
        }
      
      	$result = $this->query($sql);
      	
      	return $this->loop($result, '');
      
    }
  
    //Fim - Funções para o arquivo itensCategoria.php
  
  	//Inicio - Funções para o arquivo pesquisar.php
  
  	function pesquisar($texto){
    
      	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
    	$sql = "";
      
      	if($id != null){
        
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente != $id AND itens.status = 'disponivel' AND itens.nome_item like '$texto%' ORDER BY itens.data_cadastro DESC LIMIT 10";
          
        }else{
      
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.status = 'disponivel' AND itens.nome_item like '$texto%' ORDER BY itens.data_cadastro DESC LIMIT 10";
          
        }
      
      	$result = $this->query($sql);
      	
      	return $this->loop($result, '');
    
    }
  
  	//Fim - Funções para o arquivo pesquisar.php
  
  	//Inicio - Funções para o arquivo processarInteresse.php
  
  	function processaInteresse($idItem){
    
    	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
      	if($id == null){
        	
        	return 0;
        
        }else{
          
          	$sql = "SELECT status FROM itens WHERE id_item = $idItem";
          	$result = $this->query($sql);
          
          	$status = $this->loop($result, "status");
          
          	if($status == "disponivel"){
              	
              
                $sql = "SELECT itens.nome_item, itens.descricao, itens.nome_imagem, clientes.id_cliente FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_item = $idItem";
              	$result = $this->query($sql);
              
              	$array = $this->loop($result, '');
              
              	$sql = "SELECT count(*) as id_cliente_interessado FROM interessados WHERE id_cliente_interessado = $id AND id_cliente_dono = ".$array[0]['id_cliente']." AND id_item = $idItem";
              	$result = $this->query($sql);
              	
                $count = $this->loop($result, '');

              	if($count[0]['id_cliente_interessado'] == 0){
              
                  $sql = "UPDATE itens SET qtd_interessados = qtd_interessados + 1 WHERE id_item = $idItem";
                  $result = $this->query($sql);

                  $sql = "INSERT INTO interessados(id_cliente_interessado,id_cliente_dono,id_item,nome_item,descricao,nome_imagem) VALUES($id, '".$array[0]['id_cliente']."', $idItem, '".$array[0]['nome_item']."', '".$array[0]['descricao']."', '".$array[0]['nome_imagem']."')";
                  $result = $this->query($sql);

                  return 1;
              
                }else{
                
                  return 2;
                
                }
              
            }else{
            
            	return 3;
            
            }
        
        }
    
    }
  
    //Fim - Funções para o arquivo processarInteresse.php
  
  	//Inicio - Funções para o arquivo itensInteressados.php
  
  	function getItensInteressados(){
      
      	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
          if($id != null){
          
            	$sql = "SELECT interessados.id_cliente_dono, interessados.id_item, interessados.nome_item, interessados.descricao, interessados.nome_imagem FROM interessados INNER JOIN itens ON interessados.id_item = itens.id_item WHERE interessados.id_cliente_interessado = $id AND itens.status != 'doado'";
            	$result = $this->query($sql);
            
            	return $this->loop($result, '');
          
          }else{
          
          		return 0;
          
          }
    
    }
  
  	//Fim - Funções para o arquivo itensInteressados.php
  
  	//Inicio - Funções para o arquivo chatDoador.php
  
  	function getItemChatDoador($id, $action, $cliente, $item, $data, $mensagem){
    
    	$dados = $this->getSessao();
      
      	if($action == 1){
      
      		$sql = "SELECT nome_item, descricao, nome_imagem FROM interessados WHERE id_item = $id AND id_cliente_dono = " . $dados[0]['id_cliente'];
    		$result = $this->query($sql);
          
          	return $this->loop($result, '');
          
        }else if($action == 2){
        
        	$sql = "SELECT interessados.id_cliente_interessado, clientes.nome_cliente, clientes.cidade_cliente, clientes.uf_cliente FROM interessados INNER JOIN clientes ON interessados.id_cliente_interessado = clientes.id_cliente WHERE interessados.id_cliente_dono = " . $dados[0]['id_cliente'] . " AND id_item = $id";
          	$result = $this->query($sql);
          
          	return $this->loop($result, '');
        
        }else if($action == 3){
        
          	$sql = "(SELECT mensagem, id_registro, true as 'recebida', data_mensagem FROM mensagens_interessados WHERE id_cliente_interessado = $cliente AND id_cliente_dono = " . $dados[0]['id_cliente'] . " AND id_item = $item) UNION (SELECT mensagem, id_registro, false as 'recebida', data_mensagem FROM mensagens_donos WHERE id_cliente_interessado = $cliente AND id_cliente_dono = " . $dados[0]['id_cliente'] . " AND id_item = $item)";
          	$result = $this->query($sql);
          
          	return $this->loop($result, '');
        
        }else{
        
        	$sql = "INSERT INTO mensagens_donos(id_cliente_dono, id_cliente_interessado, id_item, mensagem, data_mensagem) VALUES(" . $dados[0]['id_cliente'] . ", $cliente, $item, '$mensagem', '$data')";
            $result = $this->query($sql);
          
          	return array($sql);
        
        }
    }
  
  	//Fim - Funções para o arquivo chatDoador.php
  
    //Inicio - Funções para o arquivo chatInteressado.php
  
  	function getItemChatInteressado($dono, $item, $data, $mensagem, $action){
    
    	$dados = $this->getSessao();
      
      	if($action == 1){
        
        	$sql = "SELECT interessados.nome_item, interessados.descricao, interessados.nome_imagem, clientes.nome_cliente FROM interessados INNER JOIN clientes ON interessados.id_cliente_dono = clientes.id_cliente WHERE interessados.id_item = $item AND interessados.id_cliente_dono = $dono AND interessados.id_cliente_interessado = " . $dados[0]['id_cliente'];
          	$result = $this->query($sql);
			
          	return $this->loop($result, '');
        
        }else if($action == 2){
          
        	$sql = "(SELECT mensagem, id_registro, true as 'recebida', data_mensagem FROM mensagens_interessados WHERE id_cliente_interessado = " . $dados[0]['id_cliente'] . " AND id_cliente_dono = $dono AND id_item = $item) UNION (SELECT mensagem, id_registro, false as 'recebida', data_mensagem FROM mensagens_donos WHERE id_cliente_interessado = " . $dados[0]['id_cliente'] . " AND id_cliente_dono = $dono AND id_item = $item)";
          	$result = $this->query($sql);
          
          	return $this->loop($result, '');  
          
        }else if($action == 3){
        
        	$sql = "INSERT INTO mensagens_interessados(id_cliente_interessado, id_cliente_dono, id_item, mensagem, data_mensagem) VALUES(" . $dados[0]['id_cliente'] . ", $dono, $item, '$mensagem', '$data')";
            $result = $this->query($sql);
          
          	return array($sql);
        
        }
    
    }
  
    //Fim - Funções para o arquivo chatInteressado.php
  
  	//Inicio - Funções para o arquivo verificarReserva.php
  
  	function verificarReserva($item){
      
      	$sql = "SELECT * FROM reserva WHERE id_item = $item AND cancelado = 0";
      	$result = $this->query($sql);
      
      	if(mysqli_num_rows($result) > 0){
        
        	return 1;
        
        }else{
        
        	return 0;
        
        }
      
    }
  
  	//Fim - Funções para o arquivo verificarReserva.php
  
  	//Inicio - Funções para o arquivo reserva.php
  
  	function reservar($cliente, $item, $cancelado){
    
    	$dados = $this->getSessao();
      
      	$sql = "UPDATE itens SET status = 'reservado' WHERE id_cliente = " . $dados[0]['id_cliente'] . " AND id_item = $item";
      	$result = $this->query($sql);
      
      	if($cancelado == 'false'){
          
          	$sql = "SELECT COUNT(*) as qtd FROM reserva WHERE id_cliente_reserva = $cliente AND cancelado = 1 AND id_item = $item";
          	$result = $this->query($sql);
          
          	$row = intval($this->loop($result, 'qtd'));
          
          	if($row > 0){
            
            	$sql = "UPDATE reserva SET cancelado = 0 WHERE id_cliente_reserva = $cliente AND id_item = $item AND cancelado = 1";
              	$result = $this->query($sql);
            
            }else{
      
      			$sql = "INSERT INTO reserva(id_cliente_dono, id_cliente_reserva, id_item, cancelado) VALUES(" . $dados[0]['id_cliente'] .", $cliente, $item, 0)";
      			$result = $this->query($sql);
    		
            }
              
        }else{
          
          	$sql = "SELECT * FROM reserva WHERE id_item = $item AND cancelado = 0";
          	$result = $this->query($sql);
          
          	$idCliente = $this->loop($result, 'id_cliente_reserva');
        
        	$sql = "UPDATE reserva SET cancelado = 1 WHERE id_item = $item AND id_cliente_reserva = $idCliente";
      		$result = $this->query($sql);
          
          	$sql = "SELECT COUNT(*) as qtd FROM reserva WHERE id_cliente_reserva = $cliente AND id_item = $item";
          	$result = $this->query($sql);
          
          	$row = intval($this->loop($result, 'qtd'));
          
          	if($row == 0){
            
            	$sql = "INSERT INTO reserva(id_cliente_dono, id_cliente_reserva, id_item, cancelado) VALUES(" . $dados[0]['id_cliente'] .", $cliente, $item, 0)";
      			$result = $this->query($sql);
            
            }else{
            
            	$sql = "UPDATE reserva SET cancelado = 0 WHERE id_cliente_reserva = $cliente AND id_item = $item AND cancelado = 1";
              	$result = $this->query($sql);
            
            }
        
        }
          
    }
  
  	//Fim - Funções para o arquivo reserva.php
  
  	//Inicio - Funções para o arquivo buscarStatus.php
  
	function buscarStatus($item, $cliente){
    
    	$sql = "SELECT id_cliente_reserva, cancelado FROM reserva WHERE id_item = $item AND id_cliente_reserva = $cliente";
      	$result = $this->query($sql);
      
      	return $this->loop($result, '');
    
    }  
  
  	//Fim - Funções para o arquivo buscarStatus.php
  
  	//Inicio - Funções para o arquivo cancelarReserva.php
  
  	function cancelarReserva($cliente, $item){
    
    	$sql = "UPDATE reserva SET cancelado = 1 WHERE id_cliente_reserva = $cliente AND id_item = $item";
        $result = $this->query($sql);
      
      	$sql = "UPDATE itens SET status = 'disponivel' WHERE id_item = $item";
      	$result = $this->query($sql);
      
      return $sql;
    
    }
  
  	//Fim - Funções para o arquivo cancelarReserva.php
  
  	//Inicio - Funções para o arquivo finalizar.php
  
  	function finalizarDoacao($item, $cliente, $data){
    
      	$dados = $this->getSessao();
      
      	$sql = "UPDATE itens SET status = 'doado' WHERE id_item = $item";
      	$result = $this->query($sql);
      	
      	$sql = "DELETE FROM reserva WHERE id_cliente_dono = " . $dados[0]['id_cliente'] . " AND id_cliente_reserva = $cliente AND id_item = $item AND cancelado = 0";
      	$result = $this->query($sql);
      
    	$sql = "INSERT INTO doacoes(id_cliente_dono, id_cliente_doacao, id_item, data_doacao) VALUES(" . $dados[0]['id_cliente'] . ", $cliente, $item, '$data')";
      	$result = $this->query($sql);
      
      	return "Sucesso!";
    
    }
  
  	//Fim - Funções para o arquivo finalizar.php
  
  	//Inicio - Funções para o arquivo historico.php
  
  	function getDoacoes(){
    
      	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
      	if($id != null){
          
      		$sql = "SELECT clientes.nome_cliente, itens.descricao, itens.nome_item, itens.nome_imagem, doacoes.data_doacao FROM clientes INNER JOIN doacoes ON clientes.id_cliente = doacoes.id_cliente_doacao INNER JOIN itens ON itens.id_item = doacoes.id_item";
      		$result = $this->query($sql);
          
          	return $this->loop($result, '');
          
        }else{
        
        	return 0;
        
        }
    
    }
  
  	//Fim - Funções para o arquivo historico.php
  
  	//Inicio - Funções para o arquivo desistir.php
  
  	function desistir($item, $dono){
    
    	$dados = $this->getSessao();
      
      	$sql = "UPDATE itens SET qtd_interessados = qtd_interessados - 1 WHERE id_item = $item";
      	$result = $this->query($sql);
      
      	$sql = "DELETE FROM interessados WHERE id_cliente_interessado = " . $dados[0]['id_cliente'] . " AND id_cliente_dono = $dono AND id_item = $item";
      	$result = $this->query($sql);
    
    }
  
  	//Fim - Funções para o arquivo desistir.php
  
  	//Inicio - Funções para o arquivo busca.php
  
  	function busca($termo){
      
      	$dados = $this->getSessao();
      
      	$id = isset($dados[0]['id_cliente']) ? $dados[0]['id_cliente'] : null;
      
      	if($id != null){
    
    		$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.id_cliente != $id AND itens.status = 'disponivel' AND (itens.nome_item LIKE '$termo%' OR itens.nome_item LIKE '$termo%') ORDER BY itens.data_cadastro DESC";
      		$result = $this->query($sql);
          
          	return $this->loop($result, '');
      
        }else{
        
        	$sql = "SELECT itens.id_item, itens.id_cliente, itens.nome_item, itens.descricao, itens.categoria, itens.nome_imagem, clientes.cidade_cliente as cidade, clientes.uf_cliente as uf, itens.qtd_interessados FROM itens INNER JOIN clientes ON itens.id_cliente = clientes.id_cliente WHERE itens.status = 'disponivel' AND (itens.nome_item LIKE '$termo%' OR itens.nome_item LIKE '$termo%') ORDER BY itens.data_cadastro DESC";
      		$result = $this->query($sql);
          
          	return $this->loop($result, '');
        
        }
    
    }
  
  	//Fim - Funções para o arquivo busca.php

}

?>