function toggleMenu(){
    let menu = document.getElementById("menu");
    menu.classList.toggle("show");
}
    


function openImg(src){

    let lightbox = document.getElementById("lightbox");
    let img = document.getElementById("lightbox-img");

    img.src = src;
    lightbox.style.display = "flex";

}

function closeImg(){

    document.getElementById("lightbox").style.display = "none";

}

function toggleExpand(btn){

    const menu = btn.parentElement.querySelector(".contenido-expandido");

    const abierto = menu.style.display === "flex";

    document.querySelectorAll(".contenido-expandido").forEach(m=>{
        m.style.display = "none";
    });

    if(!abierto){
        menu.style.display = "flex";
    }

}

document.addEventListener("click", function(e){

    if(!e.target.closest(".boton-expandible")){

        document.querySelectorAll(".contenido-expandido").forEach(m=>{
            m.style.display = "none";
        });

    }

});



const elements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const height = window.innerHeight;

        if(top < height - 100){
            el.classList.add("active");
        }
    });
});
