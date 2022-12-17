from os import abort
from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .db_api import *

class GetUsers(Resource):
    def get(self):
        data = get_users()
        print(data)
        return data