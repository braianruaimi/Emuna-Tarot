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