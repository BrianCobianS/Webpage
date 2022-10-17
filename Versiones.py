from pyparsing import line
import wget
import os
url = 'http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/'
output_directory = './update'
filename = wget.download(url , out=output_directory)
# os.rename('./update/download.wget', './update/x')

def changeBat(fileDirectory):
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
      for tipo in versiones:
        for version in tipo:
          # print(version + '-SNAPSHOT')
          url = 'http://10.89.110.62:28081/repository/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/' +version + '-SNAPSHOT/maven-metadata.xml'
          output_directory = './update'
          complement = wget.download(url , out=output_directory)
          with open(complement,'r') as archivo:
            for linea in archivo:
              linea= linea.rstrip('\n')
              if '<value>' in linea:
                inicio=linea.find('<value>')
                final=linea.find('</value>')
                linea1=linea[inicio+7:final]
                complementos.append(linea1)
                # print(linea1)
                break
          os.remove(complement)
      Tipo=['Jedi','Leia','Morty']
      contenido = open('Versiones.json', "w")
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
# changeBat('var/www/html/update/nexus')
changeBat(filename)
os.remove(filename)

