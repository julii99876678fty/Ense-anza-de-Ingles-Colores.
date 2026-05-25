let avatarSeleccionado = "";

window.onload = function(){

    setTimeout(() => {
        hablar("Aprendamos inglés");
    }, 500);

    setTimeout(() => {
        hablar("Ingresa tu nombre y elige tu avatar");
    }, 2500);
};
function selectAvatar(img){

    let all = document.querySelectorAll(".avatar");

    all.forEach(a => a.classList.remove("selected"));

    img.classList.add("selected");

    avatarSeleccionado = img.src;

    document.getElementById("clickSound").play();

    hablar("Muy bien, has seleccionado un avatar.");
}

function start(){

    let nombre = document.getElementById("nombre").value;

    if(nombre.trim() === ""){

        hablar("Debes ingresar tu nombre para continuar");
        alert("Ingresa tu nombre");
        return;
    }

    if(avatarSeleccionado === ""){

        hablar("Debes seleccionar un avatar antes de continuar");
        alert("Selecciona un avatar");
        return;
    }

    hablar("Excelente " + nombre + ". Estás listo para aprender inglés.");

    localStorage.setItem("nombre", nombre);

localStorage.setItem("avatar", avatarSeleccionado);

setTimeout(function(){

    window.location.href = "html/bienvenida.html";

},2500);
}

function hablar(texto){

    let voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 0.9;
    voz.pitch = 1.3;

    // detener lo anterior para que no se encimen
    speechSynthesis.cancel();

    speechSynthesis.speak(voz);
}