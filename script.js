function toggleMenu(){
    document.getElementById("menu").classList.toggle("show");
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

    const isOpen = menu.classList.contains("show");

    // cerrar todos
    document.querySelectorAll(".contenido-expandido").forEach(m => {
        m.classList.remove("show");
    });

    // abrir si no estaba abierto
    if(!isOpen){
        menu.classList.add("show");
    }
}



document.addEventListener("click", function(e){
    if(!e.target.closest(".boton-expandible")){
        document.querySelectorAll(".contenido-expandido").forEach(m=>{
            m.classList.remove("show");
        });

    }

});



document.querySelectorAll(".services").forEach((slider,index)=>{
    slider.innerHTML += slider.innerHTML;
    let velocidad = index===0 ? 1.2 : -1.2;
    if(index===1){
        slider.scrollLeft = slider.scrollWidth/2;
    }

    function mover(){
        slider.scrollLeft += velocidad;
        if(velocidad>0){
            if(slider.scrollLeft >= slider.scrollWidth/2){
                slider.scrollLeft = 0;
            }

        }else{
            if(slider.scrollLeft<=0){
                slider.scrollLeft = slider.scrollWidth/2;
            }

        }

    }

    let auto = setInterval(mover,20);
    slider.addEventListener("mouseenter",()=>clearInterval(auto));
    slider.addEventListener("mouseleave",()=>{
        auto = setInterval(mover,20);
    });

    slider.addEventListener("touchstart",()=>clearInterval(auto));
    slider.addEventListener("touchend",()=>{

        setTimeout(()=>{
            auto = setInterval(mover,20);
        },1500);

    });

});




const clientes = document.querySelector(".clientes-slider");
clientes.innerHTML += clientes.innerHTML;
let direccion = 1;
let velocidad = 1;

function moverClientes(){
    clientes.scrollLeft += velocidad * direccion;
    const max = clientes.scrollWidth/2;
    if(clientes.scrollLeft >= max){
        direccion = -1;

    }

    if(clientes.scrollLeft <= 0){
        direccion = 1;

    }

}

let autoClientes = setInterval(moverClientes,20);
clientes.addEventListener("mouseenter",()=>{
    clearInterval(autoClientes);

});

clientes.addEventListener("mouseleave",()=>{
    autoClientes = setInterval(moverClientes,20);

});

clientes.addEventListener("touchstart",()=>{
    clearInterval(autoClientes);

});

clientes.addEventListener("touchend",()=>{
    setTimeout(()=>{
        autoClientes = setInterval(moverClientes,20);
    },1500);

});



const packs = document.querySelector(".packs-slider");
let dir = 1;
let vel = 0.06;

function moverPacks(){
    packs.scrollLeft += vel * dir;

    const max = packs.scrollWidth - packs.clientWidth;

    if(packs.scrollLeft >= max){
        dir = -1;
    }

    if(packs.scrollLeft <= 0){
        dir = 1;
    }
}

let autoPacks = setInterval(moverPacks, 20);

packs.addEventListener("mouseenter", ()=> clearInterval(autoPacks));
packs.addEventListener("mouseleave", ()=> autoPacks = setInterval(moverPacks, 20));

packs.addEventListener("touchstart", ()=> clearInterval(autoPacks));
packs.addEventListener("touchend", ()=>{
    setTimeout(()=> autoPacks = setInterval(moverPacks, 20), 1500);
});




const cards = document.querySelectorAll(".price-card");

cards.forEach(card => {
    card.addEventListener("click", (e) => {

        // Si el click viene del botón consultar → no expandir pack
        if(e.target.closest(".boton-expandible")) return;

        cards.forEach(c => c.classList.remove("active-pack"));
        card.classList.add("active-pack");
    });
});


