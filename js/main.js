(function () {
  'use strict';

  function linkWhatsApp(numero, mensagem) {
    const base = 'https://wa.me/' + String(numero).replace(/\D/g, '');
    if (mensagem && mensagem.trim()) {
      return base + '?text=' + encodeURIComponent(mensagem.trim());
    }
    return base;
  }

  function initWhatsApp() {
    if (typeof CONFIG === 'undefined' || !CONFIG.whatsapp) return;

    const { numero, mensagem } = CONFIG.whatsapp;
    const url = linkWhatsApp(numero, mensagem);

    document.querySelectorAll('.btn-whatsapp').forEach(function (btn) {
      btn.href = url;
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  }

  function initPrecos() {
    if (typeof CONFIG === 'undefined' || !CONFIG.precos) return;

    var precoLimpeza = document.getElementById('preco-limpeza');
    var precoFormatacao = document.getElementById('preco-formatacao');
    var precoMontagem = document.getElementById('preco-montagem');

    if (precoLimpeza) precoLimpeza.textContent = CONFIG.precos.limpeza;
    if (precoFormatacao) precoFormatacao.textContent = CONFIG.precos.formatacao;
    if (precoMontagem) precoMontagem.textContent = CONFIG.precos.montagem;
  }

  function initScrollAnimations() {
    var animated = document.querySelectorAll('[data-animate]');
    if (!animated.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );

    animated.forEach(function (el) {
      observer.observe(el);
    });
  }

  function run() {
    initWhatsApp();
    initPrecos();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
