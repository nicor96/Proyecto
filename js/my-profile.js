let profileInfo = {
    "name" : "",
    "age" : "",
    "email" : "",
    "phone" : "",
    "profilepic" : "",
}

const cosito = document.getElementById("botoncito");

cosito.onsubmit = function(e) {
    e.preventDefault();     
    let profileInfo = {
        "name" : document.getElementById("user-name").value,
        "age" : document.getElementById("user-age").value,
        "email" : document.getElementById("user-email").value,
        "phone" : document.getElementById("user-phone").value,
        "profilepic" : document.getElementById("avatarImage").src
        
    }
    console.log(document.getElementById("avatarImage").src)
    let profileInfoString = JSON.stringify(profileInfo)
    //hacer el coso pa que lo meta al localstorage
    console.log(profileInfoString)
    if (document.getElementById("user-name").value != "" & document.getElementById("user-age").value != "" & document.getElementById("user-email").value != "" & document.getElementById("user-phone").value != ""){
       localStorage.setItem('profileData', profileInfoString);
        checkProfileDetails() 
    }
    
}


function showProfileDetails(userData){
    console.log(userData)
    document.getElementById("user-name").value = userData.name;
    document.getElementById("user-age").value = userData.age;
    document.getElementById("user-email").value = userData.email;
    document.getElementById("user-phone").value = userData.phone;
    if (userData.profilepic == "https://i.ibb.co/23bbLkw/perfil-hombre-vacio.jpg") {
        console.log("ta vacieo eto man")
    }
    else {
        console.log(userData)
        console.log("aca hay una pic")
        document.getElementById("avatarImage").src = userData.profilepic;
    }
}

function checkProfileDetails(){
    const userData = localStorage.getItem("profileData");
    if (userData === null) {
        document.getElementById("user-email").value = localStorage.getItem("email")
      }
    else {
        showProfileDetails(JSON.parse(userData))
    }
}

checkProfileDetails()


document.addEventListener("DOMContentLoaded", function(e){
    const avatarInput = document.getElementById("avatarInput");
    avatarInput.onchange = (event) => {
        let avatarfile = event.target.files[0];
        var fr = new FileReader();
        fr.onload = function() {
            document.getElementById("avatarImage").src = fr.result;
            profileInfo.profilepic = fr.result
            console.log(profileInfo)
            //localStorage.setItem('avatar', fr.result)
        }
        fr.readAsDataURL(avatarfile)
    }
});