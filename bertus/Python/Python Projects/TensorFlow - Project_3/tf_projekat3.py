# -*- coding: utf-8 -*-


"""# Definisanje potrebnih enuma-a"""

from enum import Enum

"""Enum za aktivacionu funkciju"""

class ActivationType(Enum):
  reLU = 0
  tanh = 1
  sigmoid = 2
  linear = 3
  softmax = 4
  Default = 5

"""Enum za funkciju gubitka"""

class LossType(Enum):
  Binarycross = 0
  Categoricalcross = 1
  Mse = 2
  Default = 3

"""Enum za regularizator"""

class RegularizationType(Enum):
  none = 0
  L1 = 1
  L2 = 2
  Default = 3

"""Enum za tip problema koji se rešava"""

class ProblemType(Enum):
  Choose = 0
  classification = 1
  regression = 2

"""Enum za opcije sređivanja outlier-a"""
class OutlierType(Enum):
  none = 0
  Svm = 1
  MinCovDet = 2
  LocOutFact = 3
  IsolationForest = 4
  Default = 5

"""Enum za optimizator"""

class OptimizerType(Enum):
  Adam = 0
  SGD = 1
  Default = 2


"""Enum za tip enkodiranja"""

class EncodeType(Enum):
  OneHotEncoding = 0
  LabelEncoding = 1
  Default = 2

"""Enum za sredjivanje nedostajucih vrednosti numerickog tipa"""

class ReplaceNumber(Enum):
  none = 0
  Minimum = 1
  Maximum = 2
  Average = 3
  Median = 4
  Delete = 5
  Default = 6



"""Definisanje klase u kojoj se čuvaju podaci sa ulaza"""

class RecieveJson():
    filename : str
    headers : list
    data : list  
    activation_type : ActivationType 
    regularization_type : RegularizationType 
    problem_type : ProblemType  
    optimizer_type : OptimizerType 
    loss_type : LossType  
    encode_type : EncodeType
    replace_number_type : ReplaceNumber  
    outlier_type : OutlierType 
    missingNum: str
    inputs : list  
    output : int  
    
    epoch : int 
    hiddenLayerCounter : int 
    neuronArray : list  

    learning_rate : float  
    regularization_rate : float 

"""Hardkodovanje ulaznih vrednosti"""

data =  RecieveJson()
data.filename="cars.csv"
data.headers=['Car;MPG;Cylinders;Displacement;Horsepower;Weight;Acceleration;Model;Origin']
data.data=[['Chevrolet Chevelle Malibu;18.0;8;307.0;130.0;3504.;12.0;70;US'], ['Buick Skylark 320;15.0;8;350.0;165.0;3693.;11.5;70;US'], ['Plymouth Satellite;18.0;8;318.0;150.0;3436.;11.0;70;US'], ['AMC Rebel SST;16.0;8;304.0;150.0;3433.;12.0;70;US'], ['Ford Torino;17.0;8;302.0;140.0;3449.;10.5;70;US'], ['Ford Galaxie 500;15.0;8;429.0;198.0;4341.;10.0;70;US'], ['Chevrolet Impala;14.0;8;454.0;220.0;4354.;9.0;70;US'], ['Plymouth Fury iii;14.0;8;440.0;215.0;4312.;8.5;70;US'], ['Pontiac Catalina;14.0;8;455.0;225.0;4425.;10.0;70;US'], ['AMC Ambassador DPL;15.0;8;390.0;190.0;3850.;8.5;70;US'], ['Citroen DS-21 Pallas;0;4;133.0;115.0;3090.;17.5;70;Europe'], 
           ['Chevrolet Chevelle Concours (sw);0;8;350.0;165.0;4142.;11.5;70;US'], ['Ford Torino (sw);0;8;351.0;153.0;4034.;11.0;70;US'], ['Plymouth Satellite (sw);0;8;383.0;175.0;4166.;10.5;70;US'], ['AMC Rebel SST (sw);0;8;360.0;175.0;3850.;11.0;70;US'], ['Dodge Challenger SE;15.0;8;383.0;170.0;3563.;10.0;70;US'], ["Plymouth 'Cuda 340;14.0;8;340.0;160.0;3609.;8.0;70;US"], ['Ford Mustang Boss 302;0;8;302.0;140.0;3353.;8.0;70;US'], ['Chevrolet Monte Carlo;15.0;8;400.0;150.0;3761.;9.5;70;US'], 
           ['Buick Estate Wagon (sw);14.0;8;455.0;225.0;3086.;10.0;70;US'], ['Toyota Corolla Mark ii;24.0;4;113.0;95.00;2372.;15.0;70;Japan'], ['Plymouth Duster;22.0;6;198.0;95.00;2833.;15.5;70;US'], ['AMC Hornet;18.0;6;199.0;97.00;2774.;15.5;70;US'], ['Ford Maverick;21.0;6;200.0;85.00;2587.;16.0;70;US'], ['Datsun PL510;27.0;4;97.00;88.00;2130.;14.5;70;Japan'], 
           ['Volkswagen 1131 Deluxe Sedan;26.0;4;97.00;46.00;1835.;20.5;70;Europe'], ['Peugeot 504;25.0;4;110.0;87.00;2672.;17.5;70;Europe'], ['Audi 100 LS;24.0;4;107.0;90.00;2430.;14.5;70;Europe'], ['Saab 99e;25.0;4;104.0;95.00;2375.;17.5;70;Europe'], ['BMW 2002;26.0;4;121.0;113.0;2234.;12.5;70;Europe'], ['AMC Gremlin;21.0;6;199.0;90.00;2648.;15.0;70;US'], ['Ford F250;10.0;8;360.0;215.0;4615.;14.0;70;US'], ['Chevy C20;10.0;8;307.0;200.0;4376.;15.0;70;US'], ['Dodge D200;11.0;8;318.0;210.0;4382.;13.5;70;US'], ['Hi 1200D;9.0;8;304.0;193.0;4732.;18.5;70;US'], ['Datsun PL510;27.0;4;97.00;88.00;2130.;14.5;71;Japan'], 
           ['Chevrolet Vega 2300;28.0;4;140.0;90.00;2264.;15.5;71;US'], ['Toyota Corolla;25.0;4;113.0;95.00;2228.;14.0;71;Japan'], ['Ford Pinto;25.0;4;98.00;0;2046.;19.0;71;US'], ['Volkswagen Super Beetle 117;0;4;97.00;48.00;1978.;20.0;71;Europe'], ['AMC Gremlin;19.0;6;232.0;100.0;2634.;13.0;71;US'], ['Plymouth Satellite Custom;16.0;6;225.0;105.0;3439.;15.5;71;US'], ['Chevrolet Chevelle Malibu;17.0;6;250.0;100.0;3329.;15.5;71;US'], ['Ford Torino 500;19.0;6;250.0;88.00;3302.;15.5;71;US'], ['AMC Matador;18.0;6;232.0;100.0;3288.;15.5;71;US'], ['Chevrolet Impala;14.0;8;350.0;165.0;4209.;12.0;71;US'], ['Pontiac Catalina Brougham;14.0;8;400.0;175.0;4464.;11.5;71;US'], 
           ['Ford Galaxie 500;14.0;8;351.0;153.0;4154.;13.5;71;US'], ['Plymouth Fury iii;14.0;8;318.0;150.0;4096.;13.0;71;US'], ['Dodge Monaco (sw);12.0;8;383.0;180.0;4955.;11.5;71;US'], ['Ford Country Squire (sw);13.0;8;400.0;170.0;4746.;12.0;71;US'], ['Pontiac Safari (sw);13.0;8;400.0;175.0;5140.;12.0;71;US'], ['AMC Hornet Sportabout (sw);18.0;6;258.0;110.0;2962.;13.5;71;US'], ['Chevrolet Vega (sw);22.0;4;140.0;72.00;2408.;19.0;71;US'], ['Pontiac Firebird;19.0;6;250.0;100.0;3282.;15.0;71;US'], ['Ford Mustang;18.0;6;250.0;88.00;3139.;14.5;71;US'], ['Mercury Capri 2000;23.0;4;122.0;86.00;2220.;14.0;71;US'], ['Opel 1900;28.0;4;116.0;90.00;2123.;14.0;71;Europe'], 
           ['Peugeot 304;30.0;4;79.00;70.00;2074.;19.5;71;Europe'], ['Fiat 124B;30.0;4;88.00;76.00;2065.;14.5;71;Europe'], ['Toyota Corolla 1200;31.0;4;71.00;65.00;1773.;19.0;71;Japan'], ['Datsun 1200;35.0;4;72.00;69.00;1613.;18.0;71;Japan'], ['Volkswagen Model 111;27.0;4;97.00;60.00;1834.;19.0;71;Europe'], ['Plymouth Cricket;26.0;4;91.00;70.00;1955.;20.5;71;US'], ['Toyota Corolla Hardtop;24.0;4;113.0;95.00;2278.;15.5;72;Japan'], ['Dodge Colt Hardtop;25.0;4;97.50;80.00;2126.;17.0;72;US'], ['Volkswagen Type 3;23.0;4;97.00;54.00;2254.;23.5;72;Europe'], ['Chevrolet Vega;20.0;4;140.0;90.00;2408.;19.5;72;US'], ['Ford Pinto Runabout;21.0;4;122.0;86.00;2226.;16.5;72;US'],
           ['Chevrolet Impala;13.0;8;350.0;165.0;4274.;12.0;72;US'], ['Pontiac Catalina;14.0;8;400.0;175.0;4385.;12.0;72;US'], ['Plymouth Fury III;15.0;8;318.0;150.0;4135.;13.5;72;US'], ['Ford Galaxie 500;14.0;8;351.0;153.0;4129.;13.0;72;US'], ['AMC Ambassador SST;17.0;8;304.0;150.0;3672.;11.5;72;US'], ['Mercury Marquis;11.0;8;429.0;208.0;4633.;11.0;72;US'], ['Buick LeSabre Custom;13.0;8;350.0;155.0;4502.;13.5;72;US'],
           ['Oldsmobile Delta 88 Royale;12.0;8;350.0;160.0;4456.;13.5;72;US'], ['Chrysler Newport Royal;13.0;8;400.0;190.0;4422.;12.5;72;US'], ['Mazda RX2 Coupe;19.0;3;70.00;97.00;2330.;13.5;72;Japan'], ['AMC Matador (sw);15.0;8;304.0;150.0;3892.;12.5;72;US'], ['Chevrolet Chevelle Concours (sw);13.0;8;307.0;130.0;4098.;14.0;72;US'], ['Ford Gran Torino (sw);13.0;8;302.0;140.0;4294.;16.0;72;US'], ['Plymouth Satellite Custom (sw);14.0;8;318.0;150.0;4077.;14.0;72;US'], ['Volvo 145e (sw);18.0;4;121.0;112.0;2933.;14.5;72;Europe'], 
           ['Volkswagen 411 (sw);22.0;4;121.0;76.00;2511.;18.0;72;Europe'], ['Peugeot 504 (sw);21.0;4;120.0;87.00;2979.;19.5;72;Europe'], ['Renault 12 (sw);26.0;4;96.00;69.00;2189.;18.0;72;Europe'], ['Ford Pinto (sw);22.0;4;122.0;86.00;2395.;16.0;72;US'], ['Datsun 510 (sw);28.0;4;97.00;92.00;2288.;17.0;72;Japan'], ['Toyota Corolla Mark II (sw);23.0;4;120.0;97.00;2506.;14.5;72;Japan'], ['Dodge Colt (sw);28.0;4;98.00;80.00;2164.;15.0;72;US'], ['Toyota Corolla 1600 (sw);27.0;4;97.00;88.00;2100.;16.5;72;Japan'], ['Buick Century 350;13.0;8;350.0;175.0;4100.;13.0;73;US']]

data.inputs=[-1,-1,1,1,-1,-1,-1,-1,-1]
data.output=4
data.regularization_type=RegularizationType.L1
data.learning_rate=0.2
data.regularization_rate=0.2
data.encode_type=EncodeType.LabelEncoding
data.loss_type=LossType.Mse
data.activation_type=ActivationType.linear
data.hiddenLayerCounter=3
data.neuronArray=[10]
data.epoch=10
data.replace_number_type=ReplaceNumber.Average
data.missingNum="Delete"
data.outlier_type=OutlierType.IsolationForest
data.problem_type=ProblemType.classification
data.optimizer_type=OptimizerType.Adam

"""# Formiranje dataframe-a

** Objasnjenje:**

1. S obzirom da jedan string sadži vrdnosti za sve kolone jedne vrste(razdvojene znakom ;), mora se prvo splitovati po ";"

2. Prilikom splitovanja će sve pojedinačne vrednosti u obliku stringa biti spakovane u niz. Dakle, i brojevi će biti u formaru stringa

3. Zato za svaku vrstu treba proveriti da li sadrži numeričke vrednosti i iste pretvoriti u broj, pomoću funkcija **is_number()** i **StrToNum()**
"""

for i in range(10):
  print(data.data[i])

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

"""Sledeća funkcija služi za formiranje DataFrame-a, pomoću funkcije DataFrame iz **pandas** biblioteke. Takođe, neophodno je splitovati string koji predstavlja nazive kolona"""

import pandas as pd
def FormirajDataFrame(data):
  data=ParsMat(data)
  data.headers=(data.headers[0]).split(";")
  df=pd.DataFrame(data.data,columns=data.headers)
  return df

df=FormirajDataFrame(data)

print(df.head())

"""Provera tipova svake kolone u dataset-u

"""

tipovi=df.dtypes
print(tipovi)




"""# Izdvajanje potrebnih kolona u novi dataframe"""

ulazi=[]
i=0
for x in data.inputs:
  if x==1:
    ulazi.append(i)
  i+=1
print(ulazi)

dataset=df

inputs=dataset.iloc[:,ulazi]
inputs.head()

"""Izdvajanje kolone koja predstavlja izlaz iz mreže"""

out=dataset.iloc[:,data.output]
out.head()

"""Objediniti kolone koje predstavljaju ulaz i izlaz iz mreže, tako što na niz koji predtavlja redne brojeve kolona koje su ulaz dodamo redni broj kolone koja je izlaz. Zatim pomoću funkcije iloc() izdvojimo odgovarajuće vrste i kolone."""

ulazi.append(data.output)
datas = dataset.iloc[:,ulazi]
datas.head()

"""# Analiza podataka

Pre svega, proverimo da li naš skup podataka ima nedostajuće vrednosti.
"""

datas.isna().sum()

"""Pozivajući funkciju info() možemo saznati nešto više o našim podacima. Jedan bitan podatak je i tip svakog atributa koji je označen kolonom Dtype."""

datas.info()

"""Tipove podataka po kolonama možemo izdvojiti u niz sledećom komandom"""

tipovi = datas.dtypes
print(tipovi)

"""Analizirajmo malo naš skup podataka. Funkcija describe() daje neke informacije u kolonama, kao što su srednja vrednost, standardno odstupanje, minimum,maksimum itd."""

datas.describe()

"""Ukoliko pozovemo data.shape dobićemo iz koliko vrsta i kolona se sastoji naš 
skup podataka
"""

shapes=datas.shape
print(shapes)

"""# Enkodiranje i obrada nedostajućih vrednosti

## Definisanje potrebnih funkcija

Funkcija LabelEncoding kao argumente prima niz tipova podataka po kolonama i ceoskup podataka sa kojima radimo. Ona svaku kategorijsku promenljivu u skupo podataka enkodira pomocu LabelEncodera.

Povratna vrednost je skup podataka sa enkodiranim kategorijskim kolonama.
"""

def LabelEncoding(tipovi,data):
  i=0
  n=len(tipovi)
  for x in tipovi:
    if x == "object":
      label_encoder = preprocessing.LabelEncoder()
      naziv=data.iloc[:,i].name
      naziv1=naziv+"Label"
      data[naziv1]=label_encoder.fit_transform(data[naziv])
      del data[naziv]
    i+=1
  return data

"""Funkcija OneHotEncoding kao argumente prima niz tipova podataka po kolonama i ceoskup podataka sa kojima radimo. Ona svaku kategorijsku promenljivu u skupo podataka enkodira pomocu One hot enkodera.

Povratna vrednost je skup podataka sa enkodiranim kategorijskim kolonama
"""

def OneHotEncoding(tipovi,data):
  i=0
  n=len(tipovi)
  for x in tipovi:
    if x == "object":
      naziv=data.iloc[:,i].name
      data=pd.get_dummies(data, columns=[naziv],prefix=[naziv])
    i+=1
  return data

"""Funkcija **srediNumericke** kao argumente prima skup podataka, ceo broj (1,2,3...) koji predstavlja kod za određivanje načina sređivanja nedostajućih numeričkih vrednosti, kao i redni broj kolone koja se obrađuje. 

Ukoliko argument **kod** ima vrednost mean, nedostajuće vrednosti će se popuniti srednjom vrednošću kolone, median - popuniće se medijanom, delete-vršiće se brisanje nedostajučih vrednosti, vrednost default znači da je korisnik na front-u odabrao sređivanje nedostajućih vrednosti po default-u. U ovom slučaju je default-na vrednost brisanje, što je moguće promeniti.

Treba napomenuti da se ovde ne vrši klasično brisanje vrsta koje sadrže NaN vrednosti, nego se selektuju sve kolone koje ne sadrže NaN vrednosti. Funkcija dropna() bi obrisala iz celog dataset-a nedostajuće vrednosti i za kategorijske i za numeričke kolone, pa nije pogodna za korišćenje u ovom kontekstu.

Povratna vrednost je izmenjen skup podataka.
"""

def srediNumericke(data,kod,i):
    naziv=data.iloc[:,i].name
    #print(naziv)
    if kod.name == ReplaceNumber.Average.name:
      vrednost=data[naziv].mean()
      data[naziv].fillna(vrednost, inplace=True)
    elif kod.name==ReplaceNumber.Median.name:
      vrednost=data[naziv].median()
      data[naziv].fillna(vrednost,inplace=True)
    elif kod.name==ReplaceNumber.Delete.name:
      data = data.loc[data[naziv].notnull()]
   
   
    return data

"""Funkcija **srediKategorijske** kao argumente prima skup podataka, ceo broj (1,2,3...) koji predstavlja kod za određivanje načina sređivanja nedostajućih kategorijskih vrednosti, kao i redni broj kolone koja se obrađuje. 

Ukoliko argument **kod** ima vrednost min, nedostajuće vrednosti će se popuniti  najmanje ponovljenom vrednošću kolone, max - popuniće se najučestalijom, delete-vršiće se brisanje nedostajučih vrednosti, vrednost default znači da je korisnik na front-u odabrao sređivanje nedostajućih vrednosti po default-u. U ovom slučaju je default-na vrednost brisanje, što je moguće promeniti.


Treba napomenuti da se ovde ne vrši klasično brisanje vrsta koje sadrže NaN vrednosti, nego se selektuju sve kolone koje ne sadrže NaN vrednosti. Funkcija dropna() bi obrisala iz celog dataset-a nedostajuće vrednosti i za kategorijske i za numeričke kolone, pa nije pogodna za korišćenje u ovom kontekstu.

Povratna vrednost je izmenjen skup podataka.
"""

def srediKategorijske(data,kod,i):
  naziv=data.iloc[:,i].name
  items = data[naziv].value_counts(sort=False)
  if kod=="Min":
    item = items.loc[[items.idxmin()]]
    value, count = item.index[0], item.iat[0]
    data[naziv].fillna(value, inplace=True)
  elif kod== "Max":
    item = items.loc[[items.idxmax()]]
    value, count = item.index[0], item.iat[0]
    data[naziv].fillna(value, inplace=True)
  elif kod=="Delete":
    data = data.loc[data[naziv].notnull()]
  return data

"""Sledeća funkcija kao argumente prima dataset, kao i dve celobrojne vrednosti, čiji je značaj objasnjen u prethodnim funkcijama, pojedinačno. Vraća izmenjen skup podataka.

U zavisnosti od toga da li su kolone numeričkog ili kategorijskog tipa, poziva odgovarajuće funkcije za sređivanje nedostajućih vrednosti.


"""

def srediNedostajuce(data,kod1,kod2):
  i=0
  tipovi = data.dtypes
  #print(tipovi)
  n=len(tipovi)
  for x in tipovi:
    if x == "object":
      data=srediKategorijske(data,kod1,i)
      
    else:
      data=srediNumericke(data,kod2,i)
      
    i=i+1
  return data

"""## Obrada nedostajućih vrednosti

Da bismo na pokaznom primeru proverili da li funkcije vrše predviđeni posao, kopirajmo u novu promenljivu ceo dataset.

Proverimo da li postoje nedostajuće vrednosti.
"""

data1=datas.copy()
data1.isna().sum()

data1.head()

tipovi = data1.dtypes
n=len(tipovi)
print(tipovi)

data1 = srediNedostajuce(data1,data.missingNum,data.replace_number_type)
data1.isna().sum()

"""## Enkodiranje

U zavisnosti od podataka koji stižu sa ulaza, vrši se odgovarajuće enkodiranje
"""

if data.encode_type.name==EncodeType.OneHotEncoding.name:
  data1=OneHotEncoding(tipovi,data1)
elif data.encode_type.LabelEncoding == EncodeType.LabelEncoding.name:
  data1=LabelEncoding(tipovi,data1)

data1.head()

"""# Detektovanje outlier-a

## Isolation Forest

Isolation Forest, ili skraćeno iForest, je algoritam za otkrivanje anomalija zasnovan na stablu.

Zasnovan je na modelovanju normalnih podataka na takav način da se izoluju anomalije koje su i malobrojne.

Možda je najvažniji hiperparametar u modelu argument „kontaminacije“, koji se koristi za procenu odstupanja u skupu podataka. Ovo je vrednost između 0,0 i 0,5 i podrazumevano je podešena na 0,1.

## SVM algoritam

Iako je SVM klasifikacioni algoritam, može se koristiti za otkrivanje odstupanja u ulaznim podacima i za skupove podataka za regresiju i za klasifikaciju.

Biblioteka scikit-learn obezbeđuje implementaciju SVM-a jedne klase u klasi OneClassSVM.

Klasa obezbeđuje argument „nu“ koji specificira približni odnos odstupanja u skupu podataka, koji je podrazumevano podešen na 0,1. U ovom slučaju ćemo ga postaviti na 0,01.

## Minimum Covariance Determinant

Biblioteka **scikit-learn** omogućava pristup ovoj metodi preko klase EllipticEnvelope.

On pruža argument „kontaminacije“ koji definiše očekivani odnos odstupanja koji će se posmatrati u praksi. U ovom slučaju, postavićemo je na vrednost od 0,01

## Local Outlier Factor

Može dobro da funkcioniše za prostore sa niskom dimenzionalnošću (malo karakteristika), iako može postati manje pouzdano kako se broj karakteristika povećava, što se naziva prokletstvo dimenzionalnosti.

Faktor lokalnog odstupanja je tehnika koja pokušava da iskoristi ideju najbližih suseda za detekciju odstupanja. 

Biblioteka **scikit-learn** obezbeđuje implementaciju ovog pristupa u klasi LocalOutlierFactor.

# Sređivanje nedostajućih vrednosti
"""

if data.outlier_type.name==OutlierType.IsolationForest.name:
  from sklearn.ensemble import IsolationForest
  #Pronalaženje outlier-a
  iso = IsolationForest(contamination=0.1)
  y = iso.fit_predict(data1)
  mask = y != -1
  data1=data1.iloc[mask, :]

elif data.outlier_type.name==OutlierType.Svm:
  from sklearn.svm import OneClassSVM
  svm = OneClassSVM(nu=0.01)
  y = svm.fit_predict(data1)
  mask = y != -1
  data1=data1.iloc[mask, :]

elif data.outlier_type.name==OutlierType.MinCovDet:
  from sklearn.covariance import EllipticEnvelope
  minCov = EllipticEnvelope(contamination=0.01)
  y = minCov.fit_predict(data1)
  mask = y != -1
  data1=data1.iloc[mask, :]
  
elif data.outlier_type.name == OutlierType.LocOutFact.name:
  from sklearn.neighbors import LocalOutlierFactor
  lof = LocalOutlierFactor()
  y = lof.fit_predict(data1)
  mask = y != -1
  data1=data1.iloc[mask, :]

#Uzmi sve redove koji nisu outlier-i


print(data1.shape)
print(shapes)

"""# Podela na train i test

Ulazne kolone su sve osim poslednje, izlazna je poslednja
"""

from sklearn.model_selection import train_test_split

X=data1.iloc[:,:-1]
y=data1.iloc[:,-1]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, random_state=42
)

print(X_train.shape)

print(X_test.shape)

"""#Skaliranje podataka

 Neuronska mreža će misliti da je vrednost na višoj skali važnija, zato se vrši skaliranje podataka.
"""

from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

"""Štampanjem prvih pet vrsta X_train_scaled vidimo da je skaliranje uspešno izvršeno.

"""

print(X_train_scaled[1:5])

"""#Obuka klasifikacionog modela pomoću TensorFlow biblioteke"""

import tensorflow.keras.models
import tensorflow.keras.layers
from keras import regularizers
from keras.models import Sequential
from keras.layers import Dense
import tensorflow as tf

tf.random.set_seed(42)

"""Formiranje funkcije gubitka"""

if data.loss_type.name == LossType.Binarycross.name:
  los="binary_crossentropy"
elif data.loss_type.name==LossType.Categoricalcross.name:
  los="categorical_crossentropy"
elif data.loss_type.name==LossType.Mse.name:
  los="mse"

"""Formiranje aktivacione funkcije"""

if data.activation_type.name==ActivationType.linear.name:
  activate="linear"
elif data.activation_type.name==ActivationType.reLU.name:
  activate="relu"
elif data.activation_type.name==ActivationType.softmax.name:
  activate="softmax"
elif data.activation_type.name==ActivationType.sigmoid.name:
  activate="sigmoid"
elif data.activation_type.name==ActivationType.tanh.name:
  activate="tanh"

"""Formiranje regularizatora"""

if data.regularization_type.name != RegularizationType.none.name:
  if data.regularization_type.name==RegularizationType.L1.name:
    regularization = regularizers.l1(data.regularization_rate)
  elif data.regularization_type.name==RegularizationType.L2.name:
    regularization = regularizers.l1(data.regularization_rate)

"""Formiranje modela"""

ninput=len(ulazi)
#print(ninput)

if data.problem_type.name == ProblemType.classification.name:
  noutput=len(y.unique())
else:
  noutput=1

#print(noutput)

model = Sequential()
model.add(Dense(ninput, activation=activate,kernel_regularizer=regularization))

for i in range(data.hiddenLayerCounter):
  model.add(Dense(data.neuronArray[0], activation=activate,kernel_regularizer=regularization))

model.add(Dense(noutput, activation=activate,kernel_regularizer=regularization))

if data.optimizer_type.Adam.name==OptimizerType.Adam.name:
  optimizerType = tf.keras.optimizers.Adam(learning_rate=data.learning_rate)
elif data.optimizer_type.name==OptimizerType.SGD.name:
  optimizerType = tf.keras.optimizers.SGD(learning_rate=data.learning_rate)

model.compile(
    loss=los,
    optimizer=optimizerType,
    metrics=[tf.keras.metrics.MeanSquaredError()]
)

arr=[]
for i in range(data.epoch):
  history = model.fit(X_train_scaled, y_train, epochs=1, 
  validation_split=0.2)
  print(f"EPOCH {i}", model.history.history)
  arr.append(model.history.history)

arr1=[]
for k in arr:
 # print(k)
  arrTmp=[]
  for key in k:
    #print(key)
    #print(k[key])
    val=k[key][0]
    arrTmp.append(val)
  arr1.append(arrTmp)
print(arr1)  

evaluate=model.evaluate(X_test,y_test,batch_size=32)
print(evaluate)

"""# Formiranje predikcije"""

predictions = model.predict(X_test_scaled)
print(predictions[:10])


""" 
# Cuvanje loss funkcije i metrike

"""
print("/////////////////////////////////////")
import h5py
import numpy as np

d1 =np.int32(evaluate[0])
d2=np.int32(evaluate[1])
hf = h5py.File('data.h5', 'w')

hf.create_dataset('loss', data=d1)
hf.create_dataset('metrics', data=d2)
hf.close()

hf = h5py.File('data.h5', 'r')

n1 = hf.get('loss')
n1=np.int32(n1)

print("Stampanje vrednosti loss funkcije")
print(n1)

n2 = hf.get('metrics')
n2=np.int32(n2)

print("Stampanje vrednosti metrike")
print(n2)

print("/////////////////////////////////////")
"""# Čuvanje celog modela"""

#model.save("model.h5")

"""U terminalu pokrenuti sledeću komandu 

pip install pyyaml h5py

Definiše se putanja fajla u kom će biti sačuvan model. Formiraće se direktorijum
pod nazivom "EntireModel" i fajl "model.h5". Direktorijum će se naći u trenutnom radnom direktorijumu.
Model se čuva funkcijom **model.save()** kojoj se kao argument prosleđuje definisana putanja.
"""

import os
entire_path = "./EntireModel/model.h5"
entire_dir = os.path.dirname(entire_path)

model.save(entire_path)

"""Funkcija **summary()** daje osnovne podatke o modelu, kao što su broj slojeva neurona i broj neurona u svakom sloju mreže."""

print(model.summary())

"""Učitavanje sačuvanog modela omogućeno je funkcijom **load_model()** koja kao argument prima putanju fajla koji se učitava.

Pozivom funkcije **summary()** zaključujemo da je zaista učitan model koji smo prethdno sačuvali.
"""

new_model=tf.keras.models.load_model(entire_path)
print(new_model.summary())

"""Možemo rekreirati učitani model i prikazati funkciju gubitka i tačnost modela."""

evaluate=new_model.evaluate(X_test,y_test,batch_size=32)
print(evaluate)
