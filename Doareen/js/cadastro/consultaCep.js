function consultaCEP(){
    var cep = document.getElementById("cep").value;
    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    $.ajax({
        url: url,
        type: "GET",
        success: function (response){

            if(response.erro != "true"){

                document.getElementById("bairro").value = response.bairro;
                document.getElementById("rua").value = response.logradouro
                document.getElementById("cidade").value = response.localidade;
                document.getElementById("estado").value = response.uf;

                document.getElementById("cep").classList.remove("container__input-erro");
                document.querySelector(".container__input-texto-cep").style.display = "none";

            }else{

                document.getElementById("cep").classList.add("container__input-erro");
                document.querySelector(".container__input-texto-cep").style.display = "block";
                document.querySelector(".container__input-texto-cep").innerHTML = "CEP não localizado";

            }

        },
        error: function(){

            document.getElementById("cep").classList.add("container__input-erro");
            document.querySelector(".container__input-texto-cep").style.display = "block";
            document.querySelector(".container__input-texto-cep").innerHTML = "CEP inválido";

        }
    })
 }