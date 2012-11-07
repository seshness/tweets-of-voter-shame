import csv
writer = open('data/ca-polling-locations-gps-bounding-boxes-string.txt', 'w')
with open('data/ca-polling-locations-gps-bounding-boxes.csv', 'rb') as reader:
  r = csv.reader(reader, delimiter=' ', quotechar='|')
  for row in r:
    writer.write("," + row[0])
writer.close()

