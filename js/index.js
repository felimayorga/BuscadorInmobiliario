$.fn.scrollEnd = function(callback, timeout) {
	$(this).scroll(function(){
    	var $this = $(this);
    	if ($this.data('scrollTimeout')) {
      		clearTimeout($this.data('scrollTimeout'));
    	}
    	$this.data('scrollTimeout', setTimeout(callback,timeout));
  	});
};

function inicializarSlider(){
  	$("#rangoPrecio").ionRangeSlider({
	    type: "double",
    	grid: false,
    	min: 0,
    	max: 100000,
    	from: 200,
    	to: 80000,
    	prefix: "$"
  	});
}

inicializarSlider();

function setRegistros(data) {
	$(".itemMostrado").detach();
  	for (let i=0; i<data.length; i++){
    	var card = "<div class='itemMostrado card'>"+
                	"<img src='img/home.jpg'/>"+
                	"<div class='card-stacked card-content'>"+
                  		"<p><b>Direccion: </b>:direccion:</p>"+
                  		"<p><b>Ciudad: </b>:ciudad:</p>"+
                  		"<p><b>Telefono: </b>:telefono:</p>"+
                  		"<p><b>Codigo postal: </b>:codigo:</p>"+
                  		"<p><b>Tipo: </b>:tipo:</p>"+
                  		"<p><b>Precio: </b><span class='precioTexto'>:precio:</span></p>"+
                  		"<div class='card-action'><h6><b>VER MÁS</b></h6></div>"+
                	"</div>"+
             	   "</div>";
  var newCard = card.replace(":direccion:", data[i].Direccion)
                    .replace(":ciudad:", data[i].Ciudad)
                    .replace(":telefono:", data[i].Telefono)
                    .replace(":codigo:", data[i].Codigo_Postal)
                    .replace(":tipo:", data[i].Tipo)
                    .replace(":precio:", data[i].Precio);
  $(".colContenido").append(newCard);
  }
}

function setCiudades(data) {
	let lista = JSON.parse(data);

	for(let i=0; i<lista.length; i++){
	    let item = "<option value='"+(i+1)+"'>"+lista[i]+"</option>";
	    $("#selectCiudad").append(item);
	    $('select').material_select();
	}
}

function setTipos(data) {
  	let lista = JSON.parse(data);
  	for(let i=0; i<lista.length; i++){
      	let item = "<option value='"+(i+1)+"'>"+lista[i]+"</option>";
      	$("#selectTipo").append(item);
      	$('select').material_select();
    }
}

function mostrarCiudades() {
  	let form_data = new FormData();
  	form_data.append("busqueda", "Ciudad");

	$.ajax({
		url: './listas.php',
		dataType: 'text',
    	cache: false,
    	contentType: false,
    	processData: false,
    	data: form_data,
    	type: 'POST',
    	success: function(data) {
    		setCiudades(data);
		}
	})
}

function mostrarTipos() {
  	let form_data = new FormData();
  	form_data.append("busqueda", "Tipo");

  	$.ajax({
    	url: './listas.php',
    	dataType: 'text',
      	cache: false,
      	contentType: false,
      	processData: false,
      	data: form_data,
      	type: 'POST',
      	success: function(data) {
        	setTipos(data);
    	}
  	})
}

function mostrarRegistros() {
	$.ajax({
    	url: './mostrarRegistros.php',
    	dataType: 'json',
	    cache: false,
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    success: function(data) {
	      setRegistros(data);
	    }
  	})
}

function buscarRegistros(event) {
  	event.preventDefault();
  	let precio_min = $("#rangoPrecio").data().from;
  	let precio_max = $("#rangoPrecio").data().to;
  	let ciudad = $("#selectCiudad :selected").text();
  	let tipo =$("#selectTipo :selected").text();
  	let form_data = new FormData();
  	form_data.append("max", precio_max);
  	form_data.append("min", precio_min);
  	form_data.append("ciudad", ciudad);
  	form_data.append("tipo", tipo);

  	$.ajax({
  		url: './busqueda.php',
  		dataType: 'json',
      	cache: false,
      	contentType: false,
      	processData: false,
      	data: form_data,
      	type: 'POST',
      	success: function(data) {
        	if (data.msj == "false") {
        		alert("No se han encontrado registros con esos filtros")
        	} else {
        		setRegistros(data);
        	}
    	}
  	})
}

$("#mostrarTodos").on("click", mostrarRegistros);
$("#formulario").submit(buscarRegistros);

$(document).ready(function() {
    mostrarCiudades();
    mostrarTipos();
});
