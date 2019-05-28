import {
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultPortModel,
} from "storm-react-diagrams"
import React from "react"

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
} from "assets/jss/material-kit-react.jsx"

class SupportLinkModel extends DefaultLinkModel {
  constructor() {
    super("support")
    this.color = successColor
  }
}

class SupportPortModel extends DefaultPortModel {
  createLinkModel() {
    return new SupportLinkModel()
  }
}

export class SupportLinkSegment extends React.Component {
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
          stroke= {successColor}
          d={this.props.path}
        />
      </>
    )
  }
}

class SupportLinkFactory extends DefaultLinkFactory {
  constructor() {
    super()
    this.type = "support"
  }
  getNewInstance(initialConfig) {
    return new SupportLinkModel()
  }

  generateLinkSegment(model, widget, selected, path) {
    return (
      <g>
        <SupportLinkSegment model={model} path={path} />
      </g>
    )
  }
}

export {SupportLinkFactory, SupportLinkModel, SupportPortModel}