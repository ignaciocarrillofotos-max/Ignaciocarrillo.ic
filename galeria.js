function openFolder(folder){
    if(folder === "deportes") window.location.href = "FOTOSVIDEOS/deportes/";
    if(folder === "fauna") window.location.href = "FOTOSVIDEOS/fauna/";
    if(folder === "paisajes") window.location.href = "FOTOSVIDEOS/paisajes/";
}

const imagenes = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const btnCerrar = document.querySelector(".close");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

const contador = document.getElementById("contador");
const miniaturas = document.getElementById("miniaturas");
    const topBar = document.querySelector(".lightbox-top");
const acciones = document.querySelector(".lightbox-actions");

let interfazVisible = true;
let temporizadorUI;

let indiceActual = 0;
let zoom = false;
let escala = 1;

// Crear miniaturas
imagenes.forEach((img, index) => {
    const mini = document.createElement("img");
    mini.src = img.src;
    mini.addEventListener("click", () => abrirImagen(index));
    miniaturas.appendChild(mini);
});

// Abrir imagen
function abrirImagen(index){
    document.body.style.overflow = "hidden";
    indiceActual = index;

    lightbox.style.display = "flex";
    lightboxImg.src = imagenes[index].src;

    escala = 1;
    zoom = false;

    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.cursor = "zoom-in";

    contador.innerHTML = (index + 1) + " / " + imagenes.length;

    actualizarMiniaturas();

    lightboxImg.classList.remove("animar");
    void lightboxImg.offsetWidth;
    lightboxImg.classList.add("animar");

    btnFavorito.innerHTML = favoritos.includes(index)
        ? "❤ Guardada"
        : "🤍 Favorito";
    reiniciarTemporizador();
}

// Resaltar miniatura activa
function actualizarMiniaturas(){
    const minis = miniaturas.querySelectorAll("img");
    minis.forEach((mini, i)=>{
        mini.style.opacity = i === indiceActual ? "1" : ".45";
        mini.style.transform = i === indiceActual ? "scale(1.08)" : "scale(1)";
    });
}

// Abrir al pulsar una foto
imagenes.forEach((img,index)=>{
    img.addEventListener("click",()=> abrirImagen(index));
});

// Flecha derecha
btnNext.addEventListener("click",()=>{
    indiceActual = (indiceActual + 1) % imagenes.length;
    abrirImagen(indiceActual);
});

// Flecha izquierda
btnPrev.addEventListener("click",()=>{
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    abrirImagen(indiceActual);
});

// Cerrar
btnCerrar.addEventListener("click",()=>{
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
});

// Click fuera de la foto
lightbox.addEventListener("click",(e)=>{
    if(e.target === lightbox){
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
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

// Zoom doble click
lightboxImg.addEventListener("dblclick", () => {

    zoom = !zoom;

    if (zoom) {

        lightboxImg.style.transform = "scale(2)";
        lightboxImg.style.cursor = "zoom-out";

    } else {

        lightboxImg.style.transform = "scale(1)";
        lightboxImg.style.cursor = "zoom-in";

    }

});

// Mostrar / ocultar interfaz (solo móvil)
lightboxImg.addEventListener("click",()=>{

    if(window.innerWidth > 768) return;

    if(interfazVisible){

        ocultarUI();

    }else{

        mostrarUI();

    }

});

// Zoom con rueda
lightboxImg.addEventListener("wheel",(e)=>{
    e.preventDefault();

    escala += (e.deltaY < 0 ? 0.15 : -0.15);

    if(escala < 1) escala = 1;
    if(escala > 4) escala = 4;

    lightboxImg.style.transform = `scale(${escala})`;
});

function mostrarUI(){

    interfazVisible = true;

    if(topBar) topBar.style.opacity = "1";
    if(acciones) acciones.style.opacity = "1";
    miniaturas.style.opacity = "1";

}

function ocultarUI(){

    interfazVisible = false;

    if(topBar) topBar.style.opacity = "0";
    if(acciones) acciones.style.opacity = "0";
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

// Compartir
const btnCompartir = document.getElementById("btnCompartir");

btnCompartir.addEventListener("click", async () => {
    const url = "https://ignaciocarrillo.es/" + imagenes[indiceActual].getAttribute("src");

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Ignacio Carrillo IC",
                text: "Mira esta fotografía de mi galería.",
                url: url
            });
        } else {
            await navigator.clipboard.writeText(url);
            alert("Enlace de la fotografía copiado.");
        }
    } catch (error) {
        console.log(error);
    }
});

// Favoritos
const btnFavorito = document.getElementById("btnFavorito");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

btnFavorito.addEventListener("click",()=>{
    if(favoritos.includes(indiceActual)){
        favoritos = favoritos.filter(i => i !== indiceActual);
    } else {
        favoritos.push(indiceActual);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    abrirImagen(indiceActual);
});





// =========================
// MUSICA AUTOMATICA DEPORTES
// =========================

const music = document.getElementById("music");
const toggleMusic = document.getElementById("toggleMusic");

// Si la página NO tiene música, no hacer nada
if(music && toggleMusic){

    // Detectar si es móvil
    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // En ordenador: sonido automático
    // En móvil: autoplay pero muteado (obligatorio)
    if(esMovil){
        music.muted = true;
        music.play().catch(()=>{});
        toggleMusic.textContent = "🔊 Activar música";
    } else {
        music.muted = false;
        music.play().catch(()=>{});
        toggleMusic.textContent = "🔇 Silenciar música";
    }

    // Botón para activar/silenciar
    toggleMusic.addEventListener("click", ()=>{
        if(music.muted){
            music.muted = false;
            music.play();
            toggleMusic.textContent = "🔇 Silenciar música";
        } else {
            music.muted = true;
            toggleMusic.textContent = "🔊 Activar música";
        }
    });
}
