import * as React from "react"
import * as SRD from "storm-react-diagrams"
import * as _ from "lodash"
import { NodeModel } from "storm-react-diagrams"

import { PortWidget } from "storm-react-diagrams"

import { AbstractPortFactory, DefaultPortModel } from "storm-react-diagrams"

import {
  AttackPortModel,
} from "../../components/DiagramCustomisation/AttackLinks.jsx"

import {
  SupportPortModel,
} from "../../components/DiagramCustomisation/SupportLinks.jsx"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

import withStyles from "@material-ui/core/styles/withStyles"

import argumentNodeStyle from "assets/jss/diagram/argument-node.jsx"
import TextField from "@material-ui/core/TextField"
import Tooltip from "@material-ui/core/Tooltip"

class SimplePortFactory extends AbstractPortFactory {
  constructor(type, cb) {
    super(type)
    this.cb = cb
  }
  getNewInstance(initialConfig) {
    return this.cb(initialConfig)
  }
}

class ArgumentNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super("argument")
  }

  generateReactWidget(diagramEngine, node) {
    return <StyledArgumentNodeWidget node={node} />
  }

  getNewInstance() {
    return new ArgumentNodeModel()
  }
}

class ArgumentNodeModel extends NodeModel {
  constructor(argument, color) {
    super("argument")
    this.attackPort = this.addPort(
      new AttackPortModel(false, "attack", "attack")
    )
    this.supportPort = this.addPort(
      new SupportPortModel(false, "support", "support")
    )
    this.incomingPort = this.addPort(
      new DefaultPortModel(true, "incoming", "incoming")
    )
    this.argument = argument
    this.color = color
  }

  serialize() {
    return _.merge(super.serialize(), {
      argument: this.argument,
    })
  }

  getInPorts() {
    return _.filter(this.ports, portModel => portModel.in)
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in)
  }
}

class ArgumentNodeWidget extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Card
          className={classes.argumentNode}
          style={{ background: this.props.node.color }}
        >
          <CardContent>
            <TextField
              label="Argument"
              placeholder="Argument"
              multiline
              rowsMax="4"
              value={this.props.node.argument}
              onChange={e => {
                this.props.node.argument = e.target.value
                this.forceUpdate()
              }}
              onKeyUp={e => {
                if (e.keyCode == 8) {
                  e.stopPropagation()
                }
              }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </CardContent>
        </Card>
        <Tooltip
          title="Outgoing attacks"
          classes={{ tooltip: classes.tooltip }}
          placement="top"
        >
          <div className={classes.attackPort}>
            <PortWidget name="attack" node={this.props.node} />
          </div>
        </Tooltip>
        <Tooltip
          title="Outgoing supports"
          classes={{ tooltip: classes.tooltip }}
          placement="top"
        >
          <div className={classes.supportPort}>
            <PortWidget name="support" node={this.props.node} />
          </div>
        </Tooltip>
        <Tooltip
          title="Incoming attacks and supports"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <div className={classes.defaultPort}>
            <PortWidget
              name="incoming"
              node={this.props.node}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </Tooltip>
      </div>
    )
  }
}

const StyledArgumentNodeWidget = withStyles(argumentNodeStyle)(
  ArgumentNodeWidget
)

export { ArgumentNodeFactory, ArgumentNodeModel, SimplePortFactory }
