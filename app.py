from flask import Flask
import requests
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
   return "Hello, World!"

@app.route('/communicate')
def communicate():
   from_scraper = requests.get("http://127.0.0.1:3000/format_pull")
   from_format_pull = requests.get("http://127.0.0.1:4000/scraper")

   response = {"from_scraper": str(from_scraper), "from_format_pull": str(from_format_pull)}
   return response

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)