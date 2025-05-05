function verificarStatusVencimento(dataVencimentoStr) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vencimento = new Date(dataVencimentoStr);
    vencimento.setHours(0, 0, 0, 0);

    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDias = diffTime / (1000 * 60 * 60 * 24);

    if (diffDias < 0) return "vencido";
    if (diffDias <= 7) return "quase";
    return "ok";
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
            const status = verificarStatusVencimento(item.vencimento);
            if (status === "vencido" || status === "quase") {
                const alimento = dados.alimentos.find(a => a.id === item.alimentoId);
                if (!alimento) return;

                const statusTexto = status === "vencido"
                    ? `<p class="card-text text-danger font-weight-bold">⚠️ VENCIDO</p>`
                    : `<p class="card-text text-warning font-weight-bold">⚠️ Vencendo em breve</p>`;

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
