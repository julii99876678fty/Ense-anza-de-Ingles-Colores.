let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");

/* Buenas acumuladas */

let buenas =
parseInt(
localStorage.getItem("buenas")
) || 0;

/* Malas solo del juego 2 */

let malasJuego2 =
parseInt(
localStorage.getItem("malasJuego2")
) || 0;

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
    ).textContent = malasJuego2;

    hablarFelicitacion();

};

function hablarFelicitacion(){

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    nombre +

    ". Has completado el juego dos. " +

    "Llevas un total de " +

    buenas +

    " respuestas correctas. " +

    "En este juego cometiste " +

    malasJuego2 +

    " errores. " +

    "Ahora puedes comenzar el juego tres."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.2;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

function comenzarJuego3(){

    window.location.href =
    "juego3basico4.html";

}