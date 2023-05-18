# -*- coding: utf-8 -*-


"""# Definisanje potrebnih enuma-a"""

from ast import If
from enum import Enum
from operator import index
import pandas as pd
import tensorflow as tf

"""HOST-SERVER"""

backendUrl = "https://localhost:7223"
host = "127.0.0.1"
port = 8000

# backendUrl = "http://147.91.204.115:10046"
# host = "147.91.204.115"
# port = 10048

"""Enum za aktivacionu funkciju"""

class ActivationType(Enum):
  reLU = 0
  tanh = 1
  sigmoid = 2
  linear = 3
  softmax = 4

"""Enum za funkciju gubitka"""

class LossType(Enum):
  Binarycross = 0
  Categoricalcross = 1
  Mse = 2

"""Enum za regularizator"""

class RegularizationType(Enum):
  none = 0
  L1 = 1
  L2 = 2


"""Enum za tip problema koji se rešava"""

class ProblemType(Enum):
  classification = 0
  regression = 1

"""Enum za opcije sređivanja outlier-a"""
class OutlierType(Enum):
  none = 0
  Svm = 1
  MinCovDet = 2
  LocOutFact = 3
  IsolationForest = 4


"""Enum za optimizator"""

class OptimizerType(Enum):
  Adam = 0
  SGD = 1
 
class Normalization(Enum):
  Normalizer = 0
  Scaler = 1
  none = 2

"""Enum za tip enkodiranja"""

class EncodeType(Enum):
  OneHotEncoding = 0
  LabelEncoding = 1

"""Enum za sredjivanje nedostajucih vrednosti numerickog tipa"""

class ReplaceNumber(Enum):
  Delete = 0
  Minimum = 1
  Maximum = 2
  Average = 3
  Median = 4
  
class ReplaceCat(Enum):
  Delete = 0
  MostCommonValue = 1
  TheRarestValue = 2
  
class ReplaceMissing(Enum):
  Delete = 0
  Minimum = 1
  Maximum = 2
  Average = 3
  Median = 4
  MostCommonValue = 5
  TheRarestValue = 6

"""Enum za metrike"""
class MetricType(Enum):
  Accuracy = 0
  MeanSquaredError= 1
  Precision = 2
  Recall = 3
  RootMeanSquaredError = 4
  MeanAbsoluteError = 5

class DataCleaning(Enum):
  Normalizer = 0
  Scaler = 1

class DataType(Enum):
  Numeric = 0
  Categorical = 1


def MatricaZaPredSaFronta(tip_problema,naslovi,numerickiDeo,kategorijskiDeo,outputNum,outputCat):
  matricaZaPred=[]
  if tip_problema == ProblemType.classification.name:
    matricaZaPred.append(ProblemType.classification.value)
  else:
    matricaZaPred.append(ProblemType.regression.value)
  print("Tip problema: ",matricaZaPred[0])
  print("------------------------------------------------------")

  
  for n in numerickiDeo:
    niz=[]
    #if n["headerName"] == x:
    niz.append(n["label"])
    niz.append(n["headerName"])
    matricaZaPred.append(niz)
  
  for n in kategorijskiDeo:
    #if n["headerName"] == x:
    niz=[]
    print(n["headerName"])
    niz.append(n["label"])
    niz.append(n["headerName"])
    niz.append(n["randomNumber"])
    niz.append(n["numberOfValues"])
    niz.append(n["values"])
    matricaZaPred.append(niz)
  
  if (outputNum["headerName"]):
    niz=[]
    niz.append(outputNum["label"])
    niz.append(outputNum["headerName"])
  elif outputCat["label"] == 1:
    niz=[]
    niz.append(outputCat["label"])
    niz.append(outputCat["headerName"])
    niz.append(outputCat["randomNumber"])
    niz.append(outputCat["numberOfValues"])
    niz.append(outputCat["values"])
  matricaZaPred.append(niz)

  print(matricaZaPred)
  return(matricaZaPred)

"""Proverava da li prosledjeni string zapravo broj (ceo ili realan)"""

def is_float(element):
    try:
        float(element)
        return True
    except ValueError:
        return False

def is_int(element):
    try:
        int(element)
        return True
    except ValueError:
        return False

"""Prosledjeni string pretvara u broj"""

def StrToNum(y):
  from numpy import NaN
  for i in range(len(y)):
    if not(y[i]):
      y[i]=NaN
    elif y[i]=='NaN':
      y[i]=NaN
    elif y[i]==" ":
      y[i]=NaN
    elif is_int(y[i]):
      y[i]=int(y[i])
    elif is_float(y[i]):
      y[i]=float(y[i])
  return y

"""Parsira matricu i priprema je za dataframe"""

def ParsMat(data):
  for i in range(len(data.data)):
    #y=data.data[i][0].split(";")
    y=data.data[i]
    #print(y)
    #print(y)
    y=StrToNum(y)
    #print(y)
    data.data[i]=y
  return data

def mapiranje(data,klasa):
  res = data[data.iloc[:,-1] == klasa]
  res=res.iloc[0,-2]
  return res

def FormirajDataFrame(data):
  data=ParsMat(data)
  #data.headers=(data.headers[0]).split(";")
  df=pd.DataFrame(data.data,columns=data.headers)
  return df

"""def LabelEncoding(tipovi,data):
  from sklearn import preprocessing
  i=0
  n=len(tipovi)
  print(tipovi)
  matrica=[]
  for x in tipovi:
    if x == "object":
      #1 za kategorijsku, naziv, brojKlasa, klase
      niz=[]
      label_encoder = preprocessing.LabelEncoder()
      naziv=data.iloc[:,i].name
      niz.append(1)
      niz.append(naziv)
      niz.append(len(data[naziv].unique()))
      #niz.append(data[naziv].unique().tolist())
      naziv1=naziv+"Label"
      data[naziv]=data[naziv].astype(str)
      data[naziv1]=label_encoder.fit_transform(data[naziv])
      #del data[naziv]
      matrica.append(niz)
    i+=1
  print("============JEDINSTVENI==============")
  print(matrica)
  return data"""

def dajSkaliranuVrednost(min,max,act):
  return((act-min)/(max-min))

def ObjedinjenoEnkodiranje(tipovi,data,list1):
  i=0
  lista=list1
  lista[-1]=EncodeType.OneHotEncoding.value
  matrica=[]
  n=len(tipovi)
  from sklearn import preprocessing
  for x in tipovi:
    if x == "object":
      if lista[i]==EncodeType.OneHotEncoding.value or i==n-1:
        naziv=data.iloc[:,i].name
        print("One hot - kolona ",naziv," redni broj ",i)
        #print(naziv)
        data[naziv]=data[naziv].astype(str)

        if len(data[naziv].unique())>20 and i<n-1:
          print("LABEL UMESTO ONEHOT")
          label_encoder = preprocessing.LabelEncoder()
          naziv=data.iloc[:,i].name
          naziv1=naziv+"Label"
          data[naziv]=data[naziv].astype(str)
          data[naziv1]=label_encoder.fit_transform(data[naziv])

          niz=[]
          niz.append(1)
          niz.append(naziv)
          niz.append(1)
          niz.append(len(data[naziv].unique()))
          niz.append(data[naziv].unique().tolist())
          matrica.append(niz)

        else:
          naziv=data.iloc[:,i].name
          y=pd.get_dummies(data.iloc[:,i], columns=[naziv],prefix=[naziv])
          
          print(y.head())
          niz=[]
          niz.append(1)
          niz.append(naziv)
          niz.append(0)
          niz.append(len(data[naziv].unique()))
          niz.append(data[naziv].unique().tolist())
          matrica.append(niz)

          print("_--------------")
        
          data=pd.concat([data, y], axis=1)

      elif lista[i]== EncodeType.LabelEncoding.value:
        label_encoder = preprocessing.LabelEncoder()
        naziv=data.iloc[:,i].name
        print("Label - kolona ",naziv," redni broj ",i)

        niz=[]
        niz.append(1)
        niz.append(naziv)
        niz.append(1)
        niz.append(len(data[naziv].unique()))
        niz.append(data[naziv].unique().tolist())
        matrica.append(niz)
        
        #niz.append(data[naziv].unique().tolist())
        naziv1=naziv+"Label"
        data[naziv]=data[naziv].astype(str)
        data[naziv1]=label_encoder.fit_transform(data[naziv])
        #del data[naziv]
      niz=[]
      """
      0 - 0 za numericku, 1 za kategorijsku
      1 - originalan naziv kolone
      2 - enkodiranje: 0 - one hot, 1 - label
      3 - broj klasa
      4 - sve klase koje postoje
      """

    else:
      naziv=data.iloc[:,i].name
      """
      0 - 0 za numericku, 1 za kategorijsku
      1 - originalan naziv kolone
      """
      niz=[]
      niz.append(0)
      niz.append(naziv)
      matrica.append(niz)

    i+=1
  samoKat=[]
  indexi=[]

  """Izdvaja, zatim brise sve kategorijske iz matrice i dodaje ih na kraj
  Ali prvi brise poslednju kolonu jer je ona predikcija, tj. izlaz
  """
  #matrica.pop()

  for i in range(len(matrica)):
    elem=matrica[i]
    if elem[0] == 1:
      samoKat.append(matrica[i])
      #matrica.pop(i)
      indexi.append(i)
      print("Kategorijska ",elem[1])

  matrica
  mat=[]
  for i in range(len(matrica)):
    ind=0
    for j in indexi:
      if i==j:
        ind=1
    if ind==0:
      mat.append(matrica[i])
      el=matrica[i]
      print(el[1])
  print("Samo numericke")
  

  matrica=mat

  for i in range(len(samoKat)):
    matrica.append(samoKat[i])
  #print(matrica)
  return [data,matrica]


def dataFrameZaPredikciju(matrica,podaci):

  lista=[]
  kolone=[]
  #ELEM JE TIP NIZ KOJI JE OPISAN U PRETHODNOJ FUNKCIJI
  for i in range(len(matrica)-1):
    elem=matrica[i]
    if elem[0] == 0:
      kolone.append(elem[1])
      lista.append(podaci[i])
    else:
      if elem[2] == 0: #one hot enkodiranje, dodaj onoliko kolona koliko klasa i upisu 1 samo  u onu koja je odabrana
        print("One hot - kolona ",elem[1])
        for j in range(elem[3]):
          if j == podaci[i]:
            lista.append(1)
          else:
            lista.append(0)
          kolone.append(elem[4][j])
      else: #label encode - samo dodaj klasu
        print("Label - kolona ",elem[1])
        lista.append(podaci[i])
        kolone.append(elem[1])
  lista=[lista]
  df = pd.DataFrame(lista, columns=kolone)
  #print(df)
  return df


from sklearn.preprocessing import LabelBinarizer, label_binarize
import numpy as np

class MyLabelBinarizer(LabelBinarizer):
    def transform(self, y):
        Y = super().transform(y)
        if self.y_type_ == 'binary':
            return np.hstack((Y, 1-Y))
        else:
            return Y

    def inverse_transform(self, Y, threshold=None):
        if self.y_type_ == 'binary':
            return super().inverse_transform(Y[:, 0], threshold)
        else:
            return super().inverse_transform(Y, threshold)

def LabelBinerizer(tipovi,data):
  print("Label Bin")
  from sklearn.preprocessing import LabelBinarizer
  labelbinarizer=MyLabelBinarizer()
  print(data.isna().sum())
  i=0
  result=[]
  for x in tipovi:
    #x=tipovi[i]
    if x == "object":
      naziv=data.iloc[:,i].name
      print(naziv)
      data[naziv]=data[naziv].astype(str)
      #Koliko ima klasa
      #print(data[naziv].unique())
      #make_encoded_results = labelbinarizer.fit_transform(data[naziv])
      r1 = pd.DataFrame(labelbinarizer.fit_transform(data[naziv]), columns=labelbinarizer.classes_)
      #print(r1.head())
      #Dimenzije df-a, bitno je da svi imaju isti broj vrsta i kolona koliko klasa
      print(r1.shape)
      print(data.shape)
      r1.index=data.index
      #result = pd.concat([data, r1], axis=1).reindex(data.index)
      result.append(r1)
      #result = pd.concat([data, r1], axis=1)
      #print(result.shape)
      print("-----------------")
      #print(make_encoded_results)
      #print(labelbinarizer.classes_)
      #df_make_encoded = pd.DataFrame(make_encoded_results, columns=labelbinarizer.classes_)
      #data=pd.concat([data, r1], axis=1)
      #print(df_make_encoded.head())
      #print(data.head())
      #data=result.copy()
    i=i+1 
  result.append(data)
  data=pd.concat(result,axis=1)
  return data
  
def ConfusionMatrix(y_true,y_pred):
  print("MATRICA KONFUZIJE")
  print("==========================")

  print(tf.math.confusion_matrix(y_true, y_pred))
  return tf.math.confusion_matrix(y_true, y_pred)
  


def OneHotEncoding(tipovi,data):
  import numpy as np
  i=0
  n=len(tipovi)
  jedinstveni=[]
  #for i in range(n):
  for x in tipovi:
    #x=tipovi[i]
    if x == "object":
      naziv=data.iloc[:,i].name
      print(naziv)
      data[naziv]=data[naziv].astype(str)
      jedinstveni.append(len(data[naziv].unique()))
      if len(data[naziv].unique())>20 and i<n-1:
        print("LABEL UMESTO ONEHOT")
        from sklearn import preprocessing
        label_encoder = preprocessing.LabelEncoder()
        naziv=data.iloc[:,i].name
        naziv1=naziv+"Label"
        data[naziv]=data[naziv].astype(str)
        data[naziv1]=label_encoder.fit_transform(data[naziv])
      else:
        y=pd.get_dummies(data.iloc[:,i], columns=[naziv],prefix=[naziv])
        
        print(y.head())
        print("_--------------")
      
        data=pd.concat([data, y], axis=1)
      #data.drop(naziv, inplace=True, axis=1)
      #tipovi = np.delete(tipovi, i)
      #print(data.head())
      #data[y.iloc[:,0].name]=y.iloc[:,0]
      #print(data.head())
      #i=i-1 
      
    i+=1
  #print(data.head())
  print("===================jedinstveni==========================")
  print(jedinstveni)
  return data


def srediNumericke(data,kod,i):
    naziv=data.iloc[:,i].name
    print(naziv)
    print(kod)
    #print(kod.name)
    #print(kod.value)
    if kod == ReplaceMissing.Average.value:
      print("NUM  avg")
      vrednost=data[naziv].mean()
      data[naziv].fillna(vrednost, inplace=True)
    elif kod==ReplaceMissing.Median.value:
      print("NUM med")
      vrednost=data[naziv].median()
      data[naziv].fillna(vrednost,inplace=True)
    elif kod==ReplaceMissing.Minimum.value:
      print("NUM min ")
      vrednost=data[naziv].min()
      data[naziv].fillna(vrednost,inplace=True)
    elif kod==ReplaceMissing.Maximum.value:
      print("NUM max")
      vrednost=data[naziv].max()
      data[naziv].fillna(vrednost,inplace=True)
    elif kod==ReplaceMissing.Delete.value:
      print("NUM del ")
      data = data.loc[data[naziv].notnull()]
    
   
    return data


def srediKategorijske(data,kod,i):
  naziv=data.iloc[:,i].name
  items = data[naziv].value_counts(sort=False)
  print(kod)
  #print(kod.value)
  if kod == ReplaceMissing.TheRarestValue.value:
    print("KAT: min")
    item = items.loc[[items.idxmin()]]
    value, count = item.index[0], item.iat[0]
    data[naziv].fillna(value, inplace=True)
  elif kod == ReplaceMissing.MostCommonValue.value:
    print("KAT: max")
    item = items.loc[[items.idxmax()]]
    value, count = item.index[0], item.iat[0]
    data[naziv].fillna(value, inplace=True)
  elif kod == ReplaceMissing.Delete.value:
    print("KAT: del")
    data = data.loc[data[naziv].notnull()]
  
  return data

def srediNedostajuce1(data,kod1,kod2):
  print("Sredi nedostajuce")
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

def srediNedostajuce(data,lista):
  print("Sredi nedostajuce")
  i=0
  tipovi = data.dtypes
  #print(tipovi)
  n=len(tipovi)
  for x in tipovi:
    if x == "object":
      data=srediKategorijske(data,lista[i],i)
    else:
      data=srediNumericke(data,lista[i],i)
    i=i+1
  return data

def DfToMatrix(data):
  mat=[]
  shapes=data.shape
  for i in range(shapes[0]):
    niz=[]
    for j in range(shapes[1]):
      if is_float(data.iloc[i,j]) or is_int(data.iloc[i,j]):
        #elem=data.iloc[i,j].astype(str)
         elem=str(data.iloc[i,j])
      else:
        elem=data.iloc[i,j]
      niz.append(elem)
    mat.append(niz)
  print(mat[0:5])
  #df=pd.DataFrame(mat)
  #print(df.head())
  return mat


