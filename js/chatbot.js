/**
 * Assistente Natalina do Pancinha (Chatbot Interativo)
 * Campanha Natal Solidário do Pancinha 2026
 */

document.addEventListener('DOMContentLoaded', function () {
  const chatWindow = document.getElementById('chatbot-window');
  const chatTrigger = document.getElementById('floating-chat-trigger');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const typingIndicator = document.getElementById('typing-indicator');
  const chatBadge = document.getElementById('chat-trigger-badge');

  if (!chatWindow || !chatTrigger) return;

  // Toggle abrir/fechar chat
  function toggleChat() {
    const isCollapsed = chatWindow.classList.toggle('collapsed');
    if (!isCollapsed) {
      if (chatBadge) chatBadge.style.display = 'none';
      setTimeout(() => {
        chatInput.focus();
        scrollToBottom();
      }, 300);
    }
  }

  chatTrigger.addEventListener('click', toggleChat);
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);

  // Formatar hora atual
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Scroll automático para a última mensagem
  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Adicionar mensagem na tela
  function appendMessage(text, sender = 'bot', isHtml = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chat-bubble';

    if (isHtml) {
      bubbleDiv.innerHTML = text;
    } else {
      bubbleDiv.textContent = text;
    }

    const timeDiv = document.createElement('span');
    timeDiv.className = 'chat-time';
    timeDiv.textContent = getCurrentTime();

    msgDiv.appendChild(bubbleDiv);
    msgDiv.appendChild(timeDiv);

    chatBody.insertBefore(msgDiv, typingIndicator);
    scrollToBottom();
  }

  // Simular digitação do bot
  function showTyping() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
  }

  function hideTyping() {
    typingIndicator.style.display = 'none';
  }

  function botReply(text, delay = 700, isHtml = false) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      appendMessage(text, 'bot', isHtml);
    }, delay);
  }

  // Respostas para as Perguntas Frequentes
  const faqResponses = {
    faq1: {
      question: 'Como funciona a doação?',
      answer: 'Toda doação recebida é revertida 100% na compra de alimentos para cestas natalinas e brinquedos novos para crianças em situação de vulnerabilidade em <strong>Blumenau - Santa Catarina</strong>. Você pode doar qualquer quantia via Pix pelo <strong>CNPJ: 64.859.843/0001-20</strong> ou levar alimentos/brinquedos nos nossos 5 pontos de coleta na cidade! 🎁✨'
    },
    faq_coleta: {
      question: 'Pontos de coleta em Blumenau',
      answer: '📍 <strong>Pontos de Coleta Oficiais em Blumenau - SC:</strong><br><br>' +
        '🥖 <strong>Padaria e Restaurante Bublitz</strong><br>Rua Doutor Pedro Zimmermann, 7859, Blumenau<br><br>' +
        '🥐 <strong>Padaria e Confeitaria Castelinho</strong><br>Rua Amazonas, 930, Blumenau<br><br>' +
        '🛒 <strong>Mercado Nosso Ponto</strong><br>Rua Gustavo Zimmermann, 4044, Blumenau<br><br>' +
        '🏷️ <strong>Prioridade 10 Blumenau (Itoupava Central)</strong><br>Rua Dr. Pedro Zimmermann, 5986, Itoupava Central, Blumenau<br><br>' +
        '🧸 <strong>Kimania</strong><br>Rua Doutor Pedro Zimmermann, 3380, Blumenau<br><br>' +
        'Você pode entregar alimentos não perecíveis e brinquedos em qualquer um desses endereços! 🎄'
    },
    faq2: {
      question: 'Onde as cestas são entregues?',
      answer: 'A campanha acontece integralmente em <strong>Blumenau - Santa Catarina</strong>! As entregas são realizadas diretamente em comunidades carentes, lares infantis e bairros periféricos de Blumenau (como Itoupava Central, Progresso, Garcia e região) com a presença do nosso Papai Noel e voluntários! 🏡🎄'
    },
    faq3: {
      question: 'Até quando posso doar?',
      answer: 'As arrecadações em Blumenau vão até o dia <strong>20 de dezembro de 2026</strong>! Esse prazo é fundamental para a montagem das cestas e compra dos brinquedos antes do grande dia de entrega. Participe! ⏰🎅'
    }
  };

  // Evento de clique nos botões rápidos do FAQ
  const quickButtons = document.querySelectorAll('.quick-btn');
  quickButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const faqKey = this.getAttribute('data-faq');
      const faqData = faqResponses[faqKey];

      if (faqData) {
        // Envia pergunta do usuário
        appendMessage(faqData.question, 'user');

        // Resposta do bot
        botReply(faqData.answer, 600, true);
      }
    });
  });

  // Processamento inteligente de mensagens digitadas pelo usuário
  function handleUserMessage() {
    const rawText = chatInput.value.trim();
    if (!rawText) return;

    // Adiciona mensagem do usuário
    appendMessage(rawText, 'user');
    chatInput.value = '';

    const lower = rawText.toLowerCase();

    // Lógica inteligente de respostas
    if (lower.includes('ponto') || lower.includes('coleta') || lower.includes('onde entregar') || lower.includes('levar') || lower.includes('bublitz') || lower.includes('castelinho') || lower.includes('nosso ponto') || lower.includes('prioridade 10') || lower.includes('kimania') || lower.includes('zimmermann')) {
      botReply(faqResponses.faq_coleta.answer, 600, true);
    } else if (lower.includes('blumenau') || lower.includes('cidade') || lower.includes('santa catarina') || lower.includes('sc') || lower.includes('onde acontece') || lower.includes('onde e') || lower.includes('onde é') || lower.includes('local')) {
      botReply('A campanha <strong>Natal Solidário do Pancinha 2026</strong> acontece exclusivamente em <strong>Blumenau - Santa Catarina</strong>! ❤️ As ações, pontos de coleta e entrega das cestas beneficiam famílias da nossa comunidade blumenauense.', 600, true);
    } else if (lower.includes('como doar') || lower.includes('como funciona')) {
      botReply(faqResponses.faq1.answer, 600, true);
    } else if (lower.includes('onde') || lower.includes('entrega') || lower.includes('bairro')) {
      botReply(faqResponses.faq2.answer, 600, true);
    } else if (lower.includes('prazo') || lower.includes('quando') || lower.includes('data') || lower.includes('limite') || lower.includes('ate quando') || lower.includes('até quando')) {
      botReply(faqResponses.faq3.answer, 600, true);
    } else if (lower.includes('pix') || lower.includes('cnpj') || lower.includes('chave') || lower.includes('banco')) {
      botReply('Nossa chave Pix é o CNPJ: <strong>64.859.843/0001-20</strong>. Você pode copiar a chave diretamente na seção "Doar Agora" da página! ❤️', 600, true);
    } else if (lower.includes('valor') || lower.includes('quanto') || lower.includes('minimo')) {
      botReply('Não existe valor mínimo! Qualquer contribuição faz a diferença para as famílias de Blumenau: R$ 25 garante kit de guloseimas, R$ 50 um brinquedo novo e R$ 100 uma cesta natalina completa! 🧸🎁', 600, false);
    } else if (lower.includes('voluntario') || lower.includes('ajudar') || lower.includes('participar')) {
      botReply('Adoramos novos voluntários em Blumenau! Você pode nos ajudar na triagem, montagem das cestas e no dia da entrega. Entre em contato conosco pelo WhatsApp: <strong>+55 47 99109-2967</strong> para entrar na equipe! 🤝', 600, true);
    } else if (lower.includes('comprovante')) {
      botReply('Se desejar, envie o comprovante de doação para o nosso WhatsApp <strong>+55 47 99109-2967</strong> com seu nome para que possamos agradecer pessoalmente! 📜✨', 600, true);
    } else if (lower.includes('instagram') || lower.includes('rede') || lower.includes('face') || lower.includes('facebook') || lower.includes('foto')) {
      botReply('Acompanhe nossas fotos e ações nas redes sociais!<br>📸 <a href="https://www.instagram.com/nataldopancinha?stkn=MTZlNzcxcWt0NzR0Yw==" target="_blank" style="color:#ba181b;font-weight:700;text-decoration:underline;">Instagram @nataldopancinha</a><br>👍 <a href="https://www.facebook.com/share/1C9GHJpeT5/" target="_blank" style="color:#ba181b;font-weight:700;text-decoration:underline;">Facebook Oficial</a>', 600, true);
    } else if (lower.includes('ola') || lower.includes('olá') || lower.includes('oi') || lower.includes('boa tarde') || lower.includes('bom dia') || lower.includes('boa noite')) {
      botReply('Ho-ho-ho! Que bom falar com você! 🎅 A campanha do Pancinha acontece em <strong>Blumenau - SC</strong>. Como posso ajudar você hoje? Escolha uma das perguntas rápidas ou digite sua dúvida!', 600, true);
    } else {
      botReply('Muito obrigada pela sua mensagem! A campanha acontece em <strong>Blumenau - Santa Catarina</strong>. Você pode doar via Pix, entregar nos pontos de coleta da cidade ou falar conosco pelo botão <strong>Conversar</strong> do WhatsApp! 🎄❤️', 800, true);
    }
  }

  // Enviar no clique do botão
  chatSendBtn.addEventListener('click', handleUserMessage);

  // Enviar com a tecla Enter
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage();
    }
  });
});
