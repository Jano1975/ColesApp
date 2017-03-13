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
var uid, myFile,nombre;
var creado = false;
var rol;
var tipo;
var usuario;
var contra;
var mail;
var item;
var arrayobjetohijos=[];
var idseleccionado=[];


jQuery(document).ready(function() { 
	firebase.auth().onAuthStateChanged(function(user){
		if(creado==true){
		guardarDatosUsuario(nombre,tipo,arrayobjetohijos);
		}else{
		alert("creado false");
		}
	});
	tipo = $("#tipo").val();
	
  });
$("#tipo").change(function(){
	tipo = $("#tipo").val();
   		if(tipo=="padre"){
   			var listadohijos = "<select class='form-control' id='listado'></select>";
   			var hijosseleccionados = "<textarea  class='form-control' id='listadohijos'></textarea>";
   			$("#hijo").html(listadohijos);
   			var nombrehijo;
   			//$("#hijosseleccionados").html(hijosseleccionados);
   			item ="";
   			item +="<option>Escoge los hijos...</option>";
   			var starCountRef = firebase.database().ref('usuarios/' );
			starCountRef.on('value', function(snapshot) {
				var lista= snapshot.val();
				$.each(lista,function(key,value){
	  				if(value.rol=="alumno"){
	  				item += '<option id='+value.username+' value='+value.id+'>'+value.username+'</option>';
			}
		});
			$("#listado").html(item);
		});
			$("#listado").change ( function(){
				nombrehijo=$(this).children(":selected").attr("id");
				$("#hijo").append('<input type="text" id="nombres" class="form-control" value="'+nombrehijo+'"<data-role="tagsinput"/>');
				//$("#listadohijos").val($("#listadohijos").val()+$(this).val());			
				var usuario ={
		  			id: $(this).children(":selected").val(),
		  		};
				arrayobjetohijos.push(usuario);
				$("#listado option[value='"+$(this).val()+"']").remove();
				
			});
		}
   		else{
   			$("#listado").remove();
   			$("#listadohijos").remove();
   			
   		}
});

$("#formularioRegistro").change(function()
{	var email=$("#email").val();
	password=$("#password").val();
	passwordConfirm=$("#password2").val();

	if (password== passwordConfirm)
	{
		$("#botonRegistro").prop("disabled",false);
	}
	else
	{
		$("#botonRegistro").prop("disabled",true);
	}
});


function alFinalizar(error, datosUsuario)
{
	if (error)
	{
	
	}
	else
	{
		alert('Se ha creado la cuenta de usuario correctamente. ');
		location.assign('index.html');
	}
}
 
// Programamos el click de los botones del formulario:

$("#botonRegistro").click(function()
{
	nombre=$("#nombre").val();
	email=$("#email").val();
	password=$("#password").val();
	firebase.auth().createUserWithEmailAndPassword(email,password).then(function(result){
		creado=true;
		alert('Usuario creado correctamente! ');
		$("#nombre").val('');
		$("#email").val('');
		$("#password").val('');
		$("#password2").val('');
		

	}).catch(function(error){
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
	});
	
	
});



$("#botonCerrar").click(function(){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
	location.assign('index.html');
	
	});
});

$("#botonCancelar").click(function()
{
	location.assign('registro.html');
});

function guardarDatosUsuario(name,tipo,hijos) {

uid= firebase.auth().currentUser.uid;
firebase.database().ref('usuarios/'+ uid).set({
    username: name,
    rol:tipo,
    token:"",
    id:uid,
    padre:""
  });
alert(tipo);
  
  if(tipo=="padre"){		
		$.each(hijos, function(key,value){
	  	firebase.database().ref('usuarios').child(value.id).update(
			{
				padre:uid,
			});
	  	
		});
};
creado=false;


}

 