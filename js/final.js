window.onload = function(){

    let nombre =
    localStorage.getItem("nombre");

    let avatar =
    localStorage.getItem("avatar");

    let buenas =
    parseInt(
    localStorage.getItem("buenas")
    ) || 0;

    let malas =

    (parseInt(localStorage.getItem("malasJuego1")) || 0)+
    (parseInt(localStorage.getItem("malasJuego2")) || 0)+
    (parseInt(localStorage.getItem("malasJuego3")) || 0)+
    (parseInt(localStorage.getItem("malasJuego4")) || 0)+
    (parseInt(localStorage.getItem("malasJuego5")) || 0)+
    (parseInt(localStorage.getItem("malasJuego6")) || 0);

    document.getElementById(
    "avatarJugador"
    ).src =
    avatar;

    document.getElementById(
    "nombreJugador"
    ).textContent =
    nombre;

    document.getElementById(
    "buenas"
    ).textContent =
    buenas;

    document.getElementById(
    "malas"
    ).textContent =
    malas;

    let porcentaje = Math.round(
    (buenas /
    (buenas + malas))
    *100
    );

    if(isNaN(porcentaje)){

        porcentaje = 100;
    }

    document.getElementById(
    "porcentaje"
    ).textContent =
    porcentaje + "%";

    asignarMedalla(
    porcentaje
    );

    hablarApollo(
    nombre,
    porcentaje
    );
};

function asignarMedalla(
porcentaje
){

    let medalla =
    document.getElementById(
    "medallaFinal"
    );

    if(porcentaje >= 95){

        medalla.innerHTML =
        "👑 LEYENDA MATEMÁTICA";

    }

    else if(
    porcentaje >= 85
    ){

        medalla.innerHTML =
        "🥇 MAESTRO MATEMÁTICO";

    }

    else if(
    porcentaje >= 70
    ){

        medalla.innerHTML =
        "🥈 EXPLORADOR NUMÉRICO";

    }

    else{

        medalla.innerHTML =
        "🥉 APRENDIZ MATEMÁTICO";

    }

}

function hablarApollo(
nombre,
porcentaje
){

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    nombre +

    ". Has completado toda la aventura matemática. " +

    "Tu porcentaje final fue de " +

    porcentaje +

    " por ciento. " +

    "Estoy muy orgulloso de tu esfuerzo. " +

    "Hoy eres un campeón de las matemáticas."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(
    voz
    );

}

function volverInicio(){

    speechSynthesis.cancel();

    localStorage.clear();

    window.location.href =
    "bienvenida.html";

}