// js/script.js
async function carregarAulas() {
    try {
        const resposta = await fetch('data/aulas.json');
        const dados = await resposta.json();
        
        atualizarVersao(dados.versao, dados.ultima_atualizacao);
        renderizarAulas(dados.linguagens);
        
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        document.getElementById('conteudo-aulas').innerHTML = 
            '<p style="color: red;">Erro ao carregar aulas. Verifique o arquivo JSON.</p>';
    }
}

function atualizarVersao(versao, data) {
    const versionSpan = document.getElementById('versao-release');
    const dataSpan = document.getElementById('ultima-atualizacao');
    if (versionSpan) versionSpan.textContent = `release: v${versao}`;
    if (dataSpan) dataSpan.textContent = data;
}

function renderizarAulas(linguagens) {
    const container = document.getElementById('conteudo-aulas');
    container.innerHTML = '';
    
    linguagens.forEach(linguagem => {
        const secao = document.createElement('section');
        secao.className = 'linguagem';
        
        const titulo = document.createElement('h2');
        titulo.innerHTML = `${linguagem.icone} ${linguagem.nome}`;
        secao.appendChild(titulo);
        
        const aulasDiv = document.createElement('div');
        aulasDiv.className = 'aulas';
        
        linguagem.aulas.forEach(aula => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const statusText = {
                'concluida': '✅ concluída',
                'em_andamento': '⏳ em andamento',
                'pendente': '⭘ pendente'
            }[aula.status] || aula.status;
            
            card.innerHTML = `
                <div class="card-header">
                    <span class="titulo-aula">${aula.titulo}</span>
                    <span class="data">${aula.data || 'data não definida'}</span>
                </div>
                <div class="resumo">${aula.resumo}</div>
                <span class="status">${statusText}</span>
            `;
            
            aulasDiv.appendChild(card);
        });
        
        secao.appendChild(aulasDiv);
        container.appendChild(secao);
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarAulas);
