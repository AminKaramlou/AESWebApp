// @flow
import React from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { Droppable, Draggable } from "react-beautiful-dnd";
import JobItem from "./job-item";
import { grid } from "../constants";
import Title from "./title";
import type { Job } from "../types";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import TimePicker from "rc-time-picker/es/TimePicker";
import Button from "@material-ui/core/Button"
import moment from "moment";


const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean
): string => {
  if (isDraggingOver) {
    return colors.R50;
  }
  if (isDraggingFrom) {
    return colors.T50;
  }
  return colors.N30;
};

const disabledMinutes = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};


const Wrapper = styled.div`
  background-color: ${props =>
  getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
`;

const scrollContainerHeight: number = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */

type Props = {|
  listId?: string,
  listType?: string,
  jobs: Job[],
  title?: string,
  internalScroll?: boolean,
  scrollContainerStyle?: Object,
  isDropDisabled?: boolean,
  isCombineEnabled?: boolean,
  style?: Object,
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean
|};

type JobListProps = {|
  jobs: Job[]
|};

const InnerJobList = function InnerJobList(props: JobListProps) {
  return props.jobs.map((job: Job, index: number) => (
    <Draggable key={job.id} draggableId={job.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot
      ) => (
        <JobItem
          key={job.id}
          job={job}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
          performSwapAction={props.performSwapAction}
          performMoveAction={props.performMoveAction}
          performAllocateAction={props.performAllocateAction}
        />
      )}
    </Draggable>
  ));
};

type InnerListProps = {|
  dropProvided: DroppableProvided,
  jobs: Job[],
  title: ?string
|};

function InnerList(props: InnerListProps) {
  const { jobs, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerJobList
          jobs={jobs}
          performSwapAction={props.performSwapAction}
          performMoveAction={props.performMoveAction}
          performAllocateAction={props.performAllocateAction}

        />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function JobList(props: Props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = "LIST",
    listType,
    style,
    jobs,
    title
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                jobs={jobs}
                title={title}
                dropProvided={dropProvided}
                performSwapAction={props.performSwapAction}
                performMoveAction={props.performMoveAction}
                performAllocateAction={props.performAllocateAction}

              />
            </ScrollContainer>
          ) : (
            <InnerList
              jobs={jobs}
              title={title}
              dropProvided={dropProvided}
              performSwapAction={props.performSwapAction}
              performMoveAction={props.performMoveAction}
              performAllocateAction={props.performAllocateAction}

            />
          )}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TimePicker
                defaultValue={moment().minute(10)}
                showHour={false}
                showSecond={false}
                disabledMinutes={disabledMinutes}
                minuteStep={5}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                size="small"
                color="primary"
              >
                Add job
              </Button>
            </Grid>
          </Grid>
        </Wrapper>
      )}
    </Droppable>
  );
}