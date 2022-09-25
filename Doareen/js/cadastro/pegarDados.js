const inputs = document.querySelectorAll(".container__input");
const botaoCadastro = document.querySelector(".container__botao");

botaoCadastro.addEventListener("click", pegarDados);

function pegarDados(){

    let array_dados = new Object();
    let alertControl = 0;

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
        alertControl = 0;

    }else{

        array_dados.estado = document.querySelector(".input__estado").value;

        console.log(array_dados);

        validarDados(array_dados);

    }

}

function validarDados(array_dados){

    if(array_dados.senha != array_dados.repsenha){

        alert("As senhas não correspondem!");

        inputs[12].classList.add("container__input-erro");
        inputs[13].classList.add("container__input-erro");

        array_dados = [];

    }else{

        if(array_dados.senha.length < 7){

            alert("Sua senha deve ter pelo menos 7 caracteres!");
    
            inputs[12].classList.add("container__input-erro");
            inputs[13].classList.add("container__input-erro");
    
            array_dados = [];
    
        }else if(array_dados.cpf.length < 14){

            alert("CPF informado não é válido");
    
            inputs[1].classList.add("container__input-erro");
    
            array_dados = [];

        }else if(array_dados.cpf.length < 9){

            alert("CEP informado não é válido");
    
            inputs[4].classList.add("container__input-erro");
    
            array_dados = [];

        }else{
    
            inputs[1].classList.remove("container__input-erro");
            inputs[4].classList.remove("container__input-erro");
            inputs[12].classList.remove("container__input-erro");
            inputs[13].classList.remove("container__input-erro");

            array_dados.cpf = array_dados.cpf.replaceAll(".", "");
            array_dados.cpf = array_dados.cpf.replace("-", "");

            array_dados.cep = array_dados.cep.replace("-", "");

            array_dados.numero = parseInt(array_dados.numero);

            array_dados.telefone = array_dados.telefone.replace("-", "");
            array_dados.telefone = parseInt(array_dados.telefone);


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

            if(response == 1){

                alert("Este cadastro já existe");

            }else{

                localStorage.setItem("clientId", reponse);

                window.location.href = "/Doareen/paginas/index.html";

            }

        },
        error: function(){

            alert("Não foi possível realizar o cadastro, tente mais tarde");

        }

    });

}