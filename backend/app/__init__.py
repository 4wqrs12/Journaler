from flask import Flask
from .config import Config
from .db import init_db
from .routes import api