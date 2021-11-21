from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

stacc_api_server = "https://stacc-code-challenge-2021.azurewebsites.net"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path


@app.route("/hello", methods=['GET'])
def hello_world():
    return "Hello World!"


@app.route("/api/pep/", methods=['GET'])
def test_stacc_api_with_name():
    if 'name' in request.args:
        name = request.args["name"]
        name = request.args["name"]
    else:
        return "No name field in the arguments"

    payload = {"name": name}
    r = requests.get(stacc_api_server + "/api/pep", params=payload)
    return r.json()


@app.route("/api/enheter/", methods=['GET'])
def test_stacc_api_with_orgnr():
    if 'orgNr' in request.args:
        org_nr = request.args["orgNr"]
    else:
        return "No organisation number in the arguments"

    payload = {"orgNr": org_nr}
    r = requests.get(stacc_api_server + "/api/enheter", params=payload)
    print(f'API request status = {r.status_code}')
    print(f'response r: {r.text}')

    if r.status_code == 404:
        custom_response = requests.models.Response()
        custom_response.status_code = 404
        custom_response._content = b'{"status": 404, "data": {"status": 400}}'

        print(f'Custom response: {custom_response}')

        return custom_response.json()


    # r_dict = json.loads(r.text)
    #
    # if 'status' in r_dict.keys() and r_dict['keys'] == 400:
    #     print("Custom status code 400")
    #     r.status_code = 400

    return r.json()
