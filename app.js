document.body.classList.add('js-ready');

const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const submitButton = document.querySelector('#submitButton');
const installButton = document.querySelector('#installButton');
const floatingInstallButton = document.querySelector('#floatingInstallButton');
const revealElements = document.querySelectorAll('.reveal');

// --- Lógica de RESERVAR y WhatsApp ---
const reservarBtns = document.querySelectorAll('.reservar-btn');
const contactoSection = document.getElementById('contacto');
const servicioInputId = 'servicioSeleccionado';

// Agregar campo oculto para el servicio seleccionado si no existe
let servicioInput = document.getElementById(servicioInputId);
if (!servicioInput && form) {
    servicioInput = document.createElement('input');
    servicioInput.type = 'hidden';
    servicioInput.id = servicioInputId;
    servicioInput.name = 'servicio';
    form.appendChild(servicioInput);
}

reservarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.service-card');
        if (card && card.dataset.service) {
            servicioInput.value = card.dataset.service;
        }
        if (contactoSection) {
            contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Enfocar el campo nombre para UX
        setTimeout(() => {
            const nombre = document.getElementById('nombre');
            if (nombre) nombre.focus();
        }, 600);
    });
});

// --- Tarot Service Modal ---
const serviceCards = document.querySelectorAll('.tarot-card');
const serviceModal = document.getElementById('service-modal');
const serviceModalContent = serviceModal?.querySelector('.service-modal-content');
const serviceModalCard = serviceModal?.querySelector('.service-modal-card');
const serviceModalClose = serviceModal?.querySelector('.service-modal-close');

const serviceData = [
    {
        title: 'Lectura Evolutiva',
        desc: 'Ideal si necesitás respuestas, claridad y dirección. Vas a poder comprender patrones, validar lo que intuís y salir con una lectura que te ayude a decidir con más seguridad.'
    },
    {
        title: 'Limpieza Energética',
        desc: 'Un ritual profundo para liberar cargas densas, cortar bloqueos y recuperar calma mental, emocional y energética cuando sentís peso, agotamiento o desorden interno.'
    },
    {
        title: 'Alineación de Portales',
        desc: 'Un trabajo enfocado en fechas y momentos de alta potencia vibracional para ayudarte a ordenar intención, sostener manifestación y atravesar cambios con conciencia.'
    }
];

function openServiceModal(idx, cardEl) {
    if (!serviceModal || !serviceModalCard) return;
    // Animación de vuelo
    const rect = cardEl.getBoundingClientRect();
    const flyCard = cardEl.cloneNode(true);
    flyCard.classList.add('tarot-fly');
    flyCard.style.position = 'fixed';
    flyCard.style.left = rect.left + 'px';
    flyCard.style.top = rect.top + 'px';
    flyCard.style.width = rect.width + 'px';
    flyCard.style.height = rect.height + 'px';
    flyCard.style.zIndex = 9999;
    document.body.appendChild(flyCard);
    setTimeout(() => {
        flyCard.remove();
        serviceModal.classList.add('active');
        serviceModal.classList.remove('hidden');
        serviceModalCard.innerHTML = `<h3>${serviceData[idx].title}</h3><p>${serviceData[idx].desc}</p>`;
        serviceModalCard.focus();
    }, 600);
}

function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    setTimeout(() => {
        serviceModal.classList.add('hidden');
        serviceModalCard.innerHTML = '';
    }, 350);
}

serviceCards.forEach((card, i) => {
    card.addEventListener('click', () => openServiceModal(i, card));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            openServiceModal(i, card);
        }
    });
});
if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
}
if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal || e.target.classList.contains('service-modal-backdrop')) {
            closeServiceModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (serviceModal.classList.contains('active') && e.key === 'Escape') {
            closeServiceModal();
        }
    });
}
let deferredInstallPrompt = null;

const installControls = [installButton, floatingInstallButton].filter(Boolean);

const setFormStatus = (message, tone = '') => {
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
        const numero = '5492215047962';
        const waUrl = `https://wa.me/${numero}?text=${mensaje}`;

        window.setTimeout(() => {
            window.open(waUrl, '_blank');
            form.reset();
            if (servicioInput) {
                servicioInput.value = '';
            }
            submitButton.disabled = false;
            setFormStatus('¡Mensaje enviado por WhatsApp!', 'success');
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