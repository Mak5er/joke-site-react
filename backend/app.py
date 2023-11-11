import os

import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
load_dotenv()


class DataBase:
    def __init__(self, db_auth):
        self.db_auth = db_auth
        self.connection = psycopg2.connect(self.db_auth)
        self.cursor = self.connection.cursor()

    def get_random_joke(self):
        self.cursor.execute('SELECT text FROM jokes_uk ORDER BY RANDOM() LIMIT 1;')
        joke = self.cursor.fetchone()

        if joke:
            return {'joke': joke[0]}
        else:
            return {'joke': 'No jokes found'}

    def send_idea(self, idea):
        self.cursor.execute("INSERT INTO ideas (text) VALUES (%s);", (idea,))
        self.connection.commit()
        return {"status": "success", "message": "Idea successfully inserted into the database"}


db = DataBase(os.getenv("db_auth"))


@cross_origin()
@app.route('/')
def serve():
    return 'helloworld'


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@cross_origin()
@app.route('/get_random_joke', methods=['GET'])
def get_random_joke_ajax():
    return jsonify(db.get_random_joke())


@cross_origin()
@app.route('/send_idea', methods=['POST'])
def send_idea():
    idea = request.json['idea']
    return jsonify(db.send_idea(idea))


if __name__ == '__main__':
    app.run()
