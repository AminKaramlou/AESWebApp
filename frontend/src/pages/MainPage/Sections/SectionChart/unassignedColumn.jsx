// @flow
import React, { Component } from "react";
import styled from "@emotion/styled";
import { grid, borderRadius } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import JobList from "./primatives/job-list";
import type { Job } from "./types";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  width: 420px;
  max-width: 420px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: #20948b;
  transition: background-color 0.2s ease;
`;

type Props = {|
  title: string,
  jobs: Job[],
  index: number,
  isScrollable?: boolean,
  isCombineEnabled?: boolean
|};


export default class UnassignedColumn extends Component<Props> {
  render() {
    const jobs: Job[] = this.props.jobs;
    const index: number = this.props.index;

    return (
      <Draggable draggableId={this.props.title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <JobList
              listId="unassigned"
              listType="QUOTE"
              style={{
                backgroundColor: "#20948b"
              }}
              jobs={jobs}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              performSwapAction={this.props.performSwapAction}
              performMoveAction={this.props.performMoveAction}
              performAllocateAction={this.props.performAllocateAction}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
