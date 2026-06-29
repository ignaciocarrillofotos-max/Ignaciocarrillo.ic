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





const imagenes = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const close = document.querySelector(".close");

const miniaturas = document.getElementById("miniaturas");
const contador = document.getElementById("contador");

let indice = 0;

// Crear miniaturas
imagenes.forEach((img,i)=>{
    const mini = document.createElement("img");
    mini.src = img.src;
    mini.addEventListener("click",()=>{
        indice = i;
        mostrarImagen();

    });

    miniaturas.appendChild(mini);

});

function mostrarImagen(){
    lightbox.style.display="flex";
    lightboxImg.src = imagenes[indice].src;
    contador.textContent = (indice+1)+" / "+imagenes.length;
    document.querySelectorAll("#miniaturas img").forEach((img,i)=>{
        img.classList.toggle("active",i===indice);

    });

}

imagenes.forEach((img,i)=>{
    img.addEventListener("click",()=>{
        indice=i;
        mostrarImagen();

    });

});

next.addEventListener("click",()=>{
    indice++;
    if(indice>=imagenes.length){
        indice=0;

    }

    mostrarImagen();

});

prev.addEventListener("click",()=>{
    indice--;
    if(indice<0){
        indice=imagenes.length-1;

    }

    mostrarImagen();

});

close.addEventListener("click",()=>{
    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{
    if(e.target===lightbox){
        lightbox.style.display="none";

    }

});

document.addEventListener("keydown",(e)=>{
    if(lightbox.style.display==="flex"){
        if(e.key==="ArrowRight"){
            next.click();

        }

        if(e.key==="ArrowLeft"){
            prev.click();

        }

        if(e.key==="Escape"){
          close.click();

        }

    }

});
