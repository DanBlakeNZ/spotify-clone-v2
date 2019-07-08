import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";

import "normalize.css";

ReactDOM.render(<AppRouter />, document.getElementById("app"));
