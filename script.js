// Configuración de música y efectos interactivos
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
     let isPlaying = false;
     let slideInterval = null;
     let currentSlide = 0;
     const totalSlides = 4;
     
     // Función para cambiar diapositivas
     function showSlide(slideIndex) {
         // Ocultar todas las diapositivas
         document.querySelectorAll('.message-slide').forEach(slide => {
             slide.classList.remove('active');
         });
         
         // Mostrar la diapositiva actual
         const targetSlide = document.getElementById(`slide${slideIndex + 1}`);
         if (targetSlide) {
             targetSlide.classList.add('active');
         }
     }
     
     // Función para iniciar el slideshow automático
     function startSlideshow() {
         if (slideInterval) return; // Ya está corriendo
         
         currentSlide = 0;
         showSlide(currentSlide);
         
         slideInterval = setInterval(() => {
             currentSlide = (currentSlide + 1) % totalSlides;
             showSlide(currentSlide);
             
             // Si llegamos al último mensaje (índice 3), pausar el slideshow
             if (currentSlide === totalSlides - 1) {
                 clearInterval(slideInterval);
                 slideInterval = null;
                 showMessage('💕 Tómate tu tiempo para leer este mensaje especial, Meli 💕');
             }
         }, 8000); // Cambiar cada 8 segundos
     }
     
     // Función para detener el slideshow
     function stopSlideshow() {
         if (slideInterval) {
             clearInterval(slideInterval);
             slideInterval = null;
         }
         // Volver a la primera diapositiva
         currentSlide = 0;
         showSlide(currentSlide);
     }
     
     // Función para controlar la música de YouTube
      function toggleMusic() {
          const iframe = document.getElementById('backgroundMusic');
          
          if (!isPlaying) {
              // Cargar y reproducir "Creo En Ti" de Reik
              iframe.src = 'https://www.youtube.com/embed/LcKVOWOdFvY?autoplay=1&loop=1&playlist=LcKVOWOdFvY&controls=0&mute=0&start=0';
              isPlaying = true;
              startSlideshow(); // Iniciar el slideshow
              showMessage('🎵 Reproduciendo "Creo En Ti" de Reik para Meli 💕');
          } else {
              // Pausar música
              iframe.src = '';
              isPlaying = false;
              stopSlideshow(); // Detener el slideshow
              showMessage('🔇 Música pausada');
          }
      }
    
    // Manejar el botón de música
     musicToggle.addEventListener('click', function() {
         toggleMusic();
         
         if (isPlaying) {
             musicToggle.textContent = '🔇 Pausar';
             musicToggle.style.background = 'rgba(255,0,0,0.3)';
             musicToggle.style.transform = 'scale(1.1)';
         } else {
             musicToggle.textContent = '🎵 Música';
             musicToggle.style.background = 'rgba(255,255,255,0.2)';
             musicToggle.style.transform = 'scale(1)';
         }
     });
    
    // Función para mostrar mensajes
    function showMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = 'rgba(0,0,0,0.8)';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '25px';
        message.style.fontSize = '0.9rem';
        message.style.zIndex = '2000';
        message.style.animation = 'fadeInOut 3s ease-in-out';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);
    }
    
    // Efectos de click en la pantalla
    document.addEventListener('click', function(e) {
        if (e.target !== musicToggle) {
            createClickEffect(e.clientX, e.clientY);
        }
    });
    
    function createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.innerHTML = '💖';
        effect.style.position = 'fixed';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        effect.style.fontSize = '2rem';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1000';
        effect.style.animation = 'clickHeart 1s ease-out forwards';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 1000);
    }
    
    // Agregar animación CSS para el efecto de click
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickHeart {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Crear corazones adicionales aleatoriamente
    function createRandomHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '5';
        heart.style.animation = `floatHearts ${Math.random() * 3 + 6}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 9000);
    }
    
    // Crear corazones cada 3 segundos
    setInterval(createRandomHeart, 3000);
    
    // Mensaje de bienvenida mejorado
    setTimeout(() => {
          if (!isPlaying) {
              showMessage('💕 ¡Hola Meli! Haz click en "🎵 Música" para ver tus mensajes especiales con "Creo En Ti" de Reik 🎵');
          }
      }, 2000);
    
    // Hacer el botón de música más visible
    setTimeout(() => {
        musicToggle.style.animation = 'pulse 2s infinite';
    }, 3000);
});

// Prevenir scroll en móviles
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });