const lista = JSON.parse(sessionStorage.getItem('Controladores'));
console.log(lista);
const controllers = document.querySelector(".tabla tbody")
const btnA = document.querySelector(".agregar")
const bntC = document.querySelector(".comenzar")
cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  bntC.addEventListener('click',inicio);

}
controladores();
function controladores() {
    i=1;
    let mig;
    lista.forEach(controlador => {
         const row = document.createElement('tr');
         controlador.opc=="1"? mig="Instalar": mig="Migrar";
            row.innerHTML = `
                <th scope="row">${i}</th>
                <td>${controlador.ip}</td>
                <td>${controlador.usr}</td>
                <td>${controlador.version}</td>
                <td>${controlador.nivel}</td>
                <td>ACE,   ACE EPS</td>
                <td>${mig}</td>
                <td>${controlador.ASM}</td>
                <td>Now</td>
         `;
         i++;
         controllers.appendChild(row);
    });

}

function inicio(e){
    // e.preventDefault();
    lista.forEach(controlador => {
    console.log("Comenzando instalaci'on")
    bntC.setAttribute('href',`http://jenkins3.rtptgcs.com:28084/job/ACE_UnattendedInstallation/buildWithParameters?token=token_ace&Version=${controlador.version}&level_name=${controlador.nivel}&level_complement=l164-20220804.164043-1&opc=${controlador.opc}&import_inventory=controller("${controlador.ip}","${controlador.usr}","${controlador.pass}")&ASM=${controlador.ASM}`)
    
    });
   // http://jenkins3.rtptgcs.com:28084/job/ACE_UnattendedInstallation/buildWithParameters?token=token_ace&Version=Leia&level_name=l160&level_complement=l160-20220707.164155-1&opc=1&import_inventory=controller("10.89.105.98","master","m1")&ASM=Accept
    sessionStorage.removeItem('Controladores');
}