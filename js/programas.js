document.addEventListener('DOMContentLoaded', () => {
    const programaBloques = document.querySelectorAll('.programa-completo');
    const intervaloCarrusel = 5000;
    const tiempoResetCarrusel = 5000;

    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.getElementById('lightbox-imagen');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    programaBloques.forEach(programa => {
        const imagenPrincipalContainer = programa.querySelector('.programa-imagen-principal');
        const galeriaMiniaturas = programa.querySelector('.programa-galeria-simple');
        const miniaturas = galeriaMiniaturas ? galeriaMiniaturas.querySelectorAll('img') : [];
        const imagenesPrincipales = imagenPrincipalContainer ? imagenPrincipalContainer.querySelectorAll('img') : [];
        let indiceImagenActiva = 0;
        let intervaloAutoDeslizamiento;
        let usuarioInteractuando = false;

        function mostrarImagen(indice) {
            imagenesPrincipales.forEach((img, i) => {
                img.classList.remove('active');
                img.style.transform = `translateX(${i < indice ? '-100%' : (i > indice ? '100%' : '0')})`;
            });
            imagenesPrincipales[indice].classList.add('active');
        }

        function detenerAutoDeslizamiento() {
            clearInterval(intervaloAutoDeslizamiento);
        }

        miniaturas.forEach((miniatura, indice) => {
            miniatura.addEventListener('click', () => {
                indiceImagenActiva = indice;
                mostrarImagen(indiceImagenActiva);
                usuarioInteractuando = true;
                detenerAutoDeslizamiento();
                setTimeout(() => {
                    usuarioInteractuando = false;
                    iniciarAutoDeslizamiento();
                }, tiempoResetCarrusel);
            });
        });

        function siguienteSlide() {
            if (!usuarioInteractuando && miniaturas.length > 1) {
                indiceImagenActiva = (indiceImagenActiva + 1) % miniaturas.length;
                mostrarImagen(indiceImagenActiva);
            }
        }

        function iniciarAutoDeslizamiento() {
            if (miniaturas.length > 1 && !usuarioInteractuando) {
                intervaloAutoDeslizamiento = setInterval(siguienteSlide, intervaloCarrusel);
            }
        }

        if (imagenesPrincipales.length > 0) {
            mostrarImagen(0);
            iniciarAutoDeslizamiento();

            // Evento de clic para mostrar el lightbox
            imagenesPrincipales.forEach(imgPrincipal => {
                imgPrincipal.addEventListener('click', () => {
                    const imagenSrc = imgPrincipal.src;
                    lightboxImagen.src = imagenSrc;
                    lightbox.style.display = 'flex';
                });
            });
        }
    });

    cerrarLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    const hash = window.location.hash.substring(1);
    if (hash) {
        const programaElemento = document.querySelector(`.programa-completo[data-programa="${hash}"]`);
        if (programaElemento) {
            programaElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});