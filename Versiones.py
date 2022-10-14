

def changeBat(fileDirectory):
    with open(fileDirectory,'r') as archivo:
      i=0
      j=0
      pos=[]
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

                pos.append(i)
                j=j+1
            i=i+1
      versiones.append(Jedi)
      versiones.append(Leia)
      versiones.append(Morty)
      Tipo=['Jedi','Leia','Morty']
      contenido = open('Versiones.json', "w")
      contenido.writelines('{\n')
      for x in range(3):
            contenido.writelines('  "'+Tipo[x]+'": [\n')
            f=0
            for index in versiones[x]:
              f += 1
              if  f == len(versiones[x]) :
                contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+index+'"\n  }\n')
              else:
                contenido.writelines('  {\n  "id":'+str(f)+',\n  "nivel": "'+index+'"\n  },\n')
            contenido.writelines('  ]\n') if x == 2 else contenido.writelines('  ],\n')
      contenido.writelines('}\n')
changeBat('update/nexus')