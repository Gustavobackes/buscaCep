"use strict";
let rua = document.querySelector("#rua");
let bairro = document.querySelector("#bairro");
let cidade = document.querySelector("#cidade");
let uf = document.querySelector("#uf");
let ibge = document.querySelector("#ibge");
function limpa_formulario_cep() {
    //Limpa valores do formulario de cep.
    rua.value = "";
    bairro.value = "";
    cidade.value = "";
    uf.value = "";
    ibge.value = "";
}
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        rua.value = conteudo.logradouro;
        bairro.value = conteudo.bairro;
        cidade.value = conteudo.localidade;
        uf.value = conteudo.uf;
        ibge.value = conteudo.ibge;
    } //end if.
    else {
        //CEP nao Encontrado.
        limpa_formulario_cep();
        alert("CEP nao encontrado.");
    }
}
function pesquisacep(valor) {
    //Nova variavel "cep" somente com dígitos.
    const cep = valor.replace(/\D/g, "");
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressao regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value = "...";
            bairro.value = "...";
            cidade.value = "...";
            uf.value = "...";
            ibge.value = "...";
            //Cria um elemento javascript.
            var script = document.createElement("script");
            //Sincroniza com o callback.
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
            //Insere script no documento e carrega o conteudo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep e invalido.
            limpa_formulario_cep();
            alert("Formato de CEP invalido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulario.
        limpa_formulario_cep();
    }
}
