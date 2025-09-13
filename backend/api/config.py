import os
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

def create_jwt(flask_app):
    jwt = JWTManager(flask_app)

    # @jwt.token_in_blocklist_loader
    # def check_if_token_in_blocklist(jwt_header, jwt_payload):
    #     return revoked_token_collection.find_one({"token": jwt_payload["jti"]})

    return jwt

# jwt = JWTManager()

# def create_jwt(flask_app):
#     jwt.init_app(flask_app)

#     # Define a function to revoke tokens
#     def revoke_token(token):
#         revoked_token_collection.insert_one({"token": token})

#     # jwt.revoke_token_loader(revoke_token)
#     jwt.revoked_token_loader(revoke_token)

#     return jwt

load_dotenv()

bcrypt = Bcrypt()
jwt_key = os.getenv("JWT_KEY")
flask_key = os.getenv("FLASK_KEY")
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["Journaler"]
journal_collection = db["journals"]
user_collection = db["users"]
revoked_token_collection = db["revoked_tokens"]