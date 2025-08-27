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
        
        collection.insert_one({"journalName": journal_name, "journalText": ""})
        return jsonify({"success": True, "message": f"Journal \"{journal_name}\" created!", "data": data})
    
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500
    

@endpoints.route("/api/get-journals")
def get_journals():
    try:
        if collection.count_documents({}) == 0:
            return jsonify({"success": False, "message": "No journals found", "data": []})
        
        journals = [doc for doc in collection.find({}, {"_id": False})]
        return jsonify({"success": True, "message": "Journals retrieved successfully", "data": journals})
    
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500


@endpoints.route("/api/get-text/<string:journal_name>")
def get_text(journal_name):
    try:
        doc = collection.find_one({"journalName": journal_name}, {"_id": False})

        if not doc:
            return jsonify({"success": False, "message": f"Journal {journal_name} does not exist!", "data": doc})
        
        return jsonify({"success": True, "message": f"Journal {journal_name} data fetched!", "data": doc})
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500


@endpoints.route("/api/save-text/<string:name>", methods=["POST"])
def save_text(name):
    data = request.get_json()
    journal_text = data.get("journalText")
    doc = collection.find_one({"journalName": name}, {"_id": False})

    if not collection.find_one({"journalName": name}):
        return jsonify({"success": False, "message": f"Journal {name} was not found!", "data": data})
    
    if doc.get("journalText") == journal_text:
        return jsonify({"success": False, "message": f"{name} text not changed!", "data": data})
    
    collection.update_one({"journalName": name}, {"$set": {"journalName": name, "journalText": journal_text}})

    return jsonify({"success": True, "message": f"Journal {name} updated!", "data": data})
    
