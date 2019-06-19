import React, { Component } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import type { DroppableProvided } from "react-beautiful-dnd/types";
import type { JobMap } from "./types";
import Column from "./column";
import UnassignedColumn from "./unassignedColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import stateAvatars from "./avatars.jsx";
import Grid from "@material-ui/core/Grid";
import TimePicker from "rc-time-picker/es/TimePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: #dac3b3;
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {|
  machineJobMap: JobMap,
  withScrollableColumns?: boolean,
  isCombineEnabled?: boolean,
  containerHeight?: string
|};

type State = {|
  columns: JobMap,
  ordered: string[]
|};

export default class Board extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  static defaultProps = {
    isCombineEnabled: false
  };

  state: State = {
    columns: this.props.machineJobMap,
    ordered: Object.keys(this.props.machineJobMap)
  };

  boardRef: ?HTMLElement;
  z;

  constructor(props) {
    super(props)
    this.state= {
      newMachineName: ""
    }
  }

  handleChange(event) {
    this.setState({newMachineName: event.target.value})
  }

  render() {
    const columns: JobMap = this.props.machineJobMap;
    const ordered: string[] = this.props.ordered;
    const { containerHeight } = this.props;
    const unassignedJobs = this.props.unassignedJobs;

    const gridContainerClasses=

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={this.props.isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            <UnassignedColumn
              key="unassigned"
              index={0}
              title="unassigned"
              jobs={unassignedJobs}
              allJobs={this.props.jobs}
              isScrollable={this.props.withScrollableColumns}
              isCombineEnabled={this.props.isCombineEnabled}
              avatar={stateAvatars[this.props.machines[0].state][0]}
              performSwapAction={this.props.performSwapAction}
              performMoveAction={this.props.performMoveAction}
              performAllocateAction={this.props.performAllocateAction}
            />
            {ordered.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                title={key}
                jobs={columns[key]}
                allJobs={this.props.jobs}
                isScrollable={this.props.withScrollableColumns}
                isCombineEnabled={this.props.isCombineEnabled}
                avatar={stateAvatars[this.props.machines[index].state][index]}
                machineState={this.props.machines[index].state}
                performSwapAction={this.props.performSwapAction}
                performMoveAction={this.props.performMoveAction}
                performAllocateAction={this.props.performAllocateAction}
                addNewJob={this.props.addNewJob}
              />
            ))}

            {provided.placeholder}
            <Grid container>
              <Grid item xs={9}>
                <TextField
                  id="standard-machine"
                  label="nurse"
                  placeholder="New nurse name"
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                  onChange={(event) => this.handleChange(event)}
                  value={this.state.newMachineName}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  color="primary"
                  onClick={() => this.props.addNewResource(this.state.newMachineName)}
                >
                  Add nurse
                </Button>
              </Grid>
            </Grid>

          </Container>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
        <Global
          styles={css`
            body {
              background: #dac3b3;
            }
          `}
        />
      </React.Fragment>
    );
  }
}
