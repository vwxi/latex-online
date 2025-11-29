from flask import Flask, session, redirect, url_for
from os import getenv

app = Flask(__name__)
app.secret_key = getenv("LO_SECRET_KEY")

@app.route("/new", methods=["POST"])
def new():
    return redirect(url_for("index"))

@app.route("/")
def index():
    return "This works"