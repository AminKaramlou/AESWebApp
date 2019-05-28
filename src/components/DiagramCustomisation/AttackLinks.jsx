import {
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultPortModel,
} from "storm-react-diagrams"
import React from "react"

import {
  dangerColor,
} from "assets/jss/material-kit-react.jsx"

class AttackLinkModel extends DefaultLinkModel {
  constructor() {
    super("attack")
    this.color = dangerColor
  }
}

class AttackPortModel extends DefaultPortModel {
  createLinkModel() {
    return new AttackLinkModel()
  }
}

export class AttackLinkSegment extends React.Component {
  constructor(props) {
    super(props)
    this.percent = 0
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <>
        <path
          ref={ref => {
            this.path = ref
          }}
          strokeWidth={this.props.model.width}
          stroke= {dangerColor}
          d={this.props.path}
        />
      </>
    )
  }
}

class AttackLinkFactory extends DefaultLinkFactory {
  constructor() {
    super()
    this.type = "attack"
  }
  getNewInstance(initialConfig) {
    return new AttackLinkModel()
  }

  generateLinkSegment(model, widget, selected, path) {
    return (
      <g>
        <AttackLinkSegment model={model} path={path} />
      </g>
    )
  }
}

export {AttackLinkFactory, AttackLinkModel, AttackPortModel}