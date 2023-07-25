<?php
// header("Content-Type: application/json; charset=utf-8");
include("conexion_bd.php");

// $arrayPreguntas=array();

$consulta = mysqli_query($conexion_bd,"SELECT * FROM pregunta");

// while ($data = mysqli_fetch_assoc($consulta)){
//     $arrayPreguntas=json_encode($data,JSON_UNESCAPED_UNICODE);
    
//     echo $arrayPreguntas;
// };

$arrayPreguntas = [];
while ($data = mysqli_fetch_assoc($consulta)){
    $arrayPreguntas[] = $data;
};
echo json_encode($arrayPreguntas, JSON_UNESCAPED_UNICODE);
?>