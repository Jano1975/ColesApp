var config = {
    apiKey: "AIzaSyCAjuhejLjooQye49jChES7g8jcVHg8MPU",
    authDomain: "coles-cd50a.firebaseapp.com",
    databaseURL: "https://coles-cd50a.firebaseio.com",
    storageBucket: "coles-cd50a.appspot.com",
    messagingSenderId: "602438396883"
  };
  firebase.initializeApp(config);

$("#login").click(function()
{
	var email=$("#email").val();
	var password=$("#password").val();
	var mensajeerror;
  
	firebase.auth().signInWithEmailAndPassword(email,password).then(function(result){
		location.assign('principal.html');
	}).catch(function(error){
		var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Error de login!!');
          } else {
            alert(errorMessage);
          }
	});
      
});

