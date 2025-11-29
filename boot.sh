#!/bin/bash
python3 -m flask db update
python3 -m gunicorn -b 0.0.0.0:5000 app:app