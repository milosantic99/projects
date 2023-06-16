# from bs4 import BeautifulSoup
# import requests

# r = requests.get('https://www.daftlogic.com/information-appliance-power-consumption.htm')


# soup = BeautifulSoup(r.text, 'html.parser')



# print(soup.select('td:nth-child(2)'))

# a='[<td>100W</td>, <td>17W</td>, <td>150W</td>, <td>1000W</td>, <td>20W</td>, <td>58W</td>, <td>450W</td>, <td>60W</td>, <td>85W</td>, <td>116W</td>, <td>60W</td>, <td>120W</td>, <td>228W</td>, <td>1200W</td>, <td>65W</td>, <td>1500W</td>, <td>25W</td>, <td>3W</td>, <td>2W</td>, <td>2W</td>, <td>40W</td>, <td>3W</td>, <td>20W</td>, <td>450W</td>, <td>60W</td>, <td>60W</td>, <td>45W</td>, <td>2W</td>, <td>1W</td>, <td>1000W</td>, <td>800W</td>, <td>25W</td>, <td>20W</td>, <td>600W</td>, <td>2500W</td>, <td>70W</td>, <td>30W</td>, <td>25W</td>, <td>5W</td>, <td>19W</td>, <td>240W</td>, <td>100W</td>, <td>1200W</td>, <td>200W</td>, <td>26W</td>, <td>200W</td>, <td>4000W</td>, <td>2W</td>, <td>2000W</td>, <td>1200W</td>, <td>1500W</td>, <td>1000W</td>, <td>15W</td>, <td>2000W</td>, <td>6600W</td>, <td>500W</td>, <td>6W</td>, <td>1300W</td>, <td>2000W</td>, <td>1600W</td>, <td>2600W</td>, <td>1W</td>, <td>12W</td>, <td>28W</td>, <td>300W</td>, <td>800W</td>, <td>30W</td>, <td>100W</td>, <td>150W</td>, <td>1000W</td>, <td>120W</td>, <td>300W</td>, <td>300W</td>, <td>15W</td>, <td>20W</td>, <td>1800W</td>, <td>3000W</td>, <td>50W</td>, <td>400W</td>, <td>1000W</td>, <td>5W</td>, <td>3W</td>, <td>95W</td>, <td>1200W</td>, <td>3000W</td>, <td>35W</td>, <td>60W</td>, <td>1400W</td>, <td>20W</td>, <td>1300W</td>, <td>1000W</td>, <td>3000W</td>, <td>200W</td>, <td>50W</td>, <td>600W</td>, <td>1000W</td>, <td>5W</td>, <td>7W</td>, <td>23W</td>, <td>5W</td>, <td>600W</td>, <td>1W</td>, <td>7W</td>, <td>60W</td>, <td>2150W</td>, <td>200W</td>, <td>50W</td>, <td>800W</td>, <td>8W</td>, <td>4W</td>, <td>85W</td>, <td>160W</td>, <td>1000W</td>, <td>7500W</td>, <td>700W</td>, <td>1500W</td>, <td>220W</td>, <td>100W</td>, <td>200W</td>, <td>25W</td>, <td>700W</td>, <td>10W</td>, <td>27W</td>, <td>70W</td>, <td>100W</td>, <td>40W</td>, <td>160W</td>, <td>0W</td>, <td>30W</td>, <td>2000W</td>, <td>2200W</td>, <td>650W</td>, <td>75W</td>, <td>300W</td>, <td>200W</td>, <td>10W</td>, <td>10W</td>, <td>10W</td>, <td>5W</td>, <td>800W</td>, <td>60W</td>, <td>280W</td>, <td>22W</td>, <td>40W</td>, <td>450W</td>, <td>45W</td>, <td>500W</td>, <td>100W</td>, <td>35W</td>, <td>70W</td>, <td>1W</td>, <td>4W</td>, <td>500W</td>, <td>83W</td>, <td>50W</td>]'

# for line in (a.split('</td>, <td>')):
#     print(line)

with open('out.txt','r') as f:
    for line in f:
        print(line.split('ggggg'))