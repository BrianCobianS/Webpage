import sys
IP=(sys.argv[1])
USR=(sys.argv[2])
PASS=(sys.argv[3])
OPC=(sys.argv[4])
COMP=(sys.argv[5])
LEV=(sys.argv[6])
ASM=(sys.argv[7])
print(IP,USR,PASS,OPC,COMP,LEV,ASM)
contenido = open("C:/Users/brian.cobian/Desktop/IMDesatendida/Fullstackpage/Back-End/public/Inventories/shceduled.sh").read().splitlines()
print(contenido)
contenido.insert(1,"python3 /home/ebossteam/UnattendedInstallation/FULLSTACK/Back-End/public/Inventories/Inventory.py "+IP+" "+USR+" "+PASS)
contenido.insert(2,"cp /home/ebossteam/UnattendedInstallation/FULLSTACK/Back-End/public/Inventories/AUTO.BAT /home/ebossteam/ansibletest/ansible/playbooks/os4690/roles/installation/files/")
contenido.insert(3,"echo "+OPC+" >> /home/ebossteam/ansibletest/ansible/playbooks/os4690/roles/installation/files/AUTO.BAT")
contenido.insert(4,"ansible-playbook /home/ebossteam/ansibletest/ansible/playbooks/os4690/Install_Controller.yml -vv  -i /home/ebossteam/ansibletest/ansible/Inventories/import_inventory.yml -e 'level_complement="+COMP+" opc="+OPC+" ASM="+ASM+" level_name="+LEV+"' >> /var/log/logscontroladores/"+IP+"-$(date +%Y%m%d_%H%M%S).txt")
f = open('C:/Users/brian.cobian/Desktop/IMDesatendida/Fullstackpage/Back-End/public/Inventories/'+IP+'.sh', "w")
f.writelines("\n".join(contenido))