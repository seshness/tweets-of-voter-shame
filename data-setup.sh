#!/usr/bin/env bash

python27 generate_restaurant_coordinates.py data/restaurants-berkeley-all-REAL.json > data/restaurant-gps-locations.csv
python27 generate_bounding_boxes.py data/restaurant-gps-locations.csv > data/restaurant-gps-bounding-boxes.json
