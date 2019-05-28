import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// @material-ui/icons

// core components
import Header from "components/material-kit-react/Header/Header.jsx"
import Footer from "components/material-kit-react/Footer/Footer.jsx"

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
} from "assets/jss/material-kit-react.jsx"

// sections for this page
import HeaderLinks from "components/material-kit-react/Header/HeaderLinks.jsx"

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx"
import SectionControls from "./Sections/SectionControls.jsx"

import Tour from "reactour"
import steps from "./reactourSteps.jsx"

import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  DiagramWidget,
} from "storm-react-diagrams"

import "storm-react-diagrams/dist/style.min.css"

import {
  AttackLinkModel,
  AttackLinkFactory,
  AttackPortModel,
} from "../../components/DiagramCustomisation/AttackLinks.jsx"

import {
  SupportLinkModel,
  SupportLinkFactory,
  SupportPortModel,
} from "../../components/DiagramCustomisation/SupportLinks.jsx"

import {
  SimplePortFactory,
  ArgumentPortModel,
  ArgumentNodeWidget,
  ArgumentNodeModel,
  ArgumentNodeFactory,
} from "../../components/DiagramCustomisation/ArgumentNode.jsx"
import openSocket from "socket.io-client"

const socket = openSocket("http://localhost:5000")
socket.on("message", message => {
  console.log(message)
})

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newArgumentText: "Unnamed argument",
      isTourOpen: false,
      semantics: "preferred",
      supportInterpretation: "deductive",
      status: "Ready to solve debate",
    }
    socket.on("labelling", statusAndLabelling => {
      this.setState({ status: statusAndLabelling["status"] })
      console.log(statusAndLabelling)
      for (const nodeId in statusAndLabelling["labelling"]) {
        if (statusAndLabelling["labelling"][nodeId] === "Label.OUT") {
          this.model.nodes[nodeId].color = dangerColor
        }
        if (statusAndLabelling["labelling"][nodeId] === "Label.IN") {
          this.model.nodes[nodeId].color = successColor
        }
        if (statusAndLabelling["labelling"][nodeId] === "Label.UNDEC") {
          this.model.nodes[nodeId].color = warningColor
        }
        if (statusAndLabelling["labelling"][nodeId] === "Label.MUST_OUT") {
          this.model.nodes[nodeId].color = "black"
        }
      }
      this.forceUpdate()
    })
  }

  handleSemanticsChange = event => {
    this.setState({ semantics: event.target.value })
  }

  handleSupportInterpretationChange = event => {
    this.setState({ supportInterpretation: event.target.value })
  }

  handleFileUpload = event => {
    console.log(event.target.files)
  }

  componentWillMount() {
    //1) setup the diagram engine
    this.engine = new DiagramEngine()
    this.engine.installDefaultFactories()
    this.engine.registerLinkFactory(new AttackLinkFactory())
    this.engine.registerLinkFactory(new SupportLinkFactory())
    this.engine.registerNodeFactory(new ArgumentNodeFactory())
    this.engine.registerPortFactory(
      new SimplePortFactory("argument", config => new ArgumentPortModel())
    )

    this.model = new DiagramModel()

    // create some nodes
    const node1 = new ArgumentNodeModel("UK voters should have a second referendum for Brexit")
    node1.setPosition(600, 10)

    const node3 = new ArgumentNodeModel("We now know that politicians campaign claims were untrue")
    node3.setPosition(1100, 175)

    const node2 = new ArgumentNodeModel("Th UK sending £350 million a week to the EU was untrue")
    node2.setPosition(1100, 350)

    const node4 = new ArgumentNodeModel("Politicians don't always achieve promises")
    node4.setPosition(750, 350)

    const node5 = new ArgumentNodeModel("Not achieving a promise is different to actively lying")
    node5.setPosition(750, 520)

    const node6 = new ArgumentNodeModel("We should find an alternative to a second referendum")
    node6.setPosition(100, 175)

    const node7 = new ArgumentNodeModel("It's been 3 years and there are still no viable alternatives.")
    node7.setPosition(100, 350)

    const link1 = new AttackLinkModel()
    link1.setSourcePort(node7.attackPort)
    link1.setTargetPort(node6.incomingPort)

    const link2 = new AttackLinkModel()
    link2.setSourcePort(node6.attackPort)
    link2.setTargetPort(node1.incomingPort)

    const link3 = new SupportLinkModel()
    link3.setSourcePort(node2.supportPort)
    link3.setTargetPort(node3.incomingPort)

    const link4 = new SupportLinkModel()
    link4.setSourcePort(node3.supportPort)
    link4.setTargetPort(node1.incomingPort)

    const link5 = new AttackLinkModel()
    link5.setSourcePort(node4.attackPort)
    link5.setTargetPort(node3.incomingPort)

    const link6 = new AttackLinkModel()
    link6.setSourcePort(node5.attackPort)
    link6.setTargetPort(node4.incomingPort)

    this.model.addNode(node1)
    this.model.addNode(node2)
    this.model.addNode(node3)
    this.model.addNode(node4)
    this.model.addNode(node5)
    this.model.addNode(node6)
    this.model.addNode(node7)
    this.model.addLink(link1)
    this.model.addLink(link2)
    this.model.addLink(link3)
    this.model.addLink(link4)
    this.model.addLink(link5)
    this.model.addLink(link6)


    this.engine.setDiagramModel(this.model)
  }

  addNewArgumentNode = () => {
    this.engine.getDiagramModel().addNode(new ArgumentNodeModel())
    this.forceUpdate()
  }

  closeTour = () => {
    this.setState({ isTourOpen: false })
  }

  openTour = () => {
    this.setState({ isTourOpen: true })
  }

  create_debate_string = () => {
    const json = this.model.serializeDiagram()
    let strings = []
    for (const node of json["nodes"]) {
      strings.push(`arg(${node.argument}).`)
    }
    for (const link of json["links"]) {
      let source_argument = "source argument not found"
      let target_argument = "target argument not found"
      for (const node of json["nodes"]) {
        if (node["id"] === link["source"]) {
          source_argument = node.argument
        }
        if (node["id"] === link["target"]) {
          target_argument = node.argument
        }
      }
      if (link["type"] === "attack") {
        strings.push(`att(${source_argument}, ${target_argument}).`)
      }
      if (link["type"] === "support") {
        strings.push(`sup(${source_argument}, ${target_argument}).`)
      }
    }
    return strings.join("\n")
  }

  saveDiagram = () => {
    const element = document.createElement("a")
    const file = new Blob([this.create_debate_string()], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "debate.pl"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  create_debate_with_node_ids = () => {
    const json = this.model.serializeDiagram()
    let strings = []
    for (const node of json["nodes"]) {
      strings.push(`arg(${node.id}).`)
    }
    for (const link of json["links"]) {
      let source_argument = "source argument not found"
      let target_argument = "target argument not found"
      for (const node of json["nodes"]) {
        if (node["id"] === link["source"]) {
          source_argument = node.id
        }
        if (node["id"] === link["target"]) {
          target_argument = node.id
        }
      }
      if (link["type"] === "attack") {
        strings.push(`att(${source_argument}, ${target_argument}).`)
      }
      if (link["type"] === "support") {
        strings.push(`sup(${source_argument}, ${target_argument}).`)
      }
    }
    return strings.join("\n")
  }

  SolveDebateAndShowAlgorithms = () => {
    //this.model.nodes[node1.id].argument = "new argument"
    socket.emit(
      `solve-${this.state.semantics}-${this.state.supportInterpretation}`,
      this.create_debate_with_node_ids()
    )
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <Tour
          accentColor={infoColor}
          steps={steps}
          isOpen={this.state.isTourOpen}
          rounded={5}
          onRequestClose={this.closeTour}
        />

        <Header
          brand="Bipolar Argumentation Solver"
          rightLinks={<HeaderLinks />}
          fixed
          color="rose"
          {...rest}
        />
        <div className={classNames(classes.toolbar)} />
        <div className={classNames(classes.content)} data-tut="diagram">
          <SectionControls
            status={this.state.status}
            semantics={this.state.semantics}
            supportInterpretation={this.state.supportInterpretation}
            onFormChangeHandler={e => {
              this.state.newArgumentText = e.target.value
            }}
            onAddArgumentButtonClick={e => this.addNewArgumentNode()}
            onQuickstartButtonClick={e => this.openTour()}
            onSaveButtonClick={e => this.saveDiagram()}
            onFindWinnersButtonClick={e => this.SolveDebateAndShowAlgorithms()}
            onSemanticsChange={e => this.handleSemanticsChange(e)}
            onSupportInterpretationChange={e =>
              this.handleSupportInterpretationChange(e)
            }
            onFileUpload={e => this.handleFileUpload(e)}
          />
          <DiagramWidget
            data-tut="diagram"
            className={classes.diagramWidget}
            diagramEngine={this.engine}
            allowLooseLinks={false}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(mainPageStyle)(MainPage)
