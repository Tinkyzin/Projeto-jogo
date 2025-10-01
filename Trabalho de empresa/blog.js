const posts = {
  "post-1": {
    title: "Atualização v1.4 - Novo mapa",
    content: `
      <p>No lançamento, os jogadores poderão se aventurar em um dos mapas mais enigmáticos: <i>"Nebula Rift"</i>. 🌌</p>
      <p>Entre áreas sombrias e inimigos implacáveis, cada passo reserva perigo e descobertas únicas.</p>
      <p>Segredos espalhados pelo cenário aguardam aqueles corajosos o bastante para explorá-lo até o fim.</p>
      <p><b>Você está pronto para encarar o desconhecido?</b></p>
    `
  },
  "post-2": {
    title: "Devlog #5 - Sistema de Combate",
    content: `
      <p>No quinto devlog, mostramos as melhorias no <b>sistema de combate</b>.</p>
      <p>Agora temos combos elementais, esquivas mais responsivas e a possibilidade de quebrar a defesa de inimigos mais fortes.</p>
      <p>Nosso objetivo é deixar cada batalha mais estratégica e dinâmica, sem perder a essência metroidvania.</p>
      <p>Além disso, ajustes de balanceamento foram feitos para que cada arma e habilidade tenha um uso estratégico único.</p>
    `
  },
  "post-3": {
    title: "Arte Conceitual Revelada",
    content: `
      <p>Finalmente revelamos as primeiras artes conceituais de <b>"Ruínas de Elaris"</b>.</p>
      <p>Essa região é um local misterioso, repleto de puzzles ambientais e inimigos que se escondem nas sombras.</p>
      <p>Queremos que cada jogador sinta o peso da exploração e a recompensa ao desvendar os segredos desse lugar.</p>
      <p>As cores, luzes e formas foram cuidadosamente planejadas para criar uma atmosfera única e imersiva.</p>
    `
  },
  "post-4": {
    title: "Novo Boss Revelado",
    content: `
      <p>Apresentamos o <b>"Guardião das Sombras"</b>, o primeiro grande desafio do mapa Nebula Rift.</p>
      <p>Este inimigo possui ataques imprevisíveis e padrões que exigem atenção total do jogador.</p>
      <p>Vencer o Guardião garante recompensas únicas, incluindo equipamentos raros e conquistas especiais.</p>
      <p>Prepare-se para testar suas habilidades e estratégia, pois cada batalha será um verdadeiro teste de maestria.</p>
    `
  },
  "post-5": {
    title: "Atualização de Habilidades",
    content: `
      <p>Atualizamos o sistema de habilidades para permitir combos mais complexos e ataques elementais combinados.</p>
      <p>Jogadores agora podem desbloquear esquivas aprimoradas e habilidades especiais que modificam o ritmo das batalhas.</p>
      <p>Essa mudança visa tornar cada confronto mais dinâmico e recompensador, incentivando exploração e experimentação.</p>
      <p>Além disso, a interface de habilidades foi redesenhada para facilitar o acesso rápido durante o combate.</p>
    `
  },
  "post-6": {
    title: "Mapa Expandido",
    content: `
      <p>Nebula Rift ganhou novas áreas secretas para os jogadores explorarem.</p>
      <p>Essas regiões escondem puzzles únicos, inimigos especiais e colecionáveis raros.</p>
      <p>A expansão também inclui atalhos estratégicos que facilitam a movimentação pelo mapa.</p>
      <p>Explorar cada canto agora recompensa o jogador não apenas com loot, mas com segredos e lore do universo do jogo.</p>
    `
  },
  "post-7": {
    title: "Evento Especial",
    content: `
      <p>Um evento temporário foi iniciado, trazendo inimigos inéditos e recompensas raras para todos os exploradores.</p>
      <p>Durante o evento, a Nebula Rift sofre alterações ambientais, criando novas estratégias e desafios.</p>
      <p>Os jogadores poderão desbloquear skins exclusivas, conquistas especiais e itens únicos.</p>
      <p>Este evento é uma oportunidade perfeita para testar novas táticas e experimentar o máximo do sistema de combate.</p>
    `
  },
  "post-8": {
    title: "Correção de Bugs",
    content: `
      <p>Vários bugs menores foram corrigidos nesta atualização, incluindo problemas de colisão, IA de inimigos e travamentos em certas áreas.</p>
      <p>Também ajustamos inconsistências em efeitos visuais e animações de ataque.</p>
      <p>Nosso objetivo é garantir que a experiência de exploração e combate seja fluida e divertida para todos.</p>
      <p>Continuaremos monitorando relatórios da comunidade para manter o jogo estável e otimizado.</p>
    `
  }
};

// Abre um post específico (e injeta conteúdo + comentários)
function openPost(button, id) {
  const post = posts[id];
  if (!post) return;

  const article = button.closest('.post');
  const view = article.querySelector('.post-view');
  const btnOpen = article.querySelector('.btn-open');
  const btnBack = article.querySelector('.btn-back');

  // Fecha todos os outros abertos
  document.querySelectorAll('.post-view').forEach(v => {
    v.style.display = 'none';
    const contentDiv = v.querySelector('.post-content');
    if (contentDiv) contentDiv.innerHTML = '';
  });
  document.querySelectorAll('.btn-open').forEach(b => b.style.display = 'inline-block');
  document.querySelectorAll('.btn-back').forEach(b => b.style.display = 'none');

  // Monta o conteúdo do post
  view.querySelector('.post-content').innerHTML = `<h3>${post.title}</h3>${post.content}`;

  // Prepara área de comentários
  const commentsList = view.querySelector('.comments-list');
  commentsList.id = 'comments-' + id;

  const form = view.querySelector('.comment-form');
  form.onsubmit = (e) => addComment(e, id);

  const nameInput = form.querySelector('input');
  const textArea = form.querySelector('textarea');
  nameInput.id = 'comment-name-' + id;
  textArea.id = 'comment-text-' + id;

  // Exibe o bloco e ajusta botões
  view.style.display = 'block';
  btnOpen.style.display = 'none';
  btnBack.style.display = 'inline-block';

  // Carrega comentários
  loadComments(id);
}

// Fecha o post quando clica em "Voltar"
function closePost(button) {
  const article = button.closest('.post');
  const view = article.querySelector('.post-view');
  const contentDiv = view.querySelector('.post-content');
  const btnOpen = article.querySelector('.btn-open');
  const btnBack = article.querySelector('.btn-back');

  if (contentDiv) contentDiv.innerHTML = '';
  view.style.display = 'none';
  btnOpen.style.display = 'inline-block';
  btnBack.style.display = 'none';
}

// Carrega comentários do localStorage
function loadComments(id) {
  const comments = JSON.parse(localStorage.getItem('comments_' + id) || '[]');
  const list = document.getElementById('comments-' + id);
  list.innerHTML = '';
  comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<div class='who'>${sanitize(c.name)}</div><div class='text'>${sanitize(c.text)}</div>`;
    list.appendChild(div);
  });
}

// Adiciona novo comentário
function addComment(e, id) {
  e.preventDefault();
  const name = document.getElementById('comment-name-' + id).value.trim();
  const text = document.getElementById('comment-text-' + id).value.trim();
  if (!name || !text) return false;

  const comments = JSON.parse(localStorage.getItem('comments_' + id) || '[]');
  comments.push({ name, text });
  localStorage.setItem('comments_' + id, JSON.stringify(comments));

  document.getElementById('comment-name-' + id).value = '';
  document.getElementById('comment-text-' + id).value = '';
  loadComments(id);
  return false;
}

// Segurança básica pra evitar HTML injection
function sanitize(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
