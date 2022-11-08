from flask import Flask, jsonify
from flask_restful import Api, Resource
import pymongo 
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["SECRET_KEY"] = 'ad4c4c9c60e6ebf95603d99d9f1ca5df705c0f93'
app.config["MONGO_URI"] = 'mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority'
api = Api(app)

mongodb_client = pymongo.MongoClient('mongodb+srv://Akshat-Singh:nFq9o6UCBGTh4RTD@cluster0.oup2qmt.mongodb.net/?retryWrites=true&w=majority')
db = mongodb_client.get_database('Users')

@app.get("/users")
def users():
    records = db.Users

    return jsonify(str(list(records.find())))

@app.get("/formats")
def formats():
    records = db.Formats

    return jsonify(str(list(records.find())))

@app.get("/scraper")
def scraper():
    records = db.Scraper

    return jsonify(str(list(records.find())))

if __name__ == '__main__':
    app.run(port="2000", debug=True)

 