from flask import Flask, request, jsonify
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