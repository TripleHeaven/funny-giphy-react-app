import React from "react";
import { Switch, Route } from "react-router";

import Pictures from "../pictures";
const routes = (
  <Switch>
    <Route path="/" component={Pictures} exact></Route>
  </Switch>
);

const Layout = ({ children }) => <div>{routes}</div>;

export default Layout;
