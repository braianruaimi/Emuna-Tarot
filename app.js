// --- MINI ORÁCULO DEMO ---
const miniOraculoCarta = document.getElementById('miniOraculoCarta');
const miniOraculoMensaje = document.getElementById('miniOraculoMensaje');
const mensajesOraculo = [
    'Confía en el proceso. Lo que hoy parece confuso, mañana será claridad.',
    'La energía disponible te invita a soltar el control y abrirte a lo inesperado.',
    'Hoy es un buen día para sembrar una intención y dejar que el universo la nutra.',
    'Escucha tu intuición: la respuesta que buscas ya está dentro tuyo.',
    'El cambio que temes es la puerta a tu evolución.',
    'Permítete recibir. Hay ayuda y guía disponibles para vos.',
    'La calma es tu mejor aliada. Respira y observa antes de actuar.',
    'Hoy, la sincronicidad te mostrará el camino. Estate atenta a las señales.',
    'Tu energía está lista para manifestar algo nuevo. Da el primer paso.',
    'Recuerda: lo que das, vuelve multiplicado. Siembra luz.'
];
if (miniOraculoCarta && miniOraculoMensaje) {
    let revelada = false;
    function revelarCarta() {
        if (revelada) return;
        revelada = true;
        const idx = Math.floor(Math.random() * mensajesOraculo.length);
        miniOraculoMensaje.textContent = mensajesOraculo[idx];
        miniOraculoCarta.classList.add('revelada');
    }
    miniOraculoCarta.addEventListener('click', revelarCarta);
    miniOraculoCarta.addEventListener('keypress', e => {
        if (e.key === 'Enter' || e.key === ' ') revelarCarta();
    });
}
document.body.classList.add('js-ready');

const WHATSAPP_NUMBER = '2215566392';
const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const submitButton = document.querySelector('#submitButton');
const installButton = document.querySelector('#installButton');
const floatingInstallButton = document.querySelector('#floatingInstallButton');
const revealElements = document.querySelectorAll('.reveal');
const bookingModal = document.querySelector('#bookingModal');
const bookingModalClose = document.querySelector('#bookingModalClose');
const bookingServiceSummary = document.querySelector('#bookingServiceSummary');
const openBookingButtons = document.querySelectorAll('.open-booking-btn');
const servicesTrack = document.querySelector('#servicesTrack');
const carouselArrows = document.querySelectorAll('[data-carousel-arrow]');

// --- Lógica de RESERVAR y WhatsApp ---
const reservarBtns = document.querySelectorAll('.reservar-btn');
const servicioInputId = 'servicioSeleccionado';

// Agregar campo oculto para el servicio seleccionado si no existe
let servicioInput = document.getElementById(servicioInputId);

const openBookingModal = (serviceName = '') => {
    if (!bookingModal) {
        return;
    }

    if (servicioInput) {
        servicioInput.value = serviceName;
    }

    if (bookingServiceSummary) {
        bookingServiceSummary.textContent = serviceName
            ? `Vas a reservar: ${serviceName}. Completa el formulario y te llevo directo al WhatsApp.`
            : 'Completa el formulario y te llevo directo al WhatsApp para cerrar tu reserva.';
    }

    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
        const nombre = document.getElementById('nombre');
        if (nombre) {
            nombre.focus();
        }
    }, 50);
};

const closeBookingModal = () => {
    if (!bookingModal) {
        return;
    }

    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    window.setTimeout(() => {
        bookingModal.classList.add('hidden');
    }, 220);
};

reservarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        let selectedService = '';

        if (card && card.dataset.service) {
            selectedService = card.dataset.service;
        }

        openBookingModal(selectedService);
    });
});

openBookingButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (button.tagName === 'A') {
            event.preventDefault();
        }

        openBookingModal(servicioInput?.value || '');
    });
});

const updateCarouselArrows = () => {
    if (!servicesTrack || !carouselArrows.length) {
        return;
    }

    const maxScrollLeft = servicesTrack.scrollWidth - servicesTrack.clientWidth;

    carouselArrows.forEach((arrow) => {
        const direction = arrow.dataset.carouselArrow;

        if (direction === 'prev') {
            arrow.disabled = servicesTrack.scrollLeft <= 8;
        }

        if (direction === 'next') {
            arrow.disabled = servicesTrack.scrollLeft >= maxScrollLeft - 8;
        }
    });
};

if (servicesTrack && carouselArrows.length) {
    carouselArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.dataset.carouselArrow === 'next' ? 1 : -1;
            const travel = Math.max(servicesTrack.clientWidth * 0.78, 260);

            servicesTrack.scrollBy({
                left: travel * direction,
                behavior: 'smooth'
            });
        });
    });

    servicesTrack.addEventListener('scroll', updateCarouselArrows, { passive: true });
    window.addEventListener('resize', updateCarouselArrows);
    updateCarouselArrows();
}

if (bookingModalClose) {
    bookingModalClose.addEventListener('click', closeBookingModal);
}

if (bookingModal) {
    bookingModal.addEventListener('click', (event) => {
        if (event.target === bookingModal || event.target.dataset.closeBooking === 'true') {
            closeBookingModal();
        }
    });
}

let deferredInstallPrompt = null;

const installControls = [installButton, floatingInstallButton].filter(Boolean);

const setFormStatus = (message, tone = '') => {
    if (!formStatus) {
        return;
    }

    formStatus.textContent = message;
    formStatus.className = `form-status ${tone}`.trim();
};

const validateForm = () => {
    if (!form) {
        return false;
    }

    const fields = Array.from(form.querySelectorAll('input, select'));
    const firstInvalidField = fields.find((field) => !field.checkValidity());

    if (firstInvalidField) {
        firstInvalidField.reportValidity();
        firstInvalidField.focus();
        setFormStatus('Completá los campos obligatorios para que pueda indicarte la mejor sesión para tu momento actual.', 'error');
        return false;
    }

    return true;
};

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitButton.disabled = true;
        setFormStatus('Enviando...', '');

        const nombre = form.nombre.value;
        const apellido = form.apellido.value;
        const fecha = form.fechaNacimiento.value;
        const edad = form.edad.value;
        const signo = form.signo.value;
        const email = form.email.value;
        const telefono = form.telefono.value;
        const asunto = form.asunto.value;
        const servicio = servicioInput?.value || '';
        const mensaje =
            `Hola Bren!%0AQuiero reservar el servicio: *${servicio}*%0A` +
            `Nombre: ${nombre} ${apellido}%0A` +
            `Fecha de nacimiento: ${fecha} (${edad} años)%0A` +
            `Signo: ${signo}%0A` +
            `Email: ${email}%0A` +
            `Teléfono: ${telefono}%0A` +
            `Motivo: ${asunto}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

        window.setTimeout(() => {
            window.open(waUrl, '_blank');
            form.reset();
            if (servicioInput) {
                servicioInput.value = '';
            }
            submitButton.disabled = false;
            setFormStatus('¡Mensaje enviado por WhatsApp!', 'success');
            closeBookingModal();
        }, 1200);
    });
}

const revealOnScroll = () => {
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach((element) => observer.observe(element));
};

const toggleInstallButtons = (shouldShow) => {
    installControls.forEach((button) => {
        button.classList.toggle('hidden', !shouldShow);
    });
};

const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;

    if (!isStandalone) {
        toggleInstallButtons(true);
    }
});

installControls.forEach((button) => {
    button.addEventListener('click', async () => {
        if (!deferredInstallPrompt) {
            setFormStatus('La instalación se habilita cuando el navegador detecta que la app está lista para instalar.', '');
            return;
        }

        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;

        if (outcome === 'accepted') {
            toggleInstallButtons(false);
        }

        deferredInstallPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    toggleInstallButtons(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeBookingModal();
    }
});

// --- Scroll custom para anclas del menú ---
document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register('sw.js');
        } catch (error) {
            console.error('No se pudo registrar el service worker.', error);
        }
    });
}

revealOnScroll();

if (isStandalone) {
    toggleInstallButtons(false);
}