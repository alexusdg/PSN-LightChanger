import threading
import time
import sys
import json

def update_light(token, light_id):

    print(light_id)

    t_end = time.time() + 60 * 0.1

    while(time.time() < t_end):
    
        print(1)
        time.sleep(1)

#will take in the token 
if __name__ == "__main__":

    token = sys.argv[1]
    label = sys.argv[2]

    print(label)
    