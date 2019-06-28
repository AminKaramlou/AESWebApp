import styled from "styled-components";
import TimePicker from "./TimePicker";

const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    font-size: 50px;
  }

  & .rc-time-picker-panel-inner {
    font-size: 50px;
    width:400px;
  }

  & .rc-time-picker-panel-select {
    font-size: 50px;
    width:50%;
    max-height: 300px;
    height:300px;
  }
  
  & .rc-time-picker-input {
    font-size: 50px;
    height:100px;
  }
  & .rc-time-picker-panel-input {
    font-size: 50px;
    cursor: pointer;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  
  .rc-time-picker-panel-select li {
  margin-top:50px;
  }
`;

export default StyledTimePicker;
