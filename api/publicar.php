<?php

include("funcoes.php");

$gerenciador = new funcoes;

$dir = "img_produtos/";
$destino = "";

if(!empty($_FILES["file"])){

    $file = $_FILES["file"];
    $destino = "$dir".$file["name"];

    if(move_uploaded_file($file["tmp_name"], "$dir/".$file["name"])){
        $gerenciador->publicar($_POST['nomeItem'], $_POST['categoria'], $_POST['condicao'], $_POST['descricao'], $destino);
        echo "<script language = 'javascript' type='text/javascript'>alert('Item publicado com sucesso!');window.location.href='/Doareen/paginas/meu-perfil.html'</script>";
    }else{
        echo "<script language = 'javascript' type='text/javascript'>alert('A foto do item é obritatória');window.location.href='/Doareen/paginas/meu-perfil.html'</script>";
    }    
}



?>