let btSelecionar = document.querySelector(".campos__input-botao");
let btInput = document.querySelector(".campos__input-arquivo");

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

                    document.querySelector("#imagem").src = "/Doareen/img_exibicao_prod/"+filename;

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