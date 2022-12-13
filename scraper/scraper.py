from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from scraper_helper import scrape_person
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/scrape', methods=['POST', 'GET'])
def pull_person():
    if request.method == 'GET':
        organization = request.args.get('org')
        position = request.args.get('pos')
        print("Reached here")
        
        response = requests.get("http://localhost:3001/people_retrieve?org=" + organization).text
        print(response)
        
        if not len(response):
            pulled_names = scrape_person(organization, position)

            if len(pulled_names) == 0:
                return "No viable results found!"

            else:
                for item in pulled_names:
                    org = item["Company"].replace("&", "and")
                    pos = item["Position"].replace("&", "and")
                    name = item["Name"].replace("&", "and")
                    requests.get("http://localhost:3001/person_publish?org=" + org + "&pos=" + pos + "&name=" + name)

                return pulled_names

        else:
            return response 
        


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)