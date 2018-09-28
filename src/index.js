import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/app";

import "./index.css";

render(<App/>, document.getElementById("root"));

registerServiceWorker();
