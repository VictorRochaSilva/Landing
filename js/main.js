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

    const { numero, mensagem, mensagemDesenvolvimento, mensagensServicos } = CONFIG.whatsapp;
    const urlAssistencia = linkWhatsApp(numero, mensagem);
    const urlDesenvolvimento = linkWhatsApp(numero, mensagemDesenvolvimento || mensagem);

    document.querySelectorAll('[data-whatsapp-servico]').forEach(function (btn) {
      var servico = btn.getAttribute('data-whatsapp-servico');
      var msg = mensagensServicos && mensagensServicos[servico] ? mensagensServicos[servico] : mensagem;
      btn.href = linkWhatsApp(numero, msg);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('.btn-whatsapp:not(.btn-whatsapp-dev):not(.btn-whatsapp-servico)').forEach(function (btn) {
      btn.href = urlAssistencia;
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('.btn-whatsapp-dev').forEach(function (btn) {
      btn.href = urlDesenvolvimento;
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
    var floatBtn = document.getElementById('whatsapp-float');
    if (floatBtn) {
      floatBtn.href = urlAssistencia;
      floatBtn.setAttribute('target', '_blank');
      floatBtn.setAttribute('rel', 'noopener noreferrer');
    }
  }

  function initModeSwitch() {
    var wrap = document.querySelector('.mode-switch');
    var views = document.querySelectorAll('.content-view');
    if (!wrap || !views.length) return;

    function showView(mode) {
      views.forEach(function (view) {
        var isMatch = view.id === 'view-' + mode;
        view.classList.toggle('is-visible', isMatch);
        if (isMatch) {
          view.removeAttribute('hidden');
          view.querySelectorAll('[data-animate]').forEach(function (el) {
            el.classList.add('is-visible');
          });
        } else {
          view.setAttribute('hidden', '');
        }
      });
      wrap.querySelectorAll('.mode-switch__btn').forEach(function (btn) {
        var active = btn.getAttribute('data-mode') === mode;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      var floatBtn = document.getElementById('whatsapp-float');
      if (floatBtn && typeof CONFIG !== 'undefined' && CONFIG.whatsapp) {
        var msg = mode === 'desenvolvimento' ? (CONFIG.whatsapp.mensagemDesenvolvimento || CONFIG.whatsapp.mensagem) : CONFIG.whatsapp.mensagem;
        floatBtn.href = linkWhatsApp(CONFIG.whatsapp.numero, msg);
      }
    }

    wrap.querySelectorAll('.mode-switch__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = this.getAttribute('data-mode');
        if (mode) showView(mode);
      });
    });
  }

  function initPrecos() {
    if (typeof CONFIG === 'undefined' || !CONFIG.precos) return;

    var precoLimpeza = document.getElementById('preco-limpeza');
    var precoFormatacao = document.getElementById('preco-formatacao');

    if (precoLimpeza) precoLimpeza.textContent = CONFIG.precos.limpeza;
    if (precoFormatacao) precoFormatacao.textContent = CONFIG.precos.formatacao;
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
    initModeSwitch();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
