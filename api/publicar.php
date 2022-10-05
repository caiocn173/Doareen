<?php

include("funcoes.php");

$gerenciador = new funcoes;
$dir = "img_produtos/";
$destino = "";
echo $_FILES["file"]['tmp_name'];
if(!empty($_FILES["file"])){

    $file = $_FILES["file"];
    $destino = "$dir".$file["name"];

    if(move_uploaded_file($file["tmp_name"], "$dir/".$file["name"])){
        echo "<script language = 'javascript' type='text/javascript'>alert('Item publicado com sucesso!');window.location.href='index.php'</script>";
    }else{
        echo "<script language = 'javascript' type='text/javascript'>alert('A foto do item é obritatória');window.location.href='anunciar.html'</script>";
    }    
}

echo $gerenciador->publicar($_POST['nomeItem'], $_POST['categoria'], $_POST['condicao'], $_POST['descricao'], $destino);



?>