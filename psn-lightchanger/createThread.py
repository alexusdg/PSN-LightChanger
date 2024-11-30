import threading
import requests
import time
import sys
import json

def update_light(token, psn_token, light_id):

    print(light_id)

    t_end = time.time() + 60 * 5

    #url = f"https://api.lifx.com/v1/lights/{light_id}"

    #headers = {
    #    "accept": "application/json",
    #    "Authorization": token
    #}

    #response = requests.get(url, headers=headers)

    #url = f"http://localhost:3100/light_color/{token}/{light_id}"

    #response = requests.get(url)

    #get current game being played

    color_to_change = ""

    while(True):

        psn_url = f"http://localhost:3100/psinfo/{psn_token}"
        response = requests.get(psn_url)
        response = str(response.text)

        ##get info from text file 
        with open('games_lights.txt', 'r') as file:
            for line in file:
                if line.startswith(f'"{response}"'):
                    color_to_change = line.split('/')[1]
                    print(color_to_change)

        #color = color_to_change
        #post_url = f"http://localhost:3100/update_light/{token}/{light_id}/{color}"

        #requests.put(post_url)
        time.sleep(1)
    #time.sleep(15)
        
    ##run code here 


    ##sleep for 10 seconds

    #return to original

#will take in the token 
if __name__ == "__main__":

    token = sys.argv[1]
    psn_token = sys.argv[2]
    label = sys.argv[3]

    print(label)

    label = label.split(',')

    threads = []

    for x in label:
        print(x)
        #thread = threading.Thread(target=update_light , args=(token, psn_token, x))
        #threads.append(thread)
        #thread.start()

    #for thread in threads:
        #thread.join()