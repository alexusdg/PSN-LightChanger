import threading
from multiprocessing import Process
import requests
import time
import sys
import json

def get_color(response):

    try:
        with open('games_lights.txt', 'r') as file:
            for line in file:
                if line.startswith(f'"{response}"'):
                    color_to_change = line.split('/')[1]
                    return color_to_change
        file.seek(0)
    except FileNotFoundError:
        print(FileNotFoundError)
        



def update_light(token, psn_token, light_id):

    print(light_id)
    sys.stdout.flush()

    t_end = time.time() + 60 * 1

    #url = f"https://api.lifx.com/v1/lights/{light_id}"

    #headers = {
    #    "accept": "application/json",
    #    "Authorization": token
    #}

    #response = requests.get(url, headers=headers)

    #url = f"http://localhost:3100/light_color/{token}/{light_id}"

    #response = requests.get(url)

    #get current game being played

    #color_to_change = ""

    print("before opening file")

    games_dict = {}

    with open('games_lights.txt', 'r') as file:
            for line in file:
                games_dict[line.split('/')[0]] = line.split('/')[1].strip()
                
    
    print(games_dict)

    psn_url = f"http://localhost:3100/ps_game_playing/{psn_token}"
    print(psn_url)
    time.sleep(1)
    sys.stdout.flush()

    time.sleep(2)
    while(1):

        response = requests.get(psn_url)
        response = response.text

        print(response)

        ##get info from text file 

        color = games_dict[f"{response}"]
        post_url = f"http://localhost:3100/update_light/{token}/{light_id}/{color}"

        requests.put(post_url)

        time.sleep(2)
    #time.sleep(15)
        
    ##run code here 


    ##sleep for 10 seconds

    #return to original

#will take in the token 

def update_light_temp(token, psn_token, games_dict, light_id):
    psn_url = f"http://localhost:3100/ps_game_playing/{psn_token}"

    response = requests.get(psn_url)
    response = response.text

    print(games_dict)

    ##get info from text file 

    color = games_dict[f"{response}"]
    post_url = f"http://localhost:3100/update_light/{token}/{light_id}/{color}"

    requests.put(post_url)

    time.sleep(1)

def main():
    token = sys.argv[1]
    psn_token = str(sys.argv[2])
    label = sys.argv[3]
    games_dict = {}

    print(label)

    label = label.split(',')

    processes = []

    #pool = multiprocessing.Pool()
    with open('games_lights.txt', 'r') as file:
            for line in file:
                games_dict[line.split('/')[0]] = line.split('/')[1].strip()
                
    
    print(games_dict)
    procs = []
    while(True):
        for x in label:
            print(x)
            proc = Process(target=update_light_temp , args=(token, psn_token, games_dict, x))
            proc.start()
            procs.append(proc)

        time.sleep(4)

        for p in procs:
            p.terminate()

        
        procs.clear()

        # thread = threading.Thread(target=update_light , args=(token, psn_token, x))
            #threads.append(thread)
        # thread.start()


if __name__ == "__main__":
    main()