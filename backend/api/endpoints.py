# views.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.config import journal_collection, user_collection, bcrypt

endpoints = Blueprint("endpoints", __name__)

@endpoints.route("/api/create-journal", methods=["POST"])
@jwt_required()
def create_journal():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        journal_name = data.get("journalName")

        if not journal_name:
            return jsonify({"success": False, "message": "No name given", "data": data})
        
        if journal_collection.find_one({"journalName": journal_name}):
            return jsonify({"success": False, "message": f"Another journal already has the name \"{journal_name}\"", "data": data})
        
        journal_collection.insert_one({"journalName": journal_name, "journalText": "", "belongsTo": user_id})
        return jsonify({"success": True, "message": f"Journal \"{journal_name}\" created!", "data": data})
    
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500
    

@endpoints.route("/api/get-journals")
@jwt_required()
def get_journals():
    try:
        user_id = get_jwt_identity()
        print(user_id)
        if journal_collection.count_documents({}) == 0:
            return jsonify({"success": False, "message": "No journals found", "data": []})
        
        journals = [doc for doc in journal_collection.find({"belongsTo": user_id}, {"_id": False})]
        return jsonify({"success": True, "message": "Journals retrieved successfully", "data": journals})
    
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500


@endpoints.route("/api/get-text/<string:journal_name>")
def get_text(journal_name):
    try:
        doc = journal_collection.find_one({"journalName": journal_name}, {"_id": False})

        if not doc:
            return jsonify({"success": False, "message": f"Journal {journal_name} does not exist!", "data": doc})
        
        return jsonify({"success": True, "message": f"Journal {journal_name} data fetched!", "data": doc})
    except Exception as e:
        return jsonify({"success": False, "message": "An error has occured", "data": str(e)}), 500


@endpoints.route("/api/save-text/<string:name>", methods=["POST"])
def save_text(name):
    data = request.get_json()
    journal_text = data.get("journalText")
    doc = journal_collection.find_one({"journalName": name}, {"_id": False})

    if not journal_collection.find_one({"journalName": name}):
        return jsonify({"success": False, "message": f"Journal {name} was not found!", "data": data})
    
    if doc.get("journalText") == journal_text:
        return jsonify({"success": False, "message": f"{name} text not changed!", "data": data})
    
    journal_collection.update_one({"journalName": name}, {"$set": {"journalName": name, "journalText": journal_text}})

    return jsonify({"success": True, "message": f"Journal {name} updated!", "data": data})
    

@endpoints.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Username or password was not given", "data": data})
    
    if user_collection.find_one({"username": username}):
        return jsonify({"success": False, "message": f"Username \"{username}\" already exists!", "data": data})
    
    hashed_pass = bcrypt.generate_password_hash(password).decode("UTF-8")

    user_collection.insert_one({"username": username, "password": hashed_pass})
    access_token = create_access_token(identity=username)

    return jsonify({"success": True, "message": f"User \"{username}\" created!", "data": {"accessToken": access_token}})


@endpoints.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    doc = user_collection.find_one({"username": username})
    if not doc:
        return jsonify({"success": False, "message": f"User \"{username}\" does not exist!", "data": data})
    
    if bcrypt.check_password_hash(doc["password"], password):
        access_token = create_access_token(identity=username)
        return jsonify({"success": True, "message": f"User \"{username}\" authenticated!", "data": {"accessToken": access_token}})
    else:
        return jsonify({"success": False, "message": "Incorrect credentials", "data": data})
    