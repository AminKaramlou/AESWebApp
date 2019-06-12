import React, { Component } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { colors } from "@atlaskit/theme";
import type {
  DropResult,
  DraggableLocation,
  DroppableProvided
} from "react-beautiful-dnd/types";
import type { JobMap, Job } from "./types";
import Column from "./column";
import reorder, { reorderJobMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import stateAvatars from "./Sections/SectionChart/avatars"




const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: #f4cc70;
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {|
  machineJobMap: JobMap,
  withScrollableColumns?: boolean,
  isCombineEnabled?: boolean,
  containerHeight?: string
|};

type State = {|
  columns: JobMap,
  ordered: string[]
|};

export default class Board extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  static defaultProps = {
    isCombineEnabled: false
  };

  state: State = {
    columns: this.props.machineJobMap,
    ordered: Object.keys(this.props.machineJobMap)
  };

  boardRef: ?HTMLElement;
  z;

  render() {
    console.log("Rendering board");
    const columns: JobMap = this.props.machineJobMap;
    const ordered: string[] = this.props.ordered;
    const { containerHeight } = this.props;

    const board = (
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
        isCombineEnabled={this.props.isCombineEnabled}
      >
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                title={key}
                jobs={columns[key]}
                allJobs={this.props.jobs}
                isScrollable={this.props.withScrollableColumns}
                isCombineEnabled={this.props.isCombineEnabled}
                avatar={stateAvatars[this.props.machines[index].state][index]}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          {containerHeight ? (
            <ParentContainer height={containerHeight}>{board}</ParentContainer>
          ) : (
            board
          )}
        </DragDropContext>
        <Global
          styles={css`
            body {
              background: #f4cc70;
            }
          `}
        />
      </React.Fragment>
    );
  }
}
