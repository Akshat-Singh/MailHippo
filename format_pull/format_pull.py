from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from format_pull_helper import scrape_format

app = Flask(__name__)
#api = Api(app)

"""class format_pull(Resource):
    def get(self):
        return {"organization": "format"}"""

#api.add_resource(format_pull, "/format_pull")

@app.route('/pull', methods=['POST', 'GET'])
def find_people():
    if request.method == 'GET':
        organization = request.args.get('org')
        print(f"Organization: {organization}")

        return scrape_format(organization) 
        


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)