// @flow
import React from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { borderRadius, grid } from "../constants";
import type { Job, MachineColors } from "../types";
import type { DraggableProvided } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import DeleteIcon from "@material-ui/icons/Delete";

import injectionImg from "assets/img/injection.png";
import { green } from "@material-ui/core/colors";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import stateAvatars from "../avatars";

const useStyles = makeStyles(theme => ({
  card: props => ({
    width: 250,
    height: props.length * 5,
    borderColor: props.isDragging ? props.colors.hard : "white",
    overflow: "scroll"
  }),
  avatar: props => ({
    backgroundColor: props.actions.length === 0 ? green[500] : red[500]
  })
}));

function ActionListItem(props) {
  if (props.action.type === 'swap') {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={stateAvatars[props.action.targetMachine.state][props.action.targetMachine.id - 1]}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`(Job ${props.action.targetJob})`}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <SwapHorizIcon/>
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <SwapHorizIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  if (props.action.type === 'move') {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={stateAvatars[props.action.targetMachine.state][props.action.targetMachine.id - 1]}>
          </Avatar>
        </ListItemAvatar>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <ArrowRightAlt/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

function JobCard(props) {
  const classes = useStyles(props);
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
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
            </IconButton>
          }
          title={props.id}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.length} mins
          </Typography>
          <List dense={"dense"}
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
              <ActionListItem action={key} machine={props.machine}>
              </ActionListItem>
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

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  machineColors: MachineColors
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
  isDragging ? machineColors.hard : "white";

const Container = styled.div`
  border: 1px solid transparent;
  background-color: transparent;
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
      />
    </Container>
  );
}

export default React.memo<Props>(JobItem);
