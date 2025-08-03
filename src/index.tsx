//REACT
import ReactDOM from "react-dom/client";
import React from "react";
//STYLES
import "../src/assets/styles/styles_core.scss";
//ROUTING
import { HashRouter } from "react-router-dom";

//APP
import App from "./App";

//APOLLO
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      MinifiedApu: {
        keyFields: false,
      },
    },
  }),
});
const container = document.getElementById("root") as HTMLDivElement;

const root = ReactDOM.createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
  </ApolloProvider>
);
