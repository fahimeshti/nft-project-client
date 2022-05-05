import './ErrorPage.css';
import Delorean from '../../resources/Delorean.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
    <section className="notFound">
        <div className="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src={Delorean} alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div className="text">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <Link to='/'>
            <span className="yes">YES</span>
        </Link>
        <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
        </div>
    </section>
    );
};

export default ErrorPage;