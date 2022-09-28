const form = document.querySelector('.form');
const submit= document.querySelector('.me-1');
const ipf = document.querySelector('#ip')
const passf = document.querySelector('#pass')
const usrf = document.querySelector('#Usr')
const emailf = document.querySelector('#email')
const Gif=document.querySelector('#gif');
const start = document.querySelector('.start')
const ncon= document.querySelector('.ControladorActual')
const reset=document.querySelector('.btn-primary')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let lista=[];

cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  document.addEventListener('DOMContentLoaded', inicioApp);
  start.addEventListener('click',(e) => { startg();});
  ipf.addEventListener('blur',validarFormulario);
  passf.addEventListener('blur',validarFormulario);
  usrf.addEventListener('blur',validarFormulario);
  emailf.addEventListener('blur',validarFormulario);
  reset.addEventListener('click',(e) => {
    e.preventDefault();
    ResetForm();
    inicioApp();
});
  submit.addEventListener('click', (e) => {
    // e.preventDefault();
      verificar();
  });
  gif();
}

function inicioApp() {
  // deshabilitar el envio
  submit.removeAttribute('href')
  if(sessionStorage.getItem('Controladores')){
    const lista1 = JSON.parse(sessionStorage.getItem('Controladores'));
    ncon.textContent=`Controlador #${lista1.length+1}`
  }else{
    ncon.textContent=`Controlador #1`
  }

}


function concat() {

  const controlador = {
      ip: ipf.value, 
      usr: usrf.value, 
      pass: passf.value, 
      email: emailf.value,
      nivel: "-",
      version: "-",
      paquetes: "-",
      ASM: "-",
      fecha: "-",
      opc: "-"
  }
  if(sessionStorage.getItem('Controladores')){
    const lista1 = JSON.parse(sessionStorage.getItem('Controladores'));
    lista= [...lista1,controlador]
    sessionStorage.setItem('Controladores',JSON.stringify(lista));
  }else{
    lista= [...lista,controlador]
    sessionStorage.setItem('Controladores',JSON.stringify(lista));
  }
}



function validarFormulario(e) {
  const mensaje = e.target.value;
  err =document.querySelector('.error')
  if(e.target.value.length > 0 ) {
      err ? err.remove(): a =0; 
      e.target.classList.add('border', 'border-success');
      e.target.classList.remove('border-danger');

  } else {
       e.target.classList.add('border', 'border-danger');
       error("Todos los campos son obligatorios");
  }

  if(this.type === 'email') {
    validarEmail(e,mensaje,err,re);
  }
  

  if(ipf.value !== '' && usrf.value  !== '' && (re.test(mensaje.toLowerCase())) && passf.value  !== ''){
    submit.setAttribute('href','/Controladores.html')
  }
  
}

function verificar(){

  if(ipf.value !== '' && usrf.value  !== '' && emailf.value !== '' && passf.value  !== ''){
    concat();
    ResetForm();
  }else{
    error("Todos los campos son obligatorios");
  }
}

function validarEmail(e,mensaje,err,re) {  
  if(re.test(mensaje.toLowerCase())) {
    err ? err.remove():
    e.target.classList.add('border', 'border-success');
    e.target.classList.remove('border-danger');
  } else {
    e.target.classList.add('border','border-danger');
    error("Email no valido");
  }
}

function error(mensaje){
  const x = document.createElement("div")
  x.innerHTML=`
  <div class="alert alert-danger fade show error danger" role="alert">
  <strong>Holy guacamole!</strong> ${mensaje}.
  </div>
  `;
  const errores = document.querySelectorAll('.error')
  if(errores.length == 0){
      const temp = form.children[3];
      temp.appendChild(x);
  }
}

function ResetForm(){
  form.reset();
  ipf.classList.remove('border', 'border-success', 'border-danger');
  usrf.classList.remove('border', 'border-success', 'border-danger');
  passf.classList.remove('border', 'border-success', 'border-danger');
  emailf.classList.remove('border', 'border-success', 'border-danger');
  err =document.querySelector('.error')
  err ? err.remove(): a =0;
}

function startg(){
  Gif.removeAttribute("src")
  Gif.setAttribute("src","/Images/toshiba.gif") 
  setTimeout(() => {
    Gif.removeAttribute('src')
    Gif.setAttribute("src","/Images/toshiba.png") 
  }, 4800);
  
}

function gif(){
  setInterval(() => {
    setTimeout(() => {
      Gif.removeAttribute('src')
      Gif.setAttribute("src","/Images/toshiba.png")   
    }, 4800);
    Gif.removeAttribute("src")
    Gif.setAttribute("src","/Images/toshiba.gif") 
  }, 12000);
}
