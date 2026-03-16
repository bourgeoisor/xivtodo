#!/bin/sh
python3 csv_to_json.py db.json *.csv
mv db.json ../frontend/src/assets/db.json
