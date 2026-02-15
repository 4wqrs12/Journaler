from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["journaler"]
journals = db["journals"]
app = Flask(__name__)
CORS(app)



if __name__ == "__main__":
    app.run(debug=True)