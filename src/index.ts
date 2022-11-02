let rua = document.querySelector("#rua") as HTMLElement;
let bairro = document.querySelector("#bairro") as HTMLElement;
let cidade = document.querySelector("#cidade") as HTMLElement;
let uf = document.querySelector("#uf") as HTMLElement;
let ibge = document.querySelector("#ibge") as HTMLElement;

function limpa_formulario_cep() {
  //Limpa valores do formulario de cep.
  rua.innerHTML = "";
  bairro.innerHTML = "";
  cidade.innerHTML = "";
  uf.innerHTML = "";
  ibge.innerHTML = "";
}

function meu_callback(conteudo: any) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    rua = conteudo.logradouro;
    bairro = conteudo.bairro;
    cidade = conteudo.localidade;
    uf = conteudo.uf;
    ibge = conteudo.ibge;
  } //end if.
  else {
    //CEP nao Encontrado.
    limpa_formulario_cep();
    alert("CEP nao encontrado.");
  }
}

function pesquisacep(valor: string) {
  //Nova variavel "cep" somente com dígitos.
  const cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressao regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      rua.innerHTML = "...";
      bairro.innerHTML = "...";
      cidade.innerHTML = "...";
      uf.innerHTML = "...";
      ibge.innerHTML = "...";

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
