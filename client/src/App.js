import React from "react";
import "./App.css";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import WebSocketTransport from '@cubejs-client/ws-transport';
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header/Header";

const API_URL = "wss://69da34d1.ngrok.io";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1NjIzNjEsImV4cCI6MTU3MzY0ODc2MX0.982wP0EgHUw_szVNO2YWWWWQIbGNqoCXmLqppYG7cLQ";
  
const cubejsApi = cubejs({
  transport: new WebSocketTransport({ authorization: CUBEJS_TOKEN, apiUrl: API_URL })
});

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: "100%"
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

export default App;
