from flask import Flask, render_template
from Lessons import *

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('lessons.html')


@app.route('/login')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
