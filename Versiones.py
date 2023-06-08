import wget
import os
# os.rename('./update/download.wget', './update/x')
ACEREALESES=[]
ACELIST=[]
Types=['3D','4D','6D']
import os

def verificar_crear_directorio(directorio):
    if not os.path.exists(directorio):
        os.makedirs(directorio)
        print(f"Directorio '{directorio}' creado.")
    else:
        print(f"El directorio '{directorio}' ya existe.")

# Ejemplo de uso

def organizar(cadena):
    partes = cadena.split("-")  # Divide la cadena en partes separadas por "-"
    if len(partes) >= 3:  # Verifica si hay al menos dos caracteres "-" en la cadena
        return partes[1]  # Devuelve la segunda parte de la cadena (lo que está entre los caracteres "-")
    else:
        return None  # Si no hay suficientes caracteres "-", devuelve None
      
def eliminar_contenido_directorio(directorio):
    for archivo in os.listdir(directorio):
        ruta_archivo = os.path.join(directorio, archivo)
        if os.path.isfile(ruta_archivo):
            os.remove(ruta_archivo)

def changeBat(fileDirectory,ACED,ACEBASE):
    with open(fileDirectory,'r') as archivo:
      Jedi=[]
      Morty=[]
      Leia=[]
      versiones=[]
      for linea in archivo:
            if '<td><a href=' in linea.rstrip('\n'):
                inicio=linea.rstrip('\n').find('>V')
                final=linea.rstrip('\n').find('-SNAPSHOT</a></td>')
                linea1=linea[inicio+1:final]
                # print(linea1)
                if 'V8R1' in linea1:
                  Jedi.append(linea1)
                elif 'V8R2' in linea1:
                  Leia.append(linea1)
                elif 'V8R3' in linea1:
                  Morty.append(linea1)
      versiones.append(Jedi)
      versiones.append(Leia)
      versiones.append(Morty)
      complementos=[]
      iguales=[]
      h=0
      if ACEBASE != '':
        for Tipo in ACEBASE:
          temp=[]
          for version in Tipo:
            if version in versiones[h]:
              temp.append(version)
          iguales.append(temp)
          h += 1
        print(iguales)
        versiones= iguales
      for tipo in versiones:
        for version in tipo:
          print(version + '-SNAPSHOT')
          url = 'https://nexus.commerce.toshiba.com/repository/tgcs-maven-group/com/toshibacommerce/ace/ACE'+ACED+'001/' +version + '-SNAPSHOT/maven-metadata.xml'
          output_directory = './update'
          complement = wget.download(url , out=output_directory)
          with open(complement,'r') as archivo:
            for linea in archivo:
              linea= linea.rstrip('\n')
              if '<value>' in linea:
                inicio=linea.find('<value>')
                final=linea.find('</value>')
                linea1=linea[inicio+7:final]
                complementos.append(ACED+' '+linea1)
                print(linea1)
                break
          os.remove(complement)
      Tipo=['Jedi','Leia','Morty']
      contenido = open('Versiones'+ACED+'.json', "w")
      contenido.writelines('{\n')
      i=0
      for x in range(3):
            contenido.writelines('  "'+Tipo[x]+'": [\n')
            f=0
            for index in versiones[x]:
                f += 1
              # print(i)
                if  f == len(versiones[x]) :
                    contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+index+'",\n  "complemento": "'+complementos[i]+'"\n}\n')
                else:
                    contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+index+'",\n  "complemento": "'+complementos[i]+'"\n },\n')
                ACEREALESES.append('ACE'+ACED+'001'+'-'+complementos[i][3:])
                if ACED == '6D':
                    ACELIST.append(index)
                i += 1
            contenido.writelines('  ]\n') if x == 2 else contenido.writelines('  ],\n')
      contenido.writelines('}\n')
      return versiones
def getverison(type,ACEBASE):
  url = 'https://nexus.commerce.toshiba.com/service/rest/repository/browse/tgcs-maven-group/com/toshibacommerce/ace/ACE'+type+'001/'
  output_directory = './update'
  filename = wget.download(url , out=output_directory)
  # print(ACEBASE)
  x=changeBat(filename,type,ACEBASE)
  os.remove(filename)
  return x
# getverison('3D')
# getverison('4D')
ACEBASE=''
ACEBASE=getverison('3D',ACEBASE)
getverison('4D',ACEBASE)
getverison('6D',ACEBASE)
directorio = './Packs'
verificar_crear_directorio(directorio)
# print(ACEREALESES)
# print(ACELIST)
# Codigo para revisar las diferecias entre la copia local y los de la nube
nexus=[]
for nivel in ACELIST:
    for comple in ACEREALESES:
        if (nivel in comple):
          nexus.append('ACE'+comple[3:5]+'001'+'-'+comple[9:]+'.zip')
# print(nexus)
locales=os.listdir('./Packs')
# print(locales)
faltantes=[]
for elemento in nexus:
    if elemento not in locales:
        faltantes.append(elemento[:-4])
        # print('Falta: '+elemento[:-4])
faltantes=list(set(faltantes))
CloudVersionsAce =[]
for elemento in faltantes:
  CloudVersionsAce.append(organizar(elemento))
  # print(organizar(elemento))


if (len(faltantes)>=1): 
  for prined in faltantes:
    print('Falta: '+prined)
  for x in range(len(faltantes)):
    url = 'https://nexus.commerce.toshiba.com/repository/tgcs-maven-group/com/toshibacommerce/ace/ACE'+faltantes[x][3:5]+'001/'+CloudVersionsAce[x]+'-SNAPSHOT/ACE'+faltantes[x][3:5]+'001-'+faltantes[x][9:]+'.zip'
    output_directory = './Packs'
    print(url)
    try:
      wget.download(url , out=output_directory)
    except Exception as e:
      print("Ocurrió un error:", str(e))
else:
  print('Ya esta actualizada la base de datos')





# directorio = './Packs'
# verificar_crear_directorio(directorio)
# # eliminar_contenido_directorio(directorio)

# for nivel in CloudVersionsAce:
# # for nivel in faltantes:
#     for comple in ACEREALESES:
#         if (nivel in comple):
#           url = 'https://nexus.commerce.toshiba.com/repository/tgcs-maven-group/com/toshibacommerce/ace/ACE'+comple[3:5]+'001/'+nivel+'-SNAPSHOT/ACE'+comple[3:5]+'001-'+comple[9:]+'.zip'
#           output_directory = './Packs'
#           print(nivel)
#           print(comple)
#           print(url)
#           try:
#             wget.download(url , out=output_directory)
#           except Exception as e:
#             print("Ocurrió un error:", str(e))
          
# El archivo que se genera de 6D es el que contiene la informacion util para la aplicacion porque son las versiones que existen tanto 
#en EPS como en SUREPOS ACE para JEDI y para morty y Leia son las mismas que son iguales entre en el archivo de ACE 3D Y 4D

