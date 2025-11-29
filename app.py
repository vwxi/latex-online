from flask import Flask, session, redirect, url_for, render_template
from os import getenv

app = Flask(__name__)
app.secret_key = getenv("LO_SECRET_KEY")

@app.route("/new", methods=["POST"])
def new():
    session['id'] = request.form['id']

    return redirect(url_for("index"))

@app.route("/")
def index():
    return render_template('index.html')