document.addEventListener("DOMContentLoaded", getSessao);


function getSessao(){

    let url = "https://doareen.herokuapp.com/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            console.log(resposta);
            if(resposta != null){

                document.querySelectorAll(".cabecalho__lista")[1].style.display = "none";
                document.querySelector(".cabecalho__nome").classList.remove("cabecalho__nome-especifico");
                document.querySelector(".cabecalho__nome").innerHTML = resposta[0].nome_cliente;

            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}

let btSelecionar = document.querySelector(".campos__input-botao");
let btInput = document.querySelector(".campos__input-arquivo");
let btPublicar = document.querySelector(".botao__publicar");

btSelecionar.addEventListener("click", () => {

    btInput.click();

});

btInput.addEventListener("change", getImagem);

function getImagem(){

    let files = document.querySelector(".campos__input-arquivo").files;

    if(files.length > 0){

        let formData = new FormData();

        formData.append("file", files[0]);

        let url = "https://doareen.herokuapp.com/api/exibirImagem.php";

        $.ajax({

            url: url,
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            success: function(response){

                if(response == 1){

                    let filename = btInput.files[0].name;

                    document.querySelector("#imagem").src = "/api/img_exibicao_prod/"+filename;

                }else{
                    console.log(response);
                    alert("Formato ou nome do arquivo inválido");

                }

            },
            error: function(){

                alert("Houve um erro em nosso site, tente novamente mais tarde");

            }

        })

    }else{

        alert("Escolha um arquivo!");

    }

}