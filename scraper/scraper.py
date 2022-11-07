from flask import Flask 
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class scraper(Resource):
    def get(self):
        return {"data": "scraper"}

api.add_resource(scraper, "/scraper")

if __name__ == "__main__":
    app.run(port="4000", debug=True)