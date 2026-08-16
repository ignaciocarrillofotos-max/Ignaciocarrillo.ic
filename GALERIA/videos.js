
// =========================
// LISTA DE VÍDEOS
// =========================

const galeriaVideos = [

    "../FOTOSVIDEOS/videos/videoboda.mp4",
    "../FOTOSVIDEOS/videos/yonadando.mp4",
    "../FOTOSVIDEOS/videos/video_web1.mp4",
    "../FOTOSVIDEOS/videos/ó.mp4",
    "../FOTOSVIDEOS/videos/Fiesta40_Finca_Palomar_Mio.mp4",
    "../FOTOSVIDEOS/videos/Volkswagen_Golf_V_Año2004.mp4",
    "../FOTOSVIDEOS/videos/futbol_profesoresVSalumnos.mp4",
    "../FOTOSVIDEOS/videos/Sanse.mp4",
    "../FOTOSVIDEOS/videos/monte_nico.mp4"

];







// =========================
// CREAR GALERÍA AUTOMÁTICAMENTE
// =========================

const gallery = document.querySelector(".gallery");
if (gallery) {
    gallery.innerHTML = "";
    galeriaVideos.forEach((src, index) => {
        const photo = document.createElement("div");
        photo.classList.add("photo");

const video = document.createElement("video");
video.classList.add("thumb-video");
video.muted = true;
video.playsInline = true;
video.loop = true;
video.preload = "metadata";
video.src = src;
        video.dataset.index = index;
photo.appendChild(video);

// FIRMA SOBRE MINIATURA
const firma = document.createElement("img");
firma.src = "../FOTOSVIDEOS/logos/mi_Firma_blanco_letras.png";
firma.classList.add("gallery-watermark");
firma.alt = "";
photo.appendChild(firma);

gallery.appendChild(photo);
    });

}




// =========================
// SELECCIÓN DE ELEMENTOS
// =========================

const videos = document.querySelectorAll(".gallery video");
const lightbox = document.getElementById("lightbox-video");
const player = document.getElementById("lightbox-player");
const btnCerrar = document.querySelector("#lightbox-video .close");
const btnPrev = document.querySelector("#lightbox-video .prev");
const btnNext = document.querySelector("#lightbox-video .next");
const contador = document.getElementById("contador");
const miniaturas = document.getElementById("miniaturas-video");


let indiceActual = 0;
let interfazVisible = true;
let temporizadorUI;




// =========================
// CREAR MINIATURAS
// =========================

videos.forEach((vid, index) => {
    const mini = document.createElement("video");
    mini.src = galeriaVideos[index];
    mini.muted = true;
    mini.playsInline = true;
    mini.autoplay = true;
    mini.loop = true;
    mini.preload = "metadata";

    mini.addEventListener("loadedmetadata", () => {
        if (mini.duration > 10) {
            mini.currentTime = 10;

        }

    });

    mini.addEventListener("timeupdate", () => {
        if (mini.currentTime > 15) {
            mini.currentTime = 10;

        }

    });


    mini.addEventListener("click", () => abrirVideo(index));

    miniaturas.appendChild(mini);

});




// =========================
// ABRIR VÍDEO
// =========================

function abrirVideo(index) {
    document.body.style.overflow = "hidden";
    indiceActual = index;

    lightbox.style.display = "flex";

    player.src = galeriaVideos[index];

    player.load();

    player.play().catch(() => {});

    contador.innerHTML =
        (index + 1) + " / " + videos.length;

    actualizarMiniaturas();

    reiniciarTemporizador();

}




// =========================
// ACTUALIZAR MINIATURAS
// =========================

function actualizarMiniaturas(){
    const minis = miniaturas.querySelectorAll("video");
    minis.forEach((mini, i)=>{
        if(i === indiceActual){
            mini.style.opacity = "1";
            mini.style.transform = "scale(1.08)";
            mini.classList.add("active");

        }else{
            mini.style.opacity = ".45";
            mini.style.transform = "scale(1)";
            mini.classList.remove("active");

        }

    });

}




// =========================
// ABRIR DESDE LA GALERÍA
// =========================

videos.forEach((vid, index) => {
    vid.addEventListener("click", () => {
        abrirVideo(index);
    });

});




// =========================
// FLECHA DERECHA
// =========================

btnNext.addEventListener("click", () => {
    indiceActual =
        (indiceActual + 1) % videos.length;

    abrirVideo(indiceActual);

});




// =========================
// FLECHA IZQUIERDA
// =========================

btnPrev.addEventListener("click", () => {
    indiceActual =
        (indiceActual - 1 + videos.length)
        % videos.length;

    abrirVideo(indiceActual);

});




// =========================
// CERRAR
// =========================

function cerrarVideo() {
    lightbox.style.display = "none";

    document.body.style.overflow = "auto";

    player.pause();

    player.removeAttribute("src");

    player.load();

}

btnCerrar.addEventListener("click", cerrarVideo);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        cerrarVideo();

    }

});




// =========================
// TECLADO
// =========================

document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") {
        return;

    }

    if (e.key === "ArrowRight") {
        btnNext.click();

    }

    if (e.key === "ArrowLeft") {
        btnPrev.click();
    }

    if (e.key === "Escape") {
        cerrarVideo();

    }

});




// =========================
// SWIPE
// =========================

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", e => {
    touchStartX =
        e.changedTouches[0].screenX;

});




lightbox.addEventListener("touchend", e => {
    touchEndX =
        e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 60) {
        btnNext.click();

    }

    if (touchEndX > touchStartX + 60) {
        btnPrev.click();

    }

});




// =========================
// INTERFAZ EN MÓVIL
// =========================

player.addEventListener("click", () => {
    if (window.innerWidth > 768) {
        return;
    }

    if (interfazVisible) {
        ocultarUI();
    } else {
        mostrarUI();
    }

});




function mostrarUI() {
    interfazVisible = true;

    const topBar =
        document.querySelector(".lightbox-top");

    if (topBar) {
        topBar.style.opacity = "1";
    }

    miniaturas.style.opacity = "1";
}


function ocultarUI() {
    interfazVisible = false;

    const topBar =
        document.querySelector(".lightbox-top");

    if (topBar) {
        topBar.style.opacity = "0";
    }

    miniaturas.style.opacity = "0";
}


function reiniciarTemporizador() {
    if (window.innerWidth > 768) {
        return;
    }

    clearTimeout(temporizadorUI);

    mostrarUI();

    temporizadorUI = setTimeout(() => {
        ocultarUI();
    }, 2500);

}
