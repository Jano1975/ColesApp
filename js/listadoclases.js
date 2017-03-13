var config = {
    apiKey: "AIzaSyCAjuhejLjooQye49jChES7g8jcVHg8MPU",
    authDomain: "coles-cd50a.firebaseapp.com",
    databaseURL: "https://coles-cd50a.firebaseio.com",
    storageBucket: "coles-cd50a.appspot.com",
    messagingSenderId: "602438396883"
  };
  firebase.initializeApp(config);
var item;
var fila;
var registro;
var nombreprofe=[];
var alumnos=[];
  $(document).ready(function() {
		$('#tabla1').stacktable();
    $("#pop").dialog({
    autoOpen: false,
      show: {
        effect: "blind",
        duration: 500
      },
      hide: {
        effect: "explode",
        duration: 500
      },
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Modificar": modificar,
        Cancel: function() {
          this.dialog( "close" );
        }
      },
   });
    var starCountRef = firebase.database().ref('clases/' );
    
    starCountRef.on('value', function(snapshot) {
      var lista= snapshot.val();
      $.each(lista,function(key,value){
        //var nombreprofesor = firebase.database().ref('usuarios/'+value.profesorgrupo);
      
        nombreprofe=obtenerprofesor(value.profesorgrupo);
        alert(nombreprofe);
          item += '<tr><td id="nombre">'+key+'</td><td id="miembros">'+alumnos+'</td><td id="profesor">'+nombreprofe+'</td><td><button id="editar" onclick= mostrar(); type="button" class="btn btn-warning">Editar</button></td></tr>';
          registro+= '<td>'+value.miembros+'</td></tr>';
      });
      $("#tabla1").html(item);

    });
    
	});

  function mostrar() {
    $( "#pop" ).dialog( "open" );
    $("#nombreedicionclase").text("Hola");
   
 }
 function obteneralumnos(idalumno){
  var idalumnos = firebase.database().ref('usuarios/'+idalumno);
  idalumnos.on('value',function(snapshot){
      listadoalumnos= snapshot.val();
      alumnos.push(listadoalumnos.username);
      alert(alumnos);
      
  });
 }
 function obtenerprofesor(idprofesor){
  var listado;
  var nombre;
  var nombreprofesor = firebase.database().ref('usuarios/'+idprofesor);
  nombreprofesor.on('value',function(snapshot){
          listado = snapshot.val();
          nombre= listado.username;
          
          return nombre;
          
        });

  
 }
 function modificar(){

  }