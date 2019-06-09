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
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import injectionImg from "assets/img/injection.png";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  card: props => ({
    width: 250,
    height: props.length * 5,
    borderColor: props.isDragging ? props.colors.hard : "white",
  }),
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: props => ({
    backgroundColor: props.isDragging ? red[500] : green[500],
  })
}));

function JobCard(props) {
  const classes = useStyles(props);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Injection"
        />
        <CardMedia
          className={classes.media}
          image={injectionImg}
          title="Injection"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.length} mins
          </Typography>
          <List
            subheader={
              <ListSubheader component="div" id="list-subheader">
                Actions
              </ListSubheader>
            }
            className={classes.root}
          >
            {props.actions.map((key: string, index: number) => (
              <ListItem button>
                <ListItemText primary={key}/>
              </ListItem>
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
      />
    </Container>
  );
}

export default React.memo<Props>(JobItem);
