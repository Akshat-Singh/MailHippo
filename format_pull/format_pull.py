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
        response = str(requests.get("http://172.28.1.4:3001/formats_retrieve?org=" + organization).text)

        print(response)

        if response == "404":
            pulled_format = scrape_format(organization)
            requests.get("http://172.28.1.4:3001/formats_publish?org=" + organization + "&format=" + pulled_format["format"] + "&example=" + pulled_format["example"])

            return pulled_format

        else:
            return response   
        


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)