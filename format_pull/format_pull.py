from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from format_pull_helper import scrape_format
import requests

app = Flask(__name__)
#api = Api(app)

"""class format_pull(Resource):
    def get(self):
        return {"organization": "format"}"""

#api.add_resource(format_pull, "/format_pull")

@app.route('/pull', methods=['POST', 'GET'])
def pull_format():
    if request.method == 'GET':
        organization = request.args.get('org')
        response = str(requests.get("http://127.0.0.1:2000/formats_retrieve?org=" + organization).text)

        print(response)

        if response == "404":
            pulled_format = scrape_format(organization)
            requests.get("http://127.0.0.1:2000/formats_publish?org=" + organization + "&format=" + pulled_format["format"])

            return pulled_format

        else:
            return response   
        


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)