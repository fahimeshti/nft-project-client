import Homepage from "./pages/homepage/Homepage";
import NftSingleItem from "./pages/singleNftPage/NftSingleItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import DashBoard from "./admin/pages/dashboard/DashBoard";
import OrderList from "./admin/pages/allOrders/OrderList";
import NavAdmin from './admin/components/NavAdmin';
import NftListAdmin from "./admin/pages/nftListAdmin/NftListAdmin";
import NewNft from "./admin/pages/newNft/NewNft";
import EditNft from "./admin/pages/editNft/EditNft";
import Success from "./pages/success/Success";
import { useSelector } from "react-redux";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Router> 
      <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/nft/:id">
              <NftSingleItem />
            </Route>
            <Route path="/checkout">
              {user ? <Cart /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/success">
              {user ? <Success /> : <Redirect to="/" />}
            </Route>
            <Route path="/wallet">
              <ErrorPage />
            </Route>
    { user ? <>
      <NavAdmin />
      <Route path="/dashboard" exact>
        <DashBoard />
      </Route>
      <Route path="/dashboard/all-orders">
        <OrderList />
      </Route>
      <Route path="/dashboard/all-nft">
        <NftListAdmin />
      </Route>
      <Route path="/dashboard/add-new">
        <NewNft />
      </Route>
      <Route path="/dashboard/edit/:productId">
        <EditNft />
      </Route>
    </> : 
      <Redirect to="/login" />
    }
      </Switch>
      </Router>
    </>
  );
}

export default App;
