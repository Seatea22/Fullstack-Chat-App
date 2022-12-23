from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from api.endpoints import *
from api.db_utils import *

import psycopg2
import yaml
import os

SCHEMA_FILE = 'api\schema.sql'

app = Flask(__name__) #create Flask instance
CORS(app) #Enable CORS on Flask server to work with Nodejs pages
api = Api(app) #api router

api.add_resource(Users,'/users')
api.add_resource(AuthUser, '/auth')


if __name__ == '__main__':
    print("Loading db")
    # exec_sql_file('clubs.sql')

    full_path = os.path.join(os.path.dirname(__file__), f'{SCHEMA_FILE}')
    conn = connect()
    cur = conn.cursor()
    with open(full_path, 'r') as file:
        cur.execute(file.read())
    conn.commit()
    conn.close()

    print("Starting flask")
    app.run(debug=True), #starts Flask



    