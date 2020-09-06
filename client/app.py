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

# handling the page events and sending necessary data to contact page
'''@socketio.on('click data send')    #decorator to catch event called "my event"
def handle_my_custom_event(json):  #This is event callback function triggers new event called "my response" which is able to be caught by another later callback
  emit('click data recv', json)
'''                    
@socketio.on('click data recv')
def handle_my_custom_event(json):
  print(json)
  emit('click data send', json)

if __name__ == "__main__":
  app.run()

"""
@app.route("/hello/")
@app.route("/hello/<name>")
def hello_there(name = None):
  return render_template(
    "hello_there.html",
    name=name,
    date=datetime.now()
  )

@app.route("/api/data")
def get_data():
  return app.send_static_file("data.json")
"""
