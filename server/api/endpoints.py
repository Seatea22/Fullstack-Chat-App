from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
from flask import abort, request
import json
from .db_api import *

class Users(Resource):
    def get(self):
        data = get_users()
        return data
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('email')
        parser.add_argument('password')
        args = parser.parse_args()
        try:
            register(args['username'], args['email'], args['password'])
            return 200
        except Exception as e:
            print(e, args)
            abort(400, "Error with input!")

class AuthUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        try:
            value = login(args['username'], args['password'])
            if value:
                return get_user(value)
            else:
                abort(404, "User does not exist!")
        except:
            abort(404, "Error with i!")

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('session_key')
        args = parser.parse_args()
        value = logout(args['session_key'])
        if value:
            return {}
        else:
            abort(404, "Session not found!")