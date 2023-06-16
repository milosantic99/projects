import sqlite3
from flask import g, render_template
from flask import Flask
import uuid
import random
import time
import datetime
import requests


DATABASE = '..\\backend\\backend\\WattAppDB.db'
app = Flask(__name__)
imena=open("imena.txt","r",encoding="utf8").readlines()
prezimena=open("prezimena.txt","r",encoding="utf8").readlines()
ulice=['vojno tehnickoga zavoda 3','radoja domanovica 34','kralja aleksandra 17','Sarla Lubrija 3','kneza mihajla 4']

city_bounds = {
    'Beograd': [(44.7695, 44.9026), (20.3435, 20.5624)],
    'Bor': [(44.0626, 44.4176), (21.0111, 22.1236)],
    'Valjevo': [(44.1955, 44.3099), (19.8232, 20.0205)],
    'Vranje': [(42.5098, 42.6053), (21.8799, 22.0444)],
    'Vršac': [(45.0867, 45.1725), (21.2872, 21.4591)],
    'Zaječar': [(43.8676, 43.9721), (21.1799, 21.3296)],
    'Zrenjanin': [(45.3615, 45.4381), (20.3383, 20.5471)],
    'Jagodina': [(43.9717, 44.0788), (21.2232, 21.3787)],
    'Kikinda': [(45.7627, 45.8456), (20.3975, 20.5624)],
    'Kragujevac': [(44.0058, 44.0578), (20.8623, 21.0245)],
    'Kraljevo': [(43.6774, 43.7644), (20.6105, 20.7645)],
    'Kruševac': [(43.5695, 43.6082), (20.8679, 20.9808)],
    'Leskovac': [(42.9736, 43.0226), (21.9138, 22.0351)],
    'Loznica': [(44.4894, 44.5707), (19.1838, 19.4025)],
    'Niš': [(43.2805, 43.3617), (21.8366, 21.9502)],
    'Novi Pazar': [(43.0913, 43.1833), (20.5343, 20.684)],
    'Novi Sad': [(45.2156, 45.3333), (19.7874, 20.0484)],
    'Pančevo': [(44.8237, 44.8995), (20.5471, 20.743)],
    'Pirot': [(43.1321, 43.2195), (22.5789, 22.7349)],
    'Požarevac': [(44.5943, 44.6616), (21.2007, 21.382)],
    'Priština': [(42.6327, 42.6907), (21.1439, 21.2798)],
    'Prokuplje': [(43.2035, 43.2887), (21.5732, 21.6837)],
    'Smederevo': [(44.6649, 44.7024), (20.9267, 21.0136)],
    'Sombor': [(45.7740, 45.8189), (19.1154, 19.1923)],
    'Sremska Mitrovica': [(44.9778, 45.0276), (19.6115, 19.6761)],
    'Subotica': [(46.0379, 46.1075), (19.5909, 19.7946)],
    'Užice': [(43.8247, 43.8645), (19.7869, 19.8947)],
    'Čačak': [(43.8705, 43.9229), (20.2846, 20.4009)],
    'Šabac': [(44.7121, 44.7863), (19.6442, 19.8702)],
}

def gen_id():
    return uuid.uuid4()

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def execute(query):
    cur = get_db().cursor()
    cur.execute(query)
    get_db().commit()

def generate_coordinates():
    gradovi = list(city_bounds.keys())
    nasumicni_grad = random.choice(gradovi)
    bounds = city_bounds[nasumicni_grad]

    x = random.uniform(bounds[0][0], bounds[0][1])
    y = random.uniform(bounds[1][0], bounds[1][1])

    # x=43.9+random.random()/6
    # y=20.86+random.random()/6
    return x,y,nasumicni_grad

def generate_user():
    id=gen_id()
    special_char_map = {ord('Č'):'C',ord('ć'):'c',ord('č'):'c',ord('Ć'):'C',ord('Đ'):'Dj',ord('đ'):'dj',ord('ž'):'z',ord('Ž'):'Z',ord('š'):'s',ord('Š'):'S'}
    ime=random.choice(imena)[:-1].translate(special_char_map)
    #ime="vuk"
    x_coordinate,y_coordinate,nasumicni_grad=generate_coordinates()

    
    prezime=random.choice(prezimena)[:-1].translate(special_char_map)
    
    grad = nasumicni_grad.translate(special_char_map)

    email=ime+'.'+prezime+"@gmail.com"
    idDso="c35ef223-b65e-41f3-927c-a04ce3aacc9a"
    password="Prosumer123"
    return [id,ime,prezime,email,idDso,password,x_coordinate,y_coordinate,grad]


def energy_simulator(N,BASE,tick,device_id,prosumer_id):

    ukljuceno=1
 

    energy=0.0
    for j in range(-135,79): # od 7.5 sam racunao vreme (-126 do 1. jan i +86 do 1. avg) 
        for i in range(N):
            
            
            time.sleep(tick)
            if(int(random.random()*30)<3):
                ukljuceno*=-1
            r=int(random.random()*40)%2
            if(BASE>0):
                if(r==0 and ukljuceno==1):
                    energy=float(BASE+random.random()*50)
        
                if(r==1 and ukljuceno==1):
                
                    energy=float(BASE+random.random()*50)

                if(ukljuceno==-1):
            
                    energy=0
            else:
                if(r==0 and ukljuceno==1):
                    energy=float(BASE-random.random()*50)
        
                if(r==1 and ukljuceno==1):
                
                    energy=float(BASE-random.random()*50)
                if(i<6 and i>20):
                    energy=0
                if(ukljuceno==-1):
            
                    energy=0

            energy_full=energy/N

            headers = {
                        'accept': '*/*',
                        'Content-Type': 'text/json',
                    }
            data = '{\n "timeStamp": ' + str(i) + ',\n "date": "' + str(datetime.date.today()+datetime.timedelta(days=j)) + '",\n "deviceId": "' + str(device_id) + '",\n "prosumerId": "' + str(prosumer_id) + '",\n "currentConsumption": ' + str(energy_full) + ',\n "prediction": ' + str(random.uniform(energy_full*0.4,energy_full*1.5)) + ',\n "simulation": ' + str(1) + '\n}'
            response = requests.post('https://localhost:7027/AddRecord', headers= headers, data=data, verify=False)
            print(response)
            # execute(f'insert into records values("{gen_id()}","{i}","{datetime.date.today()+datetime.timedelta(days=j)}","{device_id}","{prosumer_id}","{energy_full}",{random.uniform(energy_full*0.4,energy_full*1.5)},"{1}")')
        

def device_prosumer_join():
    counter=0
    k=query_db("select * from prosumers p join linkers d on p.id=d.prosumerId")
    for i in k:
        counter+=1
        print(f"{counter} od {len(k)}")
        wat=query_db(f'select consumption from devices where id="{i[16]}"')
        
        energy_simulator(24,float(wat[0][0]),0,i[16],i[0])
        
    
def register_prosumer_on_API(first_name,last_name,email,password,idDso,city,address,phoneNumber,x,y,simulation):
    headers = {
        'accept': '*/*',
        'Content-Type': 'text/json',
    }

    data = '{\n  "firstName": "'+first_name+'",\n  "lastName":"' +last_name+'",\n  "email": "'+email+'",\n  "password": "'+password+'",\n  "city": "'+city+'",\n  "address": "'+address+'",\n  "phoneNumber": "'+phoneNumber+'",\n  "simulation": '+simulation+',\n  "x":' +x+',\n  "y": '+y+'\n}'                   
    print(data)
    #print(data2)
    response = requests.post('https://localhost:7027/api/Prosumer/RegisterSimulatedProsumer', headers=headers, data=data,verify=False)
import csv

def add_w():
    tm=1
    with open("Databases/test_forecast.csv", newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            if(tm):
                tm=0
                continue
            l=row[0].split(',')
            try:
                execute(f"insert into weathers values('{l[0]}','{l[1]}'	,'{l[2]}','{l[3]}'	,'{l[4]}'	,'{l[5]}'	,'{l[6]}'	,'{l[7]}'	,'{l[8]}')")
            except:
                print(f"insert into weathers values('{l[0]}','{l[1]}'	,'{l[2]}','{l[3]}'	,'{l[4]}'	,'{l[5]}'	,'{l[6]}'	,'{l[7]}'	,'{l[8]}')")
            

    pass

def add_devices():
    manufactures=['VOX',"Tesla","Samsung"]
    with open("out.txt","r", encoding="UTF-8") as f:
        for line in f:
            l=line[:-1].split(' ggggg ')
            print(l)
            execute(f"insert into devices values('{gen_id()}','{l[0]}','{l[1]}','{random.choice(manufactures)}','{l[2]}','{l[3]}')")



@app.route('/') 
def index():
    return render_template('index.html')
#return [id,ime,prezime,email,idDso,password,x_coordinate,y_coordinate]
@app.route('/generate_users/<n>')
def generate_users_api(n):
    
    for i in range(int(n)):
        user=generate_user()
            
        register_prosumer_on_API(user[1],user[2],user[3],"password",user[4],user[8],random.choice(ulice),"062336511",str(user[6]),str(user[7]),'true')
        #execute(f'insert into prosumers values("{user[0]}","{user[3]}","{user[1]}","{user[4]}","{user[2]}","{user[5]}","0","string","string","string","string","string","1",{user[6]},{user[7]});')
    

    return query_db("select * from prosumers")

@app.route('/generate_user_device_link/<n>')
def generate_user_device_link_api(n):
    prosumer_ids=query_db("select id from prosumers")
    devices_ids=query_db("select id from devices")
  
    for i in range(int(n)):
        access=int(random.random()*40)%2 
        control=int(random.random()*40)%2 * access 
        execute(f'insert into linkers values(null,"{random.choice(devices_ids)[0]}","{random.choice(prosumer_ids)[0]}","","{0}","{control}","{access}","{1}")')

    return query_db("select * from linkers")
@app.route('/generate_records')
def generate_records():
    device_prosumer_join()
    return "zz"



@app.route('/delete_simulation')
def delete_simulation():
    
 
    
    execute(f'delete from prosumers where simulation=1')
    execute(f'delete from linkers where simulation=1')
    execute(f'delete from records where simulaiton=1')

    return "finished"

@app.route('/show_users')
def showu():
     return query_db("select * from prosumers")

@app.route('/show_linkings')
def showd():
     return query_db("select * from linkers")
@app.route('/show_records')
def showr():


  
    #return query_db("select * from prosumers p join linkers d on p.id=d.prosumerId")
    return query_db("select * from records")
   
@app.route('/add_weather')
def add_weather():
        add_w()
        return ""
      
@app.route('/add_devices')
def add_d():
        add_devices()
        return ""
      

    

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

