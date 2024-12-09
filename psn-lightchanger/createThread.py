from multiprocessing import Process
import httpx
import threading
import requests
import time
import sys
import json
import os 

BACKEND_PORT = os.environ.get('REACT_APP_BACKEND_PORT')

LIFX_REQUESTS = 120
LIFX_SECONDS = 60
LIFX_REFRESH_RATE = LIFX_REQUESTS/LIFX_SECONDS

def update_light_temp(token, psn_token, games_dict, light_id, tim):
    t_end = time.time() + 60 * 0.25
    while time.time() < t_end:
        psn_url = f"http://localhost:3100/ps_game_playing/{psn_token}"


        response = requests.get(psn_url)
        response = response.text

        #print(games_dict)

        if response == {} or response == "{}":
            continue

        print(response)
        #get color info from games dict

        color = json.dumps(games_dict[f"{response}"])

        #This API requests prevents the while loop from working continuosly 
        #with httpx.Client() as client:
        post_url = f"http://localhost:3100/update_light/{token}/{light_id}/{color}"
            #client.post(post_url)
        
       
        requests.put(post_url)
        time.sleep(tim)

def main():
    token = sys.argv[1]
    psn_token = str(sys.argv[2])
    label = sys.argv[3]

    print(label)

    label = label.split(',')

    processes = []

    file = open('games.json')
    games_dict = json.load(file)
    json.dumps(games_dict)
                
    
    print(games_dict)
    procs = []
    #while True:
    for x in label:
        print(x)
        proc = Process(target=update_light_temp , args=(token, psn_token, games_dict, x, len(label)/LIFX_REFRESH_RATE))
        proc.start()

    for p in procs:
        print("Entering Here")
        p.join()            

if __name__ == "__main__":
    main()