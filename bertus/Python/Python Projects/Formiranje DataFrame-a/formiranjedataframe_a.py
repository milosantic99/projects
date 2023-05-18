# -*- coding: utf-8 -*-

class RecieveJson():
    filename : str
    headers : list
    data : list

data =  RecieveJson()
data.filename="cars.csv"
data.headers=['Car;MPG;Cylinders;Displacement;Horsepower;Weight;Acceleration;Model;Origin']
data.data=[['Chevrolet Chevelle Malibu;18.0;8;307.0;130.0;3504.;12.0;70;US'],
           ['Buick Skylark 320;15.0;8;350.0;165.0;3693.;11.5;70;US'], 
           ['Plymouth Satellite;18.0;8;318.0;150.0;3436.;11.0;70;US'], 
           ['AMC Rebel SST;16.0;8;304.0;150.0;3433.;12.0;70;US'], 
           ['Ford Torino;17.0;8;302.0;140.0;3449.;10.5;70;US'],
           ['Ford Galaxie 500;15.0;8;429.0;198.0;4341.;10.0;70;US'],
           ['Chevrolet Impala;14.0;8;454.0;220.0;4354.;9.0;70;US'], 
           ['Plymouth Fury iii;14.0;8;440.0;215.0;4312.;8.5;70;US'],
           ['Pontiac Catalina;14.0;8;455.0;225.0;4425.;10.0;70;US'],
           ['Volkswagen Super Beetle 117;0;4;97.00;48.00;1978.;20.0;71;Europe'],
           ['AMC Gremlin;19.0;6;232.0;100.0;2634.;13.0;71;US'],
           ['Plymouth Satellite Custom;16.0;6;225.0;105.0;3439.;15.5;71;US'], 
           ['Chevrolet Chevelle Malibu;17.0;6;250.0;100.0;3329.;15.5;71;US'], ['Ford Torino 500;19.0;6;250.0;88.00;3302.;15.5;71;US'],
           ['AMC Matador;18.0;6;232.0;100.0;3288.;15.5;71;US'],
           ['Chevrolet Impala;14.0;8;350.0;165.0;4209.;12.0;71;US'], 
           ['Pontiac Catalina Brougham;14.0;8;400.0;175.0;4464.;11.5;71;US'],
           ['Ford Galaxie 500;14.0;8;351.0;153.0;4154.;13.5;71;US'], 
           ['Plymouth Fury iii;14.0;8;318.0;150.0;4096.;13.0;71;US']
           ]

"""** Objasnjenje:**

1. S obzirom da jedan string sadži vrdnosti za sve kolone jedne vrste(razdvojene znakom ;), mora se prvo splitovati po ";"

2. Prilikom splitovanja će sve pojedinačne vrednosti u obliku stringa biti spakovane u niz. Dakle, i brojevi će biti u formaru stringa

3. Zato za svaku vrstu treba proveriti da li sadrži numeričke vrednosti i iste pretvoriti u broj, pomoću funkcija **is_number()** i **StrToNum()**
"""

for x in data.data:
  print(x)

print(data.headers)

"""Proverava da li prosledjeni string zapravo broj (ceo ili realan)"""

def is_number(element):
    try:
        float(element)
        return True
    except ValueError:
        return False

"""Prosledjeni string pretvara u broj"""

def StrToNum(y):
  for i in range(len(y)):
    if is_number(y[i]):
      y[i]=float(y[i])
  return y

"""Parsira matricu i priprema je za dataframe"""

def ParsMat(data:RecieveJson):
  for i in range(len(data.data)):
    y=data.data[i][0].split(";")
    #print(y)
    y=StrToNum(y)
    #print(y)
    data.data[i]=y
  return data

for x in data.data:
  print(x)

"""Sledeća funkcija služi za formiranje DataFrame-a, pomoću funkcije DataFrame iz **pandas** biblioteke. Takođe, neophodno je splitovati string koji predstavlja nazive kolona"""

import pandas as pd
def FormirajDataFrame(data):
  data=ParsMat(data)
  data.headers=(data.headers[0]).split(";")
  df=pd.DataFrame(data.data,columns=data.headers)
  return df



df=FormirajDataFrame(data)

print(df)

"""Provera tipova svake kolone u dataset-u"""
tipovi=df.dtypes
print(tipovi)