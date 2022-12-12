from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from format_pull_helper import scrape_format
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/pull', methods=['POST', 'GET'])
def pull_format():
    if request.method == 'GET':
        organization = request.args.get('org')
        print("Reached here")
        #response = str(requests.get("http://172.28.1.4:3001/formats_retrieve?org=" + organization).text)
        response = str(requests.get("http://localhost:3001/formats_retrieve?org=" + organization).text)

        print(response)

        if response == "404":
            pulled_format = scrape_format(organization)
            #requests.get("http://172.28.1.4:3001/formats_publish?org=" + pulled_format["org"] + "&format=" + pulled_format["format"] + "&example=" + pulled_format["example"])
            final_name = pulled_format["org"].replace("&", "and")
            final_format = pulled_format["format"]
            final_example = pulled_format["example"]
            requests.get(f'http://localhost:3001/formats_publish?org={final_name}&format={final_format}&example={final_example}')

            return pulled_format

        else:
            return response   
        


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3500, debug=True)