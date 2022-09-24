const inputs = document.querySelectorAll(".container__input");
const botaoCadastro = document.querySelector(".container__botao");

let alertControl = 0;

botaoCadastro.addEventListener("click", pegarDados);

function pegarDados(){

    let array_dados = [];

    inputs.forEach((element) => {

        if(element.value == "" && element.id != "complemento" && element.id != "numero" && element.id != "telefone"){

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

    }else{

        array_dados.estado = document.querySelector(".input__estado").value;

        console.log(array_dados);

        validarDados(array_dados);

    }

}

function validarDados(array_dados){

    if(array_dados.senha != array_dados.repsenha){

        alert("As senhas não correspondem!");

        inputs[11].classList.add("container__input-erro");
        inputs[12].classList.add("container__input-erro");

        array_dados = [];

    }else{

        if(array_dados.senha.length < 7){

            alert("Sua senha deve ter pelo menos 7 caracteres!");
    
            inputs[11].classList.add("container__input-erro");
            inputs[12].classList.add("container__input-erro");
    
            array_dados = [];
    
        }else{
    
            inputs[11].classList.remove("container__input-erro");
            inputs[12].classList.remove("container__input-erro");

            cadastrar(array_dados);
    
        }

    }

}

function cadastrar(array_dados){

    let  url = "https://doareen-zzgi.vercel.app/api/cadastro.php";
    let json = JSON.stringify(array_dados);

    $.ajax({

        url: url,
        type: "POST",
        data: {dados: json},
        success: function(response){
            console.log(response);
            //window.location.href = "/index.html";

        },
        error: function(){

            alert("Não foi possível realizar o cadastro, tente mais tarde");

        }

    });

}