from flask import Flask, session, redirect, url_for, render_template, request, send_file
from werkzeug.utils import secure_filename

import os
import json
import shutil
import atexit
import hashlib
import subprocess

## setup

envs = [
    "LO_UPLOADS",
    "LO_SECRET_KEY"
]

if not all([i in os.environ for i in envs]):
    os._exit(1)

# will exit if not on system
PDFLATEX_PATH = shutil.which("pdflatex")

if not PDFLATEX_PATH:
    os._exit(2)

UPLOADS_FOLDER = os.getenv("LO_UPLOADS")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOADS_FOLDER):
    os.mkdir(UPLOADS_FOLDER)

def delete_cache_on_exit():
    shutil.rmtree(UPLOADS_FOLDER, ignore_errors=True)

atexit.register(delete_cache_on_exit)

## backend

def is_file_allowed(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app = Flask(__name__)
app.secret_key = os.getenv("LO_SECRET_KEY")

@app.route("/new", methods=["POST"])
def new():
    print(session)
    if 'id' in session:
        return render_template("error.html", error="called new endpoint with existing session"), 400
    
    session['id'] = hashlib.sha256(request.remote_addr.encode("utf-8")).hexdigest()
    temp_path = os.path.join(UPLOADS_FOLDER, session['id'])

    if not os.path.exists(temp_path):
        os.mkdir(temp_path)
    
    return "", 200

@app.route("/add", methods=["POST"])
def add_file():
    if 'id' not in session:
        return render_template('error.html', error="called endpoint without active session"), 400

    if 'file' not in request.files:
        return render_template('error.html', error="called add endpoint without adding a file"), 400
    
    file = request.files['file']
    if len(file.filename) == 0:
        return render_template('error.html', error="empty filename"), 400
    
    if file and is_file_allowed(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOADS_FOLDER, session['id'], filename))
        return json.loads({ "filename": filename }), 200

@app.route("/remove", methods=["POST"])
def remove():
    if 'id' not in session:
        return render_template('error.html', error="called endpoint without active session"), 400

    if 'filename' not in request.form:
        return render_template('error.html', error="filename not in delete request"), 400   

    path = os.path.join(UPLOADS_FOLDER, session['id'], request.form["filename"])
    if not os.path.exists(path):
        return render_template('error.html', error="cannot delete file that does not exist"), 400
    
    os.remove(path)

    return json.loads({ "filename": request.form["filename"] }), 200

@app.route("/compile", methods=["POST"])
def compile():
    if 'id' not in session:
        return render_template('error.html', error="called endpoint without active session"), 400

    if "source" not in request.form:
        return render_template('error.html', error="sent compilation task without source"), 400
    
    if len(request.form["source"]) == 0:
        return render_template('error.html', error="sent empty source file"), 400

    source_dir = os.path.join(UPLOADS_FOLDER, session['id'])
    source_file = os.path.join(source_dir, 'source.tex')

    with open(source_file, "wb") as f:
        f.write(request.form["source"].encode("utf-8"))

    built_pdf = os.path.join(source_dir, 'compiled.pdf')
    built_aux = os.path.join(source_dir, 'compiled.aux')
    built_log = os.path.join(source_dir, 'compiled.log')
    
    result = subprocess.run([PDFLATEX_PATH, 
                             "-jobname=compiled", 
                             f"-output-directory={source_dir}", 
                             source_file], 
                             capture_output=True)
    
    print(result)
    
    output = send_file(built_pdf, mimetype="application/pdf", download_name="compiled.pdf")

    os.remove(built_aux)
    os.remove(built_log)

    return output

@app.route("/end", methods=["POST"])
def end():
    if 'id' not in session:
        return render_template('error.html', error="called endpoint without active session"), 400

    shutil.rmtree(os.path.join(UPLOADS_FOLDER, session["id"]), ignore_errors=True)

    session.clear()
    return "", 200

@app.route("/")
def index():
    return render_template('index.html')