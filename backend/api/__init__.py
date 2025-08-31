import os
from flask import Flask
from flask_cors import CORS
from api.config import flask_key, jwt_key, create_jwt, access_expires, refresh_expires, frontend

def api():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = flask_key
    app.config["JWT_SECRET_KEY"] = jwt_key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = access_expires
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = refresh_expires
    CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://192.168.1.196:5000"])
    create_jwt(app)
    from .endpoints import endpoints

    app.register_blueprint(endpoints, url_prefix="/")

    return app