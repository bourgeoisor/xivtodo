import csv
import json
import sys

# This script converts a CSV file to a JSON file, grouping entries
# together that has a same "Category" field.
# --> Usage: python3 csv_to_json.py input.csv output.json

def csv_to_json(csvFilePath, jsonFilePath, minified=True):
    jsonObject = {}

    with open(csvFilePath, encoding='utf-8') as csvf: 
        csvReader = csv.DictReader(csvf)

        for row in csvReader:
            rowRef = row.copy()
            for key in rowRef.keys():
                if row[key] == "TRUE" or row[key] == "true":
                    row[key] = True
                elif row[key] == "FALSE" or row[key] == "false":
                    row[key] = False
                elif row[key] == "":
                    row.pop(key)
                elif key in ["ID", "MinID", "SpoilersUntil"]:
                    row[key] = int(row[key])
                elif key in ["MaxIDOneOf", "MaxIDAllOf"]:
                    idSplit = row[key].split(" ")
                    ids = []
                    for id in idSplit:
                        ids.append(int(id))
                    row[key] = ids
            
            if len(row) > 0:
                if row["Category"] not in jsonObject:
                    jsonObject[row["Category"]] = []
                jsonObject[row["Category"]].append(row)
  
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        if minified:
            jsonString = json.dumps(jsonObject, separators=(',', ':'))
        else:
            jsonString = json.dumps(jsonObject, indent=4)
        jsonf.write(jsonString)
          
csvFilePath = sys.argv[1]
jsonFilePath = sys.argv[2]
csv_to_json(csvFilePath, jsonFilePath)
