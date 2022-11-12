document.addEventListener("DOMContentLoaded", getItens);

function getItens(){

	let url = "https://doareen.x10.mx/api/itensInteressados.php";
  
  	$.ajax({
    
    	url: url,
      	type: "POST",
      	success: function(response){
        
        	let array_itens;
          	console.log(response);
          	if(response != 0){
            
            	array_itens = eval(response);
            
            }
          
          	array_itens.forEach((element) => {
            
            	let container = document.createElement("div");
              	container.className = "produtos-interessados";
              
              	if(window.outerWidth < 768){
                
                	container.addEventListener("click", () => {
                    	
                        localStorage.setItem("Id", element.id_item);
                  		localStorage.setItem("D_id", element.id_cliente_dono);
                    	window.location.href = "/Doareen/paginas/chat-interessado.html";
                                        
                    });
                
                }
              	
              	let containerInformacoes = document.createElement("div");
     			containerInformacoes.className = "interessados__informacoes";
              
              	container.appendChild(containerInformacoes);
              
              	let imagem = document.createElement("img");
              	imagem.className = "card__imagem";
              	imagem.src = "/api/" + element.nome_imagem;
              
              	containerInformacoes.appendChild(imagem);
              
                let containerDados = document.createElement("div");
              	containerDados.className = "card__container";
              	
              	containerInformacoes.appendChild(containerDados);
              
              	let titulo = document.createElement("h2");
              	titulo.className = "card__titulo";
              	titulo.innerHTML = element.nome_item;
              
              	containerDados.appendChild(titulo);
              
              	let botaoDesistir = document.createElement("div");
              	botaoDesistir.className = "card__desistir card__desistir-mob";
              	botaoDesistir.innerHTML = "Desistir do item";
              	botaoDesistir.addEventListener("click", () => {
                
                	let url = "https://doareen.x10.mx/api/desistir.php";
                  	let item = element.id_item;
                  	let dono = element.id_cliente_dono;
                  
                  	if(confirm("Deseja realmente desistir do item?") == true){
                    
                    	$.ajax({
                        
                        	url: url,
                          	type: "POST",
                          	data: {item: item, dono: dono},
                          	success: function(response){
                            
                            	window.location.href = "/Doareen/paginas/meus-interesses.html";
                            
                            }
                        
                        });
                    
                    }
                
                });
              
              	if(window.outerWidth < 768){
                  
                  	botaoDesistir.classList.remove("card__desistir");
                	containerDados.appendChild(botaoDesistir);
                  
                }
              
              	let descricao = document.createElement("p");
              	descricao.className = "card__descricao";
              	descricao.innerHTML = element.descricao;
              
              	containerDados.appendChild(descricao);
              
              	let containerChat = document.createElement("div");
              	containerChat.className = "card__chat";
              
              	container.appendChild(containerChat);
              
              	let botaoChat = document.createElement("a");
              	botaoChat.href = "/Doareen/paginas/chat-interessado.html";
              	botaoChat.className = "card__botao-chat";
              	botaoChat.innerHTML = "Acessar Chat";
              	botaoChat.addEventListener("click", () => {
                
                	localStorage.setItem("Id", element.id_item);
                  	localStorage.setItem("D_id", element.id_cliente_dono);
                
                });
              
              	containerChat.appendChild(botaoChat);
              
              	if(window.outerWidth >= 768){
                  
                  	botaoDesistir.classList.remove("card__desistir-mob");
                	containerChat.appendChild(botaoDesistir);
                  
                }
              
              	let icone = document.createElement("img");
              	icone.src = "/Doareen/img/send.svg";
              	icone.alt = "Acessar Chat";
              
              	botaoChat.appendChild(icone);
              
              	
              
              	document.querySelector(".secao-itens__container").appendChild(container);
              
            });
        
        }
    
    });

}