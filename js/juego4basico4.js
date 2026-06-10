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
    "felicitaciones4.html";

}