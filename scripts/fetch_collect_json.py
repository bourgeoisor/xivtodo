import json
import time
import requests

for lang in ['en', 'fr', 'de', 'ja']:
    for page in [
        'achievements',
        'armoires',
        'bardings',
        'emotes',
        'fashions',
        'frames',
        'hairstyles',
        'mounts',
        'minions',
        'orchestrions',
        'records',
        'relics',
        'spells',
        'survey_records',
        'titles'
    ]:
        url = f'https://ffxivcollect.com/api/{page}?language={lang}'
        print(url)
        response = requests.get(url)
        response_json = response.json()
        with open(f'../frontend/src/assets/dbs/{lang}/{page}.json', 'w') as f:
            json.dump(response_json, f)
            f.write('\n')
        time.sleep(1)