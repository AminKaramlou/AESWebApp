// @flow
import React, { Component } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import JobList from "./primatives/job-list";
import Title from "./primatives/title";
import type { Job } from "./types";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
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
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                title={this.props.title}
              >
              </Title>
            </Header>
            <JobList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? colors.G50 : null
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
