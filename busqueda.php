<?php
	require "library.php";

	$max = intval($_POST["max"]);
	$min = intval($_POST["min"]);
	$ciudad = $_POST["ciudad"];
	$tipo = $_POST["tipo"];
	$data = getData();
	$registros = [];

	for ($i=0; $i<count($data); $i++) { 
		$precio_data = intval(str_replace(["$", ","], "", $data[$i]["Precio"]));

		if (($ciudad == "Elige una ciudad") && ($tipo == "Elige un tipo")) {
			if (($precio_data >= $min) && ($precio_data <= $max)) {
				$registro = $data[$i];
				array_push($registros, $registro);
			} 
		} elseif (($ciudad == "Elige una ciudad") && ($tipo != "Elige un tipo")) {
			if (($precio_data >= $min) && ($precio_data <= $max) && ($data[$i]["Tipo"] == $tipo)) {
				$registro = $data[$i];
				array_push($registros, $registro);
			}
		} else if (($ciudad != "Elige una ciudad") && ($tipo == "Elige un tipo")) {
			if (($precio_data >= $min) && ($precio_data <= $max) && ($data[$i]["Ciudad"] == $ciudad)) {
				$registro = $data[$i];
				array_push($registros, $registro);
			}
		} else if (($ciudad != "Elige una ciudad") && ($tipo != "Elige un tipo")){
			if (($precio_data >= $min) && ($precio_data <= $max) && ($data[$i]["Ciudad"] == $ciudad) && ($data[$i]["Tipo"] == $tipo)) {
				$registro = $data[$i];
				array_push($registros, $registro);
			}
		}
	}

	if ($registros == []) {
		$registros["msj"] = "false";
	}

	echo json_encode($registros);
?>