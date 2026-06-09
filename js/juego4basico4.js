let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas = 0;

let aciertos = 0;

let ronda = 1;

let respuestaCorrecta;

window.onload = function(){

    document.getElementById("nombre")
    .textContent =
    localStorage.getItem("nombre");

    document.getElementById("avatar")
    .src =
    localStorage.getItem("avatar");

    actualizarPuntaje();

    nuevaRonda();

};

function actualizarPuntaje(){

    document.getElementById("buenas")
    .textContent = buenas;

    document.getElementById("malas")
    .textContent = malas;

}

function nuevaRonda(){

    document.getElementById("mensaje")
    .innerHTML = "";

    let mayorQue =
    Math.floor(Math.random()*7000)+1000;

    let menorQue =
    mayorQue + 500;

    let ultimo =
    Math.floor(Math.random()*10);

    let correcto =
    mayorQue + 100;

    correcto =
    parseInt(
    correcto.toString().slice(0,-1)
    + ultimo
    );

    respuestaCorrecta =
    correcto;

    document.getElementById("pista1")
    .innerHTML =
    "🔍 Soy mayor que " +
    mayorQue;

    document.getElementById("pista2")
    .innerHTML =
    "🔍 Soy menor que " +
    menorQue;

    document.getElementById("pista3")
    .innerHTML =
    "🔍 Termino en " +
    ultimo;

    document.getElementById("pista4")
    .innerHTML =
    "🔍 Tengo 4 cifras";

    leerPistas(
    mayorQue,
    menorQue,
    ultimo
    );

    let opciones = [
        correcto,
        menorQue + 50,
        mayorQue - 50,
        correcto + 13
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

    opciones.forEach(numero=>{

        let div =
        document.createElement("div");

        div.className =
        "opcion";

        div.textContent =
        numero;

        div.onclick =
        function(){

            verificar(numero);

        };

        contenedor.appendChild(div);

    });

}

function leerPistas(
mayor,
menor,
ultimo
){

    let voz =
    new SpeechSynthesisUtterance(

    "Detective. Busca un número mayor que " +

    mayor +

    ". Menor que " +

    menor +

    ". Que termine en " +

    ultimo +

    ". Y tenga cuatro cifras."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

function verificar(numero){

    if(numero === respuestaCorrecta){

        buenas++;

        aciertos++;

        ronda++;

        actualizarPuntaje();

        let correcto =
        new Audio(
        "../SONIDO/correcto.mp3"
        );

        correcto.play();

        document.getElementById("mensaje")
        .innerHTML =
        "⭐ ¡Correcto detective!";

        if(aciertos === 5){

            finalizarJuego();

        }else{

            setTimeout(()=>{

                nuevaRonda();

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

        document.getElementById("mensaje")
        .innerHTML =
        "❌ Pista incorrecta. Nuevo caso.";

        setTimeout(()=>{

            nuevaRonda();

        },1000);

    }

}

function finalizarJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malasJuego4",
    malas
    );

    document.getElementById("mensaje")
    .innerHTML =
    "🏆 ¡Excelente detective! Has resuelto los 5 casos.";

    document.getElementById("siguiente")
    .style.display =
    "inline-block";

    let nombre =
    localStorage.getItem("nombre");

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    nombre +

    ". Has completado las cinco rondas del detective de números. Ahora puedes continuar al siguiente desafío."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

    confeti();

}

function confeti(){

    const emojis = [
        "🎉",
        "✨",
        "🌟",
        "⭐",
        "🎊"
    ];

    for(let i=0;i<400;i++){

        let papel =
        document.createElement("div");

        papel.innerHTML =
        emojis[
        Math.floor(
        Math.random()*emojis.length
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
    "felicitaciones4.html";

}