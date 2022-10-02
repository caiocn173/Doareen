<?php

if(isset($_FILES['file']['name'])){
    // file name
    $filename = $_FILES['file']['name'];
    
    // Location
    $parent = dirname(__DIR__);
    $location = $parent . '\\img_exibicao_prod\\'.$filename;
    print("este é o diretório: " . $parent);
 
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
 
    $response = 0;
    if(in_array($file_extension,$valid_ext) && !strpos($filename, '-') && !strpos($filename, '/')){
       // Upload file
       if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
          $response = 1;
       } 
    }
 
    echo $response;
    exit;
 }

?>