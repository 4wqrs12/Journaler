from datetime import timedelta
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

def create_jwt(flask_app):
    jwt = JWTManager(flask_app)
    return jwt

load_dotenv()

bcrypt = Bcrypt()
frontend = os.getenv("REACT_DEV_SERVER")
jwt_key = os.getenv("JWT_KEY")
access_expires = timedelta(minutes=15)
refresh_expires = timedelta(days=30)
flask_key = os.getenv("FLASK_KEY")
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["Journaler"]
journal_collection = db["journals"]
user_collection = db["users"]