from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask_socketio import SocketIO,send, emit
from src.interface import explain, optimal_schedule
from string import ascii_uppercase
import re

import pyutilib.subprocess.GlobalData
pyutilib.subprocess.GlobalData.DEFINE_SIGNAL_HANDLERS_DEFAULT = False

app = Flask(__name__)
socketio = SocketIO(app)


CORS(app)

@socketio.on('get-explanation')
def handle_message(schedule_information):
  print(schedule_information['machines'])
  m_text = str(len(schedule_information['machines']))
  p_text = "\n".join([job['id'] + ": " + str(job['length']) for job in schedule_information['jobs']]) + "\n"

  i = 1
  assignments = []
  schedule_information['machineJobMap']
  for entry in schedule_information['machineJobMap']:
    assignment = str(i) + ": "
    for job in schedule_information['machineJobMap'][entry]:
      assignment = assignment + str(job['id']) + " "
    assignments.append(assignment)
    i += 1

  S_text = "\n".join(assignments) + "\n"

  i = 1
  pfds = []
  for machine in schedule_information['machines']:
    pfd = str(i) + ": "
    for decision in machine['pfd']:
      pfd = pfd + decision['value'] + " "
    pfds.append(pfd)
    i+= 1
  pfd_text = "\n".join(pfds) + "\n"

  i = 1
  nfds = []
  for machine in schedule_information['machines']:
    nfd = str(i) + ": "
    for decision in machine['nfd']:
      nfd = nfd + decision['value'] + " "
    nfds.append(nfd)
    i+= 1
  nfd_text = "\n".join(nfds) + "\n"

  print("m_text")
  print(m_text)
  print("p_text")
  print(p_text)
  print("S_text")
  print(S_text)
  print("pfd_text")
  print(pfd_text)
  print("nfd_text")
  print(nfd_text)
  _, explanation = explain(m_text, p_text, nfd_text, pfd_text, S_text, options=
  {'graphical': False, 'naive': False, 'fixed': True, 'partial': False})

  result = []
  regex = '.*reduce by ([+-]?[0-9]*)'
  for reason, actions in explanation:
    interpretable_actions = []
    time_improvement_match = re.match(regex, reason)
    time_improvement = time_improvement_match.group(1) if time_improvement_match else ""
    for action_text, (action_type, sequence) in actions:
      interpretable_action = {'type': action_type, 'text':action_text, 'time-improvement': time_improvement}
      if action_type == 'move':
        interpretable_action['start-machine'] = int(sequence[0] + 1)
        interpretable_action['end-machine'] = int(sequence[1] + 1)
        interpretable_action['job'] = ascii_uppercase[sequence[2]]
      if action_type == 'unallocated':
        interpretable_action['machine'] = int(sequence[0] + 1)
        interpretable_action['job'] = ascii_uppercase[sequence[1]]
      if action_type == 'swap':
        interpretable_action['machine1'] = int(sequence[0] + 1)
        interpretable_action['machine2'] = int(sequence[1] + 1)
        interpretable_action['job1'] = ascii_uppercase[sequence[2]]
        interpretable_action['job2'] = ascii_uppercase[sequence[3]]
      interpretable_actions.append(interpretable_action)


    explanation_dict = {
      'reason': reason,
      'actions': interpretable_actions
    }
    result.append(explanation_dict)

  print(explanation)
  print(result)

  emit('explanation', result, json=True)

@socketio.on('get-optimal-schedule')
def handle_message(schedule_information):
  m_text = str(len(schedule_information['machines']))
  p_text = "\n".join([job['id'] + ": " + str(job['length']) for job in schedule_information['jobs']]) + "\n"

  i = 1
  assignments = []
  schedule_information['machineJobMap']
  for entry in schedule_information['machineJobMap']:
    assignment = str(i) + ": "
    for job in schedule_information['machineJobMap'][entry]:
      assignment = assignment + str(job['id']) + " "
    assignments.append(assignment)
    i += 1

  S_text = "\n".join(assignments) + "\n"

  i = 1
  pfds = []
  for machine in schedule_information['machines']:
    pfd = str(i) + ": "
    for decision in machine['pfd']:
      pfd = pfd + decision['value'] + " "
    pfds.append(pfd)
    i+= 1
  pfd_text = "\n".join(pfds) + "\n"

  i = 1
  nfds = []
  for machine in schedule_information['machines']:
    nfd = str(i) + ": "
    for decision in machine['nfd']:
      nfd = nfd + decision['value'] + " "
    nfds.append(nfd)
    i+= 1
  nfd_text = "\n".join(nfds) + "\n"

  print("m_text")
  print(m_text)
  print("p_text")
  print(p_text)
  print("S_text")
  print(S_text)
  print("pfd_text")
  print(pfd_text)
  print("nfd_text")
  print(nfd_text)
  _, opt_schedule = optimal_schedule(m_text, p_text, nfd_text, pfd_text, 'glpk', 100)
  print(opt_schedule)
  print(type(opt_schedule))
  results = []
  for line in opt_schedule.split('\n')[:-1]:
    parts = line.split(': ')
    machine_id = int(parts[0])
    jobs = parts[1].split(' ')
    results.append({"machineId": machine_id, "jobIds": jobs})
  print(results)

  emit('optimal-schedule', results, json=True)


if __name__ == '__main__':
  socketio.run(app)