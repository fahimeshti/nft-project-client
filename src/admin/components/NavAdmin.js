import './NavAdmin.css';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlusSquare, faShieldAlt, faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userRedux';

const NavAdmin = () => {
    const dispatch = useDispatch()
    const handleLogout = ()=> {
        dispatch(logout());
    }
    
    return (
        <div>
            <Navbar className="nav-body" bg="light" varient="dark" expand={false}>
                <Container className="nav-admin-box" fluid>
                <Navbar.Toggle className="nav-toggle" aria-controls="offcanvasNavbar" />
                    <h1>Dashboard</h1>
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    className="offcanvas-menu"
                    >
                    <Offcanvas.Header className="nav-header" closeButton>
                        <Offcanvas.Title className="offcanvasNavbarLabel" id="offcanvasNavbarLabel">Hello, Stranger</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="nav-body-links">
                        <Nav className="justify-content-end flex-grow-1">

                        <div className="nav-item">
                            <NavLink exact to="/dashboard" activeClassName="activeLink">
                            <FontAwesomeIcon className="iconAdmin" icon={faShieldAlt} />
                             Dashboard
                            </NavLink>
                        </div>

                        <div className="nav-item">
                        <NavLink to="/dashboard/all-orders" activeClassName="activeLink">
                            <FontAwesomeIcon className="iconAdmin" icon={faPlusSquare} />
                            All Orders
                        </NavLink>
                        </div>

                        <div className="nav-item">
                        <NavLink to="/dashboard/add-new" activeClassName="activeLink">
                            <FontAwesomeIcon className="iconAdmin" icon={faList} />
                            Add New NFT
                        </NavLink>
                        </div>

                        <div className="nav-item">
                        <NavLink to="/dashboard/all-nft" activeClassName="activeLink">
                            <FontAwesomeIcon className="iconAdmin" icon={faTasks} />
                            Manage All NFT
                        </NavLink>
                        </div>

                        <div className="nav-item">
                        <NavLink exact to="/" activeClassName="activeLink">
                        <FontAwesomeIcon className="iconAdmin" icon={faHome} />
                            Home
                        </NavLink>
                        </div>

                        <div className="nav-item">
                        <a href="#logged-out" onClick={handleLogout}>
                        <FontAwesomeIcon className="iconAdmin" icon={faSignOutAlt} />
                           Logout
                        </a>
                        </div>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                </Navbar>
        </div>
    );
};

export default NavAdmin;