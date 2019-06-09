import React from "react";

// nodejs library that concatenates classes
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";

import type {
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd/types";

import Board from "./Sections/SectionChart/SectionChart.jsx";
import {
  jobs,
  machines,
  machineJobMap
} from "./Sections/SectionChart/data.jsx";
import openSocket from "socket.io-client";
import classNames from "classnames";
import SectionControls from "./Sections/SectionControls";
import type { Job, JobMap, Machine } from "./Sections/SectionChart/types";
import { colors } from "@atlaskit/theme";
import reorder, { reorderJobMap } from "./Sections/SectionChart/reorder";

const socket = openSocket("http://localhost:5000");
socket.on("message", message => {
  console.log(message);
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: jobs,
      machines: machines,
      machineJobMap: machineJobMap,
      ordered: Object.keys(machineJobMap),
      explanation: "Generating explanation..."
    };
    socket.on("explanation", explanation => {
      this.setState({ explanation: explanation });
      console.log(explanation);
      let newJobs = this.state.jobs;
      explanation.forEach((item, index) => {
        item['actions'].forEach((action, i) => {
          if (action['type']==='swap') {
            const job1Index = this.state.jobs.findIndex(x => x.id ===action['job1']);
            const job2Index = this.state.jobs.findIndex(x => x.id ===action['job2']);
            newJobs[job1Index].actions.push(item['reason']);
            newJobs[job2Index].actions.push(item['reason']);
          }
          if (action['type']==='move') {
            const jobIndex = this.state.jobs.findIndex(x => x.id ===action['job']);
            newJobs[jobIndex].actions.push(item['reason']);
          }
        })
      });
      this.setState({jobs: newJobs});
      console.log(newJobs);
      this.forceUpdate();
    });
  }

  componentDidMount(): void {
    this.updateExplanation();
  }

  updateExplanation() {
    console.log("updating explanation");
    socket.emit("get-explanation", {
      machines: this.state.machines,
      jobs: this.state.jobs,
      machineJobMap: this.state.machineJobMap
    });
  }

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
    const data = reorderJobMap({
      jobMap: this.state.machineJobMap,
      source,
      destination
    });

    this.setState(
      {
        machineJobMap: data.jobMap
      },
      this.updateExplanation
    );
  };
  addNewJob = (length, assignee) => {
    const machine = this.state.machines.find(element => {
      return element.name === assignee;
    });
    const newJob: Job = {
      length: length,
      id: String.fromCharCode(65 + this.state.jobs.length),
      content: "Sometimes life is scary and dark",
      machine: machine,
      colors: {
        soft: colors.Y50,
        hard: colors.Y200
      }
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
      this.updateExplanation
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
      this.updateExplanation
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.content)}>
        <SectionControls
          onAddJobButtonClick={this.addNewJob}
          machines={this.state.machines}
        />
        <Board
          machineJobMap={this.state.machineJobMap}
          ordered={this.state.ordered}
          onDragEnd={this.onDragEnd}
          onAddResourceButtonClick={e => this.addNewResource()}
        />
      </div>
    );
  }
}

export default withStyles(mainPageStyle)(MainPage);
