let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas = 0;

let ronda = 1;

let respuestaCorrecta = 0;

window.onload = function(){

    document.getElementById("nombre")
    .textContent =
    localStorage.getItem("nombre");

    document.getElementById("avatar")
    .src =
    localStorage.getItem("avatar");

    actualizarPuntaje();

    iniciarRonda();

    let voz =
    new SpeechSynthesisUtterance(

    "Hola. Bienvenido al Banco del Futuro. " +

    "Ayuda a los clientes a administrar su dinero. " +

    "Debes sumar los depósitos y restar los retiros. " +

    "Si te equivocas aparecerá una nueva misión. " +

    "Completa cinco misiones para ganar."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

};

function actualizarPuntaje(){

    document.getElementById("buenas")
    .textContent = buenas;

    document.getElementById("malas")
    .textContent = malas;

}

function iniciarRonda(){

    document.getElementById(
    "rondaActual"
    ).textContent = ronda;

    document.getElementById(
    "mensaje"
    ).innerHTML = "";

    let saldo =
    Math.floor(Math.random()*5000)+3000;

    let deposito =
    Math.floor(Math.random()*2000)+1000;

    let retiro =
    Math.floor(Math.random()*1500)+500;

    respuestaCorrecta =
    saldo + deposito - retiro;

    document.getElementById("saldo")
    .innerHTML =
    "💰 Saldo inicial: $" +
    saldo;

    document.getElementById("deposito")
    .innerHTML =
    "➕ Depósito: $" +
    deposito;

    document.getElementById("retiro")
    .innerHTML =
    "➖ Retiro: $" +
    retiro;

    let opciones = [

        respuestaCorrecta,

        respuestaCorrecta +
        Math.floor(Math.random()*500)+100,

        respuestaCorrecta -
        Math.floor(Math.random()*400)-100,

        respuestaCorrecta +
        Math.floor(Math.random()*700)+200

    ];

    opciones =
    opciones.sort(
    ()=>Math.random()-0.5
    );

    let contenedor =
    document.getElementById(
    "opciones"
    );

    contenedor.innerHTML = "";

    opciones.forEach(opcion=>{

        let boton =
        document.createElement("div");

        boton.className =
        "opcion";

        boton.innerHTML =
        "$" + opcion;

        boton.onclick =
        function(){

            verificar(opcion);

        };

        contenedor.appendChild(
        boton
        );

    });

}

function verificar(valor){

    if(valor === respuestaCorrecta){

        buenas++;

        actualizarPuntaje();

        let correcto =
        new Audio(
        "../SONIDO/correcto.mp3"
        );

        correcto.play();

        document.getElementById(
        "mensaje"
        ).innerHTML =
        "⭐ ¡Correcto!";

        ronda++;

        if(ronda > 5){

            finalizarJuego();

        }else{

            setTimeout(()=>{

                iniciarRonda();

            },1000);

        }

    }else{

        malas++;

        actualizarPuntaje();

        let incorrecto =
        new Audio(
        "../SONIDO/incorrecto.mp3"
        );

        incorrecto.play();

        document.getElementById(
        "mensaje"
        ).innerHTML =
        "❌ Incorrecto. Nueva misión.";

        setTimeout(()=>{

            iniciarRonda();

        },1000);

    }

}

function finalizarJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malasJuego5",
    malas
    );

    document.getElementById(
    "mensaje"
    ).innerHTML =
    "🏆 ¡Completaste el Banco del Futuro!";

    document.getElementById(
    "siguiente"
    ).style.display =
    "inline-block";

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones. Has completado las cinco misiones del Banco del Futuro. Ahora puedes continuar al siguiente desafío."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    speechSynthesis.speak(voz);

    confeti();

}

function confeti(){

    const objetos =

    ["💰","🪙","✨","🎉","💵"];

    for(let i=0;i<400;i++){

        let papel =
        document.createElement("div");

        papel.innerHTML =
        objetos[
        Math.floor(
        Math.random()*
        objetos.length
        )
        ];

        papel.style.position =
        "fixed";

        papel.style.left =
        Math.random()*100+"vw";

        papel.style.top =
        "-50px";

        papel.style.fontSize =
        (20 + Math.random()*30)
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

function siguienteJuego(){

    window.location.href =
    "felicitaciones5.html";

}