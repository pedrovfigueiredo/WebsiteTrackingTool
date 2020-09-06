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

from heatmap import HeatMap
import json

resolution = (50, 50)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread_lock = Lock()
clicks_hm = HeatMap(resolution)
moves_hm = HeatMap(resolution)

def bck():
  global clicks_hm
  global moves_hm
  global thread_lock

  while True:
    socketio.sleep(2)
    with thread_lock:
      c = clicks_hm()
      m = moves_hm()

      hms = [c.tolist(), m.tolist()]

      # print('clicks: {}'.format(c))
      # print('moves: {}'.format(m))

      socketio.emit('send heatmap', json.dumps(hms))

thread = socketio.start_background_task(bck)

# Setting up the page routing
# front end client page and where mouse location will be recorded
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/heatmap/")
def heatmap_visualizer():
  return render_template("heatmap_visualizer.html")

@app.route("/reset/")
def reset():
  global clicks_hm
  global moves_hm
  clicks_hm = HeatMap(grid_resolution)
  moves_hm = HeatMap(grid_resolution)
  return "HeatMap calculations were reset."

@socketio.on('update heatmap')
def update_heatmap(mouse_clicks, mouse_moves):
  global clicks_hm
  global moves_hm
  global thread_lock
  
  with thread_lock:
    clicks_hm.add(mouse_clicks)
    moves_hm.add(mouse_moves)

@socketio.on('update window size')
def update_window_size(dim):
  global clicks_hm
  global moves_hm
  global thread_lock
  with thread_lock:
    clicks_hm.update_window_size(dim)
    moves_hm.update_window_size(dim)

if __name__ == "__main__":
  app.run()
