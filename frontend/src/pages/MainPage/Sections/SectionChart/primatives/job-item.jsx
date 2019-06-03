// @flow
import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { borderRadius, grid } from '../constants';
import type { Job, MachineColors } from '../types';
import type { DraggableProvided } from 'react-beautiful-dnd';

type Props = {
  job: Job,
  isDragging: boolean,
  provided: DraggableProvided,
  isGroupedOver?: boolean,
};

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  machineColors: MachineColors,
) => {
  if (isDragging) {
    return machineColors.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.G300;
};

const getBorderColor = (isDragging: boolean, machineColors: MachineColors) =>
  isDragging ? machineColors.hard : 'white';

const getHeight = (length: number) =>
  length ? `${length * 3}px` : `10px`;

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 1px solid red;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  padding: ${grid}px;
  user-select: none;
  height: ${props => getHeight(props.length)};

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;
const JobLength = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function JobItem(props: Props) {
  const { job, isDragging, isGroupedOver, provided } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      colors={job.machine.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      length={job.length}
      resizable={{
        edges: { left: false, right: false, bottom: true, top: true },
      }}
    >
      <Content>
        <Footer>
          <JobLength>{job.length} mins</JobLength>
        </Footer>
      </Content>
    </Container>
  );
}

export default React.memo<Props>(JobItem);
