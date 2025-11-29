from flask import Flask, session, redirect, url_for, render_template, request
import os
import pdflatex
import atexit

## setup

envs = [
    "LO_UPLOADS",
    "LO_SECRET_KEY"
]

if not all([i in os.environ for i in envs]):
    os._exit(1)

UPLOADS_FOLDER = os.getenv("LO_UPLOADS")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOADS_FOLDER):
    os.mkdir(UPLOADS_FOLDER)

def delete_cache_on_exit():
    os.rmdir(UPLOADS_FOLDER)

atexit.register(delete_cache_on_exit)

## backend

app = Flask(__name__)
app.secret_key = os.getenv("LO_SECRET_KEY")

@app.route("/new", methods=["POST"])
def new():
    if 'id' in session:
        return render_template("error.html")
    
    session['id'] = request.form['id']

    return redirect(url_for("index"))

@app.route("/end", methods=["POST"])
def end():
    session.pop("id", default=None)

@app.route("/")
def index():
    return render_template('index.html')