// =========================
// MENU MOBILE
// =========================
const menuToggle = document.querySelector('.menu-toggle');
const navlinks = document.querySelector('.navlinks');

if (menuToggle && navlinks) {
    menuToggle.addEventListener('click', () => {
        navlinks.classList.toggle('show');
    });

    navlinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navlinks.classList.remove('show'));
    });
}

// =========================
// GALERIA PREVIEW INDEX
// =========================
const galeriaPreview = document.querySelector('.galeria-preview');
const galeriaTrack = document.querySelector('.galeria-track');
const galeriaIndicadores = document.querySelector('.galeria-indicadores');

if (galeriaPreview && galeriaTrack && galeriaIndicadores) {
    const fotos = Array.from(galeriaTrack.querySelectorAll('.galeria-item'));

    if (fotos.length > 0) {
        const fotosPorPagina = 9;
        const paginas = [];

        for (let i = 0; i < fotos.length; i += fotosPorPagina) {
            paginas.push(fotos.slice(i, i + fotosPorPagina));
        }

        galeriaTrack.innerHTML = '';

        paginas.forEach((grupo) => {
            const pagina = document.createElement('div');
            pagina.className = 'galeria-page';
            grupo.forEach((foto) => pagina.appendChild(foto));
            galeriaTrack.appendChild(pagina);
        });

        galeriaIndicadores.innerHTML = '';
        const puntos = [];

        paginas.forEach((_, index) => {
            const punto = document.createElement('button');
            punto.type = 'button';
            punto.className = index === 0 ? 'galeria-punto activo' : 'galeria-punto';
            punto.setAttribute('aria-label', `Mostrar grupo ${index + 1}`);

            punto.addEventListener('click', () => {
                const ancho = galeriaPreview.clientWidth;
                if (ancho > 0) {
                    galeriaPreview.scrollTo({ left: index * ancho, behavior: 'smooth' });
                }
            });

            galeriaIndicadores.appendChild(punto);
            puntos.push(punto);
        });

        function actualizarIndicador() {
            const ancho = galeriaPreview.clientWidth;
            if (!ancho) return;
            const pagina = Math.round(galeriaPreview.scrollLeft / ancho);
            puntos.forEach((punto, index) => {
                punto.classList.toggle('activo', index === pagina);
            });
        }

        galeriaPreview.addEventListener('scroll', actualizarIndicador, { passive: true });

        let arrastrando = false;
        let inicioX = 0;
        let scrollInicial = 0;

        galeriaPreview.addEventListener('mousedown', (e) => {
            arrastrando = true;
            galeriaPreview.classList.add('arrastrando');
            inicioX = e.pageX;
            scrollInicial = galeriaPreview.scrollLeft;
        });

        galeriaPreview.addEventListener('mousemove', (e) => {
            if (!arrastrando) return;
            const desplazamiento = e.pageX - inicioX;
            galeriaPreview.scrollLeft = scrollInicial - desplazamiento;
        });

        function terminarArrastre() {
            if (!arrastrando) return;
            arrastrando = false;
            galeriaPreview.classList.remove('arrastrando');
            const ancho = galeriaPreview.clientWidth;
            if (!ancho) return;
            const pagina = Math.round(galeriaPreview.scrollLeft / ancho);
            galeriaPreview.scrollTo({ left: pagina * ancho, behavior: 'smooth' });
        }

        galeriaPreview.addEventListener('mouseup', terminarArrastre);
        galeriaPreview.addEventListener('mouseleave', terminarArrastre);

        let touchStartX = 0;
        galeriaPreview.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length) {
                touchStartX = e.touches[0].clientX;
            }
        }, { passive: true });

        galeriaPreview.addEventListener('touchend', (e) => {
            if (!e.changedTouches || !e.changedTouches.length) return;
            const touchEndX = e.changedTouches[0].clientX;
            const diferencia = touchEndX - touchStartX;
            if (Math.abs(diferencia) > 60) {
                const ancho = galeriaPreview.clientWidth;
                if (!ancho) return;
                let pagina = Math.round(galeriaPreview.scrollLeft / ancho);
                pagina = diferencia > 0 ? pagina - 1 : pagina + 1;
                pagina = Math.max(0, Math.min(pagina, paginas.length - 1));
                galeriaPreview.scrollTo({ left: pagina * ancho, behavior: 'smooth' });
            }
        }, { passive: true });
    }
}

// =========================
// SLIDERS HORIZONTAL
// =========================
document.querySelectorAll('.services').forEach(slider => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
});

const clientes = document.querySelector('.clientes-slider');
if (clientes) {
    clientes.innerHTML += clientes.innerHTML;

    let direccion = 1;
    let autoClientes = setInterval(() => {
        clientes.scrollLeft += 0.8 * direccion;
        const max = clientes.scrollWidth / 2;
        if (clientes.scrollLeft >= max) direccion = -1;
        if (clientes.scrollLeft <= 0) direccion = 1;
    }, 25);

    clientes.addEventListener('mouseenter', () => clearInterval(autoClientes));
    clientes.addEventListener('mouseleave', () => {
        autoClientes = setInterval(() => {
            clientes.scrollLeft += 0.8 * direccion;
            const max = clientes.scrollWidth / 2;
            if (clientes.scrollLeft >= max) direccion = -1;
            if (clientes.scrollLeft <= 0) direccion = 1;
        }, 25);
    });
}

// =========================
// PACKS
// =========================
const cards = document.querySelectorAll('.price-card');
const details = document.querySelectorAll('.pack-detail');

if (cards.length) {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const packName = card.dataset.pack;
            const estabaActivo = card.classList.contains('active-pack');

            cards.forEach(c => c.classList.remove('active-pack'));
            details.forEach(detail => detail.classList.remove('active-detail'));

            if (estabaActivo) return;

            card.classList.add('active-pack');

            const detail = document.querySelector(`.pack-detail[data-detail="${packName}"]`);
            if (!detail) return;

            if (window.innerWidth >= 900) {
                card.appendChild(detail);
            }

            detail.classList.add('active-detail');
        });
    });
}

// =========================
// FUNCIONES EXTRA SEGURAS
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
