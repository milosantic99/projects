import statistics
import string
import pandas
from starlette.requests import Request
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
import program
import requests
import json
from enum import Enum, auto
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import uvicorn
import definitions as d
from typing import Any
import tensorflow as tf

origins = ["*"]
dotNetURL = d.backendUrl +  "/api/DataTransfer/getIfroFromFronted"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReceiveCsv(BaseModel):
  filename : str
  headers : list
  data : list 

class ActivationType(Enum):
  reLU = 0
  tanh = 1
  sigmoid = 2
  linear = 3
  softmax = 4


class OptimizerType(Enum):
  Adam = 0
  SGD = 1


class RegularizationType(Enum):
  none = 0
  L1 = 1
  L2 = 2


class LossType(Enum):
  Binarycross = 0
  Categoricalcross = 1
  Mse = 2


class ProblemType(Enum):
  classification = 0
  regression = 1


class OutlierType(Enum):
  none = 0
  Svm = 1
  MinCovDet = 2
  LocOutFact = 3
  IsolationForest = 4


class EncodeType(Enum):
  OneHotEncoding = 0
  LabelEncoding = 1


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

class ReturnChart():
  data : list
  username : str
  model_name : str
  problem_name : str
  conf_matrix : list
  matrica_za_predikciju : list


class DataCleaning(Enum):
  Normalizer = 0
  Scaler = 1

class DataType(Enum):
  Numeric = 0
  Categorical = 1

class Info(BaseModel):
    id : int
    name : str

class Item(BaseModel):
    data: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

class ReciveveJson(BaseModel):
    filename : str
    headers : list
    data : list  
    activation_type : ActivationType 
    regularization_type : RegularizationType 
    problem_type : ProblemType  
    optimizer_type : OptimizerType 
    loss_type : LossType  
    
    inputs : list  
    output : int  
    
    epoch : int 
    hiddenLayerCounter : int 
    neuronArray : list  

    learning_rate : float  
    regularization_rate : float 

    connectionId : str
    username : str

    model_name : str
    problem_name : str

    train_validation_ratio : int
    train_test_ratio : int

    encode_type : list  
    data_type : list
    

class testReceive(BaseModel):
    act : ActivationType


class ProblemModel(BaseModel):
  filename : str
  headers : list
  data : list
  outlier_type : OutlierType
  username : str
  replace_missing : list
  problem_name : str
  data_cleaning : DataCleaning
  data_types : list
  statistics : list





@app.post("/saveProblem")
def saveProblem(data: ProblemModel):

  print("----------")
  print(data.data_types)

  data1=program.dataPreprocesing(data)

  print(data.statistics)

  return data1

  #return {"data":data1}
  #return {}


@app.post("/netToFastAPI")
def getJson(data: ReciveveJson):

    print("USAO")

    # print(data.filename)
    # print(data.headers)
    # #print(data.data)
    # print(data.activation_type)
    # print(data.learning_rate)
    # print(data.regularization_type)
    # print(data.regularization_rate)
    # print(data.problem_type)
    # print(data.inputs)
    # print(data.output)
    # print(data.optimizer_type)
    # print(data.loss_type)
    # print(data.hiddenLayerCounter)
    # print(data.neuronArray)
    # print(data.encode_type)
    # print(data.connectionId)

    # print("USAO")

    # print(data.data[0])
    # print(data.data[1])
    # print(data.data[2])

    print(data.problem_name)
    print(data.model_name)
    
    print("$$$$$$$$$$")
    print(data.encode_type)
    print(data.data_type)
    print("$$$$$$$$$$")

    
    df = program.pythonPart(data)

    return_data = ReturnChart()
    return_data.conf_matrix = df[0]
    
    return_data.data = df[1]

    return_data.matrica_za_predikciju = df[2]

    return_data.model_name = data.model_name
    return_data.username = data.username
    return_data.problem_name = data.problem_name
    
    # print(df)

    return return_data


@app.post("/readCSV")
async def readCsv(file: UploadFile):
    print("ok")
    #print(len(file))
    return "ok"


@app.post("/uploadfile")
async def create_upload_file(file: ReceiveCsv):
    if not file:
        print("No file uploaded")
        return {"message": "No upload file sent"}
    else:
        print("File uploaded successfully")
        print(file.filename)
        print(file.headers)
        #print(file.data)

        res = program.returnCorrMatrix(file)

        #stats = res[1]
        #return stats[0]

        return res
        #return {"corrMatrix": returnCorrMatrix(file)}

        # return {"filename": file.filename}

class Temp(BaseModel):
  temp:str



class Chart():
  data1:list
  data2:list

@app.post("/chartData")
async def ChartData(temp: Temp):
  
  data1 = [4,7,3,2,2,8,7]
  data2 = [2,6,1,5,5,7,8]

  data = Chart()
  data.data1 = data1
  data.data2 = data2

  print("chart - usao")

  print(data)
  print(type(data))

  return data



class PredictModel(BaseModel):
  array : list
  inputs : list
  problem_type : str
  modelPath : str
  statistics : Any

  numericalMatrixValueList : Any
  categoricalMatrixValueList : Any
  numericalMatrixOutput : Any
  categoricalMatrixOutput : Any


@app.post("/predict")
async def Predict(predictModel : PredictModel):
  print("=================================================================================")
  #print(predictModel.modelPath)
  #print(predictModel.array) #izbori korisnika za kolone sortirani
  #print(predictModel.inputs) #nazivi headera
  #print(predictModel.problem_type) #string tipa problema
  #print(predictModel.numericalMatrixValueList) #samo numericki deo matrice za predikciju
  #print(predictModel.categoricalMatrixValueList)   #samo kategorijski doe matrice

  print("^^^")
  #print(predictModel.statistics)

  statistike=[]

  for i in range(len(predictModel.statistics)):
    for j in range(len(predictModel.statistics[i])):
      row=predictModel.statistics[i]
      try:
        row[j]=float(row[j])
      except:
        pass
    statistike.append(row)

  print(statistike)

  # print(predictModel.numericalMatrixOutput) # jedan od ova 2 ima za headerName - None i onda se za output koristi ovaj drugi
  # print(predictModel.categoricalMatrixOutput)

  
  print("=================================================================================")


  try:
        1
        #predikcija(matricaZaPred,listaProba,model)
        matricaZaPred=d.MatricaZaPredSaFronta(predictModel.problem_type,predictModel.inputs,predictModel.numericalMatrixValueList,predictModel.categoricalMatrixValueList,predictModel.numericalMatrixOutput,predictModel.categoricalMatrixOutput)
        new_model=tf.keras.models.load_model(predictModel.modelPath)
        #print(new_model.summary())
        value = program.predikcija2(matricaZaPred,predictModel.array,new_model,statistike)

        print(type(value))

        value[1] = str(value[1])
        

  except:
        print("ERROR WHILE PREDICTING PROCES")
        value = None
  
  return value


  # json_data = jsonable_encoder(data)
  # print(json_data)
  # print(type(json_data))
  # # json_data = json.dumps(json_data)
  # # print(type(json_data))

  # return JSONResponse(content=json_data)























"""
@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.post("/getInfo")
def getInformation(info : Info):
    return {
        "status" : "SUCCESS",
        "data" : info
    }


@app.post("/PostTest")
async def readCSVfromDotNet(testStr : str = Body(...)):

    #cs = test

    global csv_data
    csv_data = testStr

    print("usao u nekoseno")
    print(testStr)
    return(testStr)



@app.post("/getInformation")
async def getInformation(info : Request):
    req_info = await info.json()
    return {
        "status" : "SUCCESS",
        "data" : req_info
    }

"""

if __name__ == "__main__":
  uvicorn.run(app, host=d.host, port=d.port)