let arrastrado = null;

let completados = 0;

const numeros = document.querySelectorAll(".numero");
const zonas = document.querySelectorAll(".zona");

window.onload = function(){

    let voz = new SpeechSynthesisUtterance(
        "Ordena los números desde el más pequeño hasta el más grande."
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
};

numeros.forEach(numero=>{

    numero.addEventListener("dragstart",()=>{

        arrastrado = numero;

        let click = new Audio("../SONIDO/click.mp3");

        click.play();
    });

});

zonas.forEach(zona=>{

    zona.addEventListener("dragover",(e)=>{

        e.preventDefault();

    });

    zona.addEventListener("drop",()=>{

        if(zona.classList.contains("correcta")) return;

        let valorCorrecto = zona.dataset.correcto;

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
        }

    });

});

function finalizarJuego(){

    document.getElementById("mensaje").innerHTML =
    "🎉 ¡Felicitaciones! Terminaste el juego.";

    document.getElementById("siguiente").style.display =
    "inline-block";

    confeti();
}

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

function siguienteJuego(){

    window.location.href =
    "juego2basico4.html";
}