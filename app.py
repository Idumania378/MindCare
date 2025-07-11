from flask import Flask, render_template, request, jsonify
from chatbot.nlp import get_bot_response
from chatbot.emotion import detect_emotion

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['message']
    reply = get_bot_response(user_input)
    return jsonify({'reply': reply})

@app.route('/get_emotion')
def get_emotion():
    emotion = detect_emotion()
    return jsonify({'emotion': emotion})

if __name__ == "__main__":
    app.run(debug=True)
