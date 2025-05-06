const dados = {
  alimentos: [
    {
      id: 1,
      nome: "banana",
      tipo: "prata",
      imagem: "banana-prata.png",
      categoria: 1
    },
    {
      id: 2,
      nome: "batata",
      tipo: "inglesa",
      imagem: "batata-inglesa.png",
      categoria: 2
    },
    {
      id: 3,
      nome: "alface",
      tipo: "americana",
      imagem: "alface-americana.png",
      categoria: 3
    }
  ],
  ambientes: [
    {
      id: 1,
      nome: "Geladeira",
      tipo: 1,
      imagem: "geladeira.png",
      itens: [
        {
          alimentoId: 1,
          quantidade: 5,
          vencimento: "2025-02-12",
          cadastro: "2025-02-05"
        },
        {
          alimentoId: 3,
          quantidade: 2,
          vencimento: "2025-02-15",
          cadastro: "2025-02-10"
        }
      ]
    },
    {
      id: 2,
      nome: "Despensa",
      tipo: 2,
      imagem: "despensa.png",
      itens: [
        {
          alimentoId: 2,
          quantidade: 10,
          vencimento: "2025-03-10",
          cadastro: "2025-02-01"
        }
      ]
    },
    {
      id: 3,
      nome: "Freezer",
      tipo: 1,
      imagem: "freezer.png",
      itens: [
        {
          alimentoId: 2,
          quantidade: 4,
          vencimento: "2025-06-01",
          cadastro: "2025-01-15"
        }
      ]
    }
  ]
};

function verificarStatusVencimento(dataVencimentoStr) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // Criar a data vencimento no horário local para evitar erro de fuso
  const partes = dataVencimentoStr.split('-');
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1; // mês no JS começa do zero
  const dia = parseInt(partes[2], 10);
  const vencimento = new Date(ano, mes, dia);
  vencimento.setHours(0, 0, 0, 0);

  const diffTime = vencimento.getTime() - hoje.getTime();
  const diffDias = diffTime / (1000 * 60 * 60 * 24);

  if (diffDias < 0) return "vencido";
  if (diffDias <= 7) return "quase";
  return "ok";
}

function formatarData(dataStr) {
  // Criar a data no horário local para evitar problema de fuso horário
  const partes = dataStr.split('-');
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);
  const data = new Date(ano, mes, dia);

  const diaFormat = String(data.getDate()).padStart(2, "0");
  const mesFormat = String(data.getMonth() + 1).padStart(2, "0");
  const anoFormat = data.getFullYear();
  return `${diaFormat}/${mesFormat}/${anoFormat}`;
}

function mostrarAlimentosVencendo() {
  const container = document.getElementById('cartoes-container');
  container.innerHTML = '';

  dados.ambientes.forEach(ambiente => {
    ambiente.itens.forEach(item => {
      const status = verificarStatusVencimento(item.vencimento);
      if (status === "vencido" || status === "quase") {
        const alimento = dados.alimentos.find(a => a.id === item.alimentoId);
        if (!alimento) return;

        const statusTexto = status === "vencido"
          ? `<p class="card-text text-danger font-weight-bold">⚠️ VENCIDO</p>`
          : `<p class="card-text text-warning font-weight-bold">⚠️ Vencendo em breve</p>`;

        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4';

        card.innerHTML = `
                  <img src="imagens/${alimento.imagem}" class="card-img-top" alt="${alimento.nome}">
                  <div class="texto-geral">
                      <div class="info-box">
                          <h5 class="card-title">${alimento.nome}</h5>
                      </div>
                      <div class="caixa-texto">
                          <p class="card-text">Tipo: ${alimento.tipo}</p>
                      </div>
                      <div class="caixa-texto">
                          <p class="card-text">Ambiente: ${ambiente.nome}</p>
                      </div>
                      <div class="caixa-texto">
                          <p class="card-text">Quantidade: ${item.quantidade}</p>
                      </div>
                      <div class="caixa-texto">
                          <p class="card-text">Vencimento: ${formatarData(item.vencimento)}</p>
                          ${statusTexto}
                      </div>
                  </div>
              </div>
              `;

        container.appendChild(card);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', mostrarAlimentosVencendo);