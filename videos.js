// Selección de elementos
const videos = document.querySelectorAll(".gallery video");

const lightbox = document.getElementById("lightbox-video");
const player = document.getElementById("lightbox-player");

const btnCerrar = document.querySelector(".close");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

const contador = document.getElementById("contador");
const miniaturas = document.getElementById("miniaturas-video");

let indiceActual = 0;
let interfazVisible = true;
let temporizadorUI;

// Crear miniaturas
videos.forEach((vid, index) => {
    const mini = document.createElement("video");
    mini.src = vid.querySelector("source").src;
    mini.muted = true;
    mini.playsInline = true;

    mini.addEventListener("click", () => abrirVideo(index));

    miniaturas.appendChild(mini);
});

// Abrir vídeo
function abrirVideo(index){
    document.body.style.overflow = "hidden";
    indiceActual = index;

    lightbox.style.display = "flex";

    player.src = videos[index].querySelector("source").src;
    player.play();

    contador.innerHTML = (index + 1) + " / " + videos.length;

    actualizarMiniaturas();

    reiniciarTemporizador();
}

// Resaltar miniatura activa
function actualizarMiniaturas(){
    const minis = miniaturas.querySelectorAll("video");
    minis.forEach((mini, i)=>{
        mini.style.opacity = i === indiceActual ? "1" : ".45";
        mini.style.transform = i === indiceActual ? "scale(1.08)" : "scale(1)";
    });
}

// Abrir al pulsar una miniatura grande
videos.forEach((vid,index)=>{
    vid.addEventListener("click",()=> abrirVideo(index));
});

// Flecha derecha
btnNext.addEventListener("click",()=>{
    indiceActual = (indiceActual + 1) % videos.length;
    abrirVideo(indiceActual);
});

// Flecha izquierda
btnPrev.addEventListener("click",()=>{
    indiceActual = (indiceActual - 1 + videos.length) % videos.length;
    abrirVideo(indiceActual);
});

// Cerrar
btnCerrar.addEventListener("click",()=>{
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
    player.pause();
});

// Click fuera del vídeo
lightbox.addEventListener("click",(e)=>{
    if(e.target === lightbox){
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
        player.pause();
    }
});

// Teclado
document.addEventListener("keydown",(e)=>{
    if(lightbox.style.display !== "flex") return;

    if(e.key === "ArrowRight") btnNext.click();
    if(e.key === "ArrowLeft") btnPrev.click();

    if(e.key === "Escape"){
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
        player.pause();
    }
});

// Swipe táctil
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 60) btnNext.click();
    if (touchEndX > touchStartX + 60) btnPrev.click();
});

// Mostrar / ocultar interfaz (solo móvil)
player.addEventListener("click",()=>{

    if(window.innerWidth > 768) return;

    if(interfazVisible){
        ocultarUI();
    }else{
        mostrarUI();
    }
});

function mostrarUI(){
    interfazVisible = true;

    const topBar = document.querySelector(".lightbox-top");
    if(topBar) topBar.style.opacity = "1";

    miniaturas.style.opacity = "1";
}

function ocultarUI(){
    interfazVisible = false;

    const topBar = document.querySelector(".lightbox-top");
    if(topBar) topBar.style.opacity = "0";

    miniaturas.style.opacity = "0";
}

function reiniciarTemporizador(){
    if(window.innerWidth > 768) return;

    clearTimeout(temporizadorUI);

    mostrarUI();

    temporizadorUI = setTimeout(()=>{
        ocultarUI();
    },2500);
}
