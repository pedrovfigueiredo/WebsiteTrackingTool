# https://code.visualstudio.com/docs/python/tutorial-flask
# https://www.shanelynn.ie/asynchronous-updates-to-a-webpage-with-flask-and-socket-io/#comments
# https://github.com/miguelgrinberg/Flask-SocketIO
from flask import Flask
from flask import render_template

from flask_socketio import SocketIO, emit, join_room, leave_room, \
  close_room, rooms, disconnect, send
from threading import Lock
from flask import session, request, copy_current_request_context

from datetime import datetime
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread = None
thread_lock = Lock()

def bck(json):
  while True:
    socketio.sleep(2)
    socketio.emit('click data send', json)

# Setting up the page routing
# front end client page and where mouse location will be recorded
@app.route("/")
def home():
  return render_template("home.html")

@app.route("/about/")
def about():
  return render_template("about.html")

#page where data from front end client page (http://127.0.0.1:5000/home/) will be sent to
@app.route("/contact/")
def contact():
  return render_template("contact.html")

@socketio.on('click data recv')
def handle_my_custom_event(json):
  global thread
  with thread_lock:
    if thread is None:
      thread = socketio.start_background_task(bck(json))

if __name__ == "__main__":
  app.run()
