const botones =  document.querySelector(".px-3")

cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  document.addEventListener('DOMContentLoaded', inicioApp);
  botones.addEventListener('click',(e)=>{

    if(e.target.classList.contains('instalar')){
        lista[lista.length-1].opc="1"
        sessionStorage.setItem('Controladores',JSON.stringify(lista));
    }else if(e.target.classList.contains('migrar')){
        lista[lista.length-1].opc="2"
        sessionStorage.setItem('Controladores',JSON.stringify(lista));
    }
    console.log(lista)
  })
}

function inicioApp(){
    const lista1 = JSON.parse(sessionStorage.getItem('Controladores'));
    lista= lista1;
}


