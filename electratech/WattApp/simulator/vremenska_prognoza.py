import csv



with open("Databases/test_forecast.csv", newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in spamreader:
        print(row[0].split(','))
        break