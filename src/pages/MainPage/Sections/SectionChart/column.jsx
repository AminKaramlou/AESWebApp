// @flow
import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import { grid, borderRadius } from './constants';
import { Draggable } from 'react-beautiful-dnd';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import JobList from './primatives/job-list';
import Title from './primatives/title';
import type { Job } from './types';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import clsx from 'clsx';
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from '@material-ui/core/styles';


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
    flexBasis: 200,
  },
}));


const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
  isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

type Props = {|
  title: string,
  jobs: Job[],
  index: number,
  isScrollable?: boolean,
  isCombineEnabled?: boolean,
|};

export default class Column extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      newJobLength: "",
    };
  }

  handleJobLengthChange = event => {
    this.setState({newJobLength: event.target.value})
  };

  render() {
    const classes = useStyles();
    const title: string = this.props.title;
    const jobs: Job[] = this.props.jobs;
    const index: number = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {title}
              </Title>
            </Header>
            <JobList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? colors.G50 : null
              }}
              jobs={jobs}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
            <FormControl
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
            >
              <Input
                id="adornment-add-job"
                value={this.state.newJobLength}
                onChange={e => this.handleJobLengthChange(e)}
                endAdornment={
                  <InputAdornment position="end">Kg</InputAdornment>
                }
                aria-describedby="add-job-helper-text"
                inputProps={{
                  "aria-label": "Add job"
                }}
              />
              />
              <FormHelperText id="add-job-helper-text">Add job</FormHelperText>
            </FormControl>
          </Container>
        )}
      </Draggable>
    );
  }
}