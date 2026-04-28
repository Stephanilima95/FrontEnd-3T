async function calcular() {
    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (nome.trim().length == 0 || isNaN(altura) || isNaN(peso)) {
        alert("Preencha todos os campos");
        return;
    }

    const valorIMC = calcularIMC(peso, altura);
    const IMC = valorIMC.toFixed(2);
    const textoSituacao = gerarSituacao(valorIMC);

    const objIMC = {
        nome,
        altura,
        peso,
        IMC,
        situacao: textoSituacao
    };

    const dadosGravados = await cadastrarNaAPI(objIMC);

    if ("error" in dadosGravados) {
        alert(dadosGravados.error);
    } else {
        carregarDados();
    }
}

//  BUSCAR
async function buscarDados() {
    try {
        const resposta = await fetch("http://localhost:3000/imc");
        const dados = await resposta.json();

        dados.sort((a, b) =>
            a.nome.localeCompare(b.nome, { sensitivity: 'base' })
        );

        document.getElementById("cadastro").innerHTML = "";

        dados.forEach(item => {
            mostrarNaTela(item);
        });

    } catch (erro) {
        console.log("Erro ao buscar:", erro);
    }
}

function carregarDados() {
    buscarDados();
}

// CADASTRAR
async function cadastrarNaAPI(objCadastro) {
    try {
        const retorno = await fetch("http://localhost:3000/imc", {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        return await retorno.json();

    } catch (error) {
        console.log(error);
        return { error: "Problemas para gravar na API" };
    }
}



function mostrarNaTela(objCadastro) {
    document.getElementById("cadastro").innerHTML += `
    <tr>
        <td>${objCadastro.nome}</td>
        <td>${objCadastro.altura}</td>
        <td>${objCadastro.peso}</td>
        <td>${objCadastro.IMC}</td>
        <td>${objCadastro.situacao}</td>
    </tr>`;
}


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function gerarSituacao(imc) {
    if (imc < 16) return "Magreza grave";
    else if (imc < 17) return "Magreza moderada";
    else if (imc < 18.5) return "Magreza leve";
    else if (imc < 25) return "Saudável";
    else if (imc < 30) return "Sobrepeso";
    else if (imc < 35) return "Obesidade grau I";
    else if (imc < 40) return "Obesidade grau II";
    else return "Obesidade grau III";
}