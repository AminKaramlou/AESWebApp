from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask_socketio import SocketIO,send, emit
from interface import explain

app = Flask(__name__)
socketio = SocketIO(app)


CORS(app)


@socketio.on('get-explanation')
def handle_message(schedule_information):
  m_text = str(len(schedule_information['machines']))
  p_text = "\n".join(['A' + ": " + str(job['length']) for job in schedule_information['jobs']])
  nfd_text = ""
  pfd_text = ""

  i = 1
  assignments = []
  schedule_information['machineJobMap']
  for entry in schedule_information['machineJobMap']:
    assignment = str(i) + ": "
    for job in schedule_information['machineJobMap'][entry]:
      assignment = assignment + str(job['id']) + " "
    assignments.append(assignment)

  S_text = "\n".join(assignments)
  print(m_text)
  print(p_text)
  print(S_text)
  explanation = explain(m_text, p_text, nfd_text, pfd_text, S_text, options="not-graphical")

  print(explanation)

  emit('explanation', "This is a test explanation")

if __name__ == '__main__':
  socketio.run(app)