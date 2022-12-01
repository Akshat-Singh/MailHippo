from flask import Flask, redirect, url_for, render_template, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)  


"""class scraper(Resource):
    def get(self):
        return {"data": "scraper"}

api.add_resource(scraper, "/scraper")"""

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000)