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
BACKEND_PORT = os.getenv('REACT_APP_BACKEND_PORT')

LIFX_REQUESTS = 120
LIFX_SECONDS = 60
LIFX_REFRESH_RATE = LIFX_REQUESTS/LIFX_SECONDS


def update_light_temp(lifx_token, psn_token, games_dict, light_id, nap_time):
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

    t_end = time.time() + 60 * 0.5
    while time.time() < t_end:

        psn_url = f"http://localhost:{BACKEND_PORT}/ps_game_playing/"

        game_title = requests.get(psn_url, params={"refresh_token" : psn_token})
    
        game_title = json.loads(game_title.text)
        game_title = game_title["title"]

        print(game_title)

        if game_title == "":
            continue
        #get color info from games dict

        color = json.dumps(games_dict[f"{game_title}"])

        #This API requests prevents the while loop from working continuosly
        post_url = f"http://localhost:{BACKEND_PORT}/update_light/"
 
        requests.put(post_url, params={"lifx_token" : lifx_token, 
                                       "light_id" : light_id,
                                       },
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

    light_ids = light_ids.split(',')

    file = open('games.json')
    games_dict = json.load(file)
    json.dumps(games_dict)

    procs = []
    for id in light_ids:
        proc = Process(target=update_light_temp,
                       args=(lifx_token,
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
