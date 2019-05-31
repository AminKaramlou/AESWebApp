// @flow
import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Machine from './machine-item';
import { grid } from '../constants';
import type { Job } from '../types';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.B50 : colors.B75};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: ${grid}px 0;
`;

const DropZone = styled.div`
  display: flex;

  /*
    Needed to avoid growth in list due to lifting the first item
    Caused by display: inline-flex strangeness
  */
  align-items: start;

  /* stop the list collapsing when empty */
  min-width: 600px;

  /* stop the list collapsing when it has no items */
  min-height: 60px;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const Container = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    flex parent
    needed to allow width to grow greater than body
  */
  display: inline-flex;
`;

type Props = {|
  jobs: Job[],
  listId: string,
  listType?: string,
  internalScroll?: boolean,
  isCombineEnabled?: boolean,
|};

export default class MachineList extends Component<Props> {
  static defaultProps = {
    isCombineEnabled: false,
  };
  renderBoard = (dropProvided: DroppableProvided) => {
    const { jobs } = this.props;

    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {jobs.map((job: Job, index: number) => (
            <Draggable key={job.id} draggableId={job.id} index={index}>
              {(
                dragProvided: DraggableProvided,
                dragSnapshot: DraggableStateSnapshot,
              ) => (
                <Machine
                  machine={job.machine}
                  provided={dragProvided}
                  snapshot={dragSnapshot}
                />
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  };

  render() {
    const { listId, listType, internalScroll, isCombineEnabled } = this.props;

    return (
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={isCombineEnabled}
      >
        {(
          dropProvided: DroppableProvided,
          dropSnapshot: DroppableStateSnapshot,
        ) => (
          <Wrapper
            isDraggingOver={dropSnapshot.isDraggingOver}
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <ScrollContainer>
                {this.renderBoard(dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderBoard(dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
