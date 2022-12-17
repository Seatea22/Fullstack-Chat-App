from .db_utils import *
import psycopg2

def get_users():
    return get_all("""SELECT JSON_BUILD_OBJECT('id', id, 'username', username, 
                            'session_key', session_key, 'active', active) 
                            FROM users
                            ORDER BY id ASC;""")