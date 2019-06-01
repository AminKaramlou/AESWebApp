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
  DroppableProvided
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
      status: "Schedule is optimal"
    };
  }

  onDragEnd = (result: DropResult) => {
    console.log("Here");
    console.log(result)
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
      this.setState({ machineJobMap:machineJobMap });
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

    this.setState({
      machineJobMap: data.jobMap
    });
  };

  getByMachine = (machine: Machine, items: Job[]): Job[] =>
    items.filter((job: Job) => job.machine === machine);

  getMachineJobMap = () => {
    return this.state.machines.reduce(
      (previous: JobMap, machine: Machine) => ({
        ...previous,
        [machine.name]: this.getByMachine(machine, this.state.jobs)
      }),
      {}
    );
  };

  addNewResource = () => {
    const newMachine: Machine = {
      id: `${this.state.ordered.length + 1}`,
      name: `Nurse ${this.state.ordered.length + 1}`,
      colors: {
        soft: colors.Y50,
        hard: colors.Y200
      }
    };
    const machineJobMap = {
      ...this.state.machineJobMap,
      [newMachine.name]: []
    };
    this.setState({ machineJobMap: machineJobMap, ordered: Object.keys(machineJobMap)});
    console.log(this.state.machineJobMap);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.content)}>
        <SectionControls
          status={this.state.status}
          semantics={this.state.semantics}
          supportInterpretation={this.state.supportInterpretation}
          onFormChangeHandler={e => {
            this.setState({ newArgumentText: e.target.value });
          }}
          onAddResourceButtonClick={e => this.addNewResource()}
        />
        <Board
          machineJobMap={this.state.machineJobMap}
          ordered={this.state.ordered}
          onDragEnd={this.onDragEnd}
        />
        ;
      </div>
    );
  }
}

export default withStyles(mainPageStyle)(MainPage);
