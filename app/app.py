from flask import Flask, session
from os import getenv

app = Flask(__name__)
app.secret_key = getenv("LO_SECRET_KEY")

@app.route("/")
def index():
    return "This works"