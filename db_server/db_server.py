from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import pymongo 
from flask_pymongo import PyMongo
from flask_cors import CORS
import json


app = Flask(__name__)
app.config["SECRET_KEY"] = 'ad4c4c9c60e6ebf95603d99d9f1ca5df705c0f93'
app.config["MONGO_URI"] = 'mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority'
api = Api(app)
CORS(app)


mongodb_client = pymongo.MongoClient('mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority')
db = mongodb_client.get_database('Users')

dbc = mongodb_client.get_database('Data_by_Company')

@app.route("/users_add")
def users():
    records = db.Users
    
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    
    email = data['email']
    name = data['name']
    given_name = data['given_name']

    records.insert_one({"email": email, "name": name, "given_name": given_name})

    return "200"


@app.route("/formats_retrieve", methods=['GET'])
def format_fetch():
    print("Query received")
    records = db.Formats

    query = request.args.get('org')
    
    response = records.find_one({"org_id": query})

    if response:
        syntax = {"format": response['format'], "example": response['example']}
    else:
        syntax = "404"

    return syntax



@app.route("/formats_publish", methods=['GET'])
def format_add():
    records = db.Formats

    organization = request.args.get('org')
    syntax = request.args.get('format')
    example = request.args.get('example')

    records.insert_one({"org_id": organization, "format": syntax, "example": example})

    return "200"


@app.route("/person_publish", methods=['GET'])
def person_add():
    records = db.Scraper

    organization = request.args.get('org')
    name = request.args.get('name')
    position = request.args.get('pos')

    try:
        records.insert_one({"org": organization, "name": name, "pos": position})
    except Exception as e:
        print(f"Insert exception: {e}")

    return "200"


@app.route("/people_retrieve", methods=['GET'])
def people_fetch():
    print("Query received")
    records = db.Scraper

    organization = request.args.get('org')
    position = request.args.get('pos')
    
    response = records.find({"org": organization, "pos": position}, {"_id": False})

    response = list(response)
    if len(response):
        return list(response)
    else:
        return "404"



@app.route("/get_comp_list", methods=['GET'])
def return_comp_list():
    records = db.Scraper

    return records.distinct('org')


@app.route("/scraper_add")
def scraper():
    records = db.Scraper

    return jsonify(str(list(records.find())))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)

 