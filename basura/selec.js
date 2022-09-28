const lista = JSON.parse(sessionStorage.getItem('Controladores'));

const form =  document.querySelector(".form");

cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  form.addEventListener('input',seleccion)
}

function seleccion(e){
    if(e.target.classList.contains('version')){
        lista[lista.length-1].version=e.target.value
        sessionStorage.setItem('Controladores',JSON.stringify(lista));
        console.log(lista)
    }
    if(e.target.classList.contains('nivel')){
        lista[lista.length-1].nivel=e.target.value
        sessionStorage.setItem('Controladores',JSON.stringify(lista));
        console.log(lista)
    }
    if(e.target.classList.contains('ASM')){
        lista[lista.length-1].ASM=e.target.value
        sessionStorage.setItem('Controladores',JSON.stringify(lista));
        console.log(lista)
    }
    
}

