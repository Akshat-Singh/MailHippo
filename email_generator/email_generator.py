from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from email_generator_helper import email_sender
import requests
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/send_email', methods=['POST'])
def send_email():
    data = json.loads(request.data.decode('utf-8'))
    print(data)
    
    emails = data['email_string'].split('; ')
    subject = data['sub']
    body = data['body']
    user_email = data['user_email']
    password = data["password"]

    print(emails)
    print(subject)
    print(body)
    print(user_email)

    email_sender(emails, subject, body, user_email, password)

    return "200"

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7500, debug=True)
