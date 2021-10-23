import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from "./components/layout";
import Auth from './components/auth/auth'
import { AuthContextProvider } from './context/auth'
import Home from "./components/Home";
import CandidateVideos from "./components/candidateVideos";
import ViewVideo from "./components/ViewVideo";

export default function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/home" component={Home} />
            <Route path="/candidate" component={CandidateVideos} />
            <Route path="/video/:id" component={ViewVideo} />
            <Route path="*" component={Auth} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </AuthContextProvider>
  );
}
