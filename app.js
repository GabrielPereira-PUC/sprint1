const dados = {
    "alimentos": [
      {
        "id": 1,
        "nome": "banana",
        "tipo": "prata",
        "imagem": "banana-prata.png",
        "categoria": 1
      },
      {
        "id": 2,
        "nome": "batata",
        "tipo": "inglesa",
        "imagem": "batata-inglesa.png",
        "categoria": 2
      },
      {
        "id": 3,
        "nome": "alface",
        "tipo": "americana",
        "imagem": "alface-americana.png",
        "categoria": 3
      }
    ],
    "ambientes": [
      {
        "id": 1,
        "nome": "Geladeira",
        "tipo": 1,
        "imagem": "geladeira.png",
        "itens": [
          {
            "alimentoId": 1,
            "quantidade": 5,
            "vencimento": "2025-02-12",
            "cadastro": "2025-02-05"
          },
          {
            "alimentoId": 3,
            "quantidade": 2,
            "vencimento": "2025-02-15",
            "cadastro": "2025-02-10"
          }
        ]
      },
      {
        "id": 2,
        "nome": "Despensa",
        "tipo": 2,
        "imagem": "despensa.png",
        "itens": [
          {
            "alimentoId": 2,
            "quantidade": 10,
            "vencimento": "2025-03-10",
            "cadastro": "2025-02-01"
          }
        ]
      },
      {
        "id": 3,
        "nome": "Freezer",
        "tipo": 1,
        "imagem": "freezer.png",
        "itens": [
          {
            "alimentoId": 2,
            "quantidade": 4,
            "vencimento": "2025-06-01",
            "cadastro": "2025-01-15"
          }
        ]
      }
    ],
    "listasDeCompra": [
      {
        "id": 1,
        "nome": "Lista Casa",
        "itens": [
          {
            "alimentoId": 1,
            "quantidade": 5
          },
          {
            "alimentoId": 2,
            "quantidade": 2
          }
        ]
      },
      {
        "id": 2,
        "nome": "Lista Restaurante",
        "itens": [
          {
            "alimentoId": 3,
            "quantidade": 4
          }
        ]
      },
      {
        "id": 3,
        "nome": "Lista Churrasco",
        "itens": [
          {
            "alimentoId": 1,
            "quantidade": 1
          },
          {
            "alimentoId": 3,
            "quantidade": 2
          }
        ]
      }
    ],
    "categoriaAlimento": [
      {
        "id": 0,
        "categoria": "Outros"
      },
      {
        "id": 1,
        "categoria": "Fruta"
      },
      {
        "id": 2,
        "categoria": "Legume"
      },
      {
        "id": 3,
        "categoria": "Vegetal"
      },
      {
        "id": 4,
        "categoria": "Carne Bovina"
      },
      {
        "id": 5,
        "categoria": "Carne Suína"
      },
      {
        "id": 6,
        "categoria": "Aves"
      },
      {
        "id": 7,
        "categoria": "Peixes e Frutos do Mar"
      },
      {
        "id": 8,
        "categoria": "Soja e Derivados"
      },
      {
        "id": 9,
        "categoria": "Laticínio"
      },
      {
        "id": 10,
        "categoria": "Grãos e Cereais"
      }
    ],
    "tipoAmbiente": [
      {
        "id": 0,
        "tipo": "Outros"
      },
      {
        "id": 1,
        "tipo": "Refrigeração"
      },
      {
        "id": 2,
        "tipo": "Seco"
      },
      {
        "id": 3,
        "tipo": "Congelado"
      }
    ],
    "alimentos-vencendo": [
      {
        "ambienteId": 1,
        "alimentoId": 1,
        "alimentoImagem": "banana-prata.png",
        "quantidade": 5,
        "vencimento": "12/02",
        "cadastro": "10/02"
      }
    ]
  };

function isVencendoEm7Dias(dataVencimentoStr) {
    const hoje = new Date();
    const vencimento = new Date(dataVencimentoStr);
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDias = diffTime / (1000 * 60 * 60 * 24);
    return diffDias <= 7;
}

function formatarData(dataStr) {
    const data = new Date(dataStr);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}



function mostrarAlimentosVencendo() {
    const container = document.getElementById('cartoes-container');
    container.innerHTML = ''; 

    dados.ambientes.forEach(ambiente => {
        ambiente.itens.forEach(item => {
            if (isVencendoEm7Dias(item.vencimento)) {
                const alimento = dados.alimentos.find(a => a.id === item.alimentoId);

                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';

                card.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <img src="imagens/${alimento.imagem}" 
                             class="card-img-top" 
                             alt="${alimento.nome}" 
                             style="width: 50%; height: auto; display: block; margin: 0 auto; object-fit: contain;">
                        <div class="card-body">
                            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; text-align: center; margin-bottom: 10px;">
                                <h5 class="card-title">${alimento.nome}</h5>
                            </div>
                            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; text-align: center; margin-bottom: 10px;">
                                <p class="card-text">Tipo: ${alimento.tipo}</p>
                            </div>
                            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; text-align: center; margin-bottom: 10px;">
                                <p class="card-text">Ambiente: ${ambiente.nome}</p>
                            </div>
                            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; text-align: center; margin-bottom: 10px;">
                                <p class="card-text">Quantidade: ${item.quantidade}</p>
                            </div>
                            <div style="border: 1px solid #ccc; padding: 8px; border-radius: 5px; background-color: #f9f9f9; text-align: center;">
                                <p class="card-text text-danger">Vencimento: ${formatarData(item.vencimento)}</p>
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
