import yaml
import os
import psycopg2

def connect():
    config = {}
    yml_path = os.path.join(os.path.dirname(__file__), 'db.yml')
    with open(yml_path, 'r') as file:
        config = yaml.load(file, Loader=yaml.FullLoader)
        # print("Config: ", config)

    return psycopg2.connect(dbname=config['database'], user=config['user'], password=config['password'], host=config['host'], port=config['port'])

def get_one(sql):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchone()
    connection.close()
    return data

def get_all(sql):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(sql)
    tuple_list = cursor.fetchall()
    connection.close()
    return tuple_list

def commit_change(sql):
    connection = connect()
    cursor = connection.cursor()
    result = cursor.execute(sql)
    connection.commit()
    connection.close()
    return result

def get_one_commit(sql):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchone()
    connection.commit()
    connection.close()
    return data