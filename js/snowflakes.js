/**
 * Efeito Suave de Flocos de Neve (Canvas)
 * Campanha Natal Solidário do Pancinha 2026
 * Otimizado para alta performance e baixo consumo de bateria.
 */

(function () {
  'use strict';

  // Verifica preferência do usuário de redução de movimento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let flakes = [];
  const maxFlakes = window.innerWidth < 768 ? 45 : 90; // Menos partículas no celular

  function Flake() {
    this.reset();
  }

  Flake.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * -height * 0.2; // Começa um pouco acima da tela
    this.size = Math.random() * 3 + 1.2;
    this.speedY = Math.random() * 1.2 + 0.6;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.7 + 0.3;
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.02 + 0.01;
  };

  Flake.prototype.update = function () {
    this.y += this.speedY;
    this.swing += this.swingSpeed;
    this.x += Math.sin(this.swing) * 0.6 + this.speedX;

    // Reposiciona quando sai da tela
    if (this.y > height + 10) {
      this.reset();
      this.y = -10;
    }
    if (this.x > width + 10) {
      this.x = -10;
    } else if (this.x < -10) {
      this.x = width + 10;
    }
  };

  Flake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
  };

  // Inicializa os flocos
  for (let i = 0; i < maxFlakes; i++) {
    const flake = new Flake();
    flake.y = Math.random() * height; // Distribui pela tela no início
    flakes.push(flake);
  }

  let animationFrameId;
  let isRunning = true;

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakes.length; i++) {
      flakes[i].update();
      flakes[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Ajusta dimensões na mudança de tela
  window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Pausa animação quando a aba não estiver visível (economiza bateria)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      render();
    }
  });
})();
