import { jsx as _jsx } from "react/jsx-runtime";
//REACT
import ReactDOM from "react-dom/client";
//STYLES
import "../src/assets/styles/styles_core.scss";
//ROUTING
import { HashRouter } from "react-router-dom";
//APP
import App from "./App";
//APOLLO
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(_jsx(ApolloProvider, Object.assign({ client: client }, { children: _jsx(HashRouter, { children: _jsx(App, {}) }) })));
