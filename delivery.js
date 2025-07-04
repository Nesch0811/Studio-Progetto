// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Simular precarga (en un caso real aquí iría tu lógica de precarga real)
  setTimeout(function() {
    // Ocultar la precarga
    document.querySelector('.pre-carga').classList.add('desaparecer');
    
    // Mostrar el diálogo después de que la precarga haya desaparecido
    setTimeout(function() {
      const dialogo = document.getElementById('dialogo');
      dialogo.showModal();
    }, 500); // Esperar medio segundo para que termine la animación de desvanecimiento
  }, 2000); // Simular 2 segundos de precarga
});

// Configurar el botón de cerrar
document.getElementById('cerrarDialogo').addEventListener('click', function() {
  // Crear efecto de confeti al cerrar
  for (let i = 0; i < 50; i++) {
    createConfetti();
  }
  
  // Cerrar el diálogo después de un pequeño retraso para que se vea el confeti
  setTimeout(function() {
    document.getElementById('dialogo').close();
  }, 300);
});

// Función para crear confeti
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.body.appendChild(confetti);
  
  // Eliminar el confeti después de la animación
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}



let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.navbar').classList.add('hidden');
  } else {
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.navbar').classList.remove('hidden');
  }
  lastScrollTop = scrollTop;
});

// Configurar el efecto de desplazamiento de la barra de navegación
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
        // Scroll hacia abajo
        navbar.classList.add('hide');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
        // Scroll hacia arriba
        navbar.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dialogo').showModal();
});

document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".footer");
    const trigger = document.querySelector("#footer-trigger");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footer.classList.add("visible");
                    } else {
                        footer.classList.remove("visible");
                    }
                });
            },
            {
                root: null, // Usa la ventana gráfica como raíz
                threshold: 0.1 // Activa cuando el 10% del trigger es visible
            }
        );
        observer.observe(trigger);
    } else {
        // Fallback para navegadores sin IntersectionObserver
        footer.classList.add("visible");
    }
});
const footer = document.querySelector(".footer");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add("visible");
            } else {
                footer.classList.remove("visible");
            }
        });
    },
    { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
);
observer.observe(footer);
// Script para cargar el contenido y manejar el diálogo
document.addEventListener('DOMContentLoaded', function() {
  const deliveryFloat = document.getElementById('deliveryFloat');
  const deliveryDialog = document.getElementById('deliveryDialog');
  const closeButton = document.getElementById('closeDeliveryDialog');
  const deliveryContent = document.getElementById('deliveryContent');

  // Abrir diálogo al hacer clic en el botón flotante
  deliveryFloat.addEventListener('click', function() {
    deliveryDialog.showModal();
    
    // Cargar el contenido de delivery.html
    fetch('delivery.html')
      .then(response => response.text())
      .then(data => {
        deliveryContent.innerHTML = data;
        
        // Añadir estilos específicos para el contenido cargado
        const style = document.createElement('style');
        style.textContent = `
          .delivery-info-container {
            padding: 1rem;
          }
          .delivery-info-container h2 {
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          /* Añade más estilos según necesites */
        `;
        deliveryContent.appendChild(style);
      })
      .catch(error => {
        deliveryContent.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>No se pudo cargar la información de delivery. Por favor intenta nuevamente.</p>
          </div>
        `;
      });
  });

  // Cerrar diálogo
  closeButton.addEventListener('click', function() {
    deliveryDialog.close();
  });

  // Cerrar al hacer clic fuera del contenido
  deliveryDialog.addEventListener('click', function(e) {
    if (e.target === deliveryDialog) {
      deliveryDialog.close();
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const deliveryBtn = document.getElementById('deliveryFloat');
  const deliveryModal = document.getElementById('deliveryModal');
  const closeBtn = document.querySelector('.close-modal');
  const deliveryContent = document.getElementById('deliveryContent');

  // Abrir modal al hacer clic en el botón
  deliveryBtn.addEventListener('click', function() {
    deliveryModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Deshabilitar scroll
    
    // Cargar el contenido de delivery.html
    fetch('delivery.html')
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar');
        return response.text();
      })
      .then(html => {
        deliveryContent.innerHTML = html;
        
        // Aplicar estilos específicos al contenido cargado
        const loadedContent = deliveryContent.querySelector('.delivery-section');
        if (loadedContent) {
          loadedContent.style.padding = '20px';
          loadedContent.style.maxWidth = '100%';
          loadedContent.style.boxShadow = 'none';
          loadedContent.style.border = 'none';
        }
      })
      .catch(error => {
        deliveryContent.innerHTML = `
          <div class="error-message" style="text-align: center; padding: 40px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff4757; margin-bottom: 20px;"></i>
            <h3>Error al cargar la información</h3>
            <p>No se pudo cargar el contenido de delivery. Por favor intenta nuevamente.</p>
            <button onclick="window.location.reload()" class="btn" style="margin-top: 20px;">
              Recargar Página
            </button>
          </div>
        `;
      });
  });

  // Cerrar modal
  closeBtn.addEventListener('click', function() {
    deliveryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Cerrar al hacer clic fuera del contenido
  window.addEventListener('click', function(event) {
    if (event.target === deliveryModal) {
      deliveryModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

  const deliveryButton = document.getElementById('deliveryFloat');
  const motoContainer = document.getElementById('motoContainer');

  deliveryButton.addEventListener('click', () => {
    // Remover la clase active para reiniciar la animación si ya estaba activa
    motoContainer.classList.remove('active');
    // Forzar un reflow para que la animación se reinicie
    void motoContainer.offsetWidth;
    // Agregar la clase active para iniciar la animación
    motoContainer.classList.add('active');
  });


  const deliveryFloatBtn = document.getElementById('deliveryFloat');
  const deliveryModal = document.getElementById('deliveryModal');
  const deliveryContent = document.getElementById('deliveryContent');
  const closeModalBtn = deliveryModal.querySelector('.close-modal');

  async function loadDeliveryContent() {
    try {
      deliveryContent.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Cargando opciones de delivery...</p>
        </div>`;
      const response = await fetch('delivery.html', {cache: "no-store"});
      if (!response.ok) throw new Error('No se pudo cargar delivery.html');
      const html = await response.text();
      deliveryContent.innerHTML = html;
    } catch (error) {
      deliveryContent.innerHTML = `<p style="color:red; text-align:center; padding:20px;">Error al cargar las opciones de delivery.</p>`;
      console.error(error);
    }
  }

  function openModal() {
    deliveryModal.style.display = 'block';
    loadDeliveryContent();
  }

  function closeModal() {
    deliveryModal.style.display = 'none';
  }

  // Open modal when floating button clicked
  deliveryFloatBtn.addEventListener('click', openModal);

  // Close modal when clicking close button
  closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside modal content
  window.addEventListener('click', (event) => {
    if (event.target === deliveryModal) {
      closeModal();
    }
  });

  // Optional: Close modal with Escape key
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && deliveryModal.style.display === 'block') {
      closeModal();
    }
  });
