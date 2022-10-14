cd /var/www/html/
rm -r update
mkdir update
wget -O ./update/nexus http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/
python3 Versiones.py
ebossteam@eboss:/var/www/html$