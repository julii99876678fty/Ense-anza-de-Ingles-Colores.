window.onload = function(){

    let nombre =
    localStorage.getItem("nombre");

    let avatar =
    localStorage.getItem("avatar");

    let buenas =
    parseInt(
    localStorage.getItem("buenas")
    ) || 0;

    document.getElementById(
    "nombreJugador"
    ).textContent =
    nombre;

    document.getElementById(
    "avatarJugador"
    ).src =
    avatar;

    document.getElementById(
    "buenas"
    ).textContent =
    buenas;

    document.getElementById("j1")
    .textContent =
    localStorage.getItem(
    "malasJuego1"
    ) || 0;

    document.getElementById("j2")
    .textContent =
    localStorage.getItem(
    "malasJuego2"
    ) || 0;

    document.getElementById("j3")
    .textContent =
    localStorage.getItem(
    "malasJuego3"
    ) || 0;

    document.getElementById("j4")
    .textContent =
    localStorage.getItem(
    "malasJuego4"
    ) || 0;

    document.getElementById("j5")
    .textContent =
    localStorage.getItem(
    "malasJuego5"
    ) || 0;

    document.getElementById("j6")
    .textContent =
    localStorage.getItem(
    "malasJuego6"
    ) || 0;

    asignarMedalla(buenas);

    confetiGigante();

    hablarApollo(
    nombre,
    buenas
    );

};

function asignarMedalla(buenas){

    let medalla =
    document.getElementById(
    "medalla"
    );

    if(buenas >= 50){

        medalla.innerHTML =
        "👑 LEYENDA MATEMÁTICA";

    }

    else if(buenas >= 40){

        medalla.innerHTML =
        "🥇 MAESTRO MATEMÁTICO";

    }

    else if(buenas >= 30){

        medalla.innerHTML =
        "🥈 EXPLORADOR NUMÉRICO";

    }

    else{

        medalla.innerHTML =
        "🥉 APRENDIZ VALIENTE";

    }

}

function hablarApollo(
nombre,
buenas
){

    let voz =
    new SpeechSynthesisUtterance(

    "Hola " +


    "Quiero felicitarte por completar los seis juegos matemáticos. " +


    "Lograste obtener " +

    buenas +

    " respuestas correctas. " +

    "Estoy muy orgulloso de tu esfuerzo. " +

    "Presiona el botón para recibir tu diploma final."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(
    voz
    );

}


function irFinal(){

    window.location.href =
    "final.html";

}