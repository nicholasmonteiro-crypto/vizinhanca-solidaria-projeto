// ===================================================
// Vizinhança Solidária — app.js
// Lógica principal: cadastro e listagem de doações
// ===================================================

// Chave usada para salvar os dados no localStorage
const CHAVE_LOCAL = 'vizinhanca_solidaria_doacoes';

// ---- Funções de dados ----

function getDoacoes() {
  const dados = localStorage.getItem(CHAVE_LOCAL);
  return dados ? JSON.parse(dados) : [];
}

function salvarDoacoes(doacoes) {
  localStorage.setItem(CHAVE_LOCAL, JSON.stringify(doacoes));
}

// ---- Cadastro de doação ----

function cadastrarDoacao() {
  const item     = document.getElementById('item').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const bairro   = document.getElementById('bairro').value.trim();
  const contato  = document.getElementById('contato').value.trim();

  if (!item || !bairro || !contato) {
    alert('Por favor, preencha os campos obrigatórios: alimento, bairro e contato.');
    return;
  }

  const novaDoacao = {
    id: Date.now(),
    item,
    descricao,
    bairro,
    contato,
    data: new Date().toLocaleDateString('pt-BR')
  };

  const doacoes = getDoacoes();
  doacoes.unshift(novaDoacao); // mais recente no topo
  salvarDoacoes(doacoes);

  // Mostra mensagem de sucesso e limpa o formulário
  document.getElementById('mensagem-sucesso').style.display = 'block';
  document.getElementById('item').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('contato').value = '';

  // Redireciona para a lista após 1.5s
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// ---- Listagem de doações ----

function renderizarDoacoes(lista) {
  const container = document.getElementById('lista-doacoes');
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = '<p class="sem-resultados">Nenhuma doação encontrada. Seja o primeiro a doar! 🤝</p>';
    return;
  }

  container.innerHTML = lista.map(d => `
    <div class="card">
      <h3>${d.item}</h3>
      ${d.descricao ? `<p class="descricao">${d.descricao}</p>` : ''}
      <div class="info">
        <span class="bairro">${d.bairro}</span>
        <span class="contato">${d.contato}</span>
        <span class="data">${d.data}</span>
      </div>
    </div>
  `).join('');
}

function filtrarDoacoes() {
  const filtro = document.getElementById('filtroBairro').value.toLowerCase();
  const todas = getDoacoes();
  const filtradas = todas.filter(d =>
    d.bairro.toLowerCase().includes(filtro)
  );
  renderizarDoacoes(filtradas);
}

// ---- Inicialização ----

// Na página de listagem (index.html), carrega as doações ao abrir
if (document.getElementById('lista-doacoes')) {
  renderizarDoacoes(getDoacoes());
}
