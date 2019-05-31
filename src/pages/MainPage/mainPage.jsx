import React from "react";
// nodejs library that concatenates classes
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import Board from "./Sections/SectionChart/SectionChart.jsx";
import { machineJobMap } from "./Sections/SectionChart/data.jsx";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000");
socket.on("message", message => {
  console.log(message);
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newArgumentText: "Unnamed argument",
      isTourOpen: false,
      semantics: "preferred",
      supportInterpretation: "deductive",
      status: "Ready to solve debate"
    };
  }

  handleSemanticsChange = event => {
    this.setState({ semantics: event.target.value });
  };

  handleSupportInterpretationChange = event => {
    this.setState({ supportInterpretation: event.target.value });
  };

  handleFileUpload = event => {
    console.log(event.target.files);
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  create_debate_string = () => {
    const json = this.model.serializeDiagram();
    let strings = [];
    for (const node of json["nodes"]) {
      strings.push(`arg(${node.argument}).`);
    }
    for (const link of json["links"]) {
      let source_argument = "source argument not found";
      let target_argument = "target argument not found";
      for (const node of json["nodes"]) {
        if (node["id"] === link["source"]) {
          source_argument = node.argument;
        }
        if (node["id"] === link["target"]) {
          target_argument = node.argument;
        }
      }
      if (link["type"] === "attack") {
        strings.push(`att(${source_argument}, ${target_argument}).`);
      }
      if (link["type"] === "support") {
        strings.push(`sup(${source_argument}, ${target_argument}).`);
      }
    }
    return strings.join("\n");
  };

  saveDiagram = () => {
    const element = document.createElement("a");
    const file = new Blob([this.create_debate_string()], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "debate.pl";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
        <Board initial={machineJobMap} />
    );
  }
}

export default withStyles(mainPageStyle)(MainPage);
