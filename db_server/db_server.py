from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import pymongo 
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["SECRET_KEY"] = 'ad4c4c9c60e6ebf95603d99d9f1ca5df705c0f93'
app.config["MONGO_URI"] = 'mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority'
api = Api(app)

mongodb_client = pymongo.MongoClient('mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority')
db = mongodb_client.get_database('Users')

@app.route("/users_add")
def users():
    records = db.Users


    return jsonify(str(list(records.find())))


@app.route("/formats_retrieve", methods=['GET'])
def format_fetch():
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


@app.route("/scraper_add")
def scraper():
    records = db.Scraper

    return jsonify(str(list(records.find())))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)

 