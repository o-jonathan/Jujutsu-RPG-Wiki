// Carregar dados JSON dinamicamente
async function carregarDados(tipo) {
  const res = await fetch(`../data/${tipo}.json`);
  const dados = await res.json();

  const container = document.getElementById('conteudo');
  container.innerHTML = '';

  dados.forEach(el => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      ${el.imagem ? `<img src="${el.imagem}" alt="${el.nome}">` : ''}
      <h3>${el.nome}</h3>
      ${el.cla ? `<p><strong>Clã:</strong> ${el.cla}</p>` : ''}
      ${el.tecnica ? `<p><strong>Técnica:</strong> ${el.tecnica}</p>` : ''}
      ${el.descricao ? `<p>${el.descricao}</p>` : ''}
    `;
    container.appendChild(div);
  });
  
}
