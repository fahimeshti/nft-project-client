import './NavigationBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Container, Nav, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faChevronRight, faChartBar, faUserFriends, faBars } from '@fortawesome/free-solid-svg-icons';
import CLogo from '../resources/crafts-png-692033.png';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavigationBar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser);
    const [highFromTop, setHighFromTop] = useState(false)

    useEffect(()=> {
        const changeNavColor = () => {
            const isColored = window.pageYOffset > 50
            setHighFromTop(isColored)
          }
        window.addEventListener('scroll', changeNavColor)
        return () => {
            window.removeEventListener('scroll', changeNavColor)
        };
    })
   

    return (
        <Navbar className={highFromTop ? "nav-bar colored" : "nav-bar"} sticky="top" varient="light" expand={false}>
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand className="my-logo">
                        <img className="my-logo-img" src={CLogo} alt="" />
                        Chitra
                    </Navbar.Brand>
                </Link>
                <Form className="my-nav-form">
                    <FormControl
                        type="search"
                        placeholder="Search Chitra"
                        className="shadow-none me-2"
                        aria-label="Search"
                    />
                    </Form>
                <div className="nav-icon-group">
                    { !user && (<Link to="/login">
                        <i className="bi bi-person-circle my-navgtn-icons"></i>
                    </Link>)}
                    { user && (<Link to="/dashboard">
                        <i className="bi bi-person-check-fill my-navgtn-icons"></i>
                    </Link>)}
                    <Link to="/wallet">
                        <AccountBalanceWalletIcon />
                    </Link>
                    <Link to="/checkout">
                        <div className="cart-icon-box">
                            <ShoppingCartIcon />
                            <span className="cart-amount">{quantity}</span>
                        </div>
                    </Link>
                </div>
                <Navbar.Toggle className="shadow-none my-toggle" aria-controls="offcanvasNavbar" >
                    <FontAwesomeIcon className="nav-toggle-btn" icon={faBars} />
                </Navbar.Toggle>
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                className="side-nav-body"
                >
                <Offcanvas.Header className="close-btn-nav" closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="navLinks" href="#explore">
                        <span className="leftCol">
                        <FontAwesomeIcon className="faIcon" icon={faCompass} />
                         <span> Explore </span>
                        </span>
                        <span><FontAwesomeIcon className="faIconChev" icon={faChevronRight} /></span>
                    </Nav.Link>
                    <Nav.Link className="navLinks" href="#topcreators">
                        <span className="leftCol">
                        <FontAwesomeIcon className="faIcon" icon={faChartBar} />
                         <span> Top Creators </span>
                        </span>
                        <span><FontAwesomeIcon className="faIconChev" icon={faChevronRight} /></span>
                    </Nav.Link>
                    <Nav.Link className="navLinks" href="#create">
                        <span className="leftCol">
                        <FontAwesomeIcon className="faIcon" icon={faUserFriends} />
                         <span>Be a Creator </span>
                        </span>
                        <span><FontAwesomeIcon className="faIconChev" icon={faChevronRight} /></span>
                    </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-3"
                        aria-label="Search"
                    />
                    </Form>
                    <Button className="my-button" variant="primary">Connect Wallet</Button>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
    );
};

export default NavigationBar;