from flask import Flask
import requests
import json

app = Flask(__name__)

@app.route('/test')
def test():
   response_body = {
      "name": "Vibodh",
      "age": "22"
   }

   return response_body

@app.route('/communicate')
def communicate():
   from_scraper = requests.get("http://172.28.1.3:4000/scraper")
   from_format_pull = requests.get("http://172.28.1.2:3000/format_pull")

   response = {"from_scraper": str(from_scraper), "from_format_pull": str(from_format_pull)}
   return response

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)