# views.py

from flask import Blueprint, jsonify, request
from api.config import collection

endpoints = Blueprint("endpoints", __name__)

@endpoints.route("/api/create-journal", methods=["POST"])
def create_journal():
    try:
        data = request.get_json()
        journal_name = data.get("journalName")

        if not journal_name:
            return jsonify({"success": False, "message": "No name given", "data": data})
        
        if collection.find_one({"journalName": journal_name}):
            return jsonify({"success": False, "message": f"Another journal already has the name {journal_name}", "data": data})
        
        collection.insert_one({"journalName": journal_name, "journaText": ""})
        return jsonify({"success": True, "message": f"Journal {journal_name} created!", "data": data})
    
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500