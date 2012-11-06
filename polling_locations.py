
import requests
import csv
import fileinput
import json

def make_url(location):
    return 'http://where.yahooapis.com/geocode?q={0}&appid=43N1Dn7g&flags=J'.format(location)

for line in fileinput.input():
    r = requests.get(make_url(line))
    data = json.loads(r.text)
    first_result = data['ResultSet']['Results'][0]
    print '{0},{1},{2}'.format(first_result['latitude'],
                               first_result['longitude'],
                               first_result['postal'])
