let pesquisa = document.querySelector(".banner__pesquisa");

pesquisa.addEventListener("keyup", (e) => {

  	if(pesquisa.value != ""){
      
		pesquisar(e);
      
    }else{
    
      	let array = document.querySelectorAll(".pesquisa__container");
      	array.forEach((element) => {
            
          	element.remove();
            
        });
    
    }
  
});

pesquisa.addEventListener("keypress", (e) => {

	if(e.key == "Enter" && pesquisa.value != ""){
    
    	window.location.href = "/Doareen/paginas/pesquisa.html?termo="+pesquisa.value;
    
    }

});

function pesquisar(e){

	let url = "https://doareen.x10.mx/api/pesquisar.php";
    let texto = pesquisa.value;
	
  	$.ajax({
    
      url: url,
      type: "POST",
      data: {texto: texto},
      success: function(response){
      
        let array_item = eval(response);
        console.log(response);
        
        let array = document.querySelectorAll(".pesquisa__container");
        let validar = false;
        
        if(array_item.length == 0){
        
          	array.forEach((element) => {
            
            	element.remove();
            
            });
        
        }else{
          console.log(array_item);
          
          array_item.forEach((element) => {
            
				array.forEach((e) => {
            
            		if(e.dataset.id != element.id_item){
                    
                      e.remove();
                    
                    }
            
            	});

                let container = document.createElement("div");
                container.className = "pesquisa__container";
                container.dataset.id = element.id_item;

                array.forEach((element2) => {

                    if(element2.dataset.id == container.dataset.id)
                        validar = true;

                });

                if(validar != true){

                container.addEventListener("click", () => {

                    localStorage.setItem("Id", element.id_item);
                    window.location.href = "/Doareen/paginas/ver-produto.html";

                });

                let imagem = document.createElement("img");
                imagem.className = "pesquisa__container-imagem";
                imagem.src = "/api/" + element.nome_imagem;

                container.appendChild(imagem);

                let dados = document.createElement("div");
                dados.className = "pesquisa__container-dados";

                let nomeProd = document.createElement("h2");
                nomeProd.className = "pesquisa__container-nome";
                nomeProd.innerHTML = element.nome_item;

                dados.appendChild(nomeProd);

                let localidade = document.createElement("h3");
                localidade.className = "pesquisa__container-localidade";
                localidade.innerHTML = element.cidade + " - " + element.uf;

                dados.appendChild(localidade);

                container.appendChild(dados);

                document.querySelector(".input__container").appendChild(container);

              }
          });
          
        }
      
      }
    
    });
  
}