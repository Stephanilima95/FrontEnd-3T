async function cadastrarContato(objetoContato) {
    console.log(objetoContato);

    const resposta = await fetch(`http://localhost:3000/contatos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(objetoContato)
});
}





async function buscarEndereco(cep) {
    if (cep.trim().length < 8) {
        alert("O campo CEP é obrigatório!");
        return false;
    }

    try {
        aguardarResposta();

    let retorno = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let dados = await retorno.json();
 document.getElementById("rua").value = dados.logradouro;
 document.getElementById("Bairro").value = dados.bairro;
 document.getElementById("Cidade").value = dados.localidade;
 document.getElementById("Estado").value = dados.estado;
    
    
} catch (error) {
    console.log(error);
}



}


function aguardarResposta() {
        document.getElementById("rua").value = "aguarde ...";
    document.getElementById("Bairro").value = "aguarde ...";
    document.getElementById("Cidade").value = "aguarde ...";
    document.getElementById("Estado").value = "aguarde ...";
    
}
    
    
    
    
    
    
    
    
    function validarFormulario(objetoContato) {
    let quantidadeErros = 0;

    let nome = document.getElementById("nome").value;

    if (nome.trim().length == 0) {
        formError("nome");
        //alert("O campo nome é obrigatório!");
        quantidadeErros++;
    } else {
        reiniciaBorda("nome");
    }

// SOBRENOME
let sobrenome = document.getElementById("sobrenome").value;

if (sobrenome.trim().length == 0) {
    formError("sobrenome");
    quantidadeErros++;
} else {
    reiniciaBorda("sobrenome");
}

if(quantidadeErros > 0) {
    alert("Preencha os campos obrigatórios!");
    quantidadeErros = 0;
}



// EMAIL
let email = document.getElementById("email").value;

if (email.trim().length == 0) {
    formError("email");
    quantidadeErros++;
} else {
    reiniciaBorda("email");
}

// +55 (pais)
let pais = document.getElementById("pais").value;

if (pais.trim().length == 0) {
    formError("pais");
    quantidadeErros++;
} else {
    reiniciaBorda("pais");
}

// DDD
let ddd = document.getElementById("ddd").value;

if (ddd.trim().length == 0) {
    formError("ddd");
    quantidadeErros++;
} else {
    reiniciaBorda("ddd");
}

// TELEFONE
let Telefone = document.getElementById("Telefone").value;

if (Telefone.trim().length == 0) {
    formError("Telefone");
    quantidadeErros++;
} else {
    reiniciaBorda("Telefone");
}

// CEP
let cep = document.getElementById("cep").value;

if (cep.trim().length == 0) {
    formError("cep");
    quantidadeErros++;
} else {
    reiniciaBorda("cep");
}

// RUA
let rua = document.getElementById("rua").value;

if (rua.trim().length == 0) {
    formError("rua");
    quantidadeErros++;
} else {
    reiniciaBorda("rua");
}

// NÚMERO
let numero = document.getElementById("numero").value;

if (numero.trim().length == 0) {
    formError("numero");
    quantidadeErros++;
} else {
    reiniciaBorda("numero");
}

// COMPLEMENTO
let complemento = document.getElementById("complemento").value;

if (complemento.trim().length == 0) {
    formError("complemento");
    quantidadeErros++;
} else {
    reiniciaBorda("complemento");
}

// BAIRRO
let Bairro = document.getElementById("Bairro").value;

if (Bairro.trim().length == 0) {
    formError("Bairro");
    quantidadeErros++;
} else {
    reiniciaBorda("Bairro");
}

// CIDADE
let Cidade = document.getElementById("Cidade").value;

if (Cidade.trim().length == 0) {
    formError("Cidade");
    quantidadeErros++;
} else {
    reiniciaBorda("Cidade");
}

// ESTADO
let Estado = document.getElementById("Estado").value;

if (Estado.trim().length == 0) {
    formError("Estado");
    quantidadeErros++;
} else {
    reiniciaBorda("Estado");
}

let Anotações = document.getElementById("Anotações").value;

if (Anotações.trim().length == 0) {
    formError("Anotações");
    quantidadeErros++;
} else {
    reiniciaBorda("Anotações");
}


    if (quantidadeErros > 0) {
        alert("Existem" + quantidadeErros + " erros no formulário!");
    }
    else {
        let objetoContato = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            pais: pais,
            ddd: ddd,
            telefone: Telefone,
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: Bairro,
            cidade: Cidade,
            estado: Estado,
            anotacoes: Anotações
        };

        let cadastrado = cadastrarContato(objetoContato);
    }
}

function formError(idCampo) {
    document.getElementById(idCampo).style.border = "2px solid red";
}

function reiniciaBorda(idCampo) {
    document.getElementById(idCampo).style.border = "transparent";
}

