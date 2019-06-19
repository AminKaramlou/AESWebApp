// @flow
import React, { Component } from "react";
import styled from "@emotion/styled";
import { grid } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import JobList from "./primatives/job-list";
import type { Job } from "./types";
import "rc-time-picker/assets/index.css";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  width: 820px;
  max-width: 820px;
  min-width:820px;
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
                backgroundColor: "#78a5a3"
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
