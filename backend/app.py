import os
import random
import sqlite3
from urllib.parse import quote

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()

bot_api_url = os.getenv("bot_api_url")
chat_id = os.getenv("chat_id")


# Конфігурація основних кольорів


# Функція для отримання рандомного анекдоту з бази даних
def get_random_joke():
    with sqlite3.connect('jokes.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT text FROM jokes_uk')
        jokes = cursor.fetchall()

    if jokes:
        random_joke = random.choice(jokes)[0]
        return random_joke
    else:
        return "У базі даних немає анекдотів."


@cross_origin()
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, "index.html")


last_request_time = 0


@cross_origin()
@app.route('/api/get_random_joke', methods=['GET'])
def get_random_joke_ajax():
    joke = get_random_joke()
    return jsonify({'joke': joke})


@cross_origin()
@app.route('/api/send_idea', methods=['POST'])
def send_idea():
    idea = request.json['idea']
    encoded_idea = quote(idea)
    message = f'/sendMessage?chat_id={chat_id}&text=*Нова ідея*: \n`{encoded_idea}`&parse_mode=MarkdownV2'
    response = requests.get(bot_api_url + message)
    print(response.json())
    return 'Idea sent!'


if __name__ == '__main__':
    app.run()
