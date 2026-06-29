function openFolder(folder){

    if(folder === "deportes"){
        window.location.href = "FOTOSVIDEOS/deportes/";
    }

    if(folder === "fauna"){
        window.location.href = "FOTOSVIDEOS/fauna/";
    }

    if(folder === "paisajes"){
        window.location.href = "FOTOSVIDEOS/paisajes/";
    }

}




const imagenes = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const btnCerrar = document.querySelector(".close");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

const contador = document.getElementById("contador");
const miniaturas = document.getElementById("miniaturas");

let indiceActual = 0;

// Crear miniaturas
imagenes.forEach((img, index) => {
    const mini = document.createElement("img");
    mini.src = img.src;
    mini.addEventListener("click", () => {
        abrirImagen(index);
    });

    miniaturas.appendChild(mini);

});

// Abrir imagen
function abrirImagen(index){
    indiceActual = index;
    lightbox.style.display = "flex";
    lightboxImg.src = imagenes[index].src;
    contador.innerHTML = (index + 1) + " / " + imagenes.length;
    actualizarMiniaturas();
lightboxImg.classList.remove("animar");
void lightboxImg.offsetWidth;
lightboxImg.classList.add("animar");
    
}

// Resaltar miniatura activa
function actualizarMiniaturas(){
    const minis = miniaturas.querySelectorAll("img");
    minis.forEach((mini, i)=>{
        mini.style.opacity = i === indiceActual ? "1" : ".45";
        mini.style.transform =
            i === indiceActual
            ? "scale(1.08)"
            : "scale(1)";

    });

}

// Abrir al pulsar una foto
imagenes.forEach((img,index)=>{
    img.addEventListener("click",()=>{
        abrirImagen(index);

    });

});

// Flecha derecha
btnNext.addEventListener("click",()=>{
    indiceActual++;
    if(indiceActual>=imagenes.length){
        indiceActual=0;

    }

    abrirImagen(indiceActual);

});

// Flecha izquierda
btnPrev.addEventListener("click",()=>{
    indiceActual--;
    if(indiceActual<0){
        indiceActual=imagenes.length-1;

    }

    abrirImagen(indiceActual);

});

// Cerrar
btnCerrar.addEventListener("click",()=>{
    lightbox.style.display="none";

});

// Click fuera de la foto
lightbox.addEventListener("click",(e)=>{
    if(e.target===lightbox){
        lightbox.style.display="none";

    }

});

// Teclado
document.addEventListener("keydown",(e)=>{
    if(lightbox.style.display!=="flex") return;
    if(e.key==="ArrowRight"){
        btnNext.click();

    }

    if(e.key==="ArrowLeft"){
        btnPrev.click();

    }

    if(e.key==="Escape"){
        lightbox.style.display="none";

    }

});






let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", e => {

    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 60) {
        btnNext.click();
    }

    if (touchEndX > touchStartX + 60) {
        btnPrev.click();
    }

});



let zoom = false;

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



let escala = 1;

lightboxImg.addEventListener("wheel",(e)=>{

    e.preventDefault();

    if(e.deltaY<0){

        escala+=0.15;

    }else{

        escala-=0.15;

    }

    if(escala<1) escala=1;
    if(escala>4) escala=4;

    lightboxImg.style.transform=`scale(${escala})`;

});




escala = 1;
lightboxImg.style.transform="scale(1)";
