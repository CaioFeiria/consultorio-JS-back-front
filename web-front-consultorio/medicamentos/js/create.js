function enviar() {

    const nome = document.querySelector('#nome');
    const dtfab = document.querySelector('#dtfab');
    const dtvenc = document.querySelector('#dtvenc');

    const medicamento = {
        nome: nome.value,
        datafabricacao: dtfab.value,
        datavencimento: dtvenc.value
    }

    if (validarDadosExibirMensagem(medicamento)) {

        const url = `https://localhost:44309/api/medicamentos`;

        fetch(url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(medicamento)
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Medicamento cadastrado com sucesso!');
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

function voltar() {
    document.location = 'index.html';
}