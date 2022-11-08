from flask import Flask 
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class format_pull(Resource):
    def get(self):
        return {"organization": "format"}

api.add_resource(format_pull, "/format_pull")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)