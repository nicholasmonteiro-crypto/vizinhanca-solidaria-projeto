// ===================================================
// Vizinhança Solidária — app.js
// Lógica principal: cadastro e listagem de doações
// ===================================================

const CHAVE_LOCAL = 'vizinhanca_solidaria_doacoes';

// ---- Utilitários ----

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function getDoacoes() {
  try {
    const dados = localStorage.getItem(CHAVE_LOCAL);
    const parsed = dados ? JSON.parse(dados) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarDoacoes(doacoes) {
  localStorage.setItem(CHAVE_LOCAL, JSON.stringify(doacoes));
}

function getOrdemDoacao(doacao) {
  if (typeof doacao.criadoEm === 'number') return doacao.criadoEm;
  if (typeof doacao.id === 'number') return doacao.id;
  return 0;
}

function ordenarPorDataRecente(doacoes) {
  return [...doacoes].sort((a, b) => getOrdemDoacao(b) - getOrdemDoacao(a));
}

function getDoacoesDisponiveis() {
  return ordenarPorDataRecente(
    getDoacoes().filter(d => d.status !== 'entregue')
  );
}

// ---- Toast ----

function mostrarToast(mensagem, tipo = 'sucesso') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const icones = { sucesso: '✅', erro: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.innerHTML = `<span aria-hidden="true">${icones[tipo] || ''}</span><span>${escaparHTML(mensagem)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('saindo');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3200);
}

// ---- Contador ----

function atualizarContador(quantidade) {
  const contador = document.getElementById('contador-doacoes');
  if (!contador) return;

  const numero = contador.querySelector('.contador-numero');
  const texto = contador.querySelector('.contador-texto');

  if (numero) numero.textContent = quantidade;

  if (texto) {
    texto.textContent = quantidade === 1
      ? 'doação disponível'
      : 'doações disponíveis';
  }
}

// ---- Validação do formulário ----

const regrasValidacao = {
  item: {
    validar: (v) => v.trim().length >= 2,
    mensagem: 'Informe o nome do alimento (mín. 2 caracteres).'
  },
  bairro: {
    validar: (v) => v.trim().length >= 2,
    mensagem: 'Informe o bairro (mín. 2 caracteres).'
  },
  contato: {
    validar: (v) => /^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v.trim()),
    mensagem: 'Informe um telefone válido (ex: 11 99999-9999)'
  },
  descricao: {
    validar: () => true,
    mensagem: ''
  }
};

function validarCampo(campoId) {
  const input = document.getElementById(campoId);
  if (!input) return true;

  const regra = regrasValidacao[campoId];
  if (!regra) return true;

  const wrapper = input.closest('.campo');
  const erroEl = wrapper?.querySelector('.mensagem-erro');
  const valor = input.value;
  const obrigatorio = input.hasAttribute('required') || campoId !== 'descricao';
  const valido = !obrigatorio || regra.validar(valor);

  if (wrapper) {
    wrapper.classList.toggle('campo-erro', !valido);
  }
  if (erroEl && regra.mensagem) {
    erroEl.textContent = valido ? '' : regra.mensagem;
  }

  return valido;
}

function validarFormulario() {
  const campos = ['item', 'bairro', 'contato'];
  return campos.every(validarCampo);
}

function initValidacaoFormulario() {
  const form = document.querySelector('.form-container');
  if (!form) return;

  ['item', 'descricao', 'bairro', 'contato'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('blur', () => validarCampo(id));
    input.addEventListener('input', () => {
      const wrapper = input.closest('.campo');
      if (wrapper?.classList.contains('campo-erro')) {
        validarCampo(id);
      }
    });
  });

  const btnPublicar = form.querySelector('.btn-primary');
  if (btnPublicar) {
    btnPublicar.addEventListener('click', cadastrarDoacao);
  }
}

// ---- Cadastro de doação ----

function cadastrarDoacao() {
  if (!validarFormulario()) {
    mostrarToast('Corrija os campos destacados antes de publicar.', 'erro');
    return;
  }

  const item = document.getElementById('item').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const contato = document.getElementById('contato').value.trim();

  const novaDoacao = {
    id: crypto.randomUUID(),
    criadoEm: Date.now(),
    item,
    descricao,
    bairro,
    contato,
    data: new Date().toLocaleDateString('pt-BR'),
    status: 'disponivel'
  };

  const doacoes = getDoacoes();
  doacoes.unshift(novaDoacao);
  salvarDoacoes(doacoes);

  const msgSucesso = document.getElementById('mensagem-sucesso');
  if (msgSucesso) msgSucesso.style.display = 'block';

  document.getElementById('item').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('contato').value = '';

  document.querySelectorAll('.campo-erro').forEach(el => el.classList.remove('campo-erro'));

  mostrarToast('Doação publicada com sucesso!');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// ---- Ações nos cards ----

function marcarComoEntregue(id) {
  const doacoes = getDoacoes();
  const index = doacoes.findIndex(d => String(d.id) === String(id));
  if (index === -1) return;

  doacoes[index].status = 'entregue';
  salvarDoacoes(doacoes);
  mostrarToast(`"${doacoes[index].item}" marcado como entregue!`, 'info');
  filtrarDoacoes();
}

function excluirDoacao(id) {
  const doacoes = getDoacoes();
  const doacao = doacoes.find(d => String(d.id) === String(id));
  if (!doacao) return;

  if (!confirm(`Deseja excluir a doação "${doacao.item}"? Esta ação não pode ser desfeita.`)) {
    return;
  }

  const filtradas = doacoes.filter(d => String(d.id) !== String(id));
  salvarDoacoes(filtradas);
  mostrarToast(`"${doacao.item}" foi removido.`, 'sucesso');
  filtrarDoacoes();
}

// ---- Listagem de doações ----

function renderizarEstadoVazio(filtroAtivo) {
  if (filtroAtivo) {
    return `
      <div class="estado-vazio" role="status">
        <span class="estado-vazio-icon" aria-hidden="true">🔍</span>
        <h3>Nenhum resultado encontrado</h3>
        <p>Não há doações no bairro informado. Tente outro nome ou limpe o filtro.</p>
      </div>
    `;
  }

  return `
    <div class="estado-vazio" role="status">
      <span class="estado-vazio-icon" aria-hidden="true">🍎</span>
      <h3>Nenhuma doação ainda</h3>
      <p>Seja o primeiro a compartilhar alimentos com a vizinhança. É rápido e gratuito!</p>
      <a href="doar.html" class="btn-primary">+ Fazer uma doação</a>
    </div>
  `;
}

function renderizarDoacoes(lista, filtroAtivo = false) {
  const container = document.getElementById('lista-doacoes');
  if (!container) return;

  atualizarContador(lista.length);

  if (lista.length === 0) {
    container.innerHTML = renderizarEstadoVazio(filtroAtivo);
    return;
  }

  container.innerHTML = lista.map(d => `
    <article class="card" aria-label="Doação: ${escaparHTML(d.item)}">
      <h3>${escaparHTML(d.item)}</h3>
      ${d.descricao ? `<p class="descricao">${escaparHTML(d.descricao)}</p>` : ''}
      <div class="info">
        <span class="bairro">${escaparHTML(d.bairro)}</span>
        <span class="contato">${escaparHTML(d.contato)}</span>
        <span class="data">${escaparHTML(d.data)}</span>
      </div>
      <div class="card-acoes">
        <button type="button" class="btn-success btn-sm" data-acao="entregue" data-id="${d.id}" aria-label="Marcar ${escaparHTML(d.item)} como entregue">
          ✓ Marcar entregue
        </button>
        <button type="button" class="btn-danger btn-sm" data-acao="excluir" data-id="${d.id}" aria-label="Excluir doação ${escaparHTML(d.item)}">
          ✕ Excluir
        </button>
      </div>
    </article>
  `).join('');
}

function filtrarDoacoes() {
  const filtroInput = document.getElementById('filtroBairro');
  const filtro = filtroInput ? filtroInput.value.toLowerCase().trim() : '';
  const disponiveis = getDoacoesDisponiveis();
  const filtradas = filtro
    ? disponiveis.filter(d =>
      d.bairro.toLowerCase().includes(filtro)
      || d.item.toLowerCase().includes(filtro)
    )
    : disponiveis;

  renderizarDoacoes(filtradas, filtro.length > 0);
}

function initListagem() {
  const container = document.getElementById('lista-doacoes');
  if (!container) return;

  renderizarDoacoes(getDoacoesDisponiveis());

  const filtroInput = document.getElementById('filtroBairro');
  if (filtroInput) {
    filtroInput.addEventListener('input', filtrarDoacoes);
  }

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;

    const id = btn.dataset.id;
    const acao = btn.dataset.acao;

    if (acao === 'entregue') marcarComoEntregue(id);
    if (acao === 'excluir') excluirDoacao(id);
  });
}

// ---- Inicialização ----

document.addEventListener('DOMContentLoaded', () => {
  initListagem();
  initValidacaoFormulario();
});
