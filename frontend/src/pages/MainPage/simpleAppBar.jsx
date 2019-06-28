import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  backgroundColor,
  cardColor,
  fontSizeMassive
} from "./Sections/SectionChart/constants";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: 400,
    verticalAlign: "center"
  },
  appBar: {
    height: "100%",
    verticalAlign: "center",
    textAlign: "center",
    backgroundColor: `#2b616d`
  }
});

export default function SimpleAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="black">
            {props.showExplanations ? (
              <Box fontSize={fontSizeMassive}> {props.text}</Box>
            ) : (
              <Box fontSize={fontSizeMassive}> Explanations are turned off</Box>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
