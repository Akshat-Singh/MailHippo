from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/generate_email', methods=['POST', 'GET'])
def generate_email():
    email_format = request.args.get('format')
    name = request.args.get('name').lower()
    first, last = name.split(' ')
    f, l = first[0], last[0]
    
    email_address = email_format.replace("{first}", first)
    email_address = email_address.replace("{last}", last)
    email_address = email_address.replace("{f}", f)
    email_address = email_address.replace("{l}", l)

    return email_address

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6500, debug=True)
