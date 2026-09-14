/**
 * Script Principal - Natal Solidário do Pancinha 2026
 * Interações de menu, cópia de PIX, accordion de FAQ e utilitários
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. MENU HAMBÚRGUER (MOBILE) ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 2. CÓPIA DA CHAVE PIX PARA CLIPBOARD ---
  const btnCopyPix = document.getElementById('btn-copy-pix');
  const toastMsg = document.getElementById('toast-msg');
  const pixKeyText = '64.859.843/0001-20';

  if (btnCopyPix) {
    btnCopyPix.addEventListener('click', function () {
      navigator.clipboard.writeText(pixKeyText).then(() => {
        const originalText = btnCopyPix.innerHTML;
        btnCopyPix.classList.add('copied');
        btnCopyPix.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Chave Copiada!
        `;

        showToast('Chave Pix copiada com sucesso! Cole no app do seu banco.');

        setTimeout(() => {
          btnCopyPix.classList.remove('copied');
          btnCopyPix.innerHTML = originalText;
        }, 3000);
      }).catch(() => {
        // Fallback para navegadores antigos
        const tempInput = document.createElement('input');
        tempInput.value = pixKeyText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Chave Pix copiada com sucesso!');
      });
    });
  }

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3500);
  }

  // --- 3. ACCORDION DO FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha outros itens para comportamento harmônico
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // --- 4. GERAÇÃO DINÂMICA DAS LUZINHAS DE NATAL ---
  const garlandHolders = document.querySelectorAll('.lights-garland');
  garlandHolders.forEach((garland) => {
    const bulbCount = Math.floor(window.innerWidth / 35);
    const colors = ['red', 'gold', 'green', 'blue'];
    garland.innerHTML = ''; // Limpa se houver algo

    for (let i = 0; i < bulbCount; i++) {
      const bulb = document.createElement('div');
      const color = colors[i % colors.length];
      bulb.className = `light-bulb ${color}`;
      bulb.style.animationDelay = `${(i * 0.15) % 1.6}s`;
      garland.appendChild(bulb);
    }
  });

  // Re-calcula luzinhas ao redimensionar a tela com debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      garlandHolders.forEach((garland) => {
        const bulbCount = Math.floor(window.innerWidth / 35);
        const colors = ['red', 'gold', 'green', 'blue'];
        garland.innerHTML = '';
        for (let i = 0; i < bulbCount; i++) {
          const bulb = document.createElement('div');
          const color = colors[i % colors.length];
          bulb.className = `light-bulb ${color}`;
          bulb.style.animationDelay = `${(i * 0.15) % 1.6}s`;
          garland.appendChild(bulb);
        }
      });
    }, 250);
  });

  // --- 5. ROLAGEM SUAVE COM OFFSET DO HEADER ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 6. CARROSSEL SUAVE DA SEÇÃO HERO ---
  const heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroSlider.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideTimer = null;
    const slideDuration = 4500; // 4.5s: transição suave e contemplativa

    function showSlide(index) {
      if (!slides.length) return;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideTimer = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    if (slides.length > 1) {
      startAutoSlide();

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          showSlide(idx);
          startAutoSlide();
        });
      });

      // Pausa temporária ao passar o mouse
      heroSlider.addEventListener('mouseenter', stopAutoSlide);
      heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
  }
});
