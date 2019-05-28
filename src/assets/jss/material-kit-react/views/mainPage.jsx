import { container } from "assets/jss/material-kit-react.jsx"
import grey from "@material-ui/core/es/colors/grey"
import blueGrey from "@material-ui/core/es/colors/blueGrey"

const mainPageStyle = theme => ({
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left",
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
  },
  main: {

  },
  link: {
    textDecoration: "none",
  },
  textCenter: {
    textAlign: "center",
  },
  diagramWidget: {
    height: "84vh",
    flexGrow: 1,
  },
  content: {
    background: blueGrey[900],
    position: "relative",
    zIndex: "3",
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
})

export default mainPageStyle
