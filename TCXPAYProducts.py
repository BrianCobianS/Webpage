import wget
import os
def verificar_crear_directorio(directorio):
    if not os.path.exists(directorio):
        os.makedirs(directorio)
        print(f"Directorio '{directorio}' creado.")
    else:
        print(f"El directorio '{directorio}' ya existe.")
# Ejemplo de uso

def eliminar_contenido_directorio(directorio):
    for archivo in os.listdir(directorio):
        ruta_archivo = os.path.join(directorio, archivo)
        if os.path.isfile(ruta_archivo):
            os.remove(ruta_archivo)
            
directorio = './PacksTcxpay'
verificar_crear_directorio(directorio)
eliminar_contenido_directorio(directorio)           
def changeBat(fileDirectory,name):
    with open(fileDirectory,'r') as archivo:
    #   Jedi=[]
    #   Morty=[]
    #   Leia=[]
      versiones=[]
      for linea in archivo:
            if '<td><a href="1' in linea.rstrip('\n'):
                inicio=linea.rstrip('\n').find('"')
                final=linea.rstrip('\n').find('/"')
                linea1=linea[inicio+1:final]
                versiones.append(linea1)
      print(versiones)
      contenido = open('TCX-'+name+'.json', "w")
      contenido.writelines('{\n')
      contenido.writelines('  "TCxpaycommon": [\n')
      f=0
      for x in versiones:
        f += 1
        if name == 'Common':
            url1 = 'https://nexus.commerce.toshiba.com/repository/tgcs-maven-group/com/tgcs/tcxpay/tcxpay-common-install/'+x+'/tcxpay-common-install-'+x+'.iso'
        else:
            url1 = 'https://nexus.commerce.toshiba.com/repository/tgcs-maven-group/com/tgcs/tcxpay/tcxpay-pinpad-spt-asm/'+x+'/tcxpay-pinpad-spt-asm-'+x+'.iso'
        if f != len(versiones):
            contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+x+'",\n  "url": "'+url1+'"\n},\n')
        else:
            contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+x+'",\n  "url": "'+url1+'"\n}\n')
        output_directory = './PacksTcxpay'
        print(url1)
        wget.download(url1, out=output_directory)
      contenido.writelines('  ]\n')
      contenido.writelines('}\n')
      return versiones
def TCXPAY(url, name):
    # url = 'http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-release/com/tgcs/tcxpay/tcxpay-common-install/'
    output_directory = './update'
    filename = wget.download(url , out=output_directory)
    x=changeBat(filename,name)
    os.remove(filename)
urlcommon='https://nexus.commerce.toshiba.com/service/rest/repository/browse/tgcs-maven-group/com/tgcs/tcxpay/tcxpay-common-install/'
urlPINPAD='https://nexus.commerce.toshiba.com/service/rest/repository/browse/tgcs-maven-group/com/tgcs/tcxpay/tcxpay-pinpad-spt-asm/'
TCXPAY(urlcommon,'Common')
TCXPAY(urlPINPAD,'PINPAD')
##Pauqtes de descarga:

