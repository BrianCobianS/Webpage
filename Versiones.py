import wget
import os
# os.rename('./update/download.wget', './update/x')

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
          # print(version + '-SNAPSHOT')
          url = 'http://10.89.110.62:28081/repository/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE'+ACED+'001/' +version + '-SNAPSHOT/maven-metadata.xml'
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
                # print(linea1)
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
              i += 1
            contenido.writelines('  ]\n') if x == 2 else contenido.writelines('  ],\n')
      contenido.writelines('}\n')
      return versiones
def getverison(type,ACEBASE):
  url = 'http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE'+type+'001/'
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
# El archivo que se genera de 6D es el que contiene la informacion util para la aplicacion porque son las versiones que existen tanto 
#en EPS como en SUREPOS ACE para JEDI y para morty y Leia son las mismas que son iguales entre en el archivo de ACE 3D Y 4D

