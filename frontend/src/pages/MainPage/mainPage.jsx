import React from "react";

// nodejs library that concatenates classes
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";

import type { DropResult, DraggableLocation } from "react-beautiful-dnd/types";

import Board from "./Sections/SectionChart/SectionChart.jsx";
import {
  jobs,
  machines,
  machineJobMap
} from "./Sections/SectionChart/scenarios/scenario1.jsx";
import openSocket from "socket.io-client";
import classNames from "classnames";
import type { Job, Machine } from "./Sections/SectionChart/types";
import reorder, { reorderJobMap } from "./Sections/SectionChart/reorder";
import SpeedDial from "./speedDial";

const socket = openSocket("http://localhost:5000");
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: jobs,
      machines: machines,
      machineJobMap: machineJobMap,
      ordered: Object.keys(machineJobMap),
      explanation: "Generating explanation...",
      unassignedJobs: jobs.filter(element => {
        return element.machine === "unassigned";
      }),
      managerIsThinking: true
    };
    socket.on("explanation", explanation => {
      let managerIsThinking = false;
      this.setState({ explanation: explanation });
      let newJobs = this.state.jobs;
      newJobs.forEach((job, index) => {
        job.actions = [];
      });
      explanation.forEach((item, index) => {
        item["actions"].forEach((action, i) => {
          if (action["type"] === "swap") {
            managerIsThinking = true;
            const job1Index = this.state.jobs.findIndex(
              x => x.id === action["job1"]
            );
            const job2Index = this.state.jobs.findIndex(
              x => x.id === action["job2"]
            );
            const machine2 = this.state.machines.find(element => {
              return element.id === action["machine2"];
            });
            const personalisedAction1 = {
              type: "swap",
              targetMachine: machine2,
              targetJobId: action["job2"],
              timeImprovement: action["time-improvement"],
              reason: item["reason"],
              targetJobName: newJobs[job2Index].name
            };
            newJobs[job1Index].actions.push(personalisedAction1);

            const machine1 = this.state.machines.find(element => {
              return element.id === action["machine1"];
            });
            const personalisedAction2 = {
              type: "swap",
              targetMachine: machine1,
              targetJobId: action["job1"],
              timeImprovement: action["time-improvement"],
              reason: item["reason"],
              targetJobName: newJobs[job1Index].name
            };
            newJobs[job2Index].actions.push(personalisedAction2);
          }
          if (action["type"] === "move") {
            managerIsThinking = true;
            const jobIndex = this.state.jobs.findIndex(
              x => x.id === action["job"]
            );
            const machine = this.state.machines.find(element => {
              return element.id === action["end-machine"];
            });
            const personalisedAction = {
              type: "move",
              targetMachine: machine,
              timeImprovement: action["time-improvement"],
              reason: item["reason"]
            };
            newJobs[jobIndex].actions.push(personalisedAction);
          }
          if (action["type"] === "unallocated") {
            managerIsThinking = true;
            const jobIndex = this.state.jobs.findIndex(
              x => x.id === action["job"]
            );
            const machine = this.state.machines.find(element => {
              return element.id === action["machine"];
            });
            const personalisedAction = {
              type: "allocate",
              targetMachine: machine,
              reason: item["reason"]
            };
            newJobs[jobIndex].actions.push(personalisedAction);
          }
        });
      });
      this.setState(
        { jobs: newJobs, managerIsThinking: managerIsThinking },
        this.updateMachineStates
      );
    });

    socket.on("optimal-schedule", opt_schedule => {
      let jobs = [];
      let machineJobMap = [];

      opt_schedule.forEach((item, index) => {
        let machine = this.state.machines.find((m, i) => {
          return m.id === item.machineId;
        });
        machineJobMap[machine.name] = []
        item.jobIds.forEach((jobId, i) => {
          let job = this.state.jobs.find((j, i) => {
            return j.id === jobId;
          });
          job.actions = [];
          job.machine = machine;
          machineJobMap[machine.name].push(job);
          jobs.push(job);
        });
      });

      this.setState({
        unassignedJobs: [],
        jobs: jobs,
        machineJobMap: machineJobMap
      });
    });
  }

  setPfd = (machineId, pfd) => {
    let machines = this.state.machines;
    machines.forEach((m, i) => {
      if (m.id === machineId) {
        pfd ? (m.pfd = pfd) : (m.pfd = []);
      }
    });

    this.setState({ machines: machines }, this.updateAllInformation);
  };

  setNfd = (machineId, nfd) => {
    let machines = this.state.machines;
    machines.forEach((m, i) => {
      if (m.id === machineId) {
        nfd ? (m.nfd = nfd) : (m.nfd = []);
      }
    });
    this.setState({ machines: machines }, this.updateAllInformation);
  };

  componentDidMount(): void {
    this.updateAllInformation();
  }

  updateAllInformation() {
    this.updateExplanation();
  }

  updateExplanation() {
    socket.emit("get-explanation", {
      machines: this.state.machines,
      jobs: this.state.jobs,
      machineJobMap: this.state.machineJobMap
    });
  }

  updateMachineStates() {
    let machines = this.state.machines;
    machines.forEach((machine, index) => {
      if (
        this.state.machineJobMap[machine.name].some((job, index) => {
          return job.actions.length !== 0;
        })
      ) {
        machine.state = "angry";
      } else if (
        this.state.jobs.some((job, index) => {
          return job.actions.length !== 0;
        })
      ) {
        machine.state = "sad";
      } else {
        machine.state = "happy";
      }
    });
    this.setState({ machines: machines }, this.forceUpdate);
  }

  performSwapAction = (machine1Id, machine2Id, job1Id, job2Id) => {
    const machine1 = this.state.machines.find(element => {
      return element.id === machine1Id;
    });
    const machine2 = this.state.machines.find(element => {
      return element.id === machine2Id;
    });
    const job1 = this.state.jobs.find(element => {
      return element.id === job1Id;
    });
    const job2 = this.state.jobs.find(element => {
      return element.id === job2Id;
    });
    let machineJobMap = this.state.machineJobMap;
    let newJobs = [];
    machineJobMap[machine1.name].forEach((job, index) => {
      if (job.id === job1Id) {
        newJobs.push(job2);
      } else {
        newJobs.push(job);
      }
    });
    machineJobMap[machine1.name] = newJobs;
    newJobs = [];
    machineJobMap[machine2.name].forEach((job, index) => {
      if (job.id === job2Id) {
        newJobs.push(job1);
      } else {
        newJobs.push(job);
      }
    });
    machineJobMap[machine2.name] = newJobs;

    newJobs = [];
    this.state.jobs.forEach((job, index) => {
      if (job.id === job1Id) {
        job.machine = machine2;
      }
      if (job.id === job2Id) {
        job.machine = machine1;
      }
      newJobs.push(job);
    });
    this.setState(
      { machineJobMap: machineJobMap, jobs: newJobs },
      this.updateAllInformation
    );
  };

  performMoveAction = (machine1Id, machine2Id, jobId) => {
    const machine1 = this.state.machines.find(element => {
      return element.id === machine1Id;
    });
    const machine2 = this.state.machines.find(element => {
      return element.id === machine2Id;
    });
    const job = this.state.jobs.find(element => {
      return element.id === jobId;
    });

    let machineJobMap = this.state.machineJobMap;
    let newJobs = [];
    machineJobMap[machine1.name].forEach((j, index) => {
      if (j.id === jobId) {
      } else {
        newJobs.push(j);
      }
    });
    machineJobMap[machine1.name] = newJobs;
    machineJobMap[machine2.name].unshift(job);
    newJobs = [];
    this.state.jobs.forEach((j, index) => {
      if (j.id === jobId) {
        j.machine = machine2;
      }
      newJobs.push(j);
    });
    this.setState(
      { machineJobMap: machineJobMap, jobs: newJobs },
      this.updateAllInformation
    );
  };

  performAllocateAction = (machineId, jobId) => {
    const machine = this.state.machines.find(element => {
      return element.id === machineId;
    });
    const job = this.state.jobs.find(element => {
      return element.id === jobId;
    });

    let machineJobMap = this.state.machineJobMap;
    let newJobs = [];
    this.state.jobs.forEach((j, index) => {
      if (j.id === jobId) {
        j.machine = machine;
      }
      newJobs.push(j);
    });
    machineJobMap[machine.name].unshift(job);
    let unassignedJobs = [];
    this.state.unassignedJobs.forEach((j, index) => {
      if (j.id !== jobId) {
        unassignedJobs.push(j);
      }
    });
    this.setState(
      {
        machineJobMap: machineJobMap,
        jobs: newJobs,
        unassignedJobs: unassignedJobs
      },
      this.updateAllInformation
    );
  };

  removeJob = (jobId, machine) => {
    let unassignedJobs = this.state.unassignedJobs;
    let jobMap = this.state.machineJobMap;
    if (machine === "unassigned") {
      unassignedJobs = unassignedJobs.filter(j => j.id !== jobId);
    } else {
      jobMap[machine.name] = jobMap[machine.name].filter(j => j.id !== jobId);
    }
    let jobs = [];
    let pastTargetJob = false;
    this.state.jobs.forEach((j, index) => {
      if (j.id === jobId) {
        pastTargetJob = true;
      } else {
        if (pastTargetJob) {
          j.id = String.fromCharCode(j.id.charCodeAt(0) - 1);
        }
        jobs.push(j);
      }
    });
    this.setState(
      {
        jobs: jobs,
        unassignedJobs: unassignedJobs,
        machineJobMap: jobMap
      },
      this.updateAllInformation
    );
  };

  onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered: string[] = reorder(
        this.state.ordered,
        source.index,
        destination.index
      );

      this.setState({
        ordered
      });

      return;
    }

    if (source.droppableId === "unassigned") {
      let job = this.state.jobs.find((element, index) => {
        return element.id === result.draggableId;
      });
      const machine = this.state.machines.find((element, index) => {
        return element.name === destination.droppableId;
      });
      job.machine = machine;

      const unassignedJobs = this.state.unassignedJobs.filter(
        j => j.id !== job.id
      );
      const jobs = this.state.jobs.filter(j => j.id !== job.id).concat(job);

      let machineJobMap = this.state.machineJobMap;
      machineJobMap[machine.name].push(job);
      this.setState(
        {
          machineJobMap: machineJobMap,
          jobs: jobs,
          unassignedJobs: unassignedJobs
        },
        this.updateAllInformation
      );
      return;
    }

    if (destination.droppableId === "unassigned") {
      let job = this.state.jobs.find((element, index) => {
        return element.id === result.draggableId;
      });
      const sourceMachine = this.state.machines.find((element, index) => {
        return element.name === source.droppableId;
      });
      job.machine = "unassigned";

      let unassignedJobs = this.state.unassignedJobs;
      unassignedJobs.splice(destination.index, 0, job);
      const jobs = this.state.jobs.filter(j => j.id !== job.id).concat(job);

      let machineJobMap = this.state.machineJobMap;
      machineJobMap[sourceMachine.name] = machineJobMap[
        sourceMachine.name
      ].filter(j => j.id !== job.id);
      this.setState(
        {
          machineJobMap: machineJobMap,
          jobs: jobs,
          unassignedJobs: unassignedJobs
        },
        this.updateAllInformation
      );
      return;
    }

    const data = reorderJobMap({
      jobMap: this.state.machineJobMap,
      source,
      destination
    });

    let job = this.state.jobs.find((element, index) => {
      return element.id === result.draggableId;
    });

    const machine = this.state.machines.find((element, index) => {
      return element.name === destination.droppableId;
    });

    job.machine = machine;

    const jobs = this.state.jobs.filter(j => j.id !== job.id).concat(job);

    this.setState(
      {
        machineJobMap: data.jobMap,
        jobs: jobs
      },
      this.updateAllInformation
    );
  };

  addNewJob = (length, assignee, name, jobType) => {
    const machine =
      assignee === "unassigned"
        ? "unassigned"
        : this.state.machines.find(element => {
            return element.name === assignee;
          });

    const newJob: Job = {
      length: length,
      id: String.fromCharCode(65 + this.state.jobs.length),
      name: name,
      machine: machine,
      actions: [],
      type: jobType
    };
    const jobs = [...this.state.jobs, newJob];

    let machineJobMap = this.state.machineJobMap;
    let unassignedJobs = this.state.unassignedJobs;
    if (machine === "unassigned") {
      unassignedJobs.push(newJob);
    } else {
      machineJobMap = {
        ...this.state.machineJobMap,
        [machine.name]: [...this.state.machineJobMap[machine.name], newJob]
      };
    }
    this.setState(
      {
        jobs: jobs,
        machineJobMap: machineJobMap,
        unassignedJobs: unassignedJobs
      },
      this.updateAllInformation
    );
  };

  addNewResource = name => {
    if (
      this.state.machines.every((element, index) => {
        return element.name !== name;
      })
    ) {
      const newMachine: Machine = {
        id: this.state.ordered.length + 1,
        name: name,
        state: "angry",
        completionTime: 0
      };
      const machines = [...this.state.machines, newMachine];
      const machineJobMap = {
        ...this.state.machineJobMap,
        [newMachine.name]: []
      };
      this.setState(
        {
          machines: machines,
          machineJobMap: machineJobMap,
          ordered: Object.keys(machineJobMap)
        },
        this.updateAllInformation
      );
    }
  };

  loadScheduleFromFile = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const schedule = JSON.parse(e.target.result);
      let jobs = schedule.jobs;
      let unassignedJobs = [];
      const machines = schedule.machines;
      jobs.forEach((j, index) => {
        j.machine === "unassigned"
          ? unassignedJobs.push(j)
          : (j.machine = machines.find((m, index) => {
              return m.id === j.machine;
            }));
      });

      const getByMachine = (machine: Machine, items: Job[]): Job[] =>
        items.filter((job: Job) => job.machine === machine);

      const machineJobMap = machines.reduce(
        (previous, machine) => ({
          ...previous,
          [machine.name]: getByMachine(machine, jobs)
        }),
        {}
      );

      this.setState(
        {
          machines: machines,
          jobs: jobs,
          machineJobMap: machineJobMap,
          unassignedJobs: unassignedJobs,
          ordered: Object.keys(machineJobMap)
        },
        this.updateAllInformation
      );
    };
    reader.readAsText(file);
  };

  saveSchedule = () => {
    const json = {
      machines: this.state.machines,
      jobs: this.state.jobs.map(j => ({
        ...j,
        machine: j.machine !== "unassigned" ? j.machine.id : j.machine
      }))
    };

    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], {
      type: "application/json"
    });
    element.href = URL.createObjectURL(file);
    element.download = "schedule.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  onOptimiseClick = () => {
    socket.emit("get-optimal-schedule", {
      machines: this.state.machines,
      jobs: this.state.jobs,
      machineJobMap: this.state.machineJobMap
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.content)}>
        <SpeedDial
          onFileUpload={this.loadScheduleFromFile}
          onSaveClick={this.saveSchedule}
          onOptimiseClick={this.onOptimiseClick}
        />
        <Board
          jobs={this.state.jobs}
          unassignedJobs={this.state.unassignedJobs}
          machines={this.state.machines}
          machineJobMap={this.state.machineJobMap}
          ordered={this.state.ordered}
          onDragEnd={this.onDragEnd}
          onAddResourceButtonClick={e => this.addNewResource()}
          performSwapAction={this.performSwapAction}
          performMoveAction={this.performMoveAction}
          performAllocateAction={this.performAllocateAction}
          addNewJob={this.addNewJob}
          addNewResource={this.addNewResource}
          removeJob={this.removeJob}
          setPfd={this.setPfd}
          setNfd={this.setNfd}
          managerIsThinking={this.state.managerIsThinking}
        />
      </div>
    );
  }
}

export default withStyles(mainPageStyle)(MainPage);
