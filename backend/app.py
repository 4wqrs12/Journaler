import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["Journaler"]
collection = db["journals"]


@app.route("/api/create-journal", methods=["POST"])
def create_journal():
    try:
        data = request.get_json()
        journal_name = data.get("journalName")

        if not journal_name:
            return jsonify({"success": False, "message": "No name given.", "data": data})
        
        if collection.find_one({"journalName": journal_name}):
            return jsonify({"success": False, "message": f"Another journal already has the name {journal_name}", "data": data})
        
        collection.insert_one({"journalName": journal_name, "journalText": ""})
        return jsonify({"success": True, "message": f"Journal {journal_name} created!", "data": data})

    except Exception as e:
        return jsonify({"success": False, "message": "An error as occured", "data": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)