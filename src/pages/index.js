import React from "react";
import {createMemoryHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.4.0";
import 'typeface-roboto';
import 'typeface-roboto-slab';
// pages for this product
import Components from "./ComponentsPage/ComponentsPage.jsx";
import PublicationsPage from "./PublicationsPage/publicationsPage.jsx";
import mainPage from "./MainPage/mainPage"

let hist = createMemoryHistory();

export default () => (
  <Router history={hist}>
    <Switch>
      <Route path="/publications-page" component={PublicationsPage} />
      <Route path="/components" component={Components} />
      <Route path="/" component={mainPage} />
    </Switch>
  </Router>
);
