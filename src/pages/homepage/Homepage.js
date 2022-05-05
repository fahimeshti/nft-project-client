import { useEffect, useState } from 'react';
import './Homepage.css';
import homeCover from "../../resources/homeCover.jpg";
import PrimaryBtn from '../../components/PrimaryBtn';
import SecondaryBtn from '../../components/SecondaryBtn';
import MyCarousel from '../../components/MyCarousel';
import CreatorsCard from '../../components/CreatorsCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
// images 
import L1 from "../../resources/l1.jpg";
import L2 from "../../resources/l2.jpg";
import L3 from "../../resources/l3.jpg";
import InfoSvg from "../../resources/info-svg.svg";
import Products from '../../components/products/Products';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../requestMethods';

const Homepage = () => {

    const [products, setProducts] = useState([]);
    const [topOne, setTopOne] = useState(3);
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getProducts = async () => {
            try {
              const res = await publicRequest.get("/products") 
              setProducts(res.data);

            } catch (err) {}
        }
            getProducts()
            return () => {
                setProducts([]);
              };
            
    }, [])
    
    useEffect(()=>{
        if (products.length > 0) {
            let topNum = Math.round(Math.random() * products.length)
            setTopOne(topNum)
        }
    },[products])

      const getFeatured = props => (
        <Tooltip {...props}><span className="tool-tip">Get featured on the Homepage</span></Tooltip>
      );

    return (
        <div>
            <NavigationBar />
            <section className="firstSection">
                <img src={homeCover} alt="" />
                <div className="top-content">
                    <div className="top-content-left">
                        <h1>Discover, collect, and sell extraordinary NFTs</h1>
                        <h5>Chitra is the world's one of the first and largest NFT marketplace </h5>
                        <div className="top-btns">
                            <a href="#explore">
                                <PrimaryBtn btnText="Explore" />
                            </a>
                            <br />
                            <Link to={user ? '/add-new' : '/login'}>
                                <SecondaryBtn btnText="Create" />
                            </Link>
                        </div>
                    </div>
                    <div className="top-content-right">
                        <div className="top-nft-container">
                            <div className="top-img-container">
                                <img src={products[topOne]?.img || homeCover} alt="" />
                                <div className="img-info-container-full">
                                    <div className="img-info-container">
                                        <span>
                                            <span className="text-lightGrey">Current Bid</span>
                                            <br/>
                                            {products[topOne]?.price || '0.00'}ETH
                                            </span>
                                        <span>
                                            <span className="text-lightGrey">Ends In</span> <br/> 15:22H
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ntf-detail">
                               <div className="ntf-user-box">
                                    <img src={homeCover} alt="" />
                                    <div className="ntf-user-detail">
                                        <span>{products[topOne]?.title || 'Lorem ipsum'}</span>
                                        <span>@{products[topOne]?.creator || 'John Doe'}</span>   
                                    </div>
                               </div>
                                <div className="ntf-detail-info">
                                    <OverlayTrigger placement="left" overlay={getFeatured}>
                                        <span>
                                        <img src={InfoSvg} alt="" />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hot-drops-container">
                <h2>Hot Drops</h2>
                <MyCarousel products={products} />
            <section id="explore">
                <Products />
            </section>
            <div id="topcreators" className="headings">
                <h6>NFT Creators</h6>
                <h4>Top Creators This Week</h4>
            </div>
            <div className="nft-creator">
                {products.map((prod => (
                    <CreatorsCard 
                    key={prod._id}
                    img={prod.creatorImg}
                    creator={prod.creator}
                     />
                )))}
            </div>
            <div className="view-more-btn">
                <button>View Rankings</button>
            </div>
            <div id="create" className="headings">
                <h6>How to be a Creator</h6>
                <h4>Create & Sell your NFTs</h4>
            </div>
            <div className="be-a-creator">
                <div className="be-creator-box">
                    <div className="creator-box-img">
                        <img src={L1} alt="" />
                    </div>
                    <h6>Create Artwork</h6>
                    <p>Create your collection. Add social links,
                         profile & banner images and set a secondary sales fee. </p>
                </div>
                <div className="be-creator-box">
                    <div className="creator-box-img">
                        <img src={L2} alt="" />
                    </div>
                    <h6>Upload</h6>
                    <p>Upload your work, customize your NFTs
                         with properties, stats and unlockable content.
                    </p>
                </div>
                <div className="be-creator-box">
                    <div className="creator-box-img">
                        <img src={L3} alt="" />
                    </div>
                    <h6>Listing</h6>
                    <p>Set up & choose between auctions,
                         fixed price listings, and declining price listings. </p>
                </div>
            </div>
            <div className="view-more-btn">
               <Link to={user ? '/add-new' : '/login'}>
                    <button className="home-primary-btn">Create Now</button>
               </Link>
                <button>Watch video</button>
            </div>
            <div className="newsletter">
                <div className="newsletter-container">
                    <h2>Never miss a Drop!</h2>
                    <p>Subscribe to our super 
                        exclusive drop list and be the 
                        first to know about upcoming drops.
                    </p>
                    <div className="subscribe-box">
                        <input type="text" placeholder="Enter your email address" />
                        <button className="home-primary-btn">Subscribe</button>
                    </div>
                </div>
            </div>
            </section>
            <Footer />
        </div>
    );
};

export default Homepage;