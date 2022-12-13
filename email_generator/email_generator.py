from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/send_email', methods=['POST'])
def send_email():
    email_addresses = request.form['emails'].split('; ')
    subject = request.form['subject']
    body = request.form['body']
    return 200

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6500, debug=True)
