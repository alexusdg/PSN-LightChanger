#include "../psn-lightchanger/include/json/json.h"
#include <iostream>
#include <string>


using std::string;

int main() {

    string tmp_json = R"([{"id":"d073d5654a63","uuid":"2af8c4aa-0411-4c53-9a78-6e160ad3d62d","label":"Desk Lamp","connected":true,"power":"on","color":{"hue":62.01,"saturation":0,"kelvin":4000},"brightness":0.993,"group":{"id":"27d456538beb27e833e51b6ddcde13d8","name":"Alexus Bedroom"},"location":{"id":"014e461955f30b275b5e7ca04dfd4dc4","name":"Home"},"product":{"name":"LIFX Color","identifier":"lifx_color","company":"LIFX","vendor_id":1,"product_id":91,"capabilities":{"has_color":true,"has_variable_color_temp":true,"has_ir":false,"has_hev":false,"has_chain":false,"has_matrix":false,"has_multizone":false,"min_kelvin":1500,"max_kelvin":9000}},"last_seen":"2024-11-18T03:32:07Z","seconds_since_seen":0}])"; 

    Json::Value jsonData;
    Json::Reader jsonReader;

    jsonReader.parse(tmp_json, jsonData);


    std::cout << jsonData << std::endl;
    return 0;
}

