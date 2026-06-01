let nombre = localStorage.getItem("nombre");
let avatar = localStorage.getItem("avatar");

document.getElementById("nombreUsuario").innerHTML =
"Hola " + nombre + " 👋";

document.getElementById("avatarUsuario").src = avatar;

function hablar(texto){

    let voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

window.onload = function(){

    hablar(
        "Bienvenido a cuarto básico. Hoy aprenderemos a comparar y ordenar números hasta diez mil."
    );
};

function comenzarJuego(){

window.location.href = "juego1basico4.html";
}