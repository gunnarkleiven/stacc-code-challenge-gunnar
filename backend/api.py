from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

stacc_api_server = "https://stacc-code-challenge-2021.azurewebsites.net"

@app.route("/hello", methods=['GET'])
def hello_world():
    return "Hello World!"
    

@app.route("/api/pep/", methods=['GET'])
def test_scatt_api_with_name():
    if 'name' in request.args:
        name = request.args["name"]
    else:
        return "No name field in the arguments"

    
    payload = {"name": name}
    r = requests.get(stacc_api_server + "/api/pep", params=payload)
    return r.json()



@app.route("/api/enheter/", methods=['GET'])
def test_scatt_api_with_orgnr():
    if 'orgNr' in request.args:
        orgNr = request.args["orgNr"]
    else:
        return "No organisatios number in the arguments"

    
    payload = {"orgNr": orgNr}
    r = requests.get(stacc_api_server + "/api/enheter", params=payload)
    return r.json()