const buscarMensagens = (url) => {

  	let id = localStorage.getItem("D_id");
  	let item = localStorage.getItem("Id");
  
	$.ajax({
    
    	url: url,
      	type: "POST",
      	data: {id: id, item: item, action: 2},
      	success: function(response){
          
        	//console.log(response);
          
          	document.querySelector('.mensagens').querySelectorAll('*').forEach((e) => e.remove());
          
        	let array_mensagens = eval(response);
          	let containers = [];
          
          	array_mensagens.sort(function(a, b){
              
               if (a.data_mensagem > b.data_mensagem) return 1;
               if (a.data_mensagem < b.data_mensagem) return -1;
              
            });
        	
          	array_mensagens.forEach((element) => {
            
            	if(element.recebida != 1){
                
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

	let url = "https://doareen.x10.mx/api/chatInteressado.php";
  	let mensagem = document.querySelector(".input").value;
  	let data = data_atual();
  	let id_cliente = localStorage.getItem("D_id");
  	let id_item = localStorage.getItem("Id");
  	document.querySelector(".input").value = "";
  
  	if(mensagem != ""){
    
    	$.ajax({
    
            url: url,
            type: "POST",
            data: {mensagem: mensagem, data: data, id: id_cliente, item: id_item, action: 3},
          	success: function(response){
            
            	console.log(response);
              	document.querySelector(".chat-interessado__mensagens").scrollTo(0, document.querySelector(".chat-interessado__mensagens").scrollHeight);
            
            }
    
    	});
    
    }
  
}

const processaChatItem = () => {

	let url = "https://doareen.x10.mx/api/chatInteressado.php";
    let id = localStorage.getItem("D_id");
  	let item = localStorage.getItem("Id");
  
  	$.ajax({
    
    	url: url,
        type: "POST",
      	data: {id: id, item: item, action: 1},
      	success: function(response){
        
        	console.log(response);
          
          	document.querySelector(".card__imagem").src = "/api/" + eval(response)[0].nome_imagem;
          	document.querySelector(".card__titulo").innerHTML = eval(response)[0].nome_item;
          	document.querySelector(".card__descricao").innerHTML = eval(response)[0].descricao;
          	document.querySelector(".doador__nome").innerHTML = eval(response)[0].nome_cliente;
          
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
  
  	processaChatItem();
  
  	const loop = setInterval(() => { 
      
      if(localStorage.getItem("D_id") != null){
        
      		buscarMensagens("https://doareen.x10.mx/api/chatInteressado.php");
        
      }
      
    }, 500);
  
  	setTimeout(()  => {
    
    	document.querySelector(".chat-interessado__mensagens").scrollTo(0, document.querySelector(".chat-interessado__mensagens").scrollHeight);
    
    }, 680);
  
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
          	campo.value = "";
    	}
  	});

});

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