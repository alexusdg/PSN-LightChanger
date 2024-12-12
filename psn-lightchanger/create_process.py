import sys
import time
import json
import os
import requests

from multiprocessing import Process


BACKEND_PORT = os.environ.get('REACT_APP_BACKEND_PORT')

LIFX_REQUESTS = 120
LIFX_SECONDS = 60
LIFX_REFRESH_RATE = LIFX_REQUESTS/LIFX_SECONDS

def update_light_temp(token, psn_token, games_dict, light_id, nap_time):
    t_end = time.time() + 60 * 0.5
    while time.time() < t_end:

        psn_url = f"http://localhost:3100/ps_game_playing/"

        game_title = requests.get(psn_url, params={"refresh_token" : psn_token}, headers={'Accept': 'application/json'})
     
        game_title = json.loads(game_title.text)
        game_title = game_title["title"]

        print(game_title)

        if game_title == {} or game_title == "{}" or game_title == "":
            continue
        #get color info from games dict

        color = json.dumps(games_dict[f"{game_title}"])

        #This API requests prevents the while loop from working continuosly
        post_url = f"http://localhost:3100/update_light/{token}/{light_id}/{color}"  
        requests.put(post_url)
        time.sleep(nap_time)

def main():
    token = sys.argv[1]
    psn_token = str(sys.argv[2])
    light_ids = sys.argv[3]

    light_ids = light_ids.split(',')

    file = open('games.json')
    games_dict = json.load(file)
    json.dumps(games_dict)
              
    procs = []
    for id in light_ids:
        print(id)
        proc = Process(target=update_light_temp,
                       args=(token,
                             psn_token,
                             games_dict,
                             id,
                             len(id)/LIFX_REFRESH_RATE))
        proc.start()

    for p in procs:
        print("Entering Here")
        p.join()

if __name__ == "__main__":
    main()