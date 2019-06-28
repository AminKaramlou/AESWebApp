// @flow
import React from "react";
import styled from "@emotion/styled";
import type { Job } from "../types";
import type { DraggableProvided } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import TrendingDown from "@material-ui/icons/TrendingDown";

import ErrorOutline from "@material-ui/icons/ErrorOutline";

import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";

import { green } from "@material-ui/core/colors";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { stateAvatars, jobAvatars } from "../avatars";
import Tooltip from "@material-ui/core/Tooltip";
import { colors } from "@atlaskit/theme";
import {
  bigIconSize,
  cardHeightMultiplier,
  cardWidth,
  fontSizeAverage,
  fontSizeMassive,
  fontSizeSmall,
  smallIconSize
} from "../constants";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(theme => ({
  card: props => ({
    width: cardWidth,
    height: props.length * cardHeightMultiplier,
    borderColor: props.isDragging ? props.colors.hard : "white",
    boxShadow: "inset 0px 0px 0px 2px #78a5a3"
  }),
  avatar: props => ({
    backgroundColor: !props.showExplanations
      ? "transparent"
      : props.actions.length === 0
      ? green[500]
      : red[500],
    width: bigIconSize,
    height: bigIconSize
  }),
  header: {
    paddingBottom: 0
  },
  content: {
    height: "100%",
    overflow: "scroll",
    padding: 0
  },
  icon: {
    width: bigIconSize,
    height: bigIconSize
  },
  cardTitle: {
    fontSize: fontSizeSmall
  }
}));

const ActionItemStyles = makeStyles(theme => ({
  listItem: {
    padding: 0,
    height: 150,
    fontSize: fontSizeSmall
  },
  icon: {
    width: bigIconSize,
    height: bigIconSize
  },
  text: {
    fontSize: fontSizeSmall,
    marginLeft: 30
  }
}));

const LargeTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: fontSizeAverage,
    minWidth: 800
  }
}))(Tooltip);

function ActionListItem(props) {
  const machine =
    props.machine === "unassigned" ? props.machine : props.machine.id;
  const classes = ActionItemStyles(props);
  if (props.action.type === "swap") {
    return (
      <LargeTooltip title={props.action.reason}>
        <ListItem
          className={classes.listItem}
          onClick={() =>
            props.performSwapAction(
              machine,
              props.action.targetMachine.id,
              props.id,
              props.action.targetJobId
            )
          }
        >
          <IconButton aria-label="Delete">
            <SwapHorizIcon className={classes.icon} />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              className={classes.icon}
              src={
                stateAvatars[props.action.targetMachine.state][
                  props.action.targetMachine.id - 1
                ]
              }
            />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            className={classes.text}
            primary={props.action.targetJobName}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <AlarmIcon className={classes.icon} />
              <TrendingDown className={classes.icon} />
              <Box fontSize={fontSizeSmall}>
                {props.action.timeImprovement} mins
              </Box>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </LargeTooltip>
    );
  }

  if (props.action.type === "move") {
    return (
      <LargeTooltip title={props.action.reason}>
        <ListItem
          className={classes.listItem}
          onClick={() =>
            props.performMoveAction(
              machine,
              props.action.targetMachine.id,
              props.id
            )
          }
        >
          <IconButton aria-label="Delete">
            <ArrowRightAlt className={classes.icon} />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              className={classes.icon}
              src={
                stateAvatars[props.action.targetMachine.state][
                  props.action.targetMachine.id - 1
                ]
              }
            />
          </ListItemAvatar>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              {props.action.timeImprovement === "" ? (
                <ErrorOutline className={classes.icon} />
              ) : (
                <React.Fragment>
                  <AlarmIcon className={classes.icon} />
                  <TrendingDown className={classes.icon} />
                  <Box fontSize={fontSizeSmall}>
                    {props.action.timeImprovement} mins
                  </Box>
                </React.Fragment>
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </LargeTooltip>
    );
  }
  if (props.action.type === "allocate") {
    return (
      <LargeTooltip title={props.action.reason}>
        <ListItem
          className={classes.listItem}
          onClick={() =>
            props.performAllocateAction(props.action.targetMachine.id, props.id)
          }
        >
          <IconButton aria-label="Delete">
            <ArrowRightAlt className={classes.icon} />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              className={classes.icon}
              src={
                stateAvatars[props.action.targetMachine.state][
                  props.action.targetMachine.id - 1
                ]
              }
            />
          </ListItemAvatar>
        </ListItem>
      </LargeTooltip>
    );
  }
}

function JobCard(props) {
  const classes = useStyles(props);
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              alt="Job type"
              src={props.icon}
              className={classes.avatar}
            />
          }
          action={
            <IconButton>
              <DeleteIcon
                className={classes.icon}
                onClick={() => props.removeJob(props.id, props.machine)}
              />
              <AlarmIcon className={classes.icon} />
              <Box fontSize={fontSizeSmall}>{props.length} mins</Box>
            </IconButton>
          }
          title={<Box fontSize={fontSizeAverage}> {props.name} </Box>}
        />
        <CardContent className={classes.content}>
          <List
            dense={"dense"}
            subheader={
              <ListSubheader
                component="div"
                id="list-subheader"
                disableSticky={true}
              >
                <Box fontSize={fontSizeSmall}>Suggested Actions</Box>
              </ListSubheader>
            }
            className={classes.root}
          >
            {props.showExplanations &&
              <div>
                {props.actions.map((key: string, index: number) => (
                  <ActionListItem
                    action={key}
                    performSwapAction={props.performSwapAction}
                    performMoveAction={props.performMoveAction}
                    performAllocateAction={props.performAllocateAction}
                    id={props.id}
                    machine={props.machine}
                  />
                ))}
              </div>
            }
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

type Props = {
  job: Job,
  isDragging: boolean,
  provided: DraggableProvided,
  isGroupedOver?: boolean
};

const Container = styled.div`
  background-color: transparent;
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
      colors={{
        soft: colors.Y50,
        hard: colors.Y200
      }}
      length={job.length}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <JobCard
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={{
          soft: colors.Y50,
          hard: colors.Y200
        }}
        length={job.length}
        actions={job.actions}
        id={job.id}
        machine={job.machine}
        name={job.name}
        icon={jobAvatars[job.type]}
        performSwapAction={props.performSwapAction}
        performMoveAction={props.performMoveAction}
        performAllocateAction={props.performAllocateAction}
        removeJob={props.removeJob}
        showExplanations={props.showExplanations}
      />
    </Container>
  );
}

export default React.memo<Props>(JobItem);
