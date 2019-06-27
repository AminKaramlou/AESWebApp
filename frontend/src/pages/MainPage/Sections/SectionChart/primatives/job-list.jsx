// @flow
import React from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { Droppable, Draggable } from "react-beautiful-dnd";
import JobItem from "./job-item";
import { fontSizeAverage, grid } from "../constants";
import type { Job } from "../types";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import TimePicker from "rc-time-picker/es/TimePicker";
import Button from "@material-ui/core/Button";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";

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
const disabledHours = () => {
  return [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];
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
          removeJob={props.removeJob}
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
  return (
    <Container>
      <DropZone ref={dropProvided.innerRef}>
        <InnerJobList
          jobs={jobs}
          performSwapAction={props.performSwapAction}
          performMoveAction={props.performMoveAction}
          performAllocateAction={props.performAllocateAction}
          removeJob={props.removeJob}
        />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {}
}));

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
  const [values, setValues] = React.useState({
    newJobName: "",
    newJobLength: moment({ hour: 0, minute: 10 }),
    newJobType: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleLengthChange = name => event => {
    setValues({ ...values, [name]: event });
  };

  const classes = useStyles();
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
                removeJob={props.removeJob}
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
              removeJob={props.removeJob}
            />
          )}
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl} fullWidth={true}>
              <TimePicker
                defaultValue={moment({ hour: 0, minute: 10 })}
                showSecond={false}
                disabledMinutes={disabledMinutes}
                disabledHours={disabledHours}
                minuteStep={5}
                onChange={handleLengthChange("newJobLength")}
                value={values.newJobLength}
                hideDisabledOptions={true}
              />
              <TextField
                id="standard-name"
                label="New job name"
                placeholder="New job name"
                value={values.newJobName}
                onChange={handleChange("newJobName")}
                margin="normal"
                inputProps={{ maxLength: 50 }}
              />
              <Select
                value={values.newJobType}
                placeholder="New job type"
                onChange={handleChange("newJobType")}
                inputProps={{
                  name: "Job type",
                  id: "job-type"
                }}
              >
                <MenuItem value={"injection"}>Injection</MenuItem>
                <MenuItem value={"medicine"}>Administer medication</MenuItem>
                <MenuItem value={"test"}>Perform test</MenuItem>
                <FormHelperText> New job type </FormHelperText>
              </Select>
              <Button
                size="large"
                color="primary"
                onClick={() =>
                  props.addNewJob(
                    values.newJobLength.hour() * 60 +
                      values.newJobLength.minute(),
                    title,
                    values.newJobName,
                    values.newJobType
                  )
                }
              >
                <Box fontSize={fontSizeAverage}>Add new job</Box>
              </Button>
            </FormControl>
          </form>
        </Wrapper>
      )}
    </Droppable>
  );
}
