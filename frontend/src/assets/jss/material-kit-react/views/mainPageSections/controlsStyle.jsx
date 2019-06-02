import tooltip from "assets/jss/material-kit-react/tooltipsStyle.jsx"
import { roseColor } from "../../../material-kit-react"

const controlsStyle = theme => ({
  fabDiv: {
    padding: theme.spacing.unit,
    borderBottom: ` solid ${roseColor}`,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  ...tooltip,
  formControl: {
    verticalAlign: "middle",
    color: "inherit",
  },
  label: {
    color: "white",
  },
  avatar: {
    backgroundColor: "inherit",
  },
  root: {
    color: "white",
    "&$checked": {
      color: "white",
    },
  },
  checked: {},
  input: {
    display: 'none',
  },
})

export default controlsStyle
