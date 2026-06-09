let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");

let buenas =
localStorage.getItem("buenas") || 0;

let malas =
localStorage.getItem("malasJuego4") || 0;

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

    ". Has completado exitosamente el juego número cuatro llamado detective de números. " +

    "Llevas acumuladas " +

    buenas +

    " respuestas correctas. " +

    "Ahora estás listo para comenzar el juego número cinco."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

function confeti(){

    const emojis =

    ["🎉","✨","🌟","⭐","🎊"];

    for(let i=0;i<350;i++){

        let papel =
        document.createElement("div");

        papel.innerHTML =
        emojis[
        Math.floor(
        Math.random() *
        emojis.length
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
        3 + Math.random()*5;

        let anim =
        setInterval(()=>{

            pos += velocidad;

            papel.style.top =
            pos + "px";

            if(
            pos >
            window.innerHeight + 50
            ){

                clearInterval(anim);

                papel.remove();

            }

        },20);

    }

}

function comenzarJuego5(){

    window.location.href =
    "juego5basico4.html";

}