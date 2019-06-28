import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import StyledTimePicker from "./index";


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


const DeliTimePicker = ({ className, onChange, value, ...rest }) => (
  <TimePicker
    {...rest}
    className={className}
    popupClassName={className}
    defaultValue={moment({ hour: 0, minute: 10 })}
    showSecond={false}
    disabledMinutes={disabledMinutes}
    disabledHours={disabledHours}
    minuteStep={5}
    hideDisabledOptions={true}
  />
);

DeliTimePicker.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(moment)
};

export default DeliTimePicker;
