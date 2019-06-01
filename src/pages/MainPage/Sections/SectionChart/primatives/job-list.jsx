// @flow
import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import JobItem from './job-item';
import { grid } from '../constants';
import Title from './title';
import type { Job } from '../types';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import {makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";

const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  if (isDraggingOver) {
    return colors.R50;
  }
  if (isDraggingFrom) {
    return colors.T50;
  }
  return colors.N30;
};

const Wrapper = styled.div`
  background-color: ${props =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 80px;
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
  ignoreContainerClipping?: boolean,
|};

type JobListProps = {|
  jobs: Job[],
|};

const InnerJobList = React.memo(function InnerJobList(
  props: JobListProps,
) {
  return props.jobs.map((job: Job, index: number) => (
    <Draggable key={job.id} draggableId={job.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <JobItem
          key={job.id}
          job={job}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

type InnerListProps = {|
  dropProvided: DroppableProvided,
  jobs: Job[],
  title: ?string,
|};

function InnerList(props: InnerListProps) {
  const { jobs, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerJobList jobs={jobs} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 50,
  },
}));

function NewJobInput() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    jobLength: '',
  });

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value});
  };

  return (
    <FormControl
      className={clsx(
        classes.margin,
        classes.withoutLabel,
        classes.textField
      )}
      onMouseDown={e => e.stopPropagation()}
    >
      <Input
        id="adornment-add-job"
        value={values.newJobLength}
        onChange={handleChange('jobLength')}
        onMouseDown={e => e.stopPropagation()}
        endAdornment={
          <InputAdornment position="end">Mins</InputAdornment>
        }
        aria-describedby="add-job-helper-text"
        inputProps={{
          "aria-label": "Add job"
        }}
      />
      <FormHelperText id="add-job-helper-text">Add job</FormHelperText>
    </FormControl>
  )
}

export default function JobList(props: Props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    jobs,
    title,
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
        dropSnapshot: DroppableStateSnapshot,
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
              />
            </ScrollContainer>
          ) : (
            <InnerList
              jobs={jobs}
              title={title}
              dropProvided={dropProvided}
            />
          )}
          <NewJobInput/>
        </Wrapper>
      )}
    </Droppable>
  );
}
