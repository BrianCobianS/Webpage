const lista = JSON.parse(sessionStorage.getItem('Controladores'));
if(sessionStorage.getItem('Controladores')){
    var indice=lista.length
}
const temp = document.querySelector(".alert");
const controllers = document.querySelector(".table tbody")
const Agregar = document.querySelector(".parametros")
const ipara = document.querySelector('#parametros')
const warn = document.querySelector('#here')
const versionv = document.querySelector(".version")
const levelv = document.querySelector(".nivel")
const calendarizar = document.querySelector('#fechacheck')
const tiempo = document.querySelector('#fecha')
const ACEP = ['#TCX', '#Common', '#PinPad']
const form = document.querySelector(".g-3");
const tabla = document.querySelector('.tabla')
const comenzar = document.querySelector("#bntjenkins")
let jsondocument= '../Versiones6D.json'
const complementosjson = [ '../Versiones3D.json','../Versiones4D.json', '../Versiones6D.json']

cargarEventListeners();
function cargarEventListeners() {
    // let indice = lista.length
     document.addEventListener('DOMContentLoaded', inicioApp);
    calendarizar.addEventListener('click', fecha)
    tabla.addEventListener('click', Deletecontroller)
    form.addEventListener('input', seleccion)
    ipara.addEventListener('click', warning)
    Agregar.addEventListener('click', (e) => {
        // e.preventDefault();
        parametros(e);
    })
    tiempo.disabled = true;
    for (let i = 0; i < ACEP.length; i++) {
        document.querySelector(ACEP[i]).disabled = true
    }
    comenzar.addEventListener('click', jenkins)
}

function seleccion(e) {
    if (e.target.classList.contains('version')) {
        if (e.target.value == 'Jedi') {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = false;
            }
        } else {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = true
                document.querySelector(ACEP[i]).checked = false
            }
            if(document.querySelector('.CommonSELECTION')){
                document.querySelector('.CommonSELECTION').parentElement.removeChild(document.querySelector('.CommonSELECTION').parentElement.lastChild)
                
            }
            if(document.querySelector('.PinPadSELECTION')){
                document.querySelector('.PinPadSELECTION').parentElement.removeChild( document.querySelector('.PinPadSELECTION').parentElement.lastChild)
            }
        }
        obtenerdato(e.target.value);
    }
}

function warning(e){

    // console.log(e.target.id)
    // wano = document.querySelector('.wano')
    if(e.target.id=='Common'){
        const common = document.querySelector('#Common')
        if(common.checked == true){
            fetch('../TCX-Common.json')
            .then(respuesta  =>{
              //   console.log(respuesta)
                return respuesta.json();
            } )
            .then(resultado => {
            //   console.log(resultado)
              selections(common,resultado)
            })  
        }else{
            if(document.querySelector('.'+common.id+'SELECTION')){
                common.parentElement.removeChild( common.parentElement.lastChild)
                
            }
        }
    }
    if(e.target.id=='PinPad'){
        const common = document.querySelector('#PinPad')
        if(common.checked == true){
            fetch('../TCX-PINPAD.json')
            .then(respuesta  =>{
              //   console.log(respuesta)
                return respuesta.json();
            } )
            .then(resultado => {
            //   console.log(resultado)
              selections(common,resultado)
            })  
        }else{
            if(document.querySelector('.'+common.id+'SELECTION')){
                common.parentElement.removeChild( common.parentElement.lastChild)
                
            }
        }
    }
    test = document.querySelector('#test')
    insta = document.querySelector('#insta')
    accept = document.querySelector('#accept')
    const div = document.createElement('div')
    div.classList.add('col-12')
    div.classList.add('alert')
    div.classList.add('alert-warning')
    div.classList.add('borrar')
    div.innerHTML = `
    The installation option is a <strong>clean installation </strong>, which means that it will erase all previous controller information.`
    // console.log(div)
    if(insta.checked == true){
        test.disabled = true
        test.checked = false
        accept.checked = true 
        // console.log(ipara.insertBefore(div,ipara.children[4]))
        if(!document.querySelector('.borrar') && e.target.id=='insta'){
            ipara.insertBefore(div,ipara.children[4])
            setTimeout(() => {
                ipara.removeChild(ipara.children[4])
    
            }, 6000)
        }

        
    }else{
        test.disabled = false
          
    }
}

function selections(place,resultado){

    const div = document.createElement('div')
    // div.classList.add('col-6')
    const name=place.id + "SELECTION"
    div.classList.add(name)
    div.innerHTML = `
        <label for="Selectlevel-${name}"><strong>The realeses available are:</strong></label>
        <select id="Selectlevel-${name}" class="form-select">
        <option value="nada">Select</option>
        </select>
    </div>`

    // console.log(!document.querySelector)
    if(!document.querySelector('.'+name)){
        place.parentElement.appendChild(div)
        const placeoptions = document.querySelector('#Selectlevel-'+name)
        resultado.TCxpaycommon.forEach(Object =>{

            const contenido = document.createElement('option')
            const {nivel} =Object
            contenido.setAttribute('value',`${nivel}`)
            contenido.textContent= `${nivel}`
            placeoptions.appendChild(contenido)
        })
        
    }
}


function inicioApp() {
    if (lista != null && lista != '') {
        temp.textContent = ` You are modifying the controller`
        const bold = document.createElement('b')
        bold.textContent = ` #${indice} IP: ${lista[indice-1].ip} `
        temp.appendChild(bold)
        Agregar.disabled = false
        comenzar.disabled=false
        temp.classList.remove('alert-danger')
        temp.classList.add('alert-warning')
        listacontroladores(0)
        console.log(lista[indice-1].ip)
    } else {
        temp.textContent = ` You have not added any controller`
        temp.classList.remove('alert-warning')
        temp.classList.add('alert-danger')
        Agregar.disabled = true
        comenzar.disabled=true
    }
    lista[indice-1].ACE3Dcomple = 0
    lista[indice-1].ACE4Dcomple = 0
    lista[indice-1].ACE6Dcomple = 0  
}

function obtenerdato(ve){
    fetch(jsondocument)
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
    // console.log(e.target)
    if (document.querySelector("#mig").checked) {
        lista[indice - 1].opc = 2
    } else if (document.querySelector("#insta").checked) {
        lista[indice - 1].opc = 1
        console.log('Se selecciono instalar')
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
   
    const version = versionv.options[versionv.selectedIndex].value;
    const level = levelv.options[levelv.selectedIndex].value;
    const levelCommon = document.querySelector('#Common');
    const levelPINPAD = document.querySelector('#PinPad');
    const Tcxpay = document.querySelector('#TCX');
    levelCommon.checked ? lista[indice - 1].TCxpaycommon = document.querySelector('#Selectlevel-CommonSELECTION').options[document.querySelector('#Selectlevel-CommonSELECTION').selectedIndex].value : lista[indice - 1].TCxpaycommon = 0;
    levelPINPAD.checked ? lista[indice - 1].TCxpayPinPad = document.querySelector('#Selectlevel-PinPadSELECTION').options[document.querySelector('#Selectlevel-PinPadSELECTION').selectedIndex].value : lista[indice - 1].TCxpayPinPad= 0;
    Tcxpay.checked ? lista[indice - 1].TCxpay = level : lista[indice - 1].TCxpay = 0;
    lista[indice - 1].version = version
    lista[indice - 1].nivel = level
    document.querySelector('#EPS').checked ? lista[indice - 1].nivelEPS = level : lista[indice - 1].nivelEPS = 0
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
    console.log(lista[indice-1])
    let tcxpayproducts;
    if(lista[indice - 1].TCxpayPinPad == "nada" || lista[indice - 1].TCxpaycommon == "nada"){
        tcxpayproducts = false
    }else{
        tcxpayproducts = true
    }
    console.log(tcxpayproducts)
    lista[indice-1].ACE3Dcomple = 0
    lista[indice-1].ACE4Dcomple = 0
    lista[indice-1].ACE6Dcomple = 0  
    validarFormulario(tcxpayproducts);
    

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

function validarFormulario(tcx) {
    const a = lista[indice - 1];
    if (a.version !== '' && a.nivel !== '' && a.paquetes !== '' && a.mig !== '' && a.opc !== '' && a.fecha !== '' && tcx == true) {
        sessionStorage.setItem('Controladores', JSON.stringify(lista));
        limpiarHTML(controllers)
        listacontroladores(0);
        success();
        Resetform();
    } else {

        const mensaje = document.createElement('div');
        const f = document.createElement('h6');
        mensaje.textContent = 'Missing parameters to select!'
        mensaje.appendChild(f)
        mensaje.classList.add('border', 'border-danger', 'col-12',  'text-center');
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
        lista[indice-1].ACE3Dcomple = 0
        lista[indice-1].ACE4Dcomple = 0
        lista[indice-1].ACE6Dcomple = 0  
        const b = parseInt(e.target.id);
        Resetform();

        // versionv.value=lista[b].version
        if (lista[b].version == 'Jedi') {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = false;
            }
        } else {
            for (let i = 0; i < ACEP.length; i++) {
                document.querySelector(ACEP[i]).disabled = true
            }
        }
        // levelv.value=lista[b].nivel
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
    if(document.querySelector('.CommonSELECTION')){
        document.querySelector('.CommonSELECTION').parentElement.removeChild(document.querySelector('.CommonSELECTION').parentElement.lastChild)
        
    }
    if(document.querySelector('.PinPadSELECTION')){
        document.querySelector('.PinPadSELECTION').parentElement.removeChild( document.querySelector('.PinPadSELECTION').parentElement.lastChild)
    }
    for (let i = 0; i < ACEP.length; i++) {
        document.querySelector(ACEP[i]).disabled = true
    }
    tiempo.disabled = true;
}

async function jenkins (e){
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
        h=0
        // console.log(typeof(complementosjson))    
        lista.forEach(controlador => {

            const positions =[];
            controlador.nivel != 0 ? positions.push('ACE3D') : j=0;
            controlador.nivelEPS != 0 ? positions.push('ACE4D') : j =0;
            controlador.TCxpay != 0 ? positions.push('ACE6D') : j =0;
            FindComplement(controlador, positions, h)
            // console.log(lista[h])  
            h=h+1

        });
        console.log(lista)  
        const x = document.createElement("div")
        x.classList.add('d-flex')
        x.classList.add('justify-content-center')
        x.classList.add('m-5')
        x.innerHTML=`<div class="lds-roller1"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
        const temp = document.querySelector('.t1')
        temp.insertBefore(x , document.querySelector('.m-1'));
        setTimeout(()=>{
            ComenzarInstalacion(x)
        },1000)

    }else{
        dontwork('You must fill in all the parameters berfore start the installation',x)
    }
}

function FindComplement(controlador,positions,h){

    const temp = []
    for (x in positions){
        for (type in complementosjson){
            if(positions[x]=='ACE'+complementosjson[type].substring(12,14)){
                temp.push(complementosjson[type])
            }
        }
    }
    temp.forEach(buscar =>{
        const resultado= fetch(buscar)
        .then(respuesta  =>{return respuesta.json();})
        .then(resultado => {return resultado})
        const printAddress = () => {
            resultado.then((resultado) => {
                for (const x in resultado){
                    // console.log(x)
                    if (controlador.version==x){
                        comple = resultado[x].find( Object => Object.nivel === controlador.nivel)
                    }
                }
                    console.log(comple.complemento)
                    const types = comple.complemento.substring(0,2)
                    if(types == '3D'){lista[h].ACE3Dcomple = comple.complemento.substring(3)}  
                    if(types == '4D'){lista[h].ACE4Dcomple = comple.complemento.substring(3)} 
                    if(types == '6D'){lista[h].ACE6Dcomple = comple.complemento.substring(3) }                  

            });
          };
          
        printAddress();

    })
}

function ComenzarInstalacion(x){

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
    // fetch('http://localhost:4000/',options)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          x.remove();
          gren( `${data.msg}`)
        })
        .catch((error) => {
            x.remove();
            dontwork( `: ${error}`)
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
        <strong> ${mensaje}!</strong><h6 >missing parameters in ${arr}.</h6>
        </div>
        `;
    }else{
        x.innerHTML=`
        <div class="alert pt-1 alert-danger fade show error danger" role="alert">
        <strong> Connection with the server failed!</strong> <h6 >${mensaje}.</h6>
        </div>
        `;
    }

    const errores = document.querySelectorAll('.error')
    if(errores.length == 0){
        const temp = document.querySelector('.t1')
        temp.insertBefore(x , document.querySelector('.m-1'));

        setTimeout(()=>{
            x.remove();
        },10000)
    }
  }

function gren(mensaje){
    const x = document.createElement("div")
    x.innerHTML=`
    <div class="alert alert-success " role="alert">
    <strong> ${mensaje}!</strong> .
    `;
    const errores = document.querySelectorAll('.error')
    if(errores.length == 0){
        const temp = document.querySelector('.t1')
        temp.insertBefore(x , document.querySelector('.m-1'));

        setTimeout(()=>{
            x.remove();
        },10000)
    }
}

