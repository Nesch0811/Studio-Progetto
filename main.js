/**
 * SCRIPT PRINCIPAL - STUDIO PROGETTO
 * 
 * Este script combina todas las funcionalidades del sitio web en un solo archivo optimizado.
 * Incluye: animaciones, precarga, diálogos, menú móvil, modo oscuro, slider, formulario de contacto,
 * y efectos especiales como confeti.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // FUNCIONES DE UTILIDAD
  // =============================================

  /**
   * Anima un elemento con transiciones CSS
   * @param {HTMLElement} element - Elemento a animar
   * @param {Object} animation - Objeto con propiedades a animar (opacity, transform)
   * @param {number} duration - Duración en milisegundos (default: 500)
   * @param {Object} options - Opciones adicionales (delay, easing, callback)
   */
  const animateElement = (element, animation, duration = 500, options = {}) => {
    const { delay = 0, easing = 'ease', callback } = options;
    element.style.transition = `all ${duration}ms ${easing}`;

    const applyAnimation = () => {
      Object.keys(animation).forEach(prop => {
        element.style[prop] = animation[prop];
      });
      if (callback) setTimeout(callback, duration);
    };

    delay ? setTimeout(applyAnimation, delay) : applyAnimation();
  };

  /**
   * Efecto fadeIn para mostrar elementos gradualmente
   * @param {HTMLElement} element - Elemento a mostrar
   * @param {number} duration - Duración en milisegundos (default: 500)
   * @param {number} delay - Retraso en milisegundos (default: 0)
   * @param {Function} callback - Función a ejecutar al completar
   */
  const fadeIn = (element, duration = 500, delay = 0, callback) => {
    element.style.opacity = 0;
    element.style.display = element.style.display || 'block';
    animateElement(element, { opacity: 1 }, duration, { delay, callback });
  };

  /**
   * Efecto fadeOut para ocultar elementos gradualmente
   * @param {HTMLElement} element - Elemento a ocultar
   * @param {number} duration - Duración en milisegundos (default: 500)
   * @param {number} delay - Retraso en milisegundos (default: 0)
   * @param {Function} callback - Función a ejecutar al completar
   */
  const fadeOut = (element, duration = 500, delay = 0, callback) => {
    animateElement(element, { opacity: 0 }, duration, {
      delay, callback: () => {
        element.style.display = 'none';
        if (callback) callback();
      }
    });
  };

  /**
   * Efecto de escala para mostrar elementos
   * @param {HTMLElement} element - Elemento a animar
   * @param {number} duration - Duración en milisegundos (default: 500)
   * @param {number} delay - Retraso en milisegundos (default: 0)
   */
  const scaleIn = (element, duration = 500, delay = 0) => {
    element.style.opacity = 0;
    element.style.transform = 'scale(0.95)';
    animateElement(element, { opacity: 1, transform: 'scale(1)' }, duration, { delay });
  };

  /**
   * Efecto de rotación para mostrar elementos
   * @param {HTMLElement} element - Elemento a animar
   * @param {number} duration - Duración en milisegundos (default: 500)
   * @param {number} delay - Retraso en milisegundos (default: 0)
   */
  const rotateIn = (element, duration = 500, delay = 0) => {
    element.style.opacity = 0;
    element.style.transform = 'rotate(-10deg) scale(0.95)';
    animateElement(element, { opacity: 1, transform: 'rotate(0) scale(1)' }, duration, { delay });
  };

  /**
   * Efecto de pulso para llamar la atención
   * @param {HTMLElement} element - Elemento a animar
   * @param {number} duration - Duración en milisegundos (default: 1000)
   * @param {number} iterations - Número de repeticiones (default: infinito)
   */
  const pulse = (element, duration = 1000, iterations = Infinity) => {
    const keyframes = [
      { transform: 'scale(1)', offset: 0 },
      { transform: 'scale(1.1)', offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ];
    element.animate(keyframes, { duration, iterations, easing: 'ease-in-out' });
  };

  /**
   * Función debounce para optimizar eventos que se disparan muchas veces
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en milisegundos
   */
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  /**
   * Crea elementos de confeti para efectos visuales
   */
  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  };

  /**
   * Muestra una alerta personalizada
   * @param {string} message - Mensaje a mostrar
   */
  const showCustomAlert = (message) => {
    const alertModal = document.createElement('div');
    alertModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    alertModal.innerHTML = `
      <div style="background: white; padding: 30px; border-radius: 10px; max-width: 400px; text-align: center;">
        <h3 style="color:rgb(15, 116, 68); margin-bottom: 15px;">
          <img src="IMG_Extra/logosinfondo.png" alt="Logo" style="height: 30px; vertical-align: middle;">
          Studio & Progetto
        </h3>
        <p style="margin-bottom: 20px;">${message}</p>
        <button class="alert-close-btn" style="
          background:rgb(15, 116, 68);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        ">Aceptar</button>
      </div>
    `;
    document.body.appendChild(alertModal);
    alertModal.querySelector('.alert-close-btn').addEventListener('click', () => document.body.removeChild(alertModal));
    alertModal.addEventListener('click', (e) => {
      if (e.target === alertModal) document.body.removeChild(alertModal);
    });
  };

  // =============================================
  // COMPONENTES PRINCIPALES
  // =============================================

  /**
   * Configuración del preloader inicial - CORREGIDO
   * Ahora la imagen y el texto estarán correctamente alineados
   */
  const setupPreloader = () => {
    const preCarga = document.querySelector('.pre-carga');

    // Añadir estilos dinámicos para la alineación
    const preloaderStyles = document.createElement('style');
    preloaderStyles.textContent = `
      .pre-carga {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--light-color);
        z-index: 9999;
        transition: opacity 0.5s ease;
      }
      .pre-carga img {
        width: 100px;
        height: auto;
        margin-bottom: 20px;
        animation: pulse 1.5s infinite ease-in-out;
      }
      .pre-carga p {
        font-size: 1.2rem;
        color: var(--text-color);
        text-align: center;
        max-width: 80%;
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(preloaderStyles);

    const showContent = () => {
      fadeOut(preCarga, 500, 0, () => {
        const dialogo = document.getElementById('dialogo');
        if (dialogo) {
          dialogo.style.transform = 'translate(-50%, -50%) scale(0.95)';
          dialogo.style.opacity = '0';
          dialogo.showModal();
          fadeIn(dialogo, 500, 0, () => {
            animateElement(dialogo, { transform: 'translate(-50%, -50%) scale(1)' }, 300);
          });
        }
      });
    };

    // Mostrar contenido después de 2 segundos o cuando la página cargue
    const loadTimer = setTimeout(showContent, 2000);
    window.addEventListener('load', () => {
      clearTimeout(loadTimer);
      showContent();
    });
  };

  /**
   * Configuración del diálogo de bienvenida
   */
  const setupDialog = () => {
    const dialogo = document.getElementById('dialogo');
    const cerrarDialogo = document.getElementById('cerrarDialogo');
    if (cerrarDialogo && dialogo) {
      cerrarDialogo.addEventListener('click', () => {
        for (let i = 0; i < 50; i++) createConfetti();
        animateElement(dialogo, { transform: 'translate(-50%, -50%) scale(0.95)' }, 300, {
          callback: () => fadeOut(dialogo, 300, 0, () => dialogo.close())
        });
      });
    }
  };

  /**
   * Configuración del menú móvil
   */
  const setupMobileMenu = () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    if (mobileMenu && navbar) {
      mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
        rotateIn(mobileMenu);
      });
      document.querySelectorAll('.navbar a').forEach(link => {
        const iconClass = link.getAttribute('data-icon');
        if (iconClass) link.innerHTML = `<i class="${iconClass}"></i> ${link.textContent}`;
        link.addEventListener('mouseover', () => rotateIn(link));
      });
    }
  };

  /**
   * Configuración del comportamiento de la navbar al hacer scroll
   */
  const setupNavbarScroll = () => {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', debounce(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        header.classList.remove('hidden');
        navbar.classList.remove('hide');
        return;
      }
      if (currentScroll > lastScroll) {
        header.classList.add('hidden');
        navbar.classList.add('hide');
      } else {
        header.classList.remove('hidden');
        navbar.classList.remove('hide');
      }
      lastScroll = currentScroll;
    }, 50));
  };

  /**
   * Configuración del modo oscuro
   */
  const setupDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
        rotateIn(darkModeToggle);
      });
    }
  };

  /**
   * Configuración del modo pantalla completa
   */
  const setupFullscreen = () => {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled) {
      if (fullscreenBtn) fullscreenBtn.style.display = 'none';
      return;
    }
    const toggleFullscreen = () => {
      const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
      const icon = fullscreenBtn.querySelector('i');
      if (!isFullscreen) {
        (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).call(document.documentElement);
        icon.classList.replace('fa-expand', 'fa-compress');
        localStorage.setItem('fullscreenMode', 'enabled');
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        icon.classList.replace('fa-compress', 'fa-expand');
        localStorage.setItem('fullscreenMode', 'disabled');
      }
      rotateIn(fullscreenBtn);
    };
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
      document.addEventListener('fullscreenchange', () => {
        const icon = fullscreenBtn.querySelector('i');
        icon.classList.toggle('fa-expand', !document.fullscreenElement);
        icon.classList.toggle('fa-compress', !!document.fullscreenElement);
      });
      if (localStorage.getItem('fullscreenMode') === 'enabled') toggleFullscreen();
      pulse(fullscreenBtn, 2000);
    }
  };

  /**
   * Configuración del slider principal
   */
  const setupSlider = () => {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    let slideInterval;
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      fadeIn(slides[index], 500);
      resetInterval();
    };
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };
    const startInterval = () => slideInterval = setInterval(nextSlide, 5000);
    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    if (prevBtn && nextBtn && slides.length) {
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
      showSlide(currentIndex);
      startInterval();
      let touchStartX = 0;
      const heroSlider = document.querySelector('.hero-slider');
      if (heroSlider) {
        heroSlider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
        heroSlider.addEventListener('touchend', e => {
          const touchEndX = e.changedTouches[0].screenX;
          if (touchEndX < touchStartX - 50) nextSlide();
          if (touchEndX > touchStartX + 50) prevSlide();
        });
      }
    }
  };

  /**
   * Configuración del scroll suave
   */
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const section = document.querySelector(anchor.getAttribute('href'));
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  /**
   * Configuración del formulario de contacto
   */
  const setupContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const preCarga = document.querySelector('.pre-carga');
    const motoContainer = document.getElementById('motoContainer');
    const formFeedbackDialog = document.getElementById('formFeedbackDialog');
    const closeFeedbackBtn = document.getElementById('closeFeedbackDialog');

    if (contactForm && preCarga && motoContainer) {
      const validateField = (field, errorMessage) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (!field.value.trim()) {
          field.classList.add('error');
          if (errorElement) errorElement.textContent = 'Este campo es obligatorio';
          return false;
        }
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          field.classList.add('error');
          if (errorElement) errorElement.textContent = 'Ingrese un correo válido';
          return false;
        }
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
        return true;
      };

      contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const fields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        fields.forEach(field => {
          isValid &= validateField(field);
        });

        if (isValid) {
          preCarga.style.display = 'flex';
          preCarga.classList.remove('desaparecer');
          motoContainer.classList.add('active');

          try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
              method: 'POST',
              body: formData,
              headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error('Error en el envío');
            const data = await response.json();
            preCarga.classList.add('desaparecer');
            motoContainer.classList.remove('active');
            if (data.success) {
              contactForm.reset();
              if (formFeedbackDialog) {
                formFeedbackDialog.querySelector('.feedback-content').innerHTML = `
                  <h2>¡Mensaje Enviado!</h2>
                  <p>Gracias por tu consulta. Te responderemos pronto a través de studioprogettosac@gmail.com.</p>
                `;
                formFeedbackDialog.style.transform = 'translate(-50%, -50%) scale(0.95)';
                formFeedbackDialog.style.opacity = '0';
                formFeedbackDialog.showModal();
                fadeIn(formFeedbackDialog, 500, 0, () => {
                  animateElement(formFeedbackDialog, { transform: 'translate(-50%, -50%) scale(1)' }, 300);
                });
              } else {
                showCustomAlert('¡Mensaje enviado! Te responderemos pronto a studioprogettosac@gmail.com.');
              }
            }
          } catch (error) {
            preCarga.classList.add('desaparecer');
            motoContainer.classList.remove('active');
            if (formFeedbackDialog) {
              formFeedbackDialog.querySelector('.feedback-content').innerHTML = `
                <h2>Error</h2>
                <p>No se pudo enviar el mensaje. Por favor, intenta de nuevo más tarde.</p>
              `;
              formFeedbackDialog.style.transform = 'translate(-50%, -50%) scale(0.95)';
              formFeedbackDialog.style.opacity = '0';
              formFeedbackDialog.showModal();
              fadeIn(formFeedbackDialog, 500, 0, () => {
                animateElement(formFeedbackDialog, { transform: 'translate(-50%, -50%) scale(1)' }, 300);
              });
            } else {
              showCustomAlert('No se pudo enviar el mensaje. Intenta de nuevo más tarde.');
            }
            console.error(error);
          }
        }
      });
    }

    if (closeFeedbackBtn && formFeedbackDialog) {
      closeFeedbackBtn.addEventListener('click', () => {
        animateElement(formFeedbackDialog, { transform: 'translate(-50%, -50%) scale(0.95)' }, 300, {
          callback: () => fadeOut(formFeedbackDialog, 300, 0, () => formFeedbackDialog.close())
        });
      });
      formFeedbackDialog.addEventListener('click', e => {
        if (e.target === formFeedbackDialog) formFeedbackDialog.close();
      });
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && formFeedbackDialog.open) formFeedbackDialog.close();
      });
    }
  };

  /**
   * Configuración del carrusel de proveedores
   */
  const setupSuppliers = () => {
    const suppliersTrack = document.querySelector('.suppliers-track');
    if (suppliersTrack) {
      suppliersTrack.addEventListener('mouseenter', () => suppliersTrack.style.animationPlayState = 'paused');
      suppliersTrack.addEventListener('mouseleave', () => suppliersTrack.style.animationPlayState = 'running');
    }
  };

  /**
   * Configuración del diálogo de delivery
   */
  const setupDeliveryDialog = () => {
    const deliveryFloat = document.getElementById('deliveryFloat');
    const deliveryDialog = document.getElementById('deliveryDialog');
    const closeButton = document.getElementById('closeDeliveryDialog');
    const deliveryContent = document.getElementById('deliveryContent');
    const motoContainer = document.getElementById('motoContainer');

    const loadDeliveryContent = async () => {
      deliveryContent.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Cargando opciones de delivery...</p>
        </div>`;
      try {
        const response = await fetch('delivery.html', { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo cargar delivery.html');
        const html = await response.text();
        deliveryContent.innerHTML = html;
        const loadedContent = deliveryContent.querySelector('.delivery-section');
        if (loadedContent) {
          loadedContent.style.padding = '20px';
          loadedContent.style.maxWidth = '100%';
          loadedContent.style.boxShadow = 'none';
          loadedContent.style.border = 'none';
        }
      } catch (error) {
        deliveryContent.innerHTML = `
          <div class="error-message" style="text-align: center; padding: 40px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff4757; margin-bottom: 20px;"></i>
            <h3>Error al cargar la información</h3>
            <p>No se pudo cargar el contenido de delivery. Por favor intenta nuevamente.</p>
            <button onclick="window.location.reload()" class="btn" style="margin-top: 20px;">Recargar Página</button>
          </div>`;
        console.error(error);
      }
    };

    if (deliveryFloat && deliveryDialog && closeButton && deliveryContent && motoContainer) {
      deliveryFloat.addEventListener('click', e => {
        e.preventDefault();
        motoContainer.classList.remove('active');
        void motoContainer.offsetWidth;
        motoContainer.classList.add('active');
        deliveryDialog.showModal();
        loadDeliveryContent();
        scaleIn(deliveryDialog, 300);
      });

      closeButton.addEventListener('click', () => {
        animateElement(deliveryDialog, { transform: 'scale(0.95)' }, 300, {
          callback: () => fadeOut(deliveryDialog, 300, 0, () => deliveryDialog.close())
        });
      });

      deliveryDialog.addEventListener('click', e => {
        if (e.target === deliveryDialog) deliveryDialog.close();
      });

      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && deliveryDialog.open) deliveryDialog.close();
      });
    }
  };

  /**
   * Configuración de animaciones del footer
   */
  const setupFooter = () => {
    const footer = document.querySelector('.footer');
    const trigger = document.querySelector('#footer-trigger');
    if ('IntersectionObserver' in window && footer && trigger) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            footer.classList.add('visible');
            document.querySelectorAll('.footer-section').forEach((section, index) => {
              scaleIn(section, 500, index * 100);
            });
          } else {
            footer.classList.remove('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
      observer.observe(trigger);
    } else if (footer) {
      footer.classList.add('visible');
    }
  };

  /**
   * Configuración de animaciones para secciones
   */
  const setupSectionAnimations = () => {
    const sections = document.querySelectorAll('.page-section, .featured-products, .suppliers, .location-map-section, .contact-section');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scaleIn(entry.target, 500);
            entry.target.querySelectorAll('.col-md-4, .product-card, .supplier-item, .map-container, .form-3d-container, .form-image').forEach((item, index) => {
              animateElement(item, { opacity: 1, transform: 'translateX(0)' }, 500, { delay: index * 100 });
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      sections.forEach(section => observer.observe(section));
    }
  };

  /**
   * Configuración de notificación de delivery
   */
  const setupDeliveryNotification = () => {
    const notification = document.querySelector('.delivery-notification');
    if (notification) {
      setTimeout(() => notification.classList.remove('hidden'), 1000);
      setTimeout(() => notification.classList.add('hidden'), 5000);
    }
  };

  /**
   * Configuración del formulario de servicios (impresión, copias, escaneo)
   */
  const setupServiceForm = () => {
    const printOption = document.getElementById('printOption');
    const copyOption = document.getElementById('copyOption');
    const scanOption = document.getElementById('scanOption');
    const printingForm = document.getElementById('printingForm');
    const serviceMessage = document.getElementById('serviceMessage');
    let openCard = null;

    const closeAllSections = () => {
      if (printingForm) printingForm.style.display = 'none';
      if (serviceMessage) serviceMessage.style.display = 'none';
      openCard = null;
    };

    const toggleSection = (card, section) => {
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
      if (openCard === card) {
        if (section) section.style.display = 'none';
        openCard = null;
      } else {
        closeAllSections();
        if (section) section.style.display = 'block';
        if (document.getElementById(`${card}Option`)) document.getElementById(`${card}Option`).classList.add('active');
        openCard = card;
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (printOption && printingForm) printOption.addEventListener('click', () => toggleSection('print', printingForm));
    if (copyOption && serviceMessage) copyOption.addEventListener('click', () => toggleSection('copy', serviceMessage));
    if (scanOption && serviceMessage) scanOption.addEventListener('click', () => toggleSection('scan', serviceMessage));

    document.addEventListener('click', e => {
      if (!e.target.closest('.service-card') && !e.target.closest('.printing-form') && !e.target.closest('.service-message') && openCard) {
        closeAllSections();
      }
    });

    if (printingForm) printingForm.style.display = 'none';
    if (serviceMessage) serviceMessage.style.display = 'none';

    if (printOption) printOption.addEventListener('click', () => {
      if (printingForm) {
        printingForm.style.display = 'block';
        serviceMessage.style.display = 'none';
        showStep('step1');
      }
    });
    if (copyOption) copyOption.addEventListener('click', () => {
      if (serviceMessage) {
        printingForm.style.display = 'none';
        serviceMessage.style.display = 'block';
      }
    });
    if (scanOption) scanOption.addEventListener('click', () => {
      if (serviceMessage) {
        printingForm.style.display = 'none';
        serviceMessage.style.display = 'block';
      }
    });

    function showStep(stepId) {
      document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
      const step = document.getElementById(stepId);
      if (step) step.classList.add('active');
    }

    document.addEventListener('click', e => {
      if (e.target.classList.contains('next-step')) {
        e.preventDefault();
        const nextStep = e.target.getAttribute('data-next');
        showStep(nextStep);
      }
      if (e.target.classList.contains('prev-step')) {
        e.preventDefault();
        const prevStep = e.target.getAttribute('data-prev');
        showStep(prevStep);
      }
    });

    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    if (fileInput && fileList) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          fileList.innerHTML = '';
          Array.from(fileInput.files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
              <i class="fas fa-file"></i>
              <span>${file.name}</span>
              <small>(${(file.size / 1024).toFixed(2)} KB)</small>
            `;
            fileList.appendChild(fileItem);
          });
        } else {
          fileList.innerHTML = '<p>No hay archivos seleccionados</p>';
        }
      });
    }

    const whatsappBtn = document.querySelector('.whatsapp-submit');
    const emailBtn = document.querySelector('.email-submit');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', e => {
        e.preventDefault();
        const files = fileInput ? fileInput.files : [];
        if (!files || files.length === 0) {
          showCustomAlert('Por favor, selecciona al menos un archivo para continuar con tu solicitud.');
          return;
        }
        const name = document.getElementById('clientName')?.value || 'Studio & Progetto';
        const message = `Hola, somos del equipo ${name} para enviar tus archivos mediante WhatsApp:\n\nPor favor, carga tus archivos y en breve nos comunicaremos contigo...`;
        window.open(`https://wa.me/51939275406?text=${encodeURIComponent(message)}`, '_blank');
      });
    }
    if (emailBtn) {
      emailBtn.addEventListener('click', e => {
        e.preventDefault();
        const files = fileInput ? fileInput.files : [];
        if (!files || files.length === 0) {
          showCustomAlert('Por favor, selecciona al menos un archivo para continuar con tu solicitud.');
          return;
        }
        const name = document.getElementById('clientName')?.value || 'No especificado';
        const email = document.getElementById('clientEmail')?.value || 'No especificado';
        const notes = document.getElementById('additionalNotes')?.value || 'Ninguna';
        const mailtoLink = `mailto:studioprogettosac@gmail.com?subject=Solicitud de impresión de ${name}&body=Nombre: ${name}%0AEmail: ${email}%0ANotas: ${notes}%0A%0A*Importante:* Adjunta los ${files.length} archivo(s) a este correo.`;
        window.location.href = mailtoLink;
        showCustomAlert(`Se abrirá tu cliente de correo. Por favor, adjunta manualmente los ${files.length} archivo(s).`);
      });
    }
  };

  // =============================================
  // INICIALIZACIÓN DE COMPONENTES
  // =============================================
  setupPreloader();
  setupDialog();
  setupMobileMenu();
  setupNavbarScroll();
  setupDarkMode();
  setupFullscreen();
  setupSlider();
  setupSmoothScroll();
  setupContactForm();
  setupSuppliers();
  setupDeliveryDialog();
  setupFooter();
  setupSectionAnimations();
  setupDeliveryNotification();
  setupServiceForm();
});

// =============================================
// ESTILOS DINÁMICOS
// =============================================
const style = document.createElement('style');
style.textContent = `
  /* Estilos para el confeti */
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    z-index: 9999;
    animation: fall 5s linear forwards;
    pointer-events: none;
  }
  @keyframes fall {
    0% { transform: translateY(-100vh) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(720deg); }
  }
  
  /* Estilos para spinners de carga */
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
  }
  .loading-spinner .spinner {
    border: 4px solid rgba(46, 125, 50, 0.2);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  /* Estilos para diálogos modales */
  dialog {
    padding: 0;
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 0 5px 30px rgba(0,0,0,0.3);
    overflow: hidden;
  }
  dialog::backdrop {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
  }
  .delivery-dialog-content, .feedback-dialog-content {
    position: relative;
    max-width: clamp(300px, 90%, 600px);
    background: var(--light-color);
    padding: clamp(16px, 3vw, 24px);
    border-radius: var(--border-radius);
  }
  
  /* Estilos para botones de cerrar */
  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color);
  }
  .close-modal:hover {
    color: var(--accent-color);
  }
  
  /* Estilos para mensajes de error */
  .error-message {
    color: var(--accent-color);
    font-size: clamp(0.75rem, 1.5vw, 0.85rem);
    margin-top: 4px;
    display: block;
  }
  
  /* Estilos para diálogo de feedback */
  .feedback-dialog-content h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  .feedback-dialog-content p {
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }
  #closeFeedbackDialog {
    background: var(--primary-color);
    color: var(--text-light);
    border: none;
    padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }
  #closeFeedbackDialog:hover {
    background: var(--secondary-color);
  }
  
  /* Animación de giro para spinners */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Estilos para la precarga */
  .pre-carga-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
  }
`;
document.head.appendChild(style);
// Prueba de scroll para cambiar el color de fondo
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Calcula un valor entre 0 y 1 según el scroll
  const scrollPercent = scrollY / maxScroll;

  // Interpola color entre blanco (#ffffff) y un color (por ejemplo, #3a7d44)
  const r = Math.floor(255 - (255 - 58) * scrollPercent); // 255 -> 58
  const g = Math.floor(255 - (255 - 125) * scrollPercent); // 255 -> 125
  const b = Math.floor(255 - (255 - 68) * scrollPercent);  // 255 -> 68

  document.body.style.backgroundColor = `rgb(${ r} }, ${ g }, ${ b })`;
});