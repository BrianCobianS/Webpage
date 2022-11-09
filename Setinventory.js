import { exec } from 'child_process';
function inventory(parametros){
    console.log(`python ${parametros.ip} ${parametros.usr} ${parametros.pass}`)

    exec(`python public/Inventories/Inventory.py ${parametros.ip} ${parametros.usr} ${parametros.pass} ${parametros.opc}`, (error, stdout, stderr) => {
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
    console.log(`se eligio ${parametros.opc}`)
    exec(`cp /home/ebossteam/UnattendedInstallation/FULLSTACK/Back-End/public/Inventories/AUTO.BAT /home/ebossteam/ansibletest/ansible/playbooks/os4690/roles/installation/files/`, (error, stdout, stderr) => {
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
    exec(`echo ${parametros.opc} >> /home/ebossteam/ansibletest/ansible/playbooks/os4690/roles/installation/files/AUTO.BAT`, (error, stdout, stderr) => {
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
export default inventory;