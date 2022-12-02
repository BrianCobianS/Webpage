const form = document.querySelector('.form');
const cform = document.querySelector('.checkform');
const submit= document.querySelector('.me-1');
const ipf = document.querySelector('#ip')
const passf = document.querySelector('#pass')
const usrf = document.querySelector('#Usr')
const emailf = document.querySelector('#email')
const Gif=document.querySelector('#gif');
const start = document.querySelector('.start')
const ncon= document.querySelector('.ControladorActual')
const reset=document.querySelector('.btn-primary')
const check=document.querySelector('.check')
const ipc=document.querySelector('.ipc')
const passc=document.querySelector('.passc')
const usrc=document.querySelector('.usrc')
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
  ipc.addEventListener('blur',validarFormularioch);
  passc.addEventListener('blur',validarFormularioch);
  usrc.addEventListener('blur',validarFormularioch);
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
  check.addEventListener('click', (e) => {
    // e.preventDefault();
      verificarcheck();
  });
}

function inicioApp() {
  // deshabilitar el envio
  submit.removeAttribute('href')
  if(sessionStorage.getItem('Controladores')){
    const lista1 = JSON.parse(sessionStorage.getItem('Controladores'));
    ncon.textContent=`Controller #${lista1.length+1}`
  }else{
    ncon.textContent=`Controller #1`
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
       error("All fields are required");
  }

  if(this.type === 'email') {
    validarEmail(e,mensaje,err,re);
  }

  if(ipf.value !== '' && usrf.value  !== '' && (re.test(mensaje.toLowerCase())) && passf.value  !== ''){
    submit.setAttribute('href','/Controladores.html')
  }
  
}


function validarFormularioch(e) {
  err =document.querySelector('.error1')
  if(e.target.value.length > 0 ) {
      err ? err.remove(): a =0; 
      e.target.classList.add('border', 'border-success');
      e.target.classList.remove('border-danger');

  } else {
       e.target.classList.add('border', 'border-danger');
       errorch("All fields are required");
  }
  
}

function verificar(){

  if(ipf.value !== '' && usrf.value  !== '' && emailf.value !== '' && passf.value  !== ''){
    concat();
    ResetForm();
  }else{
    error("All fields are required");
  }
}

function verificarcheck(){

  if(ipc.value !== '' && usrc.value  !== '' && passc.value  !== ''){
    check.disabled = true
    // concat();
    // ResetForm();
    limpiarHTML(cform)
    const x = document.createElement("div")
    x.classList.add('d-flex')
    x.classList.add('justify-content-center')
    x.classList.add('m-5')
    x.innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    // setTimeout(() => {
    //   x.remove();
    // }, 5000);
    cform.appendChild(x)
    const checkcontroller = {
      ip: ipc.value, 
      usr: usrc.value, 
      pass: passc.value
    }
    const data={checkcontroller}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://10.89.182.86:4000/ML',options)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          check.disabled = false
          x.remove();
          if(data.error){
            const x = document.createElement("div")
            x.innerHTML=`
            <div class="alert alert-danger fade show error1 danger mt-3 mb-3" role="alert">
            <strong style="color: white;">UNREACHABLE!</strong> The controller <strong style="color: white;"> ${checkcontroller.ip}</strong>  can't be reach.
            </div>
            `;
            const errores = document.querySelectorAll('.error1')
            if(errores.length == 0){
              cform.appendChild(x);
            }
          }else{
            printdata(data);
          }
        })
        .catch((error) => {
          check.disabled = false
          console.log('Error:', error);
          x.remove();
          const msg = document.createElement("div")
          msg.innerHTML=`
          <div class="alert alert-danger fade show error1 danger mt-3 mb-3" role="alert">
          <strong style="color: white;">Connection failed!</strong> The server couldn't be reach.
          </div>
          `;
          const errores = document.querySelectorAll('.error1')
          if(errores.length == 0){
            cform.appendChild(msg);
          }
        });
  }else{
    errorch("All fields are required");
  }
}

function printdata(data){
  console.log(data)
  const {versiones}=data
  console.log(versiones)
  var type=''
  const x = document.createElement("div")
  if (versiones.Maintenance.ACE3D != 'None' || versiones.Backup.ACE3D != 'None'){
    if (versiones.Maintenance.ACE3D == 'None'){type=versiones.Backup}else{type=versiones.Maintenance}
    x.innerHTML=`
      <div class="coments mb-3">
        <div class="container">
            <p><strong style="color: white">Controller:</strong> </p>
            <div class="row">
                <div class="col-lg-6">
                    <p><strong style="color: white">Currer  levels:</strong> </p>
                    <p><strong style="color: white">ACE 3D : ${versiones.Current.ACE3D}</strong> </p>
                    <p><strong style="color: white">ACE EPS : ${versiones.Current.EPS}</strong> </p>
                    <p><strong style="color: white">TCXpay : ${versiones.Current.Txcpay}</strong> </p>
                </div>
                <div class="col-lg-6">
                    <p><strong class="text-center" style="color: white">${type.type}    :</strong> </p>
                    <p><strong style="color: white">ACE 3D : ${type.ACE3D}</strong> </p>
                    <p><strong style="color: white">ACE EPS : ${type.EPS}</strong> </p>
                    <p><strong style="color: white">TCXpay : ${type.Txcpay}</strong> </p>
                </div>
            </div>
        </div>
      </div>    
  `
  }else{
    x.innerHTML=`
    <div class="coments mb-3">
      <div class="container">
          <p><strong style="color: white">Controller:</strong> </p>
          <div class="row">
              <div class="col-lg-6">
                  <p><strong style="color: white">Currer  levels:</strong> </p>
                  <p><strong style="color: white">ACE 3D : ${versiones.Current.ACE3D}</strong> </p>
                  <p><strong style="color: white">ACE EPS : ${versiones.Current.EPS}</strong> </p>
                  <p><strong style="color: white">TCXpay: ${versiones.Current.Txcpay}</strong> </p>
              </div>
          </div>
      </div>
    </div>    
  `
  }


cform.appendChild(x)

}

function validarEmail(e,mensaje,err,re) {  
  if(re.test(mensaje.toLowerCase())) {
    err ? err.remove():
    e.target.classList.add('border', 'border-success');
    e.target.classList.remove('border-danger');
  } else {
    e.target.classList.add('border','border-danger');
    error("Invalid Email");
  }
}

function error(mensaje){
  const x = document.createElement("div")
  x.innerHTML=`
  <div class="alert alert-danger fade show error danger" role="alert">
  <strong style="color: white;">Holy guacamole!</strong> ${mensaje}.
  </div>
  `;
  const errores = document.querySelectorAll('.error')
  if(errores.length == 0){
      const temp = form.children[3];
      temp.appendChild(x);
  }
}

function errorch(mensaje){
  const x = document.createElement("div")
  x.innerHTML=`
  <div class="alert alert-danger fade show error1 danger" role="alert">
  <strong style="color: white;">Holy guacamole!</strong> ${mensaje}.
  </div>
  `;
  const errores = document.querySelectorAll('.error1')
  if(errores.length == 0){
    cform.appendChild(x);
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

function limpiarHTML(x) {
  while (x.firstChild) {
      x.removeChild(x.firstChild);
  }
}
