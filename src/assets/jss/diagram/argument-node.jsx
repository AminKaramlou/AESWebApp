import { dangerColor, infoColor, successColor,  } from "../material-kit-react"
import grey from "@material-ui/core/es/colors/grey"
import tooltip from "assets/jss/material-kit-react/tooltipsStyle.jsx";

const nodeWidth = 300
const nodeHeight = 120

const argumentNodeStyle = theme => ({
  argumentNode: {
    position: "relative",
    width: nodeWidth,
    height: nodeHeight,
    opacity: 0.9,
  },
  attackPort: {
    background: dangerColor,
    position: "absolute",
    zIndex: 10,
    left: nodeWidth / 2 - 50,
    top: -8,
    opacity: 0.7
  },
  supportPort: {
    background: successColor,
    position: "absolute",
    zIndex: 10,
    left: nodeWidth / 2 + 35,
    top: -8,
    opacity: 0.7
  },
  defaultPort: {
    background: grey[500],
    position: "absolute",
    zIndex: 10,
    left: nodeWidth / 2 - 8,
    top: nodeHeight -8,
    opacity: 0.7
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: nodeWidth - 50,
  },
  ...tooltip
});

export default argumentNodeStyle