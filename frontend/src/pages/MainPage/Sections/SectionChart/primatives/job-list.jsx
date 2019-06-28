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
import Button from "@material-ui/core/Button";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";
import "rc-time-picker/assets/index.css";
import StyledTimePicker from "../TimePicker/index"


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
          showExplanations={props.showExplanations}
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
          showExplanations={props.showExplanations}
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
  formControl: {},
  input: {
    fontSize: fontSizeAverage
  },
  label: {
    fontSIze: fontSizeAverage
  },
  timePicker: {
    fontSize: fontSizeAverage,
    height: "100"
  },
  timePickerPopup: {
    fontSize: fontSizeAverage,
  },
  select: {
    marginBottom: "50px",
    marginTop: 30
  },
  selectBox: {
    marginBottom: 20
  }
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
                showExplanations={props.showExplanations}
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
              showExplanations={props.showExplanations}
            />
          )}
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl} fullWidth={true}>
              <StyledTimePicker
                onChange={handleLengthChange("newJobLength")}
                value={values.newJobLength}
              />
              <TextField
                id="standard-name"
                label={
                  <Box fontSize={fontSizeAverage} className={classes.label}>
                    New job name
                  </Box>
                }
                value={values.newJobName}
                onChange={handleChange("newJobName")}
                margin="normal"
                inputProps={{
                  maxLength: 30,
                  className: classes.input
                }}
                InputLabelProps={{ classes: classes.label }}
              />
              <Select
                className={classes.select}
                displayEmpty
                value={values.newJobType}
                placeholder="New job type"
                onChange={handleChange("newJobType")}
                inputProps={{
                  name: "Job type",
                  id: "job-type",
                  className: classes.input
                }}
              >
                <MenuItem value="" disabled>
                  <Box className={classes.selectBox} fontSize={fontSizeAverage}>New job type</Box>
                </MenuItem>
                <MenuItem value={"injection"}>
                  <Box className={classes.selectBox} fontSize={fontSizeAverage}>Injection</Box>
                </MenuItem>
                <MenuItem value={"medicine"}>
                  <Box className={classes.selectBox} fontSize={fontSizeAverage}>Administer medication</Box>
                </MenuItem>
                <MenuItem value={"test"}>
                  <Box fontSize={fontSizeAverage}>Perform test</Box>
                </MenuItem>
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
