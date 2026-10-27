// Menu responsivo
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu após a seleção de uma seção (em telas pequenas).
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

// Pesquisa de filósofos por nome ou tema.
const philosopherSearch = document.querySelector('#philosopherSearch');
const philosopherCards = [...document.querySelectorAll('.philosopher-card')];
const emptyState = document.querySelector('#emptyState');

philosopherSearch.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLocaleLowerCase('pt-BR');
  let visibleCount = 0;

  philosopherCards.forEach((card) => {
    const searchableText = `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase('pt-BR');
    const matches = searchableText.includes(searchTerm);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
});

// Perguntas filosóficas para iniciar uma conversa ou atividade.
const prompts = [
  { text: 'É possível ser livre sem considerar a liberdade das outras pessoas?', category: 'ÉTICA & LIBERDADE' },
  { text: 'Como podemos distinguir uma informação confiável de uma opinião?', category: 'CONHECIMENTO & VERDADE' },
  { text: 'Uma lei é sempre justa só porque foi aprovada?', category: 'JUSTIÇA & POLÍTICA' },
  { text: 'O que faz uma vida ser considerada boa?', category: 'ÉTICA & FELICIDADE' },
  { text: 'A tecnologia sempre melhora a vida humana?', category: 'TECNOLOGIA & SOCIEDADE' },
  { text: 'Podemos compreender alguém sem concordar com essa pessoa?', category: 'DIÁLOGO & ALTERIDADE' }
];

const promptText = document.querySelector('#promptText');
const promptCategory = document.querySelector('#promptCategory');
const promptNumber = document.querySelector('#promptNumber');
const newPromptButton = document.querySelector('#newPrompt');
const showHintButton = document.querySelector('#showHint');
const reflectionHint = document.querySelector('#reflectionHint');
let currentPromptIndex = 0;

newPromptButton.addEventListener('click', () => {
  let nextIndex = currentPromptIndex;
  if (prompts.length > 1) {
    while (nextIndex === currentPromptIndex) {
      nextIndex = Math.floor(Math.random() * prompts.length);
    }
  }
  currentPromptIndex = nextIndex;
  promptText.textContent = prompts[currentPromptIndex].text;
  promptCategory.textContent = prompts[currentPromptIndex].category;
  promptNumber.textContent = `${String(currentPromptIndex + 1).padStart(2, '0')} / ${String(prompts.length).padStart(2, '0')}`;
  reflectionHint.hidden = true;
  showHintButton.setAttribute('aria-expanded', 'false');
  showHintButton.textContent = 'Ver uma pista';
});

showHintButton.addEventListener('click', () => {
  const isHidden = reflectionHint.hidden;
  reflectionHint.hidden = !isHidden;
  showHintButton.setAttribute('aria-expanded', String(isHidden));
  showHintButton.textContent = isHidden ? 'Ocultar pista' : 'Ver uma pista';
});

// Ano automático no rodapé.
document.querySelector('#currentYear').textContent = new Date().getFullYear();
