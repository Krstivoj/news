import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import NewsList from "./components/News/NewsList/NewsList";
import store from './store/index';
import Category from "./components/Category/Category/Category";
import NewsDetails from "./components/News/NewsDetails/NewsDetails";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
       <App/>
      <Router>
          <Switch>
              <Route exact path="/top-news">
                  <NewsList/>
              </Route>
              <Route exact path="/categories">
                  <Category/>
              </Route>
              <Route exact path="/top-news/detail">
                  <NewsDetails/>
              </Route>
          </Switch>
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
