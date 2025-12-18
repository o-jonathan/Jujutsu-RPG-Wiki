// Carregar dados JSON dinamicamente
async function carregarDados(tipo) {
  const res = await fetch(`data/${tipo}.json`);
  const dados = await res.json();

  const container = document.getElementById('conteudo');
  container.innerHTML = '';

  dados.forEach(el => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('sheet');
    div.classList.add('hover-up');
    div.innerHTML = `
      "<img src="./assets/${el.imagem}" alt="${el.nome}" onerror="this.onerror=null; this.src='./assets/placeholder.jpg';">"
      <h3>${el.nome}</h3>
      ${el.cla ? `<p><strong>Clã:</strong> ${el.cla}</p>` : ''}
      ${el.tecnica ? `<p><strong>Técnica:</strong> ${el.tecnica}</p>` : ''}
      <hr>
      ${el.descricao ? `<p class="desc">${el.descricao}</p>` : ''}
    `;
    container.appendChild(div);
  });
  
}

function sbCarregar(dados) {

  const container = document.getElementById('conteudo');
  container.innerHTML = '';

  dados.forEach(el => {
    const div = document.createElement('div');

    div.id = `${el.tipo}-${el.id}`;
    div.classList.add('card', 'sheet', 'hover-up');

    const imagem = el.nome
    .toLowerCase()
    .split(' ')[0]
    .replace('ō', 'o')
    +'.jpg';

    div.innerHTML = `
      <img src="https://brffbxweqoifznvxpgtc.supabase.co/storage/v1/object/public/characters/${imagem}" alt="${el.nome}" onerror="this.onerror=null; this.src='./assets/placeholder.jpg';">
      <h3>${el.nome}</h3>
      ${el.cla ? `<p><strong>Clã:</strong> ${el.cla}</p>` : ''}
      ${el.tecnica ? `<p><strong>Técnica:</strong> ${el.tecnica}</p>` : ''}
      <hr>
      ${el.descricao ? `<p class="desc">${el.descricao}</p>` : ''}
    `;
    container.appendChild(div);
  });
}