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
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client";
import { graphDataSource } from "./api/datasources/datasources";
import getToken from "./utils/getToken";

const httpLink = new HttpLink({ uri: graphDataSource() });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = getToken();
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache({
    addTypename: false,
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
