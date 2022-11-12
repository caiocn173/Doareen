document.addEventListener("DOMContentLoaded", getSessao);

let linksRodape = document.querySelectorAll(".rodape__lista-link");

linksRodape.forEach((element) => {

	element.addEventListener("click", () => {
    
    	localStorage.setItem("categoria", element.dataset.categoria);
    
    });

});

function getSessao(){

    let url = "https://doareen.x10.mx/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            if(resposta != null){

                document.querySelector(".cabecalho__nome").innerHTML = resposta[0].nome_cliente;

            }else{
            
            	window.location.href = "/Doareen/paginas/login.html";
            
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

        let url = "https://doareen.x10.mx/api/exibirImagem.php";

        $.ajax({

            url: url,
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            success: function(response){
				console.log(response);
                if(response == 1){

                    let filename = btInput.files[0].name;

                    document.querySelector("#imagem").src = "/api/img_exibicao_prod/"+filename;

                }else{
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