import './Cart.css';
import CLogo from "../resources/crafts-png-692033.png"
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import NftContainerCart from '../components/NftContainerCart';
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { removeProducts } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
            window.scrollTo(0, 0)
        }, [])
        
    const totalAmount = +((cart.total * 2765.43).toFixed(2))
    let tax;
    if (totalAmount > 15000) {
        tax = 250
    } else if (totalAmount > 10000) {
        tax = 200
    } else if (totalAmount > 5000) {
        tax = 150
    } else if (totalAmount > 2000) {
        tax = 100
    } else {
        tax = 0
    }
    const grandTotal = totalAmount + tax
    const onToken = (token) => {
        setStripeToken(token);
      };
      
      
      useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await userRequest.post("/checkout/payment", {
              tokenId: stripeToken.id,
              amount: grandTotal,
            });
            history.push("/success", {
              stripeData: res.data,
              products: cart, });
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, cart, grandTotal, history]);

    const removeProducthandler = (product) => {
        dispatch(removeProducts({product}))
    }
    
    return (
        <section className="cart-bg-box">
            <div className="heading">
                <div className="my-header">
                    <div className="header-img">
                        <img className="logo-img" src={CLogo} alt="" />
                    </div>
                   <Link to="/">
                       <h2>Chitra</h2>
                    </Link>
                </div>
            </div>
            <Row className="main-cart-container">
                <Col md={8} className="left">
                    {cart?.products.map((product) => (
                        <NftContainerCart 
                        key={product.products?._id + Math.random()}
                        data={product?.products}
                        image={product.products?.img}
                        title={product.products?.title}
                        creator={product.products?.creator}
                        price={product.products?.price}
                        remove={removeProducthandler}
                         />
                    ))}
                </Col>
                <Col md={4} className="right">
                    <div>
                    <h2>Order Summery</h2>
                    <div className="summeryItem">
                        <span>
                        Subtotal(ETH)
                        </span>
                        <span>
                        {(cart.total).toFixed(2)}ETH
                        </span>
                    </div>
                    <div className="summeryItem">
                        <span>
                        Subtotal(USD)
                        </span>
                        <span className="warningText">
                        $ {totalAmount}
                        <span className="small">(USD rate might differ a little)</span>
                        </span>
                    </div>
                    <div className="summeryItem">
                        <span>
                        Vat / Tax
                        </span>
                        <span>
                        $ {tax}
                        </span>
                    </div>
                    <div className="summeryItem total">
                        <span>
                        Total
                        </span>
                        <span>
                        $ {grandTotal}
                        </span>
                    </div>
                </div>
                    <div className="chckout-btn-box">
                    <StripeCheckout
                        name="Chitra"
                        image="https://firebasestorage.googleapis.com/v0/b/shop-24c11.appspot.com/o/crafts-png-692033.png?alt=media&token=db9300f7-4002-4ba0-b330-f9afd95987e8"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${grandTotal}`}
                        amount={grandTotal * 100}
                        token={onToken}
                        stripeKey={KEY}
                        >
                        <button>CHECKOUT NOW</button>
                    </StripeCheckout>
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default Cart;