var config = {
    apiKey: "AIzaSyCAjuhejLjooQye49jChES7g8jcVHg8MPU",
    authDomain: "coles-cd50a.firebaseapp.com",
    databaseURL: "https://coles-cd50a.firebaseio.com",
    storageBucket: "coles-cd50a.appspot.com",
    messagingSenderId: "602438396883"
  };
  firebase.initializeApp(config);

var password,passwordConfirm;
var user = firebase.auth().currentUser;
var id, myFile,nombre;
var creado = false;
var rol;
var item;
var lineablanco;
var nombreclase;
var arrayobjetoalumnos=[];
var itemprofe;
var profesor;

jQuery(document).ready(function() {
	  	var starCountRef = firebase.database().ref('usuarios/' );
		starCountRef.on('value', function(snapshot) {
		lineablanco='<option> </option>';
		$("#alumnos").html('<option value="">Selecciona los alumnos</option>');
	  	//updateStarCount(postElement, snapshot.val());
	  	var lista= snapshot.val();
	  	item +="<option>Escoge los alumnos...</option>";
	  	itemprofe+="<option>Escoge el profesor...</option>";
	  	$.each(lista,function(key,value){
	  		if(value.rol=="alumno"){
	  			//alert(value.username);
	  			item += '<option value='+value.username+'>'+value.username+'</option>';
	  			var usuario ={
	  				id: value.id,
	  				padre: value.padre,
	  				rol: value.rol,
	  				token: value.token,
	  				username: value.username
	  			};
	  			arrayobjetoalumnos.push(usuario);
	  		}
	  		else if(value.rol=="profesor"){
	  			itemprofe +='<option value='+value.username+'>'+value.username+'</option>';
	  			profesor = value.id;
	  		}
	  	});
	  	//$("#alumnos").prop('selectedIndex', -1);
	  	//listaalumnos.push(arrayobjetoalumnos);
	  	$("#alumnos").html(item);
	  	$("#profesor").html(itemprofe);
	});
		$("#alumnos").change(function(){
			$("#alumnosseleccionados").val($("#alumnosseleccionados").val()+$(this).val()+'\n');		
			$("#alumnos option[value='"+$(this).val()+"']").remove();
		});
		$("#profesor").change(function(){
			$("#profesorseleccionado").val($(this).val()+'\n');

		});

		
  });
$("#formularioRegistro").change(function()
{	
});


function alFinalizar(error, datosUsuario)
{
	if (error)
	{
		switch(error.code)
		{
			case 'EMAIL_TAKEN':
			alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
			break;
			case 'INVALID_EMAIL':
			alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
			break;
			default:
			alert('Se ha producido un error al crear el usuario: '+error);
			break;
		}
	}
	else
	{
		alert('Se ha creado la cuenta de usuario correctamente. ');
		location.assign('index.html');
	}
}

// Programamos el click de los botones del formulario:

$("#botonRegistro").click(function()
{	nombreclase =$("#nombreclase").val();
	//profesor=$("#profesorseleccionado").val();
	//arrayalumnos = $("#alumnosseleccionados").val().split('\n');
	firebase.database().ref('clases/' + nombreclase).set({
			nombregrupo: nombreclase,
			alumnosgrupo: arrayobjetoalumnos,
			profesorgrupo: profesor
	});
	
	
    

});
$("#botonCerrar").click(function(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.assign('index.html');
	}, function(error) {
  // An error happened.
	});
});

$("#botonCancelar").click(function()
{
	location.assign('registro.html');
});

function guardarDatosUsuario(userID,name,tipo) {
id = firebase.auth().currentUser.uid;
  firebase.database().ref('usuarios/usuario/' + id).set({
    username: name,
    rol:tipo
  });
  creado="No";
}

