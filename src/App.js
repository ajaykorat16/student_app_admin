import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./Components/Auth/Login'));

const PrivacyPolicy = React.lazy(() => import('./Components/Pages/PrivacyPolicy'));


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/privacy_policy" name="Page 404" render={props => <PrivacyPolicy {...props} />} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
