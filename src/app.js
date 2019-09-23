import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = <AppRouter store={store} />;

ReactDOM.render(jsx, document.getElementById("app"));
