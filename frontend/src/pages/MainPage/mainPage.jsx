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
} from "./Sections/SectionChart/data.jsx";
import openSocket from "socket.io-client";
import classNames from "classnames";
import type { Job, JobMap, Machine } from "./Sections/SectionChart/types";
import { colors } from "@atlaskit/theme";
import reorder, { reorderJobMap } from "./Sections/SectionChart/reorder";

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
      })
    };
    socket.on("explanation", explanation => {
      this.setState({ explanation: explanation });
      let newJobs = this.state.jobs;
      newJobs.forEach((job, index) => {
        job.actions = [];
      });
      explanation.forEach((item, index) => {
        item["actions"].forEach((action, i) => {
          if (action["type"] === "swap") {
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
            console.log(action);
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
      this.setState({ jobs: newJobs }, this.forceUpdate);
    });
  }

  componentDidMount(): void {
    this.updateAllInformation();
  }

  updateAllInformation() {
    this.updateExplanation();
    this.updateMachineStates();
  }

  updateExplanation() {
    socket.emit("get-explanation", {
      machines: this.state.machines,
      jobs: this.state.jobs,
      machineJobMap: this.state.machineJobMap
    });
  }

  updateMachineStates() {
    let completion_times = [];
    let machines = this.state.machines;
    machines.forEach((machine, index) => {
      let completion_time = 0;
      this.state.machineJobMap[machine.name].forEach((job, index) => {
        completion_time += job.length;
      });
      machine.completionTime = completion_time;
      completion_times.push(completion_time);
    });
    const average_time =
      completion_times.reduce((p, c) => p + c, 0) / completion_times.length;
    machines.forEach((machine, index) => {
      if (machine.completionTime >= 1.5 * average_time) {
        machine.state = "sad";
      } else if (machine.completionTime <= 0.5 * average_time) {
        machine.state = "happy";
      } else {
        machine.state = "neutral";
      }
    });
    this.setState({ machines: machines });
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
    console.log(newJobs);
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
    console.log(newJobs);
    this.setState(
      { machineJobMap: machineJobMap, jobs: newJobs },
      this.updateAllInformation
    );
  };

  performAllocateAction = (machineId, jobId) => {
    console.log(machineId);
    console.log(jobId);
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

  onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow: string[] = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column: Job[] = this.state.machineJobMap[result.source.droppableId];
      const withJobRemoved: Job[] = [...column];
      withJobRemoved.splice(result.source.index, 1);
      const machineJobMap: JobMap = {
        ...this.state.machineJobMap,
        [result.source.droppableId]: withJobRemoved
      };
      this.setState({ machineJobMap: machineJobMap });
      return;
    }

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
    console.log(this.state.machineJobMap);
    const data = reorderJobMap({
      jobMap: this.state.machineJobMap,
      source,
      destination
    });
    console.log(data.jobMap);

    this.setState(
      {
        machineJobMap: data.jobMap
      },
      this.updateAllInformation
    );
  };

  addNewJob = (length, assignee, name) => {
    console.log(length)
    console.log(assignee)
    console.log(name)
    const machine = this.state.machines.find(element => {
      return element.name === assignee;
    });
    const newJob: Job = {
      length: length,
      id: String.fromCharCode(65 + this.state.jobs.length),
      name: name,
      machine: machine,
      colors: {
        soft: colors.Y50,
        hard: colors.Y200
      },
      actions: []
    };
    const jobs = [...this.state.jobs, newJob];
    const machineJobMap = {
      ...this.state.machineJobMap,
      [machine.name]: [...this.state.machineJobMap[machine.name], newJob]
    };
    this.setState(
      {
        jobs: jobs,
        machineJobMap: machineJobMap,
        ordered: Object.keys(machineJobMap)
      },
      this.updateAllInformation
    );
  };

  addNewResource = () => {
    const newMachine: Machine = {
      id: this.state.ordered.length + 1,
      name: `Nurse ${this.state.ordered.length + 1}`
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
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.content)}>
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
        />
      </div>
    );
  }
}

export default withStyles(mainPageStyle)(MainPage);
