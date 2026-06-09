let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");

let buenas =
localStorage.getItem("buenas") || 0;

let malas =
localStorage.getItem("malasJuego3") || 0;

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

    ". Has completado correctamente el juego número tres. " +

    "Llevas un total de " +

    buenas +

    " respuestas correctas acumuladas. " +

    "En este juego tuviste " +

    malas +

    " respuestas incorrectas. " +

    "Ahora estás listo para comenzar el juego número cuatro. " +

    "¡Sigue así, lo estás haciendo excelente!"

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.2;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

function comenzarJuego4(){

    window.location.href =
    "juego4basico4.html";

}