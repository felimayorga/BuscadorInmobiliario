<?php
	require "library.php";

	$texto = $_POST["busqueda"];
	$data = getData();
	$objetos = [];

	for ($i=0; $i < count($data); $i++) { 
		$objeto = $data[$i][$texto];
		array_push($objetos, $objeto);
	}

	$lista = array_keys(array_flip($objetos));

	echo json_encode($lista);
?>