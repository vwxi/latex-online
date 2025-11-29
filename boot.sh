#!/bin/bash
flask db update
gunicorn -b 0.0.0.0:5000 app:app