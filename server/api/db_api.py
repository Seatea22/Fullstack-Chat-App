import binascii
import hashlib
import secrets
from .db_utils import *
import psycopg2

def get_users():
    return get_all("""SELECT JSON_BUILD_OBJECT('id', users.id, 'username', users.username, 'email', users.email, 'session_key', active_users.session_key) 
                            FROM users
                            LEFT JOIN active_users
                                ON users.id = active_users.user_id
                            ORDER BY users.id ASC;""")


def get_user(user_id):
    return get_one(f"""SELECT JSON_BUILD_OBJECT('id', users.id, 'username', users.username, 'email', users.email,
                            'session_key', active_users.session_key) 
                            FROM users
                            LEFT JOIN active_users
                                ON users.id = active_users.user_id
                            WHERE users.id = \'{user_id}\';""")[0]


def hash_password(user_password):
    return hashlib.sha512(user_password.encode()).hexdigest()

def login(username, password):
    user_id = get_one(f"""SELECT id FROM users
                         WHERE username = \'{username}\' and password = \'{password}\';""")[0]
    if(user_id):
        session_key = secrets.token_urlsafe()
        return get_one_commit(f"""INSERT INTO active_users(user_id, session_key)	
                                    VALUES (\'{user_id}\', \'{session_key}\')
                                    RETURNING user_id;""")[0]
    else:
        return None

def logout(session_key):
    return get_one_commit(f"""DELETE FROM active_users WHERE session_key = \'{session_key}\' RETURNING session_key;""")[0]

def register(username, email, password):
    commit_change(f"""INSERT INTO users(username, email, password)	
                        VALUES (\'{username}\', \'{email}\', \'{password}\');""")