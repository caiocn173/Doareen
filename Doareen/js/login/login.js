const inputs = document.querySelectorAll(".container__input");
const botaoLogin = document.querySelector(".login__botao");

botaoCadastro.addEventListener("click", pegarDadosLogin);

function pegarDadosLogin(){

    let array_dados = new Object();
    let alertControl = 0;

    inputs.forEach((element) => {

        if(element.value == ""){

            alertControl++;
            
            element.classList.add("container__input-erro");

        }else{

            let idElemento = element.id;

            array_dados[idElemento] = element.value;

            element.classList.remove("container__input-erro");

        }

    });

    if(alertControl > 0){

        alert("Um ou mais campos não foram preenchidos!");

        array_dados = [];
        alertControl = 0;

    }else{

        console.log(array_dados);

        validarDadosLogin(array_dados);

    }

}

function validarDadosLogin(array_dados){

    let  url = "https://doareen.herokuapp.com/api/login.php";
    let json = JSON.stringify(array_dados);

    $.ajax({

        url: url,
        type: "POST",
        data: {dados: json},
        success: function(response){

            if(response == 1){

                window.location.href = "/Doareen/paginas/index.html";

            }else{

                alert("Email ou senha incorretos");

            }

        },
        error: function(){

            alert("Não foi possível realizar o login, tente mais tarde");

        }

    });
    
}