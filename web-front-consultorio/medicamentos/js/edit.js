window.onload = () => {
    const id = new URLSearchParams(document.location.search).get('id');
    alternarVisualizacaoElementosDinamicos();
    habilitarCarregando();
    pesquisarPorId(id);
}

function alternarVisualizacaoElementosDinamicos() {
    let elementosDinamicos = document.querySelectorAll('.dinamico');
    elementosDinamicos.forEach(elemento => {
        elemento.toggleAttribute("disabled");
    });
}

function habilitarCarregando() {
    getSpanCarregando().style.display = 'inline';
}

function desabilitarCarregando() {
    getSpanCarregando().style.display = 'none';
}

function pesquisarPorId(id) {
    const url = `https://localhost:44309/api/medicamentos/${id}`;
    pesquisar(url);
}

function pesquisar(url) {
    fetch(url)
        .then(response => {
            if (response.status === 200)
                return response.json();
            if (response.status === 404)
                return null;
            return;
        })
        .then(medicamento => {
            if (medicamento !== undefined) {
                if (medicamento !== null) {
                    injetarMedicamento(medicamento);
                    desabilitarCarregando();
                    alternarVisualizacaoElementosDinamicos();
                }
                else {
                    alert('Nenhum medicamento foi encontrado!');
                    voltar();
                }
            }
            else {
                alert('Erro interno no servidor!\nEntre em contato com o suporte!');
                voltar();
            }
        })
        .catch(() => {
            alert('Falha na requisição.\nEntre em contato com o suporte!');
            voltar();
        });
}

function injetarMedicamento(medicamento) {
    const id = getId();
    const nome = getNome();
    const dtfab = getDtFab();
    const dtvenc = getDtVenc();

    id.innerHTML = medicamento.Id;
    nome.value = medicamento.Nome;
    dtfab.value = medicamento.DataFabricacao.substr(0, 10);
    dtvenc.value = medicamento.DataVencimento !== null ? medicamento.DataVencimento.substr(0, 10) : '';
}

function alterar() {

    const id = getId();
    const nome = getNome();
    const dtfab = getDtFab();
    const dtvenc = getDtVenc();

    const medicamento = {
        id: id.innerHTML,
        nome: nome.value,
        datafabricacao: dtfab.value,
        datavencimento: dtvenc.value
    }

    if (validarDadosExibirMensagem(medicamento)) {

        const url = `https://localhost:44309/api/medicamentos/${medicamento.id}`;

        fetch(url, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(medicamento)
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Medicamento alterado com sucesso!');
                    voltar();
                } else if (response.status === 400) {
                    alert('Verifique os dados que estão sendo enviados!');
                } else if (response.status === 500) {
                    alert('Erro interno no servidor!\nEntre em contato com o suporte!');
                }
            })
            .catch(() =>
                alert('Falha na requisição.\nEntre em contato com o suporte!')
            );
    }
}

function validarDadosExibirMensagem(medicamento) {
    let msg = '';
    if (medicamento.nome === '') {
        msg += 'Nome;\n';
    }
    if (medicamento.datafabricacao === '') {
        msg += 'Data de fabricação;\n';
    }
    if (medicamento.datavencimento !== '' && medicamento.datavencimento <= medicamento.datafabricacao) {
        msg += 'Data de fabricação não pode ser maior ou igual a data de vencimento.';
    }
    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        alert(msg);
        return false;
    }

    return true;
}

function desejaExcluir() {
    const id = getId();
    if (confirm(`Deseja excluir o medicamento ${id.innerHTML}?`)) {
        excluir(id.innerHTML);
    }
}

function excluir(id) {
    const url = `https://localhost:44309/api/medicamentos/${id}`;

    fetch(url, {
        method: 'delete'
    })
        .then(response => {
            if (response.status === 200) {
                alert('Medicamento excluído com sucesso!');
                voltar();
            } else if (response.status === 404) {
                alert('Não foi possível excluir o medicamento, pois o mesmo não foi encontrado!');
                voltar();
            } else if (response.status === 500) {
                alert('Erro interno no servidor!\nEntre em contato com o suporte!');
            }
        })
        .catch(() =>
            alert('Falha na requisição.\nEntre em contato com o suporte!')
        );
}

function voltar() {
    document.location = 'index.html';
}

function getSpanCarregando() {
    return document.querySelector('#carregando');
}

function getId() {
    return document.querySelector('#id');
}

function getNome() {
    return document.querySelector('#nome');
}

function getDtFab() {
    return document.querySelector('#dtfab');
}

function getDtVenc() {
    return document.querySelector('#dtvenc');
}