let btSelecionar = document.querySelector(".campos__input-botao");
let btInput = document.querySelector(".campos__input-arquivo");
let btPublicar = document.querySelector(".botao__publicar");

btSelecionar.addEventListener("click", () => {

    btInput.click();

});

btInput.addEventListener("change", getImagem);

btPublicar.addEventListener("click", publicar);

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

function publicar(){

    let inputs = document.querySelectorAll(".campos__input");
    let array_dados = [];

    inputs = inputs.pop();
    inputs = inputs.pop();

    inputs.forEach((element) => {

        array_dados[element.name] = element.value;

    });

    console.log(array_dados);

}