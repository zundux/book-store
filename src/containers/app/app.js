import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Catalog from "../pages/catalog";
import Modals from "../modals";
import Product from "../pages/product";
import Cart from "../pages/cart";
import Order from "../pages/order";
import OrderCreated from "../pages/order/order-created";
import About from "../pages/about";
import { history, store } from "../../store";
// import {PersistGate} from 'redux-persist/es/integration/react'
// import {history, persistor, store} from "../../store";
import { Provider } from "react-redux";
import NotFound from "../pages/not-found";
// import LoadingLabel from "../../components/loading-label";

// const onBeforeLift = () => {
//     // take some action before the gate lifts (persist data will be loaded)
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/*<PersistGate*/}
        {/*loading={<LoadingLabel/>}*/}
        {/*onBeforeLift={onBeforeLift}*/}
        {/*persistor={persistor}>*/}
        <ConnectedRouter history={history}>
          <React.Fragment>
            <CssBaseline/>
            <header>
              <nav>
                <Link to="/">Catalog</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/about-us">About</Link>
              </nav>
            </header>

            <main>
              <Switch>
                <Route exact path="/" component={Catalog}/>
                <Route path="/product/:id" component={Product}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/order/created" component={OrderCreated}/>
                <Route path="/order" component={Order}/>
                <Route path="/about-us" component={About}/>
                <Route component={NotFound}/>
              </Switch>
            </main>
            <footer>

            </footer>
            <Modals/>
          </React.Fragment>
        </ConnectedRouter>
        {/*</PersistGate>*/}
      </Provider>
    );
  }
}

export default App;
