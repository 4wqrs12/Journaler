from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask_bcrypt import Bcrypt
import os

load_dotenv()
bcrypt = Bcrypt()
jwt_key = os.getenv("JWT_SECRET_KEY")


client = MongoClient(os.getenv("MONGO_URI"))
db = client["journaler"]
journals = db["journals"]
users = db["users"]
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv(jwt_key)
jwt = JWTManager(app)
CORS(app)

@app.route("/api/new-journal", methods=["GET","POST"])
def new_journal():
    data = request.get_json()
    journal_name = data.get("journalName", "")

    if not journal_name:
        return jsonify({"success": False, "message": "No name given", "data": data})
    
    if journals.find_one({"name": journal_name}):
        return jsonify({"success": False, "message": "This journal already exists", "data": data})
    
    journals.insert_one({"name": journal_name, "text": ""})
    return jsonify({"success": True, "message": "Journal created", "data": data})

if __name__ == "__main__":
    app.run(debug=True)