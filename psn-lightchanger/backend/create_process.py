'''
create_process.py will create the processes to update the color 
of lights simultaneously 
'''
import sys
import time
import json
import os
import requests

from dotenv import load_dotenv
from multiprocessing import Process

load_dotenv()
BACKEND_PORT = os.getenv('REACT_APP_BACKEND_PORT') or ""
BASE_URL = os.getenv('REACT_APP_BASE_URL')

LIFX_REQUESTS = 120
LIFX_SECONDS = 60
LIFX_REFRESH_RATE = LIFX_REQUESTS/LIFX_SECONDS


def update_light_temp(lifx_token, psn_token, games_dict, light_id, nap_time, url, port):
    '''
    Runs a while loop to make the requests to determine the game currently 
    being played and update the color of the lifx light
    
    Args:
        lifx_token (string) : lifx access token
        psn_token (string) : psn refresh token
        games_dict (dict) : key-value pairs, games and their respective color info
        light_id (string) : Lifx light id
        nap_time (number) : Lifx refresh rate ratio 

    Returns:
        nothing
    '''
    
    t_end = time.time() + 60 * 15
    while time.time() < t_end:

        psn_url = f"{url}{port}/ps_game_playing/"

        game_title = requests.get(psn_url, params={"refresh_token" : psn_token})

        game_title = json.loads(game_title.text)
        game_title = game_title["title"]

        if game_title == "":
            continue
        #get color info from games dict

        color = json.dumps(games_dict[f"{game_title}"])

        #This API requests prevents the while loop from working continuosly
        post_url = f"{url}{port}/update_light/"

        requests.put(post_url, params={"lifx_token" : lifx_token, 
                                       "light_id" : light_id,},
                                       json={"color_data" : color})
        time.sleep(nap_time)

def main():
    '''
    Will gather the arguments and create and and start the processes to update the lights

    Args :  
        lifx_token (string) : lifx access token
        psn_token (string) : psn refresh token
        light_ids (array) : string array containg light ids

    Returns:     
        nothing
    '''

    lifx_token = sys.argv[1]
    psn_token = str(sys.argv[2])
    light_ids = sys.argv[3]
    url = sys.argv[4]
    port = sys.argv[5]

    light_ids = light_ids.split(',')

    file = open('games.json')
    games_dict = json.load(file)
    json.dumps(games_dict)

    procs = []
    for light_id in light_ids:
        id = light_id.strip("[]")
        id  = id.replace("\\", "")
        id = id.strip('"')
        proc = Process(target=update_light_temp,
                       args=(lifx_token,
                             psn_token,
                             games_dict,
                             id,
                             len(light_ids)/LIFX_REFRESH_RATE, url, BACKEND_PORT))
        proc.start()

    for p in procs:
        print("Entering Here")
        p.join()

if __name__ == "__main__":
    main()
