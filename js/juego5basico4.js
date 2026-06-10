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

    const colores = [

        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
        "#ff8800",
        "#ff1493",
        "#ffd700",
        "#ffffff"

    ];

    for(let i = 0; i < 350; i++){

        let papel =
        document.createElement("div");

        papel.style.position =
        "fixed";

        let tamaño =

        Math.random() * 18 + 8;

        papel.style.width =
        tamaño + "px";

        papel.style.height =
        tamaño + "px";

        papel.style.background =

        colores[
            Math.floor(
                Math.random() *
                colores.length
            )
        ];

        papel.style.borderRadius =

        Math.random() > 0.5
        ? "50%"
        : "3px";

        papel.style.zIndex =
        "9999";

        papel.style.pointerEvents =
        "none";

        let ladoIzquierdo =

        Math.random() > 0.5;

        if(ladoIzquierdo){

            papel.style.left =
            "-40px";

        }

        else{

            papel.style.left =
            (window.innerWidth + 40)
            + "px";

        }

        papel.style.top =
        (window.innerHeight - 120)
        + "px";

        document.body.appendChild(
            papel
        );

        let x =
        parseFloat(
            papel.style.left
        );

        let y =
        parseFloat(
            papel.style.top
        );

        let velocidadX =

        ladoIzquierdo

        ?

        (Math.random()*8)+8

        :

        -((Math.random()*8)+8);

        let velocidadY =

        -(Math.random()*15+18);

        let gravedad =
        0.28;

        let rotacion =
        Math.random()*360;

        let velocidadRotacion =

        (Math.random()*18)+8;

        let curva =

        (Math.random()*2)-1;

        let animacion =

        setInterval(()=>{

            velocidadY +=
            gravedad;

            velocidadX +=
            curva * 0.03;

            x +=
            velocidadX;

            y +=
            velocidadY;

            rotacion +=
            velocidadRotacion;

            papel.style.left =
            x + "px";

            papel.style.top =
            y + "px";

            papel.style.transform =

            `rotate(${rotacion}deg)`;

            if(
                y >
                window.innerHeight + 200
            ){

                clearInterval(
                animacion
                );

                papel.remove();

            }

        },16);

    }

}


function siguienteJuego(){

    window.location.href =
    "felicitaciones5.html";

}