import {
  dangerColor,
  successColor,
} from "assets/jss/material-kit-react.jsx"

export default [
  {
    content: `Welcome! This website helps you identify the winning arguments in a debate. Let's see how you can achieve this.`,
  },
  {
    selector: '[data-tut="diagram"]',
    content: `We're going to represent our debate as a graph.`,
  },
  {
    selector: ".srd-node",
    content: `This is a node. It represents an argument.`,
  },
  {
    selector: ".srd-node",
    content: `You can change the argument by simply editing the text field.`,
  },
  {
    selector: `[data-tut="argument-input"]`,
    content: `And you can add a new argument to the debate by pressing this button.`,
  },
  {
    selector: `path[stroke="${dangerColor}"]`,
    content: `Red edges represent attacks between arguments.`,
  },
  {
    selector: `path[stroke="${successColor}"]`,
    content: `Whereas green edges represent support.`,
  },
  {
    selector: '[data-tut="diagram"]',
    content: `To add an attack from one argument to another, click on the (red coloured) outgoing attack port of the first argument and drag an edge to the (grey coloured) incoming port of the second argument.`,
  },
  {
    selector: '[data-tut="diagram"]',
    content: `Similarly, to add a support from one argument to another, click on the (green coloured) outgoing support port of the first argument and drag an edge to the (grey coloured) incoming port of the second argument.`,
  },
  {
    selector: '[data-tut="diagram"]',
    content: `You can zoom in and out using the mouse scrollbar if your diagram becomes too crowded.`,
  },
]
