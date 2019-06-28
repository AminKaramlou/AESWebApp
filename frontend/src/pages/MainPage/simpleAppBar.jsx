import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  fontSizeMassive
} from "./Sections/SectionChart/constants";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    alignItems: "center",
    verticalAlign: "middle"
  },
  appBar: {
    height: "12vh",
    backgroundColor: `#2b616d`,
    alignItems: "center",
    verticalAlign: "middle"
  }
});

export default function SimpleAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="black" align="center">
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
