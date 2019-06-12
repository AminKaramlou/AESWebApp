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
import makeStyles from "@material-ui/core/styles/makeStyles";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  width: 270px;
  max-width: 270px;
  z-index: 1000;
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


export default class Column extends Component<Props> {

  render() {
    const title: string = this.props.title;
    const jobs: Job[] = this.props.jobs;
    const index: number = this.props.index;
    const gridStyle = {
      flexGrow: 1
    }
    const gridItemStyle = {
      height: 0,
      paddingBottom: 100,
      display:"flex",
      flexGrow: 1
    };


    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <div className={gridStyle}>
                <Grid container>
                  <Grid item xs={12} s={12} style={gridItemStyle}>
                    <Autocomplete
                      suggestions={this.props.allJobs.map(job => ({
                        value: job.id,
                        label: job.id
                      }))}
                    />
                  </Grid>
                  <Grid item xs={12} s={12} />
                  <Title
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    title={this.props.title}
                    image={this.props.avatar}
                  />
                </Grid>
              </div>
            </Header>
            <JobList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: "#20948b"
              }}
              jobs={jobs}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}