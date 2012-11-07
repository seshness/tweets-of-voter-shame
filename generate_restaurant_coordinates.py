from __future__ import print_function

import json
import sys

# Usage: python generate_restaurant_coordinates.py data/restaurants-berkeley-all-REAL.json

restaurants = json.load(open(sys.argv[1], 'rb'))

for restaurant in restaurants:
    if 'latitude' in restaurant and 'longitude' in restaurant:
        print(restaurant['latitude'], restaurant['longitude'])
