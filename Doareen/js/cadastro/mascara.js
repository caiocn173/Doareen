function mascara(i,t){
 
     var v = i.value;
  
     if(isNaN(v[v.length-1])){
        i.value = v.substring(0, v.length-1);
        return;
     }
 
     if(t == "cpf"){
       i.setAttribute("maxlength", "14");
       if (v.length == 3 || v.length == 7) i.value += ".";
       if (v.length == 11) i.value += "-";
    }
 
     if(t == "cep"){
         i.setAttribute("maxlength", "9");
         if (v.length == 5) i.value += "-";
      }
 
      if(t == "tel"){
         if(v[0] == 9){
            i.setAttribute("maxlength", "13");
            if (v.length == 5) i.value += "-";
         }else{
            i.setAttribute("maxlength", "12");
            if (v.length == 7) i.value += "-";
         }
      }
  }