import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def api():
    app = Flask(__name__)
    CORS(app)
    app.config["SECRET_KEY"] = os.getenv("FLASK_KEY")
    from .endpoints import endpoints

    app.register_blueprint(endpoints, url_prefix="/")

    return app