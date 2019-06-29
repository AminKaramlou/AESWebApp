// @flow
import React, { Component } from "react";
import styled from "@emotion/styled";
import {borderRadius, cardColor, cardWidth, grid} from "./constants";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import JobList from "./primatives/job-list";
import type { Job } from "./types";
import "rc-time-picker/assets/index.css";
import Title from "./primatives/title";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  width: ${cardWidth + 20}px;
  max-width: ${cardWidth + 20}px;
  min-width: ${cardWidth + 20}px;
`;

type Props = {|
  title: string,
  jobs: Job[],
  index: number,
  isScrollable?: boolean,
  isCombineEnabled?: boolean
|};

const Header = styled.div`
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: #78a5a3;
  padding-top:150px;
`;

export default class UnassignedColumn extends Component<Props> {
  render() {
    const jobs: Job[] = this.props.jobs;
    const index: number = this.props.index;

    return (
      <Draggable draggableId={this.props.title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                title={this.props.title}
                image={this.props.avatar}
                machineState={this.props.machineState}
                jobs={this.props.jobs}
                isFemale={true}
              />
              <JobList
                listId="unassigned"
                listType="QUOTE"
                style={{
                  backgroundColor: cardColor
                }}
                title={this.props.listName}
                jobs={jobs}
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                performSwapAction={this.props.performSwapAction}
                performMoveAction={this.props.performMoveAction}
                performAllocateAction={this.props.performAllocateAction}
                addNewJob={this.props.addNewJob}
                removeJob={this.props.removeJob}
                showExplanations={this.props.showExplanations}
              />
            </Header>
          </Container>
        )}
      </Draggable>
    );
  }
}
