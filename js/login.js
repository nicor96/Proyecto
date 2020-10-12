function soloUser(text){
    var clave = text.indexOf("@");
    var usuario = text.substr(0, clave);
   return(usuario);
}


document.addEventListener("DOMContentLoaded", function(e){
    const loginForm = document.getElementById("formu");

    loginForm.onsubmit = function(e) {
       e.preventDefault();
       let userEmail = soloUser(document.getElementById("inputEmail").value);
       localStorage.setItem('email', userEmail);
       window.location.href = "index.html";
    }
});