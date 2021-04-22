import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import InfoProduct from "./pages/InfoProduct";
import ProductsBySlug from "./pages/ProductsBySlug";
import Cart from "./pages/Cart";
import CreateProduct from "./pages/CreateProduct";
import ProductAdmin from "./pages/ProductAdmin";
import CategoryAdmin from "./pages/CategoryAdmin";
import AdminPage from "./pages/AdminPage";

function App() {
    const RedirectToSignin = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={(props) => {
                    console.log("Redirect when cookie exists");
                    const item = localStorage.getItem("user");
                    return item === undefined || item === null ? (
                        <Redirect to="/signin" />
                    ) : (
                        <Component {...props} />
                    );
                }}
            />
        );
    };

    return (
        <div className="App">
            <Router>
                <Switch>
                    <RedirectToSignin exact path="/" component={Home} />
                    <Route
                        exact
                        path="/product/update/:_id"
                        component={ProductAdmin}
                    />
                    <Route
                        exact
                        path="/product/delete/:id"
                        component={ProductAdmin}
                    />

                    <Route path="/product/admin" component={ProductAdmin} />
                    <Route path="/category/admin" component={CategoryAdmin} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/products" component={Product} />

                    <Route exact path="/product/:id" component={InfoProduct} />
                    <Route exact path="/:slug" component={ProductsBySlug} />

                    <Route
                        exact
                        path="/create/product"
                        component={CreateProduct}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
