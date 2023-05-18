#from turtle import pd
from matplotlib.pyplot import axis, draw
import numpy
from pyparsing import nums
from rsa import verify
import definitions as d
import requests
import urllib3
import tensorflow as tf
import pandas as pd
import numpy as np

from ast import Return
import pandas
from sklearn.preprocessing import scale
import definitions as d
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from keras.utils.np_utils import to_categorical
from sklearn.model_selection import train_test_split
from tensorflow.python.keras.layers import Dense
#import tensorflow.keras.models
#import tensorflow.keras.layers
from keras import regularizers
from keras.models import Sequential
from keras.layers import Dense

statGlobal=[]

def statistike(df):
    statNumericke=df.describe()
    missing=df.isna().sum()
    print(missing)
    
    tipovi=df.dtypes
    misNum=[]
    kategorijskeStat=[" ","rarest value","most common value","number of uniques","missing values"]
   
    kategorijske=[]
    kategorijske.append(kategorijskeStat)
    for i in range(len(tipovi)):
        if not(tipovi[i] == "object"):
            misNum.append(missing[i])
        else:
            kolona=[]
            
            naziv=df.iloc[:,i].name
            
            kolona.append(naziv)

            items = df[naziv].value_counts(sort=False)
            item = items.loc[[items.idxmin()]]
            value, count = item.index[0], item.iat[0]
            kolona.append(value)

            item = items.loc[[items.idxmax()]]
            value, count = item.index[0], item.iat[0]
            kolona.append(value)

            kolona.append(len(df[naziv].unique()))

            kolona.append(missing[i])
            print(kolona)
            kategorijske.append(kolona)

    kategorijske=np.transpose(kategorijske)  

    print(statNumericke)
   
    MatNumStat=[]
    kolone=statNumericke.columns.tolist()
    print("KOLONE ",kolone)
    shapes=statNumericke.shape
    for i in range(shapes[0]):
        red=[]
        for j in range(shapes[1]):
            statNumericke.iloc[i,j]=round(statNumericke.iloc[i,j],2)
            red.append(statNumericke.iloc[i,j])
        MatNumStat.append(red)

    minimumi=[]
    maksimumi=[]
    jedinstveni=[]
    for i in range(len(tipovi)):
        if not(tipovi[i] == "object"):
            
            naziv=df.iloc[:,i].name  
            
            items = df[naziv].value_counts(sort=False)
            item = items.loc[[items.idxmin()]]
            value, count = item.index[0], item.iat[0]
            minimumi.append(round(value,2))

            item = items.loc[[items.idxmax()]]
            value, count = item.index[0], item.iat[0]
            maksimumi.append(round(value,2))

            jedinstveni.append(len(df[naziv].unique()))

            #MatNumStat.append(kolona)
            #print("Kolona ",naziv, " najcesca: ",value)
    
    MatNumStat.append(minimumi)
    MatNumStat.append(maksimumi)
    MatNumStat.append(jedinstveni)
    MatNumStat.append(misNum)
    MatNumStat.insert(0,kolone)
    stat = ["","count","mean","std","min","25%","50%","75%","max","rarest value","most common value","number of uniques","missing values"]

    
    MatNumStat=np.insert(MatNumStat,0,stat,axis=1)
    print("===================================================NUMERICKE===============================================================")
    print(pd.DataFrame(MatNumStat))
    print("================================================KATEGORIJSKE===================================================================")
    print(pd.DataFrame(kategorijske))
    print("===================================================================================================================")

    numS = []
    for i in range(len(MatNumStat)):
        row=[]
        for j in range(len(MatNumStat[i])):
            row.append(MatNumStat[i][j])
        numS.append(row)
    katS = []
    for i in range(len(kategorijske)):
        row=[]
        for j in range(len(kategorijske[i])):
            row.append(kategorijske[i][j])
        katS.append(row)


    # global statGlobal
    # statGlobal=numS

    # print(pd.DataFrame(numS))


    return [numS,katS]

    

def returnCorrMatrix(data):
    
    df=d.FormirajDataFrame(data)

    for i in range(df.shape[1]):
        naziv=df.iloc[:,i].name
        if df[naziv].isnull().all():
            print("Kolona ",naziv," je prazna")
            df.drop(naziv, inplace=True, axis=1)
            data.headers.pop(i)

    statistics=statistike(df)
    print(df.info())

    #df = df.dropna(inplace=True)
    print(df.isna().sum())
    print(df.head())

    """from scipy import stats
    cor, pval = stats.spearmanr(df)
    cor=cor.tolist()"""
    cor=df.corr()
    
    naslov=(cor.columns).to_numpy()
    #print(naslov)
    print(cor)
    cor=cor.values.tolist()
    for i in range(len(cor)):
        for j in range(len(cor[i])):
            cor[i][j]=round(cor[i][j],2)
        print(cor[i])
    

    #naslov=data.headers
    #naslov.insert(0,'Column')
    #naslov=naslov.insert(0,'Column')
    #cor.insert(cor,0,naslov)

    naslov=numpy.insert(naslov,0,'Column')
    print(naslov)
    cor.insert(0,naslov)

    print("===================")
    #print(cor)

    for i in range(1,len(naslov)):
        cor[i].insert(0,naslov[i])
    
    #print(cor)

    """df = pandas.DataFrame(cor,columns=[naslov])
    print(df)"""
    matrica=[]
    for i in range (len(cor)):
        red=[]
        for j in range (len(cor[i])):
            red.append(cor[i][j])
        matrica.append(red)

    #matrica je matrix, a statistics je lista sa dve matrice: 1. je za numericke, 2.kategorijske
    return [matrica, statistics]
    # return matrica


def dataPreprocesing(data):
    print(data.replace_missing)
    df=d.FormirajDataFrame(data)
    print(df.head())

    
    print(data.data_types)
    tipovi = df.dtypes
    print("--------------------------------------------")
    for i in range(len(data.data_types)):
        if data.data_types[i] == 1 and not(tipovi[i] == "object"):
            df.iloc[:,i] = df.iloc[:,i].astype(str)
            print("Promenjen tip kolone ",df.iloc[:,i].name)
    print("--------------------------------------------")
    tipovi = df.dtypes
    print(tipovi)

    for i in range(df.shape[1]):
        naziv=df.iloc[:,i].name
        if df[naziv].isnull().all():
            print("Kolona ",naziv," je prazna")
            df.drop(naziv, inplace=True, axis=1)
            data.headers.pop(i)
    
    lista=[]
    for i in range(df.shape[1]):
        #lista.append(0)
        lista.append(data.replace_missing[i])
    data1 = d.srediNedostajuce(df,lista)
  
    print(data1.isna().sum())
    tipovi = data1.dtypes
    print(tipovi)
    #mat=d.DfToMatrix(data1)
    #print(mat[0:5])
    print("----------------------------------------------")
    bezKategorijskih = []
    for i in range(len(tipovi)):
        if not(tipovi[i]=="object"):
            bezKategorijskih.append(i)
    data2=data1.iloc[:,bezKategorijskih]
        
    print(data1.head())
    print(data1.dtypes)
    print(data1.shape)
    print("======================////////////////////////////////////////////////////////////")
    if data.outlier_type.name==d.OutlierType.IsolationForest.name:
        from sklearn.ensemble import IsolationForest
        #Pronalaženje outlier-a
        iso = IsolationForest(contamination=0.1)
        for i in range(data1.shape[1]):
            y=iso.fit_predict(pandas.DataFrame(data1.iloc[:,bezKategorijskih]))
            mask = y!= -1
            data1=data1.iloc[mask,:]

    elif data.outlier_type.name==d.OutlierType.Svm.name:
        from sklearn.svm import OneClassSVM
        svm = OneClassSVM(nu=0.01)
        for i in range(data1.shape[1]):
            y=svm.fit_predict(pandas.DataFrame(data1.iloc[:,bezKategorijskih]))
            mask = y!= -1
            data1=data1.iloc[mask,:]
        """y = svm.fit_predict(data1)
        mask = y != -1
        data1=data1.iloc[mask, :]"""

    elif data.outlier_type.name==d.OutlierType.MinCovDet.name:
        from sklearn.covariance import EllipticEnvelope
        minCov = EllipticEnvelope(contamination=0.01)
        for i in range(data1.shape[1]):
            y=minCov.fit_predict(pandas.DataFrame(data1.iloc[:,bezKategorijskih]))
            mask = y!= -1
            data1=data1.iloc[mask,:]
    
    elif data.outlier_type.name == d.OutlierType.LocOutFact.name:
        from sklearn.neighbors import LocalOutlierFactor
        lof = LocalOutlierFactor()
        for i in range(data1.shape[1]):
            y=lof.fit_predict(pandas.DataFrame(data1.iloc[:,bezKategorijskih]))
            mask = y!= -1
            data1=data1.iloc[mask,:]
    
    print(data1.shape)
    print(data1.head())
    #vrati na norm=data.data_cleaning !!!!!!!!!!!!
    norm = data.data_cleaning
    #norm=d.DataCleaning.Scaler
    print(norm.name)
    print("------------------------------------")
    print((data1.iloc[:,bezKategorijskih]).head())
    print("------------------------------------")
    if norm.name == d.DataCleaning.Scaler.name:
        scaler = MinMaxScaler()
        print("Skaliranje")
        #for i in range(len(tipovi)):
            #if not(tipovi[i] == "object"): 
        data1.iloc[:,bezKategorijskih]=scaler.fit_transform (pandas.DataFrame(data1.iloc[:,bezKategorijskih]))

        print("ZAVRENO SKALIRANJE")

    elif norm.name == d.DataCleaning.Normalizer.name:
        import tensorflow as tf
        print("Normalizacija")
        #for i in range(len(tipovi)):
            #if not(tipovi[i] == "object"): 
        data1.iloc[:,bezKategorijskih]=tf.keras.utils.normalize(pandas.DataFrame(data1.iloc[:,bezKategorijskih]))
                #data1.iloc[:,i]=tf.keras.utils.normalize(data1.iloc[:,i])
    
    print("POSLE NORMALIZACIJE ILI SKALIRANJA")
    print(data1.head())
    print(data1.shape)

    #print(d.DfToMatrix(data1)[0:10])
    #return data1
    data.data=d.DfToMatrix(data1)
    return data


def predikcija(matricaZaPred,listaProba,model):
    print(model.summary())
    #min => 4. vrsta
    #max => 8. vrsta
    #global statGlobal
    #stat = statGlobal
    #print(matricaZaPred)
    print(listaProba)
    for i in range(len(listaProba)):
        listaProba[i]=float(listaProba[i])


    #print(stat)
    tip_problema = matricaZaPred[0]
    matricaZaPred.pop(0)

    """for i in range(len(stat)):
        stat[i]=stat[i][1:]
    
    kolone=stat.pop(0)
    dataf=pd.DataFrame(stat,columns=kolone)
    print(dataf.shape)
    print(dataf)"""
  
    #print(matricaZaPred)

    """print(stat)
    kol = []
    for i in range(len(matricaZaPred)):
        if(matricaZaPred[i][0] == 0):
            kol.append(matricaZaPred[i][1])
            print(matricaZaPred[i][1])
            naziv=matricaZaPred[i][1]
            kolona=dataf[naziv]
            kolona=pandas.DataFrame(kolona,columns=[kolona.name])
            print(kolona)
            print(type(kolona))
            min=kolona.iloc[3,0]
            max=kolona.iloc[7,0]
            
            min=float(min)
            max=float(max)
            print("min ",min," max: ",max)

            act=listaProba[i]
            print("Pre skaliranja: ",act)
            listaProba[i] = (act-min)/(max-min)
            #listaProba[i]=std*(max-min)+min
            print("Posle skaliranja ",listaProba[i])
    print(kol)"""
    """kolone=stat.pop(0)
    print(len(stat))
    """

    print("Funkcija za predikciju")
    #print(matricaZaPred)
    dfPred=d.dataFrameZaPredikciju(matricaZaPred,listaProba)
    #naziv=dfPred.iloc[:,-1].name

   
    outputClass = matricaZaPred[-1]
    print(outputClass)
    print("Dataset koji je ulaz za predikciju")
    print(dfPred.head())
    print("--------------------------------------")
   
    prediction = model.predict(dfPred)

    print("Rezultat predikcije")
    print(prediction)
    print("--------------------------------------")
    niz=[]
    for x in prediction[0]:
        niz.append(x)
    #print(niz)
    izlaz=0
    
    #if data.problem_type.name == d.ProblemType.classification.name:
    if tip_problema==d.ProblemType.classification.value:
        print("KLASIFIKACIJA")
        print("TIP PROBLEMA ",tip_problema," problem type: ",d.ProblemType.classification.value)
        maxI=0
        maxV=0
        for i in range(len(niz)):
            if maxV> niz[i]:
                maxV=niz[i]
                maxI=i

        print(maxV)
        print(maxI)

        
        klase = outputClass[4]
        print("Klase koje mogu biti izlaz")
        print(klase)
        print("--------------------------------------")
        #print(klase[maxI])
        print("Prediktovana klasa")
        izlaz=klase[maxI]
    else:
        print("Regresija")
        izlaz=prediction[0]

    print(izlaz)

    """for i in matricaZaPred:
        print(i[1])"""
    return izlaz

def predikcija2(matricaZaPred,listaProba,model,stat):
    print(model.summary())
    #min => 4. vrsta
    #max => 8. vrsta
    #global statGlobal
    #stat = statGlobal
    #print(matricaZaPred)
    print(listaProba)
    for i in range(len(listaProba)):
        listaProba[i]=float(listaProba[i])


    #print(stat)
    tip_problema = matricaZaPred[0]
    matricaZaPred.pop(0)

    for i in range(len(stat)):
        stat[i]=stat[i][1:]
    
    kolone=stat.pop(0)
    dataf=pd.DataFrame(stat,columns=kolone)
    print(dataf.shape)
    print(dataf)
  
    #print(matricaZaPred)

    print(stat)
    kol = []
    for i in range(len(matricaZaPred)-1):
        if(matricaZaPred[i][0] == 0):
            kol.append(matricaZaPred[i][1])
            #print(matricaZaPred[i][1])
            naziv=matricaZaPred[i][1]
            kolona=dataf[naziv]
            kolona=pandas.DataFrame(kolona,columns=[kolona.name])
            print(kolona)
            print(type(kolona))
            min=kolona.iloc[3,0]
            max=kolona.iloc[7,0]
            
            min=float(min)
            max=float(max)
            print("min ",min," max: ",max)

            act=listaProba[i]
            print("Pre skaliranja: ",act)
            listaProba[i] = (act-min)/(max-min)
            #listaProba[i]=std*(max-min)+min
            print("Posle skaliranja ",listaProba[i])
    #print(kol)
    """kolone=stat.pop(0)
    print(len(stat))
    """

    print("Funkcija za predikciju")
    #print(matricaZaPred)
    dfPred=d.dataFrameZaPredikciju(matricaZaPred,listaProba)
    #naziv=dfPred.iloc[:,-1].name

   
    outputClass = matricaZaPred[-1]
    print(outputClass)
    print("Dataset koji je ulaz za predikciju")
    print(dfPred.head())
    print("--------------------------------------")
   
    prediction = model.predict(dfPred)

    print("Rezultat predikcije")
    print(prediction)
    print("--------------------------------------")
    niz=[]
    for x in prediction[0]:
        niz.append(x)
    #print(niz)
    izlaz=0
    
    #if data.problem_type.name == d.ProblemType.classification.name:
    if tip_problema==d.ProblemType.classification.value:
        print("KLASIFIKACIJA")
        print("TIP PROBLEMA ",tip_problema," problem type: ",d.ProblemType.classification.value)
        maxI=0
        maxV=0
        for i in range(len(niz)):
            if maxV> niz[i]:
                maxV=niz[i]
                maxI=i

        print(maxV)
        print(maxI)

        
        klase = outputClass[4]
        print("Klase koje mogu biti izlaz")
        print(klase)
        print("--------------------------------------")
        #print(klase[maxI])
        print("Prediktovana klasa")
        izlaz=klase[maxI]
        print("Kolona: ",outputClass[1]," Izlaz: ", izlaz)
        return[outputClass[1],izlaz]
    else:
        print("Regresija")
        izlaz=prediction[0]

        naziv=matricaZaPred[-1][1]
        kolona=dataf[naziv]
        kolona=pandas.DataFrame(kolona,columns=[kolona.name])
        print(kolona)
        print(type(kolona))
        min=kolona.iloc[3,0]
        max=kolona.iloc[7,0]

        izlaz[0] = izlaz[0]*(max-min)+min
        print("Kolona: ",outputClass[1]," Izlaz: ", izlaz[0])
        return [outputClass[1], izlaz[0]]

    

    """for i in matricaZaPred:
        print(i[1])"""
    


def pythonPart(data):
    print("-----------------------")
    #print((data.train_validation_ratio/100))
    #data.data=data.data[0:90]
    print(data.data_type)
    print("-----------------------")

    #data=dataPreprocesing(data)
    
    df=d.FormirajDataFrame(data)
    df.dropna(inplace=True)
    #print(df.head())
    tipovi=df.dtypes
    print(tipovi)
    print(data.data_type)
    print("--------------------------------------------")
    for i in range(len(data.data_type)):
        if data.data_type[i] == 1 and not(tipovi[i] == "object"):
            df.iloc[:,i] = df.iloc[:,i].astype(str)
            print("Promenjen tip kolone ",df.iloc[:,i].name)
    print("--------------------------------------------")
    tipovi = df.dtypes
    print(tipovi)

    #print(tipovi)
    ulazi=[]
    i=0
    for x in data.inputs:
        if x==1:
            ulazi.append(i)
        i+=1
    #print(ulazi)
    dataset=df
    inputs=dataset.iloc[:,ulazi]

    #print(inputs.head())
    out=dataset.iloc[:,data.output]
    outname=dataset.columns[data.output]
    print(outname)
    print("===================KLASE=====================")
    klas=out.unique()
    #print(klas)

    klase=[]
    for i in range(len(klas)):
        klase.append(klas[i])

    #print(out.head())
    ulazi.append(data.output)
    datas = dataset.iloc[:,ulazi]
    #print(datas.head())
    #print(datas['LatD'])
    #print(datas.isna().sum())
    #print(datas.info())
    #print(datas.describe())
    shapes=datas.shape
    #print(shapes)
    data1=datas.copy()
    #print(data1.isna().sum())

    #print(data1.head())

    tipovi = data1.dtypes
    n=len(tipovi)

    if out.dtypes == "object":
        print("KLASIFIKACIJA")
        data.problem_type=d.ProblemType.classification
    else:
        if data.problem_type.name == d.ProblemType.classification.name:
            print("Klasifikacija numerickih")
            data1.iloc[:,-1] = data1.iloc[:,-1].astype(str)

    print(data1.isna().sum())
    tipovi = data1.dtypes

    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    #Za svaku kolonu pamti koliko klasa ima. Ako je kolona numericka, vrednost ce biti 1
    
    brojKlasaPoKoloni=[]
    j=0
    for i in tipovi:
        if i == "object":
            brojKlasaPoKoloni.append(len((data1.iloc[:,j]).unique()))
        else:
            brojKlasaPoKoloni.append(1)
        j+=1

    print(brojKlasaPoKoloni)
    print("~~~~~~~~~~~~~~~~~~ENKODIRANJE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    #HARDCODE LISTA ZA ENKODIRANJA
    """enkodiranja=[]
    for i in range(data1.shape[1]):
        if i%2==0:
            enkodiranja.append(d.EncodeType.LabelEncoding.value)
        else:
            enkodiranja.append(d.EncodeType.OneHotEncoding.value)"""

    
    #enkodiranja.append(d.EncodeType.OneHotEncoding)

    if data.problem_type.name == d.ProblemType.classification.name:
        num = len((data1.iloc[:,-1]).unique())
                                                #data.encode_type
    res=d.ObjedinjenoEnkodiranje(tipovi,data1,data.encode_type)
    data1=res[0]
    matricaZaPred=res[1]
    tipovi=data1.dtypes
            
    brisanje=[]
    j=0
    for x in tipovi:
        if x == "object":
            naziv=data1.iloc[:,j].name
            brisanje.append(naziv)
        j=j+1
    data1.drop(brisanje,axis=1,inplace=True)

    print("============NAKON ENKODIRANJA=====")
    print(data1.head())

    """if data.problem_type.name == d.ProblemType.classification.name and enkodiranja[-1].name == d.EncodeType.LabelEncoding.name:
        kodiranIzlaz = to_categorical(data1.iloc[:,-1], dtype ="uint8")"""   

    print(data1.head())

    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    #print(matricaZaPred)
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    """if data.encode_type.name==d.EncodeType.OneHotEncoding.name:
        if data.problem_type.name == d.ProblemType.classification.name:
            num = len((data1.iloc[:,-1]).unique())
            #klase=(data1.iloc[:,-1]).unique()
            #print("Klase ",klase)
    
            #data1=OneHotEncoder().fit_transform(data1)

            print(data1.head())

            data1=d.OneHotEncoding(tipovi,data1)

            shapes1=data1.shape
            kolone=data1.iloc[:,-num:shapes1[1]]
            nizKlasa=[]
            for k in kolone:
                nizKlasa.append(k)
            print(nizKlasa)

            tipovi=data1.dtypes
            
            brisanje=[]
            j=0
            for x in tipovi:
                if x == "object":
                    naziv=data1.iloc[:,j].name
                    brisanje.append(naziv)
                j=j+1
            data1.drop(brisanje,axis=1,inplace=True)
            print(data1.head())
        else:
            data1=d.OneHotEncoding(tipovi,data1)
            #data1=OneHotEncoder().fit_transform(data1)
            print(data1.head())
        
            tipovi=data1.dtypes
            brisanje=[]
            j=0
            for x in tipovi:
                if x == "object":
                    naziv=data1.iloc[:,j].name
                    brisanje.append(naziv)
                j=j+1
            data1.drop(brisanje,axis=1,inplace=True)
            print(data1.head())"""

    """elif data.encode_type.name == d.EncodeType.LabelEncoding.name:
        data1=d.LabelEncoding(tipovi,data1)
        if data.problem_type.name == d.ProblemType.classification.name:
            num = len((data1.iloc[:,-1]).unique())
            klase=(data1.iloc[:,-1]).unique()
            print("Klase ",klase)
    
            #data1=OneHotEncoder().fit_transform(data1)

            print(data1.head())

            data1=d.LabelBinerizer(tipovi,data1)
            print(data1.head())
            shapes1=data1.shape
            kolone=data1.iloc[:,-num:shapes1[1]]
            nizKlasa=[]
            for k in kolone:
                nizKlasa.append(k)
            print(nizKlasa)

        tipovi=data1.dtypes
        print(tipovi)
        
        brisanje=[]
        j=0
        for x in tipovi:
            if x == "object":
                naziv=data1.iloc[:,j].name
                brisanje.append(naziv)
            j=j+1
        data1.drop(brisanje,axis=1,inplace=True)
        print(data1.head())
        else:
            data1=d.LabelBinerizer(tipovi,data1)
            #data1=OneHotEncoder().fit_transform(data1)
            print(data1.head())
        
            tipovi=data1.dtypes
            brisanje=[]
            j=0
            for x in tipovi:
                if x == "object":
                    naziv=data1.iloc[:,j].name
                    brisanje.append(naziv)
                j=j+1
            data1.drop(brisanje,axis=1,inplace=True)
            print(data1.head())"""   

    #print(data1.head())
    #print(data1.dtypes)
    print("======================////////////////////////////////////////////////////////////")
    
    #print(data1.shape)
    #print(shapes)

    shapes1=data1.shape

    if data.problem_type.name == d.ProblemType.classification.name:
        #if data.encode_type.name==d.EncodeType.OneHotEncoding.name:
        X=data1.iloc[:,0:(shapes1[1]-num)]
        y=data1.iloc[:,-num:shapes1[1]]
        """elif data.encode_type.name== d.EncodeType.LabelEncoding.name:
            X=data1.iloc[:,:-1]
            y=data1.iloc[:,-1]

            y=pandas.DataFrame(y,columns=[y.name])"""
    else:

        #print(data1.head())

        X=data1.drop(outname,axis=1)
        y=data1[outname]
        
        y=pandas.DataFrame(y,columns=[y.name])

    X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=(data.train_test_ratio/100), random_state=42
    )

    print(X_train.head())
    print(y_train.head())

    X_train_scaled = X_train
    print(X_train_scaled.shape)
    #PRVI NACIN PODELE NA VALIDACIONI I TRENING -PROCENTUALNA PODELA
    X_train_scaled,X_val,y_train,y_val=train_test_split(X_train_scaled,y_train,test_size=(data.train_validation_ratio/100),random_state=42)

    #DRUGI NACIN PODELE NA VALIDACIONI I TRENING - APSOLUTNA PODELA (PO BROJU VRSTA)
    #(X_train_scaled,X_val)=(X_train_scaled.iloc[0:-100,:],X_train_scaled.iloc[-100:,:])
    #(y_train,y_val)=(y_train.iloc[0:-100,:],y_train.iloc[-100:,:])

    print(X_train_scaled.shape)
    print(X_val.shape)

    print(X_test.shape)

    #from sklearn.preprocessing import StandardScaler
    import pandas as pd                

    """print(y_test.shape)
    print(y_train.shape)
    print(X_test.shape)
    print(X_train_scaled.shape)"""
    
    print("/////////////////////////")

    tf.random.set_seed(42)

    """Formiranje funkcije gubitka"""

    if data.loss_type.name == d.LossType.Binarycross.name:
        los=tf.keras.losses.BinaryCrossentropy(from_logits=True)
    elif data.loss_type.name ==d.LossType.Categoricalcross.name:
        los=tf.keras.losses.CategoricalCrossentropy()
    elif data.loss_type.name==d.LossType.Mse.name:
        los=tf.keras.losses.MeanSquaredError()

    """Formiranje aktivacione funkcije"""

    if data.activation_type.name==d.ActivationType.linear.name:
        activate="linear"
    elif data.activation_type.name==d.ActivationType.reLU.name:
        activate="relu"
    elif data.activation_type.name==d.ActivationType.softmax.name:
        activate="softmax"
    elif data.activation_type.name==d.ActivationType.sigmoid.name:
        activate="sigmoid"
    elif data.activation_type.name==d.ActivationType.tanh.name:
        activate="tanh"

    #HARDCODE ZA AKTIVACIONE ZA SVAKI SLOJ
    nizAktivacionih=[]
    for i in range(data.hiddenLayerCounter):
        if i%5==0:
            nizAktivacionih.append("linear")
        elif i%5==1:
            nizAktivacionih.append("relu")
            nizAktivacionih.append("softmax")
        elif i%5==3:
            nizAktivacionih.append("sigmoid")
        elif i%5==4:
            nizAktivacionih.append("tanh")

    """Formiranje regularizatora"""

    if data.regularization_type.name != d.RegularizationType.none.name:
        if data.regularization_type.name==d.RegularizationType.L1.name:
          regularization = regularizers.l1(data.regularization_rate)
        elif data.regularization_type.name==d.RegularizationType.L2.name:
            regularization = regularizers.l1(data.regularization_rate)
    else:
        regularization=None

    """Formiranje modela"""

    ninput=(X_train_scaled.shape)[1]
    print(ninput)
    
    if data.problem_type.name == d.ProblemType.classification.name:
        #if data.encode_type.name==d.EncodeType.OneHotEncoding.name:
        noutput = num
        #elif data.encode_type.name==d.EncodeType.LabelEncoding.name:
            #noutput=len(y.unique())
            #noutput=1
    else:
        noutput=1
    print(noutput)

    model = Sequential()
    model.add(Dense(ninput, activation=activate,kernel_regularizer=regularization))

    for i in range(data.hiddenLayerCounter):
        model.add(Dense(data.neuronArray[i], activation=nizAktivacionih[i],kernel_regularizer=regularization))

    """if data.loss_type.name==d.LossType.Categoricalcross.name:
        model.add(Dense(noutput, activation="softmax",kernel_regularizer=regularization))
    elif data.loss_type.name == d.LossType.Binarycross.name:
        model.add(Dense(noutput, activation="sigmoid",kernel_regularizer=regularization))
    elif data.problem_type.name == d.ProblemType.regression.name:
        model.add(Dense(noutput, activation="linear",kernel_regularizer=regularization))
    else:
        if noutput>2:
            model.add(Dense(noutput, activation="softmax",kernel_regularizer=regularization))
        else:
            model.add(Dense(noutput, activation="sigmoid",kernel_regularizer=regularization))"""
    if noutput>2:
        model.add(Dense(noutput, activation="softmax",kernel_regularizer=regularization))
    elif noutput==2:
        model.add(Dense(noutput, activation="sigmoid",kernel_regularizer=regularization))
    elif noutput==1:
        if data.problem_type == d.ProblemType.regression.name:
            model.add(Dense(noutput, activation="linear",kernel_regularizer=regularization))
        else:
            model.add(Dense(noutput, activation="sigmoid",kernel_regularizer=regularization))





    if data.optimizer_type.Adam.name==d.OptimizerType.Adam.name:
        optimizerType = tf.keras.optimizers.Adam(learning_rate=data.learning_rate)
    elif data.optimizer_type.name==d.OptimizerType.SGD.name:
        optimizerType = tf.keras.optimizers.SGD(learning_rate=data.learning_rate)

    #HARDCODE ZA METRIKE
    if data.problem_type.name == d.ProblemType.classification.name:
        #metric=[tf.keras.metrics.Precision(),tf.keras.metrics.CategoricalAccuracy(),tf.keras.metrics.Recall()]
        metric=[tf.keras.metrics.FalseNegatives(),tf.keras.metrics.CategoricalAccuracy(),tf.keras.metrics.CategoricalCrossentropy()]
    else:
        metric=[tf.keras.metrics.RootMeanSquaredError(),tf.keras.metrics.MeanSquaredError(),tf.keras.metrics.MeanAbsoluteError()]
    
    """X_train_scaled =tf.convert_to_tensor(X_train, dtype=tf.float32)  
    y_train = tf.convert_to_tensor(y_train, dtype=tf.float32)
    X_test = tf.convert_to_tensor(X_test, dtype=tf.float32)
    y_test = tf.convert_to_tensor(y_test, dtype=tf.float32)"""


    model.compile(
    loss=los,
    optimizer=optimizerType,
    metrics=[metric]
    )

    

    arr=[]
    for i in range(data.epoch):
        history = model.fit(X_train_scaled, y_train, epochs=1, 
        validation_data=(X_val,y_val))
        print(f"EPOCH {i}", model.history.history)
        arr.append(model.history.history)

        epoch_endpoint = d.backendUrl + "/api/chart/get_epoch"

        temp = []

        
        urllib3.disable_warnings()
        PYTHONHTTPSVERIFY=0
        import os, ssl

        if (not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None)):
            ssl._create_default_https_context = ssl._create_unverified_context

        for key in model.history.history:
            val=model.history.history[key][0]
            temp.append(val)
            

        response = requests.post(url=epoch_endpoint, json={"data" : temp, "connectionId": data.connectionId},verify=False)
        print(response.text)

        print("================================================")
        print(temp)
        print("================================================")


    """
    filePath = "./EntireModel/model.h5"
    api_endpoint = "https://localhost:7223/api/DataTransfer/downloadH5_2"
    with open(filePath, "rb") as postFile:
                file_dict = {"file": postFile}
                response = requests.post(api_endpoint, files=file_dict, verify=False)
    print (response.text)
    """
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

    predictions = model.predict(X_test)
    print(predictions[:10])

    import numpy as np
    """if (data.encode_type.name== d.EncodeType.LabelEncoding.name) and (data.problem_type.name == d.ProblemType.classification.name):
       #for i in range (len(predictions)):
       for i in range(10):
           m=np.argmax(predictions[i])
           #print(m)
           real=y_test.iloc[i]
           #print("Predicted: ",m," Real: ",real)
           print("Predicted class: ",label_dict[m], " Real: ",label_dict[real]) """
    #elif (data.encode_type.name== d.EncodeType.OneHotEncoding.name) and (data.problem_type.name == d.ProblemType.classification.name):
    """
    
    OVAJ DEO NE RADI JER JE Y_TEST SKALIRANO I VISE NIJE DATAFRAME
    
    if data.problem_type.name == d.ProblemType.classification.name:
        for i in range (10):
           m=np.argmax(predictions[i])
           sh=y_test.shape
           for j in range(sh[1]):
               if y_test.iloc[i,j] == 1:
                   #print(y_test.iloc[:,j].name)
                    #real=y_test.iloc[:,j].name
                    real=y_test.iloc[:,j].name
           print("Predicted class: ",nizKlasa[m], " Real: ",real)"""

    """# Čuvanje celog modela"""

    import os
    #entire_path = "./EntireModel/model.h5"
    entire_path = "./EntireModel/"+data.connectionId+".h5"
    entire_dir = os.path.dirname(entire_path)

    model.save(entire_path)
    print(model.summary())


    #new_model=tf.keras.models.load_model(entire_path)
    #print(new_model.summary())

    """Možemo rekreirati učitani model i prikazati funkciju gubitka i tačnost modela."""

    #evaluate=new_model.evaluate(X_test,y_test,batch_size=32)
    #print(evaluate)

    print(arr1)
    mat=[]
    matConfSend=[]
    if data.problem_type.name == d.ProblemType.classification.name:
        if len(klase)<=20:
            #if data.encode_type.name==d.EncodeType.OneHotEncoding.name:
            from sklearn import preprocessing
            label_encoder = preprocessing.LabelEncoder()
            
            nizK=[]
            for i in range(y_test.shape[0]):
                red=y_test.iloc[i,:]
                for j in range(len(red)):
                    if red[j] == 1:
                        k=j
                nizK.append(k)
            print(nizK[0:10])
            
            nizP=[]
            for i in range(len(predictions)):
                red = predictions[i]
                max=red[0]
                r=0 
                for j in range(len(red)):
                    if red[j]>max:
                        max=red[j]
                        r=j
                nizP.append(r)
            print(nizP[0:10])
            #print(predictions[0:10])
            """else:
                nizK=[]
                nizP=[]

                for i in range(len(y_test)):
                    nizK.append(y_test.iloc[i,0])
                    nizP.append(predictions[i])"""

            matConf = d.ConfusionMatrix(nizK,nizP)
            #from sklearn.metrics import classification_report
            #report=classification_report(nizK,nizP)
            matConf=matConf.numpy()
            print(matConf)
            for i in range(len(matConf)):
                row=[]
                for j in range(len(matConf[i])):
                    row.append(matConf[i][j])
                    #print(matConf[i][j])
                matConfSend.append(row)
            print("============================")
            print(matConfSend)
            print("=============================")

            matrica = np.array(matConfSend)
            matrica=matrica.tolist()
            for i in range (len(klase)):
                klase[i]=str(klase[i])
            klase=numpy.insert(klase,0," ")
            print(klase)

            matrica.insert(0,klase)
            print("===================")
            for i in range(1,len(klase)):
                matrica[i].insert(0,klase[i])
            #print(matrica)
            mat=[]
            for i in range (len(matrica)):
                row=[]
                for j in range (len(matrica[i])):
                    row.append(matrica[i][j])
                mat.append(row)
            print("-----------------------")
            print(mat)
        else:
            mat=[['NUMBER OF CLASSES IS MORE THEN ALLOWED!']]
            print("=============MATRICA KONFUZIJE=================")
            print(mat)

        #print(report)
    else:
        mat=[]

    urllib3.disable_warnings()
    """url="https://localhost:7223/api/DataTransfer/downloadH5_2"
    filess={'file':open('./EntireModel/model.txt','rb')}
    r=requests.post(url,files=filess)
    print(r.status_code)
    print(r.text)"""

    PYTHONHTTPSVERIFY=0
    import os, ssl

    if (not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None)):
        ssl._create_default_https_context = ssl._create_unverified_context
    
    
    """#API_ENDPOINT = "https://localhost:7223/api/DataTransfer/downloadH5_2"
    API_ENDPOINT = "https://localhost:7223/api/DataTransfer/downloadH5_2"

    data = {'file': open('./EntireModel/model.h5', 'rb')}
            #'api_paste_format':'python'}

    print(data)        
    #headers = {
    #'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
    #}
    headers = {"Content-Type" : "multipart/form-data"}

    r = requests.post(url = API_ENDPOINT, data = data, headers = headers, verify=False)
    print("Request")
    print(r)
    print(r.headers)
    return arr1""" 

    filePath = "./EntireModel/" + data.connectionId + ".h5"
    api_endpoint = d.backendUrl + "/api/DataTransfer/downloadH5_2?username=" + data.username + "&problemName=" + data.problem_name + "&modelName=" + data.model_name
    with open(filePath, "rb") as postFile:
                file_dict = {"file": postFile}
                response = requests.post(api_endpoint, files=file_dict, verify=False)
    print (response.text)

    print("########################")
    
    """HARDCODE ZA PROBNI ULAZ"""
    listaProba=[]
    for i in range(len(matricaZaPred)):
        if i%2==0:
            listaProba.append(0)
        else:
            listaProba.append(1)
    #dfPred=d.dataFrameZaPredikciju(matricaZaPred,listaProba)
    #naziv=dfPred.iloc[:,-1].name
    tip_problema=data.problem_type.value
    matricaZaPred.insert(0,tip_problema)
    try:
        predikcija(matricaZaPred,listaProba,model)
    except:
        print("ERROR WHILE PREDICTING PROCES")


    print("++++++++++++++++++++")
    #print(matricaZaPred)

    #outputClass = matricaZaPred[-1]
    """ PROVERAVANJE DA LI RADI
    if data.problem_type.name == d.ProblemType.classification.name:    
        brisanje=[]
        elem=matricaZaPred[-1]
        print(matricaZaPred[-1])
        for i in range(elem[3]):
            brisanje.append(dfPred.iloc[:,(-1-i)].name)

        dfPred.drop(brisanje,axis=1,inplace=True)
    else:
        dfPred.drop(dfPred.iloc[:,-1].name,axis=1,inplace=True)

    print("Dataset koji je ulaz za predikciju")
    print(dfPred.head())
    print("--------------------------------------")
    print(X_test.head())
    print("---------------------------------------")
    prediction = model.predict(dfPred)

    print("Rezultat predikcije")
    print(prediction)
    print("--------------------------------------")
    niz=[]
    for x in prediction[0]:
        niz.append(x)
    #print(niz)
    izlaz=0
    if data.problem_type.name == d.ProblemType.classification.name:
        maxI=0
        maxV=0
        for i in range(len(niz)):
            if maxV> niz[i]:
                maxV=niz[i]
                maxI=i

        #print(maxV)
        #print(maxI)

        
        klase = outputClass[4]
        print("Klse koje mogu biti izlaz")
        print(klase)
        print("--------------------------------------")
        #print(klase[maxI])
        print("Prediktovana klasa")
        izlaz=klase[maxI]
    else:
        print("Regresija")
        izlaz=prediction[0]

    print(izlaz)

    for i in matricaZaPred:
        print(i[1])"""

    #matrica = np.array(matConfSend)
    #matrica=matrica.tolist()
    return [mat,arr1,matricaZaPred]
    # return {"trainMetrics":arr1, "confMatrix":matrica}
    # return arr1

