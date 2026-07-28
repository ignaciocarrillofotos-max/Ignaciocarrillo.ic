// =========================
// ABRIR CARPETAS (si lo usas)
// =========================
function openFolder(folder){
    if(folder === "deportes") window.location.href = "FOTOSVIDEOS/deportes/";
    if(folder === "fauna") window.location.href = "FOTOSVIDEOS/fauna/";
    if(folder === "paisajes") window.location.href = "FOTOSVIDEOS/paisajes/";
}



// =========================
// CREAR GALERÍA AUTOMÁTICAMENTE (si existe "fotos")
// =========================
function crearGaleria(){
    const gallery = document.querySelector(".gallery");
if(!gallery || typeof galeriaActual === "undefined"){
    return;
}

if(typeof tipoGaleria === "undefined"){
    return;
}

    gallery.innerHTML = "";
if(tipoGaleria !== "fotos"){
    return;
}
    
    galeriaActual.forEach((src,index)=>{
const photo = document.createElement("div");
photo.classList.add("photo");

const img = document.createElement("img");

img.src = src;
img.loading = "lazy";
img.dataset.index = index;


const watermark = document.createElement("img");
watermark.src = "../FOTOSVIDEOS/logos/mi_Firma_blanco_letras.png";
watermark.classList.add("gallery-watermark");

photo.appendChild(img);
photo.appendChild(watermark);
gallery.appendChild(photo);
        
    });

}


const tituloGaleria = document.querySelector(".hero h1");

if(tituloGaleria && typeof nombreGaleria !== "undefined"){
    tituloGaleria.textContent = nombreGaleria;
}


// =========================
// VARIABLES DEL LIGHTBOX
// =========================
let imagenes = [];
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



// =========================
// INICIALIZAR GALERÍA CUANDO YA EXISTEN LAS FOTOS
// =========================
window.addEventListener("DOMContentLoaded", () => {
    iniciarGaleria();
});

function iniciarGaleria() {
    crearGaleria();
imagenes = document.querySelectorAll(".gallery img:not(.gallery-watermark)"
);

    if (imagenes.length === 0) {
        console.warn("No se encontraron imágenes en la galería.");
        return;
    }

    crearMiniaturas();
    activarEventos();
}



// =========================
// MINIATURAS
// =========================
function crearMiniaturas() {
    miniaturas.innerHTML = "";

    imagenes.forEach((img, index) => {
        const mini = document.createElement("img");
        mini.src = img.src;
        mini.addEventListener("click", () => abrirImagen(index));
        miniaturas.appendChild(mini);
    });
}

function actualizarMiniaturas(){
    const minis = miniaturas.querySelectorAll("img");
    minis.forEach((mini, i)=>{
        mini.style.opacity = i === indiceActual ? "1" : ".45";
        mini.style.transform = i === indiceActual ? "scale(1.08)" : "scale(1)";
    });
}



// =========================
// EVENTOS DE LAS IMÁGENES
// =========================
function activarEventos() {
    imagenes.forEach((img, index) => {
        img.addEventListener("click", () => abrirImagen(index));
    });
}



// =========================
// ABRIR IMAGEN
// =========================
function abrirImagen(index){
    document.body.style.overflow = "hidden";
    indiceActual = index;

    lightbox.style.display = "flex";
    lightboxImg.src = imagenes[index].src;

    // Forzar reflow para que el watermark se centre desde el primer frame
lightboxImg.onload = () => {
    const wm = document.querySelector(".lightbox-watermark");
    if (wm) {
        wm.style.transform = "translate(-50%, -50%)";
    }
};


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



// =========================
// FLECHAS
// =========================
if(btnNext){
    btnNext.addEventListener("click",()=>{
        indiceActual = (indiceActual + 1) % imagenes.length;
        abrirImagen(indiceActual);
    });
}

if(btnPrev){
    btnPrev.addEventListener("click",()=>{
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        abrirImagen(indiceActual);
    });
}



// =========================
// CERRAR
// =========================
if(btnCerrar){

    btnCerrar.addEventListener("click",()=>{
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    });

}



// =========================
// TECLADO
// =========================
document.addEventListener("keydown",(e)=>{
    if(lightbox.style.display !== "flex") return;

    if(e.key === "ArrowRight") btnNext.click();
    if(e.key === "ArrowLeft") btnPrev.click();

    if(e.key === "Escape"){
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }
});



// =========================
// SWIPE
// =========================
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



// =========================
// ZOOM
// =========================
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

lightboxImg.addEventListener("wheel",(e)=>{
    e.preventDefault();

    escala += (e.deltaY < 0 ? 0.15 : -0.15);

    if(escala < 1) escala = 1;
    if(escala > 4) escala = 4;

    lightboxImg.style.transform = `scale(${escala})`;
});



// =========================
// UI MÓVIL
// =========================
lightboxImg.addEventListener("click",()=>{

    if(window.innerWidth > 768) return;

    if(interfazVisible){
        ocultarUI();
    }else{
        mostrarUI();
    }

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






// =========================
// MÚSICA
// =========================
const music = document.getElementById("music");
const toggleMusic = document.getElementById("toggleMusic");

if(music && toggleMusic){

    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if(esMovil){
        music.muted = true;
        music.play().catch(()=>{});
        toggleMusic.textContent = "🔊 Activar música";
    } else {
        music.muted = false;
        music.play().catch(()=>{});
        toggleMusic.textContent = "🔇 Silenciar música";
    }

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
