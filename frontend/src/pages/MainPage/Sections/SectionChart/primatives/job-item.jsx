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

import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";

import injectionImg from "assets/img/injection.png";
import { green } from "@material-ui/core/colors";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import stateAvatars from "../avatars";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  card: props => ({
    width: 800,
    height: props.length * 20,
    borderColor: props.isDragging ? props.colors.hard : "white"
  }),
  avatar: props => ({
    backgroundColor: props.actions.length === 0 ? green[500] : red[500]
  }),
  header: {
    paddingBottom: 0
  },
  content: {
    height: "100%",
    overflow: "scroll",
    padding: 0
  }
}));

const ActionItemStyles = makeStyles(theme => ({
  listItem: {
    padding: 0,
    height: 60
  }
}));

function ActionListItem(props) {
  const classes = ActionItemStyles(props);
  if (props.action.type === "swap") {
    return (
      <Tooltip title={props.action.reason}>
        <ListItem className={classes.listItem} onClick={() => props.performSwapAction(props.machine.id, props.action.targetMachine.id, props.id, props.action.targetJobId)}>
          <IconButton aria-label="Delete">
            <SwapHorizIcon />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              src={
                stateAvatars[props.action.targetMachine.state][
                props.action.targetMachine.id - 1
                  ]
              }
            />
          </ListItemAvatar>
          <ListItemText primary={`(Job ${props.action.targetJobName})`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <TrendingDown /> {props.action.timeImprovement}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Tooltip>
    );
  }

  if (props.action.type === "move") {
    return (
      <Tooltip title={props.action.reason}>
        <ListItem className={classes.listItem} onClick={() => props.performMoveAction(props.machine.id, props.action.targetMachine.id, props.id)}>
          <IconButton aria-label="Delete">
            <ArrowRightAlt />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              src={
                stateAvatars[props.action.targetMachine.state][
                props.action.targetMachine.id - 1
                  ]
              }
            />
          </ListItemAvatar>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <TrendingDown /> {props.action.timeImprovement}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Tooltip>
    );
  }
  if (props.action.type === "allocate") {
    return (
      <Tooltip title={props.action.reason}>
        <ListItem className={classes.listItem} onClick={() => props.performAllocateAction(props.action.targetMachine.id, props.id)}>
          <IconButton aria-label="Delete">
            <ArrowRightAlt />
          </IconButton>
          <ListItemAvatar>
            <Avatar
              src={
                stateAvatars[props.action.targetMachine.state][
                props.action.targetMachine.id - 1
                  ]
              }
            />
          </ListItemAvatar>
        </ListItem>
      </Tooltip>
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
              alt="injection"
              src={injectionImg}
              className={classes.avatar}
            />
          }
          action={
            <IconButton>
              <DeleteIcon />
              <AlarmIcon /> {props.length}
            </IconButton>
          }
          title={props.name}
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
                Suggested Actions
              </ListSubheader>
            }
            className={classes.root}
          >
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
  border: 1px solid transparent;
  background-color: transparent;
  borderColor: props.isDragging ? props.colors.hard : "white"

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
      colors={job.colors}
      length={job.length}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <JobCard
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={job.colors}
        length={job.length}
        actions={job.actions}
        id={job.id}
        machine={job.machine}
        name={job.name}
        performSwapAction={props.performSwapAction}
        performMoveAction={props.performMoveAction}
        performAllocateAction={props.performAllocateAction}
      />
    </Container>
  );
}

export default React.memo<Props>(JobItem);