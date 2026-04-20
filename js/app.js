// --- MODAL CARTA ASTRAL ---
const abrirCartaAstralBtn = document.getElementById('abrirCartaAstralBtn');
const modalCartaAstral = document.getElementById('modalCartaAstral');
const cerrarBtnCartaAstral = document.getElementById('cerrarBtnCartaAstral');
const cerrarModalCartaAstral = document.getElementById('cerrarModalCartaAstral');

if (abrirCartaAstralBtn && modalCartaAstral) {
    abrirCartaAstralBtn.addEventListener('click', () => {
        const shouldOpenStandaloneAstral = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

        if (shouldOpenStandaloneAstral) {
            window.location.href = 'cartaastral/index.html';
            return;
        }

        modalCartaAstral.classList.remove('hidden');
        modalCartaAstral.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
}
if (cerrarBtnCartaAstral && modalCartaAstral) {
    cerrarBtnCartaAstral.addEventListener('click', () => {
        modalCartaAstral.classList.add('hidden');
        modalCartaAstral.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
}
if (cerrarModalCartaAstral && modalCartaAstral) {
    cerrarModalCartaAstral.addEventListener('click', () => {
        modalCartaAstral.classList.add('hidden');
        modalCartaAstral.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
}
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
    const revelarCarta = () => {
        if (revelada) return;
        revelada = true;
        const idx = Math.floor(Math.random() * mensajesOraculo.length);
        miniOraculoMensaje.innerHTML = `
            <span class="mini-oraculo-symbol" aria-hidden="true">✦</span>
            <span class="mini-oraculo-back-copy">${mensajesOraculo[idx]}</span>
        `;
        miniOraculoCarta.classList.add('revelada');
    };
    miniOraculoCarta.addEventListener('click', revelarCarta);
    miniOraculoCarta.addEventListener('keypress', e => {
        if (e.key === 'Enter' || e.key === ' ') revelarCarta();
    });
}

// --- REMOCIÓN DEL SKELETON ---
window.addEventListener('load', () => {
    const skeleton = document.getElementById('app-skeleton');
    if (skeleton) {
        skeleton.style.opacity = '0';
        skeleton.style.visibility = 'hidden';
        setTimeout(() => skeleton.remove(), 500);
    }
});

document.body.classList.add('js-ready');

const WHATSAPP_NUMBER = '2215566392';
const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const submitButton = document.querySelector('#submitButton');
const installButton = document.querySelector('#installButton');
// const floatingInstallButton = document.querySelector('#floatingInstallButton');
const updateToast = document.querySelector('#updateToast');
const updateAppButton = document.querySelector('#updateAppButton');
const dismissUpdateToastButton = document.querySelector('#dismissUpdateToast');
const floatingAssistantButton = document.querySelector('#floatingAssistantButton');
const revealElements = document.querySelectorAll('.reveal');
const bookingModal = document.querySelector('#bookingModal');
const bookingModalClose = document.querySelector('#bookingModalClose');
const assistantModal = document.querySelector('#assistantModal');
const assistantModalClose = document.querySelector('#assistantModalClose');
const assistantQuestionButtons = document.querySelectorAll('[data-assistant-question]');
const assistantAnswerKicker = document.querySelector('#assistantAnswerKicker');
const assistantAnswerTitle = document.querySelector('#assistantAnswerTitle');
const assistantAnswerBody = document.querySelector('#assistantAnswerBody');
const assistantWhatsappLink = document.querySelector('#assistantWhatsappLink');
const bookingServiceSummary = document.querySelector('#bookingServiceSummary');
const openBookingButtons = document.querySelectorAll('.open-booking-btn');
const siteHeader = document.querySelector('.site-header');
const servicesTrack = document.querySelector('#servicesTrack');
const carouselArrows = document.querySelectorAll('[data-carousel-arrow]');
const servicesStorySlides = document.querySelectorAll('[data-story-slide]');
const servicesStoryDots = document.querySelectorAll('[data-story-dot]');

const assistantAnswers = {
    elegir: {
        kicker: 'Orientacion intuitiva',
        title: 'Si hoy no sabes que lectura elegir, puede que tu energia no este pidiendo mas ruido, sino un espacio claro para escuchar lo que ya intenta mostrarse.',
        body: 'Cuando lo interno se mezcla, la intuicion se apaga entre dudas, cansancio y sobrepensamiento. Una lectura bien elegida no fuerza respuestas: ordena, revela y te devuelve eje. La Lectura Esencial ayuda a abrir claridad puntual; si sientes un proceso mas profundo, la Lectura de Claridad o la Inmersion Evolutiva pueden acompanarte con mas amplitud.',
        whatsappText: 'Hola Bren, vengo desde la web. Estuve viendo la opcion de IA Bren Asistente porque no se que lectura elegir y me gustaria que me orientes sobre cual de tus lecturas acompana mejor mi momento actual.'
    },
    bloqueo: {
        kicker: 'Movimiento de energia',
        title: 'Sentirte bloqueada no significa que estes fallando; muchas veces significa que vienes sosteniendo sola una carga que ya necesita ser mirada con amor y verdad.',
        body: 'Cuando la energia se estanca, aparecen confusion, cansancio y la sensacion de repetir lo mismo. Una lectura enfocada no invade tu proceso: ilumina el nudo, muestra lo que hoy te drena y te ayuda a recuperar direccion interna para volver a moverte con mas conciencia.',
        whatsappText: 'Hola Bren, vengo desde la web. Toque la opcion de IA Bren Asistente porque siento bloqueo y confusion, y me gustaria saber que lectura me recomendarias para ordenar esta etapa y recuperar claridad.'
    },
    momento: {
        kicker: 'Tiempo del alma',
        title: 'Si vienes preguntandote si este es tu momento, es posible que tu proceso ya este pidiendo ser escuchado con mas presencia.',
        body: 'No hace falta esperar a tocar fondo para buscar claridad. A veces la senal aparece antes, en forma de repeticion, ansiedad, vacio o necesidad de comprender que hacer. Tomar una sesion a tiempo puede ayudarte a ordenar lo que hoy pesa antes de que se vuelva mas denso.',
        whatsappText: 'Hola Bren, vengo desde la web. Estuve en IA Bren Asistente porque quiero saber si este es mi momento para reservar una lectura y me gustaria que me orientes segun lo que estoy viviendo.'
    },
    reserva: {
        kicker: 'Puerta de entrada',
        title: 'Reservar es simple: eliges dar el paso, escribes por WhatsApp y desde ahi Bren te acompana para ordenar el encuentro contigo.',
        body: 'La idea es que no te quedes detenida en la parte tecnica. Si ya sientes el llamado a buscar claridad, escribir es una forma concreta de abrir ese movimiento. Desde ahi se ordena la reserva y llegas a tu lectura con mas foco, disposicion y verdad interna.',
        whatsappText: 'Hola Bren, vengo desde la web. Estuve viendo IA Bren Asistente y quiero saber como es la reserva y que pasa despues para poder coordinar una lectura contigo.'
    }
};

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

const openAssistantModal = () => {
    if (!assistantModal) {
        return;
    }

    assistantModal.classList.remove('hidden');
    assistantModal.classList.add('active');
    assistantModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeAssistantModal = () => {
    if (!assistantModal) {
        return;
    }

    assistantModal.classList.remove('active');
    assistantModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    window.setTimeout(() => {
        assistantModal.classList.add('hidden');
    }, 220);
};

const setAssistantAnswer = (key) => {
    const answer = assistantAnswers[key];
    if (!answer || !assistantAnswerTitle || !assistantAnswerBody || !assistantAnswerKicker) {
        return;
    }

    assistantAnswerKicker.textContent = answer.kicker;
    assistantAnswerTitle.textContent = answer.title;
    assistantAnswerBody.textContent = answer.body;

    if (assistantWhatsappLink) {
        assistantWhatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(answer.whatsappText)}`;
    }

    assistantQuestionButtons.forEach((button) => {
        const isActive = button.dataset.assistantQuestion === key;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
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

if (servicesTrack && carouselArrows.length) {
    carouselArrows.forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.dataset.carouselArrow;
            const maxScrollLeft = servicesTrack.scrollWidth - servicesTrack.clientWidth;
            const travel = Math.max(servicesTrack.clientWidth * 0.78, 260);

            if (direction === 'next') {
                // Si estamos cerca del final, volvemos al principio
                if (servicesTrack.scrollLeft >= maxScrollLeft - 10) {
                    servicesTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    servicesTrack.scrollBy({ left: travel, behavior: 'smooth' });
                }
            } else {
                // Si estamos cerca del inicio, saltamos al final
                if (servicesTrack.scrollLeft <= 10) {
                    servicesTrack.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
                } else {
                    servicesTrack.scrollBy({ left: -travel, behavior: 'smooth' });
                }
            }
        });
    });
}

if (servicesStorySlides.length && servicesStoryDots.length) {
    let activeStoryIndex = 0;
    let storyIntervalId = null;

    const setActiveStory = (index) => {
        activeStoryIndex = (index + servicesStorySlides.length) % servicesStorySlides.length;

        servicesStorySlides.forEach((slide, slideIndex) => {
            slide.classList.toggle('is-active', slideIndex === activeStoryIndex);
        });

        servicesStoryDots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeStoryIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    const startStoryRotation = () => {
        if (storyIntervalId) {
            window.clearInterval(storyIntervalId);
        }

        storyIntervalId = window.setInterval(() => {
            setActiveStory(activeStoryIndex + 1);
        }, 4800);
    };

    servicesStoryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveStory(index);
            startStoryRotation();
        });
    });

    const servicesStoryStage = document.querySelector('#servicesStoryStage');
    if (servicesStoryStage) {
        servicesStoryStage.addEventListener('mouseenter', () => window.clearInterval(storyIntervalId));
        servicesStoryStage.addEventListener('mouseleave', startStoryRotation);
        servicesStoryStage.addEventListener('focusin', () => window.clearInterval(storyIntervalId));
        servicesStoryStage.addEventListener('focusout', startStoryRotation);
    }

    setActiveStory(0);
    startStoryRotation();
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

if (floatingAssistantButton) {
    floatingAssistantButton.addEventListener('click', openAssistantModal);
}

if (assistantModalClose) {
    assistantModalClose.addEventListener('click', closeAssistantModal);
}

if (assistantModal) {
    assistantModal.addEventListener('click', (event) => {
        if (event.target === assistantModal || event.target.dataset.closeAssistant === 'true') {
            closeAssistantModal();
        }
    });
}

assistantQuestionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setAssistantAnswer(button.dataset.assistantQuestion);
    });
});

let deferredInstallPrompt = null;
let waitingServiceWorker = null;
let shouldRefreshForUpdate = false;

const installControls = [installButton].filter(Boolean);

const toggleUpdateToast = (shouldShow) => {
    if (!updateToast) {
        return;
    }

    updateToast.classList.toggle('hidden', !shouldShow);
};

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

        // Feedback visual de carga
        const originalBtnText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner"></span> Conectando...`;
        setFormStatus('Preparando tu conexión con Bren...', 'info');

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
            submitButton.textContent = originalBtnText;
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

const syncHeaderOnScroll = () => {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 18);
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

if (dismissUpdateToastButton) {
    dismissUpdateToastButton.addEventListener('click', () => {
        toggleUpdateToast(false);
    });
}

if (updateAppButton) {
    updateAppButton.addEventListener('click', () => {
        if (!waitingServiceWorker) {
            toggleUpdateToast(false);
            return;
        }

        shouldRefreshForUpdate = true;
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeBookingModal();
        closeAssistantModal();
    }
});

window.addEventListener('scroll', syncHeaderOnScroll, { passive: true });

// --- Scroll custom para anclas del menú ---
document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const scrollAnchor = target.querySelector('[data-scroll-anchor]');
            const scrollTarget = scrollAnchor || target;
            const y = scrollTarget.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
            window.history.replaceState(null, '', `#${targetId}`);
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const showUpdateReady = (serviceWorker) => {
                if (!serviceWorker) {
                    return;
                }

                waitingServiceWorker = serviceWorker;
                toggleUpdateToast(true);
            };

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!shouldRefreshForUpdate) {
                    return;
                }

                shouldRefreshForUpdate = false;
                window.location.reload();
            });

            const registration = await navigator.serviceWorker.register('sw.js', {
                updateViaCache: 'none'
            });

            if (registration.waiting) {
                showUpdateReady(registration.waiting);
            }

            registration.addEventListener('updatefound', () => {
                const installingWorker = registration.installing;

                if (!installingWorker) {
                    return;
                }

                installingWorker.addEventListener('statechange', () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateReady(installingWorker);
                    }
                });
            });

            registration.update();
        } catch (error) {
            console.error('No se pudo registrar el service worker.', error);
        }
    });
}

revealOnScroll();
syncHeaderOnScroll();
setAssistantAnswer('elegir');

if (isStandalone) {
    toggleInstallButtons(false);
}
