document.addEventListener('click', function (event) {
    const navbar = document.getElementById('navbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    const isClickInsideNavbar = navbar.contains(event.target);
    const isClickOnToggler = toggler.contains(event.target);

    if (navbar.classList.contains('show') && !isClickInsideNavbar && !isClickOnToggler) {
        const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
        bsCollapse.hide();
    }
});

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const navbar = document.getElementById('navbarNav');
        if (navbar.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
            bsCollapse.hide();
        }
    });
});

// CARGAR LOTES DINÁMICAMENTE
async function cargarLotes() {
    const lotesFiles = [
        'lotes.html'

        // Agregar aquí nuevos archivos de lotes
    ];

    const container = document.getElementById('lotesContainer');

    for (const file of lotesFiles) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const html = await response.text();
                container.innerHTML += html;
            }
        } catch (error) {
            console.log('Error cargando ' + file);
        }
    }

    // Inicializar carruseles después de cargar
    setTimeout(() => {
        document.querySelectorAll('.carousel').forEach(carousel => {
            new bootstrap.Carousel(carousel);
        });
    }, 100);
}

// Vista previa de imágenes
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('img-lote') || e.target.classList.contains('img-galeria')) {
        const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
        document.getElementById('imagenAmpliada').src = e.target.src;
        modal.show();
    }
});

// Cargar lotes al iniciar
window.addEventListener('DOMContentLoaded', cargarLotes);