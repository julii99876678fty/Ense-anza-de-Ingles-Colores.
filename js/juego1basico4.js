let arrastrado = null;

let completados = 0;

const contenedorNumeros =
document.getElementById("contenedorNumeros");

const zonas =
document.querySelectorAll(".zona");

let numerosJuego = [];

/* Voz inicial */

window.onload = function(){

    generarJuego();

    let voz = new SpeechSynthesisUtterance(
        "Ordena los números desde el más pequeño hasta el más grande."
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
};

/* Generar números */

function generarJuego(){

    completados = 0;

    numerosJuego = [];

    contenedorNumeros.innerHTML = "";

    document.getElementById("mensaje").innerHTML = "";

    document.getElementById("siguiente").style.display =
    "none";

    while(numerosJuego.length < 10){

        let numero =
        Math.floor(Math.random()*10000)+1;

        if(!numerosJuego.includes(numero)){

            numerosJuego.push(numero);
        }
    }

    let ordenados =
    [...numerosJuego].sort((a,b)=>a-b);

    zonas.forEach((zona,index)=>{

        zona.innerHTML =
        `${index+1}° Lugar`;

        zona.dataset.correcto =
        ordenados[index];

        zona.classList.remove("correcta");
    });

    let mezclados =
    [...numerosJuego].sort(
        ()=>Math.random()-0.5
    );

    mezclados.forEach(numero=>{

        let div =
        document.createElement("div");

        div.classList.add("numero");

        div.draggable = true;

        div.id = numero;

        div.textContent = numero;

        div.addEventListener("dragstart",()=>{

            arrastrado = div;

            let click =
            new Audio("../SONIDO/click.mp3");

            click.play();
        });

        contenedorNumeros.appendChild(div);
    });

}

/* Drag & Drop */

zonas.forEach(zona=>{

    zona.addEventListener("dragover",(e)=>{

        e.preventDefault();

    });

    zona.addEventListener("drop",()=>{

        if(zona.classList.contains("correcta")){

            return;
        }

        let valorCorrecto =
        zona.dataset.correcto;

        if(arrastrado.id === valorCorrecto){

            zona.innerHTML = "";

            zona.appendChild(arrastrado);

            zona.classList.add("correcta");

            arrastrado.draggable = false;

            completados++;

            let correcto =
            new Audio("../SONIDO/correcto.mp3");

            correcto.play();

            document.getElementById("mensaje").innerHTML =
            "⭐ ¡Muy bien!";

            if(completados === 10){

                finalizarJuego();
            }

        }else{

            let incorrecto =
            new Audio("../SONIDO/incorrecto.mp3");

            incorrecto.play();

            document.getElementById("mensaje").innerHTML =
            "❌ Ese número no va aquí";

            arrastrado.style.animation =
            "shake 0.3s";

            setTimeout(()=>{

                arrastrado.style.animation =
                "";

            },300);
        }

    });

});

/* Reiniciar con nuevos números */

function reiniciarJuego(){

    generarJuego();

    let voz = new SpeechSynthesisUtterance(
        "Se generaron nuevos números."
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

/* Finalizar */

function finalizarJuego(){

    document.getElementById("mensaje").innerHTML =
    "🎉 ¡Felicitaciones! Terminaste el juego.";

    document.getElementById("siguiente").style.display =
    "inline-block";

    let correcto =
    new Audio("../SONIDO/correcto.mp3");

    correcto.play();

    confeti();
}

/* Confeti */

function confeti(){

    for(let i=0;i<100;i++){

        let estrella =
        document.createElement("div");

        estrella.innerHTML = "⭐";

        estrella.style.position = "fixed";

        estrella.style.left =
        Math.random()*100+"vw";

        estrella.style.top = "-20px";

        estrella.style.fontSize = "30px";

        document.body.appendChild(estrella);

        let pos = 0;

        let anim = setInterval(()=>{

            pos += 5;

            estrella.style.top =
            pos + "px";

            if(pos > window.innerHeight){

                clearInterval(anim);

                estrella.remove();
            }

        },20);
    }
}

/* Juego 2 */

function siguienteJuego(){

    window.location.href =
    "juego2basico4.html";
}