import { exec } from 'child_process';
function shel(Controlador){
   exec(`python  C:/Users/brian.cobian/Desktop/IMDesatendida/Fullstackpage/Back-End/public/Inventories/schedule.py ${Controlador.ip} ${Controlador.usr} ${Controlador.pass} ${Controlador.opc} ${Controlador.complemento} ${Controlador.nivel} ${Controlador.ASM}`, (error, stdout, stderr) => {
      if (error) {
      console.error(`error: ${error.message}`);
      return;
      }
      if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
      }
      console.log(`stdout: \n${stdout}`);
   });
   exec(`echo "sh /home/ebossteam/UnattendedInstallation/FULLSTACK/Back-End/public/Inventories/${Controlador.ip}.sh"| at -t ${Controlador.fecha}`, (error, stdout, stderr) => {
        if (error) {
        console.error(`error: ${error.message}`);
        return;
        }
        if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
        }
        console.log(`stdout: \n${stdout}`);
   });
}
export default shel;