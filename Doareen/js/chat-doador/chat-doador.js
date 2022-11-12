window.onbeforeunload = () => {

	localStorage.removeItem("C_id");

}

const buscarMensagens = (url) => {

  	let id = localStorage.getItem("C_id");
  	let item = localStorage.getItem("Id");
  
	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {cliente: id, item: item, action: 3},
      	success: function(response){
          
          	document.querySelector('.mensagens').querySelectorAll('*').forEach((e) => e.remove());
          
        	let array_mensagens = eval(response);
          	let containers = [];
          
          	array_mensagens.sort(function(a, b){
              
               if (a.data_mensagem > b.data_mensagem) return 1;
               if (a.data_mensagem < b.data_mensagem) return -1;
              
            });
        	
          	array_mensagens.forEach((element) => {
            
            	if(element.recebida == 1){
                
                  	let container = document.createElement("div");
                  	container.className = "mensagem-interessado";
                  	
                  	let mensagem = document.createElement("p");
                  	mensagem.innerHTML = element.mensagem;
                  
                  	container.appendChild(mensagem);
                  
                  	containers.push(container);
                
                }else{
                
                	let container = document.createElement("div");
                  	container.className = "mensagem-dono";
                  	
                  	let mensagem = document.createElement("p");
                  	mensagem.innerHTML = element.mensagem;
                  
                  	container.appendChild(mensagem);
                  
                  	containers.push(container);
                
                }
            
            });
          
          	containers.forEach((element) =>{
            
            	document.querySelector(".mensagens").appendChild(element);
            
            });
          
        }
    
    });

}

const enviarMensagem = () => {

	let url = "https://doareen.x10.mx/api/chatDoador.php";
  	let mensagem = document.querySelector(".input").value;
  	let data = data_atual();
  	let id_cliente = localStorage.getItem("C_id");
  	let id_item = localStorage.getItem("Id");
  	document.querySelector(".input").value = "";
  
  	if(mensagem != ""){
    
    	$.ajax({
    
            url: url,
            type: "POST",
            data: {mensagem: mensagem, data: data, cliente: id_cliente, item: id_item, action: 4},
          	success: function(response){
            
            	console.log(response);
              	document.querySelector(".chat-interessado__mensagens").scrollTo(0, document.querySelector(".chat-interessado__mensagens").scrollHeight);
            
            }
    
    	});
    
    }
  
}

const buscarStatus = () => {

  	let botaoReservar = document.querySelector(".chat-doador__reservar");
    let botaoContainer = document.querySelector(".chat-doador__botoes-container");
	let url = "https://doareen.x10.mx/api/buscarStatus.php";
  	let cliente = localStorage.getItem("C_id");
  	let item = localStorage.getItem("Id");
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {item: item, id: cliente},
      	success: function(response){
        	console.log(response);
        	if(eval(response)[0] && eval(response)[0].cancelado == 0){
              
              	botaoReservar.style.display = "none";
              	botaoContainer.style.display = "block";
            
            }else if(eval(response)[0] && eval(response)[0].cancelado == 1){
            
              
              	botaoReservar.style.display = "block";
              	botaoContainer.style.display = "none";
            
            }else if(!eval(response)[0]){
            
            	botaoReservar.style.display = "block";
              	botaoContainer.style.display = "none";
            
            }
        
        }
    
    });

}

const reservar = (cancelado) => {

    let botaoReservar = document.querySelector(".chat-doador__reservar");
    let botaoContainer = document.querySelector(".chat-doador__botoes-container");
	let url = "https://doareen.x10.mx/api/reservar.php";
	let cliente = localStorage.getItem("C_id");
  	let item = localStorage.getItem("Id");
  
  	if(!cancelado){
    
    	cancelado = 'false';
    
    }
  	
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id: cliente, item: item, cancelado: cancelado},
      	success: function(response){
        	console.log(response);
          	botaoReservar.style.display = "none";
            botaoContainer.style.display = "block";
          
        	return alert("Reservado com sucesso!");
        
        }
    
    });

}

const cancelarReserva = () => {

  	let botaoReservar = document.querySelector(".chat-doador__reservar");
	let botaoContainer = document.querySelector(".chat-doador__botoes-container");
	let url = "https://doareen.x10.mx/api/cancelarReserva.php";
	let cliente = localStorage.getItem("C_id");
  	let item = localStorage.getItem("Id");
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id: cliente, item: item},
      	success: function(response){
        	console.log(response);
          	botaoReservar.style.display = "block";
            botaoContainer.style.display = "none";
          
        	return alert("Cancelado com sucesso!");
        
        }
    
    });

}

const finalizar = () => {

	let url = "https://doareen.x10.mx/api/finalizar.php";
	let cliente = localStorage.getItem("C_id");
  	let item = localStorage.getItem("Id");
  	let data = data_atual();
  
  	$.ajax({
    
    	url: url,
        type: "POST",
      	data: {id: cliente, item: item, data: data},
      	success: function(response){
        
        	console.log(response);
          	alert("Doação finalizada");
          	window.location.href = "/Doareen/paginas/meu-perfil.html";
        
        }
    
    });

}

const processaChatItem = () => {

	let url = "https://doareen.x10.mx/api/chatDoador.php";
    let id = localStorage.getItem("Id");
  
  	$.ajax({
    
    	url: url,
        type: "POST",
      	data: {id: id, action: 1},
      	success: function(response){
        
        	console.log(response);
          
          	document.querySelector(".card__imagem").src = "/api/" + eval(response)[0].nome_imagem;
          	document.querySelector(".card__titulo").innerHTML = eval(response)[0].nome_item;
          	document.querySelector(".card__descricao").innerHTML = eval(response)[0].descricao;
          
        }
    
    });
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
        data: {id: id, action: 2},
      	success: function(response){
        
        	console.log(response);
          
          	let array_interessados = eval(response);
          
          	array_interessados.forEach((element) => {
            
            	let container = document.createElement("div");
                container.className = "lista__interessado";
              	container.dataset.nome = element.nome_cliente;
              	container.addEventListener("click", () => {
                 
                	localStorage.setItem("C_id", element.id_cliente_interessado);
                  
                  	setTimeout(() => {
                    
                    	document.querySelector(".chat-interessado__mensagens").scrollTo(0, document.querySelector(".chat-interessado__mensagens").scrollHeight);
                    
                    }, 680);
                  
                  	buscarStatus();
                    
                });
              
              	let nome = document.createElement("p");
              	nome.innerHTML = element.nome_cliente;
              
              	container.appendChild(nome);
              
              	document.querySelector(".chat-doador__lista").appendChild(container);
            
            });
          
          	funcaoChat();
        
        }
    
    });
  
}

document.addEventListener("DOMContentLoaded", () => {

    let linksRodape = document.querySelectorAll(".rodape__lista-link");

    linksRodape.forEach((element) => {

        element.addEventListener("click", () => {

            localStorage.setItem("categoria", element.dataset.categoria);

        });

    });
  
  	getSessao();
  	processaChatItem();
  
  	const loop = setInterval(() => { 
      
      if(localStorage.getItem("C_id") != null){
        
      		buscarMensagens("https://doareen.x10.mx/api/chatDoador.php");
        
      }
      
    }, 500);
  
  	let input = document.querySelector(".input__enviar");
  	input.addEventListener("click", enviarMensagem);
  
  	let campo = document.querySelector(".input");

  	// Execute a function when the user presses a key on the keyboard
  	campo.addEventListener("keypress", function(event) {
    	// If the user presses the "Enter" key on the keyboard
    	if (event.key === "Enter") {
      		// Cancel the default action, if needed
      		event.preventDefault();
      		// Trigger the button element with a click
      		input.click();

    	}
  	});
  
  	let botaoCancelar = document.querySelector(".chat-doador__cancelar");
  	let botaoFinalizar = document.querySelector(".chat-doador__finalizar");
  
  	botaoCancelar.addEventListener("click", cancelarReserva);
  	botaoFinalizar.addEventListener("click", finalizar);

});

function funcaoChat(){

    const interessados = document.querySelectorAll(".lista__interessado");
    const botaoVoltar = document.querySelector(".chat-doador__voltar");
    const doador = document.querySelector(".chat-doador__doador");
    const mensagens = document.querySelector(".chat-interessado__mensagens");
    const aviso  = document.querySelector(".aviso");

    interessados.forEach((element) => {

        element.addEventListener("click", () => {

            let nomeInteressado = document.querySelector(".doador__nome");
            let botaoReservar = document.querySelector(".chat-doador__reservar");
    		let botaoContainer = document.querySelector(".chat-doador__botoes-container");
            let container = document.querySelector(".chat");
            let lista = document.querySelector(".chat-doador__lista");
            let nomeFormatado = element.dataset.nome.split(" ");

            nomeInteressado.innerText = element.dataset.nome;
            botaoReservar.innerText = "Reservar para " + nomeFormatado[0];
          	botaoReservar.onclick = ()  => {
            
            	let url = "https://doareen.x10.mx/api/verificarReserva.php";
              	let item = localStorage.getItem("Id");
              
              	$.ajax({
                
                	url: url,
                  	type: "POST",
                  	data: {item: item},
                  	success: function(response){
                    	console.log(response);
                    	if(response == 0){
                        
                        	reservar();
                        
                        }else{
                        
                        	if(confirm("Este item já foi reservado para outra pessoa. Tem certeza que quer continuar?") == true){
                            
                            	reservar('true');
                            
                            }
                        
                        }
                    
                    }
                
                });
            
            }
            
            if(window.outerWidth < 768){

                container.classList.add("chat-visivel");
                lista.classList.add("chat-doador__lista-invisivel");
                
            }else{

                doador.style.display = "flex";
                mensagens.style.display = "block";
                aviso.style.display = "none";

            }
                
        });

    });

    botaoVoltar.addEventListener("click", () => {

        let container = document.querySelector(".chat");
        let lista = document.querySelector(".chat-doador__lista");

        if(window.outerWidth < 768){

            container.classList.remove("chat-visivel");
            lista.classList.remove("chat-doador__lista-invisivel");

        }

    });

}

function getSessao(){

    let url = "https://doareen.x10.mx/api/sessao.php";

    $.ajax({

        url: url,
        type: "POST",
        success: function(response){

            let resposta = eval(response);
            if(resposta == null){

				window.location.href = "/Doareen/paginas/login.html";
              
            }else{
            
            	document.querySelector(".cabecalho__nome").innerHTML = resposta[0].nome_cliente;
            
            }

        },
        error: function(){

            console.log("Erro");

        }

    });

}

function data_atual(){

  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth();
  let ano = data.getFullYear();
  let hora = data.getHours();
  let min = data.getMinutes();

  if(min < 10 && min >= 0){
    min = "0"+min;
  }

  let seg = data.getSeconds();

  if(seg < 10 && seg >= 0){
    seg = "0"+seg;
  }

  let data_completa = ano + "-" + (mes+1) + "-" + dia + " " + hora + ":" + min + ":" + seg;

  return data_completa;

}