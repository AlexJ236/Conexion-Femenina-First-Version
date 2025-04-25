// Este script permite alternar entre el modo claro y oscuro, y guardar la preferencia del usuario en localStorage.
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    const DARK_MODE_CLASS = 'dark-mode';
    const THEME_KEY = 'themePreference';

    // Función para guardar la preferencia del tema en localStorage.
    function guardarPreferenciaTema(tema) {
        localStorage.setItem(THEME_KEY, tema);
    }

    // Función para obtener la preferencia del tema de localStorage.
    function obtenerPreferenciaTema() {
        return localStorage.getItem(THEME_KEY);
    }

    // Función para aplicar el tema a la página.
    function aplicarTema(tema) {
        if (tema === 'dark') {
            body.classList.add(DARK_MODE_CLASS);
            themeToggleButton.textContent = '🌙';
            themeToggleButton.setAttribute('aria-label', 'Activar tema claro');
        } else {
            body.classList.remove(DARK_MODE_CLASS);
            themeToggleButton.textContent = '☀️';
            themeToggleButton.setAttribute('aria-label', 'Activar tema oscuro');
        }
    }

    // Al cargar la página, verifica si hay una preferencia de tema guardada.
    const temaGuardado = obtenerPreferenciaTema();
    if (temaGuardado) {
        aplicarTema(temaGuardado);
    } else {
        // Si no hay preferencia guardada, verifica la preferencia del sistema operativo (opcional).
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            aplicarTema('dark');
            guardarPreferenciaTema('dark');
        }
    }

    // Evento al hacer clic en el botón de cambio de tema.
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const esTemaOscuro = body.classList.contains(DARK_MODE_CLASS);
            const nuevoTema = esTemaOscuro ? 'light' : 'dark';

            aplicarTema(nuevoTema);
            guardarPreferenciaTema(nuevoTema);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botonesIdioma = document.querySelectorAll('.language-button');
    const idiomaActual = localStorage.getItem('language') || 'es'; // Obtener idioma guardado o establecer español por defecto.
    const CLASE_ACTIVA = 'active';

    // Establecer el botón de idioma activo al cargar la página.
    botonesIdioma.forEach(boton => {
        if (boton.dataset.lang === idiomaActual) {
            boton.classList.add(CLASE_ACTIVA);
        }
    });

    // Evento al hacer clic en un botón de idioma.
    botonesIdioma.forEach(boton => {
        boton.addEventListener('click', function() {
            const idiomaSeleccionado = this.dataset.lang;

            // Remover la clase activa de todos los botones de idioma.
            botonesIdioma.forEach(btn => btn.classList.remove(CLASE_ACTIVA));
            // Agregar la clase activa al botón de idioma seleccionado.
            this.classList.add(CLASE_ACTIVA);

            // Guardar el idioma seleccionado en localStorage.
            localStorage.setItem('language', idiomaSeleccionado);

            // Aquí deberías añadir la lógica para cambiar el idioma del contenido.
            console.log(`Idioma seleccionado: ${idiomaSeleccionado}`);
            // location.reload(); // Recargar la página para aplicar cambios (si la traducción se hace en el servidor).
        });
    });
});