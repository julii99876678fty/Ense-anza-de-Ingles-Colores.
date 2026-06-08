let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");

let buenas =
localStorage.getItem("buenas") || 0;

let malas =
localStorage.getItem("malas") || 0;

window.onload = function(){

    document.getElementById(
    "nombreJugador"
    ).textContent = nombre;

    document.getElementById(
    "avatarJugador"
    ).src = avatar;

    document.getElementById(
    "buenas"
    ).textContent = buenas;

    document.getElementById(
    "malas"
    ).textContent = malas;

    felicitarAlumno();
};

function felicitarAlumno(){

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    nombre +

    ". Has completado el juego número uno. " +

    "Obtuviste " +

    buenas +

    " respuestas correctas y " +

    malas +

    " respuestas incorrectas. " +

    "Ahora estás listo para comenzar el juego número dos."

    );

    voz.lang = "es-ES";
    voz.rate = 0.9;
    voz.pitch = 1.2;

    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
}

function comenzarJuego2(){

    window.location.href =
    "juego2basico4.html";

}