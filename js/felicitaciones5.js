let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");

let buenas =
localStorage.getItem("buenas") || 0;

let malas =
localStorage.getItem("malasJuego5") || 0;

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

    confeti();

};

function felicitarAlumno(){

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    nombre +

    ". Has completado exitosamente el juego cinco llamado Banco del Futuro. " +

    "Llevas acumuladas " +

    buenas +

    " respuestas correctas. " +

    "Ahora estás listo para enfrentar el desafío final del juego seis."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

function confeti(){

    const objetos =

    ["💰","🪙","💵","✨","🎉","🎊"];

    for(let i=0;i<400;i++){

        let papel =
        document.createElement("div");

        papel.innerHTML =
        objetos[
        Math.floor(
        Math.random() *
        objetos.length
        )
        ];

        papel.style.position =
        "fixed";

        papel.style.left =
        Math.random()*100 + "vw";

        papel.style.top =
        "-50px";

        papel.style.fontSize =
        (20 + Math.random()*35)
        + "px";

        papel.style.zIndex =
        "9999";

        document.body.appendChild(
        papel
        );

        let pos = -50;

        let velocidad =
        3 + Math.random()*6;

        let anim =
        setInterval(()=>{

            pos += velocidad;

            papel.style.top =
            pos + "px";

            if(
            pos >
            window.innerHeight + 100
            ){

                clearInterval(anim);

                papel.remove();

            }

        },20);

    }

}

function comenzarJuego6(){

    window.location.href =
    "juego6basico4.html";

}