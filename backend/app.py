import os

import psycopg2
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask import send_from_directory
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
load_dotenv()

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    storage_uri="memory://",
    default_limits=["10 per second"]  # Adjust the limits as per your requirements
)

class DataBase:
    def __init__(self, db_auth):
        self.db_auth = db_auth
        self.connection = psycopg2.connect(self.db_auth)
        self.cursor = self.connection.cursor()

    def get_random_joke(self):
        category = request.args.get('category')

        # Filter the query based on the category
        if category:
            jokes_query = f"SELECT text, id FROM jokes_uk WHERE tags LIKE '{category}' ORDER BY RANDOM() LIMIT 1;"
        else:
            jokes_query = 'SELECT text, id FROM jokes_uk ORDER BY RANDOM() LIMIT 1;'

        db.cursor.execute(jokes_query)
        joke = db.cursor.fetchone()

        if joke:
            joke_text, id = joke

            # Отримання кількості лайків і дизлайків
            self.cursor.execute('SELECT COUNT(*) FROM votes WHERE id = %s AND vote_type = %s', (id, 'like'))
            likes = self.cursor.fetchone()[0]
            self.cursor.execute('SELECT COUNT(*) FROM votes WHERE id = %s AND vote_type = %s', (id, 'dislike'))
            dislikes = self.cursor.fetchone()[0]

            # Формування результату
            return {'joke': joke_text, 'joke_id': id,'likes': likes, 'dislikes': dislikes}
        else:
            return {'joke': 'Анекдотів не знайдено'}

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
