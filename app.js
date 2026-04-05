const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const submitButton = document.querySelector('#submitButton');
const installButton = document.querySelector('#installButton');
const floatingInstallButton = document.querySelector('#floatingInstallButton');
const revealElements = document.querySelectorAll('.reveal');

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
        setFormStatus('Completá todos los campos obligatorios antes de enviar.', 'error');
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

        await new Promise((resolve) => {
            window.setTimeout(resolve, 1800);
        });

        form.reset();
        submitButton.disabled = false;
        setFormStatus('Tu mensaje fue enviado con éxito. Pronto vas a recibir una respuesta.', 'success');
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