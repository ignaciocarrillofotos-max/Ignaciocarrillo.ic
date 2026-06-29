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

imagenes.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});
