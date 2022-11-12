<?php

include("funcoes.php");

$funcoes = new funcoes;
$id = isset($_POST['id']) ? $_POST['id'] : null;
$action = $_POST['action'];
$cliente = isset($_POST['cliente']) ? $_POST['cliente'] : null;
$item = isset($_POST['item']) ? $_POST['item'] : null;
$data = isset($_POST['data']) ? $_POST['data'] : null;
$mensagem = isset($_POST['mensagem']) ? $_POST['mensagem'] : null;

echo json_encode($funcoes->getItemChatDoador($id, $action, $cliente, $item, $data, $mensagem));

?>