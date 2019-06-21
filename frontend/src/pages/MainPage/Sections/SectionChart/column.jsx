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
import Title from "./primatives/title";
import type { Job } from "./types";
import Autocomplete from "./Autocomplete";
import Grid from "@material-ui/core/Grid";
import Board from "./SectionChart";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  width: 820px;
  max-width: 820px;
  min-width: 820px;
`;

const Header = styled.div`
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: #78a5a3;
`;

type Props = {|
  title: string,
  jobs: Job[],
  index: number,
  isScrollable?: boolean,
  isCombineEnabled?: boolean
|};

export default class Column extends Component<Props> {
  render() {
    const title: string = this.props.title;
    const jobs: Job[] = this.props.jobs;
    const index: number = this.props.index;
    const pfd = this.props.pfd;
    const nfd = this.props.nfd;
    const machineId = this.props.machineId;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Header isDragging={snapshot.isDragging}>
              <Grid container>
                <Grid item xs={12} s={12}>
                  <Autocomplete
                    pfd = {pfd}
                    nfd = {nfd}
                    machineId = {machineId}
                    setPfd={this.props.setPfd}
                    setNfd={this.props.setNfd}
                    suggestions={this.props.allJobs.map(job => ({
                      value: job.id,
                      label: job.name
                    }))}
                  />
                </Grid>
                <Grid item xs={12} s={12}>
                  <Title
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    title={this.props.title}
                    image={this.props.avatar}
                    machineState={this.props.machineState}
                    jobs={this.props.jobs}
                    isFemale={this.props.title === "Fatima" ? true : false}
                  />
                </Grid>
              </Grid>
            </Header>
            <JobList
              listId={title}
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
              addNewJob={this.props.addNewJob}
              removeJob={this.props.removeJob}
              title={title}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
