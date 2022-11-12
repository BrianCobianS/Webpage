const lista = JSON.parse(sessionStorage.getItem('Controladores'));
if(sessionStorage.getItem('Controladores')){
    var indice=lista.length
}
const temp = document.querySelector(".alert");
const controllers = document.querySelector(".table tbody")
const Agregar = document.querySelector(".parametros")
const versionv = document.querySelector(".version")
const levelv = document.querySelector(".nivel")
const calendarizar = document.querySelector('#fechacheck')
const tiempo = document.querySelector('#fecha')
const ACEP = ['#TCX', '#Common', '#PinPad']
const form = document.querySelector(".g-3");
const tabla = document.querySelector('.tabla')
const comenzar = document.querySelector("#bntjenkins")




cargarEventListeners();
function cargarEventListeners() {
     document.addEventListener('DOMContentLoaded', inicioApp);
    calendarizar.addEventListener('click', fecha)
    tabla.addEventListener('click', Deletecontroller)
    form.addEventListener('input', seleccion)
    Agregar.addEventListener('click', (e) => {
        e.preventDefault();
        parametros();
    })
    tiempo.disabled = true;
    for (let i = 0; i < ACEP.length; i++) {
        document.querySelector(ACEP[i]).disabled = true
    }
    comenzar.addEventListener('click', jenkins)
}

function seleccion(e) {
    if (e.target.classList.contains('version')) {
        obtenerdato(e.target.value);
        if (e.target.value == 'Jedi') {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = false;
            }
        } else {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = true
                document.querySelector(ACEP[i]).checked = false
            }
        }
    }
}



function inicioApp() {
    if (lista != null && lista != '') {
        let indice = lista.length
        temp.textContent = ` Estas modificando el controlador`
        const bold = document.createElement('b')
        bold.textContent = ` #${indice} IP: ${lista[indice-1].ip} `
        temp.appendChild(bold)
        Agregar.disabled = false
        comenzar.disabled=false
        temp.classList.remove('alert-danger')
        temp.classList.add('alert-warning')

        listacontroladores(0)

    } else {
        temp.textContent = ` No has agregado ningun controldor`
        temp.classList.remove('alert-warning')
        temp.classList.add('alert-danger')
        Agregar.disabled = true
        comenzar.disabled=true
    }
    
    // ../Versiones.py

}

function obtenerdato(ve){
    fetch('../Versiones.json')
      .then(respuesta  =>{
        //   console.log(respuesta)
          return respuesta.json();
      } )
      .then(resultado => {
        // console.log(resultado)
        Construirrealeses(resultado,ve);
      })  
}
function  Construirrealeses(e,ve){
    const realeses = document.querySelector('#Selectlevel')
    const Seleccione1= document.createElement('option')
    limpiarHTML(realeses);
    Seleccione1.setAttribute('value','')
    Seleccione1.textContent= 'Seleccione'
    realeses.appendChild(Seleccione1)
    console.log(e)
    for (const x in e){
        // console.log(`${x}`);
        if (ve==x){
            e[x].forEach(Object =>{
                // console.log(Object)
                const contenido = document.createElement('option')
                const {id, nivel} =Object
                contenido.setAttribute('value',`${nivel}`)
                contenido.textContent= `${nivel}`
                realeses.appendChild(contenido)
            })
        }
    }
}
function listacontroladores(a) {
    let mig;
    let controlador
    for (let i = 0; i < lista.length + a; i++) {
        controlador = lista[i]
        const row = document.createElement('tr');
        if (controlador.opc != "-") { controlador.opc == "1" ? mig = "Instalar" : mig = "Migrar"; }else{mig="-"}
        row.innerHTML = `
               <th scope="row">${i + 1}</th>
               <td>${controlador.ip}</td>
               <td>${controlador.usr}</td>
               <td>${controlador.version}</td>
               <td>${controlador.nivel}</td>
               <td>${controlador.paquetes}</td>
                <td>${mig}</td>
               <td>${controlador.ASM}</td>
               <td>${controlador.fecha}</td>
               <td><button type="submit" class="btn btn-secondary editar" id="${i}"><i class="fa-solid editar fa-pen-to-square" id="${i}"></i></button></td>
               <td ><button type="submit" class="btn btn-danger eliminar" style="border-radius: 50px;" id="${i}">
               <i class="fa-solid eliminar fa-trash" id="${i}"></i></button></td>`;
        if (i == indice-1) {
            console.log["holi"]
            row.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${controlador.ip}</td>
            <td>${controlador.usr}</td>
            <td>${controlador.version}</td>
            <td>${controlador.nivel}</td>
            <td>${controlador.paquetes}</td>
             <td>${mig}</td>
            <td>${controlador.ASM}</td>
            <td>${controlador.fecha}</td>
            <td></td>
            <td ><button type="submit" class="btn btn-danger eliminar" style="border-radius: 50px;" id="${i}">
            <i class="fa-solid fa-trash eliminar" id="${i}"></i></button></td>`;
            row.classList.add('alert', 'alert-warning','temp')
        }
        controllers.appendChild(row);

    }

}

function success() {
    const x = document.querySelector('.temp');
    x.classList.remove('alert-warning')
    x.classList.add('alert-success')
    setTimeout(() => {
        x.classList.add('alert-warning')
        x.classList.remove('alert-success')

    }, 1000)

}

function parametros(e) {
    const version = versionv.options[versionv.selectedIndex].value;
    const level = levelv.options[levelv.selectedIndex].value;
    if (document.querySelector("#mig").checked) {
        lista[indice - 1].opc = 2
    } else if (document.querySelector("#insta").checked) {
        lista[indice - 1].opc = 1
    }
    if (document.querySelector("#test").checked) {
        lista[indice - 1].ASM = 'Test'
    } else if (document.querySelector("#accept").checked) {
        lista[indice - 1].ASM = 'Accept'
    }
    if (calendarizar.checked) {
        lista[indice - 1].fecha = tiempo.value
    } else {
        lista[indice - 1].fecha = 'Now'
    }
    lista[indice - 1].version = version
    lista[indice - 1].nivel = level
    const packs = [...ACEP, '#ACE3D', '#EPS']
    const paquetes = [];
    let a = '';
    for (let i = 0; i < packs.length; i++) {
        if (document.querySelector(packs[i]).checked) {
            paquetes.push(document.querySelector(packs[i]).value)
            a = a + document.querySelector(packs[i]).value + ', '
        }
    }
    lista[indice - 1].paquetes = a;
    validarFormulario();

}

function limpiarHTML(x) {
    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }
}

function fecha() {
    if (calendarizar.checked) {
        tiempo.disabled = false;
    } else { tiempo.disabled = true; }

}

function validarFormulario() {
    const a = lista[indice - 1];
    if (a.version !== '' && a.nivel !== '' && a.paquetes !== '' && a.mig !== '' && a.opc !== '' && a.fecha !== '') {
        sessionStorage.setItem('Controladores', JSON.stringify(lista));
        limpiarHTML(controllers)
        listacontroladores(0);
        success();
        Resetform();
    } else {

        const mensaje = document.createElement('div');
        const f = document.createElement('strong');
        mensaje.textContent = 'Faltan parametros por seleccionar !!!'
        mensaje.appendChild(f)
        mensaje.classList.add('border', 'border-danger', 'col-12', 'p-2', 'text-center');
        mensaje.setAttribute('role', 'alert');
        mensaje.setAttribute('style', 'background-color:#DD161D; border-radius: 5px; color:white;');
        form.insertBefore(mensaje, document.querySelector('.condicional'));
        setTimeout(() => {
            form.removeChild(mensaje)
        }, 3000)
    }

}
function Deletecontroller(e) {
    if (e.target.classList.contains('eliminar')) {
        const a = e.target.id;
        lista.splice(a, 1)
        indice= parseInt(lista.length)
        sessionStorage.setItem('Controladores', JSON.stringify(lista));
        limpiarHTML(controllers);
        inicioApp();
    }
    if (e.target.classList.contains('editar')) {
        const b = parseInt(e.target.id);
        Resetform();

        versionv.value=lista[b].version
        if (lista[b].version == 'Jedi') {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = false;
            }
        } else {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = true
            }
        }
        levelv.value=lista[b].nivel
        lista[b].opc==2?document.querySelector("#mig").checked = true:document.querySelector("#insta").checked = true;
        lista[b].ASM=="Test"?document.querySelector("#test").checked = true:document.querySelector("#accept").checked = true;
        lista[b].fecha=="Now" || lista[b].fecha=="-"?calendarizar.checked = false:calendarizar.checked = true; tiempo.value = lista[b].fecha;
        cadena = lista[b].paquetes.split(", ")
        const packs = [...ACEP, '#ACE3D', '#EPS']
        if(cadena.length==2 && cadena[cadena.length-2]=='EPS'){
            document.querySelector('#ACE3D').checked = false;
        }
        if(cadena.length==2 && cadena[cadena.length-2]=='ACE3D'){
            document.querySelector('#EPS').checked = false;
        }
        for(let i=0;i<cadena.length-1;i++){
            for(let j=0;j<packs.length;j++){
                if(cadena[i]==document.querySelector(packs[j]).value){
                document.querySelector(packs[j]).checked = true;
                }
            }
        }
        indice= parseInt(b+1)
        limpiarHTML(controllers);
        inicioApp();
    }
}
function Resetform(){
    form.reset()
}



function jenkins(e){
    console.log('llamando a jenkins')
    // e.preventDefault();
    let x=[];
    for(let i=0;i<lista.length;i++){
        // console.log(lista[i])
        for (const property in lista[i]) {
            if(lista[i][property]=='-'){
                x=[...x,i+1]
                break

            }
          }

    }
    if( x == ''){
        fetch('../Versiones.json')
        .then(respuesta  =>{
          //   console.log(respuesta)
            return respuesta.json();
        } )
        .then(resultado => {
          // console.log(resultado)
          ComenzarInstalacion(resultado);
        })  
    }else{
        dontwork('No se puede continuar',x)
    }

}

function ComenzarInstalacion(resultado){

    let i =0;
    lista.forEach(controlador => {

        for (const x in resultado){
            if (controlador.version==x){
                comple = resultado[x].find( Object => Object.nivel === controlador.nivel)
            }
        }
        const enlace = document.querySelector('.comenzar')
        // console.log(controlador.nivel)
        // console.log(comple.complemento)
        // enlace.setAttribute('href',`http://jenkins3.rtptgcs.com:28084/job/ACE_UnattendedInstallation/buildWithParameters?token=token_ace&Version=${controlador.version}&level_name=${controlador.nivel}&level_complement=${comple.complemento}&opc=${controlador.opc}&import_inventory=controller("${controlador.ip}","${controlador.usr}","${controlador.pass}")&ASM=${controlador.ASM}`)
        // console.log(`http://jenkins3.rtptgcs.com:28084/job/ACE_UnattendedInstallation/buildWithParameters?token=token_ace&Version=${controlador.version}&level_name=${controlador.nivel}&level_complement=${comple.complemento}&opc=${controlador.opc}&import_inventory=controller("${controlador.ip}","${controlador.usr}","${controlador.pass}")&ASM=${controlador.ASM}`)
        // window.open(`http://jenkins3.rtptgcs.com:28084/job/ACE_UnattendedInstallation/buildWithParameters?token=token_ace&Version=${controlador.version}&level_name=${controlador.nivel}&level_complement=${comple.complemento}&opc=${controlador.opc}&import_inventory=controller("${controlador.ip}","${controlador.usr}","${controlador.pass}")&ASM=${controlador.ASM}`,'_blank');
        console.log(i)
        lista[i].complemento=comple.complemento;
        i=i+1;
    });
    // console.log(lista)
    const data={Controladores : lista}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://10.89.182.86:4000/',options)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          gren( `${data.msg}`)
        })
        .catch((error) => {
            dontwork( `Este es un error: ${error}`)
          console.log('Error:', error);
          
        });
    console.log(JSON.stringify(data))
        // sessionStorage.removeItem('Controladores');
        // location.reload
}


function dontwork(mensaje,arr){
    const x = document.createElement("div")
    if(arr){
        x.innerHTML=`
        <div class="alert alert-danger fade show error danger" role="alert">
        <strong> ${mensaje}!</strong> faltan parametros en ${arr}.
        </div>
        `;
    }else{
        x.innerHTML=`
        <div class="alert alert-danger fade show error danger" role="alert">
        <strong> Conexion con el servidor fallida!</strong> ${mensaje}.
        </div>
        `;
    }

    const errores = document.querySelectorAll('.error')
    if(errores.length == 0){
        const temp = document.querySelector('.t1')
        temp.insertBefore(x , document.querySelector('.m-1'));

        setTimeout(()=>{
            x.remove();
        },3000)
    }
  }

function gren(mensaje){
    const x = document.createElement("div")
    x.innerHTML=`
    <div class="alert alert-success " role="alert">
    Se esta comenzando la instalaciónas <strong> ${mensaje}!</strong> .
    `;
    const errores = document.querySelectorAll('.error')
    if(errores.length == 0){
        const temp = document.querySelector('.t1')
        temp.insertBefore(x , document.querySelector('.m-1'));

        setTimeout(()=>{
            x.remove();
        },3000)
    }
}

