import { exec } from 'child_process';
function ansible(Controlador){
    console.log(`ansible-playbook /home/ebossteam/ansibletest/ansible/playbooks/os4690/Install_Controller.yml -vv  -i /home/ebossteam/ansibletest/ansible/Inventories/import_inventory.yml -e 'level_complement=${Controlador.complemento} opc=${Controlador.opc} ASM=${Controlador.ASM} level_name=${Controlador.nivel}' 2>&1 | tee /var/log/logscontroladores/${Controlador.ip}$(date +%Y%m%d_%H%M%S).txt`)
    exec(`ansible-playbook /home/ebossteam/ansibletest/ansible/playbooks/os4690/Install_Controller.yml -vv  -i /home/ebossteam/ansibletest/ansible/Inventories/import_inventory.yml -e 'level_complement=${Controlador.complemento} opc=${Controlador.opc} ASM=${Controlador.ASM} level_name=${Controlador.nivel}' 2>&1 | tee /var/log/logscontroladores/${Controlador.ip}$(date +%Y%m%d_%H%M%S).txt`, (error, stdout, stderr) => {
        if (error) {
        console.error(`error: ${error.message}`);
        return;
        }
        if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
        }
        console.log(`stdout:\n${stdout}`);
    });
}
export default ansible;