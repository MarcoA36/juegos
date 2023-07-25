<?php 
include('../conexion_bd.php');

if (!$conexion_bd) {
    die("Error de conexión: " . mysqli_connect_error());
}

$pregunta = $_POST['pregunta'];
$correcta = $_POST['correcta'];
$opcion2 = $_POST['opcion2'];
$opcion3 = $_POST['opcion3'];
$opcion4 = $_POST['opcion4'];
$usuario = Null;

$mensaje = "INSERT INTO pregunta VALUES(DEFAULT,'$pregunta','$correcta','$opcion2','$opcion3','$opcion4','$usuario')";

if ($ejecutar = mysqli_query($conexion_bd, $mensaje)) {
    $estado = true;
} else {
    $estado = false;
}

mysqli_close($conexion_bd);
echo json_encode(array('estado' => $estado, 'mensaje' => $mensaje));
?>