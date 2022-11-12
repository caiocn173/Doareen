<?php

include("funcoes.php");

$funcoes = new funcoes;
$dono = isset($_POST['id']) ? $_POST['id'] : null;
$item = isset($_POST['item']) ? $_POST['item'] : null;
$data = isset($_POST['data']) ? $_POST['data'] : null;
$mensagem = isset($_POST['mensagem']) ? $_POST['mensagem'] : null;
$action = isset($_POST['action']) ? $_POST['action'] : null;


echo json_encode($funcoes->getItemChatInteressado($dono, $item, $data, $mensagem, $action));

?>