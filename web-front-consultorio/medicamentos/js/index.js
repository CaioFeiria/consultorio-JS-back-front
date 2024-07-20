/*window.onload = () => {
    document.querySelector('#btnPesquisar').onclick = pesquisar;
}*/

document.querySelector('#btnPesquisar').onclick = definirPesquisa;

function definirPesquisa() {

    limparMedicamentos();

    let id = getId().value;
    let nome = getNome().value;

    if (id !== '') {
        pesquisarPorId(id);
        return;
    }

    if (nome !== '') {
        pesquisarPorNome(nome);
        return;
    }

    pesquisarTodos();
}

function pesquisarPorId(id) {
    const url = `https://localhost:44309/api/medicamentos/${id}`;
    pesquisar(url);
}

function pesquisarPorNome(nome) {
    const url = `https://localhost:44309/api/medicamentos?nome=${nome}`;
    pesquisar(url);
}

function pesquisarTodos() {
    const url = `https://localhost:44309/api/medicamentos`;
    pesquisar(url);
}

function pesquisar(url) {
    fetch(url)
        .then(response => {
            if (response.status === 200)
                return response.json();
            if (response.status === 404)
                return [];
            return;
        })
        .then(medicamentos => {
            if (medicamentos !== undefined) {

                if (!Array.isArray(medicamentos))
                    medicamentos = [medicamentos]

                if (medicamentos.length !== 0)
                    injetarMedicamentos(medicamentos);
                else
                    alert('Nenhum medicamento foi encontrado!');
            }
            else
                alert('Erro interno no servidor!\nEntre em contato com o suporte!');
        })
        .catch(() =>
            alert('Falha na requisição.\nEntre em contato com o suporte!')
        );
}

function novo() {
    document.location = 'create.html';
}

function limparMedicamentos() {
    getTabela().innerHTML = '';
}

function injetarMedicamentos(medicamentos) {
    let corpoTabela = '';
    medicamentos.forEach(medicamento => {
        corpoTabela +=
            `<tr class="trMedicamento">
        <td><a href="./edit.html?id=${medicamento.Id}">${medicamento.Id}</a></td>
        <td>${medicamento.Nome}</td>
        <td>${new Date(medicamento.DataFabricacao).toLocaleDateString()}</td>
        <td>${medicamento.DataVencimento === null ? "" : new Date(medicamento.DataVencimento).toLocaleDateString()}</td>
        </tr>`;
    });
    getTabela().innerHTML = corpoTabela;
}


function getNome() {
    return document.querySelector('#nome');
}

function getId() {
    return document.querySelector('#id');
}

function getTabela() {
    return document.querySelector("[data-list]");
}

/*
function getDataPTBR(date){
    let ano = date.substr(0,4);
    let mes = date.substr(5,2);
    let dia = date.substr(8,2);
    return `${dia}/${mes}/${ano}`;
}*/